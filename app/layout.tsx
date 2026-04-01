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
  title: "L'Ateneo Danza Musical e Fitness | Agropoli, Cilento",
  description: 'Corsi di danza per bambini e adulti ad Agropoli. Danza classica, moderna, hip hop, contemporanea, musical theatre, pilates e fitness. Dai 3 anni in su.',
  keywords: 'danza Agropoli, scuola danza Cilento, corsi danza bambini, danza classica, hip hop, musical theatre, pilates, fitness',
  openGraph: {
    title: "L'Ateneo Danza Musical e Fitness",
    description: 'Il Tuo Palcoscenico Inizia Qui - Corsi di danza per bambini e adulti ad Agropoli',
    locale: 'it_IT',
    type: 'website',
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
