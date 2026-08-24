import type {Metadata} from 'next'
import {Cormorant_Garamond, DM_Sans} from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Gurkiratsingh Kohli',
    template: '%s — Gurkiratsingh Kohli',
  },
  description:
    'Market entry, business pivots, and product launches — the space between industries.',
  icons: {
    icon: [
      {url: '/favicon.svg', type: 'image/svg+xml'},
      {url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png'},
      {url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png'},
      {url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png'},
      {url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png'},
    ],
    shortcut: '/favicon.ico',
    apple: {url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png'},
  },
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
