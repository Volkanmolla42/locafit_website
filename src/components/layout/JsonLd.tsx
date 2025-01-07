export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HealthClub',
    name: 'Loca Fit Studio',
    description: 'Kadınlara özel EMS ve kişisel antrenman stüdyosu',
    url: 'https://locafitstudio.com',
    telephone: '+905555555555', // Gerçek telefon numarası eklenecek
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Adres bilgisi', // Gerçek adres eklenecek
      addressLocality: 'İstanbul',
      addressRegion: 'İstanbul',
      postalCode: '34000',
      addressCountry: 'TR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '41.0082', // Gerçek koordinatlar eklenecek
      longitude: '28.9784'
    },
    openingHours: [
      'Mo-Fr 07:00-22:00',
      'Sa-Su 09:00-20:00'
    ],
    priceRange: '₺₺',
    image: [
      'https://locafitstudio.com/images/studio-1.jpg',
      'https://locafitstudio.com/images/studio-2.jpg'
    ],
    sameAs: [
      'https://www.facebook.com/locafitstudio',
      'https://www.instagram.com/locafitstudio'
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
