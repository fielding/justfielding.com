<script lang="ts">
	import { page } from '$app/stores';
	import { GlitchEffect } from '$lib/components';
	import { hoverGlitch, randomGlitch } from '$lib/actions/glitch';
</script>

<svelte:head>
	<title>{$page.status} · Fielding Johnston</title>
</svelte:head>

<main use:hoverGlitch>
	<section>
		<h1><strong use:randomGlitch class="glitched">.</strong><span use:randomGlitch class="glitched">{$page.status}</span><strong use:randomGlitch class="glitched">.</strong></h1>
		<p>
			This page does not exist, or it did and I moved it, or it will exist and you're early.
			Try <a href="/" class="glitched glitch-on-hover">the root</a> or
			<a href="/blog" class="glitched glitch-on-hover">the blog</a>.
		</p>
		<p class="meta">
			<span>status {$page.status}</span><span class="sep">·</span><span
				>path {$page.url.pathname}</span
			>
		</p>
	</section>

	<GlitchEffect />
</main>

<style>
	section {
		margin-top: 2rem;
	}

	h1 {
		font-family: 'Titillium Web', sans-serif;
		font-weight: 900;
		font-size: clamp(2.5rem, 11vw, 4rem);
		line-height: 1.1;
		margin-bottom: 1rem;
		border: none;
		white-space: nowrap;
	}

	h1 strong {
		color: var(--accent);
		font-weight: 900;
	}

	@media (prefers-color-scheme: dark) {
		h1,
		h1 strong {
			font-weight: 800;
			-webkit-text-stroke: 0.25px var(--background);
		}
	}

	.meta {
		font-family: 'Inconsolata', monospace;
		color: var(--subtle-text);
		font-size: 0.85rem;
		letter-spacing: 0.02em;
		margin-top: 2rem;
	}

	.sep {
		color: var(--accent);
		margin: 0 0.4em;
		font-weight: bold;
	}
</style>
