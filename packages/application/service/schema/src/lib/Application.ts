import { z, input, output } from 'zod';

import { Applicant } from './Applicant';
import { CoApplicant } from './CoApplicant';
import { Vehicle } from './Vehicle';

export const ApplicationId = z
	.string()
	.trim()
	.regex(/^[a-f\d]{24}$/i, 'Invalid ID');

export const Application = z.object({
	_id: ApplicationId,
	vehicles: Vehicle.required()
		.array()
		.min(1, 'You must include at least one vehicle')
		.max(3)
		.default([]),
	applicant: Applicant.required(),
	coApplicants: CoApplicant.required()
		.array()
		.optional()
		.transform((val) => (Array.isArray(val) ? val : [])),
	createdAt: z.coerce.date().default(() => new Date()),
	updatedAt: z.coerce.date().default(() => new Date()),
	completedAt: z.coerce.date().optional(),
	price: z.coerce
		.number()
		.transform((val) => Number(val.toFixed(2)))
		.optional(),
});

export const ApplicationInput = Application.deepPartial();

export type ApplicationIdType = output<typeof ApplicationId>;
export type ApplicationIdInputType = input<typeof ApplicationId>;

export type ApplicationType = output<typeof Application>;
export type ApplicationInputType = input<typeof ApplicationInput>;
