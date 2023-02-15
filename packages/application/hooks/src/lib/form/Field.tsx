import { useController } from 'react-hook-form';
import type { FieldPath } from 'react-hook-form';
import {
	ApplicationInputType,
	Application,
} from '@lellimecnar/application-service/schema';
import { Popover, Text } from '@mantine/core';
import styled from '@emotion/styled';
import get from 'lodash/get';
import memoize from 'lodash/memoize';

import { useApplicationForm } from './useApplicationForm';

export type FieldProps<T extends React.ComponentType<object>> = {
	name: FieldPath<ApplicationInputType>;
	component: T;
} & React.ComponentPropsWithRef<T>;

const ErrorDropdown = styled(Popover.Dropdown)`
	&,
	.mantine-Popover-arrow {
		border-color: red;
		color: red;
	}
`;

const findDef = memoize(
	(schema: any, name?: string): any => {
		if (name) {
			return findDef(
				get(
					schema,
					name.replace(/\.\d*/g, (m) => {
						if (m === '.') {
							return '.shape.';
						}

						return '.element';
					}),
				),
			);
		}

		if (schema?.schema) {
			return {
				...schema,
				schema: findDef(schema.schema),
			};
		}

		if (schema?._def) {
			return findDef(schema._def);
		}

		if (schema?.options) {
			return schema.options.map((option: any) => findDef(option));
		}

		return schema;
	},
	(schema, name) => name ?? schema,
);

export const Field = <T extends React.ComponentType>({
	name,
	component: Comp,
	...props
}: FieldProps<T>) => {
	const { control } = useApplicationForm();
	const { field, fieldState } = useController({
		control,
		name,
	});
	const schema = findDef(Application.shape, name);
	const label = schema?.description;

	return (
		<>
			{/* <Popover
				opened={!!fieldState.error}
				withArrow
				shadow="md"
				// offset={0}
				// position="top-start"
			>
				<Popover.Target> */}
			<Comp
				{...({ label, ...props, ...field } as any)}
				error={fieldState.error?.message}
			/>
			{/* </Popover.Target>
				<ErrorDropdown p={6}>
					<Text>{fieldState.error?.message}</Text>
				</ErrorDropdown>
			</Popover> */}
		</>
	);
};
