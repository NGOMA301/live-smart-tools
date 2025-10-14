"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

export default function MarkdownConverter() {
  const [markdown, setMarkdown] = useState("")
  const [html, setHtml] = useState("")
  const [copied, setCopied] = useState(false)

  const convertToHtml = () => {
    let result = markdown

    // Headers
    result = result.replace(/^### (.*$)/gim, "<h3>$1</h3>")
    result = result.replace(/^## (.*$)/gim, "<h2>$1</h2>")
    result = result.replace(/^# (.*$)/gim, "<h1>$1</h1>")

    // Bold
    result = result.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")

    // Italic
    result = result.replace(/\*(.*?)\*/gim, "<em>$1</em>")

    // Links
    result = result.replace(/\[(.*?)\]$$(.*?)$$/gim, '<a href="$2">$1</a>')

    // Images
    result = result.replace(/!\[(.*?)\]$$(.*?)$$/gim, '<img alt="$1" src="$2" />')

    // Line breaks
    result = result.replace(/\n$/gim, "<br />")

    // Paragraphs
    result = result.replace(/\n\n/g, "</p><p>")
    result = "<p>" + result + "</p>"

    setHtml(result)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(html)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Markdown Input</CardTitle>
          <CardDescription>Enter your Markdown text</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="markdown">Markdown</Label>
            <Textarea
              id="markdown"
              placeholder="# Heading&#10;&#10;**Bold text** and *italic text*"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              rows={8}
            />
          </div>
          <Button onClick={convertToHtml} className="w-full">
            Convert to HTML
          </Button>
        </CardContent>
      </Card>

      {html && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>HTML Output</CardTitle>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>HTML Code</Label>
              <Textarea value={html} readOnly rows={8} className="font-mono text-sm" />
            </div>
            <div className="space-y-2">
              <Label>Preview</Label>
              <div
                className="p-4 bg-muted rounded-lg prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
