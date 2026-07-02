<script lang="ts">
	import { SectionHeader, ExperienceEntry } from '$lib/components';
	import resume from '$lib/data/resume.json';

	type Role = {
		title: string;
		startDate: string;
		endDate: string;
		highlights: string[];
	};

	type WorkEntry = {
		name: string;
		position: string;
		startDate: string;
		endDate: string;
		highlights: string[];
		roles?: Role[];
	};

	const work = resume.work as WorkEntry[];

	function formatDates(startDate: string, endDate: string) {
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
