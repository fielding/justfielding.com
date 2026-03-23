export async function load() {
	const postFiles = import.meta.glob('/src/posts/*.md', { eager: true });

	const posts = Object.entries(postFiles)
		.map(([path, post]: [string, any]) => {
			const slug = path.split('/').pop()?.replace('.md', '') ?? '';
			return {
				slug,
				title: post.metadata?.title ?? slug,
				date: post.metadata?.date ?? ''
			};
		})
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 2);

	return { recentPosts: posts };
}
