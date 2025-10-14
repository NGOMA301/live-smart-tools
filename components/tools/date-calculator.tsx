"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DateCalculator() {
  const [startDate, setStartDate] = useState("")
  const [operation, setOperation] = useState<"add" | "subtract">("add")
  const [years, setYears] = useState("")
  const [months, setMonths] = useState("")
  const [days, setDays] = useState("")
  const [result, setResult] = useState<string | null>(null)
  const [difference, setDifference] = useState<{
    years: number
    months: number
    days: number
    totalDays: number
  } | null>(null)

  const calculateDate = () => {
    const date = new Date(startDate)
    const y = Number.parseInt(years || "0")
    const m = Number.parseInt(months || "0")
    const d = Number.parseInt(days || "0")

    if (operation === "add") {
      date.setFullYear(date.getFullYear() + y)
      date.setMonth(date.getMonth() + m)
      date.setDate(date.getDate() + d)
    } else {
      date.setFullYear(date.getFullYear() - y)
      date.setMonth(date.getMonth() - m)
      date.setDate(date.getDate() - d)
    }

    setResult(date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }))
  }

  const calculateDifference = () => {
    const date1 = new Date(startDate)
    const date2 = new Date()

    const diffTime = Math.abs(date2.getTime() - date1.getTime())
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    let years = date2.getFullYear() - date1.getFullYear()
    let months = date2.getMonth() - date1.getMonth()
    let days = date2.getDate() - date1.getDate()

    if (days < 0) {
      months--
      const prevMonth = new Date(date2.getFullYear(), date2.getMonth(), 0)
      days += prevMonth.getDate()
    }

    if (months < 0) {
      years--
      months += 12
    }

    setDifference({ years, months, days, totalDays })
  }

  const handleReset = () => {
    setStartDate("")
    setYears("")
    setMonths("")
    setDays("")
    setResult(null)
    setDifference(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Date Calculator</CardTitle>
        <CardDescription>Add or subtract time from a date, or calculate the difference between dates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-4 font-semibold">Add/Subtract Time</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="operation">Operation</Label>
                  <Select value={operation} onValueChange={(v) => setOperation(v as "add" | "subtract")}>
                    <SelectTrigger id="operation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="add">Add</SelectItem>
                      <SelectItem value="subtract">Subtract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="years">Years</Label>
                    <Input
                      id="years"
                      type="number"
                      placeholder="0"
                      value={years}
                      onChange={(e) => setYears(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="months">Months</Label>
                    <Input
                      id="months"
                      type="number"
                      placeholder="0"
                      value={months}
                      onChange={(e) => setMonths(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="days">Days</Label>
                    <Input
                      id="days"
                      type="number"
                      placeholder="0"
                      value={days}
                      onChange={(e) => setDays(e.target.value)}
                    />
                  </div>
                </div>
                <Button onClick={calculateDate} className="w-full">
                  Calculate Date
                </Button>
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Difference from Today</h3>
              <Button onClick={calculateDifference} className="w-full bg-transparent" variant="outline">
                Calculate Difference
              </Button>
            </div>
          </div>
        </div>

        <Button onClick={handleReset} variant="outline" className="w-full bg-transparent">
          Reset
        </Button>

        {result && (
          <div className="rounded-lg border border-border bg-card p-6">
            <p className="mb-2 text-sm text-muted-foreground">Result Date</p>
            <p className="text-xl font-bold">{result}</p>
          </div>
        )}

        {difference && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="mb-2 text-sm text-muted-foreground">Time Difference</p>
              <p className="text-lg font-bold">
                {difference.years} years, {difference.months} months, {difference.days} days
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="mb-2 text-sm text-muted-foreground">Total Days</p>
              <p className="text-2xl font-bold text-primary">{difference.totalDays} days</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
