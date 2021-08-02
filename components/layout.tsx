import { useTheme, mode_types } from '../context/theme-context'
import { Tabs, TabList, Tab } from '@reach/tabs'
import { useRouter } from 'next/router'
import { Rehydrate } from '../components/re-hydrate'
import type { LangOptions } from '../constants/lang'
import { Lang } from '../constants/lang'
import { blogSlugs } from '../constants/slugs'
import type { NextRouter } from 'next/router'
import Toggle from 'react-toggle'
import clsx from 'clsx'
import * as React from 'react'

function composeUrl(location: string, lang: LangOptions) {
  const url = new URL(location)
  url.searchParams.set('lang', lang)

  return url
}

function replaceUrl(url: string, lang: LangOptions, router: NextRouter) {
  const newUrl = composeUrl(url, lang)
  router.replace(newUrl)
}

function Layout({
  children,
  home,
  lang,
  bookId,
  blogId
}: {
  children: React.ReactNode
  home?: boolean
  lang?: keyof typeof Lang
  bookId?: string
  blogId?: string
}) {
  const [mode, toggleMode] = useTheme()
  const router = useRouter()

  async function handleChangeLang(index: number) {
    const newLang = index === 0 ? Lang.en : Lang.vi

    if (home) {
      router.replace(newLang)
    } else {
      if (bookId) {
        const newBlogId = blogSlugs[parseInt(bookId) - 1].find(f => f !== blogId)
        router.replace(`/books/${bookId}/${newBlogId}`)
      }
    }
  }

  return (
    <div>
      <main className={clsx('transition ease duration-200')}>
        <div
          className={clsx(
            'mx-auto sm:max-w-2xl py-4',
            { 'max-w-3xl 2xl:max-w-5xl px-4': home },
            { 'max-w-xl px-12': !home },
          )}>
          <div className="flex justify-end pt-4 h-10">
            <Rehydrate>
              <Toggle
                checked={mode === mode_types.dark}
                icons={{
                  checked: (
                    <span className="w-2.5 h-2.5 flex items-center justify-center">
                      🌜
                    </span>
                  ),
                  unchecked: (
                    <span className="w-2.5 h-2.5 flex items-center justify-center">
                      🌞
                    </span>
                  ),
                }}
                onChange={toggleMode}
              />
            </Rehydrate>
          </div>
          <Tabs onChange={handleChangeLang}>
            <TabList>
              <Tab className="text-sm text-white bg-green-500 px-2 py-1 mr-2 rounded-sm focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition ease-in-out duration-300">
                En
              </Tab>
              {/* <Tab className="text-sm text-white bg-indigo-500 px-2 py-1 mr-2 rounded-sm focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-300">Jp</Tab> */}
              <Tab className="text-sm text-white bg-red-500 px-2 py-1 mr-2 rounded-sm focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition ease-in-out duration-300">
                Vi
              </Tab>
            </TabList>
          </Tabs>
          {!home ? (
            <button
              onClick={() => router.back()}
              className="text-3xl mt-4 rounded-sm transform duration-300 ease-in-out hover:scale-150">
              👈
            </button>
          ) : null}
          <section>{children}</section>
        </div>
      </main>
    </div>
  )
}

export { Layout }