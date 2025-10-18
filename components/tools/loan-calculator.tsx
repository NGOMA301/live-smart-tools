"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, TrendingUp, PiggyBank, Info } from "lucide-react"

interface LoanResult {
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
  principalPercentage: number
  interestPercentage: number
}

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState(50000)
  const [rate, setRate] = useState(5.5)
  const [years, setYears] = useState(30)
  const [loanType, setLoanType] = useState("mortgage")
  const [result, setResult] = useState<LoanResult | null>(null)

  const calculateLoan = () => {
    const p = principal
    const r = rate / 100 / 12
    const n = years * 12

    if (p > 0 && r > 0 && n > 0) {
      const monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      const totalPayment = monthlyPayment * n
      const totalInterest = totalPayment - p

      setResult({
        monthlyPayment,
        totalPayment,
        totalInterest,
        principalPercentage: (p / totalPayment) * 100,
        interestPercentage: (totalInterest / totalPayment) * 100,
      })
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value)
  }

  const getTips = () => {
    const tips = []

    if (rate > 7) {
      tips.push("Your interest rate is high. Consider improving your credit score or shopping for better rates.")
    }

    if (years > 15) {
      tips.push("Shorter loan terms typically have lower interest rates and less total interest paid.")
    }

    if (result && result.monthlyPayment > principal * 0.01) {
      tips.push(
        "Your monthly payment is relatively high. Consider a longer term or larger down payment to reduce monthly costs."
      )
    }

    if (result && result.totalInterest > principal * 0.5) {
      tips.push(
        "You'll pay over 50% of your loan amount in interest. Extra payments can significantly reduce this."
      )
    }

    tips.push("Making extra payments toward principal can save thousands in interest over the loan term.")
    tips.push("Always compare rates from multiple lenders before committing to a loan.")

    return tips
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="h-8 w-8" />
        <div>
          <h1 className="text-3xl font-bold">Loan Calculator</h1>
          <p className="text-muted-foreground">Calculate your loan payments and compare options</p>
        </div>
      </div>

      <Tabs defaultValue="calculate" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculate">Calculate</TabsTrigger>
          <TabsTrigger value="tips">Tips & Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="calculate" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Loan Details</CardTitle>
              <CardDescription>Adjust the values using sliders or input fields</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="loanType">Loan Type</Label>
                <Select value={loanType} onValueChange={setLoanType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mortgage">Mortgage</SelectItem>
                    <SelectItem value="auto">Auto Loan</SelectItem>
                    <SelectItem value="personal">Personal Loan</SelectItem>
                    <SelectItem value="student">Student Loan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="principal">Loan Amount</Label>
                  <span className="text-sm font-semibold">{formatCurrency(principal)}</span>
                </div>
                <Slider
                  id="principal"
                  min={1000}
                  max={1000000}
                  step={1000}
                  value={[principal]}
                  onValueChange={(value) => setPrincipal(value[0])}
                  className="w-full"
                />
                <Input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="h-9"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="rate">Annual Interest Rate</Label>
                  <span className="text-sm font-semibold">{rate.toFixed(2)}%</span>
                </div>
                <Slider
                  id="rate"
                  min={0.1}
                  max={20}
                  step={0.1}
                  value={[rate]}
                  onValueChange={(value) => setRate(value[0])}
                  className="w-full"
                />
                <Input
                  type="number"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="h-9"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="years">Loan Term</Label>
                  <span className="text-sm font-semibold">{years} years</span>
                </div>
                <Slider
                  id="years"
                  min={1}
                  max={40}
                  step={1}
                  value={[years]}
                  onValueChange={(value) => setYears(value[0])}
                  className="w-full"
                />
                <Input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="h-9"
                />
              </div>

              <Button onClick={calculateLoan} className="w-full" size="lg">
                <Calculator className="mr-2 h-4 w-4" />
                Calculate Payment
              </Button>
            </CardContent>
          </Card>

          {result && (
            <>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Payment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-primary text-primary-foreground rounded-lg">
                    <span className="text-sm font-medium">Monthly Payment</span>
                    <span className="text-2xl font-bold">{formatCurrency(result.monthlyPayment)}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Total Payment</p>
                      <p className="text-lg font-semibold">{formatCurrency(result.totalPayment)}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
                      <p className="text-lg font-semibold">{formatCurrency(result.totalInterest)}</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Principal</span>
                      <span className="font-medium">{result.principalPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${result.principalPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Interest</span>
                      <span className="font-medium">{result.interestPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-muted-foreground transition-all"
                        style={{ width: `${result.interestPercentage}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <PiggyBank className="h-5 w-5" />
                    Quick Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-3 border rounded-lg">
                      <p className="text-muted-foreground mb-1">Daily Cost</p>
                      <p className="font-semibold">{formatCurrency(result.monthlyPayment / 30)}</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-muted-foreground mb-1">Weekly Cost</p>
                      <p className="font-semibold">{formatCurrency((result.monthlyPayment * 12) / 52)}</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-muted-foreground mb-1">Annual Cost</p>
                      <p className="font-semibold">{formatCurrency(result.monthlyPayment * 12)}</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-muted-foreground mb-1">Payments</p>
                      <p className="font-semibold">{years * 12} months</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="tips" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="h-5 w-5" />
                Smart Tips for Your Loan
              </CardTitle>
              <CardDescription>Personalized advice based on your loan details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {getTips().map((tip, index) => (
                <div key={index} className="flex gap-3 p-3 bg-muted rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <p className="text-sm">{tip}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">General Tips for Managing Your Loan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="p-3 border-l-4 border-primary bg-muted/50">
                <p className="font-semibold mb-1">Pay More Than the Minimum</p>
                <p className="text-muted-foreground">
                  Even small extra payments can reduce your loan term by years and save thousands in interest.
                </p>
              </div>
              <div className="p-3 border-l-4 border-primary bg-muted/50">
                <p className="font-semibold mb-1">Make Bi-Weekly Payments</p>
                <p className="text-muted-foreground">
                  Paying half your monthly payment every two weeks results in one extra payment per year.
                </p>
              </div>
              <div className="p-3 border-l-4 border-primary bg-muted/50">
                <p className="font-semibold mb-1">Refinance When Rates Drop</p>
                <p className="text-muted-foreground">
                  Monitor interest rates and consider refinancing if you can get a rate 1% or more lower.
                </p>
              </div>
              <div className="p-3 border-l-4 border-primary bg-muted/50">
                <p className="font-semibold mb-1">Avoid Unnecessary Fees</p>
                <p className="text-muted-foreground">
                  Read the fine print and negotiate to eliminate origination fees, prepayment penalties, and other charges.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
