import type { Metadata } from 'next'
import './globals.css'
import GoogleAnalytics from './GoogleAnalytics'

export const metadata: Metadata = {
  title: 'NASDAQ Market Data',
  description: 'Advanced market data, unusual options activity, and institutional-level analytics',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-serif">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
