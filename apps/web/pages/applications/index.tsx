import { Loader, Center } from '@mantine/core';

import { useApplications } from '@proj/application-hooks';

import ApplicationList from 'apps/web/components/ApplicationList';

export function Applications() {
	const result = useApplications();
	const { data, isLoading } = result;

	return (
		<div>
			<h1>Application List</h1>
			<Center>
				{isLoading ? (
					<Loader variant="dots" size="xl" />
				) : (
					<ApplicationList data={data} />
				)}
			</Center>
		</div>
	);
}

export default Applications;
