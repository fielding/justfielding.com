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
		margin-bottom: 3rem;
	}

	.media-column {
		flex: 0 0 200px;
	}

	.content-column {
		flex: 1 1 auto;
	}

	h3 {
		font-family: 'Titillium Web', sans-serif;
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0 0 0.75rem;
	}

	.description :global(p) {
		margin-bottom: 1rem;
	}

	.artifacts-container :global(div) {
		margin-top: 0.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	:global(.artifacts-container a) {
		display: inline-block;
		font-size: 0.9rem;
		font-weight: bold;
		text-decoration: none;
	}

	:global(.artifacts-container a::after) {
		content: ' →';
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
