"use client"

import { AdBlock } from "@/components/ad-block"

export default function AboutPageClient() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-4xl font-bold">About SmartTools</h1>

          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-lg">
              SmartTools is a collection of fast, free, and powerful online utilities designed to make your everyday
              tasks easier. Whether you need to calculate, convert, generate, or transform data, we have got you
              covered.
            </p>

            <h2 className="mt-8 text-2xl font-semibold text-foreground">Our Mission</h2>
            <p>
              We believe that essential online tools should be accessible to everyone, without barriers. That is why
              SmartTools is completely free to use, requires no sign-up, and respects your privacy by processing
              everything locally in your browser.
            </p>

            <h2 className="mt-8 text-2xl font-semibold text-foreground">Why SmartTools?</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Lightning Fast:</strong> All tools run instantly in your browser with no server delays
              </li>
              <li>
                <strong>Privacy First:</strong> Your data never leaves your device - everything is processed locally
              </li>
              <li>
                <strong>Always Free:</strong> No subscriptions, no hidden fees, no paywalls
              </li>
              <li>
                <strong>No Sign-Up Required:</strong> Start using tools immediately without creating an account
              </li>
              <li>
                <strong>Mobile Friendly:</strong> Works perfectly on all devices and screen sizes
              </li>
            </ul>

            <h2 className="mt-8 text-2xl font-semibold text-foreground">Ad-Supported & Privacy-Focused</h2>
            <p>
              SmartTools is supported by non-intrusive advertisements to keep the service free for everyone. We partner
              with Google AdSense to display relevant ads while maintaining your privacy. We do not collect personal
              information or track your usage beyond basic analytics.
            </p>

            <h2 className="mt-8 text-2xl font-semibold text-foreground">Open to Feedback</h2>
            <p>
              We are constantly improving and adding new tools based on user feedback. If you have suggestions for new
              tools or improvements, please reach out through our contact page.
            </p>
          </div>

          <div className="mt-12">
            <AdBlock slot="about-bottom" />
          </div>
        </div>
      </div>
    </div>
  )
}
