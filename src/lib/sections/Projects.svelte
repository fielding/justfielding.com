<script>
	import { SectionHeader, ProjectEntry } from '$lib/components';
</script>

<section id="projects">
	<SectionHeader id="projects">Projects</SectionHeader>

	<ProjectEntry title="Thinktax" tags="AI cost tooling">
		<p>Cross-provider AI cost tracking that prefers actual spend over vibes.</p>
		<div slot="artifacts">
			<a href="https://github.com/fielding/thinktax" target="_blank" rel="noopener noreferrer" class="glitched glitch-on-hover"
				>View on GitHub</a
			>
		</div>
	</ProjectEntry>

	<ProjectEntry title="nit" tags="Agent-first developer tooling">
		<p>A git wrapper that cuts token waste by making the right output the default.</p>
		<div slot="artifacts">
			<a href="https://github.com/fielding/nit" target="_blank" rel="noopener noreferrer" class="glitched glitch-on-hover"
				>View on GitHub</a
			>
		</div>
	</ProjectEntry>

	<ProjectEntry title="Specter" tags="Verification / agent infrastructure">
		<p>
			An adversarial coding harness where one agent writes the contract and another has to prove it can satisfy it.
		</p>
	</ProjectEntry>

	<ProjectEntry title="Bleeping Weather" tags="Consumer product">
		<p>
			A profanity-forward weather app with cross-platform widgets and an actual content system behind the jokes.
		</p>
	</ProjectEntry>

	<ProjectEntry title="Apprentice" tags="AI learning product">
		<p>
			A voice mentor for AI coding sessions that tries to teach at the right moments instead of narrating every keystroke.
		</p>
	</ProjectEntry>
</section>
