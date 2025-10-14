"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState("")
  const [discountPercent, setDiscountPercent] = useState("")
  const [result, setResult] = useState<{
    discount: number
    finalPrice: number
    savings: number
  } | null>(null)

  const calculateDiscount = () => {
    const price = Number.parseFloat(originalPrice)
    const discount = Number.parseFloat(discountPercent)

    if (price > 0 && discount >= 0 && discount <= 100) {
      const discountAmount = (price * discount) / 100
      const finalPrice = price - discountAmount

      setResult({
        discount: discountAmount,
        finalPrice,
        savings: discountAmount,
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Price Details</CardTitle>
          <CardDescription>Enter the original price and discount</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="price">Original Price ($)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              placeholder="100.00"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discount">Discount (%)</Label>
            <Input
              id="discount"
              type="number"
              step="0.1"
              placeholder="20"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
            />
          </div>
          <Button onClick={calculateDiscount} className="w-full">
            Calculate
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Discount Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="text-muted-foreground">You Save</span>
              <span className="text-2xl font-bold text-green-600">${result.savings.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="text-muted-foreground">Final Price</span>
              <span className="text-2xl font-bold">${result.finalPrice.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
