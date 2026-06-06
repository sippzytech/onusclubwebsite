'use client'

import ElegantCarousel, { SlideData } from '@/components/ui/elegant-carousel'

const SLIDES: SlideData[] = [
  {
    title: 'Joins in one tap',
    subtitle: 'No app to download',
    description: 'Customer scans your QR code at the counter. One tap adds the branded card directly to Apple or Google Wallet. The card lives on their lock screen, always visible.',
    accent: '#B0894F',
    imageUrl: '/mockup_1.png',
  },
  {
    title: 'Earns at the counter',
    subtitle: 'Counter-simple scanning',
    description: 'Staff opens the scanner on any phone or tablet. Customer shows their wallet card to be scanned. Stamp added instantly, card updates in real time.',
    accent: '#B0894F',
    imageUrl: '/mockup_2.png',
  },
  {
    title: 'Comes back automatically',
    subtitle: 'Push notifications and geo alerts',
    description: 'Wallet nudges customers before they forget. Birthday and anniversary rewards run on autopilot. Location alerts fire when regulars walk nearby.',
    accent: '#B0894F',
    imageUrl: '/mockup_3.png',
  },
  {
    title: 'Pays off, measurably',
    subtitle: 'You own your data',
    description: 'Track active members and repeat visit rates. See which rewards drive customers back. Export your full customer list any time.',
    accent: '#B0894F',
    imageUrl: '/mockup_4.png',
  },
]

export default function InvertBlock() {
  return (
    <section id="compare">
      <ElegantCarousel slides={SLIDES} />
    </section>
  )
}
