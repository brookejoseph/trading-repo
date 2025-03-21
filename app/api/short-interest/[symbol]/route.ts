import { type NextRequest, NextResponse } from "next/server"

// This would normally fetch from a real API, but for demo purposes we'll use mock data
const mockShortInterestData = {
  AAPL: {
    shortPercentFloat: 0.67,
    shortPercentOutstanding: 0.59,
    shortRatio: 1.32,
    sharesShort: 105000000,
    sharesShortPriorMonth: 98000000,
  },
  MSFT: {
    shortPercentFloat: 0.55,
    shortPercentOutstanding: 0.48,
    shortRatio: 1.15,
    sharesShort: 41000000,
    sharesShortPriorMonth: 39000000,
  },
  GOOGL: {
    shortPercentFloat: 0.78,
    shortPercentOutstanding: 0.71,
    shortRatio: 1.45,
    sharesShort: 52000000,
    sharesShortPriorMonth: 49000000,
  },
  AMZN: {
    shortPercentFloat: 0.82,
    shortPercentOutstanding: 0.75,
    shortRatio: 1.21,
    sharesShort: 85000000,
    sharesShortPriorMonth: 79000000,
  },
  META: {
    shortPercentFloat: 1.12,
    shortPercentOutstanding: 0.98,
    shortRatio: 1.67,
    sharesShort: 28000000,
    sharesShortPriorMonth: 25000000,
  },
  TSLA: {
    shortPercentFloat: 3.45,
    shortPercentOutstanding: 2.98,
    shortRatio: 2.15,
    sharesShort: 102000000,
    sharesShortPriorMonth: 95000000,
  },
  GME: {
    shortPercentFloat: 21.5,
    shortPercentOutstanding: 18.7,
    shortRatio: 4.25,
    sharesShort: 65000000,
    sharesShortPriorMonth: 58000000,
  },
  AMC: {
    shortPercentFloat: 19.8,
    shortPercentOutstanding: 17.2,
    shortRatio: 3.85,
    sharesShort: 125000000,
    sharesShortPriorMonth: 118000000,
  },
  BBBY: {
    shortPercentFloat: 35.2,
    shortPercentOutstanding: 31.5,
    shortRatio: 5.65,
    sharesShort: 45000000,
    sharesShortPriorMonth: 40000000,
  },
  PLTR: {
    shortPercentFloat: 4.8,
    shortPercentOutstanding: 4.2,
    shortRatio: 2.35,
    sharesShort: 85000000,
    sharesShortPriorMonth: 80000000,
  },
}

// Generate random but realistic short interest data for any symbol
function generateShortInterestData(symbol: string) {
  // Generate random values within realistic ranges
  const shortPercentFloat = Math.random() * 5 + 0.5 // 0.5% to 5.5%
  const shortPercentOutstanding = shortPercentFloat * 0.9 // Slightly less than float percentage
  const shortRatio = Math.random() * 3 + 1 // 1 to 4 days to cover
  const sharesShort = Math.floor(Math.random() * 100000000) + 10000000 // 10M to 110M shares
  const sharesShortPriorMonth = sharesShort * (Math.random() * 0.2 + 0.9) // -10% to +10% from current

  return {
    shortPercentFloat,
    shortPercentOutstanding,
    shortRatio,
    sharesShort,
    sharesShortPriorMonth: Math.floor(sharesShortPriorMonth),
  }
}

export async function GET(request: NextRequest, { params }: { params: { symbol: string } }) {
  const symbol = params.symbol.toUpperCase()

  // Use mock data if available, otherwise generate random data
  const shortInterestData = mockShortInterestData[symbol] || generateShortInterestData(symbol)

  return NextResponse.json(shortInterestData)
}

