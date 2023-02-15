import { ApplicationIdType } from '@lellimecnar/application-service/schema';

import { request } from '../Api';

export const remove = (id: ApplicationIdType) =>
	request<void>({
		url: `/${id}`,
		method: 'DELETE',
	});
