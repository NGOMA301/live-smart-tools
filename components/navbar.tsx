"use client"

import Link from "next/link"
import { Heart, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToolStore } from "@/store/use-tool-store"

export function Navbar() {
  const { theme, toggleTheme, favorites } = useToolStore()

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="font-mono text-lg font-bold text-primary-foreground">ST</span>
          </div>
          <span className="text-xl font-bold">SmartTools</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/favorites">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {favorites.length}
                </span>
              )}
            </Button>
          </Link>

          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </nav>
  )
}
