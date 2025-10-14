"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const timeZones = [
  { value: "-12", label: "UTC-12:00" },
  { value: "-11", label: "UTC-11:00" },
  { value: "-10", label: "UTC-10:00 (Hawaii)" },
  { value: "-9", label: "UTC-09:00 (Alaska)" },
  { value: "-8", label: "UTC-08:00 (Pacific)" },
  { value: "-7", label: "UTC-07:00 (Mountain)" },
  { value: "-6", label: "UTC-06:00 (Central)" },
  { value: "-5", label: "UTC-05:00 (Eastern)" },
  { value: "-4", label: "UTC-04:00 (Atlantic)" },
  { value: "-3", label: "UTC-03:00" },
  { value: "-2", label: "UTC-02:00" },
  { value: "-1", label: "UTC-01:00" },
  { value: "0", label: "UTC+00:00 (London)" },
  { value: "1", label: "UTC+01:00 (Paris)" },
  { value: "2", label: "UTC+02:00 (Cairo)" },
  { value: "3", label: "UTC+03:00 (Moscow)" },
  { value: "4", label: "UTC+04:00 (Dubai)" },
  { value: "5", label: "UTC+05:00" },
  { value: "5.5", label: "UTC+05:30 (India)" },
  { value: "6", label: "UTC+06:00" },
  { value: "7", label: "UTC+07:00 (Bangkok)" },
  { value: "8", label: "UTC+08:00 (Singapore)" },
  { value: "9", label: "UTC+09:00 (Tokyo)" },
  { value: "10", label: "UTC+10:00 (Sydney)" },
  { value: "11", label: "UTC+11:00" },
  { value: "12", label: "UTC+12:00 (Auckland)" },
]

export default function TimeZoneConverter() {
  const [time, setTime] = useState("")
  const [fromZone, setFromZone] = useState("0")
  const [toZone, setToZone] = useState("-5")
  const [result, setResult] = useState<string | null>(null)

  const convertTime = (timeStr: string, from: string, to: string) => {
    if (!timeStr) {
      setResult(null)
      return
    }

    const [hours, minutes] = timeStr.split(":").map(Number)
    if (isNaN(hours) || isNaN(minutes)) {
      setResult(null)
      return
    }

    const fromOffset = Number.parseFloat(from)
    const toOffset = Number.parseFloat(to)
    const diff = toOffset - fromOffset

    let newHours = hours + diff
    const newMinutes = minutes

    // Handle day overflow
    while (newHours >= 24) newHours -= 24
    while (newHours < 0) newHours += 24

    const formattedTime = `${String(Math.floor(newHours)).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")}`
    setResult(formattedTime)
  }

  const handleTimeChange = (val: string) => {
    setTime(val)
    convertTime(val, fromZone, toZone)
  }

  const handleFromZoneChange = (zone: string) => {
    setFromZone(zone)
    convertTime(time, zone, toZone)
  }

  const handleToZoneChange = (zone: string) => {
    setToZone(zone)
    convertTime(time, fromZone, zone)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Time Conversion</CardTitle>
          <CardDescription>Convert time between different time zones</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input id="time" type="time" value={time} onChange={(e) => handleTimeChange(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="from">From Time Zone</Label>
            <Select value={fromZone} onValueChange={handleFromZoneChange}>
              <SelectTrigger id="from">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeZones.map((tz) => (
                  <SelectItem key={tz.value} value={tz.value}>
                    {tz.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="to">To Time Zone</Label>
            <Select value={toZone} onValueChange={handleToZoneChange}>
              <SelectTrigger id="to">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeZones.map((tz) => (
                  <SelectItem key={tz.value} value={tz.value}>
                    {tz.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Converted Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center p-6 bg-muted rounded-lg">
              <span className="text-4xl font-bold font-mono">{result}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
