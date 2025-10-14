"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Upload, X, MoveUp, MoveDown } from "lucide-react"

interface PDFFile {
  id: string
  name: string
  file: File
}

export default function PDFMerger() {
  const [pdfFiles, setPdfFiles] = useState<PDFFile[]>([])
  const [merging, setMerging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newPDFs = files
      .filter((file) => file.type === "application/pdf")
      .map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        file,
      }))
    setPdfFiles([...pdfFiles, ...newPDFs])
  }

  const removeFile = (id: string) => {
    setPdfFiles(pdfFiles.filter((pdf) => pdf.id !== id))
  }

  const moveUp = (index: number) => {
    if (index === 0) return
    const newFiles = [...pdfFiles]
    ;[newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]]
    setPdfFiles(newFiles)
  }

  const moveDown = (index: number) => {
    if (index === pdfFiles.length - 1) return
    const newFiles = [...pdfFiles]
    ;[newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]]
    setPdfFiles(newFiles)
  }

  const mergePDFs = async () => {
    if (pdfFiles.length < 2) return

    setMerging(true)
    try {
      // Import pdf-lib dynamically
      const { PDFDocument } = await import("pdf-lib")

      const mergedPdf = await PDFDocument.create()

      for (const pdfFile of pdfFiles) {
        const arrayBuffer = await pdfFile.file.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer)
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        copiedPages.forEach((page) => mergedPdf.addPage(page))
      }

      const mergedPdfBytes = await mergedPdf.save()
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.download = "merged.pdf"
      link.click()

      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error merging PDFs:", error)
      alert("Failed to merge PDFs. Please try again.")
    } finally {
      setMerging(false)
    }
  }

  const handleReset = () => {
    setPdfFiles([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>PDF Merger</CardTitle>
        <CardDescription>Merge multiple PDF files into one</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="files">Upload PDF Files</Label>
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              id="files"
              type="file"
              accept="application/pdf"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="flex-1">
              <Upload className="mr-2 h-4 w-4" />
              Choose PDF Files
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Select multiple PDF files to merge</p>
        </div>

        {pdfFiles.length > 0 && (
          <>
            <div className="space-y-2">
              <Label>PDF Files ({pdfFiles.length})</Label>
              <div className="space-y-2 rounded-lg border border-border p-4">
                {pdfFiles.map((pdf, index) => (
                  <div key={pdf.id} className="flex items-center justify-between rounded bg-muted p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{index + 1}.</span>
                      <span className="text-sm">{pdf.name}</span>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" onClick={() => moveUp(index)} disabled={index === 0}>
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => moveDown(index)}
                        disabled={index === pdfFiles.length - 1}
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => removeFile(pdf.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={mergePDFs} className="flex-1" disabled={pdfFiles.length < 2 || merging}>
                {merging ? "Merging..." : "Merge PDFs"}
              </Button>
              <Button onClick={handleReset} variant="outline">
                Reset
              </Button>
            </div>

            {pdfFiles.length < 2 && <p className="text-sm text-muted-foreground">Add at least 2 PDF files to merge</p>}
          </>
        )}
      </CardContent>
    </Card>
  )
}
