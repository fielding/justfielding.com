<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { gsap, Power1 } from 'gsap';

	import { Header, GlitchEffect } from '$lib/components';
	import { About, Experience, Projects, Publications } from '$lib/sections';

	// import Toggle from '$lib/components/toggle/Toggle.svelte';

	import { hoverGlitch } from '$lib/actions/glitch';

	let isNightMode = false;
	let timeline: gsap.core.Timeline;

	let CanvasComponent: any = null;

	// function handleToggle() {
	// 	if (timeline) {
	// 		isNightMode = !isNightMode;
	// 		timeline.reversed(!timeline.reversed());
	// 	}
	// }

	onMount(async () => {
		timeline = gsap.timeline();
		timeline
			.to('#pole', { duration: 0.2, y: '+=35', ease: Power1.easeInOut }, 0)
			.to('#darkshadow', { duration: 0.2, y: '+=3', ease: Power1.easeInOut }, 0)
			.to('#lightshadow', { duration: 0.2, y: '-=3', ease: Power1.easeInOut }, 0)
			.reverse();

		const module = await import('$lib/components/toggle/Canvas.svelte');
		CanvasComponent = module.default;
	});

	$: {
		if (browser) {
			document.body.classList.toggle('night', isNightMode);
		}
	}
</script>

<!-- <Toggle on={isNightMode} on:toggle={handleToggle} /> -->
<main use:hoverGlitch>
	<Header />
	<About />
	<Projects />
	<Publications />
	<Experience />

	<GlitchEffect />

	{#if isNightMode && CanvasComponent}
		<svelte:component this={CanvasComponent} on={isNightMode} />
	{/if}
</main>
