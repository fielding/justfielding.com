## Design Context

### Users
Mixed audience: recruiters/hiring managers evaluating fit for a role, engineering peers reading the blog or checking what Fielding's thinking, and prospective clients deciding whether to hire. No single primary job — the site has to let all three size Fielding up quickly without flattening his personality for any of them. Visitors arrive on desktop or phone, usually cold, and leave within a few minutes unless something hooks them.

### Brand Personality
**Ink punk × monobrutalism.** Slightly punk, not corporate. Confident but not performative. The aesthetic is established and working: Titillium Web display + Inconsolata monospace body, a single accent magenta-pink (`--accent`: `#c92873` light / `#e7349c` dark), accent square bullets, accent dot separators, accent underline on section headers, and a glitch-on-hover SVG filter on links. The glitch is part of the vocabulary — present, occasional, not leaned into as the defining move.

Voice is direct and technical with a bit of bite. A personal site made by a person who writes code and has opinions, not a polished agency showcase and not a warm-hug "Hi, I'm Fielding 👋" template.

### Aesthetic Direction
- **Type**: Titillium Web for headlines and entry titles (weights 600–900). Inconsolata for body, metadata, tags, code. This monospace-body choice is load-bearing for the "ink punk" feel — don't swap it for a neutral sans "for readability."
- **Color**: warm off-white `#fafafa` light / near-black `#131417` dark surfaces. Single accent magenta-pink (`--accent`, `#c92873` light / `#e7349c` dark) used sparingly but unmistakably. Subtle text `#6b7280` light / `#9ca3af` dark. Never use pure black or pure white. Dark mode is system-preference driven via `@media (prefers-color-scheme: dark)` — no toggle, no JS.
- **Layout**: narrow max-width 720px container, left-aligned content, generous top/bottom breathing room. Visual rhythm comes from accent marks (dots, squares, underlines), not from cards or dividers.
- **Motion**: glitch-on-hover for links via SVG filter (needs both `glitched` and `glitch-on-hover` classes, and the `<a>` must be the direct hover target). Otherwise restrained — no scroll-jacking, no entrance stagger parades, no smooth-scroll libraries.
- **Anti-reference**: generic dev portfolio template. No hero-with-gradient, no icon-card grids of "skills," no wave-emoji intro, no testimonial carousel, no "crafted with ❤️" footer.
- **Blog**: Human++ Base24 palette on `#1a1c22` for fenced code. Inline code on subtle gray tint. Blockquotes with a 3px accent-pink LEFT border — this one is grandfathered in and stays; do NOT replicate the pattern on cards/list items/alerts elsewhere.

### Design Principles
1. **One accent, used with discipline.** The magenta-pink is the signature. It appears on dots, squares, underlines, link color, selection background, blockquote border — and almost nowhere else. Every new use should earn it or not happen.
2. **Monospace is a feature, not a fallback.** Inconsolata body is deliberate. Preserve the terminal-adjacent texture. Don't rationalize swapping to a "more readable" neutral sans.
3. **Narrow column, left-aligned, asymmetric.** 720px max, no centering everything, no card-wrapping. Content flows; accent marks punctuate. Break the grid only for emphasis, never for decoration.
4. **Not a template.** If a pattern shows up in 50 other personal sites this year, don't use it here. This includes: hero gradients, big CTA buttons, feature-card grids, "Hi, I'm [name]" intros, icon-above-heading blocks, skill-tag clouds.
5. **Glitch is seasoning, not the entrée.** The hover glitch is memorable because it's used sparingly on links. Don't add glitches to headings, images, or page transitions to lean into the effect harder — that kills it.
