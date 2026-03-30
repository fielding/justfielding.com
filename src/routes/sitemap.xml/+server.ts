const site = 'https://justfielding.com';

const posts = import.meta.glob('/src/posts/*.md', { eager: true });

export const prerender = true;

export function GET() {
	const postEntries = Object.entries(posts)
		.map(([path, post]: [string, any]) => {
			const slug = path.split('/').pop()?.replace('.md', '') ?? '';
			const date = post.metadata?.date ?? '';
			return { slug, date };
		})
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${site}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${site}/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
${postEntries
	.map(
		(post) => `  <url>
    <loc>${site}/blog/${post.slug}</loc>${post.date ? `\n    <lastmod>${post.date}</lastmod>` : ''}
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
