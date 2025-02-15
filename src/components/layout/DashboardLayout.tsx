import PriceChart from "@/components/charts/PriceChart";
import StatCard from "@/components/cards/StatCard";
import AssetsList from "@/components/lists/AssetsList";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#141413] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Bitcoin Price"
            type="price"
          />
          <StatCard
            title="24h Change"
            type="change"
          />
          <StatCard
            title="24h Volume"
            type="volume"
          />
          <StatCard
            title="Market Cap"
            type="marketCap"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <PriceChart />
          </div>
          <div className="lg:col-span-1">
            <AssetsList />
          </div>
        </div>
      </div>
    </div>
  );
}