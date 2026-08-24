/**
 * Cross-site links. The two sites are separate deployments, so these are
 * plain <a href> targets. When custom domains land, only these change.
 */
export const POCELSTO_URL =
  process.env.NEXT_PUBLIC_POCELSTO_URL ?? 'https://pocelsto.vercel.app'

/** Column 4 — CONNECT. Static, no Sanity. Displayed in array order. */
export const CONNECT_LINKS = [
  {label: 'LinkedIn', href: 'https://www.linkedin.com/in/gurkiratsinghkohli/'},
  {label: 'Email', href: 'mailto:gsk1432@hotmail.com'},
  {label: 'GitHub', href: 'https://github.com/Gurkiratsinghk'},
  {label: 'Instagram', href: 'https://www.instagram.com/gurkirat_skohl'},
]

// Column 2 — PROJECTS is now managed in Sanity (`project` document type).
// Add and reorder entries at pocelsto.sanity.studio; see lib/queries.ts.
