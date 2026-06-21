import type { Metadata } from 'next'
import { Lato, Fraunces } from 'next/font/google'
import './globals.css'

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "OnUsClub — The next one's on us",
  description:
    'Digital loyalty that lives in Apple & Google Wallet. No app to download. Built for cafés, salons, barbers, dentists and gyms.',
  openGraph: {
    title: "OnUsClub — The next one's on us",
    description:
      'Digital loyalty that lives in Apple & Google Wallet. No app to download.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${lato.variable} ${fraunces.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
