<script lang="ts">
	import { hoverGlitch } from '$lib/actions/glitch';
	import { GlitchEffect } from '$lib/components';
</script>

<div use:hoverGlitch>
<nav>
	<a href="/" class="site-name glitched glitch-on-hover"><strong>.</strong>Fielding<strong>.</strong></a>
	<span class="sep">/</span>
	<a href="/blog" class="section glitched glitch-on-hover">blog</a>
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
		color: var(--text-light);
	}

	:global(body.dark) .site-name {
		color: var(--text-dark);
	}

	.site-name strong {
		color: var(--accent-red);
		font-weight: 900;
	}

	.sep {
		color: var(--subtle-text-light);
		font-weight: 300;
		font-size: 1.4rem;
	}

	:global(body.dark) .sep {
		color: var(--subtle-text-dark);
	}

	.section {
		font-size: 1.4rem;
		font-weight: 300;
		text-decoration: none;
	}
</style>
