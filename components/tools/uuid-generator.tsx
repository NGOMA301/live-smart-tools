"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

export default function UuidGenerator() {
  const [count, setCount] = useState("1")
  const [uuids, setUuids] = useState<string[]>([])
  const [copied, setCopied] = useState<number | null>(null)

  const generateUuid = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c === "x" ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  const generateUuids = () => {
    const num = Number.parseInt(count)
    if (isNaN(num) || num <= 0 || num > 100) return

    const newUuids = []
    for (let i = 0; i < num; i++) {
      newUuids.push(generateUuid())
    }
    setUuids(newUuids)
  }

  const copyToClipboard = (uuid: string, index: number) => {
    navigator.clipboard.writeText(uuid)
    setCopied(index)
    setTimeout(() => setCopied(null), 2000)
  }

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"))
    setCopied(-1)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate UUIDs</CardTitle>
          <CardDescription>Create unique identifiers (UUID v4)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="count">How many UUIDs?</Label>
            <Input
              id="count"
              type="number"
              placeholder="1"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(e.target.value)}
            />
          </div>
          <Button onClick={generateUuids} className="w-full">
            Generate
          </Button>
        </CardContent>
      </Card>

      {uuids.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Generated UUIDs</CardTitle>
              <Button variant="outline" size="sm" onClick={copyAll}>
                {copied === -1 ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="ml-2">Copy All</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {uuids.map((uuid, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-mono text-sm">{uuid}</span>
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(uuid, index)}>
                  {copied === index ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
