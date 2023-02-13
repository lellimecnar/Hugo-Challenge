import { ApplicationFormProvider } from '@proj/application-hooks';
import { Title } from '@mantine/core';

import ApplicationForm from 'apps/web/components/ApplicationForm';

export const Edit = () => (
	<ApplicationFormProvider>
		<Title>New Application Form</Title>
		<ApplicationForm />
	</ApplicationFormProvider>
);

export default Edit;
