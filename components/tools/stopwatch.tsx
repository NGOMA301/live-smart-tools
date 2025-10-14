"use client"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { CardContent } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import React from "react"

export default function Stopwatch() {
  const [time, setTime] = React.useState(0)
  const [isRunning, setIsRunning] = React.useState(false)
  const [laps, setLaps] = React.useState<number[]>([])

  React.useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(() => {
        setTime((t) => t + 10)
      }, 10)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const milliseconds = Math.floor((ms % 1000) / 10)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`
  }

  const handleLap = () => {
    setLaps([...laps, time])
  }

  const handleReset = () => {
    setTime(0)
    setLaps([])
    setIsRunning(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="text-6xl font-mono font-bold text-center">{formatTime(time)}</div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button
          onClick={() => setIsRunning(!isRunning)}
          className="flex-1"
          variant={isRunning ? "destructive" : "default"}
        >
          {isRunning ? "Stop" : "Start"}
        </Button>
        <Button onClick={handleLap} disabled={!isRunning} variant="outline">
          Lap
        </Button>
        <Button onClick={handleReset} variant="outline">
          Reset
        </Button>
      </div>

      {laps.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Laps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {laps.map((lap, index) => (
                <div key={index} className="flex justify-between p-2 rounded bg-muted/50">
                  <span>Lap {index + 1}</span>
                  <span className="font-mono">{formatTime(lap)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
