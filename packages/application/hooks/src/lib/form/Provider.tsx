import React, { useCallback, useRef } from 'react';
import {
	Application,
	ApplicationIdType,
	ApplicationInputType,
} from '@proj/application-service/schema';

import {
	FormProvider,
	SubmitHandler,
	SubmitErrorHandler,
	useForm,
} from 'react-hook-form';

import { useApplication } from '../queries';
import { useSaveApplication } from '../mutations';
import { zodResolver } from '@hookform/resolvers/zod';

export interface ApplicationFormProviderProps extends React.PropsWithChildren {
	id?: ApplicationIdType;
	onSave?: (
		data: ApplicationInputType,
		event?: React.BaseSyntheticEvent,
	) => void;
	onError?: SubmitErrorHandler<ApplicationInputType>;
	Loader?: React.ComponentType;
}

export const ApplicationFormProvider: React.ComponentType<
	ApplicationFormProviderProps
> = (props) => {
	const propsRef = useRef(props);
	propsRef.current = props;

	const { id, children, onError, Loader } = props;

	const { data: application } = useApplication(id, {
		keepPreviousData: true,
	});

	const methods = useForm<ApplicationInputType>({
		resolver: zodResolver(Application),
		values: application,
		reValidateMode: 'onChange',
		mode: 'onTouched',
		resetOptions: {
			keepDefaultValues: true,
			keepTouched: true,
			keepErrors: true,
		},
	});

	const {
		defaultValues,
		submitCount,
		isDirty,
		isLoading,
		isValidating,
		isSubmitted,
		isSubmitting,
		isSubmitSuccessful,
		isValid,
		touchedFields,
		dirtyFields,
		errors,
	} = methods.formState;
	const formRef = useRef({});
	formRef.current = {
		defaultValues,
		submitCount,
		isDirty,
		isLoading,
		isValidating,
		isSubmitted,
		isSubmitting,
		isSubmitSuccessful,
		isValid,
		touchedFields,
		dirtyFields,
		errors,
	};

	const { mutateAsync: saveApplication } = useSaveApplication(id);

	const onSubmit: SubmitHandler<ApplicationInputType> = useCallback(
		async (data, event) => {
			const newData = await saveApplication(data);

			await new Promise((resolve) => {
				setTimeout(resolve, 1000);
			});

			if (propsRef.current.onSave) {
				propsRef.current.onSave(newData, event);
			}

			return newData;
		},
		[id, saveApplication, propsRef],
	);

	return (
		<FormProvider {...methods}>
			{isLoading && Loader ? (
				<Loader />
			) : (
				<form onSubmit={methods.handleSubmit(onSubmit, onError)}>
					{children}
				</form>
			)}
		</FormProvider>
	);
};
