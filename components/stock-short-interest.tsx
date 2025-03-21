"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { StockOverviewData } from "@/lib/alpha-vantage"
import { Loader2 } from "lucide-react"

interface ShortInterestData {
  shortPercentFloat: number
  shortPercentOutstanding: number
  shortRatio: number
  sharesShort: number
  sharesShortPriorMonth: number
}

interface StockShortInterestProps {
  overview: StockOverviewData
}

export function StockShortInterest({ overview }: StockShortInterestProps) {
  const [shortInterestData, setShortInterestData] = useState<ShortInterestData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchShortInterestData() {
      try {
        setLoading(true)
        const response = await fetch(`/api/short-interest/${overview.Symbol}`)

        if (!response.ok) {
          throw new Error("Failed to fetch short interest data")
        }

        const data = await response.json()
        setShortInterestData(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching short interest data:", err)
        setError("Unable to load short interest data")
      } finally {
        setLoading(false)
      }
    }

    fetchShortInterestData()
  }, [overview.Symbol])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Short Interest</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-8">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground">Loading short interest data...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !shortInterestData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Short Interest</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-4 text-center">
            <p className="text-muted-foreground">Short interest data is not available for this stock.</p>
            <p className="text-sm text-muted-foreground mt-2">
              This may be due to the stock being newly listed, having low trading volume, or limitations in the data
              source.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const { shortPercentFloat, shortPercentOutstanding, shortRatio, sharesShort, sharesShortPriorMonth } =
    shortInterestData

  const shortInterestChange = sharesShort - sharesShortPriorMonth
  const shortInterestChangePercent = sharesShortPriorMonth ? (shortInterestChange / sharesShortPriorMonth) * 100 : 0

  // Determine risk level for short squeeze
  let squeezeRisk = "Low"
  let squeezeRiskColor = "bg-green-500"

  if (shortPercentFloat > 20) {
    squeezeRisk = "High"
    squeezeRiskColor = "bg-red-500"
  } else if (shortPercentFloat > 10) {
    squeezeRisk = "Medium"
    squeezeRiskColor = "bg-yellow-500"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Short Interest</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Short % of Float</span>
            <span className="text-sm font-bold">{shortPercentFloat.toFixed(2)}%</span>
          </div>
          <Progress value={shortPercentFloat} max={40} className="h-2" />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Short % of Outstanding</span>
            <span className="text-sm font-bold">{shortPercentOutstanding.toFixed(2)}%</span>
          </div>
          <Progress value={shortPercentOutstanding} max={40} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Short Ratio (Days to Cover)</h3>
            <p className="text-lg font-semibold">{shortRatio.toFixed(2)} days</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Short Squeeze Risk</h3>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${squeezeRiskColor}`}></div>
              <p className="text-lg font-semibold">{squeezeRisk}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Short Interest Change (Month)</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-lg font-semibold">
              {shortInterestChange > 0 ? "+" : ""}
              {shortInterestChange.toLocaleString()}
            </p>
            <p className={`text-sm font-medium ${shortInterestChange >= 0 ? "text-red-500" : "text-green-500"}`}>
              ({shortInterestChange > 0 ? "+" : ""}
              {shortInterestChangePercent.toFixed(2)}%)
            </p>
          </div>
        </div>

        <div className="text-sm text-muted-foreground mt-4">
          <p>
            <strong>Short interest</strong> represents the number of shares that have been sold short but not yet
            covered or closed. High short interest (especially &gt;20% of float) may indicate potential for a short
            squeeze if the stock price rises.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

