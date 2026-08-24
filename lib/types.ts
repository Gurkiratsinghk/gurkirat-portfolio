import type {PortableTextBlock} from '@portabletext/react'

export type BlogDoc = {
  _id: string
  _type: 'blog'
  title: string
  slug: {current: string}
  author: string
  collaborators?: string
  publishedAt: string
  subtype: string | null
}

export type PocelstoDoc = {
  _id: string
  _type: 'poem' | 'story' | 'misc'
  title: string
  slug: {current: string}
  author: string
  publishedAt: string
  subtype: string | null
}

export type NewsEntry = {
  _id: string
  headline: string
  publication: string
  url: string
  publishedAt: string
  featured?: boolean
}

export type ProjectLink = {
  label: string
  url: string
}

export type Project = {
  _id: string
  title: string
  year: string
  displayOrder?: number
  /** In studio order. The first is where the project title points. */
  links: ProjectLink[]
}

export type Resume = {
  fileUrl: string
  originalFilename?: string
  updatedAt?: string
}

export type BlogPost = {
  _id: string
  title: string
  author: string
  collaborators?: string
  publishedAt: string
  body: PortableTextBlock[]
  subtype: string | null
}

/** One rendered row in the Blogs column, from either source. */
export type BlogColumnItem = {
  id: string
  kicker: string
  title: string
  /** Collaborators, or the POCELSTO attribution line. */
  meta?: string
  year: string
  href: string
  /** POCELSTO entries live on the other deployment. */
  external: boolean
}
