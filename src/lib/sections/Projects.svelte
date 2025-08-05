<script>
	import { SectionHeader, ProjectEntry } from '$lib/components';
</script>

<section id="projects">
	<SectionHeader>Projects</SectionHeader>
	<ProjectEntry title="Yarrtzee: Dice of Dishonor" tags="">
		<div slot="image">
			<img src="/img/yarrtzee.png" alt="Yarrtzee logo" />
		</div>

		<p>
			A steampunk pirate-themed multiplayer Yahtzee game built as a Telegram Mini App and available
			as a web app. Along with scratching a personal itch, I wanted to explore the potential of
			multiplayer games as Telegram Mini Apps and the outreach they can provide. Also, steampunk
			pirates!
		</p>
	</ProjectEntry>
	<ProjectEntry title="Fite.bet">
		<div slot="image">
			<img src="/img/fite.png" alt="Fite.bet logo" />
		</div>

		<p>
			Fite.bet reinvents online giveaways by transforming them from a simple random name(s) picker
			into an epic 8-bit fighting game tournament between the participants' AI-generated sprite
			representations. I took this opportunity to explore various diffusion model pipelines for
			dynamic asset generation in games and apps. It's a service that prioritizes both being awesome
			and offering utility.
		</p>

		<div slot="artifacts">
			<a href="https://fite.bet" target="_blank" rel="noopener noreferrer">→ Visit Fite.bet</a>
			<a href="https://t.me/fitebattlebot" target="_blank" rel="noopener noreferrer"
				>→ Add Telegram Bot</a
			>
			<!-- <a href="GITHUB_LINK_HERE" target="_blank" rel="noopener noreferrer">→ View on GitHub</a> -->
		</div>
	</ProjectEntry>
	<ProjectEntry title="Rock, Paper, Scissors">
		<div slot="image">
			<img src="/img/rps.png" alt="Rock, Paper, Scissors logo" />
		</div>
		<p>
			An experimental UI control system that allows users to interact with web applications using
			real-life hand gestures via their webcam. This proof-of-concept leverages a lightweight,
			browser-based neural network for real-time gesture detection to control a rock-paper-scissors
			game without any physical input.
		</p>

		<div slot="artifacts">
			<a href="https://www.youtube.com/shorts/5-cjt3-Ow-E" target="_blank" rel="noopener noreferrer"
				>→ See it in action</a
			>
		</div>
	</ProjectEntry>
	<ProjectEntry title="Zuck Hunt / Zuck's Revenge">
		<div slot="image">
			<img src="/img/zuckhunt.png" alt="Zuck Hunt promotional image" />
		</div>

		<p>
			A satirical game concept exploring gesture-based controls. "Zuck Hunt" is a light-gun style
			shooter (a la Duck Hunt) controlled by hand gestures, while "Zuck's Revenge" flips the script
			into a side-scrolling beat-'em-up. Both are explorations in creative art direction and novel
			user interaction.
		</p>
	</ProjectEntry>
	<ProjectEntry title="Opessky: Lunar Simulation">
		<div slot="image">
			<img src="/img/opessky.png" alt="Opessky logo" />
		</div>

		<p>
			A lunar colony simulation game with dynamic AI-driven NPCs. This project showcases my
			versatility. Acting as the lead engineer and also directing the overall design and direction
			of the project, I had the opportunity to touch literally every aspect of the game, from
			shaders to the art, style and lore of the game.
		</p>

		<div slot="artifacts">
			<a href="https://youtu.be/a0_jNTkYNmA" target="_blank">→ Watch clips from development</a>
			<a href="/LFM_3-80.pdf" target="_blank">→ Lunar Field Manual LFM 3-80</a>
		</div>
	</ProjectEntry>
	<ProjectEntry title="Redstone University">
		<div slot="image">
			<img src="/img/redstone-university.png" alt="Redstone University logo" />
		</div>

		<p>
			A free, hands-on online course teaching computer architecture fundamentals through Minecraft’s
			Redstone system. Build registers, logic gates, and an ALU in-game, making concepts like binary
			and bitwise operations tangible. Created for my daughter, CS students, and anyone seeking a
			practical grasp of low-level computing.
		</p>
		<div slot="artifacts">
			<a href="https://github.com/fielding/redstone-university" target="_blank">→ View the Course</a
			>
		</div>
	</ProjectEntry>
</section>
