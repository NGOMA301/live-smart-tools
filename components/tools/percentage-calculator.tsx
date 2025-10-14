"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PercentageCalculator() {
  const [value, setValue] = useState("")
  const [total, setTotal] = useState("")
  const [percentage, setPercentage] = useState("")
  const [result, setResult] = useState<string | null>(null)

  const calculatePercentage = () => {
    const val = Number.parseFloat(value)
    const tot = Number.parseFloat(total)
    if (!isNaN(val) && !isNaN(tot) && tot !== 0) {
      const percent = (val / tot) * 100
      setResult(`${val} is ${percent.toFixed(2)}% of ${tot}`)
    }
  }

  const calculateValue = () => {
    const perc = Number.parseFloat(percentage)
    const tot = Number.parseFloat(total)
    if (!isNaN(perc) && !isNaN(tot)) {
      const val = (perc / 100) * tot
      setResult(`${perc}% of ${tot} is ${val.toFixed(2)}`)
    }
  }

  const calculateIncrease = () => {
    const val = Number.parseFloat(value)
    const perc = Number.parseFloat(percentage)
    if (!isNaN(val) && !isNaN(perc)) {
      const increase = val * (perc / 100)
      const newValue = val + increase
      setResult(`${val} increased by ${perc}% is ${newValue.toFixed(2)} (increase of ${increase.toFixed(2)})`)
    }
  }

  const calculateDecrease = () => {
    const val = Number.parseFloat(value)
    const perc = Number.parseFloat(percentage)
    if (!isNaN(val) && !isNaN(perc)) {
      const decrease = val * (perc / 100)
      const newValue = val - decrease
      setResult(`${val} decreased by ${perc}% is ${newValue.toFixed(2)} (decrease of ${decrease.toFixed(2)})`)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="what-percent" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="what-percent">What %</TabsTrigger>
          <TabsTrigger value="percent-of">% of</TabsTrigger>
          <TabsTrigger value="increase">Increase</TabsTrigger>
          <TabsTrigger value="decrease">Decrease</TabsTrigger>
        </TabsList>

        <TabsContent value="what-percent">
          <Card>
            <CardHeader>
              <CardTitle>What Percentage?</CardTitle>
              <CardDescription>Calculate what percentage one number is of another</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="value1">Value</Label>
                <Input
                  id="value1"
                  type="number"
                  placeholder="Enter value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="total1">Total</Label>
                <Input
                  id="total1"
                  type="number"
                  placeholder="Enter total"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                />
              </div>
              <Button onClick={calculatePercentage} className="w-full">
                Calculate
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="percent-of">
          <Card>
            <CardHeader>
              <CardTitle>Percentage Of</CardTitle>
              <CardDescription>Calculate what is X% of Y</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="percentage2">Percentage</Label>
                <Input
                  id="percentage2"
                  type="number"
                  placeholder="Enter percentage"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="total2">Total</Label>
                <Input
                  id="total2"
                  type="number"
                  placeholder="Enter total"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                />
              </div>
              <Button onClick={calculateValue} className="w-full">
                Calculate
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="increase">
          <Card>
            <CardHeader>
              <CardTitle>Percentage Increase</CardTitle>
              <CardDescription>Calculate value after percentage increase</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="value3">Original Value</Label>
                <Input
                  id="value3"
                  type="number"
                  placeholder="Enter value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="percentage3">Increase %</Label>
                <Input
                  id="percentage3"
                  type="number"
                  placeholder="Enter percentage"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                />
              </div>
              <Button onClick={calculateIncrease} className="w-full">
                Calculate
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="decrease">
          <Card>
            <CardHeader>
              <CardTitle>Percentage Decrease</CardTitle>
              <CardDescription>Calculate value after percentage decrease</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="value4">Original Value</Label>
                <Input
                  id="value4"
                  type="number"
                  placeholder="Enter value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="percentage4">Decrease %</Label>
                <Input
                  id="percentage4"
                  type="number"
                  placeholder="Enter percentage"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                />
              </div>
              <Button onClick={calculateDecrease} className="w-full">
                Calculate
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
