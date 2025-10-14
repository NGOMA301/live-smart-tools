"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { calculateBMI } from "@/lib/utils"

export default function BMICalculator() {
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [result, setResult] = useState<{ bmi: number; category: string } | null>(null)

  const handleCalculate = () => {
    const h = Number.parseFloat(height)
    const w = Number.parseFloat(weight)

    if (h > 0 && w > 0) {
      const bmiResult = calculateBMI(w, h)
      setResult(bmiResult)
    }
  }

  const handleReset = () => {
    setHeight("")
    setWeight("")
    setResult(null)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Underweight":
        return "text-blue-500"
      case "Normal weight":
        return "text-green-500"
      case "Overweight":
        return "text-yellow-500"
      case "Obese":
        return "text-red-500"
      default:
        return ""
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>BMI Calculator</CardTitle>
        <CardDescription>Calculate your Body Mass Index and health category</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="170"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleCalculate} className="flex-1">
            Calculate
          </Button>
          <Button onClick={handleReset} variant="outline">
            Reset
          </Button>
        </div>

        {result && (
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <p className="mb-2 text-sm text-muted-foreground">Your BMI</p>
            <p className="mb-4 text-4xl font-bold">{result.bmi.toFixed(1)}</p>
            <p className={`text-lg font-semibold ${getCategoryColor(result.category)}`}>{result.category}</p>
          </div>
        )}

        <div className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
          <p className="mb-2 font-semibold text-foreground">BMI Categories:</p>
          <ul className="space-y-1">
            <li>Underweight: BMI less than 18.5</li>
            <li>Normal weight: BMI 18.5 to 24.9</li>
            <li>Overweight: BMI 25 to 29.9</li>
            <li>Obese: BMI 30 or greater</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
