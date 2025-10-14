import type { Metadata } from "next"
import { generateSEO } from "@/components/seo"
import AboutPageClient from "./page-client"

export const metadata: Metadata = generateSEO({
  title: "About SmartTools - Free Online Tools & Utilities",
  description:
    "SmartTools provides 40+ free online tools for everyday tasks. Learn about our mission to make powerful utilities accessible to everyone. Fast, secure, and privacy-focused.",
  keywords: [
    "about smarttools",
    "online tools platform",
    "free utilities",
    "web tools",
    "calculator tools",
    "converter tools",
  ],
  canonical: "https://smart-tools.threezeroonellc.com/about",
})

export default function AboutPage() {
  return <AboutPageClient />
}
