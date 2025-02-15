import AssetsList from "../lists/AssetsList"
import PriceChart from "../charts/PriceChart"
import StatCard from "../cards/StatCard"
import Header from "./Header"

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <Header />
      <main className="container mx-auto p-4 space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard type="price" />
          <StatCard type="volume" />
          <StatCard type="marketCap" />
        </div>
        <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
          <PriceChart />
          <AssetsList />
        </div>
      </main>
    </div>
  )
}