import { useEffect } from 'react';
import Link from 'next/link';
import { Title, Center, Button, Space, Flex } from '@mantine/core';

import {
	useCalculateApplication,
	useWatchApplicationField,
} from '@proj/application-hooks';

const Complete = () => {
	const [id, completedAt, price] = useWatchApplicationField({
		name: ['_id', 'completedAt', 'price'],
	}) as [string, Date, number];
	const { mutate: calculate } = useCalculateApplication(id as string);

	useEffect(() => {
		if (id && !completedAt) {
			calculate();
		}
	}, [calculate, id, completedAt]);
	return (
		<Center h={250}>
			<Flex direction="column" align="center" justify="center">
				<Title>
					{price?.toLocaleString('en-US', {
						style: 'currency',
						currency: 'USD',
					})}
				</Title>
				<Space w="md" />
				<Title size="h3">per month</Title>
				<Space h="xl" />
				<Button component={Link} href="/applications">
					Finished
				</Button>
			</Flex>
		</Center>
	);
};

export default Complete;
