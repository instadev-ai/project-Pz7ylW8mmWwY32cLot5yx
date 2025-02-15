import { Button } from "@/components/ui/button"
import { useCryptoData } from "@/hooks/use-crypto-data"

export default function Header() {
  const { data, isLoading } = useCryptoData()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/50 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold">Crypto Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-6">
          {!isLoading && data && (
            <>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">BTC</span>
                <span className="font-medium">
                  ${data.bitcoin.usd.toLocaleString()}
                </span>
                <span className={`text-sm ${data.bitcoin.usd_24h_change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {data.bitcoin.usd_24h_change.toFixed(2)}%
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">ETH</span>
                <span className="font-medium">
                  ${data.ethereum.usd.toLocaleString()}
                </span>
                <span className={`text-sm ${data.ethereum.usd_24h_change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {data.ethereum.usd_24h_change.toFixed(2)}%
                </span>
              </div>
            </>
          )}
          <Button variant="outline" className="ml-4">Connect Wallet</Button>
        </div>
      </div>
    </header>
  )
}