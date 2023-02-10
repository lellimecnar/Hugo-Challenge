import Link from 'next/link';
import { Button, Space, Table } from '@mantine/core';
import { IconSquarePlus } from '@tabler/icons-react';

import { ApplicationInputType } from '@proj/application-service/schema';

import Row from './Row';

export interface ApplicationListProps {
	data: ApplicationInputType[];
}

const ApplicationList = ({ data }: ApplicationListProps) => (
	<Table>
		<thead>
			<tr>
				<th>Applicant Name</th>
				<th>Location</th>
				<th>Status</th>
				<th></th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{data.map((application) => (
				<Row key={application._id} {...application} />
			))}
		</tbody>
		<tfoot>
			<tr>
				<td colSpan={5} align="center">
					<Button
						component={Link}
						href="/applications/create"
						variant="subtle"
					>
						<IconSquarePlus />
						<Space w="sm" />
						Start a New Application
					</Button>
				</td>
			</tr>
		</tfoot>
	</Table>
);

export default ApplicationList;
