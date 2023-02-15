import { useMemo } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MantineProvider, Container, Button, AppShell } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { withApplicationQuery } from '@lellimecnar/application-hooks';
import { mantineTheme } from '@lellimecnar/shared-theme';

import AppHeader from '../components/AppHeader';
// import AppNav from '../components/AppNav';

const BackButton = () => {
	const router = useRouter();
	const back = useMemo(() => {
		const segments = router.asPath?.split(/(?=\/)/g);

		segments?.pop();

		return segments?.join('') || '/';
	}, [router.asPath]);

	if (back === router.asPath) {
		return null;
	}

	return (
		<Button
			variant="subtle"
			component={Link}
			href={back}
			leftIcon={<IconChevronLeft />}
		>
			Go Back
		</Button>
	);
};

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={mantineTheme}
			>
				<Head>
					<title>Hugo Challenge - Lance Miller</title>
				</Head>
				<AppShell
					header={<AppHeader />}
					// navbar={<AppNav />}
				>
					<Container size="lg">
						<BackButton />
						<Component {...pageProps} />
					</Container>
				</AppShell>
			</MantineProvider>
		</>
	);
};

export default withApplicationQuery(App);
