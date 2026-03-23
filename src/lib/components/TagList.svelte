<script lang="ts">
	export let tags: string;

	const tagArray = tags.split(',').map((tag) => tag.trim());
</script>

<div class="tags-container">
	{#each tagArray as tag, i}
		{#if i > 0}<span class="sep">·</span>{/if}<span class="tag">{tag}</span>
	{/each}
</div>

<style>
	.tags-container {
		margin-top: 1.25rem;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.25rem;
	}

	.tag {
		font-size: 0.8rem;
		font-family: 'Inconsolata', monospace;
		color: var(--subtle-text-light);
		user-select: none;
		line-height: 1.5;
	}

	.sep {
		color: var(--accent-red);
		font-weight: bold;
		font-size: 0.9rem;
	}

	body.dark .tag {
		color: var(--subtle-text-dark);
	}
</style>
