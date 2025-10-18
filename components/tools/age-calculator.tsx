"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { calculateAge } from "@/lib/utils"
import { DateSelector } from "../tool-ui/date-selector"
import { Calendar, Sparkles, Clock, TrendingUp } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<Date | null>(null)
  const [result, setResult] = useState<ReturnType<typeof calculateAge> | null>(null)

  const handleCalculate = () => {
    if (birthDate) {
      const age = calculateAge(birthDate)
      setResult(age)
    }
  }

  const handleReset = () => {
    setBirthDate(null)
    setResult(null)
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <Card>
        <CardHeader className="space-y-1 pb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <CardTitle className="text-xl">Age Calculator</CardTitle>
          </div>
          <CardDescription>Calculate your exact age with detailed breakdown and insights</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <DateSelector value={birthDate} onChange={setBirthDate} />

          <div className="flex gap-2">
            <Button onClick={handleCalculate} disabled={!birthDate} className="flex-1">
              <Sparkles className="w-4 h-4 mr-2" />
              Calculate Age
            </Button>
            <Button onClick={handleReset} variant="outline" disabled={!birthDate && !result}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Your Age</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg border bg-card p-4 text-center transition-all hover:shadow-md">
                  <p className="text-xs text-muted-foreground mb-1">Years</p>
                  <p className="text-3xl font-bold">{result.years}</p>
                </div>
                <div className="rounded-lg border bg-card p-4 text-center transition-all hover:shadow-md">
                  <p className="text-xs text-muted-foreground mb-1">Months</p>
                  <p className="text-3xl font-bold">{result.months}</p>
                </div>
                <div className="rounded-lg border bg-card p-4 text-center transition-all hover:shadow-md">
                  <p className="text-xs text-muted-foreground mb-1">Days</p>
                  <p className="text-3xl font-bold">{result.days}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <CardTitle className="text-lg">Detailed Breakdown</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Total Months</p>
                  <p className="text-xl font-semibold">{result.totalMonths.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Total Weeks</p>
                  <p className="text-xl font-semibold">{result.totalWeeks.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Total Days</p>
                  <p className="text-xl font-semibold">{result.totalDays.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Total Hours</p>
                  <p className="text-xl font-semibold">{result.totalHours.toLocaleString()}</p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Total Minutes</p>
                <p className="text-2xl font-semibold">{result.totalMinutes.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <CardTitle className="text-lg">Birthday Countdown</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-lg border bg-accent/50">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Next Birthday</p>
                  <p className="font-medium">{result.nextBirthday}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Days Until</p>
                  <p className="text-2xl font-bold">{result.daysUntilBirthday}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Age Calculation Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-foreground font-medium">•</span>
                  <span>Age is calculated by subtracting your birth date from today, accounting for incomplete years and months</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground font-medium">•</span>
                  <span>Different time zones may affect the exact calculation by a few hours</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground font-medium">•</span>
                  <span>For legal purposes, some countries consider you a year older at midnight on your birth date</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground font-medium">•</span>
                  <span>The calculation accounts for leap years when determining total days lived</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
