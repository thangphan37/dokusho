import {bundleMDX} from 'mdx-bundler'
import type {LangOptions} from '../constants/lang'
import {Lang} from '../constants/lang'
import path from 'path'
import fs from 'fs'

export type BlogParams = {
  params: {
    book: string
    id: string
  }
}

const contentsDirectory = path.join(process.cwd(), 'contents')

function getAllBlogIds() {
  const blogParams: Array<BlogParams> = []
  const directories = fs
    .readdirSync(contentsDirectory)
    .map((blogName: string) => blogName)

  directories.forEach((directory: string) => {
    const blogParam = fs
      .readdirSync(`${contentsDirectory}/${directory}`)
      .map((f: string) => ({
        params: {book: directory, id: f.replace(/\.mdx/, '')},
      }))

    blogParams.push(...blogParam)
  })
  return blogParams
}

async function getBlogData(book: string, id: string) {
  const {code, frontmatter} = await getFrontmatter(book, id)
  const secondId = fs
    .readdirSync(`${contentsDirectory}/${book}`)
    .find((f: string) => f.replace(/\.mdx/, '') !== id)
    ?.replace(/\.mdx/, '')
  const secondLang = frontmatter.lang === Lang.en ? Lang.vi : Lang.en
  const blogIds = {
    [frontmatter.lang]: id,
    [secondLang]: secondId,
  }
  return {
    code,
    frontmatter,
    blogIds,
  }
}

async function getAllBlogsData(lang: LangOptions) {
  const blogDirectories = fs.readdirSync(contentsDirectory)

  return await Promise.all(
    blogDirectories.map(async (directory) => {
      const [enBlog, viBlog] = fs.readdirSync(
        `${contentsDirectory}/${directory}`,
      )
      const blogFile = lang === Lang.en ? enBlog : viBlog

      return (await getFrontmatter(directory, blogFile.replace(/\.mdx/, '')))
        .frontmatter
    }),
  )
}

async function getFrontmatter(directory: string, id: string) {
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

  const blogPath = path.join(contentsDirectory, `${directory}/${id}.mdx`)
  const content = fs.readFileSync(blogPath, 'utf-8')

  return await bundleMDX(content, {})
}

export {getAllBlogIds, getBlogData, getAllBlogsData}
