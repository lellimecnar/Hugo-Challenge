import { ApplicationIdType } from '@lellimecnar/application-service/schema';

export type CalculateApplicationMutationKey = readonly [
	{
		scope: 'applications';
		type: 'calculate';
		id: ApplicationIdType;
	},
];

export type RemoveApplicationMutationKey = [
	{
		scope: 'applications';
		type: 'remove';
		id: ApplicationIdType;
	},
];

export type SaveApplicationMutationKey = [
	{
		scope: 'applications';
		type: 'save';
		id?: ApplicationIdType;
	},
];

export const mutationKeys = {
	calculate: (id?: ApplicationIdType) =>
		[
			{ scope: 'applications', type: 'calculate', id },
		] as CalculateApplicationMutationKey,
	remove: (id: ApplicationIdType) =>
		[
			{ scope: 'applications', type: 'remove', id },
		] as RemoveApplicationMutationKey,
	save: (id?: ApplicationIdType) =>
		[
			{ scope: 'applications', type: 'save', id },
		] as SaveApplicationMutationKey,
};
