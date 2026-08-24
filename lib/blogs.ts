import {POCELSTO_URL} from './config'
import {
  BLOGS_QUERY,
  BLOG_COLUMN_MAX,
  BLOG_THRESHOLD,
  POCELSTO_FALLBACK_QUERY,
} from './queries'
import {client} from './sanity'
import type {BlogColumnItem, BlogDoc, PocelstoDoc} from './types'

const TYPE_TO_CATEGORY: Record<string, string> = {
  poem: 'poems',
  story: 'stories',
  misc: 'misc',
}

function year(date?: string | null): string {
  if (!date) return ''
  return String(new Date(date).getUTCFullYear())
}

function titleCase(value: string): string {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function blogKicker(subtype: string | null): string {
  return subtype ? titleCase(subtype) : 'Blog'
}

function pocelstoKicker(doc: PocelstoDoc): string {
  if (doc._type === 'poem') return 'Poem'
  if (doc._type === 'story') return 'Story'
  return doc.subtype ? titleCase(doc.subtype) : 'Misc.'
}

/**
 * Blogs column, per claude-design-handoff.md §4.3.
 *
 *   0 blog posts    → up to 6 POCELSTO entries (mixed, newest first)
 *   1–2 blog posts  → blog posts first, POCELSTO fills the remaining slots
 *   3+ blog posts   → blog posts only; the fallback query is never run
 */
export async function getBlogColumn(): Promise<BlogColumnItem[]> {
  const blogPosts = await client.fetch<BlogDoc[]>(BLOGS_QUERY)

  const items: BlogColumnItem[] = blogPosts.map((post) => ({
    id: post._id,
    kicker: blogKicker(post.subtype),
    title: post.title,
    meta: post.collaborators,
    year: year(post.publishedAt),
    href: `/blog/${post.slug.current}`,
    external: false,
  }))

  if (blogPosts.length >= BLOG_THRESHOLD) return items

  const needed = BLOG_COLUMN_MAX - blogPosts.length
  const fallback = await client.fetch<PocelstoDoc[]>(POCELSTO_FALLBACK_QUERY, {needed})

  return items.concat(
    fallback.map((doc) => ({
      id: doc._id,
      kicker: pocelstoKicker(doc),
      title: doc.title,
      meta: `From POCELSTO · ${doc.author}`,
      year: year(doc.publishedAt),
      href: `${POCELSTO_URL}/${TYPE_TO_CATEGORY[doc._type]}/${doc.slug.current}`,
      external: true,
    })),
  )
}
