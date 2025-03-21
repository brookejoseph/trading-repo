import Link from "next/link"
import type { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Unusual Options Activity | NASDAQ Stock Search",
  description: "Track unusual options activity across NASDAQ stocks to identify potential market-moving events.",
}

// This would normally come from an API, but for demo purposes we'll use static data
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

export default function UnusualOptionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b">
        <div className="container mx-auto py-6">
          <h1 className="text-3xl font-bold tracking-tight">Unusual Options Activity</h1>
          <p className="text-muted-foreground mt-1">Track unusual options activity across NASDAQ stocks</p>
        </div>
      </header>
      <main className="flex-1 container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Today's Unusual Options Activity</CardTitle>
            <CardDescription>
              Options with high volume relative to open interest may indicate informed trading
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Strike</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Expiration</TableHead>
                    <TableHead>Last</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Volume</TableHead>
                    <TableHead>Open Interest</TableHead>
                    <TableHead>Vol/OI Ratio</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {unusualOptionsData.map((option, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <Link href={`/stock/${option.symbol}`} className="text-primary hover:underline">
                          {option.symbol}
                        </Link>
                      </TableCell>
                      <TableCell>{option.strike}</TableCell>
                      <TableCell>
                        <Badge variant={option.contractType === "call" ? "default" : "destructive"}>
                          {option.contractType.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>{option.expirationDate}</TableCell>
                      <TableCell>{formatCurrency(option.lastPrice)}</TableCell>
                      <TableCell className={option.change >= 0 ? "text-green-600" : "text-red-600"}>
                        {option.change >= 0 ? "+" : ""}
                        {option.change.toFixed(2)} ({option.percentChange.toFixed(2)}%)
                      </TableCell>
                      <TableCell>{option.volume.toLocaleString()}</TableCell>
                      <TableCell>{option.openInterest.toLocaleString()}</TableCell>
                      <TableCell className="font-semibold">{option.volumeToOIRatio.toFixed(2)}x</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold">Understanding Unusual Options Activity</h3>
              <p className="text-muted-foreground">
                Unusual options activity occurs when trading volume significantly exceeds the open interest for a
                particular option contract. This may indicate that large institutional investors or informed traders are
                taking new positions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">Volume/Open Interest Ratio</h4>
                  <p className="text-sm text-muted-foreground">
                    A high volume to open interest ratio (typically &gt; 1.0) suggests new positions are being
                    established rather than existing positions being closed.
                  </p>
                </div>
                <div className="p-4 rounded-lg border">
                  <h4 className="font-medium mb-2">Interpreting the Data</h4>
                  <p className="text-sm text-muted-foreground">
                    High call volume may indicate bullish sentiment, while high put volume may suggest bearish
                    expectations. Always consider other factors like upcoming earnings or news events.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <footer className="bg-muted py-6">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>Data provided by Alpha Vantage API. Not financial advice.</p>
        </div>
      </footer>
    </div>
  )
}

