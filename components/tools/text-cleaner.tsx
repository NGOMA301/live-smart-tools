"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, Check } from "lucide-react"

export default function TextCleaner() {
  const [text, setText] = useState("")
  const [removeExtraSpaces, setRemoveExtraSpaces] = useState(true)
  const [removeLineBreaks, setRemoveLineBreaks] = useState(false)
  const [trimLines, setTrimLines] = useState(true)
  const [removeEmptyLines, setRemoveEmptyLines] = useState(true)
  const [result, setResult] = useState("")
  const [copied, setCopied] = useState(false)

  const cleanText = () => {
    let cleaned = text

    if (trimLines) {
      cleaned = cleaned
        .split("\n")
        .map((line) => line.trim())
        .join("\n")
    }

    if (removeEmptyLines) {
      cleaned = cleaned
        .split("\n")
        .filter((line) => line.length > 0)
        .join("\n")
    }

    if (removeExtraSpaces) {
      cleaned = cleaned.replace(/ {2,}/g, " ")
    }

    if (removeLineBreaks) {
      cleaned = cleaned.replace(/\n/g, " ")
    }

    setResult(cleaned)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Text Input</CardTitle>
          <CardDescription>Paste your text to clean</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text">Text</Label>
            <Textarea
              id="text"
              placeholder="Paste your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="spaces"
                checked={removeExtraSpaces}
                onCheckedChange={(checked) => setRemoveExtraSpaces(checked as boolean)}
              />
              <Label htmlFor="spaces" className="cursor-pointer">
                Remove extra spaces
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="breaks"
                checked={removeLineBreaks}
                onCheckedChange={(checked) => setRemoveLineBreaks(checked as boolean)}
              />
              <Label htmlFor="breaks" className="cursor-pointer">
                Remove line breaks
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="trim" checked={trimLines} onCheckedChange={(checked) => setTrimLines(checked as boolean)} />
              <Label htmlFor="trim" className="cursor-pointer">
                Trim each line
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="empty"
                checked={removeEmptyLines}
                onCheckedChange={(checked) => setRemoveEmptyLines(checked as boolean)}
              />
              <Label htmlFor="empty" className="cursor-pointer">
                Remove empty lines
              </Label>
            </div>
          </div>

          <Button onClick={cleanText} className="w-full">
            Clean Text
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Cleaned Text</CardTitle>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea value={result} readOnly rows={8} className="font-mono text-sm" />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
