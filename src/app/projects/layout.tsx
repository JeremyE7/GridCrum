import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Header from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GridCrum',
  description: 'Aplicacion para la gestion de proyectos'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang='es'>
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
