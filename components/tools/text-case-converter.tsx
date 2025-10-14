"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function TextCaseConverter() {
  const [text, setText] = useState("")

  const convertCase = (type: string) => {
    switch (type) {
      case "uppercase":
        setText(text.toUpperCase())
        break
      case "lowercase":
        setText(text.toLowerCase())
        break
      case "title":
        setText(
          text
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
        )
        break
      case "sentence":
        setText(
          text
            .toLowerCase()
            .split(". ")
            .map((sentence) => sentence.charAt(0).toUpperCase() + sentence.slice(1))
            .join(". "),
        )
        break
      case "capitalize":
        setText(text.charAt(0).toUpperCase() + text.slice(1).toLowerCase())
        break
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Text Case Converter</CardTitle>
        <CardDescription>Convert text to different cases</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="text">Enter your text</Label>
          <Textarea
            id="text"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
          />
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          <Button onClick={() => convertCase("uppercase")} variant="outline">
            UPPERCASE
          </Button>
          <Button onClick={() => convertCase("lowercase")} variant="outline">
            lowercase
          </Button>
          <Button onClick={() => convertCase("title")} variant="outline">
            Title Case
          </Button>
          <Button onClick={() => convertCase("sentence")} variant="outline">
            Sentence case
          </Button>
          <Button onClick={() => convertCase("capitalize")} variant="outline">
            Capitalize
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
