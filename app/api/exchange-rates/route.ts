import { type NextRequest, NextResponse } from "next/server"
import { getExchangeRates } from "@/lib/admin-actions"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const base = searchParams.get("base") || "USD"

    const rates = await getExchangeRates(base)
    return NextResponse.json({ success: true, rates })
  } catch (error) {
    console.error("Error fetching exchange rates:", error)
    return NextResponse.json({ error: "Failed to fetch exchange rates" }, { status: 500 })
  }
}
