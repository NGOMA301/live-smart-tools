import { AdBlock } from "@/components/ad-block"
import type { Metadata } from "next"
import { generateSEO } from "@/components/seo"

export const metadata: Metadata = generateSEO({
  title: "Privacy Policy - SmartTools Data Protection & Security",
  description:
    "SmartTools Privacy Policy. Learn how we protect your data and privacy. All tools run in your browser - your data never leaves your device. 100% private and secure.",
  keywords: [
    "privacy policy",
    "data protection",
    "privacy",
    "security",
    "data privacy",
    "user privacy",
    "smarttools privacy",
  ],
  canonical: "https://smart-tools.threezeroonellc.com/privacy",
})

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-4xl font-bold">Privacy Policy</h1>
          <p className="mb-8 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <h2 className="text-2xl font-semibold text-foreground">Introduction</h2>
            <p>
              At SmartTools, we take your privacy seriously. This Privacy Policy explains how we collect, use, and
              protect your information when you use our online tools.
            </p>

            <h2 className="text-2xl font-semibold text-foreground">Data Processing</h2>
            <p>
              All tools on SmartTools run entirely in your browser. This means that any data you enter into our tools
              (calculations, conversions, text, etc.) is processed locally on your device and never sent to our servers.
            </p>

            <h2 className="text-2xl font-semibold text-foreground">Local Storage</h2>
            <p>
              We use browser local storage to save your preferences, such as your favorite tools and theme selection.
              This data remains on your device and can be cleared at any time through your browser settings.
            </p>

            <h2 className="text-2xl font-semibold text-foreground">Analytics</h2>
            <p>
              We use Google Analytics to understand how visitors use our site. This helps us improve our tools and user
              experience. Google Analytics collects anonymous information such as:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Pages visited</li>
              <li>Time spent on site</li>
              <li>Browser and device information</li>
              <li>General geographic location (country/city level)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground">Advertising</h2>
            <p>
              SmartTools is supported by Google AdSense advertisements. Google may use cookies to display relevant ads
              based on your browsing history. You can opt out of personalized advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google Ad Settings
              </a>
              .
            </p>

            <h2 className="text-2xl font-semibold text-foreground">Cookies</h2>
            <p>We use cookies for:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Remembering your preferences (theme, favorites)</li>
              <li>Analytics (Google Analytics)</li>
              <li>Advertising (Google AdSense)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Clear your local storage data at any time</li>
              <li>Disable cookies in your browser settings</li>
              <li>Opt out of personalized advertising</li>
              <li>Request information about data we collect</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an
              updated revision date.
            </p>

            <h2 className="text-2xl font-semibold text-foreground">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us through our{" "}
              <a href="/contact" className="text-primary hover:underline">
                contact page
              </a>
              .
            </p>
          </div>

          <div className="mt-12">
            <AdBlock slot="privacy-bottom" />
          </div>
        </div>
      </div>
    </div>
  )
}
