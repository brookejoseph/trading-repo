import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { StockOverview } from "@/components/stock-overview"
import { StockFinancials } from "@/components/stock-financials"
import { StockNews } from "@/components/stock-news"
import { StockOptionsActivity } from "@/components/stock-options-activity"
import { StockShortInterest } from "@/components/stock-short-interest"
import { StockPriceSummary } from "@/components/stock-price-summary"
import { StockTradingRecommendations } from "@/components/stock-trading-recommendations"
import {
  getStockOverview,
  getStockDailyTimeSeries,
  getStockNews,
  getOptionsData,
  getTradingRecommendations,
} from "@/lib/alpha-vantage"

interface StockPageProps {
  params: {
    symbol: string
  }
}

export async function generateMetadata({ params }: StockPageProps): Promise<Metadata> {
  const { symbol } = params

  try {
    const overview = await getStockOverview(symbol)
    return {
      title: `${overview.Name} (${symbol}) - Stock Information`,
      description: `View detailed stock information for ${overview.Name} (${symbol}) including price history, company overview, and financial data.`,
    }
  } catch (error) {
    return {
      title: `${symbol} - Stock Information`,
      description: `View detailed stock information for ${symbol} including price history, company overview, and financial data.`,
    }
  }
}

export default async function StockPage({ params }: StockPageProps) {
  const { symbol } = params

  try {
    const [overview, timeSeries, news, optionsData] = await Promise.all([
      getStockOverview(symbol),
      getStockDailyTimeSeries(symbol),
      getStockNews(symbol),
      getOptionsData(symbol).catch(() => null), // Make options data optional
    ])

    // Get trading recommendations
    const tradingRecommendation = await getTradingRecommendations(symbol, overview, timeSeries)

    // Get current price and previous close from time series
    const timeSeriesData = Object.entries(timeSeries["Time Series (Daily)"]).sort(
      (a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime(),
    ) // Sort by date descending

    const latestData = timeSeriesData[0]
    const previousData = timeSeriesData[1]

    const currentPrice = latestData ? Number.parseFloat(latestData[1]["4. close"]) : 0
    const previousClose = previousData ? Number.parseFloat(previousData[1]["4. close"]) : undefined
    const dayHigh = latestData ? Number.parseFloat(latestData[1]["2. high"]) : undefined
    const dayLow = latestData ? Number.parseFloat(latestData[1]["3. low"]) : undefined

    return (
      <div className="flex flex-col min-h-screen">
        <header className="bg-background border-b">
          <div className="container mx-auto py-6">
            <div className="flex items-baseline gap-2">
              <h1 className="text-3xl font-bold tracking-tight">{overview.Name}</h1>
              <span className="text-xl font-medium text-muted-foreground">{symbol}</span>
            </div>
            <p className="text-muted-foreground mt-1">
              {overview.Exchange}: {overview.Industry}
            </p>
          </div>
        </header>
        <main className="flex-1 container mx-auto py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <StockPriceSummary
                symbol={symbol}
                currentPrice={currentPrice}
                previousClose={previousClose}
                dayHigh={dayHigh}
                dayLow={dayLow}
              />
              <StockTradingRecommendations recommendation={tradingRecommendation} currentPrice={currentPrice} />
              {optionsData && <StockOptionsActivity optionsData={optionsData} />}
              <StockFinancials overview={overview} />
            </div>
            <div className="space-y-8">
              <StockOverview overview={overview} />
              <StockShortInterest overview={overview} />
              <StockNews news={news} />
            </div>
          </div>
        </main>
        <footer className="bg-muted py-6">
          <div className="container mx-auto text-center text-sm text-muted-foreground">
            <p>Data provided by Alpha Vantage API. Not financial advice.</p>
          </div>
        </footer>
      </div>
    )
  } catch (error) {
    notFound()
  }
}

