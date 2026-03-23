const posts = import.meta.glob('/src/posts/*.md', { eager: true });

export const prerender = true;

export async function GET() {
	const items = Object.entries(posts)
		.map(([path, post]: [string, any]) => {
			const slug = path.split('/').pop()?.replace('.md', '') ?? '';
			return {
				slug,
				title: post.metadata?.title ?? slug,
				date: post.metadata?.date ?? '',
				description: post.metadata?.description ?? ''
			};
		})
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>Fielding Johnston</title>
		<description>Blog posts by Fielding Johnston</description>
		<link>https://justfielding.com</link>
		<atom:link href="https://justfielding.com/rss.xml" rel="self" type="application/rss+xml"/>
		<language>en-us</language>
		<lastBuildDate>${new Date(items[0]?.date).toUTCString()}</lastBuildDate>
${items
	.map(
		(post) => `		<item>
			<title>${escapeXml(post.title)}</title>
			<link>https://justfielding.com/blog/${post.slug}</link>
			<guid>https://justfielding.com/blog/${post.slug}</guid>
			<description>${escapeXml(post.description)}</description>
			<pubDate>${new Date(post.date).toUTCString()}</pubDate>
		</item>`
	)
	.join('\n')}
	</channel>
</rss>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}

function escapeXml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}
