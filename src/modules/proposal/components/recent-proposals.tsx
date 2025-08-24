'use client'

import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

interface RecentProposalsProps {
  proposals: Array<{
    id: string
    title: string
    status: string
    totalAmount: number
    createdAt: Date
    tender: {
      title: string
      estimatedValue: number
    }
  }>
}

export function RecentProposals({ proposals }: RecentProposalsProps) {
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'submitted':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'under_review':
        return <Clock className="h-4 w-4 text-yellow-600" />
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'submitted':
        return 'bg-green-100 text-green-800'
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'accepted':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Proposals</h3>
        <p className="text-sm text-gray-600 mt-1">Your latest proposal submissions</p>
      </div>

      <div className="p-6">
        {proposals.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No proposals yet</p>
            <p className="text-sm text-gray-400 mt-1">Start by applying to a tender</p>
          </div>
        ) : (
          <div className="space-y-4">
            {proposals.slice(0, 3).map((proposal) => (
              <div key={proposal.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900">
                      {proposal.tender.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Bid Amount: {formatCurrency(proposal.totalAmount)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(proposal.status)}
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(proposal.status)}`}>
                      {proposal.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Submitted: {formatDate(proposal.createdAt)}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 text-center">
          <a href="/proposals" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
            View All Proposals →
          </a>
        </div>
      </div>
    </div>
  )
}
