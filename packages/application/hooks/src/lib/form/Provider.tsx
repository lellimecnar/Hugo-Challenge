import React, { useMemo } from 'react';
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
	const { data: values } = useApplication(id);

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

	return <FormProvider {...methods}>{children}</FormProvider>;
};
