import type { NextApiHandler } from 'next';

import Applications from '@proj/application-service/server';
import {
	ApplicationIdType,
	ApplicationInputType,
} from '@proj/application-service/schema';

const handler: NextApiHandler = async ({ method, query, body }, res) => {
	switch (method) {
		case 'GET':
			res.json(
				await Applications.fetchOne(query.id as ApplicationIdType),
			);
			break;
		case 'PUT':
			res.json(
				await Applications.update(
					query.id as ApplicationIdType,
					body as ApplicationInputType,
				),
			);
			break;
		case 'POST':
			res.json(
				await Applications.calculate(query.id as ApplicationIdType),
			);
			break;
		case 'DELETE':
			res.json(await Applications.remove(query.id as ApplicationIdType));
			break;
		default:
			res.status(501).send('Not Implemented');
			break;
	}
};

export default handler;
