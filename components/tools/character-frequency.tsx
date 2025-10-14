"use client"

import { CardContent } from "@/components/ui/card"

import { CardDescription } from "@/components/ui/card"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Textarea } from "@/components/ui/textarea"

import { Label } from "@/components/ui/label"

import React from "react"

export default function CharacterFrequency() {
  const [text, setText] = React.useState("")
  const [frequency, setFrequency] = React.useState<Array<{ char: string; count: number; percentage: number }>>([])

  const analyzeText = () => {
    const charMap = new Map<string, number>()
    const totalChars = text.length

    for (const char of text) {
      charMap.set(char, (charMap.get(char) || 0) + 1)
    }

    const result = Array.from(charMap.entries())
      .map(([char, count]) => ({
        char: char === "\n" ? "\\n" : char === " " ? "(space)" : char,
        count,
        percentage: (count / totalChars) * 100,
      }))
      .sort((a, b) => b.count - a.count)

    setFrequency(result)
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="text">Enter Text</Label>
        <Textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to analyze character frequency..."
          className="min-h-[200px]"
        />
      </div>

      <Button onClick={analyzeText} className="w-full" disabled={!text}>
        Analyze Frequency
      </Button>

      {frequency.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Character Frequency Analysis</CardTitle>
            <CardDescription>Total characters: {text.length}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {frequency.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-2 rounded bg-muted/50">
                  <span className="font-mono font-bold w-20">{item.char}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-background rounded-full h-2 overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: `${item.percentage}%` }} />
                      </div>
                      <span className="text-sm text-muted-foreground w-16 text-right">
                        {item.percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-medium w-12 text-right">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
