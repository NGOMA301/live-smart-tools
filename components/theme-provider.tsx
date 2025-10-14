"use client"

import type React from "react"

import { useEffect } from "react"
import { useToolStore } from "@/store/use-tool-store"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useToolStore()

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme])

  return <>{children}</>
}
