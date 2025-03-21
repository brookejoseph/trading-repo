import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b">
        <div className="container mx-auto py-6">
          <h1 className="text-3xl font-bold tracking-tight">NASDAQ Stock Search</h1>
        </div>
      </header>
      <main className="flex-1 container mx-auto py-12 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-semibold">Loading Stock Data</h2>
          <p className="text-muted-foreground mt-2">Fetching the latest information...</p>
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

