"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Download } from "lucide-react"

export default function ImageConverter() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [convertedImage, setConvertedImage] = useState<string | null>(null)
  const [outputFormat, setOutputFormat] = useState("png")
  const [originalFormat, setOriginalFormat] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const format = file.type.split("/")[1]
    setOriginalFormat(format)

    const reader = new FileReader()
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string)
      setConvertedImage(null)
    }
    reader.readAsDataURL(file)
  }

  const convertImage = () => {
    if (!originalImage || !canvasRef.current) return

    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current!
      canvas.width = img.width
      canvas.height = img.height

      const ctx = canvas.getContext("2d")!

      // For JPG, fill with white background
      if (outputFormat === "jpeg") {
        ctx.fillStyle = "#FFFFFF"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      ctx.drawImage(img, 0, 0)

      const mimeType = outputFormat === "jpeg" ? "image/jpeg" : `image/${outputFormat}`
      const converted = canvas.toDataURL(mimeType, 0.95)
      setConvertedImage(converted)
    }
    img.src = originalImage
  }

  const downloadImage = () => {
    if (!convertedImage) return

    const link = document.createElement("a")
    link.download = `converted-image.${outputFormat}`
    link.href = convertedImage
    link.click()
  }

  const handleReset = () => {
    setOriginalImage(null)
    setConvertedImage(null)
    setOriginalFormat("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image Format Converter</CardTitle>
        <CardDescription>Convert images between different formats</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="file">Upload Image</Label>
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              id="file"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="flex-1">
              <Upload className="mr-2 h-4 w-4" />
              Choose Image
            </Button>
          </div>
          {originalFormat && (
            <p className="text-sm text-muted-foreground">Current format: {originalFormat.toUpperCase()}</p>
          )}
        </div>

        {originalImage && (
          <>
            <div className="space-y-2">
              <Label htmlFor="format">Convert To</Label>
              <Select value={outputFormat} onValueChange={setOutputFormat}>
                <SelectTrigger id="format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="jpeg">JPEG</SelectItem>
                  <SelectItem value="webp">WebP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={convertImage} className="flex-1">
                Convert Image
              </Button>
              <Button onClick={handleReset} variant="outline">
                Reset
              </Button>
            </div>

            {convertedImage && (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Original ({originalFormat.toUpperCase()})</Label>
                    <div className="rounded-lg border border-border bg-card p-4">
                      <img src={originalImage || "/placeholder.svg"} alt="Original" className="w-full" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Converted ({outputFormat.toUpperCase()})</Label>
                    <div className="rounded-lg border border-border bg-card p-4">
                      <img src={convertedImage || "/placeholder.svg"} alt="Converted" className="w-full" />
                    </div>
                  </div>
                </div>

                <Button onClick={downloadImage} className="w-full" variant="secondary">
                  <Download className="mr-2 h-4 w-4" />
                  Download {outputFormat.toUpperCase()} Image
                </Button>
              </>
            )}
          </>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </CardContent>
    </Card>
  )
}
