// Client-side currency API - now redirects to server-side implementation
// Kept for backward compatibility

export interface ApiKey {
  id: string
  key: string
  requestCount: number
  lastResetDate: string
  isActive: boolean
}

export function getApiKeys(): ApiKey[] {
  // Return empty array - API keys are now managed server-side in admin panel
  return []
}

export function addApiKey(key: string): ApiKey {
  // No-op - API keys are now managed server-side in admin panel
  console.warn("API keys are now managed in the admin panel at /admin")
  return {
    id: Date.now().toString(),
    key: key.trim(),
    requestCount: 0,
    lastResetDate: new Date().toISOString(),
    isActive: true,
  }
}

export function removeApiKey(id: string): void {
  // No-op - API keys are now managed server-side in admin panel
  console.warn("API keys are now managed in the admin panel at /admin")
}

export async function fetchExchangeRates(base = "USD"): Promise<Record<string, number>> {
  const response = await fetch(`/api/exchange-rates?base=${base}`)
  const data = await response.json()

  if (!data.success || !data.rates) {
    throw new Error("Failed to fetch exchange rates")
  }

  return data.rates
}

export function getApiKeyStats() {
  return {
    totalKeys: 0,
    activeKeys: 0,
    totalRequests: 0,
    availableRequests: 0,
    monthlyLimit: 0,
  }
}
