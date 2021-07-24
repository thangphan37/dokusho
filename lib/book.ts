import {bundleMDX} from 'mdx-bundler'
import {blogSlugs} from '../constants/slugs'
import type {LangOptions} from '../constants/lang'
import path from 'path'
import fs from 'fs'

const blogsDirectory = path.join(process.cwd(), 'contents')

function getAllBlogIds() {
  const blogNames = fs
    .readdirSync(blogsDirectory)
    .map((blogName: string) => blogName)

  return blogNames.map((blogName: string) => {
    return {
      params: {id: blogName},
    }
  })
}

async function getBlogData(id: string, lang: LangOptions) {
  const originalId = blogSlugs.find(
    (bs: {en: string; vi: string}) => bs[lang] === id,
  )

  if (!originalId) {
    return
  }
  const blogPath = path.join(
    blogsDirectory,
    `${originalId['en']}/${lang ?? 'en'}.mdx`,
  )
  const content = fs.readFileSync(blogPath, 'utf-8')
  const {code, frontmatter} = await bundleMDX(content)

  return {
    code,
    frontmatter,
  }
}

async function getAllBlogsData(lang: LangOptions | undefined) {
  const blogNames = fs.readdirSync(blogsDirectory)
  return await Promise.all(
    blogNames.map(async (blogName) => {
      const blogPath = path.join(
        blogsDirectory,
        blogName,
        `${lang ?? 'en'}.mdx`,
      )
      const content = fs.readFileSync(blogPath, 'utf-8')
      const {frontmatter} = await bundleMDX(content, {
        cwd: '/Users/thang.phan/Desktop/code/dokusho/public',
      })
      return frontmatter
    }),
  )
}

export {getAllBlogIds, getAllBlogsData, getBlogData}
