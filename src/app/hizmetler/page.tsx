'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { FaClock, FaUserFriends, FaMoneyBillWave } from 'react-icons/fa'
import { BsLightningChargeFill } from 'react-icons/bs'
import OptimizedImage from '@/components/common/OptimizedImage'

interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number
  session_count: number
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedService, setSelectedService] = useState<string | null>(null)

  useEffect(() => {
    async function fetchServices() {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('name')

        if (error) throw error
        setServices(data || [])
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  return (
    <main className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-serif text-primary mb-4">
            Hizmetlerimiz
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Size özel tasarlanmış fitness ve wellness hizmetlerimizle sağlıklı yaşama adım atın.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className={`bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-2xl
                  ${selectedService === service.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedService(service.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-serif text-primary">
                    {service.name}
                  </h3>
                  <BsLightningChargeFill className="text-primary text-xl" />
                </div>
                <p className="text-gray-600 mb-6 min-h-[80px]">
                  {service.description}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <FaClock className="mr-2" />
                    <span>{service.duration} dakika</span>
                  </div>
                  {service.session_count > 0 && (
                    <div className="flex items-center text-gray-600">
                      <FaUserFriends className="mr-2" />
                      <span>{service.session_count} seans</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center text-primary font-semibold">
                      <FaMoneyBillWave className="mr-2" />
                      <span>{service.price.toLocaleString('tr-TR')} ₺</span>
                    </div>
                    <button 
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                      onClick={() => window.location.href = '/randevu'}
                    >
                      Randevu Al
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-primary/5 to-primary/10 p-8 rounded-2xl"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-3xl font-serif text-primary mb-4">
                EMS Teknolojisi ile Tanışın
              </h2>
              <p className="text-gray-700 mb-6">
                EMS (Elektro Muscle Stimulation) teknolojisi ile 20 dakikalık antrenman, 
                2 saatlik geleneksel fitness antrenmanına eşdeğer sonuçlar sunar. 
                Kişiye özel programlarla maksimum verim elde edin.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-4 rounded-lg shadow-sm"
                >
                  <h3 className="font-semibold text-primary mb-2">Hızlı Sonuç</h3>
                  <p className="text-sm text-gray-600">20 dakikada maksimum verim</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-4 rounded-lg shadow-sm"
                >
                  <h3 className="font-semibold text-primary mb-2">Eklem Dostu</h3>
                  <p className="text-sm text-gray-600">Minimum eklem yükü</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-4 rounded-lg shadow-sm"
                >
                  <h3 className="font-semibold text-primary mb-2">Kişiye Özel</h3>
                  <p className="text-sm text-gray-600">Size özel program</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-4 rounded-lg shadow-sm"
                >
                  <h3 className="font-semibold text-primary mb-2">Profesyonel</h3>
                  <p className="text-sm text-gray-600">Uzman eğitmenler</p>
                </motion.div>
              </div>
            </div>
            <div className="flex-1 relative h-[400px] w-full rounded-xl overflow-hidden shadow-2xl">
              <OptimizedImage
                src="/ems-photo.webp"
                alt="EMS Antrenmanı"
                width={600}
                height={400}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
