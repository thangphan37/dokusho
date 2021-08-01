import slugify from 'slugify'

export function slugifyBlog(title: string) {
  return slugify(title, {
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    locale: 'vi',
    trim: true,
  })
}