import { ObjectId } from 'bson';

import type { ApplicationIdType } from '../schema';

import { Applications } from '../db';

export const fetchOne = async (applicationId: ApplicationIdType) => {
	try {
		if (!applicationId || !ObjectId.isValid(applicationId)) {
			throw new Error('Invalid Id');
		}

		const data = await Applications.findOne({
			_id: new ObjectId(applicationId),
		});

		return { success: true, data } as const;
	} catch (error) {
		console.dir(error);
		return { success: false, error } as const;
	}
};

export const fetchAll = async () => {
	try {
		const applications = await Applications.find().toArray();

		return { success: true, data: applications } as const;
	} catch (error) {
		return { success: false, error } as const;
	}
};
