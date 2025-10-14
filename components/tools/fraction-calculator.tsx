"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FractionCalculator() {
  const [num1, setNum1] = useState("")
  const [den1, setDen1] = useState("")
  const [num2, setNum2] = useState("")
  const [den2, setDen2] = useState("")
  const [operation, setOperation] = useState("add")
  const [result, setResult] = useState<string | null>(null)

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b)
  }

  const simplifyFraction = (numerator: number, denominator: number) => {
    const divisor = gcd(Math.abs(numerator), Math.abs(denominator))
    return {
      num: numerator / divisor,
      den: denominator / divisor,
    }
  }

  const calculate = () => {
    const n1 = Number.parseInt(num1)
    const d1 = Number.parseInt(den1)
    const n2 = Number.parseInt(num2)
    const d2 = Number.parseInt(den2)

    if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2) || d1 === 0 || d2 === 0) {
      setResult("Invalid input. Denominators cannot be zero.")
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
    const decimal = (simplified.num / simplified.den).toFixed(4)

    setResult(`${simplified.num}/${simplified.den} = ${decimal}`)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Fraction Calculator</CardTitle>
          <CardDescription>Add, subtract, multiply, and divide fractions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>First Fraction</Label>
              <div className="flex items-center gap-2">
                <Input type="number" placeholder="Numerator" value={num1} onChange={(e) => setNum1(e.target.value)} />
                <span className="text-2xl">/</span>
                <Input type="number" placeholder="Denominator" value={den1} onChange={(e) => setDen1(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Second Fraction</Label>
              <div className="flex items-center gap-2">
                <Input type="number" placeholder="Numerator" value={num2} onChange={(e) => setNum2(e.target.value)} />
                <span className="text-2xl">/</span>
                <Input type="number" placeholder="Denominator" value={den2} onChange={(e) => setDen2(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Operation</Label>
            <Select value={operation} onValueChange={setOperation}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add">Add (+)</SelectItem>
                <SelectItem value="subtract">Subtract (-)</SelectItem>
                <SelectItem value="multiply">Multiply (×)</SelectItem>
                <SelectItem value="divide">Divide (÷)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={calculate} className="w-full">
            Calculate
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-primary/5">
          <CardContent className="pt-6">
            <p className="text-lg font-semibold text-center">{result}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
