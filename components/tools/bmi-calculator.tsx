"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { calculateBMI } from "@/lib/utils"
import { Activity, AlertCircle, Scale, TrendingUp } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

export default function BMICalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [feet, setFeet] = useState("")
  const [inches, setInches] = useState("")
  const [result, setResult] = useState<ReturnType<typeof calculateBMI> | null>(null)

  const handleCalculate = () => {
    let h = 0
    let w = 0

    if (unit === "metric") {
      h = Number.parseFloat(height)
      w = Number.parseFloat(weight)
    } else {
      const totalInches = Number.parseFloat(feet) * 12 + Number.parseFloat(inches)
      h = totalInches * 2.54
      w = Number.parseFloat(weight) * 0.453592
    }

    if (h > 0 && w > 0) {
      const bmiResult = calculateBMI(w, h)
      setResult(bmiResult)
    }
  }

  const handleReset = () => {
    setHeight("")
    setWeight("")
    setFeet("")
    setInches("")
    setResult(null)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Underweight":
        return "text-blue-600 dark:text-blue-400"
      case "Normal weight":
        return "text-green-600 dark:text-green-400"
      case "Overweight":
        return "text-amber-600 dark:text-amber-400"
      case "Obese":
        return "text-red-600 dark:text-red-400"
      default:
        return ""
    }
  }

  const getBMIProgress = (bmi: number) => {
    if (bmi < 18.5) return (bmi / 18.5) * 25
    if (bmi < 25) return 25 + ((bmi - 18.5) / (25 - 18.5)) * 25
    if (bmi < 30) return 50 + ((bmi - 25) / (30 - 25)) * 25
    return Math.min(75 + ((bmi - 30) / 10) * 25, 100)
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <Card>
        <CardHeader className="space-y-1 pb-4">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5" />
            <CardTitle className="text-xl">BMI Calculator</CardTitle>
          </div>
          <CardDescription>Calculate your Body Mass Index with detailed health insights</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>Unit System</Label>
            <Tabs value={unit} onValueChange={(v) => setUnit(v as "metric" | "imperial")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="metric">Metric (kg, cm)</TabsTrigger>
                <TabsTrigger value="imperial">Imperial (lbs, ft)</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {unit === "metric" ? (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="170"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="feet">Height (feet)</Label>
                  <Input
                    id="feet"
                    type="number"
                    placeholder="5"
                    value={feet}
                    onChange={(e) => setFeet(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inches">Height (inches)</Label>
                  <Input
                    id="inches"
                    type="number"
                    placeholder="7"
                    value={inches}
                    onChange={(e) => setInches(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight-imperial">Weight (lbs)</Label>
                <Input
                  id="weight-imperial"
                  type="number"
                  placeholder="154"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={handleCalculate} className="flex-1">
              <Activity className="w-4 h-4 mr-2" />
              Calculate BMI
            </Button>
            <Button onClick={handleReset} variant="outline">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Your BMI Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Body Mass Index</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-5xl font-bold">{result.bmi.toFixed(1)}</p>
                    <p className={`text-lg font-semibold ${getCategoryColor(result.category)}`}>
                      {result.category}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Overweight</span>
                  <span>Obese</span>
                </div>
                <Progress value={getBMIProgress(result.bmi)} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>18.5</span>
                  <span>25</span>
                  <span>30</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <CardTitle className="text-lg">Healthy Weight Range</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg border bg-accent/50">
                <p className="text-sm text-muted-foreground mb-2">For your height, a healthy weight is:</p>
                <p className="text-2xl font-bold">
                  {result.healthyWeightRange.min.toFixed(1)} - {result.healthyWeightRange.max.toFixed(1)} kg
                </p>
                {unit === "imperial" && (
                  <p className="text-sm text-muted-foreground mt-1">
                    ({(result.healthyWeightRange.min * 2.20462).toFixed(1)} - {(result.healthyWeightRange.max * 2.20462).toFixed(1)} lbs)
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <CardTitle className="text-lg">Health Assessment</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-2" />
                  <div>
                    <p className="text-sm font-medium">Health Risk</p>
                    <p className="text-sm text-muted-foreground">{result.healthRisk}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-2" />
                  <div>
                    <p className="text-sm font-medium">Recommendation</p>
                    <p className="text-sm text-muted-foreground">{result.recommendation}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Understanding BMI</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-foreground font-medium">•</span>
                  <span>BMI is calculated by dividing weight in kilograms by height in meters squared</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground font-medium">•</span>
                  <span>BMI is a screening tool and doesn't measure body fat directly</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground font-medium">•</span>
                  <span>Athletes with high muscle mass may have elevated BMI despite low body fat</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground font-medium">•</span>
                  <span>BMI may not accurately reflect health risks for all ethnicities and age groups</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground font-medium">•</span>
                  <span>Consult healthcare professionals for personalized health assessments</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
