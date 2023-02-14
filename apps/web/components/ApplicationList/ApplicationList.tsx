import { Table } from '@mantine/core';

import { ApplicationInputType } from '@proj/application-service/schema';

import Row from './Row';

export interface ApplicationListProps {
	data: ApplicationInputType[];
}

const ApplicationList = ({ data }: ApplicationListProps) => (
	<Table horizontalSpacing="xl" striped>
		<thead>
			<tr>
				<th style={{ width: '100%' }}>Applicant Name</th>
				<th>Location</th>
				<th>Price</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{data.map((application) => (
				<Row key={application._id} {...application} />
			))}
		</tbody>
	</Table>
);

export default ApplicationList;
