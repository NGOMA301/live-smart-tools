"use client"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToolStore } from "@/store/use-tool-store"

interface FavoritesButtonProps {
  slug: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

export function FavoritesButton({ slug, variant = "ghost", size = "icon" }: FavoritesButtonProps) {
  const { favorites, toggleFavorite } = useToolStore()
  const isFavorite = favorites.includes(slug)

  return (
    <Button variant={variant} size={size} onClick={() => toggleFavorite(slug)}>
      <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
    </Button>
  )
}
