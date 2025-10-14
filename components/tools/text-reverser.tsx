"use client"

import { CardContent } from "@/components/ui/card"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Textarea } from "@/components/ui/textarea"

import { Label } from "@/components/ui/label"

import React from "react"

export default function TextReverser() {
  const [text, setText] = React.useState("")
  const [reversed, setReversed] = React.useState("")
  const [reverseType, setReverseType] = React.useState<"characters" | "words" | "lines">("characters")

  const reverseText = () => {
    let result = ""

    switch (reverseType) {
      case "characters":
        result = text.split("").reverse().join("")
        break
      case "words":
        result = text.split(" ").reverse().join(" ")
        break
      case "lines":
        result = text.split("\n").reverse().join("\n")
        break
    }

    setReversed(result)
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="text">Enter Text</Label>
        <Textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to reverse..."
          className="min-h-[150px]"
        />
      </div>

      <div>
        <Label>Reverse Type</Label>
        <div className="flex gap-2 mt-2">
          <Button
            variant={reverseType === "characters" ? "default" : "outline"}
            onClick={() => setReverseType("characters")}
          >
            Characters
          </Button>
          <Button variant={reverseType === "words" ? "default" : "outline"} onClick={() => setReverseType("words")}>
            Words
          </Button>
          <Button variant={reverseType === "lines" ? "default" : "outline"} onClick={() => setReverseType("lines")}>
            Lines
          </Button>
        </div>
      </div>

      <Button onClick={reverseText} className="w-full" disabled={!text}>
        Reverse Text
      </Button>

      {reversed && (
        <Card>
          <CardHeader>
            <CardTitle>Reversed Text</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={reversed} readOnly className="min-h-[150px]" />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
