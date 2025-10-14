"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function WordCounter() {
  const [text, setText] = useState("")
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
  })

  useEffect(() => {
    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, "").length
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
    const paragraphs = text.split(/\n\n+/).filter((p) => p.trim().length > 0).length

    setStats({ characters, charactersNoSpaces, words, sentences, paragraphs })
  }, [text])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Word Counter</CardTitle>
        <CardDescription>Count words, characters, sentences, and paragraphs</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="text">Enter your text</Label>
          <Textarea
            id="text"
            placeholder="Start typing or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            className="resize-none"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-lg border border-border bg-card p-4 text-center">
            <p className="mb-1 text-sm text-muted-foreground">Words</p>
            <p className="text-2xl font-bold">{stats.words}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 text-center">
            <p className="mb-1 text-sm text-muted-foreground">Characters</p>
            <p className="text-2xl font-bold">{stats.characters}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 text-center">
            <p className="mb-1 text-sm text-muted-foreground">No Spaces</p>
            <p className="text-2xl font-bold">{stats.charactersNoSpaces}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 text-center">
            <p className="mb-1 text-sm text-muted-foreground">Sentences</p>
            <p className="text-2xl font-bold">{stats.sentences}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 text-center">
            <p className="mb-1 text-sm text-muted-foreground">Paragraphs</p>
            <p className="text-2xl font-bold">{stats.paragraphs}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
