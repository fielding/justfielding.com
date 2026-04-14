<script>
	import { randomGlitch } from '$lib/actions/glitch';
</script>

<h1><strong use:randomGlitch class="js-random-interval glitched">.</strong><span use:randomGlitch class="js-random-interval glitched">Fielding</span><strong use:randomGlitch class="js-random-interval glitched">.</strong></h1>

<style>
	h1 {
		font-weight: 900;
		font-size: clamp(2.5rem, 11vw, 4rem);
		white-space: nowrap;
	}
	h1 strong {
		font-weight: 900;
		color: var(--accent);
	}

	/* Dark-mode display crispness: drop weight + stroke edges with bg color. */
	@media (prefers-color-scheme: dark) {
		h1,
		h1 strong {
			font-weight: 800;
			-webkit-text-stroke: 0.25px var(--background);
		}
	}
</style>
