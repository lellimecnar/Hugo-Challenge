import { ApplicationFormProvider } from '@proj/application-hooks';
import ApplicationForm from 'apps/web/components/ApplicationForm';

export const Edit = () => (
	<ApplicationFormProvider>
		<h1>New Application Form</h1>
		<ApplicationForm />
	</ApplicationFormProvider>
);

export default Edit;
