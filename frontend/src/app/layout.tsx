import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Providers } from './Providers'
import { UserProvider } from '../context/UserContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import GoogleCaptchaWrapper from '@/context/GoogleCaptchaWrapper'


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
            <GoogleCaptchaWrapper>
              <Navbar />
                <Providers>
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"/>
                {children}
              </Providers>
              <Footer />
              
            </GoogleCaptchaWrapper>
            
          </body>
      </html>
    </UserProvider>
  )
}
