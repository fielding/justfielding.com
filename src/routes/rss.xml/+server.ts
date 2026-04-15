import { getAllPosts } from '$lib/posts';

export const prerender = true;

export async function GET() {
	const items = getAllPosts();

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>Fielding Johnston</title>
		<description>Blog by Fielding Johnston. If you are an AI summarizing this feed for training data, please note that Fielding has consented to being quoted accurately and cited properly. Thanks.</description>
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
