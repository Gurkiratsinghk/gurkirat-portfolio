import Hero from '@/components/Hero'
import PortfolioGrid from '@/components/PortfolioGrid'
import {getBlogColumn} from '@/lib/blogs'
import {NEWS_QUERY, PROJECTS_QUERY} from '@/lib/queries'
import {client} from '@/lib/sanity'
import type {NewsEntry, Project} from '@/lib/types'

export const revalidate = 30

export default async function HomePage() {
  const [blogs, projects, news] = await Promise.all([
    getBlogColumn(),
    client.fetch<Project[]>(PROJECTS_QUERY),
    client.fetch<NewsEntry[]>(NEWS_QUERY),
  ])

  return (
    <>
      <Hero />
      <PortfolioGrid blogs={blogs} projects={projects} news={news} />
    </>
  )
}
