import type {AppProps} from 'next/app'
import {ThemeProvider} from '../context/theme-context'
import Head from 'next/head'
import * as React from 'react'
import '../styles/globals.css'
import 'react-toggle/style.css'

function MyApp({Component, pageProps}: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
export default MyApp
