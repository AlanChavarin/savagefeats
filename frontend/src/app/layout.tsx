import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'


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
          {children}
          <Footer />
        </body>
    </html>
  )
}
