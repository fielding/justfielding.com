<script lang="ts">
	export let data;
</script>

<section>
	{#each data.posts as post}
		<article>
			<h3><a href="/blog/{post.slug}" class="glitched glitch-on-hover">{post.title}</a></h3>
			<span class="meta">{post.date}</span>
		</article>
	{/each}
</section>

<style>
	article {
		margin-bottom: 2rem;
	}

	h3 {
		font-family: 'Titillium Web', sans-serif;
		font-weight: 600;
		font-size: 1.3rem;
		margin-bottom: 0.25rem;
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

</style>
