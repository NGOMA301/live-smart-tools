"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BinaryConverter() {
  const [value, setValue] = useState("")
  const [fromBase, setFromBase] = useState("10")
  const [result, setResult] = useState<{ binary: string; decimal: string; hexadecimal: string } | null>(null)

  const convert = (val: string, base: string) => {
    if (!val) {
      setResult(null)
      return
    }

    try {
      const decimal = Number.parseInt(val, Number.parseInt(base))
      if (isNaN(decimal)) {
        setResult(null)
        return
      }

      setResult({
        binary: decimal.toString(2),
        decimal: decimal.toString(10),
        hexadecimal: decimal.toString(16).toUpperCase(),
      })
    } catch {
      setResult(null)
    }
  }

  const handleValueChange = (val: string) => {
    setValue(val)
    convert(val, fromBase)
  }

  const handleBaseChange = (base: string) => {
    setFromBase(base)
    convert(value, base)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Number Input</CardTitle>
          <CardDescription>Enter a number to convert between bases</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              type="text"
              placeholder="Enter number"
              value={value}
              onChange={(e) => handleValueChange(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="base">From Base</Label>
            <Select value={fromBase} onValueChange={handleBaseChange}>
              <SelectTrigger id="base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">Binary (Base 2)</SelectItem>
                <SelectItem value="10">Decimal (Base 10)</SelectItem>
                <SelectItem value="16">Hexadecimal (Base 16)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Converted Values</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="text-muted-foreground">Binary</span>
              <span className="text-xl font-mono font-semibold">{result.binary}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="text-muted-foreground">Decimal</span>
              <span className="text-xl font-mono font-semibold">{result.decimal}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="text-muted-foreground">Hexadecimal</span>
              <span className="text-xl font-mono font-semibold">{result.hexadecimal}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
