import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PriceChart = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [symbol, setSymbol] = useState('BTCUSDT');

  useEffect(() => {
    if (containerRef.current) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
      script.type = 'text/javascript';
      script.async = true;

      const config = {
        "autosize": true,
        "symbol": symbol,
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "backgroundColor": "rgba(0, 0, 0, 0)",
        "gridColor": "rgba(255, 255, 255, 0.06)",
        "hide_top_toolbar": false,
        "hide_legend": true,
        "save_image": false,
        "hide_volume": false,
        "support_host": "https://www.tradingview.com"
      };

      script.innerHTML = JSON.stringify(config);

      // Clear previous chart
      if (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }

      const widget = document.createElement('div');
      widget.className = 'tradingview-widget-container';
      containerRef.current.appendChild(widget);
      widget.appendChild(script);

      return () => {
        if (containerRef.current?.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
      };
    }
  }, [symbol]);

  return (
    <Card className="p-6 backdrop-blur-md bg-white/10">
      <div className="mb-4">
        <Select
          value={symbol}
          onValueChange={(value) => setSymbol(value)}
        >
          <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="Select a crypto" />
          </SelectTrigger>
          <SelectContent className="bg-[#141413] border-white/10">
            <SelectItem value="BTCUSDT" className="text-white hover:bg-white/5">Bitcoin (BTC)</SelectItem>
            <SelectItem value="ETHUSDT" className="text-white hover:bg-white/5">Ethereum (ETH)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div ref={containerRef} style={{ height: '500px' }} />
    </Card>
  );
};

export default PriceChart;