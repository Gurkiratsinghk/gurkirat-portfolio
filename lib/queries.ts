// GROQ queries — portfolio. Shared Sanity dataset with POCELSTO.

/** Once this many dedicated blog posts exist, the POCELSTO fallback stops. */
export const BLOG_THRESHOLD = 3

/** Maximum entries the Blogs column ever shows. */
export const BLOG_COLUMN_MAX = 6

export const BLOGS_QUERY = `*[_type == "blog"] | order(publishedAt desc) {
  _id, _type, title, slug, author, collaborators, publishedAt,
  "subtype": coalesce(subtype, null)
}`

/** Only fetched when there are fewer than BLOG_THRESHOLD blog posts. */
export const POCELSTO_FALLBACK_QUERY = `*[_type in ["poem","story","misc"]] | order(publishedAt desc) [0...$needed] {
  _id, _type, title, slug, author, publishedAt,
  "subtype": coalesce(subtype, null)
}`

export const NEWS_QUERY = `*[_type == "newsEntry"] | order(featured desc, publishedAt desc) {
  _id, headline, publication, url, publishedAt, featured
}`

// Manual ordering: lowest displayOrder sits at the top of the column. Entries
// with no displayOrder sort to the bottom, newest year first.
export const PROJECTS_QUERY = `*[_type == "project"] | order(coalesce(displayOrder, 999999) asc, year desc) {
  _id, title, year, displayOrder
}`

// Prefers the singleton id used by the studio's custom structure
// (setup-strategy.md §1.5); falls back to the most recent resume document if
// the studio is still on the default flat sidebar, where new documents get a
// random id.
export const RESUME_QUERY = `coalesce(
  *[_type == "resume" && _id == "singleton-resume"][0],
  *[_type == "resume"] | order(_updatedAt desc)[0]
) {
  "fileUrl": file.asset->url,
  "originalFilename": file.asset->originalFilename,
  updatedAt
}`

export const BLOG_POST_QUERY = `*[_type == "blog" && slug.current == $slug][0] {
  _id, title, author, collaborators, publishedAt, body,
  "subtype": coalesce(subtype, null)
}`

export const BLOG_SLUGS_QUERY = `*[_type == "blog" && defined(slug.current)].slug.current`
