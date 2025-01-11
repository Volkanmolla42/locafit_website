import { Inter, Playfair_Display } from 'next/font/google'
import { AppProvider } from '@/context/AppContext'
import { Notifications } from '@/components/common/Notifications'
import FloatingSupport from '@/components/common/FloatingSupport'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import './globals.css'
import { Suspense } from 'react'
import Loading from './loading'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-background">
        <AppProvider>
          <Navbar />
          <Suspense fallback={<Loading />}>
            <main className="pt-16 min-h-screen">
              {children}
            </main>
          </Suspense>
          <Footer />
          <Notifications />
          <FloatingSupport />
        </AppProvider>
      </body>
    </html>
  )
}
