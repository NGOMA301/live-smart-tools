"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const conversions = {
  length: {
    name: "Length",
    units: {
      meter: { name: "Meter", toBase: 1 },
      kilometer: { name: "Kilometer", toBase: 1000 },
      centimeter: { name: "Centimeter", toBase: 0.01 },
      millimeter: { name: "Millimeter", toBase: 0.001 },
      mile: { name: "Mile", toBase: 1609.34 },
      yard: { name: "Yard", toBase: 0.9144 },
      foot: { name: "Foot", toBase: 0.3048 },
      inch: { name: "Inch", toBase: 0.0254 },
    },
  },
  weight: {
    name: "Weight",
    units: {
      kilogram: { name: "Kilogram", toBase: 1 },
      gram: { name: "Gram", toBase: 0.001 },
      milligram: { name: "Milligram", toBase: 0.000001 },
      pound: { name: "Pound", toBase: 0.453592 },
      ounce: { name: "Ounce", toBase: 0.0283495 },
      ton: { name: "Ton", toBase: 1000 },
    },
  },
  volume: {
    name: "Volume",
    units: {
      liter: { name: "Liter", toBase: 1 },
      milliliter: { name: "Milliliter", toBase: 0.001 },
      gallon: { name: "Gallon", toBase: 3.78541 },
      quart: { name: "Quart", toBase: 0.946353 },
      pint: { name: "Pint", toBase: 0.473176 },
      cup: { name: "Cup", toBase: 0.236588 },
    },
  },
}

export default function UnitConverter() {
  const [category, setCategory] = useState<keyof typeof conversions>("length")
  const [value, setValue] = useState("")
  const [fromUnit, setFromUnit] = useState("meter")
  const [toUnit, setToUnit] = useState("kilometer")
  const [result, setResult] = useState<number | null>(null)

  const convert = (val: string, from: string, to: string, cat: keyof typeof conversions) => {
    const num = Number.parseFloat(val)
    if (isNaN(num)) {
      setResult(null)
      return
    }

    const fromFactor = conversions[cat].units[from as keyof (typeof conversions)[typeof cat]["units"]].toBase
    const toFactor = conversions[cat].units[to as keyof (typeof conversions)[typeof cat]["units"]].toBase
    const converted = (num * fromFactor) / toFactor
    setResult(converted)
  }

  const handleValueChange = (val: string) => {
    setValue(val)
    convert(val, fromUnit, toUnit, category)
  }

  const handleCategoryChange = (cat: string) => {
    const newCategory = cat as keyof typeof conversions
    setCategory(newCategory)
    const units = Object.keys(conversions[newCategory].units)
    setFromUnit(units[0])
    setToUnit(units[1])
    setValue("")
    setResult(null)
  }

  const handleFromUnitChange = (unit: string) => {
    setFromUnit(unit)
    convert(value, unit, toUnit, category)
  }

  const handleToUnitChange = (unit: string) => {
    setToUnit(unit)
    convert(value, fromUnit, unit, category)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Unit Conversion</CardTitle>
          <CardDescription>Convert between different units of measurement</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(conversions).map(([key, val]) => (
                  <SelectItem key={key} value={key}>
                    {val.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              type="number"
              step="0.01"
              placeholder="Enter value"
              value={value}
              onChange={(e) => handleValueChange(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from">From</Label>
              <Select value={fromUnit} onValueChange={handleFromUnitChange}>
                <SelectTrigger id="from">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(conversions[category].units).map(([key, val]) => (
                    <SelectItem key={key} value={key}>
                      {val.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Select value={toUnit} onValueChange={handleToUnitChange}>
                <SelectTrigger id="to">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(conversions[category].units).map(([key, val]) => (
                    <SelectItem key={key} value={key}>
                      {val.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {result !== null && (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="text-muted-foreground">Converted Value</span>
              <span className="text-2xl font-bold">
                {result.toFixed(4)}{" "}
                {conversions[category].units[toUnit as keyof (typeof conversions)[typeof category]["units"]].name}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
