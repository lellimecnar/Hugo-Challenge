import {
	ApplicationIdType,
	ApplicationType,
} from '@lellimecnar/application-service/schema';

import { request } from '../Api';

export const calculate = (id: ApplicationIdType) =>
	request<ApplicationType>({
		url: `/${id}`,
		method: 'POST',
	});
