"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Play, Pause, RotateCcw, Settings } from "lucide-react"

export default function PomodoroTimer() {
  const [workMinutes, setWorkMinutes] = useState(25)
  const [breakMinutes, setBreakMinutes] = useState(5)
  const [longBreakMinutes, setLongBreakMinutes] = useState(15)
  const [sessionsUntilLongBreak, setSessionsUntilLongBreak] = useState(4)

  const [timeLeft, setTimeLeft] = useState(workMinutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [mode, setMode] = useState<"work" | "break" | "longBreak">("work")
  const [sessionsCompleted, setSessionsCompleted] = useState(0)
  const [showSettings, setShowSettings] = useState(false)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/notification.mp3")
    }
  }, [])

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft])

  const handleTimerComplete = () => {
    setIsRunning(false)

    // Play notification sound
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Ignore audio play errors
      })
    }

    if (mode === "work") {
      const newSessionsCompleted = sessionsCompleted + 1
      setSessionsCompleted(newSessionsCompleted)

      if (newSessionsCompleted % sessionsUntilLongBreak === 0) {
        setMode("longBreak")
        setTimeLeft(longBreakMinutes * 60)
      } else {
        setMode("break")
        setTimeLeft(breakMinutes * 60)
      }
    } else {
      setMode("work")
      setTimeLeft(workMinutes * 60)
    }
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setMode("work")
    setTimeLeft(workMinutes * 60)
    setSessionsCompleted(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const applySettings = () => {
    setTimeLeft(workMinutes * 60)
    setMode("work")
    setIsRunning(false)
    setShowSettings(false)
  }

  const getModeColor = () => {
    switch (mode) {
      case "work":
        return "bg-red-500"
      case "break":
        return "bg-green-500"
      case "longBreak":
        return "bg-blue-500"
    }
  }

  const getModeText = () => {
    switch (mode) {
      case "work":
        return "Focus Time"
      case "break":
        return "Short Break"
      case "longBreak":
        return "Long Break"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-8">
        <div className="text-center space-y-6">
          <div className={`inline-block px-6 py-2 rounded-full text-white font-semibold ${getModeColor()}`}>
            {getModeText()}
          </div>

          <div className="text-8xl font-bold font-mono">{formatTime(timeLeft)}</div>

          <div className="text-muted-foreground">Sessions completed: {sessionsCompleted}</div>

          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={toggleTimer}>
              {isRunning ? (
                <>
                  <Pause className="mr-2 h-5 w-5" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  Start
                </>
              )}
            </Button>
            <Button size="lg" variant="outline" onClick={resetTimer}>
              <RotateCcw className="mr-2 h-5 w-5" />
              Reset
            </Button>
            <Button size="lg" variant="outline" onClick={() => setShowSettings(!showSettings)}>
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Button>
          </div>
        </div>
      </Card>

      {showSettings && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Timer Settings</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="work-minutes">Work Duration (minutes)</Label>
              <Input
                id="work-minutes"
                type="number"
                min="1"
                max="60"
                value={workMinutes}
                onChange={(e) => setWorkMinutes(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="break-minutes">Short Break (minutes)</Label>
              <Input
                id="break-minutes"
                type="number"
                min="1"
                max="30"
                value={breakMinutes}
                onChange={(e) => setBreakMinutes(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="long-break-minutes">Long Break (minutes)</Label>
              <Input
                id="long-break-minutes"
                type="number"
                min="1"
                max="60"
                value={longBreakMinutes}
                onChange={(e) => setLongBreakMinutes(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sessions">Sessions Until Long Break</Label>
              <Input
                id="sessions"
                type="number"
                min="1"
                max="10"
                value={sessionsUntilLongBreak}
                onChange={(e) => setSessionsUntilLongBreak(Number(e.target.value))}
              />
            </div>
          </div>
          <Button className="mt-4 w-full" onClick={applySettings}>
            Apply Settings
          </Button>
        </Card>
      )}

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-3">About the Pomodoro Technique</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            The Pomodoro Technique is a time management method that uses a timer to break work into intervals,
            traditionally 25 minutes in length, separated by short breaks.
          </p>
          <p className="font-semibold text-foreground">How it works:</p>
          <ol className="list-decimal list-inside space-y-1 ml-2">
            <li>Work for 25 minutes (one "Pomodoro")</li>
            <li>Take a 5-minute short break</li>
            <li>After 4 Pomodoros, take a longer 15-minute break</li>
            <li>Repeat the cycle</li>
          </ol>
          <p className="mt-3">
            This technique helps maintain focus, prevent burnout, and improve productivity by creating a sustainable
            work rhythm with regular breaks.
          </p>
        </div>
      </Card>
    </div>
  )
}
