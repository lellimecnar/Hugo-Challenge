import React from 'react';
import { MantineTheme } from '@mantine/core';
import { IconCalendar } from '@tabler/icons-react';
import Link from 'next/link';

import { prismTheme } from './prism';

//  shadow="md" withBorder mih={250} p="lg" my="lg"

export const mantineTheme: Partial<MantineTheme> = {
	black: '#333',
	globalStyles: (theme) => ({
		body: {
			backgroundColor: {
				light: theme.colors.gray[0],
				dark: theme.colors.gray[7],
			}[theme.colorScheme],
		},
	}),
	components: {
		AppShell: {
			defaultProps: {
				padding: 'md',
			},
		},
		Header: {
			styles: (theme) => ({
				root: {
					backgroundColor: theme.colors.blue[6],
					color: theme.white,
				},
			}),
			defaultProps: {
				p: 'xs',
			},
		},
		Navbar: {
			defaultProps: {
				width: { base: 300 },
				height: 500,
				p: 'md',
				//width={{ base: 300 }} height={500} p="xs"
			},
		},
		Paper: {
			defaultProps: {
				shadow: 'sm',
				withBorder: true,
				mih: 250,
				p: 'lg',
				my: 'lg',
			},
		},
		Title: {
			defaultProps: {
				m: 0,
			},
		},
		Prism: {
			defaultProps: {
				noCopy: true,
				getPrismTheme: () => prismTheme,
			},
		},
		DatePicker: {
			defaultProps: {
				focusable: true,
				hideOutsideDates: true,
				icon: React.createElement(IconCalendar),
			},
		},
		Badge: {
			defaultProps: {
				variant: 'outline',
				size: 'xs',
			},
		},
		Table: {
			styles: {
				root: {
					whiteSpace: 'nowrap',
				},
			},
			defaultProps: {
				horizontalSpacing: 'xs',
				verticalSpacing: 'xs',
			},
		},
		Input: {
			defaultProps: {
				variant: 'filled',
				shadow: 'xs',
				withOutline: true,
			},
		},
		TextInput: {
			defaultProps: {
				required: true,
				withAsterisk: true,
			},
		},
		Grid: {
			defaultProps: {
				gutter: 'lg',
			},
		},
		Group: {
			defaultProps: {
				spacing: 'lg',
			},
		},
		Stepper: {
			defaultProps: {
				mih: 300,
				allowNextStepsSelect: false,
			},
		},
		Space: {
			defaultProps: {
				// h: 'xl',
			},
		},
		Loader: {
			defaultProps: {
				size: 'xl',
				variant: 'dots',
			},
		},
		Alert: {
			defaultProps: {
				variant: 'outline',
			},
		},
		ActionIcon: {
			defaultProps: {
				variant: 'subtle',
			},
		},
		Anchor: {
			defaultProps: {
				component: Link,
			},
		},
		Button: {
			defaultProps: {},
		},
	},
};
