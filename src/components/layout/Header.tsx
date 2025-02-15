import { useQuery } from "@tanstack/react-query";

export default function Header() {
  const { data, isLoading } = useQuery({ queryKey: ["crypto"] });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block">Crypto Dashboard</span>
          </a>
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
        </div>
      </div>
    </header>
  );
}