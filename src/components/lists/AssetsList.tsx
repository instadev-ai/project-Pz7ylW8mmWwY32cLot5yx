interface Asset {
  name: string
  symbol: string
  price: string
  change: string
  isPositive: boolean
}

interface AssetsListProps {
  assets: Asset[]
}

const AssetsList = ({ assets }: AssetsListProps) => {
  return (
    <div className="p-6 rounded-xl bg-glass-white backdrop-blur-sm border border-white/20">
      <h2 className="text-lg font-semibold text-primary mb-6">Your Assets</h2>
      <div className="space-y-4">
        {assets.map((asset, index) => (
          <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-neutral-100 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-sm font-medium">
                {asset.symbol}
              </div>
              <div>
                <h3 className="font-medium text-primary">{asset.name}</h3>
                <p className="text-sm text-neutral-600">{asset.symbol}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-primary">{asset.price}</p>
              <p className={`text-sm ${asset.isPositive ? 'text-success' : 'text-error'}`}>
                {asset.isPositive ? '+' : ''}{asset.change}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AssetsList