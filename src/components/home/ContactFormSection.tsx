'use client'

import { useState } from 'react'

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

    if (formData.message.trim().length < 10) {
      errors.message = 'Mesaj en az 10 karakter olmalıdır'
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
    <section className="py-20 px-4 bg-primary/5">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-primary text-center mb-12">
          Bize Ulaşın
        </h2>
        <div className="bg-white p-8 rounded-lg shadow-lg contact-form">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-black mb-1">
                  Adınız
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary text-black ${
                    formErrors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-black mb-1">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="5XX XXX XX XX"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary text-black ${
                    formErrors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {formErrors.phone && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-black mb-1">
                Mesajınız
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary text-black ${
                  formErrors.message ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {formErrors.message && (
                <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>
              )}
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {loading ? 'Gönderiliyor...' : 'Gönder'}
              </button>
            </div>
            {success && (
              <p className="text-green-500 text-center">Mesajınız başarıyla gönderildi!</p>
            )}
            {error && (
              <p className="text-red-500 text-center">{error}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
