import type { StockNewsData } from "@/lib/alpha-vantage"

interface StockNewsProps {
  news: StockNewsData
}

export function StockNews({ news }: StockNewsProps) {
  return (
    <div className="border border-zinc-200 bg-white">
      <div className="bg-zinc-100 p-4 border-b border-zinc-200">
        <h3 className="font-bold uppercase text-sm tracking-wider">Latest News</h3>
      </div>
      <div className="divide-y divide-zinc-100">
        {news.feed.slice(0, 5).map((item, index) => (
          
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 hover:bg-zinc-50 transition-colors"
            >
              <h3 className="font-bold mb-1 text-sm line-clamp-2">{item.title}</h3>
            <p className="text-xs text-zinc-500 mb-2 line-clamp-2">{item.summary}</p>
            <div className="text-xs text-zinc-400">
              {new Date(item.time_published).toLocaleDateString()} • {item.source}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}