---
title: "My Minecraft Bot Kept Drowning While It Thought"
date: '2026-07-02'
description: Profiling an LLM agent's context window: 76% of the tokens were tool definitions, and trimming them took planning calls from 22.6 seconds to under one.
draft: true
---

I have an autonomous Minecraft survival agent named Wally. He runs on a local model, plans his own goals, gathers resources, builds shelter. And for a while, he had a recurring cause of death that no amount of prompt engineering fixed: he kept drowning while he was thinking.

The loop went like this. Wally wanders near water. Something prompts a planning call to the LLM. The call takes 22.6 seconds. Minecraft does not pause while Wally contemplates his future, so by the time the model returns a beautifully reasoned plan, Wally has been face-down in a lake for twenty of those seconds. Plan arrives, executor fires, Wally is dead. It's like your GPS calculating the perfect route while you drive into the harbor.

My first instinct was the usual one: better model? Better prompt? More aggressive interrupt logic? Instead I did the thing I'd somehow skipped, and profiled what was actually in the context window of every call.

## Where the tokens actually were

Tool definitions. 76% of the prompt tokens were tool definitions.

Not conversation history, not world state, not the system prompt's survival wisdom. The JSON schemas describing Wally's tools, each one lovingly documented with multi-sentence descriptions, parameter explanations, usage examples. I'd written them like API docs for a human junior developer, because that's what every tool-calling tutorial shows you. And every single planning call paid the full freight, every time, before the model read one token about the actual situation.

The system prompt made up most of the rest. Advice, edge cases, formatting rules. The part of the context describing the world Wally currently occupied (the part that decides whether he's drowning) was a rounding error.

## The fix was deletion

I rewrote every tool definition as a one-liner. `mine_block: mines the named block type` tells the model everything the three-sentence version did. Models know what mining is. Then I cut the system prompt by 40%, which was mostly me admitting that half of it was instructions the model followed fine without being told.

Warm planning calls went from 22.6 seconds to about 900ms. After the dust settled, 82% of all LLM calls came in under one second, against a baseline of 18-22 seconds. Wally stopped drowning mid-thought, because thoughts now finished before physics did.

For a 25x speedup, the total engineering effort was deleting words. No model change. No new hardware. I also dropped the local model's context window from 32k to 8k once the prompts fit, which freed about 3GB of VRAM and shaved another ~20% off latency. Smaller context, faster attention. The savings compound.

## The vision model was writing poetry

One more token pathology worth confessing. Wally has a vision model for describing what he sees, and I'd prompted it to produce 60-80 words of visual description per observation. Sounds reasonable. In practice, when the scene was three stone blocks in a cave, the model padded to quota with mood: "dark," "narrow," "jagged," "foreboding."

The planner read that atmospheric filler as threat signal and got spooked by ordinary caves. I was paying tokens to generate anxiety, then paying more tokens to reason about it. The fix, again, was shorter: describe what's there, stop when you're done.

## Reflexes don't go through the planner

Latency work has a ceiling, though. Even at 900ms, some of Minecraft happens faster than any LLM call, so the real architecture lesson was splitting the brain: tick-level hazard handlers (drowning, burning, falling) that act immediately in code, with the LLM doing strategy on top. The lizard brain yanks your hand off the stove; the neocortex writes the incident report. Wally needed a lizard brain, and no amount of token trimming substitutes for one.

## Profile before you prompt

The generalizable part isn't Minecraft. Every agent conversation I see is about prompts and model choice, and almost none are about token composition, even though it's the layer under everything: latency, cost, and how much room the actual task gets in the window.

I found the same shape in a different place this spring, pulling data from thousands of real coding sessions for [nit](/blog/nit-replacing-git-with-zig): git output alone was 7.4% of all shell tokens, formatted with headers and padding no model needs. Different system, same disease. The context fills up with ceremony, and nobody's watching because tokens are invisible until you count them.

So count them. One profiling pass, grouped by category: tool definitions, system prompt, history, live state. If your agent is slow or dumb, there's a decent chance it's neither the model nor the prompt. It's that you're making it re-read the employee handbook before every decision, and the handbook is 76% of everything it reads.

Wally survives lakes now. He's since moved on to more advanced problems, like hoarding forty stacks of cobblestone for no reason. But that's a different post.
