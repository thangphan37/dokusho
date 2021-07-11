import * as React from 'react'

type ThemeState = [
	string,
	(event: React.ChangeEvent<HTMLInputElement>) => void
]

const mode_types = {
	light: 'light',
	dark: 'dark'
}

const ThemeContext = React.createContext<ThemeState | null>(null)

function ThemeProvider({ children, key = 'theme' }: { children: React.ReactNode; key?: string }) {
	const [mode, setMode] = React.useState(() => {
		if (typeof window === 'undefined') {

			return ''
		}

		const valueInLocalStorage = window.localStorage.getItem(key)

		if (typeof valueInLocalStorage === 'string') {
			return valueInLocalStorage;
		}

		const mql = window.matchMedia('(prefers-color-scheme: dark)')
		const hasMediaQueryPreference = typeof mql.matches === 'boolean';

		if (hasMediaQueryPreference) {
			return mql.matches ? mode_types.dark : mode_types.light;
		}

		return mode_types.light;
	})

	const toggleMode = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => setMode(event.target.checked ? mode_types.dark : mode_types.light)
		, [setMode])

	React.useEffect(() => {
		const root = document.documentElement

		window.localStorage.setItem(key, mode)
		if (mode === mode_types.dark) {
			root.classList.add(mode_types.dark)
		} else {
			root.classList.remove(mode_types.dark)
		}
	}, [mode, key])

	const value: ThemeState = React.useMemo(() => ([mode, toggleMode]), [mode, toggleMode])
	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

function useTheme() {
	const context = React.useContext(ThemeContext)

	if (context === null) {
		throw new Error(`useTheme must be used within a <ThemeProvider />`)
	}

	return context
}

export { ThemeProvider, useTheme, mode_types }