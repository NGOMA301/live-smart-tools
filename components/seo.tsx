import type { Metadata } from "next"

interface SEOProps {
  title: string
  description: string
  keywords?: string | string[]
  canonical?: string
  ogImage?: string
  structuredData?: any
}

export function generateSEO({ title, description, keywords, canonical, ogImage, structuredData }: SEOProps): Metadata {
  const keywordsString = Array.isArray(keywords)
    ? keywords.join(", ")
    : keywords || "online tools, utilities, calculators, converters"
  const defaultOgImage = "https://smart-tools.threezeroonellc.com/og-image.png"
  const imageUrl = ogImage || defaultOgImage

  return {
    title,
    description,
    keywords: keywordsString,
    authors: [{ name: "SmartTools" }],
    creator: "SmartTools",
    publisher: "SmartTools",
    alternates: {
      canonical: canonical || "https://smart-tools.threezeroonellc.com",
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical || "https://smart-tools.threezeroonellc.com",
      siteName: "SmartTools",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@smarttools",
      site: "@smarttools",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
      yandex: "your-yandex-verification-code",
      bing: "your-bing-verification-code",
    },
    other: {
      "structured-data": structuredData ? JSON.stringify(structuredData) : undefined,
    },
  }
}

// Helper component to inject structured data into pages
export function StructuredData({ data }: { data: any }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
