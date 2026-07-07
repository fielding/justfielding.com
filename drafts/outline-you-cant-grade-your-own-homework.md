# Outline: You Can't Grade Your Own Homework

**Working title:** "You Can't Grade Your Own Homework" (alt: "My Neural Net Went Insane and the Eval Said It Was Fine")

**The argument:** Self-referential evaluation doesn't fail loudly, it fails silently. When the thing being tested and the thing doing the testing share an author (or a training set, or a proxy), collapse looks like health. The fix isn't better metrics, it's an outside adversary. This is one idea proven four times by four different projects.

**Audience:** anyone building or evaluating AI systems. This is the abstract companion piece to the poker post; each can link the other.

## Hook

Open with the poker net: a neural network collapsed into unsound play and the evaluation pipeline reported nothing wrong for rounds, because it was training and evaluating against the same stat-bots. Direct quote from the notes: "the eval couldn't see what it wasn't looking for." One paragraph, then name the pattern.

## Section 1: The poker net (the dramatic case)

- Self-referential eval: train against stat-bots, evaluate against the same stat-bots. The net's collapse to unsoundness went undetected.
- The moment external eval became non-negotiable: Slumbot and the ACPC dataset as outside opponents.
- Bonus trap from the same project: the arena leaderboard itself was a bad proxy. Maniac, fish, and nit strategies all converged to the same score (24.93) against a single fixed opponent, and never-fold posted +193 bb/100. The eval measured aggression, not poker.

## Section 2: The demo that stopped reproducing (the humbling case)

- The December sycophancy demo (same bug, two prompts) stopped reproducing on newer models in May. First-order finding: models hardened.
- Second-order finding, the one that matters here: the test itself was author-biased. Self-authored bugs written to be caught are a different population than bugs that actually shipped. Recovering the real incident PR from a September session gave a legitimate test, and the result split by model tier.
- Lesson: benchmark on bugs your team actually shipped, not on puzzles you wrote for the model to solve. (This principle also made it into the Past the Yes-Man ep. 1 draft; keep one canonical phrasing.)

## Section 3: Structural fixes, not vigilance (specter, review-crew)

- Specter's whole design: implementer and verifier are isolated agents that never see each other's work, because "otherwise we are back to the same self-grading problem, where the model writes code and then conveniently writes the tests its own code can pass."
- review-crew's version: three models with enforced independence in phase 1, no peeking, because one confident model anchors everyone else. Genuine disagreement is where the bugs hide.
- The point of both: don't ask the author to be honest, make honesty structural.

## Section 4: The audit corollary (anti-slop)

- Every repo anti-slop audited had passed its own author's judgment. The external pass found a real bug in every single one (ReDoS, fork-PR RCE, auth bypass, untested fund-moving code).
- The author's eval of their own repo is the same trap at human scale.

## Close

- The rule: any eval you can influence from inside the system you're evaluating will eventually flatter you. Budget for an outside adversary the way you budget for tests.
- Callback to the opening: the net didn't hide its collapse. The eval just wasn't looking.

## Evidence inventory (all from June notes unless marked)

- Poker: self-referential eval discovery (June 20), leaderboard convergence at 24.93 (June 24), never-fold +193 (June 5), Slumbot/ACPC adoption.
- Sycophancy demo: reproduction failure and author-bias diagnosis (May 20-21), recovered PR from Sept 2025 session.
- Specter: adversarial verification thesis note (March 10).
- review-crew: phase-1 isolation rationale, from the finished draft.
- anti-slop: five-repo audit results (June 1).
