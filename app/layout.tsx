import type { Metadata, Viewport } from 'next'
import { Jost, Bodoni_Moda, Dancing_Script } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  style: ['normal', 'italic'],
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  weight: '600',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ateneodanzamusicalefitness.it'),
  title: "L'Ateneo di Rita Polidoro | Scuola di Danza ad Agropoli",
  description: "Benvenuti ne L'Ateneo di Rita Polidoro ad Agropoli. Oltre 30 anni di esperienza nell'insegnamento della danza classica, moderna, hip hop e contemporanea. Corsi per bambini e adulti dai 3 anni in su.",
  keywords: 'danza Agropoli, scuola danza Cilento, Rita Polidoro, corsi danza bambini, danza classica Agropoli, hip hop Agropoli, musical theatre Cilento, pilates Agropoli, fitness Agropoli, L\'Ateneo danza',
  authors: [{ name: 'Rita Polidoro' }],
  creator: 'Rita Polidoro',
  publisher: "L'Ateneo Danza Musical e Fitness",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "L'Ateneo di Rita Polidoro | Il Tuo Palcoscenico Inizia Qui",
    description: "Scopri l'eccellenza della danza ad Agropoli con Rita Polidoro. Oltre 30 anni di passione e professionalità. Iscriviti per una lezione gratuita.",
    url: 'https://www.ateneodanzamusicalefitness.it',
    siteName: "L'Ateneo Danza",
    locale: 'it_IT',
    type: 'website',
    images: [
      {
        url: '/OGimage.jpg',
        width: 1200,
        height: 630,
        alt: "L'Ateneo di Rita Polidoro - Scuola di Danza Agropoli",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "L'Ateneo di Rita Polidoro | Danza ad Agropoli",
    description: "Corsi di danza per bambini e adulti. Il tuo percorso nel mondo della danza inizia qui.",
    images: ['/OGimage.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className={`${jost.variable} ${bodoni.variable} ${dancingScript.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
