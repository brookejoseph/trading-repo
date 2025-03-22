// Types for Alpha Vantage API responses
export interface StockOverviewData {
  Symbol: string
  AssetType: string
  Name: string
  Description: string
  Exchange: string
  Currency: string
  Country: string
  Sector: string
  Industry: string
  Address: string
  FiscalYearEnd: string
  LatestQuarter: string
  MarketCapitalization: string
  EBITDA: string
  PERatio: string
  PEGRatio: string
  BookValue: string
  DividendPerShare: string
  DividendYield: string
  EPS: string
  RevenuePerShareTTM: string
  ProfitMargin: string
  OperatingMarginTTM: string
  ReturnOnAssetsTTM: string
  ReturnOnEquityTTM: string
  RevenueTTM: string
  GrossProfitTTM: string
  DilutedEPSTTM: string
  QuarterlyEarningsGrowthYOY: string
  QuarterlyRevenueGrowthYOY: string
  AnalystTargetPrice: string
  TrailingPE: string
  ForwardPE: string
  PriceToSalesRatioTTM: string
  PriceToBookRatio: string
  EVToRevenue: string
  EVToEBITDA: string
  Beta: string
  "52WeekHigh": string
  "52WeekLow": string
  "50DayMovingAverage": string
  "200DayMovingAverage": string
  SharesOutstanding: string
  SharesFloat: string
  SharesShort: string
  SharesShortPriorMonth: string
  ShortRatio: string
  ShortPercentOutstanding: string
  ShortPercentFloat: string
  PercentInsiders: string
  PercentInstitutions: string
  ForwardAnnualDividendRate: string
  ForwardAnnualDividendYield: string
  PayoutRatio: string
}

export interface StockTimeSeriesData {
  "Meta Data": {
    "1. Information": string
    "2. Symbol": string
    "3. Last Refreshed": string
    "4. Output Size": string
    "5. Time Zone": string
  }
  "Time Series (Daily)": {
    [date: string]: {
      "1. open": string
      "2. high": string
      "3. low": string
      "4. close": string
      "5. volume": string
    }
  }
}

export interface StockNewsData {
  items: string
  sentiment_score_definition: string
  relevance_score_definition: string
  feed: Array<{
    title: string
    url: string
    time_published: string
    authors: string[]
    summary: string
    banner_image: string
    source: string
    category_within_source: string
    source_domain: string
    topics: Array<{
      topic: string
      relevance_score: string
    }>
    overall_sentiment_score: string
    overall_sentiment_label: string
    ticker_sentiment: Array<{
      ticker: string
      relevance_score: string
      ticker_sentiment_score: string
      ticker_sentiment_label: string
    }>
  }>
}

export interface OptionData {
  strike: number
  contractName: string
  lastPrice: number
  change: number
  percentChange: number
  volume: number
  openInterest: number
  impliedVolatility: number
  inTheMoney: boolean
  contractType: "call" | "put"
  expirationDate: string
  daysToExpiration: number
  isUnusual: boolean
  unusualReason?: string
}

export interface OptionsChainData {
  symbol: string
  lastUpdated: string
  calls: OptionData[]
  puts: OptionData[]
  unusualActivity: OptionData[]
}

export interface TradingRecommendation {
  recommendation: "Strong Buy" | "Buy" | "Hold" | "Sell" | "Strong Sell"
  entryPrice: number
  stopLoss: number
  takeProfit1: number
  takeProfit2: number
  riskRewardRatio: number
  confidenceScore: number
  timeFrame: "Short-term" | "Medium-term" | "Long-term"
  strategy: string
  technicalReason: string
  fundamentalReason: string
}

// API functions
export async function getStockOverview(symbol: string): Promise<StockOverviewData> {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY
  const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`

  const response = await fetch(url, { next: { revalidate: 86400 } }) // Cache for 24 hours

  if (!response.ok) {
    throw new Error(`Failed to fetch stock overview: ${response.statusText}`)
  }

  const data = await response.json()

  if (!data.Symbol) {
    throw new Error("Stock not found or API limit reached")
  }

  return data
}

export async function getStockDailyTimeSeries(symbol: string): Promise<StockTimeSeriesData> {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${apiKey}`

  const response = await fetch(url, { next: { revalidate: 3600 } }) // Cache for 1 hour

  if (!response.ok) {
    throw new Error(`Failed to fetch stock time series: ${response.statusText}`)
  }

  const data = await response.json()

  if (!data["Time Series (Daily)"]) {
    throw new Error("Stock time series not found or API limit reached")
  }

  return data
}

