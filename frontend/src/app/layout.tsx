
import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
//import { Providers } from './Providers'
import { UserProvider } from '../context/UserContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Script from 'next/script'

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

export const metadata: Metadata = {
  title: 'Savage Feats',
  description: 'Savage Feats Official Site | Flesh and Blood Tournament Hub!',
  icons: {
    icon: ['favicon.ico?v=4']
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <head>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-MFM12RXLK3"></Script>
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date())
  
          gtag('config', 'G-MFM12RXLK3');
        `}
      </Script>
      </head>
        <UserProvider>
          <body className="flex flex-col min-h-screen bg-[#ECECEC]">
              <Navbar />
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
              <Footer />
          </body>
        </UserProvider>  
      </html>
  )
}
