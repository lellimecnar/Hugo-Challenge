import { useCallback } from 'react';
import Link from 'next/link';
import {
	Button,
	ActionIcon,
	ThemeIcon,
	Text,
	Badge,
	Center,
	Group,
	Anchor,
} from '@mantine/core';
import {
	IconSquareMinus,
	IconCheck,
	IconTrashX,
	IconEdit,
} from '@tabler/icons-react';
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
				<Anchor component={Link} href={`/applications/${_id}`}>
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
					<Badge size="xs" color="orange" variant="outline">
						Incomplete
					</Badge>
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
