import Link from 'next/link';
import { Title, Center, Button, Space, Flex } from '@mantine/core';

import { useWatchApplicationField } from '@proj/application-hooks';

const Complete = () => {
	const [id, price] = useWatchApplicationField({
		name: ['_id', 'price'],
	});

	return (
		<Center h={250}>
			<Flex direction="column" align="center" justify="center">
				{!!price && (
					<>
						<Title>
							{price?.toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD',
							})}
						</Title>
						<Space w="md" />
						<Title size="h3">per month</Title>
					</>
				)}
				<Space h="xl" />
				<Button component={Link} href={`/applications/${id}`}>
					Finished
				</Button>
			</Flex>
		</Center>
	);
};

export default Complete;
