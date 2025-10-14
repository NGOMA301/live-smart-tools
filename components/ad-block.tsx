"use client"

import { useEffect, useState } from "react"
import { getAdForSlot } from "@/lib/admin-actions"

interface AdBlockProps {
  slot: string
  className?: string
}

export function AdBlock({ slot, className = "" }: AdBlockProps) {
  const [adCode, setAdCode] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchAd() {
      try {
        const ad = await getAdForSlot(slot)
        if (ad && ad.isActive) {
          setAdCode(ad.code)
        }
      } catch (error) {
        console.error("Failed to load ad:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAd()
  }, [slot])

  if (isLoading || !adCode) {
    return null
  }

  return (
    <div className={`flex min-h-[100px] items-center justify-center ${className}`}>
      <div dangerouslySetInnerHTML={{ __html: adCode }} />
    </div>
  )
}
