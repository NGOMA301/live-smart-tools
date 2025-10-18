import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number, decimals = 2): string {
  return num.toFixed(decimals)
}

export function calculateAge(birthDate: Date) {
  const today = new Date();
  const birth = new Date(birthDate);

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;

  const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }
  const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalMonths,
    totalHours,
    totalMinutes,
    daysUntilBirthday,
    nextBirthday: nextBirthday.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  };
}


export function calculateBMI(weight: number, height: number) {
  const bmi = weight / ((height / 100) ** 2);

  let category = '';
  let healthRisk = '';
  let recommendation = '';

  if (bmi < 18.5) {
    category = 'Underweight';
    healthRisk = 'Malnutrition risk, low immunity';
    recommendation = 'Consider consulting a nutritionist for a healthy weight gain plan';
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Normal weight';
    healthRisk = 'Low risk';
    recommendation = 'Maintain a balanced diet and regular physical activity';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight';
    healthRisk = 'Moderate risk for heart disease and diabetes';
    recommendation = 'Focus on balanced nutrition and increase physical activity';
  } else {
    category = 'Obese';
    healthRisk = 'High risk for various health conditions';
    recommendation = 'Consult healthcare provider for a personalized weight management plan';
  }

  const healthyWeightMin = 18.5 * ((height / 100) ** 2);
  const healthyWeightMax = 24.9 * ((height / 100) ** 2);

  return {
    bmi,
    category,
    healthRisk,
    recommendation,
    healthyWeightRange: {
      min: healthyWeightMin,
      max: healthyWeightMax
    }
  };
}
