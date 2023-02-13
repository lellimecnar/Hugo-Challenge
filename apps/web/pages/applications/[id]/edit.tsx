import { useRouter } from 'next/router';
import { ApplicationFormProvider } from '@proj/application-hooks';
import { Title } from '@mantine/core';

import ApplicationForm from 'apps/web/components/ApplicationForm';

export const Edit = () => {
	const {
		query: { id },
	} = useRouter();
	return (
		<ApplicationFormProvider id={id as string}>
			<Title>Application Edit</Title>
			<ApplicationForm id={id as string} />
		</ApplicationFormProvider>
	);
};

export default Edit;
