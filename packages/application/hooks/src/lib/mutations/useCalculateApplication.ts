import {
	useMutation,
	useQueryClient,
	UseMutationOptions,
} from '@tanstack/react-query';

import {
	ApplicationInputType,
	ApplicationIdType,
} from '@proj/application-service/schema';

import Api from '@proj/application-service/client';

import { mutationKeys } from './keys';
import { queryKeys } from '../queries';

export const useCalculateApplication = (
	id?: ApplicationIdType,
	options?: UseMutationOptions<
		ApplicationInputType,
		unknown,
		ApplicationIdType | void
	>,
) => {
	const client = useQueryClient();

	return useMutation(
		mutationKeys.calculate(id),
		async (_id = id) => {
			if (!_id) {
				throw new Error('No id provided to calculate');
			}

			return Api.calculate(_id);
		},
		{
			...options,
			onSuccess: (data, ...args) => {
				client.setQueryData(queryKeys.one(id), data);
				client.invalidateQueries(queryKeys.all());

				if (options?.onSuccess) {
					return options.onSuccess(data, ...args);
				}
			},
		},
	);
};
