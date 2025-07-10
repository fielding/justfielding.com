<h2>
	<span class="accent">.</span><slot /><span class="accent">.</span>
</h2>

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

	@media (max-width: 600px) {
		h2 {
			font-size: 1.8rem;
		}
	}
</style>
