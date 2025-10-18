"use client"

import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalculatorCardProps {
  title: string
  icon: LucideIcon
  isActive: boolean
  onClick: () => void
}

export function CalculatorCard({ title, icon: Icon, isActive, onClick }: CalculatorCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all hover:scale-105 active:scale-95",
        isActive
          ? "bg-primary text-primary-foreground border-primary shadow-sm"
          : "bg-card hover:bg-accent border-border"
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="text-xs font-medium">{title}</span>
    </button>
  )
}
