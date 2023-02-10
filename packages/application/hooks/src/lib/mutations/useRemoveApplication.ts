import {
	useMutation,
	useQueryClient,
	UseMutationOptions,
} from '@tanstack/react-query';
import { ApplicationIdType } from '@proj/application-service/schema';
import Api from '@proj/application-service/client';

import { queryKeys } from '../queries';

import { mutationKeys } from './keys';
export const useRemoveApplication = (
	id: ApplicationIdType,
	options?: UseMutationOptions<void, unknown, void, void>,
) => {
	const queryClient = useQueryClient();

	return useMutation(mutationKeys.remove(id), async () => Api.remove(id), {
		...options,
		onSuccess: (...args) => {
			queryClient.removeQueries(queryKeys.one(id));
			queryClient.invalidateQueries(queryKeys.all());

			if (options?.onSuccess) {
				return options.onSuccess(...args);
			}
		},
	});
};
