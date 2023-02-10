import {
	TextInput,
	Select,
	SelectItem,
	ActionIcon,
	Table,
	Group,
	Button,
	Space,
} from '@mantine/core';
import { IconSquarePlus, IconSquareMinus } from '@tabler/icons-react';
import range from 'lodash/range';

import { Field, useApplicationFieldArray } from '@proj/application-hooks';

const YEARS = range(1985, new Date().getFullYear() + 1).map((value) => ({
	value: value,
	label: `${value}`,
})) as unknown as SelectItem[];
const MAX = 3;

const Vehicles = () => {
	const { fields, append, remove } = useApplicationFieldArray('vehicles', {
		rules: { maxLength: 3, minLength: 1 },
	});

	return (
		<Table>
			<colgroup>
				<col width="100"></col>
				<col></col>
				<col></col>
				<col></col>
				<col></col>
			</colgroup>
			<thead>
				<tr>
					<th>Year</th>
					<th>Make</th>
					<th>Model</th>
					<th>VIN</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{fields.map((field, index) => (
					<tr key={field.id}>
						<td>
							<Field
								name={`vehicles.${index}.year`}
								component={Select}
								data={YEARS}
							/>
						</td>
						<td>
							<Field
								name={`vehicles.${index}.make`}
								component={TextInput}
							/>
						</td>
						<td>
							<Field
								name={`vehicles.${index}.model`}
								component={TextInput}
							/>
						</td>
						<td>
							<Field
								name={`vehicles.${index}.vin`}
								component={TextInput}
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
							<Button onClick={() => append({})} variant="subtle">
								<IconSquarePlus />
								<Space w="sm" />
								Add a Vehicle
							</Button>
						</td>
					</tr>
				)}
			</tfoot>
		</Table>
	);
};

export default Vehicles;
