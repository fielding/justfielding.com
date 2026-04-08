export default async (req) => {
	const url = new URL(req.url);
	const ip =
		req.headers.get('x-nf-client-connection-ip') ||
		req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
		null;

	const entry = {
		t: new Date().toISOString(),
		ip,
		path: url.searchParams.get('p') || null,
		ref: req.headers.get('referer') || null,
		ua: req.headers.get('user-agent') || null
	};

	console.log(JSON.stringify(entry));

	return new Response(null, {
		status: 204,
		headers: { 'cache-control': 'no-store' }
	});
};
