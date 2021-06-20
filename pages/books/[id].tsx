import Image from 'next/image'
import {useRouter} from 'next/router'

export default function Book() {
  const router = useRouter()
  return (
    <div className="px-4 py-4 max-w-xl mx-auto md:max-w-4xl">
      <Image
        src={`/${router.query.id}.png`}
        alt="How To Increase Concentration"
        placeholder="blur"
        blurDataURL="/book-placeholder.svg"
        width={896}
        height={768}
      />
    </div>
  )
}
