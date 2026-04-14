<script>
	import { SectionHeader, ExperienceEntry } from '$lib/components';
	import resume from '$lib/data/resume.json';

	const work = resume.work;

	function formatDates(startDate, endDate) {
		const start = startDate.slice(0, 4);
		const end = endDate === 'Present' ? 'Present' : endDate.slice(0, 4);
		return `${start} – ${end}`;
	}
</script>

<section id="experience">
	<SectionHeader id="experience">Experience</SectionHeader>

	{#each work as job}
		<ExperienceEntry
			title={job.position}
			company={job.name}
			dates={formatDates(job.startDate, job.endDate)}
			highlights={job.highlights}
			roles={job.roles}
		/>
	{/each}
</section>
