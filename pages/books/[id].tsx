/* eslint-disable react/display-name */
import {getBlogData} from '../../lib/book'
import {Layout} from '../../components/layout'
import type {NextApiRequest} from 'next'
import {getMDXComponent} from 'mdx-bundler/client'
import {BlogTypography, H1} from '../../components/typography'
import type {LangOptions} from '../../constants/lang'
import Head from 'next/head'
import * as React from 'react'

interface Frontmatter {
  title: string
  description: string
  slug?: string
}

export default function Book({
  blog: {code, frontmatter},
  lang,
}: {
  blog: {
    code: string
    frontmatter: Frontmatter
  }
  lang: LangOptions
}) {
  const Component = React.useMemo(() => getMDXComponent(code), [code])
  return (
    <Layout lang={lang}>
      <Head>
        <title>{frontmatter.title}</title>
      </Head>
      <H1> {frontmatter.title}</H1>
      <Component components={BlogTypography} />
    </Layout>
  )
}

export async function getServerSideProps({
  params,
  req,
}: {
  params: {id: string}
  req: NextApiRequest
}) {
  const blog = await getBlogData(params.id, req.cookies.lang as LangOptions)

  if (!blog) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      blog,
      lang: req.cookies.lang,
    },
  }
}
