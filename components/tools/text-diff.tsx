"use client"

import { cn } from "@/lib/utils"

import { CardContent } from "@/components/ui/card"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Textarea } from "@/components/ui/textarea"

import { Label } from "@/components/ui/label"

import React from "react"

export default function TextDiff() {
  const [text1, setText1] = React.useState("")
  const [text2, setText2] = React.useState("")
  const [diff, setDiff] = React.useState<Array<{ type: "added" | "removed" | "unchanged"; value: string }>>([])

  const calculateDiff = () => {
    const lines1 = text1.split("\n")
    const lines2 = text2.split("\n")
    const result: Array<{ type: "added" | "removed" | "unchanged"; value: string }> = []

    let i = 0,
      j = 0
    while (i < lines1.length || j < lines2.length) {
      if (i >= lines1.length) {
        result.push({ type: "added", value: lines2[j] })
        j++
      } else if (j >= lines2.length) {
        result.push({ type: "removed", value: lines1[i] })
        i++
      } else if (lines1[i] === lines2[j]) {
        result.push({ type: "unchanged", value: lines1[i] })
        i++
        j++
      } else {
        result.push({ type: "removed", value: lines1[i] })
        result.push({ type: "added", value: lines2[j] })
        i++
        j++
      }
    }
    setDiff(result)
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="text1">Original Text</Label>
          <Textarea
            id="text1"
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Enter original text..."
            className="min-h-[200px] font-mono"
          />
        </div>
        <div>
          <Label htmlFor="text2">Modified Text</Label>
          <Textarea
            id="text2"
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Enter modified text..."
            className="min-h-[200px] font-mono"
          />
        </div>
      </div>

      <Button onClick={calculateDiff} className="w-full">
        Compare Texts
      </Button>

      {diff.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Differences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 font-mono text-sm">
              {diff.map((line, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-2 rounded",
                    line.type === "added" && "bg-green-500/10 text-green-600",
                    line.type === "removed" && "bg-red-500/10 text-red-600",
                    line.type === "unchanged" && "bg-muted/50",
                  )}
                >
                  {line.type === "added" && "+ "}
                  {line.type === "removed" && "- "}
                  {line.type === "unchanged" && "  "}
                  {line.value}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
