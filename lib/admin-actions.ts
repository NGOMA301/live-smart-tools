"use server"

import clientPromise from "./mongodb"
import { verifyAdminSession } from "./admin-auth"
import { revalidatePath } from "next/cache"
const { ObjectId } = require("mongodb")

export interface ApiKeyData {
  _id?: string
  key: string
  provider: string
  monthlyLimit: number
  requestCount: number
  lastResetDate: string
  isActive: boolean
  createdAt: string
}

export interface AdData {
  _id?: string
  slot: string
  code: string
  position: "top" | "bottom" | "sidebar" | "inline"
  isActive: boolean
  createdAt: string
}

export interface AdBlockSettings {
  enabled: boolean
  message: string
}

// API Key Management
export async function getApiKeys(): Promise<ApiKeyData[]> {
  const isAdmin = await verifyAdminSession()
  if (!isAdmin) throw new Error("Unauthorized")

  const client = await clientPromise
  const db = client.db("smarttools")
  const keys = await db.collection<ApiKeyData>("api_keys").find({}).toArray()
  return keys.map((key) => ({ ...key, _id: key._id?.toString() }))
}

export async function addApiKey(data: Omit<ApiKeyData, "_id" | "createdAt">): Promise<void> {
  const isAdmin = await verifyAdminSession()
  if (!isAdmin) throw new Error("Unauthorized")

  const client = await clientPromise
  const db = client.db("smarttools")
  await db.collection("api_keys").insertOne({
    ...data,
    createdAt: new Date().toISOString(),
  })
  revalidatePath("/admin")
}

export async function updateApiKey(id: string, data: Partial<ApiKeyData>): Promise<void> {
  const isAdmin = await verifyAdminSession()
  if (!isAdmin) throw new Error("Unauthorized")

  const client = await clientPromise
  const db = client.db("smarttools")
  await db.collection("api_keys").updateOne({ _id: new ObjectId(id) }, { $set: data })
  revalidatePath("/admin")
}

export async function deleteApiKey(id: string): Promise<void> {
  const isAdmin = await verifyAdminSession()
  if (!isAdmin) throw new Error("Unauthorized")

  const client = await clientPromise
  const db = client.db("smarttools")
  await db.collection("api_keys").deleteOne({ _id: new ObjectId(id) })
  revalidatePath("/admin")
}

export async function incrementApiKeyUsage(keyId: string): Promise<void> {
  const client = await clientPromise
  const db = client.db("smarttools")
  await db.collection("api_keys").updateOne({ _id: new ObjectId(keyId) }, { $inc: { requestCount: 1 } })
}

// Ad Management
export async function getAds(): Promise<AdData[]> {
  const isAdmin = await verifyAdminSession()
  if (!isAdmin) throw new Error("Unauthorized")

  const client = await clientPromise
  const db = client.db("smarttools")
  const ads = await db.collection<AdData>("ads").find({}).toArray()
  return ads.map((ad) => ({ ...ad, _id: ad._id?.toString() }))
}

export async function addAd(data: Omit<AdData, "_id" | "createdAt">): Promise<void> {
  const isAdmin = await verifyAdminSession()
  if (!isAdmin) throw new Error("Unauthorized")

  const client = await clientPromise
  const db = client.db("smarttools")
  await db.collection("ads").insertOne({
    ...data,
    createdAt: new Date().toISOString(),
  })
  revalidatePath("/admin")
  revalidatePath("/", "layout")
}

export async function updateAd(id: string, data: Partial<AdData>): Promise<void> {
  const isAdmin = await verifyAdminSession()
  if (!isAdmin) throw new Error("Unauthorized")

  const client = await clientPromise
  const db = client.db("smarttools")
  await db.collection("ads").updateOne({ _id: new ObjectId(id) }, { $set: data })
  revalidatePath("/admin")
  revalidatePath("/", "layout")
}

export async function deleteAd(id: string): Promise<void> {
  const isAdmin = await verifyAdminSession()
  if (!isAdmin) throw new Error("Unauthorized")

  const client = await clientPromise
  const db = client.db("smarttools")
  await db.collection("ads").deleteOne({ _id: new ObjectId(id) })
  revalidatePath("/admin")
  revalidatePath("/", "layout")
}

// Ad Block Settings
export async function getAdBlockSettings(): Promise<AdBlockSettings> {
  const client = await clientPromise
  const db = client.db("smarttools")
  const settings = await db.collection("settings").findOne({ key: "adblock" })
  return (
    settings?.value || {
      enabled: true,
      message:
        "We noticed you're using an ad blocker. Ads help keep SmartTools free for everyone. Please disable your ad blocker and reload the page to continue using our tools.",
    }
  )
}

export async function updateAdBlockSettings(settings: AdBlockSettings): Promise<void> {
  const isAdmin = await verifyAdminSession()
  if (!isAdmin) throw new Error("Unauthorized")

  const client = await clientPromise
  const db = client.db("smarttools")
  await db.collection("settings").updateOne({ key: "adblock" }, { $set: { value: settings } }, { upsert: true })
  revalidatePath("/admin")
  revalidatePath("/", "layout")
}

// Get active ad for a slot (public)
export async function getAdForSlot(slot: string): Promise<AdData | null> {
  const client = await clientPromise
  const db = client.db("smarttools")
  const ad = await db.collection<AdData>("ads").findOne({ slot, isActive: true })
  return ad ? { ...ad, _id: ad._id?.toString() } : null
}

// Get exchange rates from server (public)
export async function getExchangeRates(base = "USD"): Promise<Record<string, number>> {
  const client = await clientPromise
  const db = client.db("smarttools")

  // Check cache first (1 hour cache)
  const cached = await db.collection("cache").findOne({ key: `rates_${base}` })
  if (cached && Date.now() - new Date(cached.timestamp).getTime() < 60 * 60 * 1000) {
    return cached.value
  }

  // Get next available API key
  const apiKey = await db.collection<ApiKeyData>("api_keys").findOne({
    provider: "exchangerate",
    isActive: true,
  })

  if (!apiKey) {
    throw new Error("No API keys available. Please add an API key in the admin panel.")
  }

  try {
    // Use the /live endpoint for real-time rates as per exchangerate.host documentation
    const response = await fetch(`https://api.exchangerate.host/live?access_key=${apiKey.key}&source=${base}`, {
      next: { revalidate: 3600 },
    })

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error?.info || "Failed to fetch exchange rates")
    }

    // exchangerate.host returns quotes in format "USDEUR", "USDGBP", etc.
    // We need to convert this to a simple object with currency codes as keys
    const rates: Record<string, number> = {}

    if (data.quotes) {
      for (const [pair, rate] of Object.entries(data.quotes)) {
        // Remove the source currency prefix (e.g., "USDEUR" -> "EUR")
        const currency = pair.replace(base, "")
        rates[currency] = rate as number
      }
      // Add the base currency with rate 1
      rates[base] = 1
    }

    // Update cache
    await db
      .collection("cache")
      .updateOne({ key: `rates_${base}` }, { $set: { value: rates, timestamp: new Date() } }, { upsert: true })

    // Increment usage counter
    await db.collection("api_keys").updateOne({ _id: apiKey._id }, { $inc: { requestCount: 1 } })

    return rates
  } catch (error) {
    throw new Error(`Exchange rate API error: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}
