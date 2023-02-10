import { TextInput, Grid, NumberInput } from '@mantine/core';
import { Field } from '@proj/application-hooks';

import StateSelect from '../../StateSelect';
import DobPicker from '../../DobPicker';

const Applicant = () => {
	return (
		<Grid gutter="lg">
			<Grid.Col span={6}>
				<Grid>
					<Grid.Col span={6}>
						<Field
							name="applicant.firstName"
							component={TextInput}
							withAsterisk
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<Field
							name="applicant.lastName"
							component={TextInput}
							withAsterisk
						/>
					</Grid.Col>
					<Grid.Col span={5}>
						<Field
							name="applicant.dob"
							component={DobPicker}
							withAsterisk
						/>
					</Grid.Col>
				</Grid>
			</Grid.Col>
			<Grid.Col span={6}>
				<Grid>
					<Grid.Col span={12}>
						<Field
							name="applicant.address.street"
							component={TextInput}
							withAsterisk
						/>
					</Grid.Col>
					<Grid.Col span={5}>
						<Field
							name="applicant.address.city"
							component={TextInput}
							withAsterisk
						/>
					</Grid.Col>
					<Grid.Col span={4}>
						<Field
							name="applicant.address.state"
							component={StateSelect}
							withAsterisk
						/>
					</Grid.Col>
					<Grid.Col span={3}>
						<Field
							name="applicant.address.zip"
							component={NumberInput}
							withAsterisk
							hideControls
						/>
					</Grid.Col>
				</Grid>
			</Grid.Col>
		</Grid>
	);
};

Applicant.fields = ['applicant'] as const;

export default Applicant;
