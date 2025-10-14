"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export default function RandomNumber() {
  const [min, setMin] = useState("1")
  const [max, setMax] = useState("100")
  const [count, setCount] = useState("1")
  const [allowDuplicates, setAllowDuplicates] = useState(true)
  const [results, setResults] = useState<number[]>([])

  const generateNumbers = () => {
    const minNum = Number.parseInt(min)
    const maxNum = Number.parseInt(max)
    const countNum = Number.parseInt(count)

    if (isNaN(minNum) || isNaN(maxNum) || isNaN(countNum) || minNum >= maxNum || countNum <= 0) {
      return
    }

    const numbers: number[] = []

    if (allowDuplicates) {
      for (let i = 0; i < countNum; i++) {
        numbers.push(Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum)
      }
    } else {
      const available = []
      for (let i = minNum; i <= maxNum; i++) {
        available.push(i)
      }

      const maxPossible = Math.min(countNum, available.length)
      for (let i = 0; i < maxPossible; i++) {
        const index = Math.floor(Math.random() * available.length)
        numbers.push(available[index])
        available.splice(index, 1)
      }
    }

    setResults(numbers)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Random Number Settings</CardTitle>
          <CardDescription>Configure your random number generation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="min">Minimum</Label>
              <Input id="min" type="number" placeholder="1" value={min} onChange={(e) => setMin(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max">Maximum</Label>
              <Input id="max" type="number" placeholder="100" value={max} onChange={(e) => setMax(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="count">How many numbers?</Label>
            <Input id="count" type="number" placeholder="1" value={count} onChange={(e) => setCount(e.target.value)} />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="duplicates"
              checked={allowDuplicates}
              onCheckedChange={(checked) => setAllowDuplicates(checked as boolean)}
            />
            <Label htmlFor="duplicates" className="cursor-pointer">
              Allow duplicates
            </Label>
          </div>
          <Button onClick={generateNumbers} className="w-full">
            Generate
          </Button>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Numbers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {results.map((num, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-lg text-xl font-bold"
                >
                  {num}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
