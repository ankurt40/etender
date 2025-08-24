'use client'

import { TrendingUp, FileText, Users, DollarSign } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface PlatformStats {
  totalTenders: number
  activeTenders: number
  registeredContractors: number
  totalValueAwarded: number
}

interface StatsSectionProps {
  stats: PlatformStats
}

export function StatsSection({ stats }: StatsSectionProps) {
  const statItems = [
    {
      title: 'Total Tenders',
      value: stats.totalTenders.toLocaleString(),
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Published on platform'
    },
    {
      title: 'Active Tenders',
      value: stats.activeTenders.toLocaleString(),
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Currently accepting bids'
    },
    {
      title: 'Registered Contractors',
      value: stats.registeredContractors.toLocaleString(),
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'Verified contractors'
    },
    {
      title: 'Total Value Awarded',
      value: formatCurrency(stats.totalValueAwarded),
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      description: 'Contract value to date'
    }
  ]

  return (
    <section className="py-12 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Platform Statistics</h2>
          <p className="text-gray-600">Real-time data from TenderGenix platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <div className={`${stat.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-700 mb-1">{stat.title}</div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </div>
            )
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Data updated in real-time • Last updated: {new Date().toLocaleDateString('en-IN')}
          </p>
        </div>
      </div>
    </section>
  )
}
