"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Users, Receipt, Info, Star } from "lucide-react"

interface TipResult {
  tipAmount: number
  totalAmount: number
  perPerson: number
  tipPerPerson: number
}

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState(50)
  const [tipPercent, setTipPercent] = useState(15)
  const [people, setPeople] = useState(1)
  const [customTip, setCustomTip] = useState(false)
  const [result, setResult] = useState<TipResult | null>(null)

  const calculateTip = () => {
    const bill = billAmount
    const tip = tipPercent
    const numPeople = people

    if (bill > 0 && tip >= 0 && numPeople > 0) {
      const tipAmount = (bill * tip) / 100
      const totalAmount = bill + tipAmount
      const perPerson = totalAmount / numPeople
      const tipPerPerson = tipAmount / numPeople

      setResult({
        tipAmount,
        totalAmount,
        perPerson,
        tipPerPerson,
      })
    }
  }

  const quickTip = (percent: number) => {
    setTipPercent(percent)
    setCustomTip(false)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value)
  }

  const getServiceQuality = (percent: number) => {
    if (percent >= 20) return { label: "Excellent", color: "bg-green-500", icon: Star }
    if (percent >= 15) return { label: "Good", color: "bg-blue-500", icon: Star }
    if (percent >= 10) return { label: "Fair", color: "bg-yellow-500", icon: Star }
    return { label: "Basic", color: "bg-gray-500", icon: Star }
  }

  const getTips = () => {
    return [
      {
        title: "Standard Tipping Guidelines",
        content: "15-20% for good service at restaurants, 10-15% for adequate service, and 20%+ for exceptional service.",
      },
      {
        title: "Bar & Coffee Shop",
        content: "$1-2 per drink at bars, or 15-20% of the total. For coffee shops, $1 per drink or round up the bill.",
      },
      {
        title: "Delivery Services",
        content: "15-20% for food delivery, with a minimum of $3-5. More for bad weather or large orders.",
      },
      {
        title: "Taxi & Rideshare",
        content: "10-15% of the fare is standard. Round up to the nearest dollar for short trips.",
      },
      {
        title: "Hotel Staff",
        content: "$2-5 per bag for bellhops, $2-5 per day for housekeeping, and $5-20 for concierge services.",
      },
      {
        title: "Hair Salon & Spa",
        content: "15-20% for stylists and service providers. Tip separately if multiple people serve you.",
      },
    ]
  }

  const quality = getServiceQuality(tipPercent)
  const ServiceIcon = quality.icon

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <DollarSign className="h-8 w-8" />
        <div>
          <h1 className="text-3xl font-bold">Tip Calculator</h1>
          <p className="text-muted-foreground">Calculate tips and split bills easily</p>
        </div>
      </div>

      <Tabs defaultValue="calculate" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculate">Calculate</TabsTrigger>
          <TabsTrigger value="guide">Tipping Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="calculate" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Bill Details</CardTitle>
              <CardDescription>Adjust values using sliders or input fields</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="bill">Bill Amount</Label>
                  <span className="text-sm font-semibold">{formatCurrency(billAmount)}</span>
                </div>
                <Slider
                  id="bill"
                  min={1}
                  max={1000}
                  step={1}
                  value={[billAmount]}
                  onValueChange={(value) => setBillAmount(value[0])}
                  className="w-full"
                />
                <Input
                  type="number"
                  step="0.01"
                  value={billAmount}
                  onChange={(e) => setBillAmount(Number(e.target.value))}
                  className="h-9"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Tip Percentage</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{tipPercent}%</span>
                    <Badge variant="outline" className={quality.color}>
                      <ServiceIcon className="h-3 w-3 mr-1" />
                      {quality.label}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <Button
                    variant={tipPercent === 10 && !customTip ? "default" : "outline"}
                    size="sm"
                    onClick={() => quickTip(10)}
                  >
                    10%
                  </Button>
                  <Button
                    variant={tipPercent === 15 && !customTip ? "default" : "outline"}
                    size="sm"
                    onClick={() => quickTip(15)}
                  >
                    15%
                  </Button>
                  <Button
                    variant={tipPercent === 18 && !customTip ? "default" : "outline"}
                    size="sm"
                    onClick={() => quickTip(18)}
                  >
                    18%
                  </Button>
                  <Button
                    variant={tipPercent === 20 && !customTip ? "default" : "outline"}
                    size="sm"
                    onClick={() => quickTip(20)}
                  >
                    20%
                  </Button>
                </div>

                <Slider
                  min={0}
                  max={50}
                  step={1}
                  value={[tipPercent]}
                  onValueChange={(value) => {
                    setTipPercent(value[0])
                    setCustomTip(true)
                  }}
                  className="w-full"
                />
                <Input
                  type="number"
                  step="0.1"
                  value={tipPercent}
                  onChange={(e) => {
                    setTipPercent(Number(e.target.value))
                    setCustomTip(true)
                  }}
                  className="h-9"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="people">Number of People</Label>
                  <span className="text-sm font-semibold">{people}</span>
                </div>
                <Slider
                  id="people"
                  min={1}
                  max={20}
                  step={1}
                  value={[people]}
                  onValueChange={(value) => setPeople(value[0])}
                  className="w-full"
                />
                <Input
                  type="number"
                  value={people}
                  onChange={(e) => setPeople(Number(e.target.value))}
                  className="h-9"
                />
              </div>

              <Button onClick={calculateTip} className="w-full" size="lg">
                <Receipt className="mr-2 h-4 w-4" />
                Calculate Tip
              </Button>
            </CardContent>
          </Card>

          {result && (
            <>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Receipt className="h-5 w-5" />
                    Bill Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center p-4 bg-primary text-primary-foreground rounded-lg">
                    <div>
                      <p className="text-sm opacity-90">Total Amount</p>
                      <p className="text-xs opacity-75 mt-1">Including tip</p>
                    </div>
                    <span className="text-3xl font-bold">{formatCurrency(result.totalAmount)}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Bill Amount</p>
                      <p className="text-lg font-semibold">{formatCurrency(billAmount)}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Tip Amount</p>
                      <p className="text-lg font-semibold text-green-600">{formatCurrency(result.tipAmount)}</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tip Percentage</span>
                      <span className="font-medium">{tipPercent}%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 transition-all"
                        style={{ width: `${Math.min(tipPercent * 2, 100)}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {people > 1 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Split Between {people} People
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                      <span className="text-muted-foreground">Per Person (Total)</span>
                      <span className="text-2xl font-bold">{formatCurrency(result.perPerson)}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="p-3 border rounded-lg">
                        <p className="text-muted-foreground mb-1">Bill per person</p>
                        <p className="font-semibold">{formatCurrency(billAmount / people)}</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <p className="text-muted-foreground mb-1">Tip per person</p>
                        <p className="font-semibold text-green-600">{formatCurrency(result.tipPerPerson)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm p-2">
                    <span className="text-muted-foreground">Original bill</span>
                    <span className="font-medium">{formatCurrency(billAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm p-2">
                    <span className="text-muted-foreground">Tip ({tipPercent}%)</span>
                    <span className="font-medium text-green-600">+{formatCurrency(result.tipAmount)}</span>
                  </div>
                  {people > 1 && (
                    <>
                      <div className="flex justify-between text-sm p-2">
                        <span className="text-muted-foreground">Number of people</span>
                        <span className="font-medium">÷ {people}</span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between text-sm p-2 bg-muted rounded">
                          <span className="font-semibold">Each person pays</span>
                          <span className="font-bold">{formatCurrency(result.perPerson)}</span>
                        </div>
                      </div>
                    </>
                  )}
                  {people === 1 && (
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between text-sm p-2 bg-muted rounded">
                        <span className="font-semibold">Total to pay</span>
                        <span className="font-bold">{formatCurrency(result.totalAmount)}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="guide" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="h-5 w-5" />
                Tipping Guidelines by Service
              </CardTitle>
              <CardDescription>Standard tipping practices for various services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {getTips().map((tip, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    {tip.title}
                  </h3>
                  <p className="text-sm text-muted-foreground ml-8">{tip.content}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">General Tipping Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="p-3 border-l-4 border-primary bg-muted/50">
                <p className="font-semibold mb-1">Calculate Before Tax</p>
                <p className="text-muted-foreground">
                  When possible, calculate your tip based on the pre-tax amount for accuracy.
                </p>
              </div>
              <div className="p-3 border-l-4 border-primary bg-muted/50">
                <p className="font-semibold mb-1">Adjust for Service Quality</p>
                <p className="text-muted-foreground">
                  Exceptional service deserves more than 20%, while poor service might warrant 10-15%.
                </p>
              </div>
              <div className="p-3 border-l-4 border-primary bg-muted/50">
                <p className="font-semibold mb-1">Consider Complexity</p>
                <p className="text-muted-foreground">
                  Tip more for complicated orders, special requests, or services requiring extra effort.
                </p>
              </div>
              <div className="p-3 border-l-4 border-primary bg-muted/50">
                <p className="font-semibold mb-1">Cash is King</p>
                <p className="text-muted-foreground">
                  When possible, tip in cash to ensure the server receives it directly and immediately.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
