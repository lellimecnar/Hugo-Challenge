import omit from 'lodash/omit';
import {
	ApplicationIdType,
	ApplicationInputType,
} from '@proj/application-service/schema';

import { request } from '../Api';

export const create = (data: ApplicationInputType) =>
	request<ApplicationInputType, ApplicationInputType>({
		url: '/',
		method: 'POST',
		data: omit(data, '_id'),
	});

export const update = (id: ApplicationIdType, data: ApplicationInputType) =>
	request<ApplicationInputType, ApplicationInputType>({
		url: `/${id}`,
		method: 'PUT',
		data: omit(data, '_id'),
	});

export const save = (
	...args:
		| [id: ApplicationIdType, data: ApplicationInputType]
		| [id: ApplicationInputType]
) => {
	const data = args.pop() as ApplicationInputType;
	const id = args.pop() as string | undefined;

	if (typeof id === 'string') {
		return update(id, data);
	}

	return create(data);
};
