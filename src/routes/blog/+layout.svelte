<script lang="ts">
	import { page } from '$app/stores';
	import { hoverGlitch } from '$lib/actions/glitch';
	import { GlitchEffect } from '$lib/components';
</script>

<div use:hoverGlitch>
<nav>
	<a href="/" class="site-name glitched glitch-on-hover"><strong>.</strong>Fielding<strong>.</strong></a>
	<span class="sep">/</span>
	<a
		href="/blog"
		class="section glitched glitch-on-hover"
		class:active={$page.url.pathname === '/blog'}
	>blog</a>
</nav>

<slot />
<GlitchEffect />
</div>

<style>
	nav {
		display: flex;
		align-items: baseline;
		gap: 0.35rem;
		margin-bottom: 2.5rem;
		font-family: 'Titillium Web', sans-serif;
	}

	.site-name {
		font-size: 1.6rem;
		font-weight: 900;
		text-decoration: none;
		color: var(--text);
	}

	.site-name strong {
		color: var(--accent);
		font-weight: 900;
	}

	.sep {
		color: var(--subtle-text);
		font-weight: 300;
		font-size: 1.4rem;
	}

	.section {
		font-size: 1.4rem;
		font-weight: 300;
		text-decoration: none;
	}

	.section.active {
		font-weight: 700;
	}

	/* Dark-mode display crispness: drop weight + stroke edges with bg color. */
	@media (prefers-color-scheme: dark) {
		.site-name,
		.site-name strong {
			font-weight: 800;
			-webkit-text-stroke: 0.25px var(--background);
		}
	}
</style>
