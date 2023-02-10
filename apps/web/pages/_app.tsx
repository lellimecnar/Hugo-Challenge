import { useMemo } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MantineProvider, Container, Button, Title } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { withApplicationQuery } from '@proj/application-hooks';

const App = ({ Component, pageProps }: AppProps) => {
	const router = useRouter();
	const back = useMemo(() => {
		const segments = router.asPath?.split(/(?=\/)/g);

		segments?.pop();

		return segments?.join('') || '/';
	}, [router.asPath]);

	return (
		<>
			<MantineProvider withGlobalStyles withNormalizeCSS>
				<Head>
					<title>Hugo Challenge - Lance Miller</title>
				</Head>
				<Container size="lg" py="xl">
					{back !== router.asPath && (
						<Button variant="subtle" component={Link} href={back}>
							<IconChevronLeft />
							Go Back
						</Button>
					)}
					<Component {...pageProps} />
				</Container>
			</MantineProvider>
		</>
	);
};

export default withApplicationQuery(App);
