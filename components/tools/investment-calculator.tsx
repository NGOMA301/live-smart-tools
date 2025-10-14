"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function InvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] = useState("")
  const [monthlyContribution, setMonthlyContribution] = useState("")
  const [annualReturn, setAnnualReturn] = useState("")
  const [years, setYears] = useState("")
  const [compoundFrequency, setCompoundFrequency] = useState("12")
  const [result, setResult] = useState<{
    futureValue: number
    totalContributions: number
    totalEarnings: number
  } | null>(null)

  const calculateInvestment = () => {
    const P = Number.parseFloat(initialInvestment)
    const PMT = Number.parseFloat(monthlyContribution || "0")
    const r = Number.parseFloat(annualReturn) / 100
    const n = Number.parseFloat(compoundFrequency)
    const t = Number.parseFloat(years)

    // Future value of initial investment
    const FV1 = P * Math.pow(1 + r / n, n * t)

    // Future value of monthly contributions
    const monthlyRate = r / 12
    const months = t * 12
    const FV2 = PMT * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)

    const futureValue = FV1 + FV2
    const totalContributions = P + PMT * months
    const totalEarnings = futureValue - totalContributions

    setResult({
      futureValue,
      totalContributions,
      totalEarnings,
    })
  }

  const handleReset = () => {
    setInitialInvestment("")
    setMonthlyContribution("")
    setAnnualReturn("")
    setYears("")
    setResult(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Calculator</CardTitle>
        <CardDescription>Calculate investment returns and growth</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="initial">Initial Investment ($)</Label>
            <Input
              id="initial"
              type="number"
              placeholder="10000"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthly">Monthly Contribution ($)</Label>
            <Input
              id="monthly"
              type="number"
              placeholder="500"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="return">Expected Annual Return (%)</Label>
            <Input
              id="return"
              type="number"
              step="0.1"
              placeholder="7"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="years">Investment Period (years)</Label>
            <Input id="years" type="number" placeholder="20" value={years} onChange={(e) => setYears(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="compound">Compound Frequency</Label>
            <Select value={compoundFrequency} onValueChange={setCompoundFrequency}>
              <SelectTrigger id="compound">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Annually</SelectItem>
                <SelectItem value="4">Quarterly</SelectItem>
                <SelectItem value="12">Monthly</SelectItem>
                <SelectItem value="365">Daily</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculateInvestment} className="flex-1">
            Calculate
          </Button>
          <Button onClick={handleReset} variant="outline">
            Reset
          </Button>
        </div>

        {result && (
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <p className="mb-2 text-sm text-muted-foreground">Future Value</p>
              <p className="text-3xl font-bold text-primary">${result.futureValue.toFixed(2)}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <p className="mb-2 text-sm text-muted-foreground">Total Contributions</p>
              <p className="text-2xl font-bold">${result.totalContributions.toFixed(2)}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <p className="mb-2 text-sm text-muted-foreground">Total Earnings</p>
              <p className="text-2xl font-bold text-green-600">${result.totalEarnings.toFixed(2)}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
