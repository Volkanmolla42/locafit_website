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
  openGraph: {
    title: 'Loca Fit Studio - Kadınlara Özel EMS ve Kişisel Antrenman',
    description: 'Loca Fit Studio\'da profesyonel EMS antrenmanı ve kişisel fitness hizmetleriyle form tutun. Kadınlara özel spor salonu.',
    url: 'https://locafit.com.tr',
    siteName: 'Loca Fit Studio',
    locale: 'tr_TR',
    type: 'website',
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
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
}
