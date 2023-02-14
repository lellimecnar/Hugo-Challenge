import { ObjectId } from 'bson';

import type { ApplicationIdType } from '@proj/application-service/schema';

import { Applications } from '../db';

export const remove = async (applicationId: ApplicationIdType) => {
	try {
		if (!applicationId || !ObjectId.isValid(applicationId)) {
			throw new Error('Invalid Id');
		}

		const { deletedCount } = await Applications.deleteOne({
			_id: new ObjectId(applicationId) as any,
		});

		if (!deletedCount) {
			throw new Error('There was a problem deleting this application');
		}

		return { success: true } as const;
	} catch (error) {
		return { success: false, error } as const;
	}
};
