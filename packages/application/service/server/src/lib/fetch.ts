import { ObjectId } from 'bson';

import { ApplicationIdType } from '@lellimecnar/application-service/schema';

import { Applications } from '../db';

const find = async (
	...[filter, options]: Partial<Parameters<typeof Applications.find>>
) =>
	Applications.find(
		{
			...filter,
		},
		{
			sort: {
				completedAt: 1,
				updatedAt: -1,
			},
			...options,
		},
	)
		.map((doc) => JSON.parse(JSON.stringify(doc)))
		.toArray();

export const fetchOne = async (applicationId: ApplicationIdType) => {
	try {
		if (!applicationId || !ObjectId.isValid(applicationId)) {
			throw new Error('Invalid Id');
		}

		const [data] = await find({
			_id: new ObjectId(applicationId) as any,
		});

		return { success: true, data } as const;
	} catch (error) {
		console.error(error);
		return { success: false, error } as const;
	}
};

export const fetchAll = async () => {
	try {
		const data = await find();

		return { success: true, data } as const;
	} catch (error) {
		return { success: false, error } as const;
	}
};
