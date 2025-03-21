"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { TradingRecommendation } from "@/lib/alpha-vantage"
import { AlertTriangle, Clock, Target } from "lucide-react"

interface StockTradingRecommendationsProps {
  recommendation: TradingRecommendation
  currentPrice: number
}

export function StockTradingRecommendations({ recommendation, currentPrice }: StockTradingRecommendationsProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "details">("overview")

  // Determine color based on recommendation
  const getRecommendationColor = () => {
    switch (recommendation.recommendation) {
      case "Strong Buy":
        return "bg-green-500 text-white"
      case "Buy":
        return "bg-green-400 text-white"
      case "Hold":
        return "bg-yellow-400 text-black"
      case "Sell":
        return "bg-red-400 text-white"
      case "Strong Sell":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-400 text-white"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Trading Recommendations</CardTitle>
          <div className={`px-3 py-1 rounded-full text-sm font-bold ${getRecommendationColor()}`}>
            {recommendation.recommendation}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" onValueChange={(value) => setActiveTab(value as "overview" | "details")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Price Levels</TabsTrigger>
            <TabsTrigger value="details">Strategy Details</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-4">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-2 border-primary">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Entry Price</h3>
                    <p className="text-xl font-bold">${recommendation.entryPrice.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Current: ${currentPrice.toFixed(2)}</p>
                  </CardContent>
                </Card>
                <Card className="border-2 border-destructive">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Stop Loss</h3>
                    <p className="text-xl font-bold">${recommendation.stopLoss.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {Math.abs(
                        ((recommendation.stopLoss - recommendation.entryPrice) / recommendation.entryPrice) * 100,
                      ).toFixed(2)}
                      % from entry
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="border-2 border-green-500">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Take Profit 1</h3>
                    <p className="text-xl font-bold">${recommendation.takeProfit1.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {Math.abs(
                        ((recommendation.takeProfit1 - recommendation.entryPrice) / recommendation.entryPrice) * 100,
                      ).toFixed(2)}
                      % from entry
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-2 border-green-600">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Take Profit 2</h3>
                    <p className="text-xl font-bold">${recommendation.takeProfit2.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {Math.abs(
                        ((recommendation.takeProfit2 - recommendation.entryPrice) / recommendation.entryPrice) * 100,
                      ).toFixed(2)}
                      % from entry
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span className="font-medium">Risk/Reward Ratio:</span>
                </div>
                <span className="font-bold">1:{recommendation.riskRewardRatio}</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details" className="pt-4">
            <div className="space-y-6">
              <div className="p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Time Frame</h3>
                </div>
                <p>{recommendation.timeFrame}</p>
              </div>

              <div className="p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Strategy</h3>
                </div>
                <p>{recommendation.strategy}</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg border">
                  <h3 className="font-medium mb-2">Technical Analysis</h3>
                  <p className="text-sm">{recommendation.technicalReason}</p>
                </div>

                <div className="p-4 rounded-lg border">
                  <h3 className="font-medium mb-2">Fundamental Analysis</h3>
                  <p className="text-sm">{recommendation.fundamentalReason}</p>
                </div>
              </div>

              <div className="flex items-center justify-center p-4 rounded-lg border bg-muted">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                <p className="text-sm text-muted-foreground">
                  These recommendations are generated algorithmically and should not be considered financial advice.
                  Always do your own research before making investment decisions.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

