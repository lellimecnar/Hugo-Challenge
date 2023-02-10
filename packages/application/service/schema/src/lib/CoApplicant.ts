import { z, input, output } from 'zod';

import { Applicant } from './Applicant';

export const CoApplicant = Applicant.omit({ address: true }).extend({
    relationship: z.enum(['Spouse', 'Sibling', 'Parent', 'Friend', 'Other']),
});

export const CoApplicantInput = CoApplicant.deepPartial();

export type CoApplicantType = output<typeof CoApplicant>;
export type CoApplicantInputType = input<typeof CoApplicantInput>;
