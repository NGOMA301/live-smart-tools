"use client"

import { CardContent } from "@/components/ui/card"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import { Textarea } from "@/components/ui/textarea"

import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"

import React from "react"

export default function HtmlEncoder() {
  const [input, setInput] = React.useState("")
  const [output, setOutput] = React.useState("")
  const [mode, setMode] = React.useState<"encode" | "decode">("encode")

  const convert = () => {
    if (mode === "encode") {
      const encoded = input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
      setOutput(encoded)
    } else {
      const decoded = input
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
      setOutput(decoded)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Button
          variant={mode === "encode" ? "default" : "outline"}
          onClick={() => setMode("encode")}
          className="flex-1"
        >
          Encode
        </Button>
        <Button
          variant={mode === "decode" ? "default" : "outline"}
          onClick={() => setMode("decode")}
          className="flex-1"
        >
          Decode
        </Button>
      </div>

      <div>
        <Label htmlFor="input">Enter HTML</Label>
        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "encode" ? "<div>Hello World</div>" : "&lt;div&gt;Hello World&lt;/div&gt;"}
          className="min-h-[200px] font-mono"
        />
      </div>

      <Button onClick={convert} className="w-full" disabled={!input}>
        {mode === "encode" ? "Encode" : "Decode"} HTML
      </Button>

      {output && (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={output} readOnly className="min-h-[200px] font-mono" />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
