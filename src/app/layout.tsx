import { Inter, Playfair_Display } from 'next/font/google'
import FloatingSupport from '@/components/common/FloatingSupport'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import './globals.css'
import { Suspense } from 'react'
import Loading from './loading'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} min-h-screen bg-background text-foreground antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
        >
          <Navbar />
          <Suspense fallback={<Loading />}>
            <main className="pt-16 min-h-screen">
              {children}
            </main>
          </Suspense>
          <Footer />
          <FloatingSupport />
        </ThemeProvider>
      </body>
    </html>
  )
}
