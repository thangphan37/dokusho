export interface Colors {
	[key: string]: {
		light: string
		dark: string
	}
}

export const COLORS: Colors = {
	text: {
		light: 'black',
		dark: 'white'
	},
	background: {
		light: 'white',
		dark: 'black'
	},
	border: {
		light: 'none',
		dark: 'white'
	}
}