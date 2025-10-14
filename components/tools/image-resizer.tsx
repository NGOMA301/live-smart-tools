"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, Download } from "lucide-react"

export default function ImageResizer() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [resizedImage, setResizedImage] = useState<string | null>(null)
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true)
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height })
        setWidth(img.width.toString())
        setHeight(img.height.toString())
      }
      img.src = event.target?.result as string
      setOriginalImage(event.target?.result as string)
      setResizedImage(null)
    }
    reader.readAsDataURL(file)
  }

  const handleWidthChange = (value: string) => {
    setWidth(value)
    if (maintainAspectRatio && originalDimensions.width > 0) {
      const ratio = originalDimensions.height / originalDimensions.width
      setHeight(Math.round(Number.parseInt(value) * ratio).toString())
    }
  }

  const handleHeightChange = (value: string) => {
    setHeight(value)
    if (maintainAspectRatio && originalDimensions.height > 0) {
      const ratio = originalDimensions.width / originalDimensions.height
      setWidth(Math.round(Number.parseInt(value) * ratio).toString())
    }
  }

  const resizeImage = () => {
    if (!originalImage || !canvasRef.current || !width || !height) return

    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current!
      canvas.width = Number.parseInt(width)
      canvas.height = Number.parseInt(height)

      const ctx = canvas.getContext("2d")!
      ctx.drawImage(img, 0, 0, Number.parseInt(width), Number.parseInt(height))

      const resized = canvas.toDataURL("image/png")
      setResizedImage(resized)
    }
    img.src = originalImage
  }

  const downloadImage = () => {
    if (!resizedImage) return

    const link = document.createElement("a")
    link.download = `resized-${width}x${height}.png`
    link.href = resizedImage
    link.click()
  }

  const handleReset = () => {
    setOriginalImage(null)
    setResizedImage(null)
    setWidth("")
    setHeight("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image Resizer</CardTitle>
        <CardDescription>Resize images to custom dimensions</CardDescription>
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
        </div>

        {originalImage && (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="width">Width (px)</Label>
                <Input
                  id="width"
                  type="number"
                  value={width}
                  onChange={(e) => handleWidthChange(e.target.value)}
                  placeholder="Width"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (px)</Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => handleHeightChange(e.target.value)}
                  placeholder="Height"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="aspect-ratio"
                checked={maintainAspectRatio}
                onCheckedChange={(checked) => setMaintainAspectRatio(checked as boolean)}
              />
              <Label htmlFor="aspect-ratio" className="cursor-pointer">
                Maintain aspect ratio
              </Label>
            </div>

            <div className="flex gap-2">
              <Button onClick={resizeImage} className="flex-1">
                Resize Image
              </Button>
              <Button onClick={handleReset} variant="outline">
                Reset
              </Button>
            </div>

            {resizedImage && (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Original</Label>
                    <div className="rounded-lg border border-border bg-card p-4">
                      <img src={originalImage || "/placeholder.svg"} alt="Original" className="w-full" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        {originalDimensions.width} x {originalDimensions.height} px
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Resized</Label>
                    <div className="rounded-lg border border-border bg-card p-4">
                      <img src={resizedImage || "/placeholder.svg"} alt="Resized" className="w-full" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        {width} x {height} px
                      </p>
                    </div>
                  </div>
                </div>

                <Button onClick={downloadImage} className="w-full" variant="secondary">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resized Image
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
