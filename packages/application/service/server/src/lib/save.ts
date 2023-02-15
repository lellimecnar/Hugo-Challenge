import { ObjectId } from 'bson';
import omit from 'lodash/omit';

import {
	ApplicationInput,
	ApplicationInputType,
	ApplicationIdType,
} from '@lellimecnar/application-service/schema';

import { Applications } from '../db';

export const save = async (
	...args:
		| [id: ApplicationIdType, data: ApplicationInputType]
		| [data: ApplicationInputType]
) => {
	try {
		const applicationInput = args.pop() as ApplicationInputType;
		const applicationId = args.pop() as ApplicationIdType | undefined;

		const validationResult = ApplicationInput.parse({
			...applicationInput,
			updatedAt: new Date(),
		});

		const { ok, value, lastErrorObject } =
			await Applications.findOneAndReplace(
				{
					_id: new ObjectId(applicationId) as any,
				},
				omit(validationResult, '_id'),
				{ upsert: true, returnDocument: 'after' },
			);

		if (!ok) {
			throw lastErrorObject;
		}

		return { success: true, data: value } as const;
	} catch (error) {
		return { success: false, error } as const;
	}
};

export const create = (data: ApplicationInputType) => save(data);

export const update = (id: ApplicationIdType, data: ApplicationInputType) =>
	save(id, data);
