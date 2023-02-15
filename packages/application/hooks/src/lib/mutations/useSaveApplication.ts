import {
	useMutation,
	useQueryClient,
	UseMutationOptions,
} from '@tanstack/react-query';

import {
	ApplicationInputType,
	ApplicationIdType,
} from '@lellimecnar/application-service/schema';

import Api from '@lellimecnar/application-service/client';

import { queryKeys } from '../queries';

import { mutationKeys } from './keys';
export const useSaveApplication = (
	id?: ApplicationIdType,
	options?: UseMutationOptions<
		ApplicationInputType,
		unknown,
		ApplicationInputType
	>,
) => {
	const client = useQueryClient();

	return useMutation(
		mutationKeys.save(id),
		async (data) => Api.save(id, data),
		{
			...options,
			onSuccess: (data, ...args) => {
				client.invalidateQueries(queryKeys.all());
				client.setQueryData(queryKeys.one(data._id), data);
				// client.removeQueries(queryKeys.one());

				if (options?.onSuccess) {
					return options.onSuccess(data, ...args);
				}
			},
		},
	);
};
export const useCreateApplication = (
	options?: UseMutationOptions<
		ApplicationInputType,
		unknown,
		ApplicationInputType
	>,
) => useSaveApplication(undefined, options);

export const useUpdateApplication = (
	id: ApplicationIdType,
	options?: UseMutationOptions<
		ApplicationInputType,
		unknown,
		ApplicationInputType
	>,
) => useSaveApplication(id, options);
