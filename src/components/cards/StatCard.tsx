import { Card } from "@/components/ui/card";
import { useCryptoData } from "@/hooks/use-crypto-data";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  type: 'price' | 'change' | 'volume' | 'marketCap';
  className?: string;
}

const formatNumber = (num: number, type: StatCardProps['type']) => {
  if (type === 'price') return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
  if (type === 'change') return `${num.toFixed(2)}%`;
  if (type === 'volume' || type === 'marketCap') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 2
    }).format(num);
  }
  return num.toString();
};

const getValueFromType = (data: any, type: StatCardProps['type']) => {
  if (!data?.bitcoin) return null;
  
  switch (type) {
    case 'price':
      return data.bitcoin.usd;
    case 'change':
      return data.bitcoin.usd_24h_change;
    case 'volume':
      return data.bitcoin.usd_24h_vol;
    case 'marketCap':
      return data.bitcoin.usd_market_cap;
    default:
      return null;
  }
};

export default function StatCard({ title, type, className }: StatCardProps) {
  const { data, isLoading, error } = useCryptoData();
  const value = getValueFromType(data, type);
  
  const isPositive = type === 'change' ? value > 0 : false;
  const isNegative = type === 'change' ? value < 0 : false;

  return (
    <Card className={cn(
      "p-6 backdrop-blur-sm bg-white/10 border-white/20",
      className
    )}>
      <h3 className="text-sm font-medium text-white/60">{title}</h3>
      <div className="mt-2 flex items-baseline">
        {isLoading ? (
          <div className="h-7 w-24 animate-pulse bg-white/10 rounded" />
        ) : error ? (
          <span className="text-red-400">Error loading data</span>
        ) : (
          <span className={cn(
            "text-2xl font-semibold",
            isPositive && "text-green-400",
            isNegative && "text-red-400",
            !isPositive && !isNegative && "text-white"
          )}>
            {value !== null ? formatNumber(value, type) : 'N/A'}
          </span>
        )}
      </div>
    </Card>
  );
}