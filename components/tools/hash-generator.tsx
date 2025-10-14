"use client"

import { CardContent } from "@/components/ui/card"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Textarea } from "@/components/ui/textarea"

import { Label } from "@/components/ui/label"

import React from "react"

export default function HashGenerator() {
  const [input, setInput] = React.useState("")
  const [hashes, setHashes] = React.useState<Record<string, string>>({})

  const generateHashes = async () => {
    const encoder = new TextEncoder()
    const data = encoder.encode(input)

    const results: Record<string, string> = {}

    // SHA-256
    const sha256Buffer = await crypto.subtle.digest("SHA-256", data)
    results["SHA-256"] = Array.from(new Uint8Array(sha256Buffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")

    // SHA-512
    const sha512Buffer = await crypto.subtle.digest("SHA-512", data)
    results["SHA-512"] = Array.from(new Uint8Array(sha512Buffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")

    // SHA-1
    const sha1Buffer = await crypto.subtle.digest("SHA-1", data)
    results["SHA-1"] = Array.from(new Uint8Array(sha1Buffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")

    setHashes(results)
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="input">Enter Text</Label>
        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to generate hashes..."
          className="min-h-[150px]"
        />
      </div>

      <Button onClick={generateHashes} className="w-full" disabled={!input}>
        Generate Hashes
      </Button>

      {Object.keys(hashes).length > 0 && (
        <div className="space-y-4">
          {Object.entries(hashes).map(([algorithm, hash]) => (
            <Card key={algorithm}>
              <CardHeader>
                <CardTitle className="text-lg">{algorithm}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-mono text-sm break-all bg-muted p-3 rounded">{hash}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
