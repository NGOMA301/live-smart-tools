import type { Metadata } from "next"
import { generateSEO } from "@/components/seo"
import ContactPageClient from "./page-client"

export const metadata: Metadata = generateSEO({
  title: "Contact Us - SmartTools Support & Feedback",
  description:
    "Get in touch with SmartTools. Send us your questions, suggestions, or feedback. We're here to help you get the most out of our free online tools.",
  keywords: ["contact smarttools", "support", "feedback", "help", "customer service", "tool suggestions"],
  canonical: "https://smart-tools.threezeroonellc.com/contact",
})

export default function ContactPage() {
  return <ContactPageClient />
}
