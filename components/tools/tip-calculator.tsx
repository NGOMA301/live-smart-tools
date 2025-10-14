"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState("")
  const [tipPercent, setTipPercent] = useState("15")
  const [people, setPeople] = useState("1")
  const [result, setResult] = useState<{
    tipAmount: number
    totalAmount: number
    perPerson: number
  } | null>(null)

  const calculateTip = () => {
    const bill = Number.parseFloat(billAmount)
    const tip = Number.parseFloat(tipPercent)
    const numPeople = Number.parseInt(people)

    if (bill > 0 && tip >= 0 && numPeople > 0) {
      const tipAmount = (bill * tip) / 100
      const totalAmount = bill + tipAmount
      const perPerson = totalAmount / numPeople

      setResult({
        tipAmount,
        totalAmount,
        perPerson,
      })
    }
  }

  const quickTip = (percent: number) => {
    setTipPercent(percent.toString())
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bill Details</CardTitle>
          <CardDescription>Enter your bill information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bill">Bill Amount ($)</Label>
            <Input
              id="bill"
              type="number"
              step="0.01"
              placeholder="50.00"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tip">Tip Percentage (%)</Label>
            <Input
              id="tip"
              type="number"
              step="0.1"
              placeholder="15"
              value={tipPercent}
              onChange={(e) => setTipPercent(e.target.value)}
            />
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm" onClick={() => quickTip(10)}>
                10%
              </Button>
              <Button variant="outline" size="sm" onClick={() => quickTip(15)}>
                15%
              </Button>
              <Button variant="outline" size="sm" onClick={() => quickTip(18)}>
                18%
              </Button>
              <Button variant="outline" size="sm" onClick={() => quickTip(20)}>
                20%
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="people">Number of People</Label>
            <Input
              id="people"
              type="number"
              placeholder="1"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
            />
          </div>
          <Button onClick={calculateTip} className="w-full">
            Calculate
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Bill Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="text-muted-foreground">Tip Amount</span>
              <span className="text-2xl font-bold">${result.tipAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="text-muted-foreground">Total Amount</span>
              <span className="text-xl font-semibold">${result.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="text-muted-foreground">Per Person</span>
              <span className="text-xl font-semibold">${result.perPerson.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
