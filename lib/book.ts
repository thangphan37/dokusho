import { bundleMDX } from 'mdx-bundler'
import type { LangOptions } from '../constants/lang'
import { Lang } from '../constants/lang'
import path from 'path'
import fs from 'fs'

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
const blogsDirectory = path.join(process.cwd(), 'contents')
type PathsBlog = Array<{
	params: {
		book: string;
		id: string
	}
}>

function getAllBlogIds() {
	const pathsBlog: PathsBlog = []
	const blogNames = fs
		.readdirSync(blogsDirectory)
		.map((blogName: string) => blogName)

	blogNames.forEach((blogName: string) => {
		const pathBlog = fs.readdirSync(`${blogsDirectory}/${blogName}`).map((f: string) => ({
			params: { book: blogName, id: f.replace('.mdx', '') },
		}))

		pathsBlog.push(...pathBlog)
	})
	return pathsBlog
}

async function getBlogData(book: string, id: string) {
	const blogPath = path.join(
		blogsDirectory,
		`${book}/${id}.mdx`,
	)
	const content = fs.readFileSync(blogPath, 'utf-8')
	const { code, frontmatter } = await bundleMDX(content)

	return {
		code,
		frontmatter,
	}
}


async function getAllBlogsData(lang: LangOptions) {
	const blogNames = fs.readdirSync(blogsDirectory)
	return await Promise.all(
		blogNames.map(async (blogName) => {
			const blogFiles = fs.readdirSync(`${blogsDirectory}/${blogName}`).map((f: string) => f)
			const blogFile = lang === Lang.en ? blogFiles[0] : blogFiles[1]
			return await getFrontmatter(`${blogName}/${blogFile}`)
		}),
	)
}


async function getFrontmatter(blogName: string) {
	const blogPath = path.join(
		blogsDirectory,
		blogName,
	)
	const content = fs.readFileSync(blogPath, 'utf-8')
	const { frontmatter } = await bundleMDX(content, {
		cwd: `${process.cwd()}/public`,
	})

	return frontmatter
}

async function getOppositeId(bookId: string, id: string) {
	const blogNames = fs.readdirSync(blogsDirectory)
	const blogName = blogNames[parseInt(bookId)]
	const blogFiles = fs.readdirSync(`${blogsDirectory}/${blogName}`).map((f: string) => f).find((f: string) => f !== id)

	return blogFiles
}

export { getAllBlogIds, getBlogData, getAllBlogsData, getOppositeId }