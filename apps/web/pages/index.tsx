import { Container, Title, Button, Center } from '@mantine/core';
import Link from 'next/link';

export function Index() {
	/*
	 * Replace the elements below with your own.
	 *
	 * Note: The corresponding styles are in the ./index.@emotion/styled file.
	 */
	return (
		<>
			<Title>Home Page</Title>
			<Center mih={250}>
				<Button size="xl" component={Link} href="/applications">
					Go to Application List Page
				</Button>
			</Center>
		</>
	);
}

export default Index;
