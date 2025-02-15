import { ReactNode } from 'react'

interface DashboardLayoutProps {
  children: ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-neutral-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <nav className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-primary">Crypto Dashboard</h1>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 rounded-lg bg-glass-white backdrop-blur-sm text-primary hover:bg-white/90 transition-colors">
                Connect Wallet
              </button>
            </div>
          </nav>
        </header>
        <main className="space-y-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout