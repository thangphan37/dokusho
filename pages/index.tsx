import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Concentration from '../public/concentration.jpg'
import TheCourageToBeDisliked from '../public/the-courage-to-be-disliked.jpg'
interface Book {
  img: StaticImageData
  title: string
  description: string
  slug: string
}

const books: Book[] = [
  {
    img: Concentration,
    title: 'How To Increase Concentration.',
    description:
      'Sometimes I can not focus to do one thing. I feel struggle. But after meet this books I think my concentrations is improved. Thanks a lot.',
    slug: 'how-to-increase-concentration',
  },
  {
    img: TheCourageToBeDisliked,
    title: 'The Courage To Be Disliked',
    description:
      'Sometimes I can not focus to do one thing. I feel struggle. But after meet this books I think my concentrations is improved. Thanks a lot.',
    slug: 'the-courage-to-be-dislike',
  },
]
export default function Home() {
  return (
    <div>
      <Head>
        <title>Hello, Thang Phan!️ 🤟</title>
        <meta
          name="description"
          content="Dokusho is a place where I can review the contents of the books in a brief format."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className="px-4 py-4">
          {books.map((book, index) => {
            return (
              <section
                className="shadow-2xl px-6 py-4 mt-4 max-w-3xl mx-auto 2xl:max-w-5xl rounded-sm"
                key={`book-item-${index}`}
              >
                <Link href={`/books/${book.slug}`}>
                  <a className="flex flex-col sm:flex-row">
                    <div>
                      <Image src={book.img} alt={book.title} />
                    </div>
                    <div className="mt-6 sm:px-4">
                      <h2 className="text-2xl font-bold text-gray-700">
                        {book.title}
                      </h2>
                      <p className="mt-4 text-gray-500 italic">
                        {book.description}
                      </p>
                    </div>
                  </a>
                </Link>
              </section>
            )
          })}
        </section>
      </main>
    </div>
  )
}
