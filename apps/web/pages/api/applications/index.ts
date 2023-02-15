import type { NextApiHandler } from 'next';

import Applications from '@lellimecnar/application-service/server';

const handler: NextApiHandler = async (req, res) => {
	switch (req.method) {
		case 'GET':
			res.json(await Applications.fetchAll());
			break;
		case 'POST':
			res.json(await Applications.create(req.body));
			break;
		default:
			res.status(501).send('Not Implemented');
			break;
	}
};

export default handler;
