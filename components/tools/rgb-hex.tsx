"use client"

import { CardContent } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"

import React from "react"

export default function RgbHex() {
  const [rgb, setRgb] = React.useState({ r: 0, g: 0, b: 0 })
  const [hex, setHex] = React.useState("#000000")
  const [mode, setMode] = React.useState<"rgb-to-hex" | "hex-to-rgb">("rgb-to-hex")

  const rgbToHex = () => {
    const toHex = (n: number) => {
      const hex = Math.max(0, Math.min(255, n)).toString(16)
      return hex.length === 1 ? "0" + hex : hex
    }
    const result = `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`
    setHex(result.toUpperCase())
  }

  const hexToRgb = () => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (result) {
      setRgb({
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Button
          variant={mode === "rgb-to-hex" ? "default" : "outline"}
          onClick={() => setMode("rgb-to-hex")}
          className="flex-1"
        >
          RGB to HEX
        </Button>
        <Button
          variant={mode === "hex-to-rgb" ? "default" : "outline"}
          onClick={() => setMode("hex-to-rgb")}
          className="flex-1"
        >
          HEX to RGB
        </Button>
      </div>

      {mode === "rgb-to-hex" ? (
        <>
          <div className="space-y-4">
            <div>
              <Label htmlFor="r">Red (0-255)</Label>
              <Input
                id="r"
                type="number"
                min="0"
                max="255"
                value={rgb.r}
                onChange={(e) => setRgb({ ...rgb, r: Number.parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label htmlFor="g">Green (0-255)</Label>
              <Input
                id="g"
                type="number"
                min="0"
                max="255"
                value={rgb.g}
                onChange={(e) => setRgb({ ...rgb, g: Number.parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label htmlFor="b">Blue (0-255)</Label>
              <Input
                id="b"
                type="number"
                min="0"
                max="255"
                value={rgb.b}
                onChange={(e) => setRgb({ ...rgb, b: Number.parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <Button onClick={rgbToHex} className="w-full">
            Convert to HEX
          </Button>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-20 h-20 rounded border"
                  style={{ backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` }}
                />
                <div>
                  <div className="text-2xl font-mono font-bold">{hex}</div>
                  <div className="text-sm text-muted-foreground">
                    RGB({rgb.r}, {rgb.g}, {rgb.b})
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <div>
            <Label htmlFor="hex">HEX Color</Label>
            <Input
              id="hex"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              placeholder="#000000"
              className="font-mono"
            />
          </div>

          <Button onClick={hexToRgb} className="w-full">
            Convert to RGB
          </Button>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded border" style={{ backgroundColor: hex }} />
                <div>
                  <div className="text-2xl font-mono font-bold">
                    RGB({rgb.r}, {rgb.g}, {rgb.b})
                  </div>
                  <div className="text-sm text-muted-foreground">{hex}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
