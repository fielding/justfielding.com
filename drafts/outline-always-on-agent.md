# Outline: Running an Always-On Agent: What Actually Broke

**Working title:** "Running an Always-On Agent: What Actually Broke" (alt: "My Agent Runs 24/7. Here's the Incident Log.")

**The argument:** Operating a personal autonomous agent around the clock is systems engineering, not prompt engineering. Every interesting failure in a month of running Sedge was infrastructure: config, scheduling, model tiering, delivery plumbing. The prompts were rarely the problem, and rewriting them was usually the wasted effort.

**Audience:** the wave of people currently standing up always-on personal agents. The ops-postmortem genre doesn't exist for agents yet. Get there first.

**Tone:** incident-log honesty. Each section is a failure, a wrong first theory, and the actual fix. The wrong first theory is the valuable part.

## Hook

The agent acknowledges the work, describes what it's going to do, and then... doesn't do it. Days spent rewriting HEARTBEAT.md and sharpening instructions. None of it mattered. The fix was two config fields: an unset tools profile and thinking disabled. Open with that arc because it's the thesis in miniature: it looked like a prompt problem, it was a config problem.

## Section 1: The prompt was never the problem

- Full story of the narrates-but-doesn't-execute bug. Symptom reads exactly like a motivation/instruction failure, which is why days went into prose.
- Lesson: when an agent's behavior changes character (understands but doesn't act), suspect the harness before the prompt.

## Section 2: 288 runs a day

- The */5 polling cron: two useful runs, 286 wasted ones. Killed it.
- Replacement pattern: the morning briefing schedules one-shot reminders for the day's actual events. Two runs per meeting instead of 288 per day.
- Generalize: polling is a human pattern from cheap compute. Agent runs are expensive; schedule intent, don't poll for it.

## Section 3: Mini models can't triage

- The escalation path gave a mini model one job: is this PR's last commit newer than the last review timestamp? It couldn't reliably do it, so it never escalated. Silence that looks like "nothing to report."
- Lesson: model tiering isn't just cost optimization. Multi-step temporal reasoning is a capability cliff, and triage sits right on it.

## Section 4: Trust the bash script

- Auto-tagging notes: can't trust the agent to consistently format YAML, can trust 10 lines of bash under systemd. The LLM proposes, deterministic code disposes.
- Same pattern elsewhere: filtering with .stignore instead of asking the agent to change behavior; deterministic fallbacks in glean for fields the LLM omitted ~99% of the time.
- Rule of thumb: if it has to happen every time, it isn't a prompt.

## Section 5: The task spine

- Agents can't hold open loops in memory or chat; they dissolve across heartbeats. tix (repo-local issue tracker) as external memory.
- The one rule that keeps it alive: never close a ticket without creating a follow-up first.
- Smaller plumbing gotcha for flavor: with local delivery mode, the agent's final response goes nowhere visible, despite a MANDATORY clause saying otherwise. Prose loses to plumbing again.

## Close

- The scoreboard after a month: the agent files real PRs and does real work, and every fix that mattered was a systems fix.
- Closing line direction: prompt engineering is what you do while you're figuring out which part of the harness is actually broken.

## Evidence inventory

- Sedge DECISIONS log: config fix, cron lesson, mini-model triage, delivery gotcha, tix rule.
- glean: deterministic fallback numbers.
- Published Kimi K2.5 resilience post exists for the multi-provider angle; reference it rather than re-explaining fallback chains.

## Privacy check

All Sedge/tix/glean material is personal-infra, publicly repo-backed. Nothing employer-related in scope.
