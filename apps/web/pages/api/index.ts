import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
	res.status(501).send('Not Implemented');
};

export default handler;
