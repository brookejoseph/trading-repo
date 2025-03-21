import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import type { StockOverviewData } from "@/lib/alpha-vantage"

interface StockOverviewProps {
  overview: StockOverviewData
}

export function StockOverview({ overview }: StockOverviewProps) {
  return (
    <div className="border border-zinc-200 bg-white">
      <div className="bg-zinc-100 p-4 border-b border-zinc-200">
        <h3 className="font-bold uppercase text-sm tracking-wider">Company Overview</h3>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-sm text-zinc-500 mb-1">Description</h3>
          <p className="text-sm line-clamp-6">{overview.Description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm text-zinc-500 mb-1">Sector</h3>
            <p className="font-semibold text-sm">{overview.Sector}</p>
          </div>
          <div>
            <h3 className="text-sm text-zinc-500 mb-1">Industry</h3>
            <p className="font-semibold text-sm">{overview.Industry}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm text-zinc-500 mb-1">Market Cap</h3>
          <p className="font-semibold">{formatCurrency(Number(overview.MarketCapitalization))}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm text-zinc-500 mb-1">P/E Ratio</h3>
            <p className="font-semibold">{overview.PERatio}</p>
          </div>
          <div>
            <h3 className="text-sm text-zinc-500 mb-1">Dividend Yield</h3>
            <p className="font-semibold">{overview.DividendYield ? `${(Number(overview.DividendYield) * 100).toFixed(2)}%` : "N/A"}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm text-zinc-500 mb-1">52-Week High</h3>
            <p className="font-semibold">{formatCurrency(Number(overview["52WeekHigh"]))}</p>
          </div>
          <div>
            <h3 className="text-sm text-zinc-500 mb-1">52-Week Low</h3>
            <p className="font-semibold">{formatCurrency(Number(overview["52WeekLow"]))}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm text-zinc-500 mb-1">Analyst Target</h3>
          <p className="font-semibold">{overview.AnalystTargetPrice ? formatCurrency(Number(overview.AnalystTargetPrice)) : "N/A"}</p>
        </div>
      </div>
    </div>
  )
}