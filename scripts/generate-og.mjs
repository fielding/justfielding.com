// Generates fallback OG cards (1200x630 PNG) for every post that doesn't
// supply its own `image` frontmatter. Runs as `prebuild`; output lands in
// static/img/og/<slug>.png and posts.ts points og:image there.
//
// Styled from the site's dark-theme tokens (src/app.css) so a palette change
// only needs a re-run, not an image editor.

import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const postsDir = path.join(root, 'src', 'posts');
const outDir = path.join(root, 'static', 'img', 'og');
const fontsDir = path.join(root, 'scripts', 'og', 'fonts');

// Cards use the dark-theme tokens from app.css: dark cards hold up better in
// social feeds, and reading them from the stylesheet means a palette change
// re-skins every card on the next build. Fails loud if the tokens move.
async function loadTheme() {
	const css = await readFile(path.join(root, 'src', 'app.css'), 'utf8');
	const darkBlock = css.match(/@media \(prefers-color-scheme: dark\) \{\s*:root \{([^}]*)\}/)?.[1];
	if (!darkBlock) throw new Error('generate-og: dark-theme :root block not found in app.css');
	const token = (name) => {
		const value = darkBlock.match(new RegExp(`--${name}:\\s*([^;]+);`))?.[1].trim();
		if (!value) throw new Error(`generate-og: --${name} not found in app.css dark theme`);
		return value;
	};
	return {
		background: token('background'),
		text: token('text'),
		subtle: token('subtle-text'),
		accent: token('accent')
	};
}

let theme;

