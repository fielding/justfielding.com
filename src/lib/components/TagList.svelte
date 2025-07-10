<script lang="ts">
	export let tags: string;

	const tagArray = tags.split(',').map((tag) => tag.trim());
</script>

<div class="tags-container">
	{#each tagArray as tag}
		<span class="tag">{tag}</span>
	{/each}
</div>

<style>
	.tags-container {
		margin-top: 1.25rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag {
		display: inline-block;
		font-size: 0.8rem;
		font-family: 'Inconsolata', monospace;
		background-color: #eee;
		color: #555;
		padding: 0.2rem 0.6rem;
		border-radius: 4px;
		user-select: none;
		line-height: 1.5;
	}

	body.dark .tag {
		background-color: #333;
		color: #ccc;
	}
</style>
