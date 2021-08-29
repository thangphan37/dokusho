import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return {...initialProps}
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <script dangerouslySetInnerHTML={{__html: codeToRunOnClient}} />
        </Head>
        <body className="dark:bg-gray-800">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

function loadColorMode() {
  function getInitialColorMode() {
    const theme = window.localStorage.getItem('theme')

    if (typeof theme == 'string') {
      return theme
    }

    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const hasMediaQueryPreference = typeof mql.matches === 'boolean'

    if (hasMediaQueryPreference) {
      return mql.matches ? 'dark' : 'light'
    }
    return 'light'
  }
  const colorMode = getInitialColorMode()
  const root = document.documentElement
  root.classList.add(colorMode)
}

const stringFnc = String(loadColorMode)
const codeToRunOnClient = `(${stringFnc})()`
