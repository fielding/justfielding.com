<script lang="ts">
	export let title: string;
	export let href: string;
</script>

<li>
	<a {href} target="_blank" rel="noopener noreferrer" class="glitched glitch-on-hover">{title}</a>
	<div class="citation">
		<slot />
	</div>
</li>

<style>
	li {
		margin-bottom: 1.5rem;
	}

	.citation :global(p) {
		margin-bottom: 0.25rem;
		font-size: 0.9rem;
		color: var(--subtle-text);
	}
</style>
