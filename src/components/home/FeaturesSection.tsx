'use client'

import { motion } from 'framer-motion';

const features = [
  {
    title: 'Kişiye Özel Program',
    description: 'Her bireyin ihtiyaçlarına ve hedeflerine göre özel olarak hazırlanmış antrenman programları',
    icon: '👤',
    color: 'bg-linear-to-br from-pink-50 to-pink-100 dark:from-pink-950/50 dark:to-pink-900/50'
  },
  {
    title: 'Uzman Eğitmenler',
    description: 'Deneyimli ve sertifikalı eğitmenler eşliğinde güvenli ve etkili antrenmanlar',
    icon: '🎯',
    color: 'bg-linear-to-br from-rose-50 to-rose-100 dark:from-rose-950/50 dark:to-rose-900/50'
  },
  {
    title: 'Modern Ekipmanlar',
    description: 'En son teknoloji EMS ekipmanları ve modern fitness aletleri ile donatılmış salon',
    icon: '⚡',
    color: 'bg-linear-to-br from-pink-50 to-pink-100 dark:from-pink-950/50 dark:to-pink-900/50'
  },
  {
    title: 'Esnek Programlama',
    description: 'Sizin programınıza uygun esnek ders saatleri ve randevu sistemi',
    icon: '📅',
    color: 'bg-linear-to-br from-rose-50 to-rose-100 dark:from-rose-950/50 dark:to-rose-900/50'
  },
  {
    title: 'Beslenme Desteği',
    description: 'Uzman diyetisyenler tarafından hazırlanan kişiye özel beslenme programları',
    icon: '🥗',
    color: 'bg-linear-to-br from-pink-50 to-pink-100 dark:from-pink-950/50 dark:to-pink-900/50'
  },
  {
    title: 'Sürekli Takip',
    description: 'Düzenli ölçüm ve değerlendirmelerle ilerlemenizin sürekli takibi',
    icon: '📊',
    color: 'bg-linear-to-br from-rose-50 to-rose-100 dark:from-rose-950/50 dark:to-rose-900/50'
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4"
          >
            Neden Bizi Seçmelisiniz?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Size özel hazırlanmış programlar ve profesyonel ekibimizle hedeflerinize ulaşmanıza yardımcı oluyoruz
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${feature.color} rounded-3xl p-8 hover:shadow-lg dark:hover:shadow-pink-950/20 transition-all duration-300 group backdrop-blur-xs`}
            >
              <div className="mb-6">
                <span className="text-4xl group-hover:scale-110 inline-block transform transition-transform duration-300">
                  {feature.icon}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
