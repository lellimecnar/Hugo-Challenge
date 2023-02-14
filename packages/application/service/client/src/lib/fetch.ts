import {
	ApplicationIdType,
	ApplicationType,
} from '@proj/application-service/schema';

import { request } from '../Api';

export const fetchOne = async (id?: ApplicationIdType) =>
	id
		? request<ApplicationType>({
				url: `/${id}`,
				method: 'GET',
		  })
		: ({} as ApplicationType);

export const fetchAll = () =>
	request<ApplicationType[]>({
		url: '/',
		method: 'GET',
	});
