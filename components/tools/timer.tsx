"use client"

import { CardContent } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import React from "react"

export default function Timer() {
  const [duration, setDuration] = React.useState({ hours: 0, minutes: 0, seconds: 0 })
  const [timeLeft, setTimeLeft] = React.useState(0)
  const [isRunning, setIsRunning] = React.useState(false)

  React.useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1000) {
            setIsRunning(false)
            return 0
          }
          return t - 1000
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const startTimer = () => {
    const total = (duration.hours * 3600 + duration.minutes * 60 + duration.seconds) * 1000
    setTimeLeft(total)
    setIsRunning(true)
  }

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / 3600000)
    const minutes = Math.floor((ms % 3600000) / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-6">
      {!isRunning && timeLeft === 0 ? (
        <>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="hours">Hours</Label>
              <Input
                id="hours"
                type="number"
                min="0"
                value={duration.hours}
                onChange={(e) => setDuration({ ...duration, hours: Number.parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label htmlFor="minutes">Minutes</Label>
              <Input
                id="minutes"
                type="number"
                min="0"
                max="59"
                value={duration.minutes}
                onChange={(e) => setDuration({ ...duration, minutes: Number.parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label htmlFor="seconds">Seconds</Label>
              <Input
                id="seconds"
                type="number"
                min="0"
                max="59"
                value={duration.seconds}
                onChange={(e) => setDuration({ ...duration, seconds: Number.parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>
          <Button onClick={startTimer} className="w-full">
            Start Timer
          </Button>
        </>
      ) : (
        <>
          <Card>
            <CardContent className="pt-6">
              <div className="text-6xl font-mono font-bold text-center">{formatTime(timeLeft)}</div>
            </CardContent>
          </Card>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              className="flex-1"
              variant={isRunning ? "destructive" : "default"}
            >
              {isRunning ? "Pause" : "Resume"}
            </Button>
            <Button
              onClick={() => {
                setTimeLeft(0)
                setIsRunning(false)
              }}
              variant="outline"
            >
              Reset
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
