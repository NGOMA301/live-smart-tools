import type { Metadata } from "next"
import CurrencySettingsClient from "./page-client"

export const metadata: Metadata = {
  title: "Currency API Settings - SmartTools",
  description: "Manage your exchangerate.host API keys for currency conversion",
}

export default function CurrencySettingsPage() {
  return <CurrencySettingsClient />
}
