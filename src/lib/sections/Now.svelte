<script>
	import SectionHeader from '$lib/components/SectionHeader.svelte';

	export let posts = [];
</script>

<section id="now">
	<SectionHeader id="now">Now</SectionHeader>
	<p class="updated">As of March 2026</p>

	<p>
		Code is no longer the bottleneck. That changes what's worth building. I've been circling
		around four areas: highlighting human intent so it isn't lost, encoding constraints so
		they're enforced automatically, empowering agents to build faster, and eliminating the
		review bottleneck entirely.
	</p>
	<p>
		<a href="https://github.com/fielding/human-plus-plus" class="glitched glitch-on-hover" target="_blank" rel="noopener noreferrer">human++</a>
		is a color scheme and editor extension built around the idea that code is cheap and intent is scarce.
		<a href="https://fielding.github.io/sigil/" class="glitched glitch-on-hover" target="_blank" rel="noopener noreferrer">sigil</a>
		is still finding its shape, somewhere between ADRs and a knowledge graph.
		<a href="https://github.com/fielding/nit" class="glitched glitch-on-hover" target="_blank" rel="noopener noreferrer">nit</a>
		makes what agents do cheaper.
		<a href="https://github.com/fielding/sprawl" class="glitched glitch-on-hover" target="_blank" rel="noopener noreferrer">sprawl</a>
		lets them do it together.
		<a href="https://review.justfielding.com" class="glitched glitch-on-hover" target="_blank" rel="noopener noreferrer">review-crew</a>
		has been a really successful experiment in multi-model adversarial code review. And
		<a href="https://youtu.be/Q0IEP5n8Mh4" class="glitched glitch-on-hover" target="_blank" rel="noopener noreferrer">clipside</a>
		is a project built entirely by a team of agents (using most of the tools above) so I could watch them work.
	</p>

	{#if posts.length > 0}
		<h3>Recent writing</h3>
		{#each posts as post}
			<p class="post-link">
				<a href="/blog/{post.slug}" class="glitched glitch-on-hover">{post.title}</a>
				<span class="post-date">{post.date}</span>
			</p>
		{/each}
		<p class="all-posts"><a href="/blog" class="glitched glitch-on-hover">all posts &rarr;</a></p>
	{/if}
</section>

<style>
	.updated {
		font-size: 0.8rem;
		color: var(--subtle-text-light);
		margin-top: -1.5rem;
		margin-bottom: 1.5rem;
	}

	:global(body.dark) .updated {
		color: var(--subtle-text-dark);
	}

	h3 {
		font-size: 1rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.post-link {
		margin-bottom: 0.25rem;
	}

	.post-date {
		font-size: 0.8rem;
		color: var(--subtle-text-light);
		margin-left: 0.4rem;
	}

	:global(body.dark) .post-date {
		color: var(--subtle-text-dark);
	}

	.all-posts {
		font-size: 0.85rem;
	}
</style>
