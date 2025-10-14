import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/currency-settings/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/currency-settings/"],
        crawlDelay: 0,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/currency-settings/"],
        crawlDelay: 0,
      },
    ],
    sitemap: "https://smart-tools.threezeroonellc.com/sitemap.xml",
    host: "https://smart-tools.threezeroonellc.com",
  }
}
