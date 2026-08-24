import Link from 'next/link'
import {CONNECT_LINKS} from '@/lib/config'

export const metadata = {title: 'Contact'}

/**
 * Placeholder. The contact page design is still TBD (handoff §8) — this keeps
 * the nav link working with the same restraint as the rest of the site.
 */
export default function ContactPage() {
  return (
    <div className="contact">
      <div className="contact__inner">
        <h1>Get in touch</h1>
        <p>
          For collaborations, commissions, or a conversation about market entry and product
          work — the fastest way to reach me is by email.
        </p>
        <div className="contact__links">
          {CONNECT_LINKS.map((link) => {
            const isMail = link.href.startsWith('mailto:')
            return (
              <a
                key={link.label}
                href={link.href}
                target={isMail ? undefined : '_blank'}
                rel={isMail ? undefined : 'noopener noreferrer'}
              >
                {link.label}
              </a>
            )
          })}
        </div>
        <Link href="/" className="back-link">
          ← Back
        </Link>
      </div>
    </div>
  )
}
