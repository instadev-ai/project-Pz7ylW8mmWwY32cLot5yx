import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import DashboardLayout from './components/layout/DashboardLayout'
import StatCard from './components/cards/StatCard'
import PriceChart from './components/charts/PriceChart'
import AssetsList from './components/lists/AssetsList'

const queryClient = new QueryClient()

// Mock data
const mockAssets = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: '$43,567.89',
    change: '2.34%',
    isPositive: true
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: '$2,345.67',
    change: '1.23%',
    isPositive: true
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    price: '$101.23',
    change: '0.45%',
    isPositive: false
  }
]

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardLayout>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Portfolio Value"
            value="$124,567.89"
            change="2.34%"
            isPositive={true}
          />
          <StatCard
            title="24h Change"
            value="+$2,345.67"
            change="1.23%"
            isPositive={true}
          />
          <StatCard
            title="Total Assets"
            value="12"
          />
        </div>

        <PriceChart
          title="Bitcoin (BTC)"
          subtitle="Live price chart"
          symbol="BTCUSDT"
        />

        <AssetsList assets={mockAssets} />
      </DashboardLayout>
    </QueryClientProvider>
  )
}

export default App