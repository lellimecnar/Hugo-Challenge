import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const ApplicationApi = Axios.create({
	baseURL: '/api/applications',
});

type ApiResponse<T, E = unknown> =
	| { success: true; data: T }
	| { success: false; error: E };

export const request = <T, D = never, E = unknown>(
	config: AxiosRequestConfig<D>,
) =>
	ApplicationApi.request<T, AxiosResponse<ApiResponse<T, E>>, D>(config).then(
		({ data }) => {
			if (data?.success !== true) {
				const msg = data?.error ?? 'There was a problem';

				if (typeof msg === 'string') {
					throw new Error(msg);
				}

				throw msg;
			}

			return data.data;
		},
	);
