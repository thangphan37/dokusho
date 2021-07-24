const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const chalk = require('chalk');
const pages = require('./pages.json')

const fromRoot = (...p) => path.join(__dirname, '..', '..', ...p)

function upperCaseFirstLetter(str) {
	return str.split("-").map(s => s[0].toLocaleUpperCase() + s.slice(1)).join("")
}

function generatePage() {
	pages.forEach(page => {
		if (page && page.url) {
			const pathArr = page.url.replace(/https:.*.com\//g, "").split("/")
			const directory = pathArr.slice(0, pathArr.length - 1).join("/")
			const fileName = pathArr[pathArr.length - 1]
			const destination = fromRoot(`src/pages/${directory}`)

			mkdirp.sync(destination)

			const filePath = path.join(destination, `${fileName}.tsx`)
			const componentName = upperCaseFirstLetter(fileName)

			if (fs.existsSync(filePath)) {
				console.log(chalk.red.bold(componentName) + chalk.red(` has created before.`))
			} else {
				const screenElement = `<h1 style={{ fontWeight: 'bold', color: 'green' }}>${page.screen}</h1>`
				const content = page.to ?
					`
					${screenElement}
					<Link href="/${page.to}">
						<a>
							Go to ${upperCaseFirstLetter(page.to)} page!
						</a>
					</Link>` : `
					 ${screenElement}
					 <p>${componentName}</p>
					`

				const contents = `
					import Link from "next/link"
		
					export default function ${componentName}() {
						return (
							<div>
								${content}
							</div>
						)
					}
				`

				fs.writeFileSync(filePath, contents)
				console.log(chalk.green(`${fileName}.tsx is created.`))
			}
		} else {
			console.log(chalk.red(` Can't handle with ${page} page. Please try again.`))
		}
	})
}

// auto generate pages in Next.js
generatePage()
