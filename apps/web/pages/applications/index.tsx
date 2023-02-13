import Link from 'next/link';
import {
	Paper,
	Button,
	Space,
	Group,
	Title,
	LoadingOverlay,
} from '@mantine/core';
import { IconSquarePlus } from '@tabler/icons-react';

import { useApplications } from '@proj/application-hooks';

import ApplicationList from 'apps/web/components/ApplicationList';

export function Applications() {
	const result = useApplications();
	const { data, isLoading } = result;

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

export default Applications;
