import { ApplicationIdType } from '@lellimecnar/application-service/schema';

export type ApplicationsQueryKey = [
	{
		scope: 'applications';
		type: 'all';
	},
];

export type ApplicationQueryKey = [
	{
		scope: 'applications';
		type: 'one';
		id?: ApplicationIdType;
	},
];

export type ApplicationQueryKeys = ApplicationsQueryKey | ApplicationQueryKey;

export const queryKeys = {
	all: (): ApplicationsQueryKey => [{ scope: 'applications', type: 'all' }],
	one: (id?: ApplicationIdType): ApplicationQueryKey => [
		{ scope: 'applications', type: 'one', id },
	],
};
