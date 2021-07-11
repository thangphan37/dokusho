// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'
type Data = {
	name: string
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const options = {
		path: '/',
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 7
	}
	res.setHeader('Set-Cookie', serialize('lang', JSON.parse(req.body).lang, options))
	res.statusCode = 307;
	res.setHeader('Location', req.headers.referer || '/');
	res.end();
	return;
}