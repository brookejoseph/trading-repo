import Link from "next/link"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b">
        <div className="container mx-auto py-6">
          <h1 className="text-3xl font-bold tracking-tight">NASDAQ Stock Search</h1>
        </div>
      </header>
      <main className="flex-1 container mx-auto py-12 flex items-center justify-center">
        <div className="max-w-md w-full p-8 rounded-lg border bg-card text-card-foreground text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
          <h2 className="text-2xl font-bold mb-2">Stock Not Found</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't find the stock you're looking for. Please check the ticker symbol and try again.
          </p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
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

