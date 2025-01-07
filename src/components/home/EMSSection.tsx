'use client'

import Image from 'next/image'

export function EMSSection() {
  return (
    <section className="py-20 px-4" id="ems">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="ems-content">
            <h2 className="text-4xl font-serif mb-6">EMS Teknolojisi Nedir?</h2>
            <p className="text-gray-700 mb-4">
              EMS (Elektro Myo Stimülasyon) teknolojisi, kaslarınızı elektrik akımları ile uyararak klasik fitness antrenmanlarından çok daha etkili sonuçlar almanızı sağlar.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>20 dakikada 2 saatlik antrenman etkisi</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Eklemlere minimum yük</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Derin kas gruplarını hedefleme</span>
              </li>
            </ul>
          </div>
          <div className="ems-image relative h-[400px] md:h-[600px]">
            <Image
              src="/ems-photo.webp"
              alt="EMS Training"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
