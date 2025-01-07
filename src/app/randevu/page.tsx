'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCalendarAlt, FaClock, FaStickyNote } from 'react-icons/fa'

interface Appointment {
  id: string // uuid in Supabase
  created_at: string
  date: string
  time: string
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  notes: string | null
}

export default function RandevuPage() {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])

  const formatPhoneNumber = (input: string): string => {
    // Sadece rakamları al
    const numbers = input.replace(/\D/g, '')
    
    // Eğer başında 0 varsa kaldır
    const withoutLeadingZero = numbers.replace(/^0+/, '')
    
    // XXX XXX XX XX formatına dönüştür (tek boşluklu)
    const formatted = withoutLeadingZero.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1$2$3$4')
    return formatted.replace(/(...)(...)(..)(..)/, '$1 $2 $3 $4')
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const formattedPhone = formatPhoneNumber(phone)
      console.log('Formatted Phone:', formattedPhone)

      // Test query without RLS
      const { data: testMembers, error: testError } = await supabase
        .from('members')
        .select('*')
        .limit(1)

      console.log('Test Query:', { testMembers, testError })

      if (testError) {
        console.error('Test Query Error:', testError)
        throw testError
      }

      // Önce üye bilgilerini bulalım
      const { data: memberData, error: memberError } = await supabase
        .from('members')
        .select(`
          id,
          first_name,
          last_name,
          phone
        `)
        .ilike('phone', formattedPhone)
        .maybeSingle()

      console.log('Member Query Result:', { memberData, memberError, formattedPhone })

      if (memberError) {
        throw memberError
      }

      if (!memberData) {
        setError('Bu telefon numarası ile kayıtlı üye bulunamadı.')
        setLoading(false)
        return
      }

      // Üyenin randevularını getirelim
      const { data: appointmentsData, error: appointmentsError } = await supabase
        .from('appointments')
        .select(`
          id,
          created_at,
          date,
          time,
          status,
          notes
        `)
        .eq('member_id', memberData.id)
        .order('date', { ascending: true })
        .order('time', { ascending: true })

      console.log('Appointments Query Result:', { appointmentsData, appointmentsError, memberId: memberData.id })

      if (appointmentsError) {
        throw appointmentsError
      }
      
      if (!appointmentsData || appointmentsData.length === 0) {
        setError(`${memberData.first_name} ${memberData.last_name} adlı üyeye ait randevu bulunamadı.`)
      } else {
        setAppointments(appointmentsData)
      }
    } catch (error) {
      setError('Randevular getirilirken bir hata oluştu. Lütfen tekrar deneyin.')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatTime = (timeStr: string) => {
    return timeStr.substring(0, 5) // "14:30:00" -> "14:30"
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'Planlandı'
      case 'in-progress':
        return 'Devam Ediyor'
      case 'completed':
        return 'Tamamlandı'
      case 'cancelled':
        return 'İptal Edildi'
      default:
        return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <main className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-serif text-primary mb-4">
            Randevularım
          </h1>
          <p className="text-gray-600">
            Randevularınızı görüntülemek için telefon numaranızı girin
          </p>
        </motion.div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="5XX XXX XX XX"
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Aranıyor...' : 'Ara'}
            </button>
          </form>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-red-500 mb-8"
          >
            {error}
          </motion.div>
        )}

        <motion.div layout className="grid gap-6">
          <AnimatePresence mode="wait">
            {appointments.map((appointment) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-serif text-primary">
                      Randevu
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(appointment.status)}`}>
                      {getStatusText(appointment.status)}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="w-4 h-4 text-primary" />
                      <span>{formatDate(appointment.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="w-4 h-4 text-primary" />
                      <span>{formatTime(appointment.time)}</span>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="flex items-start gap-2 text-gray-600 text-sm mt-2">
                      <FaStickyNote className="w-4 h-4 text-primary mt-1" />
                      <p>{appointment.notes}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  )
}
