"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function RegexTester() {
  const [pattern, setPattern] = useState("")
  const [testString, setTestString] = useState("")
  const [flags, setFlags] = useState({
    g: false,
    i: false,
    m: false,
  })
  const [matches, setMatches] = useState<RegExpMatchArray | null>(null)
  const [error, setError] = useState("")

  const testRegex = () => {
    try {
      setError("")
      const flagString = Object.entries(flags)
        .filter(([_, value]) => value)
        .map(([key]) => key)
        .join("")

      const regex = new RegExp(pattern, flagString)
      const result = testString.match(regex)
      setMatches(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid regular expression")
      setMatches(null)
    }
  }

  const handleReset = () => {
    setPattern("")
    setTestString("")
    setFlags({ g: false, i: false, m: false })
    setMatches(null)
    setError("")
  }

  const highlightMatches = () => {
    if (!matches || matches.length === 0) return testString

    try {
      const flagString = Object.entries(flags)
        .filter(([_, value]) => value)
        .map(([key]) => key)
        .join("")
      const regex = new RegExp(pattern, flagString)

      return testString.split(regex).reduce((acc, part, i) => {
        if (i === 0) return part
        const match = matches[i - 1] || ""
        return `${acc}<mark class="bg-yellow-200 dark:bg-yellow-800">${match}</mark>${part}`
      }, "")
    } catch {
      return testString
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Regex Tester</CardTitle>
        <CardDescription>Test and debug regular expressions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="pattern">Regular Expression Pattern</Label>
          <Input id="pattern" placeholder="[A-Za-z]+" value={pattern} onChange={(e) => setPattern(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>Flags</Label>
          <div className="flex gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="flag-g"
                checked={flags.g}
                onCheckedChange={(checked) => setFlags({ ...flags, g: checked as boolean })}
              />
              <Label htmlFor="flag-g" className="cursor-pointer">
                g (global)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="flag-i"
                checked={flags.i}
                onCheckedChange={(checked) => setFlags({ ...flags, i: checked as boolean })}
              />
              <Label htmlFor="flag-i" className="cursor-pointer">
                i (case insensitive)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="flag-m"
                checked={flags.m}
                onCheckedChange={(checked) => setFlags({ ...flags, m: checked as boolean })}
              />
              <Label htmlFor="flag-m" className="cursor-pointer">
                m (multiline)
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="testString">Test String</Label>
          <Textarea
            id="testString"
            placeholder="Enter text to test against the regex..."
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            rows={6}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={testRegex} className="flex-1">
            Test Regex
          </Button>
          <Button onClick={handleReset} variant="outline">
            Reset
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {matches !== null && !error && (
          <div className="space-y-4">
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                {matches.length > 0
                  ? `Found ${matches.length} match${matches.length > 1 ? "es" : ""}`
                  : "No matches found"}
              </AlertDescription>
            </Alert>

            {matches.length > 0 && (
              <>
                <div className="space-y-2">
                  <Label>Highlighted Matches</Label>
                  <div
                    className="rounded-lg border border-border bg-muted p-4"
                    dangerouslySetInnerHTML={{ __html: highlightMatches() }}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Match Details</Label>
                  <div className="rounded-lg border border-border bg-muted p-4">
                    <pre className="text-sm">{JSON.stringify(matches, null, 2)}</pre>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
