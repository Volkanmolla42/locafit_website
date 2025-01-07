export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(\+90|0)?[0-9]{10}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2
}

export const validateMessage = (message: string): boolean => {
  return message.trim().length >= 10
}

export interface ValidationError {
  field: string
  message: string
}

export const validateForm = (data: {
  name?: string
  email?: string
  phone?: string
  message?: string
}): ValidationError[] => {
  const errors: ValidationError[] = []

  if (data.name && !validateName(data.name)) {
    errors.push({
      field: 'name',
      message: 'İsim en az 2 karakter olmalıdır'
    })
  }

  if (data.email && !validateEmail(data.email)) {
    errors.push({
      field: 'email',
      message: 'Geçerli bir email adresi giriniz'
    })
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.push({
      field: 'phone',
      message: 'Geçerli bir telefon numarası giriniz'
    })
  }

  if (data.message && !validateMessage(data.message)) {
    errors.push({
      field: 'message',
      message: 'Mesaj en az 10 karakter olmalıdır'
    })
  }

  return errors
}

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '0 ' + match[1] + ' ' + match[2] + ' ' + match[3]
  }
  return phone
}
