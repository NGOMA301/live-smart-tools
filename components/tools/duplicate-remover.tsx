"use client"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import { CardContent } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Textarea } from "@/components/ui/textarea"

import { Label } from "@/components/ui/label"

import React from "react"

export default function DuplicateRemover() {
  const [text, setText] = React.useState("")
  const [result, setResult] = React.useState("")
  const [stats, setStats] = React.useState({ original: 0, unique: 0, removed: 0 })

  const removeDuplicates = () => {
    const lines = text.split("\n")
    const uniqueLines = Array.from(new Set(lines))

    setResult(uniqueLines.join("\n"))
    setStats({
      original: lines.length,
      unique: uniqueLines.length,
      removed: lines.length - uniqueLines.length,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="text">Enter Text (One Item Per Line)</Label>
        <Textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text with duplicate lines..."
          className="min-h-[200px] font-mono"
        />
      </div>

      <Button onClick={removeDuplicates} className="w-full" disabled={!text}>
        Remove Duplicates
      </Button>

      {result && (
        <>
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold">{stats.original}</div>
                <div className="text-sm text-muted-foreground">Original Lines</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.unique}</div>
                <div className="text-sm text-muted-foreground">Unique Lines</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-red-600">{stats.removed}</div>
                <div className="text-sm text-muted-foreground">Removed</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Result</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea value={result} readOnly className="min-h-[200px] font-mono" />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
