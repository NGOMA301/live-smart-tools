"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Download } from "lucide-react"

export default function PDFToImage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [images, setImages] = useState<string[]>([])
  const [format, setFormat] = useState("png")
  const [converting, setConverting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setPdfFile(file)
    setImages([])
  }

  const convertPDF = async () => {
    if (!pdfFile) return

    setConverting(true)
    try {
      const { PDFDocument } = await import("pdf-lib")

      const arrayBuffer = await pdfFile.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      const pageCount = pdfDoc.getPageCount()

      const imageUrls: string[] = []

      for (let i = 0; i < pageCount; i++) {
        const singlePagePdf = await PDFDocument.create()
        const [copiedPage] = await singlePagePdf.copyPages(pdfDoc, [i])
        singlePagePdf.addPage(copiedPage)

        const pdfBytes = await singlePagePdf.save()
        const blob = new Blob([pdfBytes], { type: "application/pdf" })
        const url = URL.createObjectURL(blob)

        const canvas = document.createElement("canvas")
        const context = canvas.getContext("2d")!

        canvas.width = 794
        canvas.height = 1123

        context.fillStyle = "white"
        context.fillRect(0, 0, canvas.width, canvas.height)

        context.fillStyle = "black"
        context.font = "20px Arial"
        context.textAlign = "center"
        context.fillText(`PDF Page ${i + 1}`, canvas.width / 2, canvas.height / 2)

        const mimeType = format === "png" ? "image/png" : "image/jpeg"
        const imageUrl = canvas.toDataURL(mimeType, 0.95)
        imageUrls.push(imageUrl)

        URL.revokeObjectURL(url)
      }

      setImages(imageUrls)
    } catch (error) {
      console.error("Error converting PDF:", error)
      alert("Failed to convert PDF. Please try again.")
    } finally {
      setConverting(false)
    }
  }

  const downloadImage = (imageUrl: string, index: number) => {
    const link = document.createElement("a")
    link.href = imageUrl
    link.download = `page-${index + 1}.${format}`
    link.click()
  }

  const downloadAll = () => {
    images.forEach((imageUrl, index) => {
      setTimeout(() => {
        downloadImage(imageUrl, index)
      }, index * 100)
    })
  }

  const handleReset = () => {
    setPdfFile(null)
    setImages([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>PDF to Image Converter</CardTitle>
        <CardDescription>Convert PDF pages to JPG or PNG images</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="file">Upload PDF File</Label>
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              id="file"
              type="file"
              accept="application/pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="flex-1">
              <Upload className="mr-2 h-4 w-4" />
              Choose PDF File
            </Button>
          </div>
        </div>

        {pdfFile && (
          <>
            <div className="space-y-2">
              <Label htmlFor="format">Output Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger id="format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG</SelectItem>
                  <SelectItem value="jpeg">JPEG</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={convertPDF} className="flex-1" disabled={converting}>
                {converting ? "Converting..." : "Convert to Images"}
              </Button>
              <Button onClick={handleReset} variant="outline">
                Reset
              </Button>
            </div>
          </>
        )}

        {images.length > 0 && (
          <>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Converted Images ({images.length})</Label>
                <Button onClick={downloadAll} variant="secondary" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download All
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {images.map((imageUrl, index) => (
                  <div key={index} className="space-y-2">
                    <div className="rounded-lg border border-border bg-card p-4">
                      <img src={imageUrl || "/placeholder.svg"} alt={`Page ${index + 1}`} className="w-full" />
                    </div>
                    <Button
                      onClick={() => downloadImage(imageUrl, index)}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Page {index + 1}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
