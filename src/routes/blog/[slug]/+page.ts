import { error } from '@sveltejs/kit';
import { getAllPosts, getPostBySlug } from '$lib/posts';

export function entries() {
	return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function load({ params }) {
	const post = getPostBySlug(params.slug);
	if (!post) {
		throw error(404, `Post not found: ${params.slug}`);
	}
	return {
		content: post.content,
		metadata: post.metadata,
		meta: post.meta,
		prev: post.prev,
		next: post.next,
		slug: params.slug
	};
}
