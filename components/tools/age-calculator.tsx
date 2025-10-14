"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { calculateAge } from "@/lib/utils"

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("")
  const [result, setResult] = useState<{ years: number; months: number; days: number } | null>(null)

  const handleCalculate = () => {
    if (birthDate) {
      const date = new Date(birthDate)
      const age = calculateAge(date)
      setResult(age)
    }
  }

  const handleReset = () => {
    setBirthDate("")
    setResult(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Age Calculator</CardTitle>
        <CardDescription>Calculate your exact age in years, months, and days</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="birthdate">Birth Date</Label>
          <Input id="birthdate" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
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
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <p className="mb-2 text-sm text-muted-foreground">Years</p>
              <p className="text-4xl font-bold">{result.years}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <p className="mb-2 text-sm text-muted-foreground">Months</p>
              <p className="text-4xl font-bold">{result.months}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <p className="mb-2 text-sm text-muted-foreground">Days</p>
              <p className="text-4xl font-bold">{result.days}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
