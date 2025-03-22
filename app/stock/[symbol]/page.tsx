import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { StockOverview } from "@/components/stock-overview"
import { StockFinancials } from "@/components/stock-financials"
import { StockNews } from "@/components/stock-news"
import { StockOptionsActivity } from "@/components/stock-options-activity"
import { StockShortInterest } from "@/components/stock-short-interest"
import { StockPriceSummary } from "@/components/stock-price-summary"
import { StockTradingRecommendations } from "@/components/stock-trading-recommendations"
import { TrendingUp, ArrowUp, ArrowDown, ChevronLeft } from "lucide-react"
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
    
    // Determine if price is up or down
    const priceChange = previousClose ? currentPrice - previousClose : 0
    const percentChange = previousClose ? (priceChange / previousClose) * 100 : 0
    const isPriceUp = priceChange >= 0

    return (
      <div className="flex flex-col min-h-screen bg-[#f8f5f0] text-zinc-800 font-serif">
        {/* Header */}
        <header className="bg-white border-b border-zinc-200 sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto py-4 px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-zinc-900 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <h1 className="text-xl font-bold tracking-tight">NASDAQ<span className="text-amber-700">DATA</span></h1>
              </div>
              <nav className="flex items-center gap-8">
                <Link href="/unusual-options" className="text-sm text-zinc-600 hover:text-amber-700">Options Flow</Link>
                <Link href="/" className="text-sm text-zinc-600 hover:text-amber-700">Market Data</Link>
                <Link href="/" className="text-sm text-zinc-600 hover:text-amber-700">Analytics</Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Subheader with Company Info */}
        <div className="bg-[#f5f1e8] border-b border-zinc-200 py-6">
          <div className="container mx-auto px-6">
            <Link href="/" className="inline-flex items-center gap-1 text-amber-700 hover:underline mb-2">
              <ChevronLeft size={16} />
              <span>Back to Search</span>
            </Link>
            <div className="flex items-baseline gap-3">
              <h2 className="text-3xl font-bold">{overview.Name}</h2>
              <span className="text-xl font-medium text-zinc-500">{symbol}</span>
            </div>
            <p className="text-zinc-600 mt-1">
              {overview.Exchange}: {overview.Industry}
            </p>
          </div>
        </div>

        <main className="flex-1 py-8">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* Price Summary Card */}
                <div className="bg-white border border-zinc-200 rounded-md p-6 shadow-sm">
                  <h3 className="text-2xl font-bold mb-4">Current Price</h3>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold">${currentPrice.toFixed(2)}</span>
                    <div className={`flex items-center ${isPriceUp ? "text-emerald-600" : "text-red-600"}`}>
                      {isPriceUp ? <ArrowUp size={18} className="mr-1" /> : <ArrowDown size={18} className="mr-1" />}
                      <span className="font-medium">
                        {isPriceUp ? "+" : ""}{priceChange.toFixed(2)} ({isPriceUp ? "+" : ""}{percentChange.toFixed(2)}%)
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 border-t border-zinc-100 pt-4">
                    {dayHigh && (
                      <div>
                        <h4 className="text-sm text-zinc-500 mb-1">Day High</h4>
                        <p className="text-lg font-semibold">${dayHigh.toFixed(2)}</p>
                      </div>
                    )}
                    {dayLow && (
                      <div>
                        <h4 className="text-sm text-zinc-500 mb-1">Day Low</h4>
                        <p className="text-lg font-semibold">${dayLow.toFixed(2)}</p>
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm text-zinc-500 mb-1">Previous Close</h4>
                      <p className="text-lg font-semibold">${previousClose?.toFixed(2) || "N/A"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-zinc-500 mb-1">Last Updated</h4>
                      <p className="text-sm">{new Date().toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Trading Recommendations */}
                <div className="bg-white border border-zinc-200 rounded-md shadow-sm">
                  <div className="border-b border-zinc-200 p-4">
                    <h3 className="text-xl font-bold">Trading Recommendation</h3>
                  </div>
                  <div className="p-4">
                    <StockTradingRecommendations recommendation={tradingRecommendation} currentPrice={currentPrice} />
                  </div>
                </div>

                {/* Options Activity if available */}
                {optionsData && (
                  <div className="bg-white border border-zinc-200 rounded-md shadow-sm">
                    <div className="border-b border-zinc-200 p-4">
                      <h3 className="text-xl font-bold">Options Activity</h3>
                    </div>
                    <div className="p-4">
                      <StockOptionsActivity optionsData={optionsData} />
                    </div>
                  </div>
                )}

                {/* Financial Information */}
                <div className="bg-white border border-zinc-200 rounded-md shadow-sm">
                  <div className="border-b border-zinc-200 p-4">
                    <h3 className="text-xl font-bold">Financial Information</h3>
                  </div>
                  <div className="p-4">
                    <StockFinancials overview={overview} />
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Company Overview */}
                <div className="bg-white border border-zinc-200 rounded-md shadow-sm">
                  <div className="border-b border-zinc-200 p-4">
                    <h3 className="text-xl font-bold">Company Overview</h3>
                  </div>
                  <div className="p-4">
                    <StockOverview overview={overview} />
                  </div>
                </div>

                {/* Short Interest */}
                <div className="bg-white border border-zinc-200 rounded-md shadow-sm">
                  <div className="border-b border-zinc-200 p-4">
                    <h3 className="text-xl font-bold">Short Interest</h3>
                  </div>
                  <div className="p-4">
                    <StockShortInterest overview={overview} />
                  </div>
                </div>

                {/* Latest News */}
                <div className="bg-white border border-zinc-200 rounded-md shadow-sm">
                  <div className="border-b border-zinc-200 p-4">
                    <h3 className="text-xl font-bold">Latest News</h3>
                  </div>
                  <div className="p-4">
                    <StockNews news={news} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-zinc-800 text-white py-8">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-zinc-900 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-xl font-bold tracking-tight">NASDAQ<span className="text-amber-700">DATA</span></h2>
              </div>
              
              <div className="flex gap-8">
                <Link href="/unusual-options" className="text-sm text-zinc-400 hover:text-white">Options Flow</Link>
                <Link href="/" className="text-sm text-zinc-400 hover:text-white">Market Data</Link>
                <Link href="/" className="text-sm text-zinc-400 hover:text-white">Analytics</Link>
              </div>
              
              <p className="text-sm text-zinc-500">
                Market data provided by Alpha Vantage. Not financial advice.
              </p>
            </div>
          </div>
        </footer>
      </div>
    )
  } catch (error) {
    notFound()
  }
}