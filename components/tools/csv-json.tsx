"use client"

import { CardContent } from "@/components/ui/card"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import { AlertDescription } from "@/components/ui/alert"

import { Alert } from "@/components/ui/alert"

import { Textarea } from "@/components/ui/textarea"

import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"

import React from "react"

export default function CsvJson() {
  const [input, setInput] = React.useState("")
  const [output, setOutput] = React.useState("")
  const [mode, setMode] = React.useState<"csv-to-json" | "json-to-csv">("csv-to-json")
  const [error, setError] = React.useState("")

  const convert = () => {
    setError("")
    try {
      if (mode === "csv-to-json") {
        const lines = input.trim().split("\n")
        const headers = lines[0].split(",").map((h) => h.trim())
        const result = lines.slice(1).map((line) => {
          const values = line.split(",").map((v) => v.trim())
          return headers.reduce(
            (obj, header, index) => {
              obj[header] = values[index] || ""
              return obj
            },
            {} as Record<string, string>,
          )
        })
        setOutput(JSON.stringify(result, null, 2))
      } else {
        const data = JSON.parse(input)
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("JSON must be an array of objects")
        }
        const headers = Object.keys(data[0])
        const csv = [headers.join(","), ...data.map((row) => headers.map((h) => row[h] || "").join(","))].join("\n")
        setOutput(csv)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Button
          variant={mode === "csv-to-json" ? "default" : "outline"}
          onClick={() => setMode("csv-to-json")}
          className="flex-1"
        >
          CSV to JSON
        </Button>
        <Button
          variant={mode === "json-to-csv" ? "default" : "outline"}
          onClick={() => setMode("json-to-csv")}
          className="flex-1"
        >
          JSON to CSV
        </Button>
      </div>

      <div>
        <Label htmlFor="input">{mode === "csv-to-json" ? "Enter CSV" : "Enter JSON"}</Label>
        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "csv-to-json" ? "name,age,city\nJohn,30,NYC" : '[{"name":"John","age":"30"}]'}
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      <Button onClick={convert} className="w-full" disabled={!input}>
        Convert
      </Button>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {output && (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={output} readOnly className="min-h-[200px] font-mono text-sm" />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
