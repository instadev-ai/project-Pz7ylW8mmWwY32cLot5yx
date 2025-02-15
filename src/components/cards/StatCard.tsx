interface StatCardProps {
  title: string
  value: string
  change?: string
  isPositive?: boolean
}

const StatCard = ({ title, value, change, isPositive }: StatCardProps) => {
  return (
    <div className="p-6 rounded-xl bg-glass-white backdrop-blur-sm border border-white/20">
      <h3 className="text-sm font-medium text-neutral-600 mb-2">{title}</h3>
      <div className="flex items-end gap-2">
        <p className="text-2xl font-semibold text-primary">{value}</p>
        {change && (
          <span className={`text-sm ${isPositive ? 'text-success' : 'text-error'}`}>
            {isPositive ? '+' : ''}{change}
          </span>
        )}
      </div>
    </div>
  )
}

export default StatCard