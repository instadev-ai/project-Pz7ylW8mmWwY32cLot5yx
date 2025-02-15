import { Card } from "@/components/ui/card";
import { useCryptoData } from "@/hooks/use-crypto-data";
import { formatCurrency, formatPercentage } from "@/lib/utils";

interface StatCardProps {
  title: string;
  type: 'price' | 'change' | 'volume' | 'marketCap';
}

export default function StatCard({ title, type }: StatCardProps) {
  const { data, isLoading, error } = useCryptoData();

  const getValue = () => {
    if (!data?.bitcoin) return '0';

    switch (type) {
      case 'price':
        return formatCurrency(data.bitcoin.usd);
      case 'change':
        return formatPercentage(data.bitcoin.usd_24h_change);
      case 'volume':
        return formatCurrency(data.bitcoin.usd_24h_vol);
      case 'marketCap':
        return formatCurrency(data.bitcoin.usd_market_cap);
      default:
        return '0';
    }
  };

  const getChangeColor = () => {
    if (type !== 'change') return 'text-[#8989DE]';
    const change = data?.bitcoin?.usd_24h_change ?? 0;
    return change >= 0 ? 'text-[#7EBF8E]' : 'text-[#D2886F]';
  };

  if (error) {
    return (
      <Card className="p-6 backdrop-blur-md bg-white/10 border-[#ffffff14]">
        <p className="text-red-500">Error loading data</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 backdrop-blur-md bg-white/10 border-[#ffffff14] transition-all duration-300 hover:bg-white/20">
      <h3 className="text-[#C4C3BB] text-sm mb-2">{title}</h3>
      <div className={`text-2xl font-medium ${getChangeColor()} ${isLoading ? 'opacity-50' : ''}`}>
        {isLoading ? 'Loading...' : getValue()}
      </div>
    </Card>
  );
}