"use client"

import { useState } from "react"
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
        return "bg-green-600 text-white"
      case "Buy":
        return "bg-green-500 text-white"
      case "Hold":
        return "bg-yellow-500 text-black"
      case "Sell":
        return "bg-red-500 text-white"
      case "Strong Sell":
        return "bg-red-600 text-white"
      default:
        return "bg-zinc-400 text-white"
    }
  }

  return (
    <div className="border border-zinc-200 bg-white">
      <div className="bg-zinc-100 p-4 border-b border-zinc-200 flex items-center justify-between">
        <h3 className="font-bold uppercase text-sm tracking-wider">Trading Recommendation</h3>
        <div className={`px-3 py-1 text-xs font-bold ${getRecommendationColor()}`}>
          {recommendation.recommendation}
        </div>
      </div>
      <div className="p-4">
        <div className="mb-4">
          <div className="inline-flex bg-zinc-100 p-1 rounded">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-1 text-sm font-semibold ${
                activeTab === "overview" ? "bg-white shadow-sm" : "text-zinc-600"
              }`}
            >
              Price Levels
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className={`px-4 py-1 text-sm font-semibold ${
                activeTab === "details" ? "bg-white shadow-sm" : "text-zinc-600"
              }`}
            >
              Strategy Details
            </button>
          </div>
        </div>

        {activeTab === "overview" ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-black p-4">
                <h3 className="text-sm text-zinc-500 mb-1">Entry Price</h3>
                <p className="text-lg font-bold">${recommendation.entryPrice.toFixed(2)}</p>
                <p className="text-xs text-zinc-500 mt-1">Current: ${currentPrice.toFixed(2)}</p>
              </div>
              <div className="border border-zinc-200 p-4">
                <h3 className="text-sm text-zinc-500 mb-1">Stop Loss</h3>
                <p className="text-lg font-bold">${recommendation.stopLoss.toFixed(2)}</p>
                <p className="text-xs text-zinc-500 mt-1">
                  {Math.abs(
                    ((recommendation.stopLoss - recommendation.entryPrice) / recommendation.entryPrice) * 100,
                  ).toFixed(2)}
                  % from entry
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border border-zinc-200 p-4">
                <h3 className="text-sm text-zinc-500 mb-1">Take Profit 1</h3>
                <p className="text-lg font-bold">${recommendation.takeProfit1.toFixed(2)}</p>
                <p className="text-xs text-zinc-500 mt-1">
                  {Math.abs(
                    ((recommendation.takeProfit1 - recommendation.entryPrice) / recommendation.entryPrice) * 100,
                  ).toFixed(2)}
                  % from entry
                </p>
              </div>
              <div className="border border-zinc-200 p-4">
                <h3 className="text-sm text-zinc-500 mb-1">Take Profit 2</h3>
                <p className="text-lg font-bold">${recommendation.takeProfit2.toFixed(2)}</p>
                <p className="text-xs text-zinc-500 mt-1">
                  {Math.abs(
                    ((recommendation.takeProfit2 - recommendation.entryPrice) / recommendation.entryPrice) * 100,
                  ).toFixed(2)}
                  % from entry
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-zinc-100">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-black" />
                <span className="font-medium">Risk/Reward Ratio:</span>
              </div>
              <span className="font-bold">1:{recommendation.riskRewardRatio}</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-4 border border-zinc-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-black" />
                <h3 className="font-medium">Time Frame</h3>
              </div>
              <p>{recommendation.timeFrame}</p>
            </div>

            <div className="p-4 border border-zinc-200">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-black" />
                <h3 className="font-medium">Strategy</h3>
              </div>
              <p>{recommendation.strategy}</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 border border-zinc-200">
                <h3 className="font-medium mb-2">Technical Analysis</h3>
                <p className="text-sm">{recommendation.technicalReason}</p>
              </div>

              <div className="p-4 border border-zinc-200">
                <h3 className="font-medium mb-2">Fundamental Analysis</h3>
                <p className="text-sm">{recommendation.fundamentalReason}</p>
              </div>
            </div>

            <div className="flex items-center p-4 border border-zinc-100 bg-zinc-50">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
              <p className="text-sm text-zinc-600">
                These recommendations are generated algorithmically and should not be considered financial advice.
                Always do your own research before making investment decisions.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}