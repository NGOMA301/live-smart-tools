"use client"

import { CardContent } from "@/components/ui/card"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Textarea } from "@/components/ui/textarea"

import { Label } from "@/components/ui/label"

import { AlertDescription } from "@/components/ui/alert"

import { Alert } from "@/components/ui/alert"

import React from "react"

export default function Rot13() {
  const [input, setInput] = React.useState("")
  const [output, setOutput] = React.useState("")

  const rot13 = (str: string) => {
    return str.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= "Z" ? 65 : 97
      return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start)
    })
  }

  const convert = () => {
    setOutput(rot13(input))
  }

  return (
    <div className="space-y-6">
      <Alert>
        <AlertDescription>
          ROT13 is a simple letter substitution cipher that replaces each letter with the letter 13 positions after it
          in the alphabet.
        </AlertDescription>
      </Alert>

      <div>
        <Label htmlFor="input">Enter Text</Label>
        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to encode/decode..."
          className="min-h-[150px]"
        />
      </div>

      <Button onClick={convert} className="w-full" disabled={!input}>
        Convert
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
