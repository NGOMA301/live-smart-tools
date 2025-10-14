"use client"

import { CardContent } from "@/components/ui/card"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import { AlertDescription } from "@/components/ui/alert"

import { Alert } from "@/components/ui/alert"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import React from "react"

export default function BaseConverter() {
  const [input, setInput] = React.useState("")
  const [fromBase, setFromBase] = React.useState(10)
  const [toBase, setToBase] = React.useState(2)
  const [result, setResult] = React.useState("")
  const [error, setError] = React.useState("")

  const convert = () => {
    setError("")
    try {
      const decimal = Number.parseInt(input, fromBase)
      if (isNaN(decimal)) {
        throw new Error("Invalid input for selected base")
      }
      setResult(decimal.toString(toBase).toUpperCase())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
    }
  }

  const bases = [
    { value: 2, label: "Binary (2)" },
    { value: 8, label: "Octal (8)" },
    { value: 10, label: "Decimal (10)" },
    { value: 16, label: "Hexadecimal (16)" },
    { value: 32, label: "Base32" },
    { value: 36, label: "Base36" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fromBase">From Base</Label>
          <select
            id="fromBase"
            value={fromBase}
            onChange={(e) => setFromBase(Number.parseInt(e.target.value))}
            className="w-full h-10 rounded-md border border-input bg-background px-3"
          >
            {bases.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="toBase">To Base</Label>
          <select
            id="toBase"
            value={toBase}
            onChange={(e) => setToBase(Number.parseInt(e.target.value))}
            className="w-full h-10 rounded-md border border-input bg-background px-3"
          >
            {bases.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="input">Input Value</Label>
        <Input
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter value..."
          className="font-mono"
        />
      </div>

      <Button onClick={convert} className="w-full" disabled={!input}>
        Convert
      </Button>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-mono font-bold">{result}</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
