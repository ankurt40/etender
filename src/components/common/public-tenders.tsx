'use client'

import { Calendar, MapPin, DollarSign, Building2, Clock } from 'lucide-react'
import { formatCurrency, formatDate, calculateDaysRemaining } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface PublicTender {
  id: string
  title: string
  department: string
  category: string
  estimatedValue: number
  lastDateSubmission: Date
  location: string
  state: string
  publishedDate: Date
}

interface PublicTendersProps {
  tenders: PublicTender[]
}

export function PublicTenders({ tenders }: PublicTendersProps) {
  const router = useRouter()

  const handleTenderClick = (tenderId: string) => {
    router.push(`/tenders/${tenderId}`)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'CONSTRUCTION':
        return 'bg-orange-100 text-orange-800'
      case 'IT_SOFTWARE':
        return 'bg-blue-100 text-blue-800'
      case 'SUPPLY':
        return 'bg-green-100 text-green-800'
      case 'CONSULTING':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getUrgencyColor = (daysRemaining: number) => {
    if (daysRemaining <= 3) return 'bg-red-100 text-red-800 border-red-200'
    if (daysRemaining <= 7) return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    return 'bg-green-100 text-green-800 border-green-200'
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tenders.map((tender) => {
          const daysRemaining = calculateDaysRemaining(tender.lastDateSubmission)

          return (
            <div
              key={tender.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              onClick={() => handleTenderClick(tender.id)}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                    {tender.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Building2 className="h-4 w-4 mr-1" />
                    {tender.department}
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(tender.category)}`}>
                    {tender.category.replace('_', ' ')}
                  </span>
                  <div className={`text-xs px-2 py-1 rounded border font-medium ${getUrgencyColor(daysRemaining)}`}>
                    {daysRemaining > 0 ? `${daysRemaining} days left` : 'Expired'}
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                  <div>
                    <div className="font-medium">Estimated Value</div>
                    <div className="text-gray-900 font-semibold">{formatCurrency(tender.estimatedValue)}</div>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-gray-900">{tender.location}, {tender.state}</div>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                  <div>
                    <div className="font-medium">Submission Deadline</div>
                    <div className="text-gray-900">{formatDate(tender.lastDateSubmission)}</div>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2 text-orange-600" />
                  <div>
                    <div className="font-medium">Published</div>
                    <div className="text-gray-900">{formatDate(tender.publishedDate, 'relative')}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Details
                </button>
                <div className="flex space-x-3">
                  <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                    Download Document
                  </button>
                  <a href="/auth/signin" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* View More Button */}
      <div className="text-center mt-8">
        <a href="/auth/signin" className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          View All Tenders
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Quick Stats */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{tenders.length}</div>
            <div className="text-sm text-gray-600">Tenders Shown</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(tenders.reduce((sum, t) => sum + t.estimatedValue, 0))}
            </div>
            <div className="text-sm text-gray-600">Total Value</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {tenders.filter(t => calculateDaysRemaining(t.lastDateSubmission) <= 7).length}
            </div>
            <div className="text-sm text-gray-600">Closing Soon</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {new Set(tenders.map(t => t.state)).size}
            </div>
            <div className="text-sm text-gray-600">States</div>
          </div>
        </div>
      </div>
    </div>
  )
}
