"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Upload } from "lucide-react"

export default function PDFSplitter() {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [splitMode, setSplitMode] = useState("all")
  const [pageRange, setPageRange] = useState("")
  const [splitting, setSplitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setPdfFile(file)

    // Get page count
    try {
      const { PDFDocument } = await import("pdf-lib")
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)
      setPageCount(pdf.getPageCount())
    } catch (error) {
      console.error("Error loading PDF:", error)
    }
  }

  const splitPDF = async () => {
    if (!pdfFile) return

    setSplitting(true)
    try {
      const { PDFDocument } = await import("pdf-lib")
      const arrayBuffer = await pdfFile.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)

      if (splitMode === "all") {
        // Split into individual pages
        for (let i = 0; i < pdf.getPageCount(); i++) {
          const newPdf = await PDFDocument.create()
          const [copiedPage] = await newPdf.copyPages(pdf, [i])
          newPdf.addPage(copiedPage)

          const pdfBytes = await newPdf.save()
          const blob = new Blob([pdfBytes], { type: "application/pdf" })
          const url = URL.createObjectURL(blob)

          const link = document.createElement("a")
          link.href = url
          link.download = `page-${i + 1}.pdf`
          link.click()

          URL.revokeObjectURL(url)
        }
      } else if (splitMode === "range" && pageRange) {
        // Split by range (e.g., "1-3,5,7-9")
        const ranges = pageRange.split(",").map((r) => r.trim())
        let fileIndex = 1

        for (const range of ranges) {
          const newPdf = await PDFDocument.create()

          if (range.includes("-")) {
            const [start, end] = range.split("-").map((n) => Number.parseInt(n.trim()) - 1)
            for (let i = start; i <= end && i < pdf.getPageCount(); i++) {
              const [copiedPage] = await newPdf.copyPages(pdf, [i])
              newPdf.addPage(copiedPage)
            }
          } else {
            const pageNum = Number.parseInt(range) - 1
            if (pageNum >= 0 && pageNum < pdf.getPageCount()) {
              const [copiedPage] = await newPdf.copyPages(pdf, [pageNum])
              newPdf.addPage(copiedPage)
            }
          }

          const pdfBytes = await newPdf.save()
          const blob = new Blob([pdfBytes], { type: "application/pdf" })
          const url = URL.createObjectURL(blob)

          const link = document.createElement("a")
          link.href = url
          link.download = `split-${fileIndex}.pdf`
          link.click()

          URL.revokeObjectURL(url)
          fileIndex++
        }
      }
    } catch (error) {
      console.error("Error splitting PDF:", error)
      alert("Failed to split PDF. Please try again.")
    } finally {
      setSplitting(false)
    }
  }

  const handleReset = () => {
    setPdfFile(null)
    setPageCount(0)
    setPageRange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>PDF Splitter</CardTitle>
        <CardDescription>Split PDF into separate pages or ranges</CardDescription>
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
          {pageCount > 0 && <p className="text-sm text-muted-foreground">Total pages: {pageCount}</p>}
        </div>

        {pdfFile && (
          <>
            <div className="space-y-4">
              <Label>Split Mode</Label>
              <RadioGroup value={splitMode} onValueChange={setSplitMode}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all" className="cursor-pointer font-normal">
                    Split into individual pages
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="range" id="range" />
                  <Label htmlFor="range" className="cursor-pointer font-normal">
                    Extract specific pages
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {splitMode === "range" && (
              <div className="space-y-2">
                <Label htmlFor="range-input">Page Range</Label>
                <Input
                  id="range-input"
                  placeholder="e.g., 1-3,5,7-9"
                  value={pageRange}
                  onChange={(e) => setPageRange(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Enter page numbers or ranges separated by commas (e.g., 1-3,5,7-9)
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={splitPDF}
                className="flex-1"
                disabled={splitting || (splitMode === "range" && !pageRange)}
              >
                {splitting ? "Splitting..." : "Split PDF"}
              </Button>
              <Button onClick={handleReset} variant="outline">
                Reset
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
