import { useCallback, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
	Stepper,
	Group,
	Button,
	Space,
	Paper,
	Divider,
	Container,
	LoadingOverlay,
} from '@mantine/core';
import {
	IconChevronLeft,
	IconChevronRight,
	IconFileUpload,
} from '@tabler/icons-react';
import { useCounter } from 'react-use';

import type { ApplicationIdType } from '@proj/application-service/schema';
import {
	useApplicationForm,
	useWatchApplicationField,
	useCreateApplication,
} from '@proj/application-hooks';

import Applicant from './Applicant';
import Vehicles from './Vehicles';
import CoApplicants from './CoApplicants';
import Complete from './Complete';

const STEPS = [
	{
		Comp: Applicant,
		label: 'Applicant Info',
	},
	{
		Comp: Vehicles,
		label: 'Vehicles',
	},
	{
		Comp: CoApplicants,
		label: 'Co-Applicants',
	},
];

interface ApplicationFormProps {
	id?: ApplicationIdType;
}

const ApplicationForm = ({ id }: ApplicationFormProps) => {
	const {
		trigger,
		getValues,
		formState: {
			isValid,
			isSubmitting,
			isSubmitSuccessful,
			isValidating,
			isDirty,
		},
	} = useApplicationForm();
	const router = useRouter();
	const { mutateAsync: createApplication } = useCreateApplication();
	const [activeStep, { inc, dec, set }] = useCounter(0, STEPS.length + 1, 0);
	const isFirst = activeStep === 0;
	const isLast = activeStep === STEPS.length - 1;
	const [paused, setPaused] = useState(false);
	const [_id, completedAt] = useWatchApplicationField({
		name: ['_id', 'completedAt'],
	}) as [string, Date];

	useEffect(() => {
		if (id && id === _id && completedAt) {
			set(STEPS.length);
		}
	}, [_id, id, completedAt]);
	useEffect(() => {
		if (isSubmitSuccessful) {
			inc();
		}
	}, [isSubmitSuccessful, inc]);
	useEffect(() => {
		if (isSubmitting) {
			setPaused(true);
		}
	}, [isSubmitting, setPaused]);
	const prevStep = useCallback(() => dec(), [dec]);
	const nextStep = useCallback(
		() =>
			trigger().then((result) => {
				if (result) {
					setPaused(true);
					inc();
					setTimeout(() => setPaused(false), 500);
				}
			}),
		[inc, trigger, setPaused],
	);
	const saveForLater = useCallback(async () => {
		await createApplication(getValues());
		router.push('/applications');
	}, [createApplication, getValues, router.push]);

	return (
		<Container>
			<LoadingOverlay visible={!!(id && _id !== id)} />
			<Stepper active={activeStep} onStepClick={set} mih={300}>
				{STEPS.map(({ Comp, ...step }) => (
					<Stepper.Step {...step} key={step.label}>
						<Paper shadow="md" p={0} withBorder>
							<Container mih={250} p="lg" m="lg" maw="100%">
								<Comp />
							</Container>
							<Divider mt="xl" />
							<Group
								mt="md"
								position="apart"
								px="lg"
								py="xs"
								mx="lg"
								my="xs"
							>
								<Group position="left">
									<Button
										variant="default"
										onClick={saveForLater}
										disabled={!isDirty}
									>
										Save and Finish Later
									</Button>
									<Button
										component={Link}
										href="/applications"
										variant="subtle"
									>
										Cancel
									</Button>
								</Group>
								<Group position="right">
									{!isFirst && (
										<Button
											onClick={prevStep}
											variant="subtle"
										>
											<IconChevronLeft />
											Back
										</Button>
									)}
									<Button
										type={isLast ? 'submit' : undefined}
										color={isLast ? 'green' : undefined}
										disabled={
											!isValid ||
											paused ||
											isSubmitting ||
											isSubmitSuccessful ||
											isValidating
										}
										loading={
											isSubmitting ||
											paused ||
											isSubmitSuccessful ||
											isValidating
										}
										onClick={isLast ? undefined : nextStep}
									>
										{isLast ? (
											<>
												Submit
												<Space w="sm" />
												<IconFileUpload />
											</>
										) : (
											<>
												Next
												<IconChevronRight />
											</>
										)}
									</Button>
								</Group>
							</Group>
						</Paper>
					</Stepper.Step>
				))}
				<Stepper.Completed>
					<Complete />
				</Stepper.Completed>
			</Stepper>
		</Container>
	);
};

export default ApplicationForm;
