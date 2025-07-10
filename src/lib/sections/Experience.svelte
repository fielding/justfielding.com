<script>
	import { SectionHeader, ExperienceEntry } from '$lib/components';
</script>

<section id="experience">
	<SectionHeader>Professional Experience</SectionHeader>

	<ExperienceEntry
		title="Vice President of Engineering"
		company="Nesa"
		dates="2023 – Present"
		skills="Python, CUDA, NATS.io, Prometheus, Docker, blockchain, distributed systems, tensor/sequence parallelism, PyTorch, LangChain, LLMs, Hugging Face, RLHF, TypeScript, Bash, Git, Linux"
	>
		<p>
			Architected a distributed inference framework for 120,000 models, handling up to 2M requests
			per day on heterogeneous hardware.
		</p>
		<p>Designed and implemented Nesa’s layer 1 blockchain for decentralized AI compute.</p>
		<p>Built telemetry pipeline using NATS.io and Prometheus to monitor nodes.</p>
		<p>Led secure containerization for user-submitted models.</p>
		<p>Contributed to equivariant encryption (EE) achieving zero-latency private inference.</p>
		<p>Developed reinforcement learning system for dynamic model assignment.</p>
		<p>Contributed to open-source: xFusers and nats.py stability improvements.</p>
	</ExperienceEntry>

	<ExperienceEntry
		title="Lead Software Engineer & Director of Design and Development"
		company="Opessky"
		dates="2022 – 2023"
		skills="Unity, C#, 3D programming, shader programming (GLSL), AI (NPC behavior), game design, JavaScript, project leadership"
	>
		<p>Led Unity-based lunar colony simulation game development.</p>
		<p>Designed and implemented 3D environments and shaders.</p>
		<p>Built AI systems for dynamic NPCs with procedural behaviors.</p>
		<p>Directed art team and coordinated UI/UX integration.</p>
	</ExperienceEntry>

	<ExperienceEntry
		title="Lead & Senior Frontend Engineer"
		company="Vidy"
		dates="2019 – 2022"
		skills="JavaScript (ESNext), Svelte, TypeScript, React, HTML, CSS, Rollup, PostCSS, Git, API development, NLP"
	>
		<h4>Lead Frontend Engineer (2020–2022)</h4>
		<p>Refactored to Svelte, improving performance for 14M+ monthly users.</p>
		<p>Built components for scalable real-time video and data applications.</p>
		<p>Developed custodial wallet system for user transactions.</p>
		<p>Implemented NLP for ad placement to boost engagement.</p>

		<h4 style="margin-top: 1rem;">Senior Software Engineer (2019–2020)</h4>
		<p>Built scalable APIs and web apps for real-time video.</p>
		<p>Led adoption of modern JS frameworks.</p>
		<p>Engineered fine-grained reactive vanilla JS framework.</p>
	</ExperienceEntry>

	<ExperienceEntry
		title="Founder and Software Engineer"
		company="justFielding"
		dates="2009 – 2019"
		skills="JavaScript (ESNext), React, Three.js, RxJS, HTML, CSS, Webpack, Node.js, C++, Nginx, Redis, Git, Docker"
	>
		<p>Built and scaled web apps integrating React and Three.js.</p>
		<p>Advocated open-source frameworks to reduce tech debt.</p>
		<p>Managed technical, design, and business operations.</p>
	</ExperienceEntry>
</section>
