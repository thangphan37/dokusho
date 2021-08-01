import { Layout } from '../components/layout'
import { getAllBlogsData } from '../lib/book'
import { H2, Paragraph } from '../components/typography'
import type { LangOptions } from '../constants/lang'
import { Lang } from '../constants/lang'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { slugifyBlog } from '../utils/slugify'

type Book = {
  img: StaticImageData
  title: string
  description: string
  slug: string
}

type HomeProps = {
  blogs: Array<Book>
  lang: LangOptions
}

export default function Home({ blogs, lang }: HomeProps) {
  return (
    <Layout home={true}>
      <Head>
        <title>👨‍🏫 {lang === Lang.en ? 'Bookshelf' : 'Giá Sách'}</title>
        <meta
          name="description"
          content="Dokusho is a place where I can review the contents of the books in a brief format."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {blogs.map((book, index) => {
        return (
          <section
            className="mx-auto max-w-md sm:max-w-full shadow-2xl px-6 py-4 mt-4 rounded-sm dark:border dark:border-white"
            key={`book-item-${index}`}>
            <Link href={`/books/${index + 1}/${slugifyBlog(book.title)}`}>
              <a className="flex flex-col items-center sm:items-start sm:flex-row">
                <div className="sm:max-w-[150px]">
                  <Image
                    src={book.img}
                    alt={book.title}
                    layout="intrinsic"
                    width={257}
                    height={350}
                  />
                </div>
                <div className="mt-4 w-[257px] sm:mt-0 sm:px-4 sm:w-[560px] md:w-[672px]">
                  <H2 className="sm:text-2xl">{book.title}</H2>
                  <Paragraph className="text-gray-500 italic dark:text-white">
                    {book.description}
                  </Paragraph>
                </div>
              </a>
            </Link>
          </section>
        )
      })}
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = [
    { params: { id: Lang.en } },
    { params: { id: Lang.vi } }
  ]

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: { params: { id: LangOptions } }) {
  const blogs = await getAllBlogsData(params.id)
  return {
    props: {
      blogs,
      lang: params.id
    }
  }
}
