import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Loca Fit Studio - Kadınlara Özel EMS ve Kişisel Antrenman',
  description: 'Loca Fit Studio\'da profesyonel EMS antrenmanı ve kişisel fitness hizmetleriyle form tutun. Kadınlara özel spor salonu.',
  keywords: 'EMS antrenman, kadınlara özel spor salonu, kişisel antrenman, fitness, istanbul spor salonu, wellness, vücut geliştirme, kilo verme, sağlıklı yaşam',
  authors: [{ name: 'Loca Fit Studio' }],
  creator: 'Loca Fit Studio',
  publisher: 'Loca Fit Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Loca Fit Studio - Kadınlara Özel EMS ve Kişisel Antrenman',
    description: 'Loca Fit Studio\'da profesyonel EMS antrenmanı ve kişisel fitness hizmetleriyle form tutun. Kadınlara özel spor salonu.',
    url: 'https://locafit.com.tr',
    siteName: 'Loca Fit Studio',
    locale: 'tr_TR',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Loca Fit Studio',
      }
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Loca Fit Studio - Kadınlara Özel EMS ve Kişisel Antrenman',
    description: 'Loca Fit Studio\'da profesyonel EMS antrenmanı ve kişisel fitness hizmetleriyle form tutun. Kadınlara özel spor salonu.',
    creator: '@locafitstudio',
    card: 'summary_large_image',
    images: ['/twitter-image.jpg'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
  alternates: {
    canonical: 'https://locafit.com.tr',
  },
  category: 'fitness',
}
