export interface ValidationError {
  field: string
  message: string
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email.trim())
}

export const validateName = (name: string): boolean => {
  const trimmedName = name.trim()
  return trimmedName.length >= 2 && /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(trimmedName)
}

export const validatePhone = (phone: string): boolean => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '')
  // Turkish phone numbers: 10 digits without country code, or 12-13 with country code
  return /^(\+90|90)?[5][0-9]{9}$/.test(cleaned) || /^[5][0-9]{9}$/.test(cleaned)
}

export const validateMessage = (message: string): boolean => {
  const trimmedMessage = message.trim()
  return trimmedMessage.length >= 10 && trimmedMessage.length <= 500
}

export interface ContactFormData {
  name: string
  phone: string
  message: string
  email?: string
}

export const validateContactForm = (data: ContactFormData): ValidationError[] => {
  const errors: ValidationError[] = []

  // Name validation
  if (!data.name.trim()) {
    errors.push({ field: 'name', message: 'Ad ve soyadınızı giriniz' })
  } else if (!validateName(data.name)) {
    errors.push({ 
      field: 'name', 
      message: 'Geçerli bir ad ve soyad giriniz (en az 2 karakter, sadece harfler)'
    })
  }

  // Phone validation
  if (!data.phone.trim()) {
    errors.push({ field: 'phone', message: 'Telefon numaranızı giriniz' })
  } else if (!validatePhone(data.phone)) {
    errors.push({ 
      field: 'phone', 
      message: 'Geçerli bir Türkiye telefon numarası giriniz (5XX XXX XX XX)'
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
  if (data.email && data.email.trim() && !validateEmail(data.email)) {
    errors.push({ 
      field: 'email', 
      message: 'Geçerli bir e-posta adresi giriniz'
    })
  }

  return errors
}

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '')
  
  // Limit to 11 digits (0 + 10 digits)
  const limited = cleaned.slice(0, 11)
  
  // Format as (0XXX) XXX XX XX
  if (limited.length === 0) return ''
  if (limited.length <= 4) return `(${limited}`
  if (limited.length <= 7) return `(${limited.slice(0, 4)}) ${limited.slice(4)}`
  if (limited.length <= 9) return `(${limited.slice(0, 4)}) ${limited.slice(4, 7)} ${limited.slice(7)}`
  
  return `(${limited.slice(0, 4)}) ${limited.slice(4, 7)} ${limited.slice(7, 9)} ${limited.slice(9)}`
}

// Export legacy function names for backward compatibility
export const validateForm = validateContactForm