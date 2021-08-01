
const jsToYaml = require('json-to-pretty-yaml')
const inquirer = require('inquirer')
const mkdirp = require('mkdirp')
const fs = require('fs')
const path = require('path')
const slugify = require('slugify')

function padLeft0(n) {
	return n.toString().padStart(2, '0')
}

function formatDate(d) {
	return `${d.getFullYear()}-${padLeft0(d.getMonth() + 1)}-${padLeft0(d.getDate())}`
}

function fromRoot(...args) {
	return path.join(__dirname, '..', '..', ...args)
}

function slugifyBlog(title) {
	return slugify(title, {
		replacement: '-',
		remove: /[*+~.()'"!:@]/g,
		lower: true,
		locale: 'vi',
		trim: true,
	})
}

function composeFrontmatter(title, slug) {
	return {
		img: `/${slug}.webp`,
		title,
		description: '',
		slug,
		date: formatDate(new Date())
	}
}

function writeFileBLog(blogPath, slug, blog) {
	fs.writeFileSync(fromRoot(`${blogPath}/${slug}.mdx`), blog)
}

function composeBlogContents(fontmatter) {
	return `---\n${jsToYaml.stringify(fontmatter)}---\n`
}

async function generateBlog() {
	const { titleEn, titleVi } = await inquirer.prompt(
		[
			{
				type: 'string',
				name: 'titleEn',
				message: 'Title in english:'
			},
			{
				type: 'string',
				name: 'titleVi',
				message: 'Title in vietnamese:'
			},
		]
	)
	const blogs = fs
		.readdirSync(fromRoot('contents'))

	const slugEn = slugifyBlog(titleEn)
	const slugVi = slugifyBlog(titleVi)
	const fontmatterEn = composeFrontmatter(slugEn, titleEn)
	const fontmatterVi = composeFrontmatter(slugVi, titleVi)
	const blogPath = `contents/${blogs.length + 1}`

	mkdirp.sync(fromRoot(`${blogPath}`))
	const blogEn = composeBlogContents(fontmatterEn)
	const blogVi = composeBlogContents(fontmatterVi)

	writeFileBLog(blogPath, slugEn, blogEn)
	writeFileBLog(blogPath, slugVi, blogVi)
}

generateBlog()