export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2 && /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(name)
}
export const validatePhone = (phone: string): boolean => {
  // Sadece rakamları al
  const cleaned = phone.replace(/\D/g, '')

  return /^\+?\d{7,15}$/.test(cleaned)
}

export const validateMessage = (message: string): boolean => {
  return message.trim().length >= 10 && message.trim().length <= 500
}

export interface ValidationError {
  field: string
  message: string
}

export const validateForm = (data: {
  name: string
  phone: string
  message: string
  email?: string
}): ValidationError[] => {
  const errors: ValidationError[] = []

  // Name validation
  if (!data.name.trim()) {
    errors.push({ field: 'name', message: 'Adınızı giriniz' })
  } else if (!validateName(data.name)) {
    errors.push({ 
      field: 'name', 
      message: 'Geçerli bir isim giriniz (en az 2 karakter)'
    })
  }

  // Phone validation
  if (!data.phone.trim()) {
    errors.push({ field: 'phone', message: 'Telefon numarası giriniz' })
  } else if (!validatePhone(data.phone)) {
    errors.push({ 
      field: 'phone', 
      message: 'Geçerli bir telefon numarası giriniz'
    })
  }

  // Message validation
  if (!data.message.trim()) {
    errors.push({ field: 'message', message: 'Mesajınızı giriniz' })
  } else if (!validateMessage(data.message)) {
    errors.push({ 
      field: 'message', 
      message: 'Mesaj 10-500 karakter arasında olmalıdır'
    })
  }

  // Optional email validation
  if (data.email && !validateEmail(data.email)) {
    errors.push({ 
      field: 'email', 
      message: 'Geçerli bir e-posta adresi giriniz'
    })
  }

  return errors
}
export const formatPhoneNumber = (phone: string): string => {
  // Sadece rakamları al
  const cleaned = phone.replace(/\D/g, '')

  // 11 haneyi geçemez
  const limited = cleaned.slice(0, 11)

  // Formatlama mantığı
  const parts = []
  if (limited.length > 0) parts.push('(' + limited.slice(0, 3))
  if (limited.length > 3) parts.push(') ' + limited.slice(3, 6))
  if (limited.length > 6) parts.push(' ' + limited.slice(6, 8))
  if (limited.length > 8) parts.push(' ' + limited.slice(8, 10))

  return parts.join('')
}