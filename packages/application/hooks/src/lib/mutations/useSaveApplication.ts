import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
	ApplicationInputType,
	ApplicationIdType,
} from '@proj/application-service/schema';

import Api from '@proj/application-service/client';

import { MutationOptions } from '../types';

import { queryKeys } from '../queries';

import { mutationKeys, SaveApplicationMutationKey } from './keys';
export const useSaveApplication = (
	id?: ApplicationIdType,
	options?: MutationOptions<ApplicationInputType, SaveApplicationMutationKey>,
) => {
	const client = useQueryClient();

	return useMutation(
		mutationKeys.save(id),
		async (data: ApplicationInputType) => {
			if (id) {
				return Api.update(id, data);
			}

			return Api.create(data);
		},
		{
			retry: false,
			...options,
			onSuccess: (data: ApplicationInputType) => {
				console.log('save', data);
				client.invalidateQueries(queryKeys.all());
				client.setQueryData(queryKeys.one(id), data);
			},
		},
	);
};
export const useCreateApplication = (
	options?: MutationOptions<ApplicationInputType, SaveApplicationMutationKey>,
) => useSaveApplication(undefined, options);

export const useUpdateApplication = (
	id: ApplicationIdType,
	options?: MutationOptions<ApplicationInputType, SaveApplicationMutationKey>,
) => useSaveApplication(id, options);
