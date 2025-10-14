"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useToolStore } from "@/store/use-tool-store"

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useToolStore()

  return (
    <div className="relative w-full max-w-2xl">
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search tools..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10"
      />
    </div>
  )
}
