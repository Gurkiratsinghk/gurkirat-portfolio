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
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/gurkirat_skohl?igsi=MWZhbXJ4d3M4N2RseQ==',
  },
]

/**
 * Column 2 — PROJECTS. Static until you ask for Sanity integration.
 *
 * HOW TO ADD OR REORDER
 * ---------------------
 * The column renders this array top to bottom, exactly as written. The first
 * entry is the one shown at the top — to promote a project, move its line up.
 * Sorting is never applied, so the `year` values do not have to descend.
 *
 * To add one, copy this shape:
 *
 *   {title: 'Project name', year: '2024'},
 *
 * `title` and `year` are both required and both render as plain text.
 * Save the file; `npm run dev` picks it up immediately.
 */
export const PROJECTS = [
  {title: 'Minimal Portfolio Redesign', year: '2023'},
  {title: 'Editorial Design System', year: '2022'},
  {title: 'Typography Exploration', year: '2021'},
  {title: 'Brand Identity Suite', year: '2020'},
]
