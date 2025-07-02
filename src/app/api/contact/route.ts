import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const { name, phone, message } = await request.json()

    // Form verilerini doğrula
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Tüm alanları doldurun' },
        { status: 400 }
      )
    }

    // Mesajı veritabanına kaydet
    const { error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name,
          phone,
          message,
          status: 'new'
        }
      ])

    if (error) throw error

    return NextResponse.json(
      { message: 'Mesajınız başarıyla gönderildi' },
      { status: 200 }
    )
  } catch (error) {
    // Log error for debugging in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Contact form error:', error)
    }
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
}
