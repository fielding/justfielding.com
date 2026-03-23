<script lang="ts">
	import '$lib/styles/prism-human-plus-plus.css';
	export let data;
</script>

<svelte:head>
	<title>{data.metadata.title} - Fielding Johnston</title>
	<meta name="description" content={data.metadata.description} />
	<meta property="og:title" content={data.metadata.title} />
	<meta property="og:description" content={data.metadata.description} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://justfielding.com/blog/{data.slug}" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={data.metadata.title} />
	<meta name="twitter:description" content={data.metadata.description} />
</svelte:head>

<article>
	<header>
		<h2>{data.metadata.title}</h2>
		<span class="meta">{data.metadata.date}</span>
	</header>

	<div class="content">
		<svelte:component this={data.content} />
	</div>
</article>

<style>
	header {
		margin-bottom: 2.5rem;
	}

	h2 {
		font-family: 'Titillium Web', sans-serif;
		font-weight: 600;
		font-size: 1.8rem;
		margin-bottom: 0.5rem;
		border: none;
		line-height: 1.25;
	}

	.meta {
		display: block;
		font-family: 'Inconsolata', monospace;
		color: var(--subtle-text-light);
		font-size: 0.85rem;
		letter-spacing: 0.02em;
	}

	:global(body.dark) .meta {
		color: var(--subtle-text-dark);
	}

	.content {
		margin-bottom: 3rem;
	}

	.content :global(h2) {
		font-size: 1.3rem;
		font-weight: 600;
		margin-top: 2rem;
		border: none;
	}

	.content :global(h3) {
		font-size: 1.1rem;
		font-weight: 600;
		margin-top: 1.5rem;
		border: none;
	}

	.content :global(pre) {
		background: #1a1c22;
		color: #dbd6cc;
		padding: 1rem;
		border-radius: 4px;
		overflow-x: auto;
		font-family: 'Inconsolata', monospace;
		font-size: 0.9rem;
		margin: 1.5rem 0;
		border-top: 2px solid var(--accent-red);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.content :global(code) {
		font-family: 'Inconsolata', monospace;
		font-size: 0.88em;
		background: rgba(0, 0, 0, 0.06);
		color: var(--accent-red);
		padding: 0.15rem 0.4rem;
		border-radius: 3px;
	}

	:global(body.dark) .content :global(code) {
		background: rgba(255, 255, 255, 0.1);
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
		color: var(--accent-red);
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
		border-bottom: 2px solid var(--accent-red);
	}

	.content :global(th) {
		font-family: 'Titillium Web', sans-serif;
		font-weight: 600;
		text-align: left;
		padding: 0.5rem 0.75rem;
	}

	.content :global(td) {
		padding: 0.4rem 0.75rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.08);
	}

	:global(body.dark) .content :global(td) {
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
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
		background: rgba(0, 0, 0, 0.1);
		margin: 2rem 0;
	}

	:global(body.dark) .content :global(hr) {
		background: rgba(255, 255, 255, 0.1);
	}

	.content :global(blockquote) {
		border-left: 3px solid var(--accent-red);
		margin-left: 0;
		padding: 1rem 1.25rem;
		background: rgba(0, 0, 0, 0.03);
		border-radius: 0 4px 4px 0;
		font-style: italic;
		color: var(--subtle-text-light);
	}

	:global(body.dark) .content :global(blockquote) {
		background: rgba(255, 255, 255, 0.04);
		color: var(--subtle-text-dark);
	}

	.content :global(blockquote p:last-child) {
		margin-bottom: 0;
	}

</style>
