import Link from 'next/link'
import {RESUME_QUERY} from '@/lib/queries'
import {client} from '@/lib/sanity'
import type {Resume} from '@/lib/types'

export const revalidate = 30

export const metadata = {title: 'Resume'}

function formatDate(date?: string | null): string {
  if (!date) return ''
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-GB', {month: 'long', year: 'numeric', timeZone: 'UTC'})
}

export default async function ResumePage() {
  const resume = await client.fetch<Resume | null>(RESUME_QUERY)

  // Sanity file assets serve inline; `?dl` forces a download.
  const downloadUrl = resume?.fileUrl ? `${resume.fileUrl}?dl` : null

  return (
    <div className="resume-wrap">
      <div className="resume">
        <div className="resume__bar">
          <Link href="/" className="back-link">
            ← Back
          </Link>
          {downloadUrl && (
            <a className="resume__download" href={downloadUrl}>
              ↓ Download Resume
            </a>
          )}
        </div>

        {resume?.fileUrl ? (
          <iframe className="resume__viewer" src={resume.fileUrl} title="Resume" />
        ) : (
          <div className="resume__placeholder">
            No resume uploaded yet
            <br />
            add one to the Resume singleton in the studio
          </div>
        )}

        {resume?.updatedAt && (
          <div className="resume__updated">Updated {formatDate(resume.updatedAt)}</div>
        )}
      </div>
    </div>
  )
}
