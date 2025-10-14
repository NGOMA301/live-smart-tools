"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("")
  const [rate, setRate] = useState("")
  const [time, setTime] = useState("")
  const [compound, setCompound] = useState("12")
  const [contribution, setContribution] = useState("")
  const [result, setResult] = useState<{
    futureValue: number
    totalContributions: number
    totalInterest: number
  } | null>(null)

  const calculateCompoundInterest = () => {
    const P = Number.parseFloat(principal)
    const r = Number.parseFloat(rate) / 100
    const t = Number.parseFloat(time)
    const n = Number.parseFloat(compound)
    const PMT = Number.parseFloat(contribution || "0")

    // Compound interest formula: A = P(1 + r/n)^(nt)
    const A = P * Math.pow(1 + r / n, n * t)

    // Future value of series (monthly contributions)
    const monthlyRate = r / 12
    const months = t * 12
    const FV = PMT * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)

    const futureValue = A + FV
    const totalContributions = P + PMT * months
    const totalInterest = futureValue - totalContributions

    setResult({
      futureValue,
      totalContributions,
      totalInterest,
    })
  }

  const handleReset = () => {
    setPrincipal("")
    setRate("")
    setTime("")
    setContribution("")
    setResult(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compound Interest Calculator</CardTitle>
        <CardDescription>Calculate compound interest and investment growth</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="principal">Initial Amount ($)</Label>
            <Input
              id="principal"
              type="number"
              placeholder="10000"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate">Annual Interest Rate (%)</Label>
            <Input
              id="rate"
              type="number"
              step="0.1"
              placeholder="5"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time Period (years)</Label>
            <Input id="time" type="number" placeholder="10" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="compound">Compound Frequency</Label>
            <Select value={compound} onValueChange={setCompound}>
              <SelectTrigger id="compound">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Annually</SelectItem>
                <SelectItem value="2">Semi-annually</SelectItem>
                <SelectItem value="4">Quarterly</SelectItem>
                <SelectItem value="12">Monthly</SelectItem>
                <SelectItem value="365">Daily</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contribution">Monthly Contribution ($)</Label>
            <Input
              id="contribution"
              type="number"
              placeholder="100"
              value={contribution}
              onChange={(e) => setContribution(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculateCompoundInterest} className="flex-1">
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
              <p className="mb-2 text-sm text-muted-foreground">Total Interest Earned</p>
              <p className="text-2xl font-bold text-green-600">${result.totalInterest.toFixed(2)}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
