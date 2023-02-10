import { MongoClient, ServerApiVersion } from 'mongodb';

const clients: Map<string, MongoClient> = new Map();

export default (appName: string): MongoClient => {
	if (typeof process.env['MONGODB_CONNECTION_STRING'] !== 'string') {
		throw new Error('MONGODB_CONNECTION_STRING env var not set!');
	}

	if (!clients.has(appName)) {
		clients.set(
			appName,
			new MongoClient(process.env['MONGODB_CONNECTION_STRING'], {
				serverApi: ServerApiVersion.v1,
				appName,
				forceServerObjectId: true,
				maxIdleTimeMS: 60 * 1000,
			}),
		);
	}

	return clients.get(appName) as MongoClient;
};
