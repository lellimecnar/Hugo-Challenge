import {
	UseQueryOptions,
	UseMutationOptions,
	QueryKey,
	MutationKey,
} from '@tanstack/react-query';

export type QueryKeyObj = {
	scope: 'applications';
	type: string;
} & Record<string, any>;

export type KeyFn = (...args: any[]) => readonly [Readonly<QueryKeyObj>];

export type KeysOf<T extends Record<string, KeyFn>> = {
	[K in keyof T]: Readonly<ReturnType<T[K]>>;
};

export type QueryOptions<T, K extends QueryKey, E = unknown> = Omit<
	UseQueryOptions<T, E, T, K>,
	'queryKey' | 'queryFn'
>;

export type MutationOptions<T, K extends MutationKey, E = unknown> = Omit<
	UseMutationOptions<T, E, T, K>,
	'mutationKey' | 'mutationFn'
>;
