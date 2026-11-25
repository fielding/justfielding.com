<script lang="ts">
	type Link = { label: string; href: string };
	type Item = { title: string; text: string; href?: string; links?: Link[] };

	export let heading: string;
	export let items: Item[];
</script>

<h3>{heading}</h3>
<ul>
	{#each items as item}
		<li>
			{#if item.href}
				<a href={item.href} target="_blank" rel="noopener noreferrer" class="glitched glitch-on-hover"
					>{item.title}</a
				>
			{:else}
				<strong>{item.title}</strong>
			{/if}
			<span class="text">{item.text}</span>
			{#if item.links}
				{' '}<span class="links">
					{#each item.links as link}
						<a
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							class="glitched glitch-on-hover">{link.label}</a
						>
					{/each}
				</span>
			{/if}
		</li>
	{/each}
</ul>

<style>
	h3 {
		margin: 0 0 1rem;
	}

	ul {
		list-style: none;
		padding-left: 0;
		margin: 0 0 3rem;
	}

	li {
		margin-bottom: 0.9rem;
	}

	.text {
		margin-left: 0.4rem;
	}

	/* Spacing lives between links, not before the first, so a row that wraps starts flush left. */
	.links a {
		font-size: 0.85rem;
		white-space: nowrap;
	}

	.links a + a {
		margin-left: 0.6rem;
	}
</style>
