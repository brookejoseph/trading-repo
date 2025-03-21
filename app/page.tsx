import { SearchForm } from "@/components/search-form"
import Link from "next/link"
import { ArrowRight, BarChart3, Target, DollarSign } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b">
        <div className="container mx-auto py-6">
          <h1 className="text-3xl font-bold tracking-tight">NASDAQ Stock Search</h1>
          <p className="text-muted-foreground mt-1">Search for any NASDAQ stock to view detailed information</p>
        </div>
      </header>
      <main className="flex-1 container mx-auto py-12">
        <div className="max-w-3xl mx-auto">
          <SearchForm />

          <div className="mt-12 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Popular Stocks</h2>
              <Link href="/unusual-options" className="text-primary hover:underline flex items-center gap-1">
                View Unusual Options <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["AAPL", "MSFT", "GOOGL", "AMZN", "META", "TSLA"].map((symbol) => (
                <a
                  key={symbol}
                  href={`/stock/${symbol}`}
                  className="block p-6 rounded-lg border bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <h3 className="font-bold text-lg">{symbol}</h3>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-semibold">Advanced Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-lg border bg-card text-card-foreground">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <h3 className="font-bold">Unusual Options Activity</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Track unusual options activity to identify potential market-moving events and informed trading.
                </p>
              </div>

              <div className="p-6 rounded-lg border bg-card text-card-foreground">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <h3 className="font-bold">Short Interest Data</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  View detailed short interest metrics including percentage of float shorted and short squeeze
                  potential.
                </p>
              </div>

              <div className="p-6 rounded-lg border bg-card text-card-foreground">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-primary" />
                  <h3 className="font-bold">Trading Recommendations</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get algorithmic trading recommendations with entry points, stop loss, and take profit levels.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 rounded-lg border bg-card text-card-foreground">
            <h2 className="text-xl font-semibold mb-4">About This Tool</h2>
            <p className="text-muted-foreground">
              This stock search tool provides real-time and historical data for NASDAQ-listed stocks. Enter any valid
              ticker symbol to access comprehensive information including company overview, financial indicators,
              unusual options activity, short interest data, and trading recommendations. Data is sourced from Alpha
              Vantage API.
            </p>
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
}

