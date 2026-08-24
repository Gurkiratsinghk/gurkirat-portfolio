import Link from 'next/link'
import Reveal from './Reveal'
import {CONNECT_LINKS} from '@/lib/config'
import type {BlogColumnItem, NewsEntry, Project} from '@/lib/types'

const Ext = () => (
  <span className="ext" aria-hidden="true">
    ↗
  </span>
)

function year(date?: string | null): string {
  if (!date) return ''
  return String(new Date(date).getUTCFullYear())
}

function BlogsColumn({items}: {items: BlogColumnItem[]}) {
  return (
    <div>
      <div className="col__head">Blogs</div>
      {items.length === 0 && <p className="item__empty">Nothing published yet.</p>}
      {items.map((item) => (
        <div className="item" key={item.id}>
          <div className="item__kicker">{item.kicker}</div>
          {item.external ? (
            <a
              className="item__title"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.title} <Ext />
            </a>
          ) : (
            <Link className="item__title" href={item.href}>
              {item.title} <Ext />
            </Link>
          )}
          {item.meta && <div className="item__meta">{item.meta}</div>}
          <div className="item__year">{item.year}</div>
        </div>
      ))}
    </div>
  )
}

function ProjectsColumn({projects}: {projects: Project[]}) {
  return (
    <div>
      <div className="col__head">Projects</div>
      {projects.length === 0 && <p className="item__empty">No projects added yet.</p>}
      {projects.map((project) => {
        // The title points at the first link; a project with none is plain text.
        const primary = project.links[0]

        return (
          <div className="item" key={project._id}>
            {primary ? (
              <a
                className="item__title"
                href={primary.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.title} <Ext />
              </a>
            ) : (
              <span className="item__title">{project.title}</span>
            )}

            {project.links.length > 0 && (
              <div className="item__links">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            <div className="item__year">{project.year}</div>
          </div>
        )
      })}
    </div>
  )
}

function NewsColumn({entries}: {entries: NewsEntry[]}) {
  return (
    <div>
      <div className="col__head">In News</div>
      {entries.length === 0 && <p className="item__empty">No press mentions yet.</p>}
      {entries.map((entry) => (
        <div className="item" key={entry._id}>
          <div className="item__kicker">{entry.publication}</div>
          <a
            className="item__title"
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {entry.headline} <Ext />
          </a>
          <div className="item__year">{year(entry.publishedAt)}</div>
        </div>
      ))}
    </div>
  )
}

function ConnectColumn() {
  return (
    <div>
      <div className="col__head">Connect</div>
      <div className="connect">
        {CONNECT_LINKS.map((link) => {
          const isMail = link.href.startsWith('mailto:')
          return (
            <a
              key={link.label}
              href={link.href}
              target={isMail ? undefined : '_blank'}
              rel={isMail ? undefined : 'noopener noreferrer'}
            >
              {link.label} <Ext />
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default function PortfolioGrid({
  blogs,
  projects,
  news,
}: {
  blogs: BlogColumnItem[]
  projects: Project[]
  news: NewsEntry[]
}) {
  return (
    <section id="portfolio" className="portfolio">
      <Reveal>
        <div className="portfolio__grid">
          <BlogsColumn items={blogs} />
          <ProjectsColumn projects={projects} />
          <NewsColumn entries={news} />
          <ConnectColumn />
        </div>
      </Reveal>
    </section>
  )
}
