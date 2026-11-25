<script>
	import { SectionHeader, ProjectEntry, ProjectList } from '$lib/components';

	const more = [
		{
			title: 'The Continuity Office',
			href: 'https://continuityoffice.org',
			text: "Interactive fiction where you're a junior analyst at a TV station archive, classifying dead air, until your classifications start writing a host into the record who was never there."
		},
		{
			title: 'Take Two',
			text: "A native Mac voice and video-dubbing studio my daughter and I built together. She uses it constantly. It's one of a pile of things we make together, from pony chess to a South Park Guess Who."
		},
		{
			title: 'OpenAI Parameter Golf',
			text: 'Train the best language model that fits in 16MB. I submitted random linear maps with learned adapters (a 2.4MB artifact), and a knowledge distillation run that turned out to be a negative result.',
			links: [
				{ label: 'Linear maps', href: 'https://github.com/openai/parameter-golf/pull/874' },
				{ label: 'Distillation', href: 'https://github.com/openai/parameter-golf/pull/1029' }
			]
		},
		{
			title: 'review-crew',
			text: 'Multi-model adversarial code review. It runs on nearly every branch I ship.'
		},
		{
			title: 'human++',
			href: 'https://github.com/fielding/human-plus-plus',
			text: 'A color scheme and annotation convention for code where intent is scarce and syntax is cheap.'
		},
		{
			title: 'sprawl',
			href: 'https://github.com/fielding/sprawl',
			text: 'Small Unix-style tools for multi-agent orchestration: tix for issues, box for mailboxes, vent for events.'
		},
		{
			title: 'Cadence',
			href: 'https://github.com/fielding/cadence',
			text: "A sit/stand captain for Jiecang BLE standing desks, because the desk's own app wasn't cutting it."
		},
		{
			title: 'Opessky: Lunar Simulation',
			text: 'A lunar colony sim with AI-driven NPCs. I led engineering and directed the design, from shaders to lore.',
			links: [
				{ label: 'Dev clips', href: 'https://youtu.be/a0_jNTkYNmA' },
				{ label: 'Field manual', href: '/LFM_3-80.pdf' }
			]
		},
		{
			title: "Zuck Hunt / Zuck's Revenge",
			text: 'A gesture-controlled light-gun shooter, and a beat-em-up that flips the script.'
		},
		{
			title: 'Rock, Paper, Scissors',
			href: 'https://www.youtube.com/shorts/5-cjt3-Ow-E',
			text: 'Webcam hand gestures as UI input, driven by a browser-side neural network.'
		}
	];
</script>

