import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    TradingView: any;
  }
}

interface PriceChartProps {
  title: string
  subtitle?: string
  symbol?: string
}

const PriceChart = ({ title, subtitle, symbol = 'BTCUSD' }: PriceChartProps) => {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load TradingView widget script
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/tv.js'
    script.async = true
    script.onload = () => {
      if (container.current && window.TradingView) {
        new window.TradingView.widget({
          container_id: container.current.id,
          symbol: `BINANCE:${symbol}`,
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'light',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          hide_top_toolbar: true,
          hide_legend: false,
          save_image: false,
          backgroundColor: 'rgba(255, 255, 255, 0.0)',
          gridColor: 'rgba(163, 162, 153, 0.1)',
          width: '100%',
          height: 400
        })
      }
    }
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
  }, [symbol])

  return (
    <div className="p-6 rounded-xl bg-glass-white backdrop-blur-sm border border-white/20">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-primary">{title}</h2>
          {subtitle && (
            <p className="text-sm text-neutral-600">{subtitle}</p>
          )}
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm rounded-lg bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors">
            BTC
          </button>
          <button className="px-3 py-1 text-sm rounded-lg bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors">
            ETH
          </button>
          <button className="px-3 py-1 text-sm rounded-lg bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors">
            SOL
          </button>
        </div>
      </div>
      <div 
        id="tradingview_widget" 
        ref={container} 
        className="w-full h-[400px] bg-transparent"
      />
    </div>
  )
}

export default PriceChart