import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number, decimals = 2): string {
  return num.toFixed(decimals)
}

export function calculateAge(birthDate: Date): { years: number; months: number; days: number } {
  const today = new Date()
  let years = today.getFullYear() - birthDate.getFullYear()
  let months = today.getMonth() - birthDate.getMonth()
  let days = today.getDate() - birthDate.getDate()

  if (days < 0) {
    months--
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
    days += lastMonth.getDate()
  }

  if (months < 0) {
    years--
    months += 12
  }

  return { years, months, days }
}

export function calculateBMI(weight: number, height: number): { bmi: number; category: string } {
  const bmi = weight / (height / 100) ** 2
  let category = ""

  if (bmi < 18.5) category = "Underweight"
  else if (bmi < 25) category = "Normal weight"
  else if (bmi < 30) category = "Overweight"
  else category = "Obese"

  return { bmi, category }
}
