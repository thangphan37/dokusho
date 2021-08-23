import { Layout } from '@/components/layout'
import { getMDXComponent } from 'mdx-bundler/client'
import { components, H1 } from '@/components/components'
import { getAllBlogIds, getBlogData } from '@/lib/book'
import type { BlogPath } from '@/lib/book'
import Head from 'next/head'
import * as React from 'react'

type Frontmatter = {
  img: string
  title: string
  description: string
  slug?: string
}

type BookProps = {
  blog: {
    code: string
    bookId: string
    blogId: string
    frontmatter: Frontmatter
  }
}

export default function Book({
  blog: { code, bookId, frontmatter, blogId },
}: BookProps) {
  const Component = React.useMemo(() => getMDXComponent(code), [code])
  return (
    <Layout bookId={bookId} blogId={blogId}>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <meta
          property="og:url"
          content="http://www.nytimes.com/2015/02/19/arts/international/when-great-minds-dont-think-alike.html"
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta
          property="og:image"
          content={`https://res.cloudinary.com/dokusho${frontmatter.img}`}
        />
      </Head>
      <H1> {frontmatter.title}</H1>
      <Component components={{ ...components }} />
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = await getAllBlogIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: BlogPath) {
  const { book, id } = params
  const blog = await getBlogData(book, id)
  return {
    props: {
      blog,
    },
  }
}
