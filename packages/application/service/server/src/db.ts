import SharedDb from '@proj/shared-db';
import type { ApplicationInputType } from './schema';

export const client = SharedDb('ApplicationService');

export const Applications = client
	.db('HugoChallenge')
	.collection<ApplicationInputType>('Applications');
