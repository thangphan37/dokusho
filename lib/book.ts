import { bundleMDX } from 'mdx-bundler'
import type { LangOptions } from '../constants/lang'
import { Lang } from '../constants/lang'
import path from 'path'
import fs from 'fs'

// need to rename in here
export type BlogPath = {
  params: { book: string; id: string }
}

type BlogPaths = Array<BlogPath>
const contentsDirectory = path.join(process.cwd(), 'contents')

function getAllBlogIds() {
  const blogPaths: BlogPaths = []
  const directories = fs
    .readdirSync(contentsDirectory)
    .map((blogName: string) => blogName)

  directories.forEach((directory: string) => {
    const pathBlog = fs
      .readdirSync(`${contentsDirectory}/${directory}`)
      .filter((f: string) => f.includes('.mdx'))
      .map((f: string) => ({
        params: { book: directory, id: f.replace(/\.mdx/, '') },
      }))

    blogPaths.push(...pathBlog)
  })
  return blogPaths
}

async function getBlogData(book: string, id: string) {
  const { code, frontmatter } = await getFrontmatter(book, `${id}.mdx`)
  return {
    code,
    frontmatter,
    bookId: book,
    blogId: id,
  }
}

async function getAllBlogsData(lang: LangOptions) {
  const blogDirectories = fs.readdirSync(contentsDirectory)

  return await Promise.all(
    blogDirectories.map(async (directory) => {
      const [enBlog, viBlog] = fs
        .readdirSync(`${contentsDirectory}/${directory}`)
        .filter((f: string) => f.includes('.mdx'))
      const blogFile = lang === Lang.en ? enBlog : viBlog

      return (await getFrontmatter(directory, blogFile)).frontmatter
    }),
  )
}

async function getFrontmatter(directory: string, file: string) {
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'esbuild.exe',
    )
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'bin',
      'esbuild',
    )
  }

  const blogPath = path.join(contentsDirectory, `${directory}/${file}`)
  const content = fs.readFileSync(blogPath, 'utf-8')

  return await bundleMDX(content, {})
}

export { getAllBlogIds, getBlogData, getAllBlogsData }
