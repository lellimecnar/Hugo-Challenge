import {
	TextInput,
	Select,
	ActionIcon,
	Table,
	Group,
	Button,
	Space,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { IconSquarePlus, IconSquareMinus } from '@tabler/icons-react';
import day from 'dayjs';

import { CoApplicant } from '@proj/application-service/schema';
import { Field, useApplicationFieldArray } from '@proj/application-hooks';

const RELATIONSHIPS = CoApplicant.shape.relationship._def.values.map(
	(value) => ({ value, label: value }),
);
const MAX = 3;
const MAX_DATE = day().subtract(16, 'years').startOf('day').toDate();

const CoApplicants = () => {
	const { fields, append, remove } = useApplicationFieldArray(
		'coApplicants',
		{
			rules: { maxLength: 3, minLength: 1 },
		},
	);

	return (
		<Table>
			<colgroup>
				<col></col>
				<col></col>
				<col width={200}></col>
				<col></col>
				<col></col>
			</colgroup>
			<thead>
				<tr>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Date of Birth</th>
					<th>Relationship</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{fields.map((field, index) => (
					<tr key={field.id}>
						<td>
							<Field
								name={`coApplicants.${index}.firstName`}
								component={TextInput}
								withAsterisk
							/>
						</td>
						<td>
							<Field
								name={`coApplicants.${index}.lastName`}
								component={TextInput}
								withAsterisk
							/>
						</td>
						<td>
							<Field
								name={`coApplicants.${index}.dob`}
								component={DatePicker}
								maxDate={MAX_DATE}
								initialLevel="year"
								withAsterisk
								hideOutsideDates
							/>
						</td>
						<td>
							<Field
								name={`coApplicants.${index}.relationship`}
								component={Select}
								data={RELATIONSHIPS}
								withAsterisk
							/>
						</td>
						<td>
							<Group spacing={0}>
								<ActionIcon onClick={() => remove(index)}>
									<IconSquareMinus />
								</ActionIcon>
							</Group>
						</td>
					</tr>
				))}
			</tbody>
			<tfoot>
				{fields.length < MAX && (
					<tr>
						<td colSpan={5} align="center">
							<Button
								onClick={() => append({})}
								variant="subtle"
								leftIcon={<IconSquarePlus />}
							>
								Add a Co-Applicant
							</Button>
						</td>
					</tr>
				)}
			</tfoot>
		</Table>
	);
};

CoApplicants.fields = ['coApplicants'] as const;

export default CoApplicants;
