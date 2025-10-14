"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { allTimezones } from "@/lib/timezones"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export default function TimezoneConverter() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16))
  const [fromTimezone, setFromTimezone] = useState("America/New_York")
  const [toTimezone, setToTimezone] = useState("Europe/London")
  const [result, setResult] = useState("")
  const [openFrom, setOpenFrom] = useState(false)
  const [openTo, setOpenTo] = useState(false)

  const handleConvert = () => {
    try {
      const inputDate = new Date(date)

      // Format the result in the target timezone
      const resultTime = inputDate.toLocaleString("en-US", {
        timeZone: toTimezone,
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })

      setResult(resultTime)
    } catch (error) {
      console.error("Error converting timezone:", error)
      setResult("Error converting timezone")
    }
  }

  const getTimezoneInfo = (zone: string) => {
    return allTimezones.find((tz) => tz.zone === zone)
  }

  const fromInfo = getTimezoneInfo(fromTimezone)
  const toInfo = getTimezoneInfo(toTimezone)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timezone Converter</CardTitle>
        <CardDescription>Convert time between different time zones</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="datetime">Date and Time</Label>
          <Input id="datetime" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>From Timezone</Label>
          <Popover open={openFrom} onOpenChange={setOpenFrom}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openFrom}
                className="w-full justify-between bg-transparent"
              >
                {fromInfo ? (
                  <span>
                    {fromInfo.name} - {fromInfo.country}
                  </span>
                ) : (
                  "Select timezone..."
                )}
                <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput placeholder="Search city or country..." />
                <CommandList>
                  <CommandEmpty>No timezone found.</CommandEmpty>
                  <CommandGroup>
                    {allTimezones.map((tz) => (
                      <CommandItem
                        key={tz.zone}
                        value={`${tz.name} ${tz.country} ${tz.zone}`}
                        onSelect={() => {
                          setFromTimezone(tz.zone)
                          setOpenFrom(false)
                        }}
                      >
                        <Check className={cn("mr-2 h-4 w-4", fromTimezone === tz.zone ? "opacity-100" : "opacity-0")} />
                        {tz.name} - {tz.country}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>To Timezone</Label>
          <Popover open={openTo} onOpenChange={setOpenTo}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openTo}
                className="w-full justify-between bg-transparent"
              >
                {toInfo ? (
                  <span>
                    {toInfo.name} - {toInfo.country}
                  </span>
                ) : (
                  "Select timezone..."
                )}
                <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput placeholder="Search city or country..." />
                <CommandList>
                  <CommandEmpty>No timezone found.</CommandEmpty>
                  <CommandGroup>
                    {allTimezones.map((tz) => (
                      <CommandItem
                        key={tz.zone}
                        value={`${tz.name} ${tz.country} ${tz.zone}`}
                        onSelect={() => {
                          setToTimezone(tz.zone)
                          setOpenTo(false)
                        }}
                      >
                        <Check className={cn("mr-2 h-4 w-4", toTimezone === tz.zone ? "opacity-100" : "opacity-0")} />
                        {tz.name} - {tz.country}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <Button onClick={handleConvert} className="w-full">
          Convert
        </Button>

        {result && (
          <Card className="p-4 bg-primary/5">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Converted Time</p>
              <p className="text-xl font-bold text-primary">{result}</p>
            </div>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}
