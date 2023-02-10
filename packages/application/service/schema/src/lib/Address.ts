import { z, input, output } from 'zod';

const ZIP_REGEXP = /^\d{5}$/;

export const Address = z.object({
	street: z.string().trim().min(1).describe('Street Address'),
	city: z.string().trim().min(1).describe('City'),
	state: z
		.string()
		.trim()
		.length(2)
		.transform((val) => val.toUpperCase())
		.describe('State'),
	zip: z
		.union([
			z
				.string()
				.trim()
				.transform((val) => +val),
			z.coerce.number().int(),
		])
		.refine((val: number) => ZIP_REGEXP.test(`${val}`), 'Invalid Zip Code')
		.describe('Zip Code'),
});

export const AddressInput = Address.deepPartial();

export type AddressType = output<typeof Address>;
export type AddressInputType = input<typeof AddressInput>;
