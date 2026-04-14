<script lang="ts">
	import { SectionHeader } from '$lib/components';
	import { formatDate } from '$lib/posts';
	export let data;
</script>

<section id="posts">
	<SectionHeader id="posts">Posts</SectionHeader>

	{#each data.posts as post}
		<article>
			<h3><a href="/blog/{post.slug}" class="glitched glitch-on-hover">{post.title}</a></h3>
			<p class="meta">
				<span>{formatDate(post.date)}</span><span class="sep">·</span><span
					>{post.readingTime} min read</span
				>
			</p>
			{#if post.description}
				<p class="excerpt">{post.description}</p>
			{/if}
		</article>
	{:else}
		<p class="empty">Nothing here yet. Check back later.</p>
	{/each}
</section>

<style>
	article {
		margin-bottom: 2.25rem;
	}

	h3 {
		margin-bottom: 0.25rem;
	}

	.meta {
		display: block;
		font-family: 'Inconsolata', monospace;
		color: var(--subtle-text);
		font-size: 0.85rem;
		letter-spacing: 0.02em;
		margin-bottom: 0.5rem;
	}

	.sep {
		color: var(--accent);
		margin: 0 0.4em;
		font-weight: bold;
	}

	.excerpt {
		font-family: 'Inconsolata', monospace;
		color: var(--subtle-text);
		font-size: 0.9rem;
		line-height: 1.4;
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.empty {
		color: var(--subtle-text);
		font-style: italic;
	}
</style>
