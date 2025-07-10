<script lang="ts">
	import { TagList } from '$lib/components';
	export let title: string;
	export let tags: string | undefined = undefined;
</script>

<article>
	<div class="media-column">
		<slot name="image" />
	</div>

	<div class="content-column">
		<h3>{title}</h3>

		<div class="description">
			<slot />
		</div>

		{#if tags}
			<TagList {tags} />
		{/if}
		<div class="artifacts-container">
			<slot name="artifacts" />
		</div>
	</div>
</article>

<style>
	article {
		display: flex;
		flex-direction: row;
		gap: 2rem;
		margin-bottom: 4rem;
	}

	.media-column {
		flex: 0 0 200px;
	}

	.content-column {
		flex: 1 1 auto;
	}

	h3 {
		font-family: 'Inconsolata', monospace;
		font-size: 1.5rem;
		font-weight: 700;
		margin: 0 0 0.75rem;
	}

	.description :global(p) {
		margin-bottom: 1rem;
		line-height: 1.6;
	}

	.artifacts-container {
		margin-top: 1rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1rem;
	}

	:global(.artifacts-container a) {
		display: inline-block;
		font-size: 0.9rem;
		font-weight: bold;
		border-bottom-style: solid;
		text-decoration: none;
	}

	:global(.tags-container .tag) {
		display: inline-block;
		font-size: 0.8rem;
		font-family: 'Inconsolata', monospace;
		background-color: #eee;
		color: #555;
		padding: 0.2rem 0.6rem;
		border-radius: 4px;
		user-select: none;
	}

	body.dark :global(.tags-container .tag) {
		background-color: #333;
		color: #ccc;
	}

	@media (max-width: 600px) {
		article {
			flex-direction: column;
		}
		.media-column {
			flex-basis: auto;
			max-width: 100%;
		}
	}
</style>
