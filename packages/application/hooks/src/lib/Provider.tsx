import type { PropsWithChildren, ComponentType } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

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

export const withApplicationQuery =
	<P extends object>(Comp: ComponentType<P>) =>
	(props: P) =>
		(
			<ApplicationQueryProvider>
				<Comp {...props} />
			</ApplicationQueryProvider>
		);
