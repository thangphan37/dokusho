import {Layout} from '@/components/layout'
import {getMDXComponent} from 'mdx-bundler/client'
import {components, H1} from '@/components/components'
import {getAllBlogIds, getBlogData} from '@/lib/blog'
import type {BlogParams} from '@/lib/blog'
import type {BlogIds} from '@/components/layout'
import Head from 'next/head'
import * as React from 'react'

type Frontmatter = {
  img: string
  title: string
  description: string
  slug?: string
}

type BlogProps = {
  blog: {
    code: string
    blogIds: BlogIds
    frontmatter: Frontmatter
  }
  bookId: string
}

export default function Blog({
  blog: {code, frontmatter, blogIds},
  bookId,
}: BlogProps) {
  const Component = React.useMemo(() => getMDXComponent(code), [code])

  return (
    <Layout blogIds={blogIds}>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <meta
          property="og:url"
          content={`https://my-dokusho/books/${bookId}/${frontmatter.slug}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description} />
        <meta
          property="og:image"
          content={`https://res.cloudinary.com/dokusho/books/${bookId}${frontmatter.img}`}
        />
      </Head>
      <H1>{frontmatter.title}</H1>
      <Component components={{...components}} />
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

export async function getStaticProps({params}: BlogParams) {
  const {book: bookId, id} = params
  const blog = await getBlogData(bookId, id)
  return {
    props: {
      blog,
      bookId,
    },
  }
}
