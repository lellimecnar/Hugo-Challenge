import { useQuery, useQueryClient } from '@tanstack/react-query';

import { ApplicationType } from '@lellimecnar/application-service/schema';

import Api from '@lellimecnar/application-service/client';

import { QueryOptions } from '../types';

import { queryKeys, ApplicationsQueryKey } from './keys';

export const useApplications = (
	options?: QueryOptions<ApplicationType[], ApplicationsQueryKey>,
) => {
	const client = useQueryClient();

	return useQuery(queryKeys.all(), async () => Api.fetchAll(), {
		staleTime: Infinity,
		refetchOnMount: 'always',
		...options,
		onSuccess: (data) => {
			for (const application of data) {
				client.setQueryData(
					queryKeys.one(application._id),
					application,
				);
			}
		},
	});
};
