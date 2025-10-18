"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Minus, X, Divide, Calculator, Minimize2 } from "lucide-react"
import { CalculatorCard } from "../tool-ui/calculator-card"

export default function FractionCalculator() {
  const [activeCalc, setActiveCalc] = useState<string>("add")
  const [result, setResult] = useState<string | null>(null)

  const [num1, setNum1] = useState("")
  const [den1, setDen1] = useState("")
  const [num2, setNum2] = useState("")
  const [den2, setDen2] = useState("")
  const [singleNum, setSingleNum] = useState("")
  const [singleDen, setSingleDen] = useState("")
  const [decimal, setDecimal] = useState("")

  useEffect(() => {
    setResult(null)
  }, [activeCalc])

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b)
  }

  const simplifyFraction = (numerator: number, denominator: number) => {
    if (denominator === 0) return null
    const divisor = gcd(Math.abs(numerator), Math.abs(denominator))
    return {
      num: numerator / divisor,
      den: denominator / divisor,
    }
  }

  const calculateOperation = (operation: string) => {
    const n1 = Number.parseInt(num1)
    const d1 = Number.parseInt(den1)
    const n2 = Number.parseInt(num2)
    const d2 = Number.parseInt(den2)

    if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2) || d1 === 0 || d2 === 0) {
      setResult("Invalid input")
      return
    }

    let resultNum = 0
    let resultDen = 0

    switch (operation) {
      case "add":
        resultNum = n1 * d2 + n2 * d1
        resultDen = d1 * d2
        break
      case "subtract":
        resultNum = n1 * d2 - n2 * d1
        resultDen = d1 * d2
        break
      case "multiply":
        resultNum = n1 * n2
        resultDen = d1 * d2
        break
      case "divide":
        resultNum = n1 * d2
        resultDen = d1 * n2
        break
    }

    const simplified = simplifyFraction(resultNum, resultDen)
    if (!simplified) {
      setResult("Invalid result")
      return
    }
    const decimalValue = (simplified.num / simplified.den).toFixed(4)
    setResult(`${simplified.num}/${simplified.den} ≈ ${decimalValue}`)
  }

  const simplifyInput = () => {
    const n = Number.parseInt(singleNum)
    const d = Number.parseInt(singleDen)

    if (isNaN(n) || isNaN(d) || d === 0) {
      setResult("Invalid input")
      return
    }

    const simplified = simplifyFraction(n, d)
    if (!simplified) {
      setResult("Invalid result")
      return
    }
    const decimalValue = (simplified.num / simplified.den).toFixed(4)
    setResult(`${simplified.num}/${simplified.den} ≈ ${decimalValue}`)
  }

  const convertToFraction = () => {
    const dec = Number.parseFloat(decimal)
    if (isNaN(dec)) {
      setResult("Invalid input")
      return
    }

    const tolerance = 1.0e-6
    let numerator = 1
    let denominator = 1
    let error = Math.abs(dec - numerator / denominator)

    for (let d = 2; d <= 10000 && error > tolerance; d++) {
      const n = Math.round(dec * d)
      const newError = Math.abs(dec - n / d)
      if (newError < error) {
        numerator = n
        denominator = d
        error = newError
      }
    }

    const simplified = simplifyFraction(numerator, denominator)
    if (!simplified) {
      setResult("Invalid result")
      return
    }
    setResult(`${simplified.num}/${simplified.den}`)
  }

  const calculators = [
    {
      id: "add",
      title: "Add",
      icon: Plus,
      description: "Add two fractions",
      inputs: (
        <>
          <div className="space-y-2">
            <Label className="text-sm">First Fraction</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="0"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                className="text-center"
              />
              <span className="text-2xl font-light">/</span>
              <Input
                type="number"
                placeholder="0"
                value={den1}
                onChange={(e) => setDen1(e.target.value)}
                className="text-center"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Second Fraction</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="0"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                className="text-center"
              />
              <span className="text-2xl font-light">/</span>
              <Input
                type="number"
                placeholder="0"
                value={den2}
                onChange={(e) => setDen2(e.target.value)}
                className="text-center"
              />
            </div>
          </div>
        </>
      ),
      calculate: () => calculateOperation("add"),
    },
    {
      id: "subtract",
      title: "Subtract",
      icon: Minus,
      description: "Subtract two fractions",
      inputs: (
        <>
          <div className="space-y-2">
            <Label className="text-sm">First Fraction</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="0"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                className="text-center"
              />
              <span className="text-2xl font-light">/</span>
              <Input
                type="number"
                placeholder="0"
                value={den1}
                onChange={(e) => setDen1(e.target.value)}
                className="text-center"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Second Fraction</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="0"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                className="text-center"
              />
              <span className="text-2xl font-light">/</span>
              <Input
                type="number"
                placeholder="0"
                value={den2}
                onChange={(e) => setDen2(e.target.value)}
                className="text-center"
              />
            </div>
          </div>
        </>
      ),
      calculate: () => calculateOperation("subtract"),
    },
    {
      id: "multiply",
      title: "Multiply",
      icon: X,
      description: "Multiply two fractions",
      inputs: (
        <>
          <div className="space-y-2">
            <Label className="text-sm">First Fraction</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="0"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                className="text-center"
              />
              <span className="text-2xl font-light">/</span>
              <Input
                type="number"
                placeholder="0"
                value={den1}
                onChange={(e) => setDen1(e.target.value)}
                className="text-center"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Second Fraction</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="0"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                className="text-center"
              />
              <span className="text-2xl font-light">/</span>
              <Input
                type="number"
                placeholder="0"
                value={den2}
                onChange={(e) => setDen2(e.target.value)}
                className="text-center"
              />
            </div>
          </div>
        </>
      ),
      calculate: () => calculateOperation("multiply"),
    },
    {
      id: "divide",
      title: "Divide",
      icon: Divide,
      description: "Divide two fractions",
      inputs: (
        <>
          <div className="space-y-2">
            <Label className="text-sm">First Fraction</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="0"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                className="text-center"
              />
              <span className="text-2xl font-light">/</span>
              <Input
                type="number"
                placeholder="0"
                value={den1}
                onChange={(e) => setDen1(e.target.value)}
                className="text-center"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm">Second Fraction</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="0"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                className="text-center"
              />
              <span className="text-2xl font-light">/</span>
              <Input
                type="number"
                placeholder="0"
                value={den2}
                onChange={(e) => setDen2(e.target.value)}
                className="text-center"
              />
            </div>
          </div>
        </>
      ),
      calculate: () => calculateOperation("divide"),
    },
    {
      id: "simplify",
      title: "Simplify",
      icon: Minimize2,
      description: "Simplify a fraction",
      inputs: (
        <div className="space-y-2 col-span-2">
          <Label className="text-sm">Fraction to Simplify</Label>
          <div className="flex items-center gap-2 max-w-md">
            <Input
              type="number"
              placeholder="0"
              value={singleNum}
              onChange={(e) => setSingleNum(e.target.value)}
              className="text-center"
            />
            <span className="text-2xl font-light">/</span>
            <Input
              type="number"
              placeholder="0"
              value={singleDen}
              onChange={(e) => setSingleDen(e.target.value)}
              className="text-center"
            />
          </div>
        </div>
      ),
      calculate: simplifyInput,
    },
    {
      id: "convert",
      title: "Convert",
      icon: Calculator,
      description: "Convert decimal to fraction",
      inputs: (
        <div className="space-y-2 col-span-2">
          <Label className="text-sm">Decimal Number</Label>
          <Input
            type="number"
            step="0.0001"
            placeholder="0.75"
            value={decimal}
            onChange={(e) => setDecimal(e.target.value)}
            className="max-w-md"
          />
        </div>
      ),
      calculate: convertToFraction,
    },
  ]

  const activeCalculator = calculators.find((calc) => calc.id === activeCalc)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Fraction Calculator</h1>
        <p className="text-muted-foreground">Perform operations with fractions easily</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
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
              <span>All results are automatically simplified to lowest terms</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium">•</span>
              <span>Decimal approximations are shown for easy reference</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium">•</span>
              <span>Use "Simplify" to reduce any fraction to its simplest form</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium">•</span>
              <span>Convert decimals like 0.75 to fractions like 3/4</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
