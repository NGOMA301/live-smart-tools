"use client"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import { CardContent } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Textarea } from "@/components/ui/textarea"

import { Label } from "@/components/ui/label"

import React from "react"

export default function CssMinifier() {
  const [input, setInput] = React.useState("")
  const [output, setOutput] = React.useState("")
  const [stats, setStats] = React.useState({ original: 0, minified: 0, saved: 0 })

  const minify = () => {
    const minified = input
      .replace(/\/\*[\s\S]*?\*\//g, "") // Remove comments
      .replace(/\s+/g, " ") // Replace multiple spaces with single space
      .replace(/\s*([{}:;,])\s*/g, "$1") // Remove spaces around special chars
      .replace(/;}/g, "}") // Remove last semicolon in block
      .trim()

    setOutput(minified)
    setStats({
      original: input.length,
      minified: minified.length,
      saved: (1 - minified.length / input.length) * 100,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="input">CSS Code</Label>
        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter CSS code to minify..."
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      <Button onClick={minify} className="w-full" disabled={!input}>
        Minify CSS
      </Button>

      {output && (
        <>
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold">{stats.original}</div>
                <div className="text-sm text-muted-foreground">Original Size</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.minified}</div>
                <div className="text-sm text-muted-foreground">Minified Size</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.saved.toFixed(1)}%</div>
                <div className="text-sm text-muted-foreground">Saved</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Minified CSS</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea value={output} readOnly className="min-h-[200px] font-mono text-sm" />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
