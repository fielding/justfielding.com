import type { ComponentType } from 'svelte';

export interface PostMeta {
	slug: string;
	title: string;
	date: string;
	description: string;
	readingTime: number;
	wordCount: number;
}

interface ParsedPost {
	default: ComponentType;
	metadata?: {
		title?: string;
		date?: string;
		description?: string;
	};
}

const parsedPosts = import.meta.glob<ParsedPost>('/src/posts/*.md', { eager: true });
const rawPosts = import.meta.glob<string>('/src/posts/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

function slugFromPath(path: string): string {
	return path.split('/').pop()?.replace('.md', '') ?? '';
}

function stripFrontmatter(raw: string): string {
	return raw.replace(/^---[\s\S]*?---\n/, '');
}

function stripCodeBlocks(text: string): string {
	return text.replace(/```[\s\S]*?```/g, '');
}

function countWords(text: string): number {
	return text.trim().split(/\s+/).filter(Boolean).length;
}

function buildMeta(path: string): PostMeta {
	const slug = slugFromPath(path);
	const parsed = parsedPosts[path];
	const raw = rawPosts[path] ?? '';

	const body = stripCodeBlocks(stripFrontmatter(raw));
	const wordCount = countWords(body);
	const readingTime = Math.max(1, Math.ceil(wordCount / 220));

	return {
		slug,
		title: parsed.metadata?.title ?? slug,
		date: parsed.metadata?.date ?? '',
		description: parsed.metadata?.description ?? '',
		readingTime,
		wordCount
	};
}

const allPostsCache: PostMeta[] = Object.keys(parsedPosts)
	.map(buildMeta)
	.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getAllPosts(): PostMeta[] {
	return allPostsCache;
}

export function getRecentPosts(n: number): PostMeta[] {
	return allPostsCache.slice(0, n);
}

export function getPostBySlug(slug: string) {
	const path = `/src/posts/${slug}.md`;
	const parsed = parsedPosts[path];
	if (!parsed) return null;

	const idx = allPostsCache.findIndex((p) => p.slug === slug);
	const meta = idx >= 0 ? allPostsCache[idx] : buildMeta(path);

	// Posts sorted desc (newest first). "next" in time = newer = lower index.
	const next = idx > 0 ? allPostsCache[idx - 1] : null;
	const prev = idx >= 0 && idx < allPostsCache.length - 1 ? allPostsCache[idx + 1] : null;

	return {
		content: parsed.default,
		metadata: parsed.metadata,
		meta,
		prev,
		next
	};
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatDate(iso: string): string {
	if (!iso) return '';
	const d = new Date(iso);
	if (isNaN(d.getTime())) return iso;
	return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()} ${d.getUTCFullYear()}`;
}
