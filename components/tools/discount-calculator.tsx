"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Percent, ShoppingBag, TrendingDown, Plus, Minus, Calculator } from "lucide-react"

interface DiscountResult {
  discount: number
  finalPrice: number
  savings: number
  savingsPercent: number
}

interface ComparisonItem {
  id: string
  name: string
  originalPrice: number
  discountPercent: number
  finalPrice: number
  savings: number
}

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState(100)
  const [discountPercent, setDiscountPercent] = useState(20)
  const [quantity, setQuantity] = useState(1)
  const [taxRate, setTaxRate] = useState(0)
  const [result, setResult] = useState<DiscountResult | null>(null)
  const [comparisonItems, setComparisonItems] = useState<ComparisonItem[]>([])
  const [itemName, setItemName] = useState("")

  const calculateDiscount = () => {
    const price = originalPrice
    const discount = discountPercent

    if (price > 0 && discount >= 0 && discount <= 100) {
      const discountAmount = (price * discount) / 100
      const finalPrice = price - discountAmount
      const finalWithTax = finalPrice + (finalPrice * taxRate) / 100

      setResult({
        discount: discountAmount,
        finalPrice: finalWithTax,
        savings: discountAmount * quantity,
        savingsPercent: discount,
      })
    }
  }

  const addToComparison = () => {
    if (originalPrice > 0 && itemName.trim()) {
      const discountAmount = (originalPrice * discountPercent) / 100
      const finalPrice = originalPrice - discountAmount

      setComparisonItems([
        ...comparisonItems,
        {
          id: Date.now().toString(),
          name: itemName,
          originalPrice,
          discountPercent,
          finalPrice,
          savings: discountAmount,
        },
      ])
      setItemName("")
    }
  }

  const removeFromComparison = (id: string) => {
    setComparisonItems(comparisonItems.filter((item) => item.id !== id))
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value)
  }

  const totalComparison = comparisonItems.reduce(
    (acc, item) => ({
      original: acc.original + item.originalPrice,
      final: acc.final + item.finalPrice,
      savings: acc.savings + item.savings,
    }),
    { original: 0, final: 0, savings: 0 }
  )

  const getDiscountTier = (percent: number) => {
    if (percent >= 50) return { label: "Excellent", color: "bg-green-500" }
    if (percent >= 30) return { label: "Great", color: "bg-blue-500" }
    if (percent >= 15) return { label: "Good", color: "bg-yellow-500" }
    return { label: "Fair", color: "bg-orange-500" }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <Percent className="h-8 w-8" />
        <div>
          <h1 className="text-3xl font-bold">Discount Calculator</h1>
          <p className="text-muted-foreground">Calculate savings and compare deals</p>
        </div>
      </div>

      <Tabs defaultValue="calculate" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculate">Calculate</TabsTrigger>
          <TabsTrigger value="compare">
            Compare Deals
            {comparisonItems.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {comparisonItems.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculate" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Price & Discount</CardTitle>
              <CardDescription>Adjust values using sliders or input fields</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="price">Original Price</Label>
                  <span className="text-sm font-semibold">{formatCurrency(originalPrice)}</span>
                </div>
                <Slider
                  id="price"
                  min={1}
                  max={10000}
                  step={1}
                  value={[originalPrice]}
                  onValueChange={(value) => setOriginalPrice(value[0])}
                  className="w-full"
                />
                <Input
                  type="number"
                  step="0.01"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(Number(e.target.value))}
                  className="h-9"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="discount">Discount Percentage</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{discountPercent}%</span>
                    <Badge variant="outline" className={getDiscountTier(discountPercent).color}>
                      {getDiscountTier(discountPercent).label}
                    </Badge>
                  </div>
                </div>
                <Slider
                  id="discount"
                  min={0}
                  max={100}
                  step={1}
                  value={[discountPercent]}
                  onValueChange={(value) => setDiscountPercent(value[0])}
                  className="w-full"
                />
                <Input
                  type="number"
                  step="0.1"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                  className="h-9"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="quantity">Quantity</Label>
                    <span className="text-sm font-semibold">{quantity}</span>
                  </div>
                  <Slider
                    id="quantity"
                    min={1}
                    max={100}
                    step={1}
                    value={[quantity]}
                    onValueChange={(value) => setQuantity(value[0])}
                    className="w-full"
                  />
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="h-9"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="tax">Tax Rate</Label>
                    <span className="text-sm font-semibold">{taxRate}%</span>
                  </div>
                  <Slider
                    id="tax"
                    min={0}
                    max={25}
                    step={0.5}
                    value={[taxRate]}
                    onValueChange={(value) => setTaxRate(value[0])}
                    className="w-full"
                  />
                  <Input
                    type="number"
                    step="0.1"
                    value={taxRate}
                    onChange={(e) => setTaxRate(Number(e.target.value))}
                    className="h-9"
                  />
                </div>
              </div>

              <Button onClick={calculateDiscount} className="w-full" size="lg">
                <Calculator className="mr-2 h-4 w-4" />
                Calculate Savings
              </Button>
            </CardContent>
          </Card>

          {result && (
            <>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingDown className="h-5 w-5" />
                    Savings Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center p-4 bg-primary text-primary-foreground rounded-lg">
                    <div>
                      <p className="text-sm opacity-90">You Save</p>
                      <p className="text-xs opacity-75 mt-1">{result.savingsPercent}% off</p>
                    </div>
                    <span className="text-3xl font-bold">{formatCurrency(result.savings)}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Original Price</p>
                      <p className="text-lg font-semibold line-through opacity-60">
                        {formatCurrency(originalPrice * quantity)}
                      </p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Final Price</p>
                      <p className="text-lg font-semibold">{formatCurrency(result.finalPrice * quantity)}</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Savings Progress</span>
                      <span className="font-medium">{result.savingsPercent}%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 transition-all"
                        style={{ width: `${result.savingsPercent}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm p-2">
                    <span className="text-muted-foreground">Price per item</span>
                    <span className="font-medium">{formatCurrency(originalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm p-2">
                    <span className="text-muted-foreground">Discount per item</span>
                    <span className="font-medium text-green-600">-{formatCurrency(result.discount)}</span>
                  </div>
                  <div className="flex justify-between text-sm p-2">
                    <span className="text-muted-foreground">Quantity</span>
                    <span className="font-medium">× {quantity}</span>
                  </div>
                  {taxRate > 0 && (
                    <div className="flex justify-between text-sm p-2">
                      <span className="text-muted-foreground">Tax ({taxRate}%)</span>
                      <span className="font-medium">
                        +{formatCurrency(((originalPrice - result.discount) * taxRate) / 100 * quantity)}
                      </span>
                    </div>
                  )}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-sm p-2 bg-muted rounded">
                      <span className="font-semibold">Total Savings</span>
                      <span className="font-bold text-green-600">{formatCurrency(result.savings)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="compare" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Add Item to Compare</CardTitle>
              <CardDescription>Build a shopping list to compare multiple discounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="itemName">Item Name</Label>
                <Input
                  id="itemName"
                  placeholder="e.g., Laptop, Shoes, etc."
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price: {formatCurrency(originalPrice)}</Label>
                </div>
                <div className="space-y-2">
                  <Label>Discount: {discountPercent}%</Label>
                </div>
              </div>
              <Button onClick={addToComparison} className="w-full" disabled={!itemName.trim()}>
                <Plus className="mr-2 h-4 w-4" />
                Add to Comparison
              </Button>
            </CardContent>
          </Card>

          {comparisonItems.length > 0 ? (
            <>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Items Comparison</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {comparisonItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{item.name}</p>
                        <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                          <span className="line-through">{formatCurrency(item.originalPrice)}</span>
                          <span className="text-green-600 font-medium">-{item.discountPercent}%</span>
                          <span className="font-semibold text-foreground">{formatCurrency(item.finalPrice)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Save</p>
                          <p className="text-sm font-bold text-green-600">{formatCurrency(item.savings)}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromComparison(item.id)}
                          className="h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Total Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Original</p>
                      <p className="font-semibold">{formatCurrency(totalComparison.original)}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Final</p>
                      <p className="font-semibold">{formatCurrency(totalComparison.final)}</p>
                    </div>
                    <div className="p-3 bg-green-500 text-white rounded-lg">
                      <p className="text-xs opacity-90 mb-1">Total Saved</p>
                      <p className="font-bold">{formatCurrency(totalComparison.savings)}</p>
                    </div>
                  </div>
                  <div className="text-center text-sm text-muted-foreground pt-2">
                    Average discount:{" "}
                    <span className="font-semibold text-foreground">
                      {((totalComparison.savings / totalComparison.original) * 100).toFixed(1)}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No items added yet</p>
                <p className="text-sm text-muted-foreground mt-1">Add items above to start comparing deals</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
