'use client'

import { Calendar, DollarSign, Building2, Clock, Brain, FileText, Edit, Eye, Trash2 } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

interface Proposal {
  id: string
  proposalNumber: string
  title: string
  status: string
  totalAmount: number
  aiConfidenceScore?: number
  submittedAt?: Date | null
  createdAt: Date
  lastModifiedAt: Date
  language: string
  tender: {
    id: string
    title: string
    estimatedValue: number
    department: string
    lastDateSubmission: Date
  }
  contractor: {
    id: string
    companyName: string
  }
}

interface ProposalListProps {
  proposals: Proposal[]
}

export function ProposalList({ proposals }: ProposalListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800'
      case 'SUBMITTED':
        return 'bg-blue-100 text-blue-800'
      case 'UNDER_REVIEW':
        return 'bg-yellow-100 text-yellow-800'
      case 'ACCEPTED':
        return 'bg-green-100 text-green-800'
      case 'REJECTED':
        return 'bg-red-100 text-red-800'
      case 'WITHDRAWN':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getConfidenceColor = (score?: number) => {
    if (!score) return 'text-gray-500'
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getConfidenceBadge = (score?: number) => {
    if (!score) return 'N/A'
    if (score >= 80) return 'High'
    if (score >= 60) return 'Medium'
    return 'Low'
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {proposals.length} Proposals
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Track your tender proposals and their progress
          </p>
        </div>
      </div>

      {/* Proposal Cards */}
      <div className="space-y-4">
        {proposals.map((proposal) => (
          <div key={proposal.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{proposal.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(proposal.status)}`}>
                    {proposal.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <Building2 className="h-4 w-4 mr-2" />
                  {proposal.tender.department}
                </div>
                <div className="text-sm text-gray-500">
                  Proposal No: {proposal.proposalNumber}
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                {proposal.aiConfidenceScore && (
                  <div className="flex items-center text-sm">
                    <Brain className={`h-4 w-4 mr-1 ${getConfidenceColor(proposal.aiConfidenceScore)}`} />
                    <span className={`font-medium ${getConfidenceColor(proposal.aiConfidenceScore)}`}>
                      {getConfidenceBadge(proposal.aiConfidenceScore)} ({proposal.aiConfidenceScore}%)
                    </span>
                  </div>
                )}
                <div className="text-xs text-gray-500">
                  Updated {formatDate(proposal.lastModifiedAt, 'relative')}
                </div>
              </div>
            </div>

            {/* Tender Info */}
            <div className="bg-blue-50 rounded-md p-3 mb-4">
              <div className="text-sm font-medium text-blue-900 mb-1">Related Tender</div>
              <div className="text-sm text-blue-800">{proposal.tender.title}</div>
              <div className="text-xs text-blue-600 mt-1">
                Tender Value: {formatCurrency(proposal.tender.estimatedValue)} •
                Deadline: {formatDate(proposal.tender.lastDateSubmission)}
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center text-sm">
                <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                <div>
                  <div className="font-medium text-gray-700">Bid Amount</div>
                  <div className="text-gray-900 font-semibold">{formatCurrency(proposal.totalAmount)}</div>
                </div>
              </div>

              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                <div>
                  <div className="font-medium text-gray-700">Created</div>
                  <div className="text-gray-900">{formatDate(proposal.createdAt)}</div>
                </div>
              </div>

              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2 text-orange-600" />
                <div>
                  <div className="font-medium text-gray-700">Submitted</div>
                  <div className="text-gray-900">
                    {proposal.submittedAt ? formatDate(proposal.submittedAt) : 'Not submitted'}
                  </div>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            {proposal.aiConfidenceScore && (
              <div className="bg-gray-50 rounded-md p-3 mb-4">
                <div className="flex items-center mb-2">
                  <Brain className="h-4 w-4 mr-2 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">AI Analysis</span>
                </div>
                <div className="text-sm text-gray-600">
                  Confidence Score: <span className={`font-medium ${getConfidenceColor(proposal.aiConfidenceScore)}`}>
                    {proposal.aiConfidenceScore}% {getConfidenceBadge(proposal.aiConfidenceScore)}
                  </span>
                  <br />
                  <span className="text-xs">
                    Based on tender requirements, your company profile, and market analysis
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div className="flex space-x-3">
                <button className="inline-flex items-center text-gray-600 hover:text-gray-800 text-sm font-medium">
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </button>
                <button className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                  <FileText className="h-4 w-4 mr-1" />
                  Download PDF
                </button>
              </div>
              <div className="flex space-x-3">
                {proposal.status === 'DRAFT' && (
                  <>
                    <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </button>
                    <button className="inline-flex items-center px-3 py-1 border border-red-300 text-red-700 rounded-md text-sm font-medium hover:bg-red-50">
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </button>
                    <button className="px-4 py-1 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                      Submit Proposal
                    </button>
                  </>
                )}
                {proposal.status === 'SUBMITTED' && (
                  <button className="px-4 py-1 border border-yellow-600 text-yellow-700 rounded-md text-sm font-medium hover:bg-yellow-50">
                    Withdraw Proposal
                  </button>
                )}
                {proposal.status === 'ACCEPTED' && (
                  <button className="px-4 py-1 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700">
                    View Contract
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {proposals.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No proposals yet</h3>
          <p className="text-gray-600 mb-6">
            Start creating proposals for government tenders to track them here.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Browse Tenders
          </button>
        </div>
      )}

      {/* Pagination */}
      {proposals.length > 0 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700">
              Previous
            </button>
            <button className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">
              1
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700">
              2
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700">
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  )
}
