<script lang="ts">
	import { TagList } from '$lib/components';
	export let title: string;
	export let company: string;
	export let dates: string;
	export let skills: string;
</script>

<article>
	<h3>{title}</h3>
	<h4>{company} | {dates}</h4>
	<div class="description">
		<slot />
	</div>
	<TagList tags={skills} />
</article>

<style>
	article {
		margin-bottom: 3rem;
	}

	h3 {
		font-family: 'Titillium Web', sans-serif;
		font-weight: 600;
		margin-bottom: 0.25rem;
	}

	h4 {
		font-family: 'Inconsolata', monospace;
		font-weight: normal;
		color: var(--subtle-text-light);
		margin-bottom: 1rem;
	}

	body.dark h4 {
		color: var(--subtle-text-dark);
	}

	.description :global(p) {
		margin-bottom: 0.25rem;
		display: flex;
		align-items: flex-start;
	}
	.description :global(p::before) {
		content: '■';
		color: var(--accent-red);
		margin-right: 0.75em;
		display: inline-flex;
		transform: translateY(-0.05em);
		font-size: 8px;
		width: 1.5em;
		flex-shrink: 0;
		align-self: baseline;
		margin-top: 0.5rem;
	}

	.description :global(h4) {
		font-weight: 600;
		margin-bottom: 0.25rem;
	}
</style>
