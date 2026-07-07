# Blog Topic Candidates, July 2026

Ranked by likely reach, using your own benchmark: the resume post (130k impressions, broad + funny + concrete) is the bar, the nit post (too niche, dismissed on HN) is the cautionary tale. Everything here is sourced from your daily notes, project notes, and recent sessions. Last post shipped Apr 7. It's been almost three months.

Legend: [DRAFTED] = full draft in this folder. [OUTLINED] = outline in this folder. [READY] = you already wrote it, it's sitting in your vault.

---

## 1. My Poker Bot's Neural Net Lost to My Own If-Statements [DRAFTED]

**Pitch:** A month of solvers, policy gradients, and transfer learning, and the hand-written heuristic still beats every net by ~30 bb/100. The real story is the eval traps along the way: a leaderboard that rewards never folding, and a self-referential eval that let a collapsed net look healthy.

**Why now:** The whole arc happened in June. Numbers are fresh, the arena is live, and "I did the fancy thing and the boring thing won" is exactly the self-owning, data-heavy register that made the resume post travel.

Draft: `poker-net-lost-to-if-statements.md`

## 2. My Minecraft Bot Kept Drowning While It Thought [DRAFTED]

**Pitch:** Wally's LLM calls took 22.6 seconds, which is a problem when drowning takes less. Profiling showed 76% of prompt tokens were tool definitions. Trimming them (plus a 40% system-prompt cut) got warm calls to ~900ms. Broadly useful lesson: profile your agent's context before touching the prompt or the model.

**Why now:** Everyone building agents right now is prompt-tuning and model-shopping. Almost nobody is profiling token composition. You have the numbers and a hook with literal life-or-death stakes (for a Minecraft bot).

Draft: `minecraft-bot-drowned-while-thinking.md`

## 3. I Made Three AI Models Argue About My Code. Then I Hired Two. [READY]

**Pitch:** The review-crew post. 102 PRs, 95% true-positive block rate, Gemini flips 59% of the time, GPT raised 31 security concerns to Opus's 4, and the third reviewer is the third Ghostbuster. It's finished. It has been sitting in `~/notes/Enduring/Writing/multi-agent-code-review.md` since March 24, fully drafted with site-ready frontmatter.

**Why now:** It's done. Shipping it costs one afternoon of link checks and a date bump. See the outline file for the short refresh checklist (branch-entrypoint mode and the subscription-harness default landed since the draft).

Outline: `outline-ship-the-review-crew-post.md`

## 4. You Can't Grade Your Own Homework [OUTLINED]

**Pitch:** The thesis that keeps recurring across your projects: self-referential evaluation fails silently. The poker net collapsed for rounds because it was evaluated against the bots it trained on. Your sycophancy demo stopped reproducing partly because you authored the test. Specter isolates implementer from verifier for exactly this reason. One essay, four proof points from your own work.

**Why now:** Evals are the conversation in AI engineering right now, and most eval content is abstract. Yours has a neural net that went insane undetected.

Outline: `outline-you-cant-grade-your-own-homework.md`

## 5. Running an Always-On Agent: What Actually Broke [OUTLINED]

**Pitch:** Sedge runs 24/7, and the failure log is the post: the "agent acknowledges work but doesn't execute" bug that was config, not prompts; the cron running 288 times a day; mini models that can't compare two timestamps; trusting a 10-line bash script over the LLM for anything that has to happen every time.

**Why now:** Everyone's spinning up always-on personal agents this year. Nobody's writing the ops postmortems yet. First-mover territory.

Outline: `outline-always-on-agent.md`

## 6. Goalless Busywork: What Agents Do When the Checklist Runs Out

**Pitch:** Wally survives fine, then endlessly hoards logs and stone with no goal, because his mission is a finite checklist instead of an open-ended goal ladder. Sedge has the same disease from the other side: open loops dissolve across heartbeats without an external task spine. Agent motivation is a design problem, not a model problem.

**Why now:** Accessible, funny, and slightly philosophical. Good follow-up to #2 (same bot, deeper question).

## 7. I Gave My AI Agents a Corporate Org Chart and They Developed Management Problems

