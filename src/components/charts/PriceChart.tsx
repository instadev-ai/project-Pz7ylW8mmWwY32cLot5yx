interface PriceChartProps {
  title: string
  subtitle?: string
}

const PriceChart = ({ title, subtitle }: PriceChartProps) => {
  return (
    <div className="p-6 rounded-xl bg-glass-white backdrop-blur-sm border border-white/20">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-primary">{title}</h2>
          {subtitle && (
            <p className="text-sm text-neutral-600">{subtitle}</p>
          )}
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm rounded-lg bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors">
            1D
          </button>
          <button className="px-3 py-1 text-sm rounded-lg bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors">
            1W
          </button>
          <button className="px-3 py-1 text-sm rounded-lg bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors">
            1M
          </button>
          <button className="px-3 py-1 text-sm rounded-lg bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors">
            1Y
          </button>
        </div>
      </div>
      <div className="h-[300px] flex items-center justify-center text-neutral-500">
        Chart placeholder
      </div>
    </div>
  )
}

export default PriceChart