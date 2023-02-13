import { Text, Header, Group, Container } from '@mantine/core';

const AppHeader = () => {
	return (
		<Header height={60}>
			<Container size="lg">
				<Group sx={{ height: '100%' }} position="apart">
					<Text size="xl" weight={600}>
						Hugo Challenge
					</Text>
					<Group position="right"></Group>
				</Group>
			</Container>
		</Header>
	);
};

export default AppHeader;
