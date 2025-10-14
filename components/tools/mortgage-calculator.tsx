"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState("")
  const [interestRate, setInterestRate] = useState("")
  const [loanTerm, setLoanTerm] = useState("")
  const [propertyTax, setPropertyTax] = useState("")
  const [insurance, setInsurance] = useState("")
  const [result, setResult] = useState<{
    monthlyPayment: number
    totalPayment: number
    totalInterest: number
    monthlyWithTaxInsurance: number
  } | null>(null)

  const calculateMortgage = () => {
    const principal = Number.parseFloat(loanAmount)
    const rate = Number.parseFloat(interestRate) / 100 / 12
    const payments = Number.parseFloat(loanTerm) * 12
    const tax = Number.parseFloat(propertyTax || "0") / 12
    const ins = Number.parseFloat(insurance || "0") / 12

    const monthlyPayment = (principal * rate * Math.pow(1 + rate, payments)) / (Math.pow(1 + rate, payments) - 1)
    const totalPayment = monthlyPayment * payments
    const totalInterest = totalPayment - principal
    const monthlyWithTaxInsurance = monthlyPayment + tax + ins

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
      monthlyWithTaxInsurance,
    })
  }

  const handleReset = () => {
    setLoanAmount("")
    setInterestRate("")
    setLoanTerm("")
    setPropertyTax("")
    setInsurance("")
    setResult(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mortgage Calculator</CardTitle>
        <CardDescription>Calculate monthly mortgage payments and amortization</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="loan-amount">Loan Amount ($)</Label>
            <Input
              id="loan-amount"
              type="number"
              placeholder="300000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interest-rate">Interest Rate (%)</Label>
            <Input
              id="interest-rate"
              type="number"
              step="0.01"
              placeholder="3.5"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="loan-term">Loan Term (years)</Label>
            <Input
              id="loan-term"
              type="number"
              placeholder="30"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="property-tax">Annual Property Tax ($)</Label>
            <Input
              id="property-tax"
              type="number"
              placeholder="3000"
              value={propertyTax}
              onChange={(e) => setPropertyTax(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="insurance">Annual Insurance ($)</Label>
            <Input
              id="insurance"
              type="number"
              placeholder="1200"
              value={insurance}
              onChange={(e) => setInsurance(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculateMortgage} className="flex-1">
            Calculate
          </Button>
          <Button onClick={handleReset} variant="outline">
            Reset
          </Button>
        </div>

        {result && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="mb-2 text-sm text-muted-foreground">Monthly Payment (P&I)</p>
              <p className="text-3xl font-bold">${result.monthlyPayment.toFixed(2)}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="mb-2 text-sm text-muted-foreground">Monthly with Tax & Insurance</p>
              <p className="text-3xl font-bold">${result.monthlyWithTaxInsurance.toFixed(2)}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="mb-2 text-sm text-muted-foreground">Total Payment</p>
              <p className="text-2xl font-bold">${result.totalPayment.toFixed(2)}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="mb-2 text-sm text-muted-foreground">Total Interest</p>
              <p className="text-2xl font-bold">${result.totalInterest.toFixed(2)}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
