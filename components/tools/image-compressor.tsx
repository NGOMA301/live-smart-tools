"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Upload, Download } from "lucide-react"

export default function ImageCompressor() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [compressedImage, setCompressedImage] = useState<string | null>(null)
  const [quality, setQuality] = useState([80])
  const [originalSize, setOriginalSize] = useState<number>(0)
  const [compressedSize, setCompressedSize] = useState<number>(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setOriginalSize(file.size)
    const reader = new FileReader()
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string)
      setCompressedImage(null)
    }
    reader.readAsDataURL(file)
  }

  const compressImage = () => {
    if (!originalImage || !canvasRef.current) return

    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current!
      canvas.width = img.width
      canvas.height = img.height

      const ctx = canvas.getContext("2d")!
      ctx.drawImage(img, 0, 0)

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressedSize(blob.size)
            const url = URL.createObjectURL(blob)
            setCompressedImage(url)
          }
        },
        "image/jpeg",
        quality[0] / 100,
      )
    }
    img.src = originalImage
  }

  const downloadImage = () => {
    if (!compressedImage) return

    const link = document.createElement("a")
    link.download = "compressed-image.jpg"
    link.href = compressedImage
    link.click()
  }

  const handleReset = () => {
    setOriginalImage(null)
    setCompressedImage(null)
    setOriginalSize(0)
    setCompressedSize(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  const compressionRatio = originalSize > 0 ? Math.round(((originalSize - compressedSize) / originalSize) * 100) : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image Compressor</CardTitle>
        <CardDescription>Compress images to reduce file size</CardDescription>
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
            <div className="space-y-2">
              <Label>Compression Quality: {quality[0]}%</Label>
              <Slider value={quality} onValueChange={setQuality} min={1} max={100} step={1} />
              <p className="text-xs text-muted-foreground">Lower quality = smaller file size</p>
            </div>

            <div className="flex gap-2">
              <Button onClick={compressImage} className="flex-1">
                Compress Image
              </Button>
              <Button onClick={handleReset} variant="outline">
                Reset
              </Button>
            </div>

            {compressedImage && (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Original</Label>
                    <div className="rounded-lg border border-border bg-card p-4">
                      <img src={originalImage || "/placeholder.svg"} alt="Original" className="w-full" />
                      <p className="mt-2 text-sm text-muted-foreground">Size: {formatFileSize(originalSize)}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Compressed</Label>
                    <div className="rounded-lg border border-border bg-card p-4">
                      <img src={compressedImage || "/placeholder.svg"} alt="Compressed" className="w-full" />
                      <p className="mt-2 text-sm text-muted-foreground">Size: {formatFileSize(compressedSize)}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-card p-4 text-center">
                  <p className="text-2xl font-bold text-primary">{compressionRatio}% Smaller</p>
                  <p className="text-sm text-muted-foreground">Saved {formatFileSize(originalSize - compressedSize)}</p>
                </div>

                <Button onClick={downloadImage} className="w-full" variant="secondary">
                  <Download className="mr-2 h-4 w-4" />
                  Download Compressed Image
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
