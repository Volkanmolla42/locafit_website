'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { validateForm, formatPhoneNumber } from '@/utils/validation'
import { useApp } from '@/context/AppContext'
import  OptimizedImage  from '../common/OptimizedImage'

export default function ContactSection() {
  const { dispatch } = useApp()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    subject: ''
  })
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errors = validateForm(formData)
    
    if (errors.length > 0) {
      const errorMap = errors.reduce((acc, error) => ({
        ...acc,
        [error.field]: error.message
      }), {})
      setFormErrors(errorMap)
      return
    }

    setIsSubmitting(true)

    try {
      // Form gönderimi simülasyonu
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Başarılı
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          type: 'success',
          message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.'
        }
      })
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        subject: ''
      })
      setFormErrors({})
    } catch (error) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          type: 'error',
          message: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
        }
      })
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 px-4 bg-gray-50" id="contact">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto text-center mb-12"
            >
              <h2 className="heading-responsive mb-4">Bizimle İletişime Geçin</h2>
              <p className="text-gray-600">
                Sorularınız için bize ulaşın. En kısa sürede size dönüş yapacağız.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Adınız
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, name: e.target.value }))
                      setFormErrors(prev => ({ ...prev, name: '' }))
                    }}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-primary transition-colors ${
                      formErrors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, email: e.target.value }))
                      setFormErrors(prev => ({ ...prev, email: '' }))
                    }}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-primary transition-colors ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, phone: formatPhoneNumber(e.target.value) }))
                      setFormErrors(prev => ({ ...prev, phone: '' }))
                    }}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-primary transition-colors ${
                      formErrors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Konu
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Seçiniz</option>
                    <option value="general">Genel Bilgi</option>
                    <option value="pricing">Fiyat Bilgisi</option>
                    <option value="appointment">Randevu</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mesajınız
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, message: e.target.value }))
                    setFormErrors(prev => ({ ...prev, message: '' }))
                  }}
                  rows={4}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-primary transition-colors ${
                    formErrors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
                )}
              </div>

              <div className="flex justify-end">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Gönderiliyor...
                    </span>
                  ) : (
                    'Gönder'
                  )}
                </motion.button>
              </div>
            </motion.form>
          </div>
          
          <div className="relative hidden md:block">
            <OptimizedImage
              src="/images/contact.jpg"
              alt="Loca Fit Studio İletişim"
              width={600}
              height={800}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
