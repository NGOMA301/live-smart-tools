"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToolStore } from "@/store/use-tool-store"
import type { Tool } from "@/lib/tools-data"
import { motion } from "framer-motion"

interface ToolCardProps {
  tool: Tool
  index: number
}

export function ToolCard({ tool, index }: ToolCardProps) {
  const { favorites, toggleFavorite } = useToolStore()
  const isFavorite = favorites.includes(tool.slug)

  // Get the icon component dynamically
  const IconComponent = (LucideIcons as any)[tool.icon] || LucideIcons.Wrench

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link href={`/tools/${tool.slug}`}>
        <Card className="group relative h-full transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <IconComponent className="h-6 w-6" />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.preventDefault()
                  toggleFavorite(tool.slug)
                }}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>
            <CardTitle className="mt-4 text-lg">{tool.title}</CardTitle>
            <CardDescription className="line-clamp-2">{tool.description}</CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </motion.div>
  )
}
