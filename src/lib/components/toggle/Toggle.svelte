<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { gsap, Power1 } from 'gsap';

	import Switch from '$lib/components/toggle/Switch.svelte';
	import Canvas from '$lib/components/toggle/Canvas.svelte';

	export let on: boolean;

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('toggle');
	}
</script>

<div class="toggle-container">
	{#if on}
		<Canvas {on} />
	{/if}
	<Switch {on} on:click={handleClick} />
</div>

<style>
	.toggle-container {
		text-align: right;
		margin-top: 10px;
		display: inline-block;
		position: relative;
	}
</style>
