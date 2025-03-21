"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchForm() {
  const [symbol, setSymbol] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!symbol.trim()) {
      setError("Please enter a stock symbol")
      return
    }

    // Basic validation for ticker symbol format
    const tickerRegex = /^[A-Z0-9.]{1,5}$/i
    if (!tickerRegex.test(symbol.trim())) {
      setError("Please enter a valid stock symbol (1-5 alphanumeric characters)")
      return
    }

    setError("")
    router.push(`/stock/${symbol.trim().toUpperCase()}`)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Search for a Stock</h2>
      <form onSubmit={handleSubmit} className="flex w-full max-w-lg space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            type="text"
            placeholder="Enter ticker symbol (e.g., AAPL)"
            className="pl-9 border-black bg-transparent font-serif"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
        </div>
        <Button type="submit" className="bg-black hover:bg-zinc-800 text-white font-semibold">Search</Button>
      </form>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  )
}