import { ObjectId } from 'bson';
import { Applications } from '../db';
import type { ApplicationIdType } from '@proj/application-service/schema';

export const calculate = async (id: ApplicationIdType) => {
	try {
		const price = +(Math.random() * 300 + 100).toFixed(2);

		const { ok, value, lastErrorObject } =
			await Applications.findOneAndUpdate(
				{
					_id: new ObjectId(id) as any,
				},
				{
					$set: {
						completedAt: new Date(),
						price,
					},
				},
				{ returnDocument: 'after' },
			);

		if (!ok) {
			throw lastErrorObject;
		}

		return { success: true, data: value } as const;
	} catch (error) {
		return { success: false, error } as const;
	}
};
