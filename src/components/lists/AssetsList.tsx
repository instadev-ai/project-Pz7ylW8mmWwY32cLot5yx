import { Card } from "@/components/ui/card";
import { useCryptoData } from "@/hooks/use-crypto-data";

export default function AssetsList() {
  const { data, isLoading, error } = useCryptoData();

  return (
    <Card className="p-6 backdrop-blur-sm bg-white/10 border-white/20 h-full">
      <h2 className="text-lg font-semibold text-white/90 mb-4">Assets</h2>
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-white/10 rounded animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="text-red-400">Error loading assets</div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F7931A] flex items-center justify-center">
                ₿
              </div>
              <div>
                <h3 className="text-white font-medium">Bitcoin</h3>
                <p className="text-sm text-white/60">BTC</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-medium">
                ${data?.bitcoin?.usd.toLocaleString()}
              </p>
              <p className={`text-sm ${
                (data?.bitcoin?.usd_24h_change || 0) >= 0 
                  ? 'text-green-400' 
                  : 'text-red-400'
              }`}>
                {data?.bitcoin?.usd_24h_change?.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}