import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency, formatNumber } from "@/lib/utils"
import type { StockOverviewData } from "@/lib/alpha-vantage"

interface StockFinancialsProps {
  overview: StockOverviewData
}

export function StockFinancials({ overview }: StockFinancialsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="key-metrics">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="key-metrics">Key Metrics</TabsTrigger>
            <TabsTrigger value="valuation">Valuation</TabsTrigger>
            <TabsTrigger value="profitability">Profitability</TabsTrigger>
          </TabsList>

          <TabsContent value="key-metrics" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Market Cap</h3>
                  <p className="text-lg font-semibold">{formatCurrency(Number(overview.MarketCapitalization))}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Shares Outstanding</h3>
                  <p className="text-lg font-semibold">{formatNumber(Number(overview.SharesOutstanding))}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Book Value</h3>
                  <p className="text-lg font-semibold">{formatCurrency(Number(overview.BookValue))}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Dividend Per Share</h3>
                  <p className="text-lg font-semibold">
                    {overview.DividendPerShare ? formatCurrency(Number(overview.DividendPerShare)) : "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Dividend Yield</h3>
                  <p className="text-lg font-semibold">
                    {overview.DividendYield ? `${(Number(overview.DividendYield) * 100).toFixed(2)}%` : "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">EPS</h3>
                  <p className="text-lg font-semibold">{formatCurrency(Number(overview.EPS))}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="valuation" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">P/E Ratio</h3>
                  <p className="text-lg font-semibold">{overview.PERatio}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">PEG Ratio</h3>
                  <p className="text-lg font-semibold">{overview.PEGRatio || "N/A"}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Price to Book Ratio</h3>
                  <p className="text-lg font-semibold">{overview.PriceToBookRatio}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Price to Sales Ratio</h3>
                  <p className="text-lg font-semibold">{overview.PriceToSalesRatioTTM}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Analyst Target Price</h3>
                  <p className="text-lg font-semibold">
                    {overview.AnalystTargetPrice ? formatCurrency(Number(overview.AnalystTargetPrice)) : "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Beta</h3>
                  <p className="text-lg font-semibold">{overview.Beta}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profitability" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Profit Margin</h3>
                  <p className="text-lg font-semibold">
                    {overview.ProfitMargin ? `${(Number(overview.ProfitMargin) * 100).toFixed(2)}%` : "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Operating Margin TTM</h3>
                  <p className="text-lg font-semibold">
                    {overview.OperatingMarginTTM ? `${(Number(overview.OperatingMarginTTM) * 100).toFixed(2)}%` : "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Return on Assets TTM</h3>
                  <p className="text-lg font-semibold">
                    {overview.ReturnOnAssetsTTM ? `${(Number(overview.ReturnOnAssetsTTM) * 100).toFixed(2)}%` : "N/A"}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Return on Equity TTM</h3>
                  <p className="text-lg font-semibold">
                    {overview.ReturnOnEquityTTM ? `${(Number(overview.ReturnOnEquityTTM) * 100).toFixed(2)}%` : "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Revenue Per Share TTM</h3>
                  <p className="text-lg font-semibold">{formatCurrency(Number(overview.RevenuePerShareTTM))}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-1">Quarterly Earnings Growth YOY</h3>
                  <p className="text-lg font-semibold">
                    {overview.QuarterlyEarningsGrowthYOY
                      ? `${(Number(overview.QuarterlyEarningsGrowthYOY) * 100).toFixed(2)}%`
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

