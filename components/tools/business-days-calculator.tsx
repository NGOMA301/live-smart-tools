"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export default function BusinessDaysCalculator() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [businessDays, setBusinessDays] = useState("")
  const [includeStartDate, setIncludeStartDate] = useState(true)
  const [result, setResult] = useState<{
    businessDays?: number
    endDate?: string
    totalDays?: number
    weekendDays?: number
  } | null>(null)

  const isWeekend = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6
  }

  const calculateBusinessDays = () => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    let count = 0
    let totalDays = 0
    let weekendDays = 0
    const current = new Date(start)

    if (!includeStartDate) {
      current.setDate(current.getDate() + 1)
    }

    while (current <= end) {
      totalDays++
      if (isWeekend(current)) {
        weekendDays++
      } else {
        count++
      }
      current.setDate(current.getDate() + 1)
    }

    setResult({ businessDays: count, totalDays, weekendDays })
  }

  const calculateEndDate = () => {
    const start = new Date(startDate)
    let daysToAdd = Number.parseInt(businessDays)
    const current = new Date(start)

    if (!includeStartDate) {
      current.setDate(current.getDate() + 1)
    }

    while (daysToAdd > 0) {
      if (!isWeekend(current)) {
        daysToAdd--
      }
      if (daysToAdd > 0) {
        current.setDate(current.getDate() + 1)
      }
    }

    setResult({
      endDate: current.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
    })
  }

  const handleReset = () => {
    setStartDate("")
    setEndDate("")
    setBusinessDays("")
    setResult(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Days Calculator</CardTitle>
        <CardDescription>Calculate business days between dates or find end date</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="includeStart"
            checked={includeStartDate}
            onCheckedChange={(checked) => setIncludeStartDate(checked as boolean)}
          />
          <Label htmlFor="includeStart" className="cursor-pointer">
            Include start date in calculation
          </Label>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="font-semibold">Calculate Business Days</h3>
            <div className="space-y-2">
              <Label htmlFor="startDate1">Start Date</Label>
              <Input id="startDate1" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <Button onClick={calculateBusinessDays} className="w-full">
              Calculate Days
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Find End Date</h3>
            <div className="space-y-2">
              <Label htmlFor="startDate2">Start Date</Label>
              <Input id="startDate2" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessDays">Business Days to Add</Label>
              <Input
                id="businessDays"
                type="number"
                placeholder="10"
                value={businessDays}
                onChange={(e) => setBusinessDays(e.target.value)}
              />
            </div>
            <Button onClick={calculateEndDate} className="w-full bg-transparent" variant="outline">
              Calculate End Date
            </Button>
          </div>
        </div>

        <Button onClick={handleReset} variant="outline" className="w-full bg-transparent">
          Reset
        </Button>

        {result && (
          <div className="space-y-4">
            {result.businessDays !== undefined && (
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-border bg-card p-6 text-center">
                  <p className="mb-2 text-sm text-muted-foreground">Business Days</p>
                  <p className="text-3xl font-bold text-primary">{result.businessDays}</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-6 text-center">
                  <p className="mb-2 text-sm text-muted-foreground">Total Days</p>
                  <p className="text-2xl font-bold">{result.totalDays}</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-6 text-center">
                  <p className="mb-2 text-sm text-muted-foreground">Weekend Days</p>
                  <p className="text-2xl font-bold">{result.weekendDays}</p>
                </div>
              </div>
            )}
            {result.endDate && (
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="mb-2 text-sm text-muted-foreground">End Date</p>
                <p className="text-xl font-bold">{result.endDate}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
