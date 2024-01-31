import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Providers } from './Providers'


export const metadata: Metadata = {
  title: 'Savage Feats',
  description: 'Savage Feats',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className="flex flex-col min-h-screen">
          <Navbar />
          <Providers>
            {children}
          </Providers>
          <Footer />
        </body>
    </html>
  )
}
