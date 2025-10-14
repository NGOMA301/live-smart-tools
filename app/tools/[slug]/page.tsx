import { notFound } from "next/navigation"
import { toolsData } from "@/lib/tools-data"
import { generateSEO, StructuredData } from "@/components/seo"
import { generateToolSEO } from "@/lib/seo-utils"
import ToolPageClient from "./tool-page-client"

export async function generateStaticParams() {
  return toolsData.map((tool) => ({
    slug: tool.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tool = toolsData.find((t) => t.slug === params.slug)

  if (!tool) {
    return {}
  }

  const seoData = generateToolSEO(tool)

  return generateSEO({
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    canonical: seoData.canonical,
    ogImage: seoData.ogImage,
    structuredData: seoData.structuredData,
  })
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = toolsData.find((t) => t.slug === params.slug)

  if (!tool) {
    notFound()
  }

  const seoData = generateToolSEO(tool)

  return (
    <>
      <StructuredData data={seoData.structuredData} />
      <ToolPageClient tool={tool} />
    </>
  )
}
