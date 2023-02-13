export const prismTheme = {
	plain: {
		color: '#c3cee3',
		backgroundColor: '#263238',
	},
	styles: [
		{
			types: ['comment', 'doctype', 'prolog'],
			style: { color: '#546e7a' },
		},
		{
			types: ['cdata', 'char', 'inserted', 'property'],
			style: { color: '#80cbc4' },
		},
		{
			types: ['operator', 'punctuation'],
			style: { color: '#89ddff' },
		},
		{
			types: [
				'attr-value',
				'attribute',
				'pseudo-class',
				'pseudo-element',
				'string',
			],
			style: { color: '#c3e88d' },
		},
		{
			types: ['atrule', 'boolean', 'constant', 'function', 'symbol'],
			style: { color: '#c792ea' },
		},
		{
			types: ['keyword'],
			style: { color: '#c792ea', fontStyle: 'italic' },
		},
		{
			types: ['id', 'important'],
			style: { color: '#c792ea', fontWeight: 'bold' },
		},
		{
			types: ['deleted', 'entity', 'selector', 'tag', 'unit', 'variable'],
			style: { color: '#f07178' },
		},
		{
			types: ['class-name', 'color', 'hexcode', 'regex'],
			style: { color: '#f2ff00' },
		},
		{
			types: ['number', 'url'],
			style: {
				color: '#fd9170',
			},
		},
		{
			types: ['attr-name', 'builtin', 'class'],
			style: { color: '#ffcb6b' },
		},
	],
};
