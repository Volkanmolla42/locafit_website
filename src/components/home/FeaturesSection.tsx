'use client'

const features = [
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    ),
    title: "Hızlı Sonuç",
    description: "20 dakikalık EMS antrenmanı ile klasik 2 saatlik antrenman etkisi"
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    ),
    title: "Güvenli Antrenman",
    description: "Eklemlere binen yükü minimize eden teknoloji"
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    ),
    title: "Uzman Kadro",
    description: "Deneyimli ve profesyonel eğitmenler eşliğinde antrenman"
  }
]

export default function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-primary/5">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-primary text-center mb-12">
          Neden Loca Fit Studio?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 feature-item bg-white rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {feature.icon}
                </svg>
              </div>
              <h3 className="text-xl font-serif text-primary mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
