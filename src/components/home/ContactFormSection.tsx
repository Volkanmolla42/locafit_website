'use client'
import { useState } from 'react'
import { Phone, User, MessageSquare, Send, Loader2 } from 'lucide-react'
// import MapComponent from './MapComponent'

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  })
  const [formErrors, setFormErrors] = useState({
    name: '',
    phone: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const validateForm = () => {
    let isValid = true
    const errors = {
      name: '',
      phone: '',
      message: ''
    }

    if (formData.name.trim().length < 2) {
      errors.name = 'İsim en az 2 karakter olmalıdır'
      isValid = false
    }

    const phoneRegex = /^[0-9]{10}$/
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Geçerli bir telefon numarası giriniz (5XX XXX XX XX)'
      isValid = false
    }

    if (formData.message.trim().length < 8) {
      errors.message = 'Mesaj en az 8 karakter olmalıdır'
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length === 0) return ''
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `${numbers.slice(0, 3)} ${numbers.slice(3)}`
    if (numbers.length <= 8) return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6)}`
    return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 8)} ${numbers.slice(8, 10)}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phone: formData.phone.replace(/\D/g, '')
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Bir hata oluştu')
      }

      setSuccess(true)
      setFormData({ name: '', phone: '', message: '' })
      setFormErrors({ name: '', phone: '', message: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    if (name === 'phone') {
      setFormData(prev => ({
        ...prev,
        [name]: formatPhoneNumber(value)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }

    setFormErrors(prev => ({
      ...prev,
      [name]: ''
    }))
  }

  return (
    <div className="py-12">
      <h2 className="text-3xl font-serif text-primary dark:text-pink-400 text-center mb-4">
        Bize Ulaşın
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
        Soru ve önerileriniz için bize ulaşın. En kısa sürede size dönüş yapacağız.
      </p>
      <div className="grid gap-8">
        {/* md:grid-cols-2  */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xs border border-gray-100 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <User className="w-4 h-4" />
                Adınız
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary/20 dark:focus:ring-pink-500/20 focus:border-primary dark:focus:border-pink-500 transition-colors dark:bg-gray-700 dark:border-gray-600 ${
                  formErrors.name ? 'border-red-300 bg-red-50 dark:border-red-500/50 dark:bg-red-900/20' : 'border-gray-200 dark:border-gray-600'
                }`}
                placeholder="Adınızı girin"
                required
              />
              {formErrors.name && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                  <span className="block w-1 h-1 rounded-full bg-red-500 dark:bg-red-400" />
                  {formErrors.name}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <Phone className="w-4 h-4" />
                Telefon
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="5XX XXX XX XX"
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary/20 dark:focus:ring-pink-500/20 focus:border-primary dark:focus:border-pink-500 transition-colors dark:bg-gray-700 dark:border-gray-600 ${
                  formErrors.phone ? 'border-red-300 bg-red-50 dark:border-red-500/50 dark:bg-red-900/20' : 'border-gray-200 dark:border-gray-600'
                }`}
                required
              />
              {formErrors.phone && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                  <span className="block w-1 h-1 rounded-full bg-red-500 dark:bg-red-400" />
                  {formErrors.phone}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                <MessageSquare className="w-4 h-4" />
                Mesajınız
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary/20 dark:focus:ring-pink-500/20 focus:border-primary dark:focus:border-pink-500 transition-colors dark:bg-gray-700 dark:border-gray-600 ${
                  formErrors.message ? 'border-red-300 bg-red-50 dark:border-red-500/50 dark:bg-red-900/20' : 'border-gray-200 dark:border-gray-600'
                }`}
                placeholder="Mesajınızı girin"
                required
              />
              {formErrors.message && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
                  <span className="block w-1 h-1 rounded-full bg-red-500 dark:bg-red-400" />
                  {formErrors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary dark:bg-pink-600 hover:bg-pink-600 dark:hover:bg-pink-500 text-white font-medium rounded-lg transition-colors ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Gönderiliyor...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Gönder
                </>
              )}
            </button>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <p className="text-sm text-green-600 dark:text-green-400">
                  Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.
                </p>
              </div>
            )}
          </form>
        </div>

          {/**
        <div className="rounded-xl overflow-hidden h-[500px]">
          <MapComponent />
           * 
        </div>
           */}
      </div>
    </div>
  )
}
