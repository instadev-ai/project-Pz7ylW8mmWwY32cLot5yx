import StatCard from "../cards/StatCard";
import { useCryptoData } from "@/hooks/use-crypto-data";
import AssetsList from "../lists/AssetsList";
import PriceChart from "../charts/PriceChart";

const DashboardLayout = () => {
  const { data, isLoading, error } = useCryptoData();

  return (
    <div className="min-h-screen bg-[#141413] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Bitcoin Price"
            value={data?.current_price || 0}
            change={data?.price_change_percentage_24h}
            isLoading={isLoading}
            error={error}
          />
          <StatCard
            title="24h Volume"
            value={data?.total_volume || 0}
            isLoading={isLoading}
            error={error}
          />
          <StatCard
            title="Market Cap"
            value={data?.market_cap || 0}
            isLoading={isLoading}
            error={error}
          />
          <StatCard
            title="24h Change"
            value={`${data?.price_change_percentage_24h?.toFixed(2)}%` || "0%"}
            change={data?.price_change_percentage_24h}
            isLoading={isLoading}
            error={error}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PriceChart />
          </div>
          <div className="lg:col-span-1">
            <AssetsList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;