'use client'

import { TrendingUp, FileText, Award, Clock, DollarSign, Target } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface DashboardStatsProps {
  stats: {
    totalTenders: number
    activeTenders: number
    myProposals: number
    wonContracts: number
    pendingDeliverables: number
    totalEarnings: number
  }
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      title: 'Total Tenders',
      value: stats.totalTenders,
      icon: Target,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive' as const
    },
    {
      title: 'Active Tenders',
      value: stats.activeTenders,
      icon: TrendingUp,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'positive' as const
    },
    {
      title: 'My Proposals',
      value: stats.myProposals,
      icon: FileText,
      color: 'bg-yellow-500',
      change: '+5%',
      changeType: 'positive' as const
    },
    {
      title: 'Won Contracts',
      value: stats.wonContracts,
      icon: Award,
      color: 'bg-purple-500',
      change: '+15%',
      changeType: 'positive' as const
    },
    {
      title: 'Pending Deliverables',
      value: stats.pendingDeliverables,
      icon: Clock,
      color: 'bg-orange-500',
      change: '-3%',
      changeType: 'negative' as const
    },
    {
      title: 'Total Earnings',
      value: formatCurrency(stats.totalEarnings),
      icon: DollarSign,
      color: 'bg-emerald-500',
      change: '+22%',
      changeType: 'positive' as const
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {typeof stat.value === 'string' ? stat.value : stat.value.toLocaleString()}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-2">vs last month</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
