/* eslint-disable react/display-name */
import { getBlogData } from '../../lib/book'
import { Layout } from '../../components/layout'
import type { NextApiRequest } from 'next'
import Markdown from 'react-markdown'

export default function Book({ blog }: {
  blog: {
    content: string
  }
}) {
  return (
    <Layout>
      <Markdown components={{
        h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mt-6" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-3xl font-bold mt-6" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-2xl font-semibold mt-6" {...props} />,
        h4: ({ node, ...props }) => <h4 className="text-xl font-bold mt-6" {...props} />,
        h5: ({ node, ...props }) => <h5 className="text-lg font-bold mt-6" {...props} />,
        h6: ({ node, ...props }) => <h6 className="text-base font-bold mt-6" {...props} />,
        p: ({ node, ...props }) => <p className="text-lg mt-4 text-left" {...props} />,
        li: ({ ordered, children, ...props }) => <li className="text-lg mt-2" {...props}>👉 {children}</li>,
      }} className="dark:text-white">{blog.content}</Markdown>
    </Layout>
  )
}

export async function getServerSideProps({ params, req }: { params: { id: string }, req: NextApiRequest }) {
  const blog = await getBlogData(params.id, req.cookies.lang)
  return {
    props: {
      blog
    }
  }
}
