"use client"

import { Button } from "@/components/ui/button"
import * as LucideIcons from "lucide-react"
import { categories } from "@/lib/tools-data"

interface CategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const IconComponent = (LucideIcons as any)[category.icon] || LucideIcons.Grid
        const isSelected = selectedCategory === category.id

        return (
          <Button
            key={category.id}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className="gap-2"
          >
            <IconComponent className="h-4 w-4" />
            {category.label}
          </Button>
        )
      })}
    </div>
  )
}