export async function getStockNews(symbol: string): Promise<StockNewsData> {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY
  const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${symbol}&apikey=${apiKey}`

  const response = await fetch(url, { next: { revalidate: 3600 } }) // Cache for 1 hour

  if (!response.ok) {
    throw new Error(`Failed to fetch stock news: ${response.statusText}`)
  }

  const data = await response.json()

  if (!data.feed) {
    throw new Error("Stock news not found or API limit reached")
  }

  return data
}

export async function getOptionsData(symbol: string): Promise<OptionsChainData> {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY
  const url = `https://www.alphavantage.co/query?function=OPTION_CHAIN&symbol=${symbol}&apikey=${apiKey}`

  const response = await fetch(url, { next: { revalidate: 1800 } }) // Cache for 30 minutes

  if (!response.ok) {
    throw new Error(`Failed to fetch options data: ${response.statusText}`)
  }

  const data = await response.json()

  if (!data.options || !data.options.length) {
    throw new Error("Options data not found or API limit reached")
  }

  // Process the options data
  const calls: OptionData[] = []
  const puts: OptionData[] = []
  const unusualActivity: OptionData[] = []

  // Get current date for calculating days to expiration
  const currentDate = new Date()

  data.options.forEach((expirationData: any) => {
    const expirationDate = expirationData.expirationDate
    const expDate = new Date(expirationDate)
    const daysToExpiration = Math.round((expDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))

    // Process calls
    expirationData.calls.forEach((call: any) => {
      const callOption: OptionData = {
        strike: Number.parseFloat(call.strikePrice),
        contractName: `${symbol} ${expirationDate} C${call.strikePrice}`,
        lastPrice: Number.parseFloat(call.lastPrice),
        change: Number.parseFloat(call.change),
        percentChange: Number.parseFloat(call.percentChange),
        volume: Number.parseInt(call.volume),
        openInterest: Number.parseInt(call.openInterest),
        impliedVolatility: Number.parseFloat(call.impliedVolatility),
        inTheMoney: call.inTheMoney === "true",
        contractType: "call",
        expirationDate,
        daysToExpiration,
        isUnusual: false,
      }

      // Check for unusual activity
      // High volume relative to open interest is often a sign of unusual activity
      if (callOption.volume > 0 && callOption.openInterest > 0) {
        const volumeToOIRatio = callOption.volume / callOption.openInterest

        if (volumeToOIRatio > 1.0) {
          callOption.isUnusual = true
          callOption.unusualReason = `Volume/OI ratio: ${volumeToOIRatio.toFixed(2)}`
          unusualActivity.push(callOption)
        }
      }

      calls.push(callOption)
    })

    // Process puts
    expirationData.puts.forEach((put: any) => {
      const putOption: OptionData = {
        strike: Number.parseFloat(put.strikePrice),
        contractName: `${symbol} ${expirationDate} P${put.strikePrice}`,
        lastPrice: Number.parseFloat(put.lastPrice),
        change: Number.parseFloat(put.change),
        percentChange: Number.parseFloat(put.percentChange),
        volume: Number.parseInt(put.volume),
        openInterest: Number.parseInt(put.openInterest),
        impliedVolatility: Number.parseFloat(put.impliedVolatility),
        inTheMoney: put.inTheMoney === "true",
        contractType: "put",
        expirationDate,
        daysToExpiration,
        isUnusual: false,
      }

      // Check for unusual activity
      if (putOption.volume > 0 && putOption.openInterest > 0) {
        const volumeToOIRatio = putOption.volume / putOption.openInterest

        if (volumeToOIRatio > 1.0) {
          putOption.isUnusual = true
          putOption.unusualReason = `Volume/OI ratio: ${volumeToOIRatio.toFixed(2)}`
          unusualActivity.push(putOption)
        }
      }

      puts.push(putOption)
    })
  })

  return {
    symbol,
    lastUpdated: data.lastUpdated || new Date().toISOString(),
    calls,
    puts,
    unusualActivity: unusualActivity.sort((a, b) => b.volume / b.openInterest - a.volume / a.openInterest),
  }
}

