export default function ContactPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 px-4 bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif text-primary dark:text-pink-400 text-center mb-12">
          İletişim
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg dark:shadow-gray-900/50">
            <h2 className="text-2xl font-serif text-primary dark:text-pink-400 mb-6">
              Bize Ulaşın
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300">Telefon</h3>
                <p className="text-primary dark:text-pink-400">0541 884 9944</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300">E-posta</h3>
                <p className="text-primary dark:text-pink-400">vm@gmail.com</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300">Çalışma Saatleri</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Pazartesi - Cumartesi: 09:45 - 20:00<br />
                  Pazar: Kapalı
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg dark:shadow-gray-900/50">
            <h2 className="text-2xl font-serif text-primary dark:text-pink-400 mb-6">
              Hakkımızda
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Loca Fit Studio, kadınlara özel profesyonel EMS ve kişisel antrenman hizmetleri sunan 
              modern bir spor stüdyosudur.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Uzman eğitmenlerimiz eşliğinde, son teknoloji EMS ekipmanları ve 
              kişiselleştirilmiş programlarla hedeflerinize ulaşmanıza yardımcı oluyoruz.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
