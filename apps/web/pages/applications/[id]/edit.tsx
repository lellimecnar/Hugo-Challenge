import { useRouter } from 'next/router';
import { ApplicationFormProvider, prefetchOne } from '@proj/application-hooks';
import { Title } from '@mantine/core';
import Api from '@proj/application-service/server';

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

export const getServerSideProps = async (context) => {
	const id = context.query.id as string;
	const dehydratedState = await prefetchOne(id, Api.fetchOne);

	return {
		props: { dehydratedState },
	};
};

export default Edit;