<section id="projects">
	<SectionHeader id="projects">Projects</SectionHeader>
	<ProjectEntry title="Redstone University">
		<div slot="image">
			<picture>
				<source media="(prefers-color-scheme: dark)" srcset="/img/redstone-university-dark.png" />
				<img src="/img/redstone-university.png" alt="Redstone University logo" />
			</picture>
		</div>

		<p>
			A free, hands-on course teaching computer architecture through Minecraft's redstone. Build
			logic gates, registers, and an ALU in-game, so binary and bitwise operations become things you
			can walk around in. Created for my daughter, CS students, and anyone who wants a practical
			grasp of low-level computing. Still being written.
		</p>
		<div slot="artifacts">
			<a
				href="https://redstone.university"
				target="_blank"
				rel="noopener noreferrer"
				class="glitched glitch-on-hover">Visit redstone.university</a
			>
			<a
				href="https://git.redstone.university"
				target="_blank"
				rel="noopener noreferrer"
				class="glitched glitch-on-hover">gitblocks: git, block by block</a
			>
			<a href="/blog/almost-killed-redstone-university" class="glitched glitch-on-hover"
				>How the figures get made</a
			>
		</div>
	</ProjectEntry>
	<ProjectEntry title="SelvWallet">
		<div slot="image">
			<picture>
				<source media="(prefers-color-scheme: dark)" srcset="/img/selvwallet-dark.png" />
				<img src="/img/selvwallet.png" alt="SelvWallet butterfly logo" />
			</picture>
		</div>

		<p>
			A self-custodial crypto wallet with social payments, built into Telegram. I'm a cofounder,
			and I led the rebuild that took it from an eight-month vibecoded prototype to a wallet I would trust
			with my own keys. Send, receive, swap, and pay friends without installing a separate app.
		</p>
		<div slot="artifacts">
			<a
				href="https://selvwallet.com"
				target="_blank"
				rel="noopener noreferrer"
				class="glitched glitch-on-hover">Visit selvwallet.com</a
			>
			<a
				href="https://t.me/SelvWalletBot"
				target="_blank"
				rel="noopener noreferrer"
				class="glitched glitch-on-hover">Open in Telegram</a
			>
			<a href="/blog/any-advice-on-building-a-crypto-wallet" class="glitched glitch-on-hover"
				>How it started</a
			>
		</div>
	</ProjectEntry>
	<ProjectEntry title="RipGuard">
		<div slot="image">
			<picture>
				<source media="(prefers-color-scheme: dark)" srcset="/img/ripguard-dark.png" />
				<img src="/img/ripguard.png" alt="RipGuard wordmark" />
			</picture>
		</div>

		<p>
			The "cash this out, don't let me play" button. Lock your winnings into a non-cancelable
			Sablier stream that pays you back on a schedule you set, so the degen you're about to be can't
			undo the win you just had. No custody, no admin keys, no custom contracts. If RipGuard
			disappeared tomorrow, your lock would keep counting down on-chain.
		</p>
		<div slot="artifacts">
			<a
				href="https://ripguard.xyz"
				target="_blank"
				rel="noopener noreferrer"
				class="glitched glitch-on-hover">Lock on Base</a
			>
			<a
				href="https://sol.ripguard.xyz"
				target="_blank"
				rel="noopener noreferrer"
				class="glitched glitch-on-hover">Lock on Solana</a
			>
		</div>
	</ProjectEntry>
	<ProjectEntry title="Bleeping Weather">
		<div slot="image">
			<img src="/img/bleeping-weather.png" alt="Bleeping Weather wordmark" />
		</div>

		<p>
			The forecast the way you would actually say it out loud. It's censored by default, in case
			your boss is standing behind you, and one tap from honest. It runs as a desktop overlay on
			macOS and as widgets on Android and iOS, and I check it every day on my Mac and my phone.
			Behind the jokes is a real phrase system: every line is keyed to condition, intensity, and
			tone, generated in batches, then curated by hand.
		</p>
		<div slot="artifacts">
			<a
				href="https://bleepingweather.com"
				target="_blank"
				rel="noopener noreferrer"
				class="glitched glitch-on-hover">Visit bleepingweather.com</a
			>
		</div>
	</ProjectEntry>
	<ProjectEntry title="Yarrtzee: Dice of Dishonor">
		<div slot="image">
			<img src="/img/yarrtzee.png" alt="Yarrtzee logo" />
		</div>

		<p>
			Steampunk pirate multiplayer Yahtzee you can play with your crew in Telegram or the browser.
			It started as a personal itch and an excuse to find out what multiplayer games can do as
			Telegram Mini Apps. Also, steampunk pirates!
		</p>
		<div slot="artifacts">
			<a
				href="https://yarrtzee.com"
				target="_blank"
				rel="noopener noreferrer"
				class="glitched glitch-on-hover">Play at yarrtzee.com</a
			>
			<a
				href="https://t.me/yarrtzee_bot"
				target="_blank"
				rel="noopener noreferrer"
				class="glitched glitch-on-hover">Play in Telegram</a
			>
		</div>
	</ProjectEntry>
	<ProjectEntry title="PokerKNOW">
		<div slot="image">
			<img src="/img/pokerknow.svg" alt="PokerKNOW wordmark" />
		</div>

		<p>
			Player ratings for pokernow.com tournaments, pooled across communities. I built it from my own
			tournament history, then opened it up so other players could submit theirs. The ratings are
			backtested against hundreds of real tournaments. Unofficial, and not affiliated with Poker
			Now.
		</p>
		<div slot="artifacts">
			<a
				href="https://pn.justfielding.com"
				target="_blank"
				rel="noopener noreferrer"
				class="glitched glitch-on-hover">Look up a player</a
			>
			<a
				href="https://t.me/pokerknowbot"
				target="_blank"
				rel="noopener noreferrer"
				class="glitched glitch-on-hover">Add Telegram Bot</a
			>
		</div>
	</ProjectEntry>
	<ProjectEntry title="Fite.bet">
		<div slot="image">
			<img src="/img/fite.png" alt="Fite.bet logo" />
		</div>

		<p>
			Giveaways usually end with a random name picker. Fite.bet turns them into an 8-bit fighting
			tournament instead: every entrant gets an AI-generated sprite, and the sprites fight it out
			until one is left standing. It was my excuse to dig into diffusion pipelines for generating
			game assets on the fly, and it's a lot more fun to watch than a spinning wheel.
		</p>
		<div slot="artifacts">
			<a
				href="https://fite.bet"
				target="_blank"
				rel="noopener noreferrer"
				class="glitched glitch-on-hover">Visit Fite.bet</a
			>
			<a
				href="https://t.me/fitebattlebot"
				target="_blank"
				rel="noopener noreferrer"
				class="glitched glitch-on-hover">Add Telegram Bot</a
			>
		</div>
	</ProjectEntry>

	<ProjectList heading="More projects" items={more} />
</section>
