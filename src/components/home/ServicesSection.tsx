'use client'

import { motion } from 'framer-motion';
import { PiBarbellBold, PiLeafFill } from 'react-icons/pi';
import { IoBodyOutline } from 'react-icons/io5';
import { RiMentalHealthLine } from 'react-icons/ri';

const services = [
  {
    title: 'EMS Antrenman',
    description: 'Modern teknoloji ile kişiselleştirilmiş antrenman deneyimi',
    Icon: PiBarbellBold,
    color: 'bg-pink-50 dark:bg-pink-950/30'
  },
  {
    title: 'Pilates',
    description: 'Vücut ve zihin dengesini sağlayan özel pilates seansları',
    Icon: IoBodyOutline,
    color: 'bg-rose-50 dark:bg-rose-950/30'
  },
  {
    title: 'Yoga',
    description: 'Ruh ve beden uyumunu hedefleyen yoga dersleri',
    Icon: RiMentalHealthLine,
    color: 'bg-pink-50 dark:bg-pink-950/30'
  },
  {
    title: 'Beslenme Danışmanlığı',
    description: 'Kişiye özel beslenme programları ve takibi',
    Icon: PiLeafFill,
    color: 'bg-rose-50 dark:bg-rose-950/30'
  }
];

const ServicesSection = () => {
  return (
    <section className="py-24  ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4"
          >
            Hizmetlerimiz
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Size özel tasarlanmış programlarla sağlıklı ve fit bir yaşama adım atın
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`${service.color} rounded-3xl p-6 shadow-xs hover:shadow-md transition-all duration-300 dark:shadow-gray-950`}
            >
              <div className="w-16 h-16 mb-6 mx-auto text-pink-600 dark:text-pink-400">
                <service.Icon className="w-full h-full" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
