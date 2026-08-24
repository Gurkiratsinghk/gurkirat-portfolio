import {PortableText, type PortableTextComponents} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/react'
import {urlFor} from '@/lib/image'

type ImageValue = {
  alt?: string
  caption?: string
}

const components: PortableTextComponents = {
  block: {
    sectionBreak: () => (
      <div className="section-break" aria-hidden="true">
        ···
      </div>
    ),
  },
  types: {
    image: ({value}: {value: ImageValue}) => (
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={urlFor(value).width(1280).fit('max').auto('format').url()}
          alt={value.alt ?? ''}
        />
        {value.caption && <figcaption>{value.caption}</figcaption>}
      </figure>
    ),
  },
  marks: {
    link: ({value, children}) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
}

export default function ArticleBody({body}: {body: PortableTextBlock[]}) {
  return (
    <div className="article__body">
      <PortableText value={body} components={components} />
    </div>
  )
}
