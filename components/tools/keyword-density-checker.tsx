"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface KeywordData {
  keyword: string
  count: number
  density: number
}

export default function KeywordDensityChecker() {
  const [text, setText] = useState("")
  const [minLength, setMinLength] = useState("3")
  const [results, setResults] = useState<{
    totalWords: number
    uniqueWords: number
    keywords: KeywordData[]
  } | null>(null)

  const analyzeText = () => {
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length >= Number.parseInt(minLength))

    const totalWords = words.length
    const wordCount: { [key: string]: number } = {}

    words.forEach((word) => {
      wordCount[word] = (wordCount[word] || 0) + 1
    })

    const keywords: KeywordData[] = Object.entries(wordCount)
      .map(([keyword, count]) => ({
        keyword,
        count,
        density: (count / totalWords) * 100,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20)

    setResults({
      totalWords,
      uniqueWords: Object.keys(wordCount).length,
      keywords,
    })
  }

  const handleReset = () => {
    setText("")
    setResults(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Keyword Density Checker</CardTitle>
        <CardDescription>Analyze keyword frequency and density in your content</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="text">Text to Analyze</Label>
          <Textarea
            id="text"
            placeholder="Paste your content here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="minLength">Minimum Word Length</Label>
          <Input
            id="minLength"
            type="number"
            min="1"
            value={minLength}
            onChange={(e) => setMinLength(e.target.value)}
            className="w-32"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={analyzeText} className="flex-1">
            Analyze
          </Button>
          <Button onClick={handleReset} variant="outline">
            Reset
          </Button>
        </div>

        {results && (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-6 text-center">
                <p className="mb-2 text-sm text-muted-foreground">Total Words</p>
                <p className="text-3xl font-bold text-primary">{results.totalWords}</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6 text-center">
                <p className="mb-2 text-sm text-muted-foreground">Unique Words</p>
                <p className="text-3xl font-bold text-primary">{results.uniqueWords}</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Top Keywords (Top 20)</Label>
              <div className="rounded-lg border border-border">
                <div className="grid grid-cols-3 gap-4 border-b border-border bg-muted p-4 font-semibold">
                  <div>Keyword</div>
                  <div className="text-center">Count</div>
                  <div className="text-right">Density</div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {results.keywords.map((item, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4 border-b border-border p-4 last:border-0">
                      <div className="font-mono">{item.keyword}</div>
                      <div className="text-center">{item.count}</div>
                      <div className="text-right">{item.density.toFixed(2)}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
