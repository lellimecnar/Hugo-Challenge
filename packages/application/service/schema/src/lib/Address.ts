import { z, input, output } from 'zod';

const ZIP_REGEXP = /^\d{5}$/;
const STATE_REGEXP = /^[A-Z]{2}$/i;

export const Address = z.object({
	street: z.string().trim().min(1).describe('Street Address'),
	city: z.string().trim().min(1).describe('City'),
	state: z
		.string()
		.trim()
		.regex(STATE_REGEXP, 'Invalid State')
		.transform((val) => val.toUpperCase())
		.describe('State'),
	zip: z.coerce
		.string()
		.trim()
		.regex(ZIP_REGEXP, 'Invalid Zip Code')
		.describe('Zip Code'),
});

export const AddressInput = Address.deepPartial();

export type AddressType = output<typeof Address>;
export type AddressInputType = input<typeof AddressInput>;
