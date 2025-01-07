interface FormData {
  name: string;
  phone: string;
  message: string;
}

interface ValidationResult {
  isValid: boolean;
  error?: string;
  field?: keyof FormData;
}

export const validateContactForm = (data: FormData): ValidationResult => {
  if (data.name.length < 2) {
    return {
      isValid: false,
      error: 'İsim en az 2 karakter olmalıdır',
      field: 'name'
    };
  }

  if (!/^[0-9]{10}$/.test(data.phone)) {
    return {
      isValid: false,
      error: 'Geçerli bir telefon numarası giriniz',
      field: 'phone'
    };
  }

  if (data.message.length < 10) {
    return {
      isValid: false,
      error: 'Mesaj en az 10 karakter olmalıdır',
      field: 'message'
    };
  }

  return { isValid: true };
};
