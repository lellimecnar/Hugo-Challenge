import { useRouter } from 'next/router';
import { Prism } from '@mantine/prism';
import { Title, Paper, Group, Button } from '@mantine/core';
import { IconEdit, IconTrashX } from '@tabler/icons-react';
import { useApplication } from '@proj/application-hooks';

export function Id() {
	const {
		query: { id },
	} = useRouter();
	const { data: application } = useApplication(id as string);

	return (
		<>
			<Group position="apart" align="end">
				<Title>Application Detail</Title>
				<Group position="right">
					{!!(application && !application.price) && (
						<Button
							variant="subtle"
							compact
							size="xs"
							color="blue"
							leftIcon={<IconEdit />}
						>
							Edit
						</Button>
					)}
					<Button
						variant="subtle"
						compact
						size="xs"
						color="red"
						leftIcon={<IconTrashX />}
					>
						Delete
					</Button>
				</Group>
			</Group>
			<Paper>
				{application && (
					<Prism language="json">
						{JSON.stringify(application, null, '    ')}
					</Prism>
				)}
			</Paper>
		</>
	);
}

export default Id;
