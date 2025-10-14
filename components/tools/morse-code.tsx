"use client"

import { CardContent } from "@/components/ui/card"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import { Textarea } from "@/components/ui/textarea"

import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"

import React from "react"

export default function MorseCode() {
  const [input, setInput] = React.useState("")
  const [output, setOutput] = React.useState("")
  const [mode, setMode] = React.useState<"encode" | "decode">("encode")

  const morseMap: Record<string, string> = {
    A: ".-",
    B: "-...",
    C: "-.-.",
    D: "-..",
    E: ".",
    F: "..-.",
    G: "--.",
    H: "....",
    I: "..",
    J: ".---",
    K: "-.-",
    L: ".-..",
    M: "--",
    N: "-.",
    O: "---",
    P: ".--.",
    Q: "--.-",
    R: ".-.",
    S: "...",
    T: "-",
    U: "..-",
    V: "...-",
    W: ".--",
    X: "-..-",
    Y: "-.--",
    Z: "--..",
    "0": "-----",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    " ": "/",
  }

  const reverseMorseMap = Object.fromEntries(Object.entries(morseMap).map(([k, v]) => [v, k]))

  const convert = () => {
    if (mode === "encode") {
      const result = input
        .toUpperCase()
        .split("")
        .map((char) => morseMap[char] || char)
        .join(" ")
      setOutput(result)
    } else {
      const result = input
        .split(" ")
        .map((code) => reverseMorseMap[code] || code)
        .join("")
      setOutput(result)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Button
          variant={mode === "encode" ? "default" : "outline"}
          onClick={() => setMode("encode")}
          className="flex-1"
        >
          Text to Morse
        </Button>
        <Button
          variant={mode === "decode" ? "default" : "outline"}
          onClick={() => setMode("decode")}
          className="flex-1"
        >
          Morse to Text
        </Button>
      </div>

      <div>
        <Label htmlFor="input">{mode === "encode" ? "Enter Text" : "Enter Morse Code"}</Label>
        <Textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "encode" ? "Enter text..." : "Enter morse code (use spaces between letters)..."}
          className="min-h-[150px] font-mono"
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
            <Textarea value={output} readOnly className="min-h-[150px] font-mono" />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
