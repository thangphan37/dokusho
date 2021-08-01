/* eslint-disable react/display-name */
import clsx from 'clsx'
import * as React from 'react'
import { ArrowRight } from './icons/arrow-icons'
import { AnchorIcon } from './icons/anchor-icon'
import { slugifyBlog } from '../utils/slugify'
interface TitleProps {
  children?: React.ReactNode
  className?: string
}

const fontSizes = {
  h1: 'text-4xl',
  h2: 'text-3xl',
  h3: 'text-2xl',
  h4: 'text-xl',
  h5: 'text-lg',
  h6: 'text-base',
}

function H1(props: TitleProps) {
  return <Tag title="h1" {...props} className="mb-6" />
}

function H2(props: TitleProps) {
  return <Tag title="h2" {...props} />
}

function H3(props: TitleProps) {
  return <Tag title="h3" {...props} />
}

function H4(props: TitleProps) {
  return <Tag title="h4" {...props} />
}

function H5(props: TitleProps) {
  return <Tag title="h5" {...props} />
}

function H6(props: TitleProps) {
  return <Tag title="h6" {...props} as="div" />
}

function Tag({
  as,
  title = 'h6',
  children,
  className,
}: TitleProps & {
  as?: React.ElementType
  title: keyof typeof fontSizes
}) {
  const Tag = as ?? title

  return (
    <Tag
      className={clsx(
        'relative font-bold dark:text-yellow-300 text-blue-800',
        fontSizes[title],
        className,
      )}>
      {children}
    </Tag>
  )
}

function Paragraph({
  as = 'p',
  className,
  ...props
}: {
  as?: React.ElementType
  className?: string
  children?: React.ReactNode
}) {
  return React.createElement(as, {
    className: clsx('mt-4 text-left dark:text-white', className),
    ...props,
  })
}

function ListItem({
  as = 'li',
  className,
  children,
  ...props
}: {
  as?: React.ElementType
  className?: string
  children?: React.ReactNode
}) {
  return (
    <li
      className={clsx(
        'flex items-center text-lg mt-2 dark:text-white',
        className,
      )}
      {...props}>
      <div>
        <ArrowRight />
      </div>
      <div>{children}</div>
    </li>
  )
}

function EmphasizeText({
  as = 'em',
  className,
  ...props
}: {
  as?: React.ElementType
  className?: string
  children?: React.ReactNode
}) {
  return React.createElement(as, {
    className: clsx(
      'font-emphasize not-italic tracking-[-0.25px] text-lg mt-4 text-left dark:text-green-500 text-indigo-700',
      className,
    ),
    ...props,
  })
}

function Code({
  as = 'code',
  className,
  ...props
}: {
  as?: React.ElementType
  className?: string
  children?: React.ReactNode
}) {
  return React.createElement(as, {
    className: clsx(
      'font-sans px-2 rounded-sm dark:bg-gray-500 dark:text-white bg-gray-200 text-black',
      className,
    ),
    ...props,
  })
}

function AnchorLink({ children }: { children: React.ReactElement }) {
  const subChildren = children.props.children
  const id = slugifyBlog(
    Array.isArray(subChildren)
      ? subChildren
        .map((c: React.ReactElement) => c.props?.children ?? c)
        .join('')
      : subChildren,
  )
  return (
    <>
      {React.cloneElement(children, {
        className: clsx(children.props?.className, 'group'),
        children: (
          <>
            <a
              className="absolute translate-x-[-150%] opacity-0 hover:cursor-pointer hover:opacity-100 group-hover:opacity-100 transform ease duration-200"
              aria-hidden="true"
              href={`#${id}`}
              id={id}>
              <AnchorIcon />
            </a>
            {subChildren}
          </>
        ),
      })}
    </>
  )
}

const BlogTypography = {
  h1: ({ ...props }) => <H1 {...props} className="mt-6" />,
  h2: ({ ...props }) => (
    <AnchorLink>
      <H2 {...props} className="mt-6" />
    </AnchorLink>
  ),
  h3: ({ ...props }) => (
    <AnchorLink>
      <H3 {...props} className="mt-6" />
    </AnchorLink>
  ),
  h4: ({ ...props }) => (
    <AnchorLink>
      <H4 {...props} className="mt-6" />
    </AnchorLink>
  ),
  h5: ({ ...props }) => (
    <AnchorLink>
      <H5 {...props} className="mt-6" />
    </AnchorLink>
  ),
  h6: ({ ...props }) => (
    <AnchorLink>
      <H6 {...props} className="mt-6" />
    </AnchorLink>
  ),
  p: ({ ...props }) => <Paragraph {...props} className="text-lg" />,
  code: ({ ...props }) => <Code {...props} />,
  em: ({ ...props }) => <EmphasizeText {...props} />,
  li: ({ ...props }) => <ListItem {...props} />,
}

export {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Code,
  Paragraph,
  ListItem,
  EmphasizeText,
  AnchorLink,
  BlogTypography,
}
