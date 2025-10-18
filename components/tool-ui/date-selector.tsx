"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface DateSelectorProps {
  value: Date | null
  onChange: (date: Date | null) => void
}

export function DateSelector({ value, onChange }: DateSelectorProps) {
  const currentYear = new Date().getFullYear()
  const [day, setDay] = useState(value?.getDate().toString() || "")
  const [month, setMonth] = useState(value ? (value.getMonth() + 1).toString() : "")
  const [year, setYear] = useState(value?.getFullYear().toString() || "")

  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ]

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate()
  }

  const days = month && year
    ? Array.from({ length: getDaysInMonth(parseInt(month), parseInt(year)) }, (_, i) => (i + 1).toString())
    : Array.from({ length: 31 }, (_, i) => (i + 1).toString())

  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => (currentYear - i).toString())

  const handleUpdate = (newDay?: string, newMonth?: string, newYear?: string) => {
    const d = newDay || day
    const m = newMonth || month
    const y = newYear || year

    if (d && m && y) {
      const date = new Date(parseInt(y), parseInt(m) - 1, parseInt(d))
      onChange(date)
    } else {
      onChange(null)
    }
  }

  return (
    <div className="space-y-3">
      <Label>Birth Date</Label>
      <div className="grid grid-cols-3 gap-2">
        <div className="space-y-1.5">
          <Label htmlFor="day" className="text-xs text-muted-foreground">
            Day
          </Label>
          <Select
            value={day}
            onValueChange={(value) => {
              setDay(value)
              handleUpdate(value, undefined, undefined)
            }}
          >
            <SelectTrigger id="day" className={cn(!day && "text-muted-foreground")}>
              <SelectValue placeholder="Day" />
            </SelectTrigger>
            <SelectContent>
              {days.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="month" className="text-xs text-muted-foreground">
            Month
          </Label>
          <Select
            value={month}
            onValueChange={(value) => {
              setMonth(value)
              handleUpdate(undefined, value, undefined)
            }}
          >
            <SelectTrigger id="month" className={cn(!month && "text-muted-foreground")}>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="year" className="text-xs text-muted-foreground">
            Year
          </Label>
          <Select
            value={year}
            onValueChange={(value) => {
              setYear(value)
              handleUpdate(undefined, undefined, value)
            }}
          >
            <SelectTrigger id="year" className={cn(!year && "text-muted-foreground")}>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
