"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Home, DollarSign, Calendar, TrendingUp, Building, Shield } from "lucide-react"

export default function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState("")
  const [interestRate, setInterestRate] = useState("")
  const [loanTerm, setLoanTerm] = useState("")
  const [propertyTax, setPropertyTax] = useState("")
  const [insurance, setInsurance] = useState("")
  const [hoa, setHoa] = useState("")
  const [downPayment, setDownPayment] = useState("")
  const [result, setResult] = useState<{
    monthlyPayment: number
    totalPayment: number
    totalInterest: number
    monthlyWithExtras: number
    principalAndInterest: number
    monthlyTax: number
    monthlyInsurance: number
    monthlyHoa: number
  } | null>(null)

  const calculateMortgage = () => {
    const homePrice = Number.parseFloat(loanAmount)
    const down = Number.parseFloat(downPayment || "0")
    const principal = homePrice - down
    const rate = Number.parseFloat(interestRate) / 100 / 12
    const payments = Number.parseFloat(loanTerm) * 12
    const tax = Number.parseFloat(propertyTax || "0") / 12
    const ins = Number.parseFloat(insurance || "0") / 12
    const hoaFee = Number.parseFloat(hoa || "0")

    if (isNaN(principal) || isNaN(rate) || isNaN(payments) || principal <= 0 || rate <= 0 || payments <= 0) {
      return
    }

    const monthlyPayment = (principal * rate * Math.pow(1 + rate, payments)) / (Math.pow(1 + rate, payments) - 1)
    const totalPayment = monthlyPayment * payments
    const totalInterest = totalPayment - principal
    const monthlyWithExtras = monthlyPayment + tax + ins + hoaFee

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
      monthlyWithExtras,
      principalAndInterest: monthlyPayment,
      monthlyTax: tax,
      monthlyInsurance: ins,
      monthlyHoa: hoaFee,
    })
  }

  const handleReset = () => {
    setLoanAmount("")
    setInterestRate("")
    setLoanTerm("")
    setPropertyTax("")
    setInsurance("")
    setHoa("")
    setDownPayment("")
    setResult(null)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Mortgage Calculator</h1>
        <p className="text-muted-foreground">Calculate your monthly mortgage payment and total costs</p>
      </div>

      <Card className="border-2">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loan-amount" className="text-sm flex items-center gap-2">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  Home Price
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="loan-amount"
                    type="number"
                    placeholder="300000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="pl-7"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="down-payment" className="text-sm flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  Down Payment
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="down-payment"
                    type="number"
                    placeholder="60000"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                    className="pl-7"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interest-rate" className="text-sm flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  Interest Rate
                </Label>
                <div className="relative">
                  <Input
                    id="interest-rate"
                    type="number"
                    step="0.01"
                    placeholder="6.5"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="pr-7"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="loan-term" className="text-sm flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Loan Term
                </Label>
                <div className="relative">
                  <Input
                    id="loan-term"
                    type="number"
                    placeholder="30"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    className="pr-16"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                    years
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="property-tax" className="text-sm flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  Annual Property Tax
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="property-tax"
                    type="number"
                    placeholder="3600"
                    value={propertyTax}
                    onChange={(e) => setPropertyTax(e.target.value)}
                    className="pl-7"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="insurance" className="text-sm flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  Annual Insurance
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="insurance"
                    type="number"
                    placeholder="1200"
                    value={insurance}
                    onChange={(e) => setInsurance(e.target.value)}
                    className="pl-7"
                  />
                </div>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="hoa" className="text-sm flex items-center gap-2">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  Monthly HOA Fee
                </Label>
                <div className="relative max-w-sm">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="hoa"
                    type="number"
                    placeholder="0"
                    value={hoa}
                    onChange={(e) => setHoa(e.target.value)}
                    className="pl-7"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculateMortgage} className="flex-1" size="lg">
                Calculate Payment
              </Button>
              <Button onClick={handleReset} variant="outline" size="lg">
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-4">
          <Card className="bg-primary/5 border-2 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Total Monthly Payment</p>
                <p className="text-4xl font-bold">${result.monthlyWithExtras.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Card>
              <CardContent className="pt-4 pb-4">
                <p className="text-xs text-muted-foreground mb-1">P&I</p>
                <p className="text-lg font-bold">${result.principalAndInterest.toFixed(2)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-4">
                <p className="text-xs text-muted-foreground mb-1">Property Tax</p>
                <p className="text-lg font-bold">${result.monthlyTax.toFixed(2)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-4">
                <p className="text-xs text-muted-foreground mb-1">Insurance</p>
                <p className="text-lg font-bold">${result.monthlyInsurance.toFixed(2)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4 pb-4">
                <p className="text-xs text-muted-foreground mb-1">HOA</p>
                <p className="text-lg font-bold">${result.monthlyHoa.toFixed(2)}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card>
              <CardContent className="pt-5 pb-5">
                <p className="text-sm text-muted-foreground mb-1">Total Payment</p>
                <p className="text-2xl font-bold">${result.totalPayment.toFixed(2)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-5 pb-5">
                <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
                <p className="text-2xl font-bold">${result.totalInterest.toFixed(2)}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3 text-sm">Quick Tips</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
            <div className="flex gap-2">
              <span className="font-medium">•</span>
              <span>A larger down payment reduces monthly payments and total interest</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium">•</span>
              <span>Lower interest rates can save thousands over the loan term</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium">•</span>
              <span>Shorter loan terms mean higher monthly payments but less total interest</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium">•</span>
              <span>Include property tax, insurance, and HOA for accurate budgeting</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
