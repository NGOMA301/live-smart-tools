"use client"

import { CardContent } from "@/components/ui/card"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import { Textarea } from "@/components/ui/textarea"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"

import { AlertDescription } from "@/components/ui/alert"

import { Alert } from "@/components/ui/alert"

import React from "react"

export default function CaesarCipher() {
  const [input, setInput] = React.useState("")
  const [output, setOutput] = React.useState("")
  const [shift, setShift] = React.useState(3)
  const [mode, setMode] = React.useState<"encode" | "decode">("encode")

  const caesar = (str: string, shiftAmount: number, decode: boolean) => {
    const actualShift = decode ? -shiftAmount : shiftAmount
    return str.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= "Z" ? 65 : 97
      return String.fromCharCode(((char.charCodeAt(0) - start + actualShift + 26) % 26) + start)
    })
  }

  const convert = () => {
    setOutput(caesar(input, shift, mode === "decode"))
  }

  return (
    <div className="space-y-6">
      <Alert>
        <AlertDescription>
          Caesar cipher shifts each letter by a fixed number of positions in the alphabet.
        </AlertDescription>
      </Alert>

      <div className="flex gap-2">
        <Button
          variant={mode === "encode" ? "default" : "outline"}
          onClick={() => setMode("encode")}
          className="flex-1"
        >
          Encode
        </Button>
        <Button
          variant={mode === "decode" ? "default" : "outline"}
          onClick={() => setMode("decode")}
          className="flex-1"
        >
          Decode
        </Button>
      </div>

      <div>
        <Label htmlFor="shift">Shift Amount (1-25)</Label>
        <Input
          id="shift"
          type="number"
          min="1"
          max="25"
          value={shift}
          onChange={(e) => setShift(Number.parseInt(e.target.value) || 3)}
        />
      </div>

      <div>
        <Label htmlFor="input">Enter Text</Label>
        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text..."
          className="min-h-[150px]"
        />
      </div>

      <Button onClick={convert} className="w-full" disabled={!input}>
        {mode === "encode" ? "Encode" : "Decode"}
      </Button>

      {output && (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={output} readOnly className="min-h-[150px]" />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
