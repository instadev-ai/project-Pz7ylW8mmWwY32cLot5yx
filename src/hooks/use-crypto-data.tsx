import { useState, useEffect } from 'react';

interface CryptoData {
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
  market_cap: number;
}

export function useCryptoData() {
  const [data, setData] = useState<CryptoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&order=market_cap_desc&per_page=1&page=1&sparkline=false'
        );
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const jsonData = await response.json();
        if (jsonData && jsonData.length > 0) {
          setData({
            current_price: jsonData[0].current_price,
            price_change_percentage_24h: jsonData[0].price_change_percentage_24h,
            total_volume: jsonData[0].total_volume,
            market_cap: jsonData[0].market_cap,
          });
          setError(null);
        }
      } catch (err) {
        setError('Failed to fetch data');
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return { data, isLoading, error };
}