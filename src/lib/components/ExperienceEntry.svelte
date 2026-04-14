<script lang="ts">
	type Role = {
		title: string;
		startDate: string;
		endDate: string;
		highlights: string[];
	};

	export let title: string;
	export let company: string;
	export let dates: string;
	export let highlights: string[] | undefined = undefined;
	export let roles: Role[] | undefined = undefined;
</script>

<article>
	<h3>{title}</h3>
	<h4 class="meta">{company} | {dates}</h4>
	<div class="description">
		{#if roles && roles.length}
			{#each roles as role, i}
				<h4 class="role" class:spaced={i > 0}>
					{role.title} ({role.startDate}–{role.endDate})
				</h4>
				{#if role.highlights && role.highlights.length}
					<p class="lead">{role.highlights[0]}</p>
					{#each role.highlights.slice(1) as highlight}
						<p>{highlight}</p>
					{/each}
				{/if}
			{/each}
		{:else if highlights && highlights.length}
			<p class="lead">{highlights[0]}</p>
			{#each highlights.slice(1) as highlight}
				<p>{highlight}</p>
			{/each}
		{/if}
	</div>
</article>

<style>
	article {
		margin-bottom: 3rem;
	}

	h3 {
		margin-bottom: 0.25rem;
	}

	.meta {
		font-family: 'Inconsolata', monospace;
		font-weight: normal;
		color: var(--subtle-text);
		margin-bottom: 1rem;
	}

	.description .role {
		font-family: 'Inconsolata', monospace;
		font-weight: 600;
		color: inherit;
		margin-bottom: 0.5rem;
	}

	.description .role.spaced {
		margin-top: 1.25rem;
	}

	.description .lead {
		font-family: 'Inconsolata', monospace;
		font-size: 1.0625rem;
		font-weight: 600;
		line-height: 1.45;
		padding-left: 18px;
		margin-bottom: 0.75rem;
	}

	.description p:not(.lead) {
		margin-bottom: 0.25rem;
		display: flex;
		align-items: flex-start;
	}
	.description p:not(.lead)::before {
		content: '■';
		color: var(--accent);
		margin-right: 0.75em;
		display: inline-flex;
		transform: translateY(-0.05em);
		font-size: 8px;
		width: 1.5em;
		flex-shrink: 0;
		align-self: baseline;
		margin-top: 0.5rem;
	}
</style>
