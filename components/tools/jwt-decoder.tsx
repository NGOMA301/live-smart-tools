"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function JWTDecoder() {
  const [jwt, setJwt] = useState("")
  const [decoded, setDecoded] = useState<{
    header: any
    payload: any
    signature: string
  } | null>(null)
  const [error, setError] = useState("")

  const decodeJWT = () => {
    try {
      setError("")
      const parts = jwt.trim().split(".")

      if (parts.length !== 3) {
        throw new Error("Invalid JWT format. JWT must have 3 parts separated by dots.")
      }

      const header = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")))
      const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")))
      const signature = parts[2]

      setDecoded({ header, payload, signature })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to decode JWT")
      setDecoded(null)
    }
  }

  const handleReset = () => {
    setJwt("")
    setDecoded(null)
    setError("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>JWT Decoder</CardTitle>
        <CardDescription>Decode and inspect JSON Web Tokens</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="jwt">JWT Token</Label>
          <Textarea
            id="jwt"
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            value={jwt}
            onChange={(e) => setJwt(e.target.value)}
            rows={4}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={decodeJWT} className="flex-1">
            Decode JWT
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

        {decoded && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Header</Label>
              <div className="rounded-lg border border-border bg-muted p-4">
                <pre className="text-sm">{JSON.stringify(decoded.header, null, 2)}</pre>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Payload</Label>
              <div className="rounded-lg border border-border bg-muted p-4">
                <pre className="text-sm">{JSON.stringify(decoded.payload, null, 2)}</pre>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Signature</Label>
              <div className="rounded-lg border border-border bg-muted p-4">
                <p className="break-all text-sm font-mono">{decoded.signature}</p>
              </div>
            </div>

            {decoded.payload.exp && (
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-sm text-muted-foreground">
                  Expires: {new Date(decoded.payload.exp * 1000).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
