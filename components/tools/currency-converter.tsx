"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ArrowLeftRight, Loader2, Search } from "lucide-react"
import { currencies, getCurrencyByCode } from "@/lib/currency-data"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("1")
  const [fromCurrency, setFromCurrency] = useState<string>("USD")
  const [toCurrency, setToCurrency] = useState<string>("EUR")
  const [result, setResult] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [rates, setRates] = useState<Record<string, number> | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string>("")
  const [openFrom, setOpenFrom] = useState(false)
  const [openTo, setOpenTo] = useState(false)

  useEffect(() => {
    loadRates()
  }, [])

  const loadRates = async () => {
    try {
      setLoading(true)
      setError("")
      const response = await fetch("/api/exchange-rates?base=USD")

      if (!response.ok) {
        throw new Error("Failed to fetch exchange rates. Please try again later.")
      }

      const data = await response.json()

      if (data.success && data.rates) {
        setRates(data.rates)
        setLastUpdated(new Date().toLocaleString())
      } else {
        throw new Error(data.error || "Failed to load exchange rates")
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to load exchange rates"
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const handleConvert = () => {
    if (!rates) {
      setError("Exchange rates not loaded. Please try again.")
      return
    }

    const amountNum = Number.parseFloat(amount)
    if (isNaN(amountNum) || amountNum <= 0) {
      setError("Please enter a valid amount")
      return
    }

    try {
      const fromRate = rates[fromCurrency] || 1
      const toRate = rates[toCurrency] || 1

      // Convert from source currency to USD, then to target currency
      const usdAmount = fromCurrency === "USD" ? amountNum : amountNum / fromRate
      const convertedAmount = toCurrency === "USD" ? usdAmount : usdAmount * toRate

      setResult(convertedAmount)
      setError("")
    } catch (err) {
      setError("Conversion failed. Please try again.")
    }
  }

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    if (result) {
      setAmount(result.toFixed(2))
      setResult(Number.parseFloat(amount))
    }
  }

  const fromCurrencyData = getCurrencyByCode(fromCurrency)
  const toCurrencyData = getCurrencyByCode(toCurrency)

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min="0"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <Label>From</Label>
            <Popover open={openFrom} onOpenChange={setOpenFrom}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openFrom}
                  className="w-full justify-between bg-transparent"
                >
                  {fromCurrencyData ? (
                    <span>
                      {fromCurrencyData.symbol} {fromCurrencyData.code} - {fromCurrencyData.name}
                    </span>
                  ) : (
                    "Select currency..."
                  )}
                  <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search currency or country..." />
                  <CommandList>
                    <CommandEmpty>No currency found.</CommandEmpty>
                    <CommandGroup>
                      {currencies.map((currency) => (
                        <CommandItem
                          key={currency.code}
                          value={`${currency.code} ${currency.name} ${currency.country}`}
                          onSelect={() => {
                            setFromCurrency(currency.code)
                            setOpenFrom(false)
                          }}
                        >
                          <Check
                            className={cn("mr-2 h-4 w-4", fromCurrency === currency.code ? "opacity-100" : "opacity-0")}
                          />
                          <span>
                            {currency.symbol} {currency.code} - {currency.name} ({currency.country})
                          </span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex justify-center">
            <Button type="button" variant="outline" size="icon" onClick={handleSwap} disabled={loading}>
              <ArrowLeftRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label>To</Label>
            <Popover open={openTo} onOpenChange={setOpenTo}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openTo}
                  className="w-full justify-between bg-transparent"
                >
                  {toCurrencyData ? (
                    <span>
                      {toCurrencyData.symbol} {toCurrencyData.code} - {toCurrencyData.name}
                    </span>
                  ) : (
                    "Select currency..."
                  )}
                  <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search currency or country..." />
                  <CommandList>
                    <CommandEmpty>No currency found.</CommandEmpty>
                    <CommandGroup>
                      {currencies.map((currency) => (
                        <CommandItem
                          key={currency.code}
                          value={`${currency.code} ${currency.name} ${currency.country}`}
                          onSelect={() => {
                            setToCurrency(currency.code)
                            setOpenTo(false)
                          }}
                        >
                          <Check
                            className={cn("mr-2 h-4 w-4", toCurrency === currency.code ? "opacity-100" : "opacity-0")}
                          />
                          <span>
                            {currency.symbol} {currency.code} - {currency.name} ({currency.country})
                          </span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <Button onClick={handleConvert} disabled={loading || !rates} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Convert"
            )}
          </Button>

          {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}

          {result !== null && !error && toCurrencyData && (
            <Card className="p-4 bg-primary/5">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Result</p>
                <p className="text-3xl font-bold text-primary">
                  {toCurrencyData.symbol}
                  {result.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
                </p>
              </div>
            </Card>
          )}

          {lastUpdated && (
            <p className="text-xs text-center text-muted-foreground">Rates last updated: {lastUpdated}</p>
          )}
        </div>
      </Card>

      {rates && (
        <Button onClick={loadRates} variant="outline" disabled={loading} className="w-full bg-transparent">
          Refresh Exchange Rates
        </Button>
      )}
    </div>
  )
}
