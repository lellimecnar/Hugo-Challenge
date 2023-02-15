import { useRouter } from 'next/router';
import { Prism } from '@mantine/prism';
import { Title, Paper, Group, Button } from '@mantine/core';
import { IconEdit, IconTrashX } from '@tabler/icons-react';
import { useApplication, prefetchOne } from '@lellimecnar/application-hooks';
import Api from '@lellimecnar/application-service/server';

export function ApplicationDetailPage() {
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
						{JSON.stringify(application, null, 4)}
					</Prism>
				)}
			</Paper>
		</>
	);
}

export const getServerSideProps = async (context) => {
	const id = context.query.id as string;
	const dehydratedState = await prefetchOne(id, Api.fetchOne);

	return { props: { dehydratedState } };
};

export default ApplicationDetailPage;
