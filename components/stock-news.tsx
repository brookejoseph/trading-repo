import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { StockNewsData } from "@/lib/alpha-vantage"

interface StockNewsProps {
  news: StockNewsData
}

export function StockNews({ news }: StockNewsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest News</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news.feed.slice(0, 5).map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 rounded-lg border hover:bg-accent transition-colors"
            >
              <h3 className="font-medium mb-1 line-clamp-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{item.summary}</p>
              <div className="text-xs text-muted-foreground">
                {new Date(item.time_published).toLocaleDateString()} • {item.source}
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

