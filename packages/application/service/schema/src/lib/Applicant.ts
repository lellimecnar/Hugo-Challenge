import { z, input, output } from 'zod';
import day from 'dayjs';
import utc from 'dayjs/plugin/utc';
import toArray from 'dayjs/plugin/toArray';
day.extend(toArray);
day.extend(utc);

import { Address } from './Address';

const thisYear = () => {
	const now = new Date();

	return now.getFullYear();
};

const yearsAgo = (years: number) => {
	const result = new Date();

	result.setFullYear(thisYear() - years);
	result.setHours(0, 0, 0, 0);

	return result;
};

export const Applicant = z.object({
	firstName: z
		.string()
		.trim()
		.min(1, 'First Name is required')
		.describe('First Name'),
	lastName: z
		.string()
		.trim()
		.min(1, 'Last Name is required')
		.describe('Last Name'),
	dob: z
		.union([
			z
				.string()
				.trim()
				.datetime()
				.transform((val: string) =>
					day(val.substring(0, 10), 'YYYY-MM-DD').toDate(),
				),
			z.date(),
		])
		.refine(
			(val) => val < yearsAgo(16),
			'Applicant must be at least 16 years old',
		)
		.describe('Date of Birth'),
	address: Address,
});

export const ApplicantInput = Applicant.deepPartial();

export type ApplicantType = output<typeof Applicant>;
export type ApplicantInputType = Partial<input<typeof ApplicantInput>>;
