"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download } from "lucide-react"
import JsBarcode from "jsbarcode"

export default function BarcodeGenerator() {
  const [text, setText] = useState("")
  const [format, setFormat] = useState("CODE128")
  const [error, setError] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [barcodeGenerated, setBarcodeGenerated] = useState(false)

  const generateBarcode = () => {
    if (!text.trim()) {
      setError("Please enter text or numbers")
      setBarcodeGenerated(false)
      return
    }

    if (!canvasRef.current) return

    try {
      setError("")
      JsBarcode(canvasRef.current, text, {
        format: format,
        width: 2,
        height: 100,
        displayValue: true,
        fontSize: 14,
        margin: 10,
      })
      setBarcodeGenerated(true)
    } catch (err: any) {
      setError(err.message || "Failed to generate barcode. Please check your input.")
      setBarcodeGenerated(false)
    }
  }

  const downloadBarcode = () => {
    if (!canvasRef.current || !barcodeGenerated) return

    const link = document.createElement("a")
    link.download = "barcode.png"
    link.href = canvasRef.current.toDataURL()
    link.click()
  }

  const handleReset = () => {
    setText("")
    setError("")
    setBarcodeGenerated(false)
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Barcode Generator</CardTitle>
        <CardDescription>Generate barcodes in multiple formats</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="text">Barcode Text/Number</Label>
          <Input
            id="text"
            placeholder="Enter text or numbers..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="format">Barcode Format</Label>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger id="format">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CODE128">CODE128 (Default)</SelectItem>
              <SelectItem value="EAN13">EAN-13</SelectItem>
              <SelectItem value="UPC">UPC-A</SelectItem>
              <SelectItem value="CODE39">CODE39</SelectItem>
              <SelectItem value="ITF14">ITF-14</SelectItem>
              <SelectItem value="MSI">MSI</SelectItem>
              <SelectItem value="pharmacode">Pharmacode</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex gap-2">
          <Button onClick={generateBarcode} className="flex-1">
            Generate Barcode
          </Button>
          <Button onClick={handleReset} variant="outline">
            Reset
          </Button>
        </div>

        <div className="flex justify-center rounded-lg border border-border bg-card p-8">
          <canvas ref={canvasRef} />
        </div>

        {barcodeGenerated && (
          <Button onClick={downloadBarcode} className="w-full" variant="secondary">
            <Download className="mr-2 h-4 w-4" />
            Download Barcode
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
