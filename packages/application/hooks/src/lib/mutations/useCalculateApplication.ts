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

import { mutationKeys, CalculateApplicationMutationKey } from './keys';
import { queryKeys } from '../queries';

export const useCalculateApplication = (
	id: ApplicationIdType,
	options?: UseMutationOptions<
		ApplicationInputType,
		unknown,
		void,
		CalculateApplicationMutationKey
	>,
) => {
	const client = useQueryClient();

	return useMutation(
		mutationKeys.calculate(id),
		async () => Api.calculate(id),
		{
			...options,
			onSuccess: (data) => {
				client.setQueryData(queryKeys.one(id), data);
				client.invalidateQueries(queryKeys.all());
			},
		},
	);
};
