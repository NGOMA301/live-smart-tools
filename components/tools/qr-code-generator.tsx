"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download } from "lucide-react"
import QRCode from "qrcode"

export default function QRCodeGenerator() {
  const [text, setText] = useState("")
  const [size, setSize] = useState("256")
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [error, setError] = useState("")

  const generateQRCode = async () => {
    if (!text.trim()) {
      setError("Please enter text or URL")
      return
    }

    try {
      setError("")
      const url = await QRCode.toDataURL(text, {
        width: Number.parseInt(size),
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      })
      setQrCodeUrl(url)
    } catch (err) {
      setError("Failed to generate QR code")
    }
  }

  const downloadQRCode = () => {
    if (!qrCodeUrl) return

    const link = document.createElement("a")
    link.download = "qrcode.png"
    link.href = qrCodeUrl
    link.click()
  }

  const handleReset = () => {
    setText("")
    setQrCodeUrl("")
    setError("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>QR Code Generator</CardTitle>
        <CardDescription>Generate QR codes for URLs, text, and more</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="text">Text or URL</Label>
          <Textarea
            id="text"
            placeholder="Enter text, URL, or any content..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="size">QR Code Size</Label>
          <Select value={size} onValueChange={setSize}>
            <SelectTrigger id="size">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="128">Small (128x128)</SelectItem>
              <SelectItem value="256">Medium (256x256)</SelectItem>
              <SelectItem value="512">Large (512x512)</SelectItem>
              <SelectItem value="1024">Extra Large (1024x1024)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex gap-2">
          <Button onClick={generateQRCode} className="flex-1">
            Generate QR Code
          </Button>
          <Button onClick={handleReset} variant="outline">
            Reset
          </Button>
        </div>

        {qrCodeUrl && (
          <div className="space-y-4">
            <div className="flex justify-center rounded-lg border border-border bg-card p-8">
              <img src={qrCodeUrl || "/placeholder.svg"} alt="Generated QR Code" className="max-w-full" />
            </div>
            <Button onClick={downloadQRCode} className="w-full" variant="secondary">
              <Download className="mr-2 h-4 w-4" />
              Download QR Code
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
