"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Search } from "lucide-react"
import { allTimezones } from "@/lib/timezones"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function WorldClock() {
  const [selectedTimezones, setSelectedTimezones] = useState<string[]>([
    "America/New_York",
    "Europe/London",
    "Asia/Tokyo",
  ])
  const [times, setTimes] = useState<{ [key: string]: string }>({})
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const updateTimes = () => {
      const newTimes: { [key: string]: string } = {}
      selectedTimezones.forEach((zone) => {
        const time = new Date().toLocaleString("en-US", {
          timeZone: zone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
        const date = new Date().toLocaleString("en-US", {
          timeZone: zone,
          weekday: "short",
          month: "short",
          day: "numeric",
        })
        newTimes[zone] = `${time} - ${date}`
      })
      setTimes(newTimes)
    }

    updateTimes()
    const interval = setInterval(updateTimes, 1000)
    return () => clearInterval(interval)
  }, [selectedTimezones])

  const addTimezone = (zone: string) => {
    if (!selectedTimezones.includes(zone)) {
      setSelectedTimezones([...selectedTimezones, zone])
    }
    setOpen(false)
  }

  const removeTimezone = (zone: string) => {
    setSelectedTimezones(selectedTimezones.filter((tz) => tz !== zone))
  }

  const getTimezoneInfo = (zone: string) => {
    return allTimezones.find((tz) => tz.zone === zone)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>World Clock</CardTitle>
        <CardDescription>View current time in multiple time zones around the world</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between bg-transparent">
              <span>Add Timezone</span>
              <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder="Search city or country..." />
              <CommandList>
                <CommandEmpty>No timezone found.</CommandEmpty>
                <CommandGroup>
                  {allTimezones
                    .filter((tz) => !selectedTimezones.includes(tz.zone))
                    .map((tz) => (
                      <CommandItem
                        key={tz.zone}
                        value={`${tz.name} ${tz.country} ${tz.zone}`}
                        onSelect={() => addTimezone(tz.zone)}
                      >
                        {tz.name} - {tz.country}
                      </CommandItem>
                    ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {selectedTimezones.map((zone) => {
            const info = getTimezoneInfo(zone)
            return (
              <div key={zone} className="relative rounded-lg border border-border bg-card p-6">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-6 w-6"
                  onClick={() => removeTimezone(zone)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <p className="mb-1 font-semibold">{info?.name || zone}</p>
                <p className="mb-2 text-xs text-muted-foreground">{info?.country}</p>
                <p className="text-2xl font-bold text-primary">{times[zone]?.split(" - ")[0]}</p>
                <p className="mt-1 text-sm text-muted-foreground">{times[zone]?.split(" - ")[1]}</p>
              </div>
            )
          })}
        </div>

        {selectedTimezones.length === 0 && (
          <div className="rounded-lg border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">No timezones selected. Add some to get started!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
