'use client'

import { useState, FormEvent } from 'react'
import { validateContactForm } from '@/utils/formValidation'
import { Button } from '../shared/Button'
import { useApp, appActions } from '@/context/AppContext'

interface FormData {
  name: string
  phone: string
  message: string
}

export function ContactForm() {
  const { state, dispatch } = useApp()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    message: ''
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    dispatch(appActions.setLoading(true))
    setErrors({})

    const validation = validateContactForm(formData)
    if (!validation.isValid && validation.field) {
      setErrors({ [validation.field]: validation.error })
      dispatch(appActions.setLoading(false))
      dispatch(appActions.addNotification({
        message: validation.error || 'Form validation error',
        type: 'error'
      }))
      return
    }

    try {
      // API call will be here
      await new Promise(resolve => setTimeout(resolve, 1000))
      dispatch(appActions.addNotification({
        message: 'Mesajınız başarıyla gönderildi',
        type: 'success'
      }))
      setFormData({ name: '', phone: '', message: '' })
    } catch (error) {
      dispatch(appActions.addNotification({
        message: 'Bir hata oluştu, lütfen tekrar deneyiniz',
        type: 'error'
      }))
      console.error(error)
    } finally {
      dispatch(appActions.setLoading(false))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          İsim
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          required
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Telefon
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          required
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Mesaj
        </label>
        <textarea
          id="message"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          required
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
      </div>

      <Button type="submit" loading={state.loading}>
        Gönder
      </Button>
    </form>
  )
}
