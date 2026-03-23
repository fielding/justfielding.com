<script>
	import { SectionHeader, PublicationEntry } from '$lib/components';
	import resume from '$lib/data/resume.json';

	const publications = resume.publications || [];
</script>

<section id="publications">
	<SectionHeader id="publications">Publications</SectionHeader>
	<ul>
		{#each publications as pub}
			<PublicationEntry
				title={pub.title}
				href="https://arxiv.org/pdf/{pub.arxiv}"
			>
				<p>
					{pub.authors}. <em>{pub.venue}.</em>
				</p>
			</PublicationEntry>
		{/each}
	</ul>
</section>

<style>
	#publications ul {
		list-style: none;
		padding-left: 0;
		margin-left: 0;
	}
</style>
