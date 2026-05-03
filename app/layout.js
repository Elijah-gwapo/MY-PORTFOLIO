import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'
import Preloader from '../components/Preloader'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair'
})

export const metadata = {
  title: 'Elijah Alrhoy Ortega - Portfolio',
  description: 'Junior Developer passionate about creating beautiful, responsive websites and applications.',
  openGraph: {
    title: 'Elijah Alrhoy Ortega - Portfolio',
    description: 'Junior Developer passionate about creating beautiful, responsive websites and applications.',
    images: [
      {
        url: '/bw-elijah.png',
        width: 1200,
        height: 630,
        alt: 'Elijah Alrhoy Ortega',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elijah Alrhoy Ortega - Portfolio',
    description: 'Junior Developer passionate about creating beautiful, responsive websites and applications.',
    images: ['/bw-elijah.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-[#F7F7F9] text-[#111111] antialiased`}>
        <Preloader />
        {children}
      </body>
    </html>
  )
}