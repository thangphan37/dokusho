import { Layout } from '../../../components/layout'
import { getMDXComponent } from 'mdx-bundler/client'
import { BlogTypography, H1 } from '../../../components/typography'
import { getAllBlogIds, getBlogData } from '../../../lib/book'
import Head from 'next/head'
import * as React from 'react'

type Frontmatter = {
	title: string
	description: string
	slug?: string
}

type BookProps = {
	blog: {
		code: string
		frontmatter: Frontmatter
	},
	bookId: string
	blogId: string
}

export default function Book({
	blog: { code, frontmatter },
	bookId,
	blogId
}: BookProps) {
	const Component = React.useMemo(() => getMDXComponent(code), [code])
	return (
		<Layout bookId={bookId} blogId={blogId}>
			<Head>
				<title>{frontmatter.title}</title>
			</Head>
			<H1> {frontmatter.title}</H1>
			<Component components={BlogTypography} />
		</Layout>
	)
}


export async function getStaticPaths() {
	const paths = await getAllBlogIds()
	return {
		paths,
		fallback: false
	}
}
export async function getStaticProps({ params }: { params: { book: string; id: string } }) {
	const { book: bookId, id: blogId } = params
	const blog = await getBlogData(bookId, blogId)
	return {
		props: {
			blog,
			bookId,
			blogId
		}
	}
}
