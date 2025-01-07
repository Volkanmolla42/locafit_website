import { Inter, Playfair_Display } from 'next/font/google'
import { AppProvider } from '@/context/AppContext'
import { Notifications } from '@/components/common/Notifications'
import FloatingSupport from '@/components/common/FloatingSupport'
import Navbar from '@/components/layout/Navbar'
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
          <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-serif text-xl mb-4">Loca Fit Studio</h3>
                  <p className="text-gray-400">
                    Kadınlara özel profesyonel EMS ve kişisel antrenman stüdyosu
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-xl mb-4">İletişim</h3>
                  <p className="text-gray-400">
                    Telefon: 0541 884 9944<br />
                    Email: vm@gmail.com<br />
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-xl mb-4">Çalışma Saatleri</h3>
                  <p className="text-gray-400">
                    Pazartesi - Cumartesi: 09:45 - 20:00<br />
                    Pazar: Kapalı
                  </p>
                </div>
              </div>
            </div>
          </footer>
          <Notifications />
          <FloatingSupport />
        </AppProvider>
      </body>
    </html>
  )
}
