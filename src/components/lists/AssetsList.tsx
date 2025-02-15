import { Card } from "@/components/ui/card";
import { useCryptoData } from "@/hooks/use-crypto-data";

const AssetsList = () => {
  const { data, isLoading, error } = useCryptoData();

  if (isLoading) {
    return (
      <Card className="p-6 backdrop-blur-md bg-white/10">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-20 bg-gray-200 rounded w-full"></div>
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

  return (
    <Card className="p-6 backdrop-blur-md bg-white/10">
      <h2 className="text-xl font-semibold mb-4 text-white">Assets</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8">
              <img
                src="https://assets.coingecko.com/coins/images/1/small/bitcoin.png"
                alt="Bitcoin"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-medium text-white">Bitcoin</h3>
              <p className="text-sm text-gray-400">BTC</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium text-white">
              ${data?.current_price.toLocaleString()}
            </p>
            <p
              className={`text-sm ${
                data?.price_change_percentage_24h && data.price_change_percentage_24h >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {data?.price_change_percentage_24h && data.price_change_percentage_24h >= 0 ? "+" : ""}
              {data?.price_change_percentage_24h?.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AssetsList;