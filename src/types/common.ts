export interface ValidationError {
  field: string
  message: string
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ContactFormSubmission {
  name: string
  phone: string
  message: string
  email?: string
  createdAt?: string
}