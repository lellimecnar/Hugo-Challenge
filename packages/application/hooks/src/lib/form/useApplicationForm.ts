import {
	useFormContext,
	useController,
	UseControllerProps,
	useFieldArray,
	FieldArrayPath,
	UseFieldArrayProps,
	useFormState,
	UseFormStateProps,
	useWatch,
	UseWatchProps,
} from 'react-hook-form';

import { ApplicationInputType } from '@proj/application-service/schema';

export const useApplicationForm = () => useFormContext<ApplicationInputType>();

export const useApplicationFormState = (
	props: Omit<UseFormStateProps<ApplicationInputType>, 'control'>,
) => {
	const { control } = useApplicationForm();

	return useFormState({ ...props, control });
};
export const useApplicationFieldController = (
	props: UseControllerProps<ApplicationInputType>,
) => {
	const { control } = useApplicationForm();

	return useController<ApplicationInputType>({
		...props,
		control,
	});
};

export const useApplicationFieldArray = (
	name: FieldArrayPath<ApplicationInputType>,
	options?: Omit<
		UseFieldArrayProps<ApplicationInputType>,
		'control' | 'name'
	>,
) => {
	const { control } = useApplicationForm();

	return useFieldArray({
		...options,
		control,
		name,
		shouldUnregister: false,
	});
};

export const useWatchApplicationField = (
	props?: Omit<UseWatchProps<ApplicationInputType>, 'control'>,
) => {
	const { control } = useApplicationForm();

	return useWatch<ApplicationInputType>({
		...props,
		control,
	} as any);
};
