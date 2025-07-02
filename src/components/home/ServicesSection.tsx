'use client'

import { motion } from 'framer-motion';
import { PiBarbellBold, PiLeafFill } from 'react-icons/pi';
import { IoBodyOutline } from 'react-icons/io5';
import { RiMentalHealthLine } from 'react-icons/ri';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

const services = [
  {
    title: 'EMS Antrenman',
    description: 'Modern teknoloji ile kişiselleştirilmiş antrenman deneyimi. 20 dakikada maksimum sonuç.',
    features: ['Hızlı Sonuç', 'Kişiselleştirilmiş', 'Profesyonel Takip'],
    Icon: PiBarbellBold,
    gradient: 'from-pink-500 to-rose-500',
    bgGradient: 'from-pink-50 to-rose-50 dark:from-pink-950/30 to-rose-950/30',
    iconBg: 'from-pink-100 to-rose-100 dark:from-pink-900/50 to-rose-900/50',
    href: '/hizmetler#ems'
  },
  {
    title: 'Pilates',
    description: 'Vücut ve zihin dengesini sağlayan özel pilates seansları. Güçlendirme ve esneklik.',
    features: ['Postür Düzeltici', 'Zihin-Beden Dengesi', 'Grup & Bireysel'],
    Icon: IoBodyOutline,
    gradient: 'from-purple-500 to-violet-500',
    bgGradient: 'from-purple-50 to-violet-50 dark:from-purple-950/30 to-violet-950/30',
    iconBg: 'from-purple-100 to-violet-100 dark:from-purple-900/50 to-violet-900/50',
    href: '/hizmetler#pilates'
  },
  {
    title: 'Yoga',
    description: 'Ruh ve beden uyumunu hedefleyen yoga dersleri. İç huzur ve güçlendirme.',
    features: ['Stres Azaltıcı', 'Esneklik', 'Meditasyon'],
    Icon: RiMentalHealthLine,
    gradient: 'from-emerald-500 to-teal-500',
    bgGradient: 'from-emerald-50 to-teal-50 dark:from-emerald-950/30 to-teal-950/30',
    iconBg: 'from-emerald-100 to-teal-100 dark:from-emerald-900/50 to-teal-900/50',
    href: '/hizmetler#yoga'
  },
  {
    title: 'Beslenme Danışmanlığı',
    description: 'Kişiye özel beslenme programları ve takibi. Sağlıklı yaşam koçluğu.',
    features: ['Özel Program', 'Sürekli Takip', 'Yaşam Koçluğu'],
    Icon: PiLeafFill,
    gradient: 'from-orange-500 to-amber-500',
    bgGradient: 'from-orange-50 to-amber-50 dark:from-orange-950/30 to-amber-950/30',
    iconBg: 'from-orange-100 to-amber-100 dark:from-orange-900/50 to-amber-900/50',
    href: '/hizmetler#beslenme'
  }
];

const ServicesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-24 section-divider">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 rounded-full mb-6"
          >
            <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-pink-600 dark:text-pink-400 uppercase tracking-wider">
              Hizmetlerimiz
            </span>
          </motion.div>

          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-6 font-playfair"
          >
            Size Özel
            <span className="block text-gradient">Fitness Deneyimi</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Profesyonel eğitmenlerimiz ve modern teknolojimizle birlikte,
            <span className="text-gradient font-semibold"> size özel tasarlanmış</span> programlarla 
            sağlıklı ve fit bir yaşama adım atın.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group"
            >
              <Link href={service.href}>
                <div className={`relative bg-gradient-to-br ${service.bgGradient} rounded-3xl p-8 shadow-soft hover:shadow-glow transition-all duration-500 border border-white/50 dark:border-gray-700/50 overflow-hidden hover-lift cursor-pointer`}>
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl transform translate-x-6 -translate-y-6 group-hover:scale-150 transition-transform duration-500" />
                  
                  {/* Icon container */}
                  <div className={`relative w-20 h-20 mb-6 mx-auto bg-gradient-to-br ${service.iconBg} rounded-2xl flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300`}>
                    <service.Icon className={`w-10 h-10 bg-gradient-to-br ${service.gradient} bg-clip-text text-transparent`} />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 text-center group-hover:text-gradient transition-all duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-center text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center justify-center gap-2">
                          <div className={`w-1.5 h-1.5 bg-gradient-to-r ${service.gradient} rounded-full`} />
                          <span className="text-xs text-gray-500 dark:text-gray-500 font-medium">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-gradient transition-all duration-300">
                      <span>Detayları Gör</span>
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        className="group-hover:translate-x-1 transition-transform duration-300"
                      >
                        <FaArrowRight className="w-3 h-3" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Hangi hizmetimizin size uygun olduğunu öğrenmek ister misiniz?
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/iletisim"
              className="btn-primary inline-flex items-center gap-3 hover-lift"
            >
              Ücretsiz Danışmanlık Al
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
