interface SeoContentProps {
  title: string
  description: string
  content: string
}

export default function SeoContent({ title, description, content }: SeoContentProps) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container-responsive">
        <h1 className="heading-responsive mb-4">{title}</h1>
        <p className="text-responsive text-gray-600 mb-8">{description}</p>
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        
        {/* FAQ Section for SEO */}
        <div className="mt-12">
          <h2 className="subheading-responsive mb-6">Sıkça Sorulan Sorular</h2>
          <div className="space-y-6">
            <details className="group">
              <summary className="text-responsive font-medium cursor-pointer">
                EMS antrenmanı nedir?
              </summary>
              <p className="mt-4 text-gray-600">
                EMS (Elektro Myo Stimülasyon) antrenmanı, elektrik stimülasyonu ile kasları çalıştıran modern bir fitness yöntemidir.
                20 dakikalık bir EMS antrenmanı, geleneksel bir 2 saatlik antrenman etkisi yaratabilir.
              </p>
            </details>
            
            <details className="group">
              <summary className="text-responsive font-medium cursor-pointer">
                Kimler EMS antrenmanı yapabilir?
              </summary>
              <p className="mt-4 text-gray-600">
                18 yaşından büyük, özel bir sağlık sorunu olmayan herkes EMS antrenmanı yapabilir.
                Hamilelik, kalp pili kullanımı gibi durumlarda doktor onayı gereklidir.
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>
  )
}
