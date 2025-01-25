'use client'
import { useState } from 'react'
import { Phone, User, MessageSquare, Send, Loader2 } from 'lucide-react'
import MapComponent from './MapComponent'
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
      <h2 className="text-3xl font-serif text-primary text-center mb-4">
        Bize Ulaşın
      </h2>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Soru ve önerileriniz için bize ulaşın. En kısa sürede size dönüş yapacağız.
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <User className="w-4 h-4" />
                Adınız
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                  formErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}
                placeholder="Adınızı girin"
                required
              />
              {formErrors.name && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <span className="block w-1 h-1 rounded-full bg-red-500" />
                  {formErrors.name}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
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
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                  formErrors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}
                required
              />
              {formErrors.phone && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <span className="block w-1 h-1 rounded-full bg-red-500" />
                  {formErrors.phone}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <MessageSquare className="w-4 h-4" />
                Mesajınız
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
                  formErrors.message ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}
                placeholder="Mesajınızı girin"
                required
              />
              {formErrors.message && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <span className="block w-1 h-1 rounded-full bg-red-500" />
                  {formErrors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 font-medium"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Gönderiliyor...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Gönder
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mt-4 p-3 bg-green-50 border border-green-100 text-green-600 text-sm rounded-lg">
              Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.
            </div>
          )}
        </div>
        <div className="h-max rounded-xl overflow-hidden border border-gray-200">
          <MapComponent />
        </div>
      </div>
    </div>
  )
}
