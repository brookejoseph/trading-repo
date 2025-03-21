"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { OptionsChainData, OptionData } from "@/lib/alpha-vantage"
import { formatCurrency } from "@/lib/utils"

interface StockOptionsActivityProps {
  optionsData: OptionsChainData
}

export function StockOptionsActivity({ optionsData }: StockOptionsActivityProps) {
  const [activeTab, setActiveTab] = useState<"unusual" | "calls" | "puts">("unusual")

  // Function to render option rows
  const renderOptionRows = (options: OptionData[]) => {
    if (options.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={7} className="text-center py-4">
            No options data available
          </TableCell>
        </TableRow>
      )
    }

    return options.map((option, index) => (
      <TableRow key={index} className={option.isUnusual ? "bg-yellow-50 dark:bg-yellow-900/20" : ""}>
        <TableCell className="font-medium">
          {option.strike}
          {option.isUnusual && (
            <Badge
              variant="outline"
              className="ml-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
            >
              Unusual
            </Badge>
          )}
        </TableCell>
        <TableCell>{option.expirationDate}</TableCell>
        <TableCell>{option.contractType.toUpperCase()}</TableCell>
        <TableCell>{formatCurrency(option.lastPrice)}</TableCell>
        <TableCell className={option.change >= 0 ? "text-green-600" : "text-red-600"}>
          {option.change >= 0 ? "+" : ""}
          {option.change.toFixed(2)} ({option.percentChange.toFixed(2)}%)
        </TableCell>
        <TableCell>{option.volume.toLocaleString()}</TableCell>
        <TableCell>{option.openInterest.toLocaleString()}</TableCell>
        {option.isUnusual && option.unusualReason && (
          <TableCell className="text-sm text-muted-foreground">{option.unusualReason}</TableCell>
        )}
      </TableRow>
    ))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Options Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="unusual" onValueChange={(value) => setActiveTab(value as "unusual" | "calls" | "puts")}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="unusual">
              Unusual Activity
              {optionsData.unusualActivity.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {optionsData.unusualActivity.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="calls">Calls</TabsTrigger>
            <TabsTrigger value="puts">Puts</TabsTrigger>
          </TabsList>

          <TabsContent value="unusual">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Strike</TableHead>
                    <TableHead>Expiration</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Last</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Volume</TableHead>
                    <TableHead>Open Interest</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>{renderOptionRows(optionsData.unusualActivity)}</TableBody>
              </Table>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Unusual options activity may indicate informed trading. High volume relative to open interest often
              suggests new positions being established.
            </p>
          </TabsContent>

          <TabsContent value="calls">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Strike</TableHead>
                    <TableHead>Expiration</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Last</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Volume</TableHead>
                    <TableHead>Open Interest</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>{renderOptionRows(optionsData.calls.slice(0, 10))}</TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="puts">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Strike</TableHead>
                    <TableHead>Expiration</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Last</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Volume</TableHead>
                    <TableHead>Open Interest</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>{renderOptionRows(optionsData.puts.slice(0, 10))}</TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

