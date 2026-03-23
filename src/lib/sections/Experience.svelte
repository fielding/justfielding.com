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
	<SectionHeader id="experience">Professional Experience</SectionHeader>

	{#each work as job}
		<ExperienceEntry
			title={job.position}
			company={job.name}
			dates={formatDates(job.startDate, job.endDate)}
		>
			{#if job.roles}
				{#each job.roles as role, i}
					<h4 style={i > 0 ? 'margin-top: 1rem;' : ''}>{role.title} ({role.startDate}–{role.endDate})</h4>
					{#each role.highlights as highlight}
						<p>{highlight}</p>
					{/each}
				{/each}
			{:else if job.highlights}
				{#each job.highlights as highlight}
					<p>{highlight}</p>
				{/each}
			{/if}
		</ExperienceEntry>
	{/each}
</section>
