import { useCallback } from 'react';
import Link from 'next/link';
import { ActionIcon, Text, Badge, Group, Anchor } from '@mantine/core';
import { IconTrashX, IconEdit } from '@tabler/icons-react';
import compact from 'lodash/compact';
import memoize from 'lodash/memoize';

import { useRemoveApplication } from '@proj/application-hooks';
import { ApplicationInputType } from '@proj/application-service/schema';

const location = memoize((address) =>
	compact([address?.city, address?.state]).join(', '),
);
const currency = memoize((price) =>
	price?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
);

const fullName = memoize((applicant) =>
	compact([applicant?.lastName, applicant?.firstName]).join(', '),
);

const Row = ({ _id, applicant, price }: ApplicationInputType) => {
	const { mutateAsync: removeApplication } = useRemoveApplication(_id);

	const removeRow = useCallback(async () => {
		await removeApplication();
	}, [removeApplication]);

	return (
		<tr key={_id}>
			<td>
				<Anchor href={`/applications/${_id}`}>
					{fullName(applicant)}
				</Anchor>
			</td>
			<td>
				<Text>{location(applicant?.address)}</Text>
			</td>
			<td align="center">
				{price ? (
					<Text>{currency(price)}</Text>
				) : (
					<Badge color="orange">Incomplete</Badge>
				)}
			</td>
			<td>
				<Group position="right" w={100}>
					{!price && (
						<ActionIcon
							color="blue"
							component={Link}
							href={`/applications/${_id}/edit`}
						>
							<IconEdit />
						</ActionIcon>
					)}
					<ActionIcon color="red" onClick={removeRow}>
						<IconTrashX />
					</ActionIcon>
				</Group>
			</td>
		</tr>
	);
};

export default Row;
