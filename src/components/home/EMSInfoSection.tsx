'use client'

import Image from 'next/image'

const benefits = [
  "Tüm vücudu aynı anda çalıştırır",
  "Yağ yakımını hızlandırır",
  "Selülit görünümünü azaltır",
  "Sıkılaşma ve şekillendirme sağlar"
]

export default function EMSInfoSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="ems-content">
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">
              EMS Teknolojisi Nedir?
            </h2>
            <p className="text-gray-700 mb-4">
              EMS (Elektro Muscle Stimulation), kas gruplarını elektrik akımları ile uyararak çalıştıran modern bir antrenman teknolojisidir.
            </p>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden ems-image">
            <Image
              src="/ems-photo.webp"
              alt="EMS Training"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
