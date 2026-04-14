<script>
	export let id = '';
</script>

{#if id}
	<h2>
		<a href="#{id}" class="header-link">
			<span class="accent">.</span><slot /><span class="accent">.</span>
		</a>
	</h2>
{:else}
	<h2>
		<span class="accent">.</span><slot /><span class="accent">.</span>
	</h2>
{/if}

<style>
	h2 {
		font-weight: 900;
		font-size: clamp(1.6rem, 5.5vw, 2.2974rem);
		white-space: nowrap;

		margin: 3.5rem 0 2rem;
		border-bottom: 2px solid var(--accent);
	}

	.accent {
		font-weight: 900;
		color: var(--accent);
	}

	.header-link {
		color: inherit;
		text-decoration: none;
		font-weight: inherit;
	}

	@media (max-width: 480px) {
		h2 {
			white-space: normal;
			text-wrap: balance;
		}
	}

	/* Dark-mode display crispness: drop weight + stroke edges with bg color. */
	@media (prefers-color-scheme: dark) {
		h2,
		.accent {
			font-weight: 800;
			-webkit-text-stroke: 0.25px var(--background);
		}
	}
</style>
