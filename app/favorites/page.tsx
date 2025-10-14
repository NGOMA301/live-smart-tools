import type { Metadata } from "next"
import { generateSEO } from "@/components/seo"
import FavoritesPageClient from "./page-client"

export const metadata: Metadata = generateSEO({
  title: "My Favorite Tools - SmartTools",
  description:
    "Quick access to your favorite SmartTools. Save and organize the tools you use most frequently for faster access.",
  keywords: ["favorite tools", "saved tools", "bookmarked tools", "my tools", "frequently used tools"],
  canonical: "https://smart-tools.threezeroonellc.com/favorites",
})

export default function FavoritesPage() {
  return <FavoritesPageClient />
}
