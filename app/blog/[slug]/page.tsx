import Link from 'next/link'
import {notFound} from 'next/navigation'
import type {Metadata} from 'next'
import ArticleBody from '@/components/ArticleBody'
import {BLOG_POST_QUERY, BLOG_SLUGS_QUERY} from '@/lib/queries'
import {client} from '@/lib/sanity'
import type {BlogPost} from '@/lib/types'

export const revalidate = 30

type Params = Promise<{slug: string}>

function kicker(subtype: string | null): string {
  if (subtype === 'case-study') return 'Case Study'
  if (subtype === 'note') return 'Note'
  return 'Blog'
}

function formatDate(date?: string | null): string {
  if (!date) return ''
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-GB', {month: 'long', year: 'numeric', timeZone: 'UTC'})
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(BLOG_SLUGS_QUERY)
  return slugs.map((slug) => ({slug}))
}

export async function generateMetadata({params}: {params: Params}): Promise<Metadata> {
  const {slug} = await params
  const post = await client.fetch<BlogPost | null>(BLOG_POST_QUERY, {slug})
  return post ? {title: post.title} : {}
}

export default async function BlogPostPage({params}: {params: Params}) {
  const {slug} = await params
  const post = await client.fetch<BlogPost | null>(BLOG_POST_QUERY, {slug})

  if (!post) notFound()

  return (
    <div className="article-wrap">
      <article className="article">
        <Link href="/#portfolio" className="back-link" style={{marginBottom: '3rem'}}>
          ← Back
        </Link>

        <div className="article__kicker">{kicker(post.subtype)}</div>
        <hr className="article__rule" />

        <h1 className="article__title">{post.title}</h1>

        <div className="article__meta">
          <div className="article__meta-col">
            <span className="article__meta-label">Written by</span>
            <span className="article__meta-value">{post.author}</span>
          </div>
          {post.collaborators && (
            <div className="article__meta-col">
              <span className="article__meta-label">Collaborators</span>
              <span className="article__meta-value">{post.collaborators}</span>
            </div>
          )}
          <div className="article__meta-col article__meta-col--right">
            <span className="article__meta-label">Published</span>
            <span className="article__meta-value">{formatDate(post.publishedAt)}</span>
          </div>
        </div>

        <ArticleBody body={post.body} />

        <div className="article__foot">
          <Link href="/#portfolio" className="back-link">
            ← Back
          </Link>
        </div>
      </article>
    </div>
  )
}
