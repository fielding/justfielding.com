<script lang="ts">
	export let title: string;
	export let href: string;
</script>

<li>
	<a {href} target="_blank" rel="noopener noreferrer">{title}</a>
	<div class="citation">
		<slot />
	</div>
</li>

<style>
	li {
		margin-bottom: 1.5rem;
	}

	/* Using :global() because the <p> tag comes from the slot */
	.citation :global(p) {
		margin-bottom: 0.25rem;
		font-size: 0.9rem;
		opacity: 0.7;
	}
</style>
