import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Providers } from './Providers'
import { UserProvider } from '../context/UserContext'


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
    <UserProvider>
      <html lang="en">
          <body className="flex flex-col min-h-screen bg-[#ECECEC]">
            <Navbar />
            <Providers>
              {children}
            </Providers>
            <Footer />
          </body>
      </html>
    </UserProvider>
  )
}