// Minimal frontmatter reader: every post uses flat `key: value` scalars.
function parseFrontmatter(raw) {
	const match = raw.match(/^---\n([\s\S]*?)\n---\n/);
	if (!match) return { meta: {}, body: raw };
	const meta = {};
	for (const line of match[1].split('\n')) {
		const kv = line.match(/^(\w+):\s*(.*)$/);
		if (!kv) continue;
		meta[kv[1]] = kv[2].replace(/^['"]|['"]$/g, '');
	}
	return { meta, body: raw.slice(match[0].length) };
}

// Mirrors the wordCount/readingTime math in src/lib/posts.ts.
function readingTime(body) {
	const words = body
		.replace(/```[\s\S]*?```/g, '')
		.trim()
		.split(/\s+/)
		.filter(Boolean).length;
	return Math.max(1, Math.ceil(words / 220));
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function formatDate(iso) {
	const d = new Date(iso);
	if (isNaN(d.getTime())) return iso;
	return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()} ${d.getUTCFullYear()}`;
}

const h = (type, style, ...children) => ({
	type,
	props: { style, children: children.length === 1 ? children[0] : children }
});

// Word-boundary truncation; satori's lineClamp doesn't fire reliably.
// NBSP keeps the ellipsis glued to the last word instead of orphaning it.
function truncate(text, max) {
	if (text.length <= max) return text;
	return text.slice(0, text.lastIndexOf(' ', max)).replace(/[,;:]$/, '') + '\u00A0\u2026';
}

// Widow fix: tie the last two words together with an NBSP so no line can
// end up as a single orphaned word.
function deorphan(text) {
	return text.replace(/ (\S+)$/, '\u00A0$1');
}

function titleSize(title, hasImage) {
	if (hasImage) {
		if (title.length <= 40) return 56;
		if (title.length <= 62) return 48;
		return 42;
	}
	if (title.length <= 40) return 86;
	if (title.length <= 62) return 72;
	return 60;
}

// The pixel-F from favicon.svg, oversized and ghosted into the right side of
// text-only cards so the empty ground carries the brand instead of nothing.
function fWatermark() {
	return {
		type: 'svg',
		props: {
			width: 640,
			height: 640,
			viewBox: '0 0 512 512',
			style: { position: 'absolute', right: -80, top: 20, opacity: 0.055 },
			children: {
				type: 'path',
				props: {
					d: 'M138.36 446V102.96H385.656V199.728H257.144V255.024H354.936V351.792H257.144V446H138.36Z',
					fill: theme.text
				}
			}
		}
	};
}

// PNG IHDR: width/height live at fixed offsets right after the signature.
function pngSize(buf) {
	if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error('cardImage must be a PNG');
	return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

async function loadCardImage(ref, hasLabel) {
	const buf = await readFile(path.join(root, 'static', ref.replace(/^\//, '')));
	const { width, height } = pngSize(buf);
	// Contain within the plate's content box; the sticker eats some height,
	// and the box leaves clearance so the plate shadow never reaches the
	// bottom meta row.
	const scale = Math.min(470 / width, (hasLabel ? 310 : 360) / height);
	return {
		src: `data:image/png;base64,${buf.toString('base64')}`,
		width: Math.round(width * scale),
		height: Math.round(height * scale)
	};
}

// Source sticker as on the post's hero plate: ink tab, parchment text,
// accent separator dot between source and descriptor.
function plateSticker(label) {
	const parts = label.split('·').map((s) => s.trim());
	const children = [];
	parts.forEach((part, i) => {
		if (i > 0) children.push(h('span', { color: theme.accent, margin: '0 9px' }, '·'));
		children.push(h('span', {}, part.toUpperCase()));
	});
	return h(
		'div',
		{
			display: 'flex',
			alignSelf: 'flex-start',
			backgroundColor: '#30231e',
			color: '#f5f1ea',
			fontFamily: 'Inconsolata',
			fontSize: 15,
			letterSpacing: '0.14em',
			padding: '7px 12px',
			marginBottom: 14
		},
		...children
	);
}

// The blog's figure-plate treatment (blog/[slug]/+page.svelte): course paper,
// ink border, hard zero-blur accent shadow on the hero.
function plate(image, label) {
	return h(
		'div',
		{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			backgroundColor: '#f5f1ea',
			border: '3px solid #30231e',
			boxShadow: `8px 8px 0 ${theme.accent}`,
			padding: 20,
			flexShrink: 0
		},
		label ? plateSticker(label) : null,
		{
			type: 'img',
			props: { src: image.src, width: image.width, height: image.height }
		}
	);
}

function card({ title, description, date, minutes, image, label }) {
	return h(
		'div',
		{
			width: 1200,
			height: 630,
			display: 'flex',
			flexDirection: 'column',
			position: 'relative',
			backgroundColor: theme.background,
			padding: '52px 60px',
			fontFamily: 'Titillium Web'
		},
		image ? null : fWatermark(),
		// Wordmark, as rendered by Header.svelte: accent dots around the name.
		h(
			'div',
			{ display: 'flex', fontSize: 40, fontWeight: 900 },
			h('span', { color: theme.accent }, '.'),
			h('span', { color: theme.text }, 'Fielding'),
			h('span', { color: theme.accent }, '.')
		),
		h(
			'div',
			{ display: 'flex', alignItems: 'center', flexGrow: 1 },
			h(
				'div',
				{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					// Explicit shrink + zero basis: yoga defaults flex-shrink to 0,
					// which would let this column push the plate off-canvas.
					flexGrow: 1,
					flexShrink: 1,
					flexBasis: '0%',
					paddingRight: image ? 48 : 0
				},
				h(
					'div',
					{
						fontSize: titleSize(title, Boolean(image)),
						fontWeight: 700,
						color: theme.text,
						lineHeight: 1.12,
						marginBottom: 28
					},
					title
				),
				description
					? h(
							'div',
							{
								fontFamily: 'Inconsolata',
								fontSize: image ? 22 : 26,
								color: theme.subtle,
								lineHeight: 1.45
							},
							deorphan(truncate(description, image ? 150 : 220))
						)
					: null
			),
			image ? plate(image, label) : null
		),
		h(
			'div',
			{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				fontFamily: 'Inconsolata',
				fontSize: 24
			},
			// Selection-style chip: white on accent, like ::selection site-wide.
			h(
				'div',
				{
					backgroundColor: theme.accent,
					color: '#ffffff',
					fontWeight: 700,
					letterSpacing: '0.14em',
					padding: '8px 14px'
				},
				'JUSTFIELDING.COM/BLOG'
			),
			h(
				'div',
				{ display: 'flex', alignItems: 'center', color: theme.subtle },
				h('span', {}, formatDate(date)),
				h('span', { color: theme.accent, fontWeight: 700, margin: '0 14px' }, '·'),
				h('span', {}, `${minutes} min read`)
			)
		)
	);
}

async function main() {
	theme = await loadTheme();
	const fonts = [
		{
			name: 'Titillium Web',
			weight: 700,
			data: await readFile(path.join(fontsDir, 'TitilliumWeb-Bold.ttf'))
		},
		{
			name: 'Titillium Web',
			weight: 900,
			data: await readFile(path.join(fontsDir, 'TitilliumWeb-Black.ttf'))
		},
		{
			name: 'Inconsolata',
			weight: 400,
			data: await readFile(path.join(fontsDir, 'Inconsolata-Regular.ttf'))
		},
		{
			name: 'Inconsolata',
			weight: 700,
			data: await readFile(path.join(fontsDir, 'Inconsolata-Bold.ttf'))
		}
	];

	await mkdir(outDir, { recursive: true });

	// Content hashes go into a manifest that posts.ts appends as ?v= on the
	// og:image URL. Scrapers cache images by exact URL (LinkedIn held a stale
	// card for days once), so a changed card must mean a changed URL.
	const manifest = {};
	const files = (await readdir(postsDir)).filter((f) => f.endsWith('.md'));
	for (const file of files) {
		const slug = file.replace(/\.md$/, '');
		const raw = await readFile(path.join(postsDir, file), 'utf8');
		const { meta, body } = parseFrontmatter(raw);
		if (meta.image) {
			console.log(`skip  ${slug} (has image: ${meta.image})`);
			continue;
		}

		const svg = await satori(
			card({
				title: meta.title ?? slug,
				// cardText overrides description: card copy is a 150-char window,
				// and the SEO description rarely survives that cut with its hook.
				description: meta.cardText ?? meta.description ?? '',
				date: meta.date ?? '',
				minutes: readingTime(body),
				image: meta.cardImage ? await loadCardImage(meta.cardImage, Boolean(meta.cardLabel)) : null,
				label: meta.cardLabel
			}),
			{ width: 1200, height: 630, fonts }
		);

		// The layout is composed at 1200x630 but rendered at 2x: the SVG is
		// vector, so this is free sharpness for scrapers' downscaled variants
		// and retina feeds.
		const png = new Resvg(svg, { fitTo: { mode: 'width', value: 2400 } }).render().asPng();
		// Hash goes in the filename, not a query string: LinkedIn's media
		// pipeline normalizes image URLs and ignores query params entirely.
		const hash = createHash('sha256').update(png).digest('hex').slice(0, 8);
		await writeFile(path.join(outDir, `${slug}.${hash}.png`), png);
		manifest[slug] = hash;
		console.log(`wrote ${slug}.${hash}.png`);
	}

	await writeFile(
		path.join(root, 'src', 'lib', 'og-manifest.json'),
		JSON.stringify(manifest, null, '\t') + '\n'
	);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
