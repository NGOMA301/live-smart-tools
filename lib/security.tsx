/**
 * Security utilities for input sanitization and validation
 */

// Sanitize HTML to prevent XSS attacks
export function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
}

// Validate and sanitize user input
export function sanitizeInput(input: string, maxLength = 10000): string {
  // Limit input length to prevent DoS
  const truncated = input.slice(0, maxLength)

  // Remove potentially dangerous characters
  return truncated.replace(/[<>]/g, "")
}

// Validate numeric input
export function validateNumber(value: string | number, min?: number, max?: number): number {
  const num = typeof value === "string" ? Number.parseFloat(value) : value

  if (isNaN(num)) {
    throw new Error("Invalid number")
  }

  if (min !== undefined && num < min) {
    throw new Error(`Number must be at least ${min}`)
  }

  if (max !== undefined && num > max) {
    throw new Error(`Number must be at most ${max}`)
  }

  return num
}

// Validate email format
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Rate limiting for localStorage operations
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(key: string, maxRequests = 100, windowMs = 60000): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(key)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

// Secure localStorage wrapper
export const secureStorage = {
  setItem(key: string, value: any): void {
    try {
      if (!checkRateLimit(`storage_${key}`, 50, 60000)) {
        console.warn("Rate limit exceeded for storage operation")
        return
      }
      const sanitizedKey = sanitizeInput(key, 100)
      const serialized = JSON.stringify(value)
      localStorage.setItem(sanitizedKey, serialized)
    } catch (error) {
      console.error("Storage error:", error)
    }
  },

  getItem<T>(key: string, defaultValue?: T): T | null {
    try {
      const sanitizedKey = sanitizeInput(key, 100)
      const item = localStorage.getItem(sanitizedKey)
      return item ? JSON.parse(item) : (defaultValue ?? null)
    } catch (error) {
      console.error("Storage retrieval error:", error)
      return defaultValue ?? null
    }
  },

  removeItem(key: string): void {
    try {
      const sanitizedKey = sanitizeInput(key, 100)
      localStorage.removeItem(sanitizedKey)
    } catch (error) {
      console.error("Storage removal error:", error)
    }
  },
}
