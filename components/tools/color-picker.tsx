"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

export default function ColorPicker() {
  const [color, setColor] = useState("#3b82f6")
  const [copied, setCopied] = useState<string | null>(null)

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : null
  }

  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex)
    if (!rgb) return null

    const r = rgb.r / 255
    const g = rgb.g / 255
    const b = rgb.b / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6
          break
        case g:
          h = ((b - r) / d + 2) / 6
          break
        case b:
          h = ((r - g) / d + 4) / 6
          break
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    }
  }

  const rgb = hexToRgb(color)
  const hsl = hexToHsl(color)

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pick a Color</CardTitle>
          <CardDescription>Select a color to get its values</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="color">Color</Label>
            <div className="flex gap-4">
              <Input
                id="color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-24 h-24 cursor-pointer"
              />
              <div
                className="flex-1 flex items-center justify-center rounded-lg border-2"
                style={{ backgroundColor: color }}
              >
                <span className="text-4xl font-bold" style={{ color: hsl && hsl.l > 50 ? "#000" : "#fff" }}>
                  {color.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Color Values</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
            <div>
              <div className="text-sm text-muted-foreground">HEX</div>
              <div className="text-lg font-mono font-semibold">{color.toUpperCase()}</div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(color.toUpperCase(), "hex")}>
              {copied === "hex" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>

          {rgb && (
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <div>
                <div className="text-sm text-muted-foreground">RGB</div>
                <div className="text-lg font-mono font-semibold">
                  rgb({rgb.r}, {rgb.g}, {rgb.b})
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "rgb")}
              >
                {copied === "rgb" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          )}

          {hsl && (
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <div>
                <div className="text-sm text-muted-foreground">HSL</div>
                <div className="text-lg font-mono font-semibold">
                  hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, "hsl")}
              >
                {copied === "hsl" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
