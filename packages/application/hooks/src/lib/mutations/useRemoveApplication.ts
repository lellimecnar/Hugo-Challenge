import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApplicationIdType } from '@proj/application-service/schema';
import Api from '@proj/application-service/client';

import { MutationOptions } from '../types';
import { queryKeys } from '../queries';

import { mutationKeys, RemoveApplicationMutationKey } from './keys';
export const useRemoveApplication = (
	id: ApplicationIdType,
	options?: MutationOptions<void, RemoveApplicationMutationKey>,
) => {
	const queryClient = useQueryClient();

	return useMutation(mutationKeys.remove(id), async () => Api.remove(id), {
		...options,
		onSuccess: () => {
			queryClient.removeQueries(queryKeys.one(id));
			queryClient.invalidateQueries(queryKeys.all());
		},
	});
};
