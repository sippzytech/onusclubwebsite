import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-fraunces',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter-var',
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
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
