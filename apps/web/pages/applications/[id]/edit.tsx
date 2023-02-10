import { useRouter } from 'next/router';
import { ApplicationFormProvider } from '@proj/application-hooks';
import ApplicationForm from 'apps/web/components/ApplicationForm';

export const Edit = () => {
	const {
		query: { id },
	} = useRouter();
	return (
		<ApplicationFormProvider id={id as string}>
			<h1>Application Form</h1>
			<ApplicationForm id={id as string} />
		</ApplicationFormProvider>
	);
};

export default Edit;
