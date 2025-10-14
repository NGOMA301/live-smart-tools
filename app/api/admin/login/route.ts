import { type NextRequest, NextResponse } from "next/server"
import { verifyAdminPassword, createAdminSession } from "@/lib/admin-auth"

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    const isValid = await verifyAdminPassword(password)

    if (isValid) {
      await createAdminSession()
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Invalid password" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
