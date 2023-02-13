import { DatePicker } from '@mantine/dates';
import day from 'dayjs';

const MIN_AGE = 16;
const MAX_DATE = day().subtract(MIN_AGE, 'years').startOf('day').toDate();

const DobPicker = (props) => (
	<DatePicker {...props} initialLevel="year" maxDate={MAX_DATE} />
);

export default DobPicker;
