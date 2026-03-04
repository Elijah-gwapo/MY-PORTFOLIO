import './globals.css'
import { Poppins } from 'next/font/google'
import Cursor from '../components/Cursor'

const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700', '800', '900'] 
})

export const metadata = {
  title: 'Elijah Ortega - Portfolio',
  description: 'IT Student & Web Developer passionate about creating beautiful, responsive websites and applications.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" className="scroll-smooth dark">
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className={`${poppins.className} bg-bg-color text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}