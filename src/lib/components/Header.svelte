<script>
	import { randomGlitch } from '$lib/actions/glitch';
</script>

<h1>
	<strong use:randomGlitch class="js-random-interval glitched">.</strong>
	<span use:randomGlitch class="js-random-interval glitched">Fielding</span>
	<strong use:randomGlitch class="js-random-interval glitched">.</strong>
</h1>

<style>
	h1 {
		font-weight: 900;
		white-space: nowrap;
	}
	h1 strong {
		font-weight: 900;
		color: rgba(190, 36, 70, 1);
	}
</style>
