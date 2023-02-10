import {
	ApplicationIdType,
	ApplicationType,
} from '@proj/application-service/schema';

import { request } from '../Api';

export const calculate = (id: ApplicationIdType) =>
	request<ApplicationType>({
		url: `/${id}`,
		method: 'POST',
	});
