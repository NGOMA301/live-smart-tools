"use client"

import { useToolStore } from "@/store/use-tool-store"
import { toolsData } from "@/lib/tools-data"
import { ToolCard } from "@/components/tool-card"
import { AdBlock } from "@/components/ad-block"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function FavoritesPageClient() {
  const { favorites } = useToolStore()

  const favoriteTools = toolsData.filter((tool) => favorites.includes(tool.slug))

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="mb-6 text-4xl font-bold">My Favorites</h1>
        <p className="mb-8 text-muted-foreground">Quick access to your most-used tools</p>

        {favoriteTools.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favoriteTools.map((tool, index) => (
              <ToolCard key={tool.slug} tool={tool} index={index} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="mb-4 text-muted-foreground">You haven't saved any favorite tools yet.</p>
            <Link href="/">
              <Button>Browse Tools</Button>
            </Link>
          </div>
        )}

        <div className="mt-12">
          <AdBlock slot="favorites-bottom" />
        </div>
      </div>
    </div>
  )
}
