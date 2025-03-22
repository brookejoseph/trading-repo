import Link from "next/link"
import type { Metadata } from "next"
import { TrendingUp, AlertCircle, Info } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

// Import any needed functions for API data fetching
import { getUnusualOptionsData } from "@/lib/alpha-vantage"

export const metadata: Metadata = {
  title: "Unusual Options Activity | NASDAQ Market Data",
  description: "Track unusual options activity across NASDAQ stocks to identify potential market-moving events.",
}

// This function fetches unusual options data
async function fetchUnusualOptionsData() {
  try {
    // Try to fetch from the API
    // Note: You would need to implement this function in your alpha-vantage.ts file
    // const data = await getUnusualOptionsData();
    // return data;
    
    // For now, we'll return the mock data until the API integration is complete
    return unusualOptionsData;
  } catch (error) {
    console.error("Error fetching unusual options data:", error);
    return unusualOptionsData; // Fallback to mock data
  }
}

// Mock data for demonstration purposes
const unusualOptionsData = [
  {
    symbol: "AAPL",
    contractName: "AAPL 2023-12-15 C180",
    strike: 180,
    lastPrice: 3.25,
    change: 0.75,
    percentChange: 30.0,
    volume: 15000,
    openInterest: 5000,
    volumeToOIRatio: 3.0,
    contractType: "call",
    expirationDate: "2023-12-15",
  },
  {
    symbol: "MSFT",
    contractName: "MSFT 2023-12-15 P350",
    strike: 350,
    lastPrice: 4.2,
    change: 1.1,
    percentChange: 35.5,
    volume: 8500,
    openInterest: 2200,
    volumeToOIRatio: 3.86,
    contractType: "put",
    expirationDate: "2023-12-15",
  },
  {
    symbol: "TSLA",
    contractName: "TSLA 2023-12-22 C250",
    strike: 250,
    lastPrice: 5.75,
    change: -0.25,
    percentChange: -4.17,
    volume: 12000,
    openInterest: 3000,
    volumeToOIRatio: 4.0,
    contractType: "call",
    expirationDate: "2023-12-22",
  },
  {
    symbol: "NVDA",
    contractName: "NVDA 2023-12-15 C500",
    strike: 500,
    lastPrice: 8.5,
    change: 2.25,
    percentChange: 36.0,
    volume: 9500,
    openInterest: 1800,
    volumeToOIRatio: 5.28,
    contractType: "call",
    expirationDate: "2023-12-15",
  },
  {
    symbol: "AMZN",
    contractName: "AMZN 2023-12-22 P140",
    strike: 140,
    lastPrice: 2.15,
    change: 0.65,
    percentChange: 43.33,
    volume: 7200,
    openInterest: 1500,
    volumeToOIRatio: 4.8,
    contractType: "put",
    expirationDate: "2023-12-22",
  },
]

export default async function UnusualOptionsPage() {
  // Fetch the unusual options data
  const optionsData = await fetchUnusualOptionsData();
  
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
              <Link href="/unusual-options" className="text-sm text-amber-700 hover:text-amber-800 font-medium">Options Flow</Link>
              <Link href="/" className="text-sm text-zinc-600 hover:text-amber-700">Market Data</Link>
              <Link href="/" className="text-sm text-zinc-600 hover:text-amber-700">Analytics</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Subheader */}
      <div className="bg-[#f5f1e8] border-b border-zinc-200 py-6">
        <div className="container mx-auto px-6">
          <div className="inline-block bg-amber-100 text-amber-700 px-3 py-1 text-sm font-medium rounded-md mb-2">
            <AlertCircle size={14} className="inline-block mr-1" />
            Live Data
          </div>
          <h2 className="text-3xl font-bold">Unusual Options Activity</h2>
          <p className="text-zinc-600 mt-1">
            Track unusual options activity across NASDAQ stocks to identify potential market-moving events
          </p>
        </div>
      </div>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-6">
          {/* Main table */}
          <div className="bg-white border border-zinc-200 rounded-md shadow-sm overflow-hidden mb-8">
            <div className="bg-zinc-800 text-white p-4">
              <h3 className="font-bold text-lg">Today's Unusual Options Activity</h3>
              <p className="text-sm text-zinc-300">
                Options with high volume relative to open interest may indicate informed trading
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-zinc-100 border-b border-zinc-200">
                  <tr>
                    <th className="text-left p-3 text-zinc-600 font-medium">Symbol</th>
                    <th className="text-left p-3 text-zinc-600 font-medium">Strike</th>
                    <th className="text-left p-3 text-zinc-600 font-medium">Type</th>
                    <th className="text-left p-3 text-zinc-600 font-medium">Expiration</th>
                    <th className="text-left p-3 text-zinc-600 font-medium">Last</th>
                    <th className="text-left p-3 text-zinc-600 font-medium">Change</th>
                    <th className="text-right p-3 text-zinc-600 font-medium">Volume</th>
                    <th className="text-right p-3 text-zinc-600 font-medium">Open Interest</th>
                    <th className="text-right p-3 text-zinc-600 font-medium">Vol/OI Ratio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {optionsData.map((option, index) => (
                    <tr key={index} className="hover:bg-zinc-50 transition-colors">
                      <td className="p-3 font-bold">
                        <Link href={`/stock/${option.symbol}`} className="text-amber-700 hover:underline">
                          {option.symbol}
                        </Link>
                      </td>
                      <td className="p-3">{option.strike}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          option.contractType === "call" 
                            ? "bg-emerald-100 text-emerald-700" 
                            : "bg-red-100 text-red-700"
                        }`}>
                          {option.contractType.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-3">{option.expirationDate}</td>
                      <td className="p-3">{formatCurrency(option.lastPrice)}</td>
                      <td className={`p-3 ${option.change >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                        {option.change >= 0 ? "+" : ""}
                        {option.change.toFixed(2)} ({option.percentChange.toFixed(2)}%)
                      </td>
                      <td className="p-3 text-right">{option.volume.toLocaleString()}</td>
                      <td className="p-3 text-right">{option.openInterest.toLocaleString()}</td>
                      <td className="p-3 text-right font-semibold">{option.volumeToOIRatio.toFixed(2)}x</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Explanatory content */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Understanding Unusual Options Activity</h3>
            <p className="text-zinc-600 mb-6">
              Unusual options activity occurs when trading volume significantly exceeds the open interest for a
              particular option contract. This may indicate that large institutional investors or informed traders are
              taking new positions in anticipation of upcoming market movements.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border border-zinc-200 p-5 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <Info size={16} className="text-amber-700" />
                  </div>
                  <h4 className="font-bold">Volume/Open Interest Ratio</h4>
                </div>
                <p className="text-zinc-600 text-sm">
                  A high volume to open interest ratio (typically greater than 1.0) suggests new positions are being
                  established rather than existing positions being closed. This is often a sign of informed money flow.
                </p>
              </div>
              
              <div className="bg-white border border-zinc-200 p-5 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <Info size={16} className="text-amber-700" />
                  </div>
                  <h4 className="font-bold">Interpreting the Data</h4>
                </div>
                <p className="text-zinc-600 text-sm">
                  High call volume may indicate bullish sentiment, while high put volume may suggest bearish
                  expectations. Always consider other factors like upcoming earnings reports, insider trading patterns, or major news events.
                </p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-5 rounded-md text-amber-800">
              <p className="text-sm">
                <strong>Note:</strong> While unusual options activity can provide valuable insights into potential market movements,
                it should not be used as the sole basis for investment decisions. Always conduct thorough research and consider
                multiple factors before entering a position.
              </p>
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
}