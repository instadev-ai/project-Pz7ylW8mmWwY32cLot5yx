import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  isLoading?: boolean;
  error?: string | null;
}

const StatCard = ({ title, value, change, isLoading, error }: StatCardProps) => {
  if (isLoading) {
    return (
      <Card className="p-6 backdrop-blur-md bg-white/10">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 backdrop-blur-md bg-white/10">
        <p className="text-sm text-red-500">{error}</p>
      </Card>
    );
  }

  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      if (val >= 1000000000) {
        return `$${(val / 1000000000).toFixed(2)}B`;
      }
      if (val >= 1000000) {
        return `$${(val / 1000000).toFixed(2)}M`;
      }
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(val);
    }
    return val;
  };

  return (
    <Card className="p-6 backdrop-blur-md bg-white/10 transition-all hover:bg-white/20">
      <h3 className="text-sm font-medium text-gray-400 mb-2">{title}</h3>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-semibold text-white">
          {formatValue(value)}
        </p>
        {change !== undefined && (
          <span
            className={`text-sm font-medium ${
              change >= 0 ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {change >= 0 ? '+' : ''}{change.toFixed(2)}%
          </span>
        )}
      </div>
    </Card>
  );
};

export default StatCard;