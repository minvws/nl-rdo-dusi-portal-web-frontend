import { type JsonSchema } from '@jsonforms/core'

export const isValidPassword = (schema: JsonSchema, password: string) => {
  if (password.length < 12) {
    return false
  }

  // Check if the password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return false
  }

  // Check if the password contains at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return false
  }

  // Check if the password contains at least one number
  if (!/[0-9]/.test(password)) {
    return false
  }

  // Check if the password contains at least one special character
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    return false
  }
  return true
}
