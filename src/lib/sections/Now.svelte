<script lang="ts">
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import { formatDate } from '$lib/posts';

	type RecentPost = {
		slug: string;
		title: string;
		date: string;
		readingTime: number;
	};

	export let posts: RecentPost[] = [];
</script>

<section id="now">
	<SectionHeader id="now">Now</SectionHeader>
	<p class="updated">As of November 2026</p>

	<p>
		Day job is Venice, a privacy-first generative AI platform. I built Anon Email, which keeps real
		addresses out of third-party systems while mail still reaches your inbox, and these days I'm on
		the team rewriting our inference infrastructure in Rust.
	</p>
	<p>
		After hours, <a href="https://selvwallet.com" class="glitched glitch-on-hover" target="_blank" rel="noopener noreferrer">SelvWallet</a> takes most of my time.
		<a href="/blog/any-advice-on-building-a-crypto-wallet" class="glitched glitch-on-hover"
			>I told a stranger on Telegram not to build a crypto wallet.</a
		>
		He built it anyway, I helped him rebuild it, and now I'm his cofounder.
		<a href="https://redstone.university" class="glitched glitch-on-hover" target="_blank" rel="noopener noreferrer">Redstone University</a>, my computer
		architecture course taught inside Minecraft, is waiting for me to get back to it.
	</p>
	<p>
		The rest goes to tools for working with agents. Code is no longer the bottleneck, and that
		changes what's worth building. I've been circling around four areas: highlighting human intent
		so it isn't lost, encoding constraints so they're enforced automatically, empowering agents to
		build faster, and eliminating the review bottleneck entirely.
	</p>

	{#if posts.length > 0}
		<h3>Recent writing</h3>
		{#each posts as post}
			<p class="post-link">
				<a href="/blog/{post.slug}" class="glitched glitch-on-hover">{post.title}</a>
				<span class="post-date"
					>{formatDate(post.date)}<span class="sep">·</span>{post.readingTime} min read</span
				>
			</p>
		{/each}
		<p class="all-posts"><a href="/blog" class="glitched glitch-on-hover">all posts</a></p>
	{/if}
</section>

<style>
	:global(#now > h2) {
		margin-bottom: 0.25rem;
	}

	.updated {
		font-size: 0.8rem;
		color: var(--subtle-text);
		margin-top: 0;
		margin-bottom: 1.75rem;
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
		color: var(--subtle-text);
		margin-left: 0.4rem;
	}

	.post-date .sep {
		color: var(--accent);
		margin: 0 0.4em;
		font-weight: bold;
	}

	.all-posts {
		font-size: 0.85rem;
	}
</style>
