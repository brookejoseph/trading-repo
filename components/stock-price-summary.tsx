import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { ArrowUp, ArrowDown } from "lucide-react"

interface StockPriceSummaryProps {
  symbol: string
  currentPrice: number
  previousClose?: number
  dayHigh?: number
  dayLow?: number
}

export function StockPriceSummary({ symbol, currentPrice, previousClose, dayHigh, dayLow }: StockPriceSummaryProps) {
  // Calculate price change if previous close is available
  const priceChange = previousClose ? currentPrice - previousClose : 0
  const priceChangePercent = previousClose ? (priceChange / previousClose) * 100 : 0
  const isPositive = priceChange >= 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Price</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold">{formatCurrency(currentPrice)}</span>
          {previousClose && (
            <div className={`flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}>
              {isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
              <span className="font-medium">
                {isPositive ? "+" : ""}
                {formatCurrency(priceChange)} ({priceChangePercent.toFixed(2)}%)
              </span>
            </div>
          )}
        </div>

        {(dayHigh || dayLow) && (
          <div className="grid grid-cols-2 gap-4">
            {dayHigh && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Day High</h3>
                <p className="text-lg font-semibold">{formatCurrency(dayHigh)}</p>
              </div>
            )}
            {dayLow && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Day Low</h3>
                <p className="text-lg font-semibold">{formatCurrency(dayLow)}</p>
              </div>
            )}
          </div>
        )}

        <div className="text-sm text-muted-foreground">
          <p>Last updated: {new Date().toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  )
}

