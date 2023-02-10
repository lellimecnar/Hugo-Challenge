import React, { useMemo, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
	Application,
	ApplicationIdType,
	ApplicationInputType,
} from '@proj/application-service/schema';

import { useApplication } from '../queries';

export interface ApplicationFormProviderProps extends React.PropsWithChildren {
	id?: ApplicationIdType;
}

export const ApplicationFormProvider = ({
	id,
	children,
}: ApplicationFormProviderProps) => {
	const { data: values, error } = useApplication(id);

	const resolver = useMemo(() => {
		const schema = id ? Application : Application.omit({ _id: true });
		return zodResolver(schema);
	}, [id]);

	const methods = useForm<ApplicationInputType>({
		resolver,
		values,
		reValidateMode: 'onChange',
		mode: 'onTouched',
		resetOptions: {
			keepDefaultValues: true,
			keepTouched: true,
			keepErrors: true,
		},
	});

	useEffect(() => {
		if (Array.isArray(error?.items) && error.items.length) {
			error.items.forEach((err) => {
				methods.setError(err.path.join('.'), err);
			});
			// console..dir(z)
		}
	}, [error, methods.setError]);

	return (
		<FormProvider {...methods}>
			{children}
			<pre>{JSON.stringify(methods.formState.errors, null, '    ')}</pre>
		</FormProvider>
	);
};
