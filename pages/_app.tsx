import type { AppProps } from 'next/app'
import type { Colors } from '../constants/colors'
import { ThemeProvider } from '../context/theme-context'
import { COLORS } from '../constants/colors'
import Script from 'next/script'
import * as React from 'react'
import '../styles/globals.css'
import "react-toggle/style.css"

function MyApp({ Component, pageProps }: AppProps) {
  return <ThemeProvider>
    <Script strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: codeToRunOnClient
      }}>
    </Script>
    <Component {...pageProps} />
  </ThemeProvider >
}
export default MyApp

function loadColorMode() {
  function getInitialColorMode() {
    const theme = window.localStorage.getItem('theme');

    if (typeof theme == 'string') {
      return theme;
    }

    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const hasMediaQueryPreference = typeof mql.matches === 'boolean';

    if (hasMediaQueryPreference) {
      return mql.matches ? 'dark' : 'light';
    }
    return 'light';
  }
  const colorMode = getInitialColorMode();
  const root = document.documentElement;
  const fakeColors = '🌈'
  const colors = JSON.parse(fakeColors) as Colors
  root.classList.add(colorMode)
  // Object.entries(colors).forEach((color: [string, { light: string; dark: string; }]) => {
  //   const [name, colorByTheme] = color
  //   // const name = color[0]
  //   // const colorByTheme = color[1]
  //   console.log('name, colorByTheme', name, colorByTheme)
  //   root.style.setProperty(`--color-${name}`, colorByTheme[colorMode as 'light' | 'dark'])
  // })
}

const stringFnc = String(loadColorMode).replace(
  '🌈', JSON.stringify(COLORS))

const codeToRunOnClient = `(${stringFnc})()`