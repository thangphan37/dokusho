import { bundleMDX } from 'mdx-bundler'
import type { LangOptions } from '../constants/lang'
import { Lang } from '../constants/lang'
import path from 'path'
import fs from 'fs'

const blogsDirectory = path.join(process.cwd(), 'contents')

function getAllBlogIds() {
  const blogNames = fs
    .readdirSync(blogsDirectory)
    .map((blogName: string) => blogName)

  return blogNames.map((blogName: string) => {
    return {
      params: { id: blogName },
    }
  })
}

async function getBlogData(id: string, langQuery: LangOptions) {
  const lang = langQuery ?? Lang.en
  const blogSlugs = await getAllBlogsSlug()
  console.log('blogSlugs', blogSlugs)
  const originalId = blogSlugs.find(
    (bs: { en: string; vi: string }) => bs[lang] === id,
  )

  if (!originalId) {
    return
  }
  const blogPath = path.join(
    blogsDirectory,
    `${originalId[Lang.en]}/${lang}.mdx`,
  )
  const content = fs.readFileSync(blogPath, 'utf-8')
  const { code, frontmatter } = await bundleMDX(content)

  return {
    code,
    frontmatter,
  }
}

async function getAllBlogsData(langQuery?: LangOptions) {
  const lang = langQuery !== Lang.en && langQuery !== Lang.vi ? Lang.en : langQuery
  const blogNames = fs.readdirSync(blogsDirectory)
  return await Promise.all(
    blogNames.map(async (blogName) => {
      return await getFrontmatter(blogName, lang)
    }),
  )
}

async function getAllBlogsSlug() {
  const blogNames = fs.readdirSync(blogsDirectory)
  const blogName = blogNames.find(blogName => blogName)
  return await Promise.all(
    blogNames.map(async (blogName) => {
      const slug = {} as { en: string; vi: string };

      await Promise.all(
        [Lang.en, Lang.vi].map(async (lang: LangOptions) => {
          const frontmatter = await getFrontmatter(blogName, lang)
          slug[lang] = frontmatter.slug
        })
      )
      return slug
    }),
  )
}

async function getFrontmatter(blogName: string, lang: LangOptions) {
  const blogPath = path.join(
    blogsDirectory,
    blogName,
    `${lang}.mdx`,
  )
  const content = fs.readFileSync(blogPath, 'utf-8')
  const { frontmatter } = await bundleMDX(content, {
    cwd: `${process.cwd()}/public`,
  })

  return frontmatter
}

export { getAllBlogIds, getAllBlogsData, getBlogData, getAllBlogsSlug }