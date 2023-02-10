import { TextInput, Grid } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import day from 'dayjs';
import { Field } from '@proj/application-hooks';
const MIN_AGE = 16;
const MAX_DATE = day().subtract(MIN_AGE, 'years').startOf('day').toDate();

const Applicant = () => {
	return (
		<Grid gutter="lg">
			<Grid.Col span={6}>
				<Grid>
					<Grid.Col span={6}>
						<Field
							name="applicant.firstName"
							component={TextInput}
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<Field
							name="applicant.lastName"
							component={TextInput}
						/>
					</Grid.Col>
					<Grid.Col span={4}>
						<Field
							name="applicant.dob"
							component={DatePicker}
							maxDate={MAX_DATE}
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
						/>
					</Grid.Col>
					<Grid.Col span={7}>
						<Field
							name="applicant.address.city"
							component={TextInput}
						/>
					</Grid.Col>
					<Grid.Col span={2}>
						<Field
							name="applicant.address.state"
							component={TextInput}
						/>
					</Grid.Col>
					<Grid.Col span={3}>
						<Field
							name="applicant.address.zip"
							component={TextInput}
						/>
					</Grid.Col>
				</Grid>
			</Grid.Col>
		</Grid>
	);
};

export default Applicant;
