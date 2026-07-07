---
title: "My Poker Bot's Neural Net Lost to My Own If-Statements"
date: '2026-07-02'
description: A month of solvers, policy gradients, and transfer learning, and the hand-written heuristic is still the best bot by 30 bb/100.
draft: true
---

I run a poker bot in an online arena where it plays heads-up against other people's bots, around the clock, for keeps (well, for leaderboard position). The bot's decision core is a hand-written heuristic. If-statements, equity math, position logic. In June I decided it was time to graduate to real ML: neural nets, policy gradients, CFR solvers, the whole curriculum.

A month later I checked the numbers and switched the live bot back to the heuristic. It was beating every net I'd trained by about 30 bb/100.

That's the punchline up front. The interesting part is everything the month taught me about evaluation, because almost every wrong turn I took was the eval's fault, not the model's.

## The leaderboard was a trap

First lesson came before I'd trained anything. The arena's sandbox leaderboard had top scores in the 300-586 bb/100 range, which is an absurd win rate. For scale: a strong professional beats a weak game for maybe 10 bb/100. Nobody beats real poker for 500.

So I poked at it. The sandbox evaluates you against a single fixed opponent, and every strategy that reliably beats that opponent converges to the same score. Maniac, fish, nit... all 24.93. Meanwhile a "station" strategy (literally never fold) validated at +193 bb/100. The leaderboard wasn't measuring poker. It was measuring willingness to shovel chips at one particular opponent's weaknesses, the way a dyno measures noise if you strap the sensor to the exhaust.

If I had optimized for that leaderboard, I'd have built the world's most confident calling station and called it progress.

## The eval couldn't see what it wasn't looking for

The worse version of the same mistake happened mid-month, and this one was mine. My training pipeline evaluated candidate nets against the same stat-bots they were trained against. Self-referential, top to bottom. And for several rounds it reported everything was fine while the net quietly collapsed into fundamentally unsound poker.

Nothing in the pipeline lied. The eval answered exactly the question I asked it, and I asked a question the collapse didn't show up in. The net got better and better at its sparring partners while getting worse at the game.

The fix was external opponents I didn't design: Slumbot and the ACPC dataset. Opponents built by other people, with other assumptions, catch what your own proxies miss. This is now a non-negotiable in every eval I build, poker or otherwise. If the thing being graded and the thing doing the grading share an author, you don't have an eval. You have a mirror.

## Size is a tell

One experiment deserves its own funeral. I let the net learn its own bet sizing, and the learned sizing correlated with hand strength. Big hand, big bet. Against the arena's fish, fine. Against anything balanced, it's a tell you're taping to your own forehead.

There was also a subtler bug underneath: I'd conflated preflop and postflop hands into shared buckets, and that alone was worth -245 bb/100 against Slumbot. A street-aware 12-bucket scheme brought it to -56.8. Not good, but no longer on fire. I wrote the sizing experiment up as a documented negative and kept it in the repo, because six months from now I will absolutely have this idea again and I'd like past me to be there waiting.

## My conclusions kept flipping

The research track had its own humbling arc. I built a CFR river solver in Rust (integer-indexed game tree instead of string hashing, roughly 10x faster, with a native best-response calculator that came out around 7000x faster than the reference). With actual compute I could finally ask: do interpretable equity-based features beat raw learned features?

Phase 1 said yes, decisively, especially on out-of-distribution boards. Phase 2 added deeper encoders and reversed it. Phase 3 hardened the protocol and reversed it back... the Phase 2 flip turned out to be an artifact of comparing across mismatched test manifests.

Three phases, three answers, one underlying truth: the conclusion was a function of the harness, not the models. Single training runs swung ~50 bb/100 on their own. If your methodology can flip your findings twice in a week, your findings were never findings.

## What the month actually bought me

Here's the honest ledger, because "ML bad, heuristics good" is not the takeaway.

The heuristic sits at -48 ± 20 bb/100 against Slumbot. Every net I trained did worse by ~30. At one point I discovered a weak net was still live in the playground, quietly bleeding, and swapped the heuristic back in to stop the losses. That stings to type.

But the month also produced real wins, mostly in places that had nothing to do with gradient descent:

- Watching a friend's bot stack off with air on a paired board (it saw trips on the board and decided *it* had trips) sent me hunting for the same illusion in my own evaluator. Found it. Extended the guards to flushes, straights, and full houses, and deployed the fix to my live tournament bot between hands. It was ranked #1 at the time. Zero downtime, mildly terrifying.
- A heads-up blind-position bug had my sandbox bot folding 86% of the time as the big blind. Fixed, it went live at +33 bb/100 over 1,257 hands.
- Transfer learning worked as advertised: warm-starting from an earlier net hit +21 bb/100 where from-scratch managed +7.
- And the Rust solver infrastructure is permanent. Every future experiment runs against a real oracle now instead of vibes.

## Why the if-statements are still winning

The uncomfortable truth is that the heuristic isn't dumb. It encodes the same domain knowledge (equity, position, pot odds, board texture) that my feature engineering feeds the net, except it applies that knowledge with zero variance and no training pipeline to collapse. The net has to rediscover poker from data before it can beat a thing that was handed poker for free. It'll get there. Probably.

Until then, the deployment rule at my house: the model has to beat the baseline in an eval it can't influence, against opponents I didn't build, or it doesn't touch the live bot. The if-statements have earned nothing less.
