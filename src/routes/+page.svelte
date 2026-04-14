<script lang="ts">
	import { Header, GlitchEffect } from '$lib/components';
	import { About, Experience, Now, Projects, Publications } from '$lib/sections';
	import { hoverGlitch } from '$lib/actions/glitch';

	export let data;
</script>

<main use:hoverGlitch>
	<Header />
	<About />
	<Now posts={data.recentPosts} />
	<Experience />
	<Publications />
	<Projects />
	<GlitchEffect />
</main>
