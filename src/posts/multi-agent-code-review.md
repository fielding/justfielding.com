---
title: "I Made Three AI Models Argue About My Code. Then I Hired Two."
date: '2026-03-24'
description: Building an adversarial multi-agent code review system that caught HIPAA violations, privilege escalation, and race conditions across 102 PRs.
---

I work on healthcare software. The kind where a missed bug leaks patient data, drops live calls, or quietly destroys records you really wanted to keep.

We already had Claude Code Action on every PR. It caught useful stuff. Rate limiting issues. Migration mistakes. Schema mismatches. The occasional `console.log` shaped landmine.

But across the dataset I looked at, it never once flagged a PHI logging violation, a privilege escalation, or a consent compliance issue.

Those are the bugs I care about.

So I built [review-crew](https://github.com/fielding/review-crew), a system where three AI models (Claude Opus, GPT, Gemini) independently review a PR, then argue about what they found before voting on a verdict. Like a jury deliberation, except the jurors are language models and they have to show their evidence. It runs on top of [box](https://github.com/fielding/box), a structured message queue from another project of mine designed for multi-agent coordination.

102 PRs later, the system has a 95% true positive rate on blocking verdicts. 21 out of 22 times it said "don't merge this," the developers agreed and pushed fixes before merging. The one false positive was a tooling bug during early development.

## The Problem With a Single Reviewer

A single model reviewing code is like having the author proofread their own essay. Same assumptions, same blind spots, same mental model of what the code "should" do. Claude Code Action typically ran first on our PRs. Developers would fix whatever it flagged, push new commits, and by the time review-crew ran, the code had already been through a full round of AI review plus developer fixes.

review-crew was still finding critical bugs in what was left.

And these weren't the same findings at different severity levels. They were entirely different categories of bugs:

| PR | Claude Action | review-crew |
|---|---|---|
| #256 | Dismissed | [CRITICAL] Privilege escalation, any user could become admin |
| #217 | No blocking findings | [CRITICAL] Unique constraint collision drops live inbound calls |
| #198 | No blocking findings | [CRITICAL] WebSocket leak + [HIGH] transcript polling removed |
| #316 | No blocking findings | [HIGH] Postgres exposed on all interfaces + [HIGH] shell injection via .env sourcing |
| #131 | No blocking findings | [CRITICAL] Broken RLS policies (type mismatch, policies never match) |

Developers confirmed every one of these by writing fixes.

**PR #256.** Replaced shared invite codes with role-based invitations. Any authenticated clinic member could invite admins, change roles, remove members. No server-side RBAC check. The accept-invite endpoint read the role from client-tamperable `user_metadata` instead of the authoritative `staff_invitations` row. Developer commit: `fix(security): address security blockers from PR review`

**PR #217.** Created conversation records at call start. Agent session created before registering with ElevenLabs. If registration failed, the fallback hit a UNIQUE constraint on the session, silently dropping the inbound call. No error, no retry. Just gone. Developer commit: `fix: Reuse existing agent session in AI fallback to prevent UNIQUE constraint violation`

**PR #11063.** MVP of a patient merge tool. `DELETE FROM patients` triggered a cascade on `ehr_patients.patient_id`, permanently destroying EHR linkage records for every merged patient. MRNs, demographics, ehr_patient_id. Irreversible. Claude commented on the PR but didn't block.

**PR #11526.** Hard delete to soft delete migration. Six HIGH findings: RLS policies missing `deleted_at IS NULL`, search RPCs leaking deleted patients, merge race condition. Each one seems minor alone. Combined, deleted patient data is still queryable.

## How It Works

The architecture is a phase-based protocol with a shared mailbox. It's less group chat, more MythBusters for pull requests. Somebody makes a claim, somebody else has to try and blow it up.

**Phase 1: Independent Review.** Each model gets the PR diff, repo context, and a reviewer prompt. They analyze independently with zero access to what the others are writing. No peeking. This prevents one confident model from anchoring everyone else's analysis.

**Phase 2: Discussion.** The orchestrator signals DISCUSSION_READY and opens the mailbox. All three reviewers can see each other's findings. They challenge weak evidence, verify claims against the actual diff, and distinguish between pre-existing patterns and new regressions. Minimum 120 seconds, minimum 2 substantive messages per reviewer. You can't just skim and agree.

**Phase 3: Verdict.** CALL_FOR_VERDICTS goes out. Each reviewer submits VERDICT:MERGE or VERDICT:BLOCK with optional hard blockers in structured JSON. Majority rules, minority concerns get documented.

```
CHECKIN → INITIAL_REVIEW → DISCUSSION_READY → debate → CALL_FOR_VERDICTS → VERDICT
```

Each phase transition is code-enforced. Early versions tried telling models "don't submit your verdict until discussion is complete" in the prompt. Both Claude and GPT violated this independently, in different ways. Claude skipped the checkin entirely. GPT bailed before the verdict call. You cannot rely on language models to follow a state machine described in prose. The orchestrator won't process a VERDICT message until it has sent CALL_FOR_VERDICTS. Out-of-phase messages get ignored, not trusted.

## What Happens During Debate

89% of sessions included active debate. 3.5 CHALLENGE messages and 3.4 VERIFIED messages per session on average.

The interesting part is how often models changed their minds after seeing peer evidence. Gemini flipped its position 59% of the time. Opus changed 22%. GPT only 17%.

Gemini is the swing vote. GPT is the most stubborn (or most confident, depending on your read). Opus sits in the middle.

They bring genuinely different strengths, too. GPT raised 31 security concerns across all sessions. Opus raised 4. That's not a typo. GPT plays the alarm raiser, Opus plays the thorough documenter, Gemini weighs both sides and often casts the deciding vote.

Finding overlap sits around 42.7% at the file level. Each reviewer independently catches roughly 57-60% of issues the others miss. That's the whole argument for multi-agent review in one number. You're not paying for three copies of the same analysis. You're paying for three different perspectives.

## The Numbers

102 PRs across two repos from January through early March 2026. 113 issues found total, 32 at CRITICAL or HIGH severity. 29% of findings were independently cross-verified by a second model during discussion. 95% of flagged issues were introduced by the PR under review, not pre-existing.

Of the 22 BLOCK verdicts, developers pushed fixes on 21. The lone exception was a tooling bug during early development. The 4 comms PRs without immediate fixes each had context: one was a hardcoded PHI phone number addressed in a separate PR, one was a PHI logging bug where the review arrived 5 minutes after merge, one was on a PR that got closed without merging, and one was the tooling false positive.

## What I Got Wrong

**Severity labels aren't verdicts.** Early versions auto-blocked any PR with a HIGH finding. Sounds reasonable until a unanimous MERGE gets overridden because one model flagged something HIGH that the other two verified as pre-existing. Fix: severity informs discussion, but only explicit `p0_blockers` or `universal_blockers` in the final verdict payload can force a block. Decoupling severity from policy was the single biggest improvement to accuracy.

**Verdict timing is its own race condition.** Models submit at different speeds. Finalize too early, you miss late votes. Wait for everyone, you wait forever when a model crashes. Solution: a quiet-period gate. Finalize only after all verdicts are in AND the mailbox has been silent for 20 seconds. New message resets the timer. Hard timeout still applies.

**Start simple with orchestration.** I tried agent SDKs early on and bounced off them because they were designed for single-vendor workflows. What shipped was a Python orchestrator launching agents via tmux panes (interactive) or subprocesses (CI). Each agent gets a rendered prompt and access to `box` for messaging. No shared memory, no function calling between agents. Just processes and a message queue. The lesson: get the protocol right first with the simplest orchestration you can, then optimize the plumbing.

## The Cost

$1.80 per review on average.

| Component | Cost |
|---|---|
| Opus (primary reviewer) | $0.97 |
| GPT | $0.39 |
| Gemini | $0.29 |
| Summarizer | $0.16 |

Single-agent Opus review runs $1.13. The multi-agent premium is $0.68. That still looked cheap for healthcare PRs. But after enough sessions, the third reviewer started to feel less like critical extra perspective and more like the guy who shows up after you've already moved the couch through the doorway.

The best tradeoff: two reviewers by default, three for bigger PRs, higher-risk changes, or when the first two disagreed. GPT and Opus gave the most useful contrast most of the time. Gemini still had value, just not enough to justify showing up to every single PR like the third Ghostbuster.

Base overhead dominates small PRs though. The transcript for a 10-line PR is almost entirely prompt context, not code. Ten single-line PRs cost roughly $18. One ten-line PR costs $1.80. If your team writes lots of tiny PRs, the economics shift.

Cache hit rate helps offset this. 382 million tokens in cache reads across 70 sessions. PR context, repo structure, and review guidance stay cached between reviewers.

## The Human Part

The best argument I heard for keeping humans in the loop came from a teammate:

> "When we use AI to review, we should ask the AI questions, not just 'hey, review this code,' but 'okay, so how does this work? Explain what the PR does to me' and do it in a more iterative, investigative process."

He reviewed an SMS consent PR where Claude Code said it looked great, then asked it to explain how consent was actually verified. That uncovered a regex-based validation that would have been missed otherwise. Not finding bugs. Cross-checking intent against implementation while learning the codebase.

review-crew supports this with `--instruct`, which lets you pass specific questions into the review. But the better version is a hybrid: review-crew runs the adversarial debate, then you ask follow-up questions to models that just spent 5-10 minutes deeply analyzing the code. They know the PR inside and out at that point. "Why did you flag this?" "Check whether this edge case is handled." "Explain the consent flow to me." Answers grounded in actual review context.

The best code review isn't reading diffs line by line. It's reviewing intent during planning, then interrogating the code with domain-specific questions. The automated pass catches real bugs. The human pass catches the things that require product context, architectural judgment, and asking "but why?"

## What This Actually Means

The real insight isn't "use three models instead of one." It's that adversarial structure matters more than model capability. A single model reviewing the same code twice won't find new things. Three models with enforced independence, structured debate, and explicit evidence requirements will. The architecture forces genuine disagreement. And genuine disagreement is where the bugs hide.

For most codebases, a single model reviewer is probably fine. But if you're working in a domain where the bugs that slip through actually matter (healthcare, fintech, auth systems, anything where a missed regression means patient data leaks or money moves wrong), $0.68 per PR is nothing. One privilege escalation bug in production costs more than a year of review-crew runs.

## Try It

review-crew is open source. Runs locally (tmux mode for watching the debate in real time) or in CI (subprocess mode). Two reviewers by default, three with `--3`. Smoke mode for cheap protocol testing.

The viewer (a Svelte app) lets you replay full sessions: every message, every challenge, every mind-change, the final verdict.

[GitHub: review-crew](https://github.com/fielding/review-crew)
