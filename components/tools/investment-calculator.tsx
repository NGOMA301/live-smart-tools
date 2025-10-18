"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingUp, Calendar, Repeat, Target, PiggyBank } from "lucide-react"

export default function InvestmentCalculator() {
  const [calcType, setCalcType] = useState("compound")

  const [initialInvestment, setInitialInvestment] = useState("")
  const [monthlyContribution, setMonthlyContribution] = useState("")
  const [annualReturn, setAnnualReturn] = useState("")
  const [years, setYears] = useState("")
  const [compoundFrequency, setCompoundFrequency] = useState("12")

  const [targetAmount, setTargetAmount] = useState("")
  const [timeHorizon, setTimeHorizon] = useState("")
  const [expectedReturn, setExpectedReturn] = useState("")

  const [result, setResult] = useState<any>(null)

  const calculateCompound = () => {
    const P = Number.parseFloat(initialInvestment)
    const PMT = Number.parseFloat(monthlyContribution || "0")
    const r = Number.parseFloat(annualReturn) / 100
    const n = Number.parseFloat(compoundFrequency)
    const t = Number.parseFloat(years)

    if (isNaN(P) || isNaN(r) || isNaN(n) || isNaN(t) || P < 0 || t <= 0) {
      return
    }

    const FV1 = P * Math.pow(1 + r / n, n * t)
    const monthlyRate = r / 12
    const months = t * 12
    const FV2 = PMT * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)

    const futureValue = FV1 + FV2
    const totalContributions = P + PMT * months
    const totalEarnings = futureValue - totalContributions

    setResult({
      type: "compound",
      futureValue,
      totalContributions,
      totalEarnings,
    })
  }

  const calculateRequired = () => {
    const goal = Number.parseFloat(targetAmount)
    const t = Number.parseFloat(timeHorizon)
    const r = Number.parseFloat(expectedReturn) / 100

    if (isNaN(goal) || isNaN(t) || isNaN(r) || goal <= 0 || t <= 0) {
      return
    }

    const monthlyRate = r / 12
    const months = t * 12

    const requiredMonthly = (goal * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1)

    const totalContributions = requiredMonthly * months
    const totalEarnings = goal - totalContributions

    setResult({
      type: "required",
      requiredMonthly,
      totalContributions,
      totalEarnings,
      targetAmount: goal,
    })
  }

  const calculateROI = () => {
    const initial = Number.parseFloat(initialInvestment)
    const final = Number.parseFloat(targetAmount)
    const t = Number.parseFloat(years)

    if (isNaN(initial) || isNaN(final) || isNaN(t) || initial <= 0 || final <= 0 || t <= 0) {
      return
    }

    const gain = final - initial
    const roiPercentage = (gain / initial) * 100
    const annualizedReturn = (Math.pow(final / initial, 1 / t) - 1) * 100

    setResult({
      type: "roi",
      gain,
      roiPercentage,
      annualizedReturn,
    })
  }

  const handleReset = () => {
    setInitialInvestment("")
    setMonthlyContribution("")
    setAnnualReturn("")
    setYears("")
    setTargetAmount("")
    setTimeHorizon("")
    setExpectedReturn("")
    setResult(null)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Investment Calculator</h1>
        <p className="text-muted-foreground">Plan your investment strategy and financial goals</p>
      </div>

      <Tabs value={calcType} onValueChange={(v) => { setCalcType(v); setResult(null); }}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="compound">Compound Growth</TabsTrigger>
          <TabsTrigger value="required">Required Savings</TabsTrigger>
          <TabsTrigger value="roi">ROI Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="compound">
          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="initial" className="text-sm flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      Initial Investment
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="initial"
                        type="number"
                        placeholder="10000"
                        value={initialInvestment}
                        onChange={(e) => setInitialInvestment(e.target.value)}
                        className="pl-7"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthly" className="text-sm flex items-center gap-2">
                      <Repeat className="h-4 w-4 text-muted-foreground" />
                      Monthly Contribution
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="monthly"
                        type="number"
                        placeholder="500"
                        value={monthlyContribution}
                        onChange={(e) => setMonthlyContribution(e.target.value)}
                        className="pl-7"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="return" className="text-sm flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      Expected Annual Return
                    </Label>
                    <div className="relative">
                      <Input
                        id="return"
                        type="number"
                        step="0.1"
                        placeholder="7"
                        value={annualReturn}
                        onChange={(e) => setAnnualReturn(e.target.value)}
                        className="pr-7"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="years" className="text-sm flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      Investment Period
                    </Label>
                    <div className="relative">
                      <Input
                        id="years"
                        type="number"
                        placeholder="20"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                        className="pr-16"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        years
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="compound" className="text-sm">Compound Frequency</Label>
                    <div className="grid grid-cols-4 gap-2">
                      <Button
                        type="button"
                        variant={compoundFrequency === "1" ? "default" : "outline"}
                        onClick={() => setCompoundFrequency("1")}
                        className="text-xs"
                      >
                        Annually
                      </Button>
                      <Button
                        type="button"
                        variant={compoundFrequency === "4" ? "default" : "outline"}
                        onClick={() => setCompoundFrequency("4")}
                        className="text-xs"
                      >
                        Quarterly
                      </Button>
                      <Button
                        type="button"
                        variant={compoundFrequency === "12" ? "default" : "outline"}
                        onClick={() => setCompoundFrequency("12")}
                        className="text-xs"
                      >
                        Monthly
                      </Button>
                      <Button
                        type="button"
                        variant={compoundFrequency === "365" ? "default" : "outline"}
                        onClick={() => setCompoundFrequency("365")}
                        className="text-xs"
                      >
                        Daily
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={calculateCompound} className="flex-1" size="lg">
                    Calculate Growth
                  </Button>
                  <Button onClick={handleReset} variant="outline" size="lg">
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="required">
          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="target" className="text-sm flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      Target Amount
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="target"
                        type="number"
                        placeholder="1000000"
                        value={targetAmount}
                        onChange={(e) => setTargetAmount(e.target.value)}
                        className="pl-7"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-sm flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      Time Horizon
                    </Label>
                    <div className="relative">
                      <Input
                        id="time"
                        type="number"
                        placeholder="25"
                        value={timeHorizon}
                        onChange={(e) => setTimeHorizon(e.target.value)}
                        className="pr-16"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        years
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="expected" className="text-sm flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      Expected Annual Return
                    </Label>
                    <div className="relative max-w-sm">
                      <Input
                        id="expected"
                        type="number"
                        step="0.1"
                        placeholder="7"
                        value={expectedReturn}
                        onChange={(e) => setExpectedReturn(e.target.value)}
                        className="pr-7"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={calculateRequired} className="flex-1" size="lg">
                    Calculate Required Savings
                  </Button>
                  <Button onClick={handleReset} variant="outline" size="lg">
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roi">
          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="initial-roi" className="text-sm flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      Initial Investment
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="initial-roi"
                        type="number"
                        placeholder="10000"
                        value={initialInvestment}
                        onChange={(e) => setInitialInvestment(e.target.value)}
                        className="pl-7"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="final" className="text-sm flex items-center gap-2">
                      <PiggyBank className="h-4 w-4 text-muted-foreground" />
                      Final Value
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="final"
                        type="number"
                        placeholder="15000"
                        value={targetAmount}
                        onChange={(e) => setTargetAmount(e.target.value)}
                        className="pl-7"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="years-roi" className="text-sm flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      Investment Period
                    </Label>
                    <div className="relative max-w-sm">
                      <Input
                        id="years-roi"
                        type="number"
                        placeholder="5"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                        className="pr-16"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        years
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={calculateROI} className="flex-1" size="lg">
                    Calculate ROI
                  </Button>
                  <Button onClick={handleReset} variant="outline" size="lg">
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {result && result.type === "compound" && (
        <div className="space-y-4">
          <Card className="bg-primary/5 border-2 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Future Value</p>
                <p className="text-4xl font-bold">${result.futureValue.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card>
              <CardContent className="pt-5 pb-5">
                <p className="text-sm text-muted-foreground mb-1">Total Contributions</p>
                <p className="text-2xl font-bold">${result.totalContributions.toFixed(2)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-5 pb-5">
                <p className="text-sm text-muted-foreground mb-1">Total Earnings</p>
                <p className="text-2xl font-bold text-green-600">${result.totalEarnings.toFixed(2)}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {result && result.type === "required" && (
        <div className="space-y-4">
          <Card className="bg-primary/5 border-2 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Required Monthly Savings</p>
                <p className="text-4xl font-bold">${result.requiredMonthly.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Card>
              <CardContent className="pt-5 pb-5">
                <p className="text-sm text-muted-foreground mb-1">Target Amount</p>
                <p className="text-xl font-bold">${result.targetAmount.toFixed(2)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-5 pb-5">
                <p className="text-sm text-muted-foreground mb-1">Total Contributions</p>
                <p className="text-xl font-bold">${result.totalContributions.toFixed(2)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-5 pb-5">
                <p className="text-sm text-muted-foreground mb-1">Expected Earnings</p>
                <p className="text-xl font-bold text-green-600">${result.totalEarnings.toFixed(2)}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {result && result.type === "roi" && (
        <div className="space-y-4">
          <Card className="bg-primary/5 border-2 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Total Return on Investment</p>
                <p className="text-4xl font-bold">{result.roiPercentage.toFixed(2)}%</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card>
              <CardContent className="pt-5 pb-5">
                <p className="text-sm text-muted-foreground mb-1">Total Gain</p>
                <p className="text-2xl font-bold text-green-600">${result.gain.toFixed(2)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-5 pb-5">
                <p className="text-sm text-muted-foreground mb-1">Annualized Return</p>
                <p className="text-2xl font-bold">{result.annualizedReturn.toFixed(2)}%</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3 text-sm">Investment Tips</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
            <div className="flex gap-2">
              <span className="font-medium">•</span>
              <span>Start investing early to maximize compound growth over time</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium">•</span>
              <span>Regular monthly contributions can significantly boost your returns</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium">•</span>
              <span>Historical stock market returns average 7-10% annually</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium">•</span>
              <span>Diversification helps manage risk in your investment portfolio</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
