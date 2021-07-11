import fs from 'fs'
import path from 'path'

const blogsDirectory = path.join(process.cwd(), 'contents')

function getAllBlogIds() {
	const blogNames = fs.readdirSync(blogsDirectory).map((blogName: string) => blogName)

	return blogNames.map((blogName: string) => {
		return {
			params: { id: blogName }
		}
	})
}

async function getBlogData(id: string, lang: string) {
	const blogPath = path.join(blogsDirectory, `${id}/${lang ?? 'en'}.mdx`)
	const content = fs.readFileSync(blogPath, 'utf-8')

	return {
		content
	}
}

export { getAllBlogIds, getBlogData }