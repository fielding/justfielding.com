import { error } from '@sveltejs/kit';

const posts = import.meta.glob('/src/posts/*.md', { eager: true });

export function entries() {
	return Object.keys(posts).map((path) => ({
		slug: path.split('/').pop()?.replace('.md', '') ?? ''
	}));
}

export async function load({ params }) {
	const path = `/src/posts/${params.slug}.md`;
	const post = posts[path] as any;

	if (!post) {
		throw error(404, `Post not found: ${params.slug}`);
	}

	return {
		content: post.default,
		metadata: post.metadata,
		slug: params.slug
	};
}
