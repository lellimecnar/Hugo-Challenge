import { useCallback, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Stepper, Group, Button, Paper, LoadingOverlay } from '@mantine/core';
import {
	IconChevronLeft,
	IconChevronRight,
	IconId,
	IconCar,
	IconFriends,
} from '@tabler/icons-react';
import { useCounter, useLatest } from 'react-use';

import type { ApplicationIdType } from '@lellimecnar/application-service/schema';
import {
	useApplicationForm,
	useWatchApplicationField,
	useSaveApplication,
	useCalculateApplication,
} from '@lellimecnar/application-hooks';

import Applicant from './Applicant';
import Vehicles from './Vehicles';
import CoApplicants from './CoApplicants';
import Complete from './Complete';

const STEPS = [
	{
		Comp: Applicant,
		label: 'Applicant Info',
		icon: <IconId />,
	},
	{
		Comp: Vehicles,
		label: 'Vehicles',
		icon: <IconCar />,
	},
	{
		Comp: CoApplicants,
		label: 'Co-Applicants',
		icon: <IconFriends />,
	},
];

interface ApplicationFormProps {
	id?: ApplicationIdType;
}

const ApplicationForm = ({ id }: ApplicationFormProps) => {
	const form = useApplicationForm();
	const {
		trigger,
		getValues,
		reset,
		formState: {
			isDirty,
			isValidating,
			isSubmitting,
			isSubmitSuccessful,
			isValid,
		},
	} = form;
	const [_id, completedAt] = useWatchApplicationField({
		name: ['_id', 'completedAt'],
	}) as [string, Date];

	const router = useRouter();
	const { mutateAsync: saveApplication } = useSaveApplication(_id ?? id);
	const { mutateAsync: calculateApplication } = useCalculateApplication();
	const [activeStep, { inc, dec, set }] = useCounter(0, STEPS.length + 1, 0);
	const compRef = useLatest(STEPS[activeStep]?.Comp);
	const isFirst = activeStep === 0;
	const isLast = activeStep === STEPS.length - 1;
	const [paused, setPaused] = useState(false);
	const isLoading = !!(
		(id && id !== _id) ||
		paused ||
		isSubmitting ||
		isSubmitSuccessful ||
		isValidating
	);

	useEffect(() => {
		if (completedAt) {
			set(STEPS.length);
		}
	}, [completedAt, set]);

	useEffect(() => {
		if (isSubmitting) {
			setPaused(true);
		}
	}, [isSubmitting, setPaused]);

	const validate = useCallback(
		async () => trigger(compRef.current.fields),
		[compRef],
	);
	const prevStep = useCallback(() => dec(), [dec]);
	const nextStep = useCallback(async () => {
		setPaused(true);

		if (await validate()) {
			inc();
		}

		await new Promise((resolve) => setTimeout(resolve, 500));

		setPaused(false);
	}, [inc, setPaused, validate]);
	const lastStep = useCallback(async () => {
		if (await trigger()) {
			const newData = await saveApplication(getValues());
			const calculatedData = await calculateApplication(newData._id);

			reset(calculatedData);

			set(STEPS.length);
		}
	}, [saveApplication, calculateApplication, getValues, set, reset, trigger]);

	const saveForLater = useCallback(async () => {
		try {
			await saveApplication(getValues());

			router.push('/applications');
		} catch (error) {
			trigger();
		}
	}, [saveApplication, getValues, router.push, setPaused, trigger]);

	return (
		<>
			<LoadingOverlay visible={isLoading} />
			<Stepper active={activeStep} mt="xl" pt="xl">
				{STEPS.map(({ Comp, ...step }) => (
					<Stepper.Step {...step} key={step.label}>
						<Paper>
							<Comp />
						</Paper>
					</Stepper.Step>
				))}
				<Stepper.Completed>
					<Paper>
						<Complete />
					</Paper>
				</Stepper.Completed>
			</Stepper>
			{activeStep <= STEPS.length - 1 && (
				<Group position="apart" mt="xl" pt="xs">
					<Group position="left">
						<Button
							variant="default"
							onClick={saveForLater}
							disabled={!isDirty}
							loading={isLoading}
						>
							Save and Finish Later
						</Button>
						<Button
							component={Link}
							href="/applications"
							variant="subtle"
							disabled={isLoading}
						>
							Cancel
						</Button>
					</Group>
					<Group position="right">
						{!isFirst && (
							<Button
								onClick={prevStep}
								variant="subtle"
								disabled={isLoading}
							>
								<IconChevronLeft />
								Back
							</Button>
						)}
						{isLast && !paused ? (
							<Button
								color="green"
								disabled={!isValid}
								onClick={lastStep}
								loading={isLoading}
							>
								Submit
							</Button>
						) : (
							<Button loading={isLoading} onClick={nextStep}>
								Next
								<IconChevronRight />
							</Button>
						)}
					</Group>
				</Group>
			)}
		</>
	);
};

export default ApplicationForm;
