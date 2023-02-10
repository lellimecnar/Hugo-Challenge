import { z, input, output } from 'zod';

const MIN_YEAR = 1985;
const MAX_YEAR = new Date().getFullYear() + 1;
const VIN_REGEX = new RegExp(/^[a-hj-npr-z0-9]{8}[0-9xX][a-hj-npr-z0-9]{8}$/i);

export const Vehicle = z.object({
	vin: z
		.string()
		.trim()
		.regex(VIN_REGEX, 'Invalid VIN')
		.transform((val) => val.toUpperCase()),
	year: z
		.union([
			z
				.string()
				.trim()
				.regex(/^\d{4}$/),
			z.coerce.number(),
		])
		.transform((val) => Number(val))
		.refine(
			(val) => val >= MIN_YEAR,
			`Vehicle must be no older than ${MIN_YEAR}`,
		)
		.refine(
			(val) => val <= MAX_YEAR,
			'Vehicle cannot be newer than next year',
		),
	make: z.string().trim().min(1, 'Vehicle Make is required'),
	model: z.string().trim().min(1, 'Vehicle Make is required'),
});

export const VehicleInput = Vehicle.deepPartial();

export type VehicleType = output<typeof Vehicle>;
export type VehicleInputType = input<typeof VehicleInput>;
