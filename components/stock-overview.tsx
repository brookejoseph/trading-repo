import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import type { StockOverviewData } from "@/lib/alpha-vantage"

interface StockOverviewProps {
  overview: StockOverviewData
}

export function StockOverview({ overview }: StockOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium text-sm text-muted-foreground mb-1">Description</h3>
          <p className="text-sm line-clamp-6">{overview.Description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-1">Sector</h3>
            <p>{overview.Sector}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-1">Industry</h3>
            <p>{overview.Industry}</p>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-sm text-muted-foreground mb-1">Market Cap</h3>
          <p>{formatCurrency(Number(overview.MarketCapitalization))}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-1">P/E Ratio</h3>
            <p>{overview.PERatio}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-1">Dividend Yield</h3>
            <p>{overview.DividendYield ? `${(Number(overview.DividendYield) * 100).toFixed(2)}%` : "N/A"}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-1">52-Week High</h3>
            <p>{formatCurrency(Number(overview["52WeekHigh"]))}</p>
          </div>
          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-1">52-Week Low</h3>
            <p>{formatCurrency(Number(overview["52WeekLow"]))}</p>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-sm text-muted-foreground mb-1">Analyst Target</h3>
          <p>{overview.AnalystTargetPrice ? formatCurrency(Number(overview.AnalystTargetPrice)) : "N/A"}</p>
        </div>
      </CardContent>
    </Card>
  )
}

