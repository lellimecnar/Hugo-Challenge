import { useCallback, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
	Stepper,
	Group,
	Button,
	Paper,
	Container,
	LoadingOverlay,
} from '@mantine/core';
import {
	IconChevronLeft,
	IconChevronRight,
	IconId,
	IconCar,
	IconFriends,
} from '@tabler/icons-react';
import { useCounter, useLatest } from 'react-use';

import type { ApplicationIdType } from '@proj/application-service/schema';
import {
	useApplicationForm,
	useWatchApplicationField,
	useSaveApplication,
	useCalculateApplication,
} from '@proj/application-hooks';

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
	const prevStep = useCallback(() => dec(), [dec]);
	const nextStep = useCallback(async () => {
		setPaused(true);

		console.log(compRef.current.fields);
		if (await trigger(compRef.current.fields)) {
			inc();
		}

		await new Promise((resolve) => setTimeout(resolve, 500));

		setPaused(false);
	}, [inc, trigger, setPaused, compRef]);
	const lastStep = useCallback(async () => {
		const newData = await saveApplication(getValues());
		console.log({ newData });
		const calculatedData = await calculateApplication(newData._id);
		console.log({ calculatedData });

		reset(calculatedData);

		set(STEPS.length);
	}, [saveApplication, calculateApplication, getValues, set, reset]);

	const saveForLater = useCallback(async () => {
		setPaused(true);
		await saveApplication(getValues());

		router.push('/applications');
	}, [saveApplication, getValues, router.push, setPaused]);

	return (
		<Container>
			<LoadingOverlay visible={isLoading} />
			<Stepper active={activeStep} onStepClick={set} mih={300}>
				{STEPS.map(({ Comp, ...step }) => (
					<Stepper.Step {...step} key={step.label}>
						<Paper shadow="md" withBorder mih={250} p="lg" my="lg">
							<Comp />
						</Paper>
					</Stepper.Step>
				))}
				<Stepper.Completed>
					<Paper shadow="md" withBorder mih={250} p="lg" my="lg">
						<Complete />
					</Paper>
				</Stepper.Completed>
			</Stepper>
			{activeStep <= STEPS.length - 1 && (
				<Group position="apart" mt="xl" pt="md">
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
		</Container>
	);
};

export default ApplicationForm;
