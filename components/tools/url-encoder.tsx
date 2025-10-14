"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function URLEncoder() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  const encode = () => {
    try {
      const encoded = encodeURIComponent(input)
      setOutput(encoded)
    } catch (err) {
      setOutput("Error: Failed to encode URL")
    }
  }

  const decode = () => {
    try {
      const decoded = decodeURIComponent(input)
      setOutput(decoded)
    } catch (err) {
      setOutput("Error: Invalid URL encoded string")
    }
  }

  const handleReset = () => {
    setInput("")
    setOutput("")
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>URL Encoder/Decoder</CardTitle>
        <CardDescription>Encode and decode URL strings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="encode">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="encode">Encode</TabsTrigger>
            <TabsTrigger value="decode">Decode</TabsTrigger>
          </TabsList>

          <TabsContent value="encode" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="encode-input">Text to Encode</Label>
              <Textarea
                id="encode-input"
                placeholder="Enter text to URL encode..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={6}
              />
            </div>
            <Button onClick={encode} className="w-full">
              Encode URL
            </Button>
          </TabsContent>

          <TabsContent value="decode" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="decode-input">URL to Decode</Label>
              <Textarea
                id="decode-input"
                placeholder="Enter URL encoded string to decode..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={6}
              />
            </div>
            <Button onClick={decode} className="w-full">
              Decode URL
            </Button>
          </TabsContent>
        </Tabs>

        {output && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Result</Label>
              <Button onClick={copyToClipboard} variant="outline" size="sm">
                Copy
              </Button>
            </div>
            <div className="rounded-lg border border-border bg-muted p-4">
              <pre className="whitespace-pre-wrap break-all text-sm">{output}</pre>
            </div>
          </div>
        )}

        <Button onClick={handleReset} variant="outline" className="w-full bg-transparent">
          Reset
        </Button>
      </CardContent>
    </Card>
  )
}
