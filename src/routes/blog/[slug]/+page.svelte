<script lang="ts">
	import '$lib/styles/prism-human-plus-plus.css';
	import { formatDate } from '$lib/posts';
	export let data;
</script>

<svelte:head>
	<title>{data.meta.title} - Fielding Johnston</title>
	<meta name="description" content={data.meta.description} />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://justfielding.com/blog/{data.slug}" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={data.meta.title} />
	<meta name="twitter:description" content={data.meta.description} />
</svelte:head>

<article>
	<header>
		<h1>{data.meta.title}</h1>
		<p class="meta">
			<span>{formatDate(data.meta.date)}</span><span class="sep">·</span><span
				>{data.meta.readingTime} min read</span
			>
		</p>
	</header>

	<div class="content">
		<svelte:component this={data.content} />
	</div>

	<nav class="post-nav">
		{#if data.prev}
			<a href="/blog/{data.prev.slug}" class="prev glitched glitch-on-hover"
				>← {data.prev.title}</a
			>
		{/if}
		<a href="/blog" class="all glitched glitch-on-hover">all posts</a>
		{#if data.next}
			<a href="/blog/{data.next.slug}" class="next glitched glitch-on-hover"
				>{data.next.title} →</a
			>
		{/if}
	</nav>
</article>

<style>
	header {
		margin-bottom: 2.5rem;
	}

	h1 {
		font-family: 'Titillium Web', sans-serif;
		font-weight: 700;
		font-size: clamp(2rem, 6vw, 3rem);
		margin-bottom: 0.5rem;
		border: none;
		line-height: 1.15;
	}

	.meta {
		display: block;
		font-family: 'Inconsolata', monospace;
		color: var(--subtle-text);
		font-size: 0.85rem;
		letter-spacing: 0.02em;
		margin: 0;
	}

	.sep {
		color: var(--accent);
		margin: 0 0.4em;
		font-weight: bold;
	}

	.post-nav {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
		margin-top: 3rem;
		padding-top: 1.5rem;
		border-top: 1px solid color-mix(in oklch, var(--subtle-text) 50%, transparent);
		font-family: 'Inconsolata', monospace;
		font-size: 0.9rem;
	}

	.post-nav a {
		max-width: 40ch;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.post-nav .prev {
		text-align: left;
	}

	.post-nav .all {
		text-align: center;
		flex-shrink: 0;
	}

	.post-nav .next {
		text-align: right;
		margin-left: auto;
	}

	@media (max-width: 600px) {
		.post-nav {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.75rem;
		}

		.post-nav a {
			max-width: 100%;
			text-align: left;
			margin-left: 0;
		}
	}

	.content {
		margin-bottom: 3rem;
		line-height: 1.55;
	}

	.content :global(h2) {
		font-size: 1.5rem;
		font-weight: 700;
		margin-top: 2rem;
		border: none;
	}

	.content :global(h3) {
		font-size: 1.2rem;
		font-weight: 700;
		margin-top: 1.5rem;
		border: none;
	}

	.content :global(pre) {
		background: #1a1c22;
		color: #dbd6cc;
		padding: 1rem;
		overflow-x: auto;
		font-family: 'Inconsolata', monospace;
		font-size: 0.9rem;
		margin: 1.5rem 0;
	}

	.content :global(code) {
		font-family: 'Inconsolata', monospace;
		font-size: 0.88em;
		background: color-mix(in oklch, var(--text) 8%, transparent);
		padding: 0.15rem 0.4rem;
		border-radius: 3px;
	}

	.content :global(pre code) {
		background: none;
		color: inherit;
		padding: 0;
		border-radius: 0;
		font-size: 0.9rem;
	}

	.content :global(a) {
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 2px;
	}

	.content :global(a:hover) {
		text-decoration-thickness: 2px;
	}

	.content :global(ul),
	.content :global(ol) {
		margin-left: 1.2rem;
		margin-bottom: 1.45rem;
	}

	.content :global(ul) {
		list-style: none;
	}

	.content :global(ul > li) {
		position: relative;
		padding-left: 1.2rem;
	}

	.content :global(ul > li::before) {
		content: '■';
		color: var(--accent);
		font-size: 8px;
		position: absolute;
		left: 0;
		top: 0.45rem;
	}

	.content :global(li) {
		margin-bottom: 0.4rem;
	}

	.content :global(table) {
		width: 100%;
		border-collapse: collapse;
		margin: 1.5rem 0;
		font-size: 0.9rem;
	}

	.content :global(thead) {
		border-bottom: 2px solid var(--accent);
	}

	.content :global(th) {
		font-family: 'Titillium Web', sans-serif;
		font-weight: 600;
		text-align: left;
		padding: 0.5rem 0.75rem;
	}

	.content :global(td) {
		padding: 0.4rem 0.75rem;
		border-bottom: 1px solid color-mix(in oklch, var(--text) 8%, transparent);
	}

	.content :global(tr:last-child td) {
		border-bottom: none;
	}

	.content :global(strong) {
		font-weight: 700;
	}

	.content :global(hr) {
		border: none;
		height: 1px;
		background: color-mix(in oklch, var(--text) 10%, transparent);
		margin: 2rem 0;
	}

	.content :global(blockquote) {
		border-left: 3px solid var(--accent);
		margin-left: 1.5rem;
		padding: 0 1.25rem;
		font-style: italic;
	}

	.content :global(blockquote p:last-child) {
		margin-bottom: 0;
	}

</style>
