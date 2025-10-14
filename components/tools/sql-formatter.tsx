"use client"

import { CardContent } from "@/components/ui/card"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Textarea } from "@/components/ui/textarea"

import { Label } from "@/components/ui/label"

import React from "react"

export default function SqlFormatter() {
  const [input, setInput] = React.useState("")
  const [output, setOutput] = React.useState("")

  const format = () => {
    const keywords = [
      "SELECT",
      "FROM",
      "WHERE",
      "JOIN",
      "LEFT",
      "RIGHT",
      "INNER",
      "OUTER",
      "ON",
      "AND",
      "OR",
      "ORDER BY",
      "GROUP BY",
      "HAVING",
      "LIMIT",
      "INSERT",
      "UPDATE",
      "DELETE",
      "CREATE",
      "ALTER",
      "DROP",
    ]

    let formatted = input
    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "gi")
      formatted = formatted.replace(regex, `\n${keyword}`)
    })

    formatted = formatted
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join("\n")

    setOutput(formatted)
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="input">SQL Query</Label>
        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter SQL query to format..."
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      <Button onClick={format} className="w-full" disabled={!input}>
        Format SQL
      </Button>

      {output && (
        <Card>
          <CardHeader>
            <CardTitle>Formatted SQL</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={output} readOnly className="min-h-[200px] font-mono text-sm" />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
