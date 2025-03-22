"use client"
import Link from "next/link"
import { ArrowRight, TrendingUp, Search, ChevronRight } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-[#f5f1e8] border-b border-zinc-200">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-zinc-900">
                Advanced Market Analytics for <span className="text-amber-700">Informed Decisions</span>
              </h2>
              <p className="text-lg text-zinc-600 mb-8 max-w-2xl mx-auto">
                Access professional-grade market data, unusual options activity, and institutional-level analytics.
              </p>
              
              {/* Search Box - Using SearchForm instead of custom implementation */}
              <div className="max-w-lg mx-auto">
                <SearchBar />
                <div className="mt-3 flex justify-center gap-4 text-sm text-zinc-500">
                  <span>Try:</span>
                  <div className="flex gap-3">
                    <Link href="/stock/AAPL" className="hover:text-amber-700 transition-colors">AAPL</Link>
                    <Link href="/stock/MSFT" className="hover:text-amber-700 transition-colors">MSFT</Link>
                    <Link href="/stock/TSLA" className="hover:text-amber-700 transition-colors">TSLA</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Section: Unusual Options */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="flex-1">
                  <div className="inline-block bg-amber-100 text-amber-700 px-3 py-1 text-sm font-medium rounded-md mb-4">
                    Featured
                  </div>
                  <h2 className="text-3xl font-bold mb-4">Unusual Options Activity</h2>
                  <p className="text-zinc-600 mb-6">
                    Our Unusual Options Activity scanner identifies potential market-moving smart money flows before they hit the mainstream. Track high volume-to-open interest ratios, large block trades, and directional sweeps.
                  </p>
                  <ul className="space-y-2 text-zinc-700 mb-6">
                    <li className="flex items-center gap-2">
                      <ChevronRight size={16} className="text-amber-700" />
                      <span>Identify institutional money movements</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight size={16} className="text-amber-700" />
                      <span>Track unusual volume and open interest patterns</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight size={16} className="text-amber-700" />
                      <span>Get alerts for potential market-moving activity</span>
                    </li>
                  </ul>
                  <Link 
                    href="/unusual-options" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-amber-700 text-white font-medium rounded-md hover:bg-amber-800 transition-colors"
                  >
                    View Options Flow <ArrowRight size={16} />
                  </Link>
                </div>
                
                <div className="flex-1">
                  <div className="bg-white border border-zinc-200 rounded-md shadow-sm overflow-hidden">
                    <div className="bg-zinc-800 text-white p-3 flex items-center justify-between">
                      <h3 className="font-bold">Today's Unusual Activity</h3>
                      <span className="text-xs bg-amber-600 px-2 py-0.5 rounded-full">Live</span>
                    </div>
                    <table className="w-full text-sm">
                      <thead className="bg-zinc-50 border-b border-zinc-200">
                        <tr>
                          <th className="text-left p-3 text-zinc-600 font-medium">Symbol</th>
                          <th className="text-left p-3 text-zinc-600 font-medium">Strike</th>
                          <th className="text-left p-3 text-zinc-600 font-medium">Type</th>
                          <th className="text-right p-3 text-zinc-600 font-medium">Vol/OI</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        <tr className="hover:bg-zinc-50 transition-colors">
                          <td className="p-3 font-bold">TSLA</td>
                          <td className="p-3">$250</td>
                          <td className="p-3"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">CALL</span></td>
                          <td className="p-3 text-right">4.0x</td>
                        </tr>
                        <tr className="hover:bg-zinc-50 transition-colors">
                          <td className="p-3 font-bold">NVDA</td>
                          <td className="p-3">$500</td>
                          <td className="p-3"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">CALL</span></td>
                          <td className="p-3 text-right">5.3x</td>
                        </tr>
                        <tr className="hover:bg-zinc-50 transition-colors">
                          <td className="p-3 font-bold">AMZN</td>
                          <td className="p-3">$140</td>
                          <td className="p-3"><span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">PUT</span></td>
                          <td className="p-3 text-right">4.8x</td>
                        </tr>
                        <tr className="hover:bg-zinc-50 transition-colors">
                          <td className="p-3 font-bold">META</td>
                          <td className="p-3">$350</td>
                          <td className="p-3"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">CALL</span></td>
                          <td className="p-3 text-right">3.2x</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-zinc-800 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Start Making Informed Decisions Today</h2>
              <p className="text-zinc-300 mb-8">
                Access professional-grade market data, unusual options activity, and trading signals all in one platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/" 
                  className="px-8 py-3 bg-amber-600 rounded-md font-medium hover:bg-amber-700 transition-colors"
                >
                  Get Started
                </Link>
                <Link 
                  href="/unusual-options" 
                  className="px-8 py-3 bg-white/10 rounded-md font-medium hover:bg-white/20 transition-colors"
                >
                  View Options Flow
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-zinc-200 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-zinc-900 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-xl font-bold tracking-tight">NASDAQ<span className="text-amber-700">DATA</span></h2>
            </div>
            
            <div className="flex gap-8">
              <Link href="/unusual-options" className="text-sm text-zinc-600 hover:text-amber-700">Options Flow</Link>
              <Link href="/" className="text-sm text-zinc-600 hover:text-amber-700">Market Data</Link>
              <Link href="/" className="text-sm text-zinc-600 hover:text-amber-700">Analytics</Link>
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

// Custom SearchBar component with the same functionality as the original SearchForm

function SearchBar() {
  const [symbol, setSymbol] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (!symbol.trim()) {
      setError("Please enter a stock symbol")
      return
    }

    // Basic validation for ticker symbol format
    const tickerRegex = /^[A-Z0-9.]{1,5}$/i
    if (!tickerRegex.test(symbol.trim())) {
      setError("Please enter a valid stock symbol (1-5 alphanumeric characters)")
      return
    }

    setError("")
    router.push(`/stock/${symbol.trim().toUpperCase()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex bg-white border border-zinc-300 rounded-md overflow-hidden shadow-sm">
      <div className="flex-1 flex items-center">
        <Search className="h-5 w-5 text-zinc-400 ml-4" />
        <input 
          type="text"
          placeholder="Enter ticker symbol (e.g., AAPL)" 
          className="w-full bg-transparent px-3 py-3 text-zinc-800 placeholder:text-zinc-400 focus:outline-none"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
      </div>
      <button 
        type="submit" 
        className="bg-amber-700 text-white px-6 py-3 font-medium hover:bg-amber-800 transition-colors"
      >
        Search
      </button>
      {error && <p className="absolute mt-12 text-red-600 text-sm">{error}</p>}
    </form>
  )
}