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
  title: 'Elijah Ortega | Creative Developer',
  description: 'IT Student & Web Developer focusing on high-end digital experiences and refined engineering.',
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