export async function getTradingRecommendations(
  symbol: string,
  overview: StockOverviewData,
  timeSeries: StockTimeSeriesData,
): Promise<TradingRecommendation> {
  // Extract price data from time series
  const timeSeriesData = Object.entries(timeSeries["Time Series (Daily)"])
    .map(([date, values]) => ({
      date,
      close: Number.parseFloat(values["4. close"]),
      high: Number.parseFloat(values["2. high"]),
      low: Number.parseFloat(values["3. low"]),
      volume: Number.parseFloat(values["5. volume"]),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // Get the latest price
  const latestPrice = timeSeriesData[timeSeriesData.length - 1].close

  // Calculate 50-day and 200-day moving averages
  const ma50 = Number.parseFloat(overview["50DayMovingAverage"])
  const ma200 = Number.parseFloat(overview["200DayMovingAverage"])

  // Calculate RSI (14-day)
  const rsi = calculateRSI(timeSeriesData.slice(-15).map((d) => d.close))

  // Calculate ATR (14-day) for stop loss and take profit
  const atr = calculateATR(timeSeriesData.slice(-15))

  // Determine recommendation based on technical indicators
  let recommendation: "Strong Buy" | "Buy" | "Hold" | "Sell" | "Strong Sell"
  let strategy = ""
  let technicalReason = ""
  let fundamentalReason = ""
  let timeFrame: "Short-term" | "Medium-term" | "Long-term" = "Medium-term"
  let confidenceScore = 0

  // Golden Cross / Death Cross
  if (ma50 > ma200) {
    confidenceScore += 20
    technicalReason += "Golden Cross (50 MA above 200 MA). "
    timeFrame = "Medium-term"
  } else {
    confidenceScore -= 20
    technicalReason += "Death Cross (50 MA below 200 MA). "
  }

  // RSI
  if (rsi < 30) {
    confidenceScore += 15
    technicalReason += "Oversold (RSI below 30). "
    timeFrame = "Short-term"
  } else if (rsi > 70) {
    confidenceScore -= 15
    technicalReason += "Overbought (RSI above 70). "
  }

  // P/E Ratio analysis
  const pe = Number.parseFloat(overview.PERatio)
  if (!isNaN(pe)) {
    if (pe < 15) {
      confidenceScore += 10
      fundamentalReason += "P/E ratio below industry average. "
      timeFrame = "Long-term"
    } else if (pe > 30) {
      confidenceScore -= 10
      fundamentalReason += "P/E ratio above industry average. "
    }
  }

  // Short interest analysis
  const shortPercentFloat = Number.parseFloat(overview.ShortPercentFloat)
  if (!isNaN(shortPercentFloat)) {
    if (shortPercentFloat > 20) {
      confidenceScore += 15
      fundamentalReason += "High short interest (potential for short squeeze). "
      timeFrame = "Short-term"
      strategy = "Short Squeeze Potential"
    } else if (shortPercentFloat < 5) {
      confidenceScore += 5
      fundamentalReason += "Low short interest. "
    }
  }

  // Determine final recommendation
  if (confidenceScore >= 30) {
    recommendation = "Strong Buy"
  } else if (confidenceScore >= 10) {
    recommendation = "Buy"
  } else if (confidenceScore >= -10) {
    recommendation = "Hold"
  } else if (confidenceScore >= -30) {
    recommendation = "Sell"
  } else {
    recommendation = "Strong Sell"
  }

  // If no strategy was determined yet, set a default based on recommendation
  if (!strategy) {
    if (recommendation === "Strong Buy" || recommendation === "Buy") {
      if (timeFrame === "Short-term") {
        strategy = "Momentum Trade"
      } else if (timeFrame === "Medium-term") {
        strategy = "Swing Trade"
      } else {
        strategy = "Value Investment"
      }
    } else if (recommendation === "Sell" || recommendation === "Strong Sell") {
      strategy = "Avoid or Consider Short Position"
    } else {
      strategy = "Wait for Better Entry"
    }
  }

  // Calculate entry, stop loss and take profit levels
  const entryPrice = latestPrice
  const stopLoss = recommendation.includes("Buy")
    ? Math.round((latestPrice - atr * 2) * 100) / 100
    : Math.round((latestPrice + atr * 2) * 100) / 100

  const takeProfit1 = recommendation.includes("Buy")
    ? Math.round((latestPrice + atr * 3) * 100) / 100
    : Math.round((latestPrice - atr * 3) * 100) / 100

  const takeProfit2 = recommendation.includes("Buy")
    ? Math.round((latestPrice + atr * 5) * 100) / 100
    : Math.round((latestPrice - atr * 5) * 100) / 100

  // Calculate risk/reward ratio
  const risk = Math.abs(entryPrice - stopLoss)
  const reward = Math.abs(takeProfit1 - entryPrice)
  const riskRewardRatio = Math.round((reward / risk) * 10) / 10

  return {
    recommendation,
    entryPrice,
    stopLoss,
    takeProfit1,
    takeProfit2,
    riskRewardRatio,
    confidenceScore,
    timeFrame,
    strategy,
    technicalReason,
    fundamentalReason,
  }
}

// Helper function to calculate RSI
function calculateRSI(prices: number[]): number {
  if (prices.length < 14) return 50 // Default if not enough data

  let gains = 0
  let losses = 0

  for (let i = 1; i < prices.length; i++) {
    const difference = prices[i] - prices[i - 1]
    if (difference >= 0) {
      gains += difference
    } else {
      losses -= difference
    }
  }

  if (losses === 0) return 100

  const relativeStrength = gains / losses
  return 100 - 100 / (1 + relativeStrength)
}

// Helper function to calculate ATR
function calculateATR(data: { high: number; low: number; close: number }[]): number {
  if (data.length < 14) return 1 // Default if not enough data

  let atr = 0

  for (let i = 1; i < data.length; i++) {
    const tr1 = data[i].high - data[i].low
    const tr2 = Math.abs(data[i].high - data[i - 1].close)
    const tr3 = Math.abs(data[i].low - data[i - 1].close)
    const tr = Math.max(tr1, tr2, tr3)

    // Simple moving average of TR
    atr = (atr * (i - 1) + tr) / i
  }

  return atr
}


// Add this to your existing lib/alpha-vantage.ts file 

// Interface for unusual options data
export interface UnusualOptionData {
  symbol: string;
  contractName: string;
  strike: number;
  lastPrice: number;
  change: number;
  percentChange: number;
  volume: number;
  openInterest: number;
  volumeToOIRatio: number;
  contractType: "call" | "put";
  expirationDate: string;
}

// Get unusual options data from Alpha Vantage API
export async function getUnusualOptionsData(): Promise<UnusualOptionData[]> {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
  
  try {
    // This would ideally fetch from an options-specific endpoint at Alpha Vantage
    // However, Alpha Vantage's free tier doesn't provide real-time options data
    // So we'll need to use a different approach for production

    // For a real implementation, you would:
    // 1. Fetch options data for multiple symbols
    // 2. Calculate the volume to open interest ratio
    // 3. Filter for unusual activity (typically vol/OI > 1.0)
    // 4. Sort by most unusual first

    // Example API call if Alpha Vantage offered options endpoint:
    // const url = `https://www.alphavantage.co/query?function=OPTIONS_CHAIN&symbols=AAPL,MSFT,TSLA,NVDA,AMZN&apikey=${apiKey}`;
    // const response = await fetch(url, { next: { revalidate: 1800 } }); // Cache for 30 minutes
    
    // Placeholder for mock data
    // In a production environment, you could use a dedicated options data API
    const unusualOptionsData: UnusualOptionData[] = [
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
      // Add new data for more symbols
      {
        symbol: "META",
        contractName: "META 2023-12-15 C350",
        strike: 350,
        lastPrice: 6.40,
        change: 1.85,
        percentChange: 40.66,
        volume: 7800,
        openInterest: 1950,
        volumeToOIRatio: 4.0,
        contractType: "call",
        expirationDate: "2023-12-15",
      },
      {
        symbol: "AMD",
        contractName: "AMD 2023-12-22 C125",
        strike: 125,
        lastPrice: 3.15,
        change: 0.95,
        percentChange: 43.18,
        volume: 6500,
        openInterest: 1600,
        volumeToOIRatio: 4.06,
        contractType: "call",
        expirationDate: "2023-12-22",
      },
      {
        symbol: "GME",
        contractName: "GME 2023-12-15 P15",
        strike: 15,
        lastPrice: 0.85,
        change: 0.30,
        percentChange: 54.55,
        volume: 4200,
        openInterest: 750,
        volumeToOIRatio: 5.60,
        contractType: "put",
        expirationDate: "2023-12-15",
      }
    ];

    // Sort by volume to open interest ratio (most unusual first)
    return unusualOptionsData.sort((a, b) => b.volumeToOIRatio - a.volumeToOIRatio);
    
  } catch (error) {
    console.error('Error fetching unusual options data:', error);
    throw new Error('Failed to fetch unusual options data');
  }
}