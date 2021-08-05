import {Layout} from '../components/layout'
import Head from 'next/head'

export default function Home() {
  return (
    <Layout home={true}>
      <Head>
        <title>Hello, Dokusho!️ 🤟</title>
        <meta
          name="description"
          content="Dokusho is a place where I can review the contents of the books in a brief format."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>Nothing here!😀</p>
    </Layout>
  )
}
