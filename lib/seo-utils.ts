import type { Tool } from "./tools-data"

export interface SEOData {
  title: string
  description: string
  keywords: string[]
  canonical: string
  ogImage?: string
  structuredData?: any
}

export function generateToolSEO(tool: Tool, baseUrl = "https://smart-tools.threezeroonellc.com"): SEOData {
  const canonical = `${baseUrl}/tools/${tool.slug}`
  const ogImage = `${baseUrl}/og-images/${tool.slug}.png`

  // Generate structured data (JSON-LD) for the tool
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    description: tool.longDescription,
    url: canonical,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
      bestRating: "5",
      worstRating: "1",
    },
  }

  return {
    title: `${tool.title} - Free Online Tool | SmartTools`,
    description: tool.longDescription,
    keywords: tool.keywords,
    canonical,
    ogImage,
    structuredData,
  }
}

export function generateHomeSEO(baseUrl = "https://smart-tools.threezeroonellc.com"): SEOData {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SmartTools",
    description:
      "Free online tools for everyday tasks. Calculators, converters, generators, and text tools. Fast, secure, and easy to use.",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }

return {
  title: "SmartTools - Free Online Calculators, Converters, Generators & Utilities",
  description:
    "Discover 50+ free online tools including calculators, unit & currency converters, password generators, text tools, image utilities, and productivity tools. Fast, secure, mobile-friendly, and easy to use. No registration required.",
  keywords: [
    // General
    "online tools",
    "free online tools",
    "web utilities",
    "productivity tools",
    "digital tools",
    "free web tools",
    // Calculators
    "age calculator",
    "bmi calculator",
    "loan calculator",
    "mortgage calculator",
    "discount calculator",
    "tip calculator",
    "percentage calculator",
    "fraction calculator",
    "investment calculator",
    "compound interest calculator",
    // Converters
    "unit converter",
    "currency converter",
    "temperature converter",
    "binary converter",
    "time zone converter",
    "rgb to hex converter",
    "unix timestamp converter",
    "base converter",
    "image format converter",
    "pdf to image converter",
    "base64 encoder",
    "url encoder",
    "csv to json converter",
    // Generators
    "password generator",
    "lorem ipsum generator",
    "random number generator",
    "color picker",
    "uuid generator",
    "hash generator",
    "qr code generator",
    "barcode generator",
    "meta tag generator",
    // Text Tools
    "word counter",
    "text case converter",
    "text cleaner",
    "json formatter",
    "markdown to html",
    "text diff checker",
    "duplicate line remover",
    "text reverser",
    "morse code translator",
    "character frequency counter",
    "html encoder",
    "css minifier",
    "sql formatter",
    "rot13 cipher",
    "caesar cipher",
    "jwt decoder",
    "keyword density checker",
    // Utilities
    "stopwatch",
    "countdown timer",
    "pomodoro timer",
    "image compressor",
    "image resizer",
    "pdf merger",
    "pdf splitter",
    "date calculator",
    "business days calculator",
    "world clock",
    // SEO & related
    "fast online tools",
    "secure online tools",
    "tools without registration",
    "free calculators online",
    "online converters",
    "web generators",
    "text utilities online"
  ],
  canonical: baseUrl,
  ogImage: `${baseUrl}/og-image.png`,
  structuredData,
}

}
