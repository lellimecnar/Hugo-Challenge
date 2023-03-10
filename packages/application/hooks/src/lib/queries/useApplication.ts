import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import {
	ApplicationIdType,
	ApplicationType,
	ApplicationInput,
} from '@lellimecnar/application-service/schema';

import Api from '@lellimecnar/application-service/client';

import { QueryOptions } from '../types';

import { queryKeys, ApplicationQueryKey } from './keys';

export const useApplication = (
	id?: ApplicationIdType,
	options?: QueryOptions<ApplicationType, ApplicationQueryKey>,
) => {
	const result = useQuery(queryKeys.one(id), async () => Api.fetchOne(id), {
		staleTime: Infinity,
		...(id
			? {
					cacheTime: 0,
					enabled: false,
					refetch: false,
			  }
			: {
					refetchOnMount: 'always',
			  }),
		...options,
	});
	const data = useMemo(
		() => (result.data ? ApplicationInput.parse(result.data) : result.data),
		[result.data],
	);

	return { ...result, data };
};
