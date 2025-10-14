"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Check } from "lucide-react"

const loremWords = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
]

export default function LoremIpsum() {
  const [count, setCount] = useState("3")
  const [type, setType] = useState("paragraphs")
  const [result, setResult] = useState("")
  const [copied, setCopied] = useState(false)

  const generateLorem = () => {
    const num = Number.parseInt(count)
    if (isNaN(num) || num <= 0) return

    let text = ""

    if (type === "words") {
      const words = []
      for (let i = 0; i < num; i++) {
        words.push(loremWords[Math.floor(Math.random() * loremWords.length)])
      }
      text = words.join(" ") + "."
    } else if (type === "sentences") {
      for (let i = 0; i < num; i++) {
        const sentenceLength = Math.floor(Math.random() * 10) + 5
        const words = []
        for (let j = 0; j < sentenceLength; j++) {
          words.push(loremWords[Math.floor(Math.random() * loremWords.length)])
        }
        text += words.join(" ").charAt(0).toUpperCase() + words.join(" ").slice(1) + ". "
      }
    } else {
      // paragraphs
      for (let i = 0; i < num; i++) {
        const sentenceCount = Math.floor(Math.random() * 4) + 3
        let paragraph = ""
        for (let j = 0; j < sentenceCount; j++) {
          const sentenceLength = Math.floor(Math.random() * 10) + 5
          const words = []
          for (let k = 0; k < sentenceLength; k++) {
            words.push(loremWords[Math.floor(Math.random() * loremWords.length)])
          }
          paragraph += words.join(" ").charAt(0).toUpperCase() + words.join(" ").slice(1) + ". "
        }
        text += paragraph + "\n\n"
      }
    }

    setResult(text.trim())
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
          <CardTitle>Generate Lorem Ipsum</CardTitle>
          <CardDescription>Create placeholder text for your designs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="count">Count</Label>
              <Input
                id="count"
                type="number"
                placeholder="3"
                value={count}
                onChange={(e) => setCount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paragraphs">Paragraphs</SelectItem>
                  <SelectItem value="sentences">Sentences</SelectItem>
                  <SelectItem value="words">Words</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={generateLorem} className="w-full">
            Generate
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Generated Text</CardTitle>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted rounded-lg whitespace-pre-wrap text-sm">{result}</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
