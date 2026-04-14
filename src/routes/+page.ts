import { getRecentPosts } from '$lib/posts';

export async function load() {
	const recentPosts = getRecentPosts(2).map((p) => ({
		slug: p.slug,
		title: p.title,
		date: p.date,
		readingTime: p.readingTime
	}));
	return { recentPosts };
}
