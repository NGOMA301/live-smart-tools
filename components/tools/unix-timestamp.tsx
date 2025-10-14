"use client"

import { CardContent } from "@/components/ui/card"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"

import React from "react"

export default function UnixTimestamp() {
  const [timestamp, setTimestamp] = React.useState(Math.floor(Date.now() / 1000))
  const [date, setDate] = React.useState(new Date().toISOString().slice(0, 16))
  const [mode, setMode] = React.useState<"timestamp-to-date" | "date-to-timestamp">("timestamp-to-date")
  const [result, setResult] = React.useState("")

  const convert = () => {
    if (mode === "timestamp-to-date") {
      const d = new Date(timestamp * 1000)
      setResult(d.toLocaleString())
    } else {
      const ts = Math.floor(new Date(date).getTime() / 1000)
      setResult(ts.toString())
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Button
          variant={mode === "timestamp-to-date" ? "default" : "outline"}
          onClick={() => setMode("timestamp-to-date")}
          className="flex-1"
        >
          Timestamp to Date
        </Button>
        <Button
          variant={mode === "date-to-timestamp" ? "default" : "outline"}
          onClick={() => setMode("date-to-timestamp")}
          className="flex-1"
        >
          Date to Timestamp
        </Button>
      </div>

      {mode === "timestamp-to-date" ? (
        <div>
          <Label htmlFor="timestamp">Unix Timestamp</Label>
          <Input
            id="timestamp"
            type="number"
            value={timestamp}
            onChange={(e) => setTimestamp(Number.parseInt(e.target.value) || 0)}
            placeholder="1234567890"
          />
          <p className="text-sm text-muted-foreground mt-2">Current timestamp: {Math.floor(Date.now() / 1000)}</p>
        </div>
      ) : (
        <div>
          <Label htmlFor="date">Date and Time</Label>
          <Input id="date" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
      )}

      <Button onClick={convert} className="w-full">
        Convert
      </Button>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-mono font-bold">{result}</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
