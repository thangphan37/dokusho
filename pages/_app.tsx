import type { AppProps } from 'next/app'
import { ThemeProvider } from '../context/theme-context'
import Script from 'next/script'
import * as React from 'react'
import '../styles/globals.css'
import "react-toggle/style.css"

function MyApp({ Component, pageProps }: AppProps) {
  return <ThemeProvider>
    <Script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} strategy="afterInteractive" />
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
  root.classList.add(colorMode)
}

const stringFnc = String(loadColorMode)
const codeToRunOnClient = `(${stringFnc})()`