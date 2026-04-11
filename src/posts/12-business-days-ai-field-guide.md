---
title: "I ran a 12-day AI field guide for engineers. Here are the 5 ideas that actually mattered."
date: '2026-04-11'
description: "Five durable patterns from a 12-day AI workflow series: anti-sycophancy framing, curating instead of boilerplate-writing, context hygiene, critique loops, and externalized memory."
---

Most AI advice still lives in one of two bad buckets:

- toy prompts dressed up as strategy
- vague sermons about how AI will change everything

Late last year, I ran a 12-business-day internal series on practical AI workflows for engineers. The goal was simple: skip the first-hour-with-Cursor material and focus on the stuff power users quietly trade with each other.

The phrase I used for it was: **be the dealer of underground knowledge, not the school teacher.**

After compressing that series, a few ideas still stand out as durable. Not prompt-of-the-week durable. Actually-useful durable.

## 1. Break the yes-man loop

One of the most dangerous failure modes in coding agents is not hallucination. It is sycophancy.

If you ask a model to review _your_ code, it often slips into compliment mode. It wants to be helpful, agreeable, and emotionally smooth. That makes it much worse at telling you that you are about to ship something stupid.

A small framing change helps a lot.

Instead of:

- Review this PR for critical issues.

Use something like:

- Assume we shipped this and it crashed production. Write the postmortem explaining exactly what broke and why.
- My neighbor wrote this. Be as critical as needed. Help me find the flaws.

The model often knew where the weakness was already. It just needed permission to stop protecting your feelings.

That habit generalizes far beyond code review. If you want a model to be useful, do not just ask for help. Give it permission to disagree.

## 2. Stop writing boilerplate. Start curating output.

A lot of AI velocity comes from giving up the idea that your main job is still to type every intermediate artifact yourself.

The better workflow is usually:

- let the model generate the first pass
- demand structure, edge cases, and interfaces
- keep your energy for judgment, sequencing, and cleanup

One of the most effective patterns from the series was reverse engineering from a screenshot or rough concept into:

- a technical PRD
- a data model
- edge cases
- API surface

That turns blank-page work into curation work.

The important shift is psychological as much as technical: the leverage is not in making the model autocomplete your existing process faster. It is in deleting entire categories of setup work and moving directly to evaluation.

## 3. Every irrelevant token dilutes the model's IQ

People love shoveling context at models as if more must be better.

Usually it is worse.

The real problem is not just context length. It is context quality.

If the relevant task lives in 10 files and you hand the model 500 files worth of legacy junk, generated output, stale docs, and half-related code, you are not making it informed. You are making it distracted.

The pattern that held up best was:

- hide dead weight with ignore rules
- use narrower workspaces instead of monorepo root sprawl
- point the model at the exact docs version you care about
- ground it in the real source of truth, not generic web slurry

The short version is:

**exclude the noise, index the truth.**

That sounds obvious. It is still one of the most under-applied ideas in practical AI work.

## 4. Prototype fast. Critique hard.

AI is excellent for disposable first drafts. That does **not** mean the first draft deserves trust.

One of the best patterns from the series was using one model or workflow to generate quickly, then using a second pass to critique architecture, assumptions, or edge cases.

That second pass matters because the model that produced the work is often the least reliable judge of it.

A good loop looks more like this:

- generate aggressively
- inspect failure modes
- force architectural critique
- argue with the model when it is wrong
- keep the useful pieces, throw away the rest

Fast prototyping is only impressive if it feeds a quality loop. Otherwise you are just manufacturing prettier mistakes.

## 5. Long-running agents only work when memory leaves the model

If an agent has to survive hours, days, retries, or context compaction, the state cannot live only in the conversation.

This was one of the clearest lessons from the long-running-agents part of the series: the durable unit is not the prompt. It is the artifact trail.

If you want an agent to resume well, it needs external state such as:

- progress files
- checklists
- explicit definitions of done
- logs
- receipts
- handoff notes

That is true for solo builders too. The more autonomous your workflow becomes, the more your process has to look like operations instead of chat.

Prompts expire. Strategies last. Artifacts let the strategy survive.

## What changed for me

The biggest change was not a specific model or tool. It was a shift in posture.

Useful AI work is less about finding the cleverest incantation and more about designing better loops:

- better framing
- better context hygiene
- better critique
- better memory
- better artifacts

That is also why so much public AI advice ages badly. It is often attached to a tool release, a benchmark, or a novelty demo. The underlying working habits matter more.

If I had to compress the whole series into one line, it would be this:

**Do not optimize for getting an answer. Optimize for building a system that makes good answers more likely.**

That is the difference between AI as entertainment and AI as leverage.

I plan to turn more of these into public writeups, especially the parts that held up under real engineering use instead of demo conditions. If you are building serious AI workflows and have found your own underground knowledge, I would love to compare notes.
