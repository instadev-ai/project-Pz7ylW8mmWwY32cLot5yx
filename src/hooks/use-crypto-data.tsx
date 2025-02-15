import { useState, useEffect } from 'react';

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
  market_cap: number;
}

export function useCryptoData() {
  const [data, setData] = useState<CryptoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trackedIds, setTrackedIds] = useState<string[]>(['bitcoin', 'ethereum']);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const idsString = trackedIds.join(',');
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${idsString}&order=market_cap_desc&per_page=50&page=1&sparkline=false`
      );
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const jsonData = await response.json();
      if (jsonData && jsonData.length > 0) {
        setData(jsonData);
        setError(null);
      }
    } catch (err) {
      setError('Failed to fetch data');
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [trackedIds]);

  const addCrypto = async (cryptoId: string) => {
    if (!trackedIds.includes(cryptoId)) {
      setTrackedIds(prev => [...prev, cryptoId]);
    }
  };

  return { data, isLoading, error, addCrypto };
}