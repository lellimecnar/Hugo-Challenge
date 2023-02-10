import { ObjectId } from 'bson';
import { z } from 'zod';
import type { input, output } from 'zod';
import * as Schema from '@proj/application-service/schema';

export const Application = Schema.Application.extend({
	_id: z
		.union([
			Schema.Application.shape._id
				.refine((val) => ObjectId.isValid(val))
				.transform((val) => new ObjectId(val)),
			z.instanceof(ObjectId),
		])
		.default(() => new ObjectId()),
});

export const ApplicationInput = Application.deepPartial();

export const ApplicationId = Application.shape._id;

export type ApplicationType = output<typeof Application>;
export type ApplicationInputType = input<typeof ApplicationInput>;
export type ApplicationIdType = input<typeof Application>['_id'];

export type ApplicationDbType = Omit<ApplicationInputType, '_id'> &
	Pick<ApplicationType, '_id'>;