**Pitch:** Your own prospect from the paperclip captures: CEO drifted into coding, CMO showed up with no instructions and left, COO and CEO race-conditioned each other. Anyone who's worked at a company gets it in one sentence.

**Why now:** Already on your blog-prospects list with the hook fully formed. Material is from March, so write it before it goes stale.

## 8. I Reconstructed 80% of a System Prompt Without Any Jailbreaks

**Pitch:** Attack methodology walkthrough from your March captures: reconstruction plus feedback loops beat defenses that pass CyberSecEval, and defensive clauses themselves create extractable attack surface. Same adversarial DNA as the resume post.

**Why now:** Your prospects file marks it ready to write as an attack-only post, with the defense experiment as a follow-up. Sequel energy to your two best-performing posts.

## 9. Stop Asking the Model to Do Arithmetic

**Pitch:** Everywhere you let an LLM compute or format, it drifted: anti-slop's scores wobbled 8 points from model mental math until scoring moved to python3; glean needed a deterministic fallback for fields the LLM omitted ~99% of the time; Sedge's auto-tagger became a bash script because "we can't trust the agent to consistently format YAML, but we can trust 10 lines of bash." Rule: LLM for judgment, code for anything measured.

**Why now:** Short, sharp, quotable rule. Pairs naturally with #4 and #5 as a loose "operating agents" series.

## 10. The Audit Found a Real Bug in Every Single Repo

**Pitch:** anti-slop ran over five vibe-coded projects and found a ReDoS, an RCE via fork PRs, auth bypasses, and untested fund-moving code. The pitch isn't the tool, it's the base rate: if a structured audit finds a real bug every time, what's sitting in the repos nobody audits?

**Why now:** "Vibe-coded software is everywhere and it's load-bearing" is a live anxiety. Keep friends' repos anonymous except where already public.

## 11. Valid Padding Is Worthless: Notes from the GSMG.IO 5 BTC Puzzle

**Pitch:** Cryptanalysis field notes from a famous unsolved puzzle: wrong AES keys produce valid PKCS7 padding by chance (confirmed 9 of 828 candidates), so the obvious success signal is noise. Also a case study in structuring a research repo so negative results compound instead of getting re-explored.

**Why now:** Public puzzle, zero privacy concerns, and treasure-hunt content has a built-in audience. Niche risk, but the "your success signal is a lie" lesson generalizes.

## 12. The Cat, FileVault, and the 20-Minute Outage

**Pitch:** Cat reboots the machine, automation goes dark for 20 minutes, and the culprit is FileVault holding every LaunchAgent hostage at the login screen. Short debugging story with a systems lesson about what "the machine is up" actually means.

**Why now:** Low effort, high charm. Good palate cleanser between heavier posts.

## 13. Cargo-Cult Hyperparameters

**Pitch:** From your prospects file: everyone in parameter golf copied `clamp_min(1/31)` without validating it, wasting 40% of the quantization levels. Lead with the universal "copied config without questioning it" pattern; the quantization is the example, not the thesis.

**Why now:** The title alone is shareable. Needs the capture dug up and the numbers re-verified, so it's mid-list.

## 14. I Measured How AI Agents Actually Read Git

**Pitch:** The data behind nit, minus the tool pitch that sank the first post: 561 sessions analyzed, agents follow a diff by reading the file only 3.9% of the time, reach for `--stat` 36% of the time. Design CLI output for how agents actually behave, not how humans do.

**Why now:** Caution flag: nit-adjacent content already flopped once. The reframe from "my tool" to "here's behavioral data" might rescue it, but ship the broader stuff first.

---

## Not on this list, on purpose

- Anything Venice or Freed beyond the already-sanitized review-crew cut. Your own notes draw that line; I kept to it.
- Identity Guard and the pilot/meeting tooling: strong material, too entangled with work context right now.
- Degen stylometry: the methodology is fascinating, but the project de-anonymizes real people. If it ever gets written, it's methodology-only.
- "Past the Yes-Man" isn't listed as a candidate because it's already an active series with its own plan. Episode 1 is fully drafted, and the series would benefit from #3 shipping first as a credibility anchor.
