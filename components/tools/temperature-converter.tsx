"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TemperatureConverter() {
  const [value, setValue] = useState("")
  const [fromUnit, setFromUnit] = useState("celsius")
  const [result, setResult] = useState<{ celsius: number; fahrenheit: number; kelvin: number } | null>(null)

  const convert = (val: string, from: string) => {
    const num = Number.parseFloat(val)
    if (isNaN(num)) {
      setResult(null)
      return
    }

    let celsius: number
    switch (from) {
      case "celsius":
        celsius = num
        break
      case "fahrenheit":
        celsius = (num - 32) * (5 / 9)
        break
      case "kelvin":
        celsius = num - 273.15
        break
      default:
        celsius = num
    }

    setResult({
      celsius,
      fahrenheit: (celsius * 9) / 5 + 32,
      kelvin: celsius + 273.15,
    })
  }

  const handleValueChange = (val: string) => {
    setValue(val)
    convert(val, fromUnit)
  }

  const handleUnitChange = (unit: string) => {
    setFromUnit(unit)
    convert(value, unit)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Temperature Input</CardTitle>
          <CardDescription>Enter a temperature value to convert</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              type="number"
              step="0.01"
              placeholder="0"
              value={value}
              onChange={(e) => handleValueChange(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unit">From Unit</Label>
            <Select value={fromUnit} onValueChange={handleUnitChange}>
              <SelectTrigger id="unit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="celsius">Celsius (°C)</SelectItem>
                <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                <SelectItem value="kelvin">Kelvin (K)</SelectItem>
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
              <span className="text-muted-foreground">Celsius</span>
              <span className="text-xl font-semibold">{result.celsius.toFixed(2)}°C</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="text-muted-foreground">Fahrenheit</span>
              <span className="text-xl font-semibold">{result.fahrenheit.toFixed(2)}°F</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="text-muted-foreground">Kelvin</span>
              <span className="text-xl font-semibold">{result.kelvin.toFixed(2)}K</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
