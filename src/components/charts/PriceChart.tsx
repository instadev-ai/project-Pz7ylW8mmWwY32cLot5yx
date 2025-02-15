import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

export default function PriceChart() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "BINANCE:BTCUSDT",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "backgroundColor": "rgba(0, 0, 0, 0)",
        "gridColor": "rgba(255, 255, 255, 0.06)",
        "hide_top_toolbar": true,
        "hide_legend": true,
        "save_image": false,
        "hide_volume": true,
        "support_host": "https://www.tradingview.com"
      }`;

    if (container.current) {
      const widgetContainer = document.createElement('div');
      widgetContainer.className = 'tradingview-widget-container';
      container.current.appendChild(widgetContainer);
      widgetContainer.appendChild(script);
    }

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <Card className="p-6 backdrop-blur-sm bg-white/10 border-white/20">
      <div ref={container} className="w-full h-[500px]" />
    </Card>
  );
}