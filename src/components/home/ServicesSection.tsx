'use client'

export default function ServicesSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-primary text-center mb-12">
          Hizmetlerimiz
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-primary/5 p-8 rounded-lg">
            <h3 className="text-2xl font-serif text-primary mb-4">EMS Training</h3>
            <p className="text-gray-700">
              20 dakikalık EMS antrenmanı ile 2 saatlik geleneksel fitness antrenmanına eşdeğer sonuçlar elde edin.
            </p>
          </div>
          <div className="bg-primary/5 p-8 rounded-lg">
            <h3 className="text-2xl font-serif text-primary mb-4">Kişisel Antrenman</h3>
            <p className="text-gray-700">
              Uzman eğitmenlerimiz eşliğinde hedefinize özel hazırlanmış antrenman programları.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
