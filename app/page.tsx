import Hero from '@/components/Hero'
import PortfolioGrid from '@/components/PortfolioGrid'
import {getBlogColumn} from '@/lib/blogs'
import {NEWS_QUERY} from '@/lib/queries'
import {client} from '@/lib/sanity'
import type {NewsEntry} from '@/lib/types'

export const revalidate = 30

export default async function HomePage() {
  const [blogs, news] = await Promise.all([
    getBlogColumn(),
    client.fetch<NewsEntry[]>(NEWS_QUERY),
  ])

  return (
    <>
      <Hero />
      <PortfolioGrid blogs={blogs} news={news} />
    </>
  )
}
