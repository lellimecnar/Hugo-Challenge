import type { PropsWithChildren, ComponentType } from 'react';
import { GetServerSidePropsContext } from 'next';
import { AppProps } from 'next/app';
import {
	QueryClientProvider,
	QueryClient,
	Hydrate,
	dehydrate,
	FetchQueryOptions,
	QueryFunctionContext,
	DehydratedState,
} from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Api from '@lellimecnar/application-service/client';
import {
	ApplicationIdType,
	ApplicationInputType,
} from '@lellimecnar/application-service/schema';

import { ApplicationQueryKeys, queryKeys } from './queries';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnMount: 'always',
			staleTime: Infinity,
		},
		mutations: {
			retry: false,
			cacheTime: 0,
			networkMode: 'always',
		},
	},
});

type ApplicationQueryProviderProps = PropsWithChildren;

export const ApplicationQueryProvider: ComponentType<
	ApplicationQueryProviderProps
> = ({ children }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export interface CompProps {
	dehydratedState: DehydratedState;
}

export const withApplicationQuery =
	<P extends AppProps<CompProps>>(Comp: ComponentType<P>) =>
	(props: P) =>
		(
			<ApplicationQueryProvider>
				<Hydrate state={props.pageProps.dehydratedState}>
					{/* <ReactQueryDevtools initialIsOpen={false} /> */}
					<Comp {...props} />
				</Hydrate>
			</ApplicationQueryProvider>
		);

export const prefetchServerSideProps =
	<T extends GetServerSidePropsContext>(
		fn: (client: typeof queryClient, context: T) => void | Promise<void>,
	) =>
	async (context: T) => {
		await fn(queryClient, context);
		const dehydratedState = dehydrate(queryClient);

		return {
			props: {
				dehydratedState,
			},
		};
	};

const prefetch = async <T extends object, K extends ApplicationQueryKeys>(
	queryKey: K,
	queryFn: (
		context: QueryFunctionContext<K>,
	) => Promise<
		T | { success: true; data: T } | { success: false; error: unknown }
	>,
	options?: FetchQueryOptions<T, unknown, T, K>,
) =>
	queryClient
		.prefetchQuery(
			queryKey,
			async (...args) =>
				queryFn(...args).then((data) => (data as any)?.data ?? data),
			options,
		)
		.then(() => dehydrate(queryClient));

export const prefetchOne = async (
	id: ApplicationIdType,
	func:
		| ((id: ApplicationIdType) => Promise<ApplicationInputType>)
		| ((id: ApplicationIdType) => Promise<
				| {
						success: true;
						data: ApplicationInputType;
				  }
				| {
						success: false;
						error: unknown;
				  }
		  >) = Api.fetchOne,
) => prefetch(queryKeys.one(id), async () => func(id));

export const prefetchAll = async (
	func:
		| (() => Promise<ApplicationInputType[]>)
		| (() => Promise<
				| {
						success: true;
						data: ApplicationInputType[];
				  }
				| {
						success: false;
						error: unknown;
				  }
		  >) = Api.fetchAll,
) => prefetch(queryKeys.all(), async () => func());
