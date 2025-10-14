"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

export default function JsonFormatter() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setResult(formatted)
      setError("")
    } catch (e) {
      setError("Invalid JSON: " + (e as Error).message)
      setResult("")
    }
  }

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setResult(minified)
      setError("")
    } catch (e) {
      setError("Invalid JSON: " + (e as Error).message)
      setResult("")
    }
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
          <CardTitle>JSON Input</CardTitle>
          <CardDescription>Paste your JSON to format or validate</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="json">JSON</Label>
            <Textarea
              id="json"
              placeholder='{"key": "value"}'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={8}
              className="font-mono text-sm"
            />
          </div>

          {error && <div className="text-sm text-red-500 p-3 bg-red-50 dark:bg-red-950 rounded-lg">{error}</div>}

          <div className="flex gap-2">
            <Button onClick={formatJson} className="flex-1">
              Format
            </Button>
            <Button onClick={minifyJson} variant="outline" className="flex-1 bg-transparent">
              Minify
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Formatted JSON</CardTitle>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea value={result} readOnly rows={12} className="font-mono text-sm" />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
