'use client'

import { FeatureItem, FeatureItemProps } from './FeatureItem'

const features: FeatureItemProps[] = [
  {
    icon: (
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M13 10V3L4 14h7v7l9-11h-7z" 
      />
    ),
    title: "Hızlı Sonuç",
    description: "20 dakikalık EMS antrenmanı ile klasik 2 saatlik antrenman etkisi"
  },
  {
    icon: (
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
      />
    ),
    title: "Güvenli Antrenman",
    description: "Eklemlere binen yükü minimize eden teknoloji"
  },
  {
    icon: (
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" 
      />
    ),
    title: "Kişiye Özel Program",
    description: "Her vücut tipine ve hedefe uygun özel antrenman programı"
  }
]

export function FeatureSection() {
  return (
    <section className="py-20 px-4 bg-gray-50" id="features">
      <div className="container mx-auto">
        <h2 className="text-4xl font-serif text-center mb-12">
          Neden Loca Fit Studio?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
