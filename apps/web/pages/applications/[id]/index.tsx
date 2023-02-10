import { useRouter } from 'next/router';
import { Prism } from '@mantine/prism';
import { useApplication } from '@proj/application-hooks';

export function Id() {
	const {
		query: { id },
	} = useRouter();
	const { data: application } = useApplication(id as string);

	return (
		<div>
			<h1>Application Detail</h1>
			{application && (
				<Prism language="json" noCopy>
					{JSON.stringify(application, null, '    ')}
				</Prism>
			)}
		</div>
	);
}

export default Id;
