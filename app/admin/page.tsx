import { redirect } from "next/navigation"
import { verifyAdminSession } from "@/lib/admin-auth"
import AdminDashboard from "./admin-dashboard"

export const metadata = {
  title: "Admin Dashboard - SmartTools",
  robots: "noindex, nofollow",
}

export default async function AdminPage() {
  const isAdmin = await verifyAdminSession()

  if (!isAdmin) {
    redirect("/admin/login")
  }

  return <AdminDashboard />
}
