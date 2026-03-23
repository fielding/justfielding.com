<script>
	export let id = '';
</script>

{#if id}
	<h2 id={id}>
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
		white-space: nowrap;

		margin: 3.5rem 0 2rem;
		border-bottom: 2px solid rgba(190, 36, 70, 1);
	}

	.accent {
		font-weight: 900;
		color: rgba(190, 36, 70, 1);
	}

	.header-link {
		color: inherit;
		text-decoration: none;
		font-weight: inherit;
	}

	@media (max-width: 600px) {
		h2 {
			font-size: 1.8rem;
		}
	}
</style>
