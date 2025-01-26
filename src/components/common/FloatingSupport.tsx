'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { validateForm, formatPhoneNumber } from '@/utils/validation'

interface Message {
  text: string
  sender: 'user' | 'support'
  timestamp: Date
}

export default function FloatingSupport() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'chat' | 'form'>('chat')
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Merhaba! Size nasıl yardımcı olabilirim?',
      sender: 'support',
      timestamp: new Date()
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  })
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({})

  const handleWhatsApp = () => {
    const phone = '905418849944' // WhatsApp numarası
    const text = 'Merhaba, bilgi almak istiyorum.'
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank')
  }

  const handleSubmit = (e: React.FormEvent) => {
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

    // Form gönderimi başarılı
    handleWhatsApp()
    setFormData({ name: '', phone: '', message: '' })
    setFormErrors({})
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const userMessage: Message = {
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')

    // Otomatik cevap
    setTimeout(() => {
      const autoReply: Message = {
        text: 'Teşekkürler! En kısa sürede size dönüş yapacağız. Hızlı yanıt için WhatsApp\'tan da ulaşabilirsiniz.',
        sender: 'support',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, autoReply])
    }, 1000)
  }

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary-dark transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      </motion.div>

      {/* Support Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
            
            <motion.div
              className="bg-white rounded-lg shadow-xl w-full max-w-md relative"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              {/* Header */}
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex gap-4">
                  <button
                    className={`px-4 py-2 rounded-md transition-colors ${
                      activeTab === 'chat' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('chat')}
                  >
                    Canlı Destek
                  </button>
                  <button
                    className={`px-4 py-2 rounded-md transition-colors ${
                      activeTab === 'form' ? 'bg-primary text-white' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('form')}
                  >
                    WhatsApp
                  </button>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                {activeTab === 'chat' ? (
                  <div className="space-y-4">
                    <div className="h-80 overflow-y-auto space-y-4">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.sender === 'user'
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {message.text}
                          </div>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Mesajınızı yazın..."
                        className="flex-1 border rounded-md px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-primary"
                      />
                      <button
                        type="submit"
                        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                      >
                        Gönder
                      </button>
                    </form>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Adınız
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-primary focus:ring-primary"
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: formatPhoneNumber(e.target.value) }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-primary focus:ring-primary"
                      />
                      {formErrors.phone && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Mesajınız
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-primary focus:ring-primary"
                      />
                      {formErrors.message && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                    >
                      WhatsApp&apos;tan Devam Et
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
