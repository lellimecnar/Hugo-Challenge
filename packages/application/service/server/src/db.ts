import SharedDb from '@lellimecnar/shared-db';
import type { ApplicationInputType } from '@lellimecnar/application-service/schema';

export const client = SharedDb('ApplicationService');

export const Applications = client
	.db('HugoChallenge')
	.collection<ApplicationInputType>('Applications');
