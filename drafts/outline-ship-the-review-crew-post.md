# Outline: Ship "I Made Three AI Models Argue About My Code. Then I Hired Two."

Not an outline so much as a launch checklist. The post is written and it's good. It lives at `~/notes/Enduring/Writing/multi-agent-code-review.md` with frontmatter dated 2026-03-24.

## What it already has

- The hook: healthcare software, Claude Code Action on every PR, and zero PHI/privilege-escalation/consent findings in 102 PRs. Then the table of five PRs where the single reviewer said ship and the crew said block, all confirmed by developer fixes.
- The architecture: independent review, forced discussion with minimum message counts, code-enforced phase gates ("you cannot rely on language models to follow a state machine described in prose").
- The behavioral findings, which are the shareable part: Gemini flips 59%, Opus 22%, GPT 17%; GPT raised 31 security concerns to Opus's 4; 42.7% file-level finding overlap.
- The honest cost section and the third-Ghostbuster demotion of Gemini.

## Refresh before publishing

1. **Date bump.** Frontmatter says 2026-03-24. Update to publish date; the data window (Jan to early March 2026) is stated in the body, so it stays honest either way.
2. **Two features landed since the draft:** branch-entrypoint mode (review a pushed branch with no PR) and defaulting reviewers to subscription harnesses instead of metered API keys. One sentence each in the "Try It" section. The subscription default also changes the cost story at the margin; a parenthetical is enough.
3. **Link check:** github.com/fielding/review-crew and github.com/fielding/box both referenced. Verify both repos are public and READMEs are presentable, since this post will send traffic.
4. **Sanitization pass:** the PR numbers and bug descriptions are already generic (no company name, no PHI specifics beyond category labels). Re-read once with the "would I be comfortable if a coworker read this" filter. The teammate quote is anonymous; keep it that way.
5. **Move to `src/posts/`, publish, and cross-post the mind-change stat.** "AI models changed their minds 31% of the time when forced to argue" is the tweet. The architecture is the blog post.

## Why this goes first

It's the credibility anchor for everything else on the topics list. The always-on-agent post, the eval post, and the "Past the Yes-Man" series all get stronger when this one is already public and linkable.
