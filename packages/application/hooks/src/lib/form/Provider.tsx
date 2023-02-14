import React, { useMemo, useEffect } from 'react';
import { FormProvider, useForm, FieldErrors } from 'react-hook-form';
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
	const { data: values, ...result } = useApplication(id);
	const errors: FieldErrors<ApplicationInputType> | void = (
		result.error as any
	)?.items;

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
		if (errors && Array.isArray(errors) && errors.length) {
			errors.forEach((error) => {
				methods.setError(error.path.join('.'), error);
			});
		}
	}, [errors, methods.setError]);

	return <FormProvider {...methods}>{children}</FormProvider>;
};
