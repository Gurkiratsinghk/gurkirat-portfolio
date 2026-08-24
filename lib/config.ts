/**
 * Cross-site links. The two sites are separate deployments, so these are
 * plain <a href> targets. When custom domains land, only these change.
 */
export const POCELSTO_URL =
  process.env.NEXT_PUBLIC_POCELSTO_URL ?? 'https://pocelsto.vercel.app'

/** Column 4 — CONNECT. Static, no Sanity. */
export const CONNECT_LINKS = [
  {label: 'LinkedIn', href: 'https://www.linkedin.com'},
  {label: 'Twitter', href: 'https://twitter.com'},
  {label: 'Email', href: 'mailto:hello@example.com'},
  {label: 'GitHub', href: 'https://github.com'},
]

/** Column 2 — PROJECTS. Static until the owner asks for Sanity integration. */
export const PROJECTS = [
  {title: 'Minimal Portfolio Redesign', year: '2023'},
  {title: 'Editorial Design System', year: '2022'},
  {title: 'Typography Exploration', year: '2021'},
  {title: 'Brand Identity Suite', year: '2020'},
]
