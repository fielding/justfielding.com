<script lang="ts">
	import '../app.css';
</script>

<svelte:head>
	<title>Fielding Johnston - Software Engineer</title>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta
		name="description"
		content="The portfolio of Fielding Johnston, a software engineer with expertise in AI, distributed systems, and interactive applications."
	/>

	<meta property="og:title" content="Fielding Johnston - Software Engineer" />
	<meta
		property="og:description"
		content="The portfolio of Fielding Johnston, a software engineer with expertise in AI, distributed systems, and interactive applications."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://justfielding.com" />
	<!-- <meta property="og:image" content="https://justfielding.com/og-image.png" /> -->

	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="shortcut icon" href="/favicon.ico" />
	<link rel="manifest" href="/site.webmanifest" />
	<meta name="theme-color" content="#be2446" />
	<link rel="icon" href="/favicon.ico" />

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="container">
	<slot />
</div>

<style>
	.container {
		max-width: 720px;
		margin: 40px auto 80px;
	}

	@media (max-width: 600px) {
		.container {
			margin-top: 20px;
		}
	}
</style>
