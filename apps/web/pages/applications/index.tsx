import { useMemo } from 'react';
import Link from 'next/link';
import { Paper, Button, Group, Title, LoadingOverlay } from '@mantine/core';
import { IconSquarePlus } from '@tabler/icons-react';

import { useApplications, prefetchAll } from '@lellimecnar/application-hooks';
import Api from '@lellimecnar/application-service/server';

import ApplicationList from 'apps/web/components/ApplicationList';

export function Applications() {
	const { data } = useApplications();
	const isLoading = useMemo(
		() => !(Array.isArray(data) && data.length),
		[data],
	);

	return (
		<div>
			<Group position="apart" align="end">
				<Title>Application List</Title>
				<Button
					component={Link}
					href="/applications/create"
					variant="subtle"
					compact
					leftIcon={<IconSquarePlus />}
				>
					Start a New Application
				</Button>
			</Group>
			<Paper>
				<LoadingOverlay visible={isLoading} />
				{!isLoading && <ApplicationList data={data} />}
			</Paper>
		</div>
	);
}

export const getServerSideProps = async () => {
	const dehydratedState = await prefetchAll(Api.fetchAll);

	return { props: { dehydratedState } };
};

export default Applications;
