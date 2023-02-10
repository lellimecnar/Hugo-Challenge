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
} from 'react-hook-form';

import { ApplicationInputType } from '@proj/application-service/schema';

export const useApplicationForm = () => useFormContext<ApplicationInputType>();

export const useApplicationFormState = (
	props?: Omit<UseFormStateProps<ApplicationInputType>, 'control'>,
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

export const useWatchApplicationField = ((props: object) => {
	const { control } = useApplicationForm();

	return useWatch({
		...props,
		control,
	});
	// The UseWatchProps type doesn't actually match the type(s) from the actual useWatch function
}) as typeof useWatch<ApplicationInputType>;
