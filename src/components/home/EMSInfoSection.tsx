'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const features = [
  {
    title: 'Zaman Tasarrufu',
    description: '20 dakikalık EMS antrenmanı, 2 saatlik klasik antrenmana eşdeğerdir',
    icon: '⏱️'
  },
  {
    title: 'Kişiye Özel',
    description: 'Her vücut tipine ve hedefe uygun özelleştirilmiş antrenman',
    icon: '🎯'
  },
  {
    title: 'Güvenli',
    description: 'Eklemlerinize zarar vermeden etkili kas çalışması',
    icon: '🛡️'
  },
  {
    title: 'Bilimsel',
    description: 'Kanıtlanmış sonuçlarla desteklenen modern teknoloji',
    icon: '🔬'
  }
];

const EMSInfoSection = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Sol taraf - Görsel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-pink-50 rounded-[40px] transform rotate-3"></div>
            <Image
              src="/ems-photo.webp"
              alt="EMS Training"
              width={600}
              height={400}
              className="relative rounded-[40px] shadow-lg"
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
          </motion.div>

          {/* Sağ taraf - İçerik */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
               <span className='text-pink-500 border-b-2 border-pink-500 mr-2'>
                EMS
                </span> 
                 Teknolojisi ile Tanışın
              </h2>
              <p className="text-gray-600 leading-relaxed ">
              <span title="Elektrikli Kas Uyarılması" className='cursor-help border-b-2 border-pink-500 mr-2 font-bold'>Electric Muscle Stimulation </span>
               teknolojisi, kaslarınızı doğal kasılma prensibine uygun olarak çalıştırır. 
                Bu sayede kısa sürede maksimum verim alırsınız.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="space-y-3"
                >
                  <div className="text-3xl">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button 
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-6 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Ücretsiz Deneme Seansı
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EMSInfoSection;
