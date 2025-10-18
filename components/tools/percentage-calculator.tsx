"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calculator, TrendingUp, TrendingDown, Percent, DollarSign, Users } from "lucide-react"
import { CalculatorCard } from "../tool-ui/calculator-card"

export default function PercentageCalculator() {
  const [activeCalc, setActiveCalc] = useState<string>("what-percent")
  const [result, setResult] = useState<string | null>(null)

  const [value, setValue] = useState("")
  const [total, setTotal] = useState("")
  const [percentage, setPercentage] = useState("")
  const [original, setOriginal] = useState("")
  const [newValue, setNewValue] = useState("")
  const [price, setPrice] = useState("")
  const [discount, setDiscount] = useState("")
  const [tip, setTip] = useState("")
  const [bill, setBill] = useState("")

  useEffect(() => {
    setResult(null)
    setValue("")
    setTotal("")
    setPercentage("")
    setOriginal("")
    setNewValue("")
    setPrice("")
    setDiscount("")
    setTip("")
    setBill("")
  }, [activeCalc])

  const calculatePercentage = () => {
    const val = Number.parseFloat(value)
    const tot = Number.parseFloat(total)
    if (!isNaN(val) && !isNaN(tot) && tot !== 0) {
      const percent = (val / tot) * 100
      setResult(`${percent.toFixed(2)}%`)
    }
  }

  const calculateValue = () => {
    const perc = Number.parseFloat(percentage)
    const tot = Number.parseFloat(total)
    if (!isNaN(perc) && !isNaN(tot)) {
      const val = (perc / 100) * tot
      setResult(`${val.toFixed(2)}`)
    }
  }

  const calculateIncrease = () => {
    const val = Number.parseFloat(value)
    const perc = Number.parseFloat(percentage)
    if (!isNaN(val) && !isNaN(perc)) {
      const increase = val * (perc / 100)
      const newValue = val + increase
      setResult(`${newValue.toFixed(2)} (+${increase.toFixed(2)})`)
    }
  }

  const calculateDecrease = () => {
    const val = Number.parseFloat(value)
    const perc = Number.parseFloat(percentage)
    if (!isNaN(val) && !isNaN(perc)) {
      const decrease = val * (perc / 100)
      const newValue = val - decrease
      setResult(`${newValue.toFixed(2)} (-${decrease.toFixed(2)})`)
    }
  }

  const calculatePercentChange = () => {
    const orig = Number.parseFloat(original)
    const newVal = Number.parseFloat(newValue)
    if (!isNaN(orig) && !isNaN(newVal) && orig !== 0) {
      const change = ((newVal - orig) / orig) * 100
      const changeType = change >= 0 ? "increase" : "decrease"
      setResult(`${Math.abs(change).toFixed(2)}% ${changeType}`)
    }
  }

  const calculateDiscount = () => {
    const prc = Number.parseFloat(price)
    const disc = Number.parseFloat(discount)
    if (!isNaN(prc) && !isNaN(disc)) {
      const discountAmount = prc * (disc / 100)
      const finalPrice = prc - discountAmount
      setResult(`${finalPrice.toFixed(2)} (saved ${discountAmount.toFixed(2)})`)
    }
  }

  const calculateTip = () => {
    const bll = Number.parseFloat(bill)
    const tp = Number.parseFloat(tip)
    if (!isNaN(bll) && !isNaN(tp)) {
      const tipAmount = bll * (tp / 100)
      const total = bll + tipAmount
      setResult(`Tip: ${tipAmount.toFixed(2)} | Total: ${total.toFixed(2)}`)
    }
  }

  const calculators = [
    {
      id: "what-percent",
      title: "What %?",
      icon: Percent,
      description: "X is what % of Y?",
      inputs: (
        <>
          <div>
            <Label htmlFor="value" className="text-sm">Value (X)</Label>
            <Input
              id="value"
              type="number"
              placeholder="0"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="total" className="text-sm">Total (Y)</Label>
            <Input
              id="total"
              type="number"
              placeholder="0"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              className="mt-1"
            />
          </div>
        </>
      ),
      calculate: calculatePercentage,
    },
    {
      id: "percent-of",
      title: "% Of",
      icon: Calculator,
      description: "X% of Y is?",
      inputs: (
        <>
          <div>
            <Label htmlFor="percentage" className="text-sm">Percentage (X%)</Label>
            <Input
              id="percentage"
              type="number"
              placeholder="0"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="total2" className="text-sm">Of (Y)</Label>
            <Input
              id="total2"
              type="number"
              placeholder="0"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              className="mt-1"
            />
          </div>
        </>
      ),
      calculate: calculateValue,
    },
    {
      id: "increase",
      title: "Increase",
      icon: TrendingUp,
      description: "Increase X by Y%",
      inputs: (
        <>
          <div>
            <Label htmlFor="value3" className="text-sm">Value (X)</Label>
            <Input
              id="value3"
              type="number"
              placeholder="0"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="percentage3" className="text-sm">Increase by (%)</Label>
            <Input
              id="percentage3"
              type="number"
              placeholder="0"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              className="mt-1"
            />
          </div>
        </>
      ),
      calculate: calculateIncrease,
    },
    {
      id: "decrease",
      title: "Decrease",
      icon: TrendingDown,
      description: "Decrease X by Y%",
      inputs: (
        <>
          <div>
            <Label htmlFor="value4" className="text-sm">Value (X)</Label>
            <Input
              id="value4"
              type="number"
              placeholder="0"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="percentage4" className="text-sm">Decrease by (%)</Label>
            <Input
              id="percentage4"
              type="number"
              placeholder="0"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              className="mt-1"
            />
          </div>
        </>
      ),
      calculate: calculateDecrease,
    },
    {
      id: "percent-change",
      title: "% Change",
      icon: Calculator,
      description: "% change from X to Y",
      inputs: (
        <>
          <div>
            <Label htmlFor="original" className="text-sm">Original Value</Label>
            <Input
              id="original"
              type="number"
              placeholder="0"
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="newValue" className="text-sm">New Value</Label>
            <Input
              id="newValue"
              type="number"
              placeholder="0"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="mt-1"
            />
          </div>
        </>
      ),
      calculate: calculatePercentChange,
    },
    {
      id: "discount",
      title: "Discount",
      icon: DollarSign,
      description: "Price after discount",
      inputs: (
        <>
          <div>
            <Label htmlFor="price" className="text-sm">Original Price</Label>
            <Input
              id="price"
              type="number"
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="discount" className="text-sm">Discount (%)</Label>
            <Input
              id="discount"
              type="number"
              placeholder="0"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="mt-1"
            />
          </div>
        </>
      ),
      calculate: calculateDiscount,
    },
    {
      id: "tip",
      title: "Tip",
      icon: Users,
      description: "Calculate tip amount",
      inputs: (
        <>
          <div>
            <Label htmlFor="bill" className="text-sm">Bill Amount</Label>
            <Input
              id="bill"
              type="number"
              placeholder="0"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="tip" className="text-sm">Tip (%)</Label>
            <Input
              id="tip"
              type="number"
              placeholder="15"
              value={tip}
              onChange={(e) => setTip(e.target.value)}
              className="mt-1"
            />
          </div>
        </>
      ),
      calculate: calculateTip,
    },
  ]

  const activeCalculator = calculators.find((calc) => calc.id === activeCalc)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Percentage Calculator</h1>
        <p className="text-muted-foreground">Quick and easy percentage calculations</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
        {calculators.map((calc) => (
          <CalculatorCard
            key={calc.id}
            title={calc.title}
            icon={calc.icon}
            isActive={activeCalc === calc.id}
            onClick={() => setActiveCalc(calc.id)}
          />
        ))}
      </div>

      {activeCalculator && (
        <Card className="border-2">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b">
                <activeCalculator.icon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h2 className="font-semibold">{activeCalculator.title}</h2>
                  <p className="text-sm text-muted-foreground">{activeCalculator.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeCalculator.inputs}
              </div>

              <Button onClick={activeCalculator.calculate} className="w-full" size="lg">
                Calculate
              </Button>

              {result && (
                <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Result</p>
                  <p className="text-2xl font-bold">{result}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3 text-sm">Quick Tips</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
            <div className="flex gap-2">
              <span className="font-medium">•</span>
              <span>Use "What %?" to find what percentage one number is of another</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium">•</span>
              <span>Use "% Of" to calculate a percentage of a number</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium">•</span>
              <span>Use "Increase/Decrease" to add or subtract a percentage</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium">•</span>
              <span>Use "% Change" to find percentage difference between values</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium">•</span>
              <span>Use "Discount" to calculate sale prices quickly</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium">•</span>
              <span>Use "Tip" to calculate gratuity on restaurant bills</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
