import { useCallback } from 'react';
import Link from 'next/link';
import { Button, ActionIcon } from '@mantine/core';
import { IconSquareMinus } from '@tabler/icons-react';
import compact from 'lodash/compact';
import memoize from 'lodash/memoize';

import { useRemoveApplication } from '@proj/application-hooks';

const location = memoize((address) =>
	compact([address?.city, address?.state]).join(', '),
);
const currency = memoize((price) =>
	price?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
);

const fullName = memoize((applicant) =>
	compact([applicant?.lastName, applicant?.firstName]).join(', '),
);

const Row = ({ _id, applicant, price }) => {
	const { mutateAsync: removeApplication } = useRemoveApplication(_id);

	const removeRow = useCallback(async () => {
		await removeApplication();
	}, [removeApplication]);

	return (
		<tr key={_id}>
			<td>
				<Link href={`/applications/${_id}`}>{fullName(applicant)}</Link>
			</td>
			<td>{location(applicant?.address)}</td>
			<td>{currency(price)}</td>
			<td>
				<Button
					variant="outline"
					compact
					uppercase
					size="xs"
					disabled={!!price}
					component={price ? null : Link}
					href={price ? null : `/applications/${_id}/edit`}
				>
					{price ? 'Completed' : 'Continue'}
				</Button>
			</td>
			<td>
				<ActionIcon>
					<IconSquareMinus onClick={removeRow} />
				</ActionIcon>
			</td>
		</tr>
	);
};

export default Row;
