'use client'

import { Calendar, MapPin, DollarSign, Building2, Clock, Users, FileText, Eye } from 'lucide-react'
import { formatCurrency, formatDate, calculateDaysRemaining } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface Tender {
  id: string
  tenderNumber: string
  title: string
  department: string
  category: string
  serviceType: string
  estimatedValue: number
  earnestMoney?: number
  tenderFee?: number
  location: string
  state: string
  district?: string
  publishedDate: Date
  lastDateSubmission: Date
  openingDate: Date
  validityPeriod: number
  workCompletionTime: number
  contactPerson: string
  contactEmail: string
  contactPhone: string
  status: string
  applications: any[]
  _count: { applications: number }
}

interface TenderListProps {
  tenders: Tender[]
}

export function TenderList({ tenders }: TenderListProps) {
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
      case 'SERVICES':
        return 'bg-indigo-100 text-indigo-800'
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
      {/* Results Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {tenders.length} Tenders Found
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Showing active government tender opportunities
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
            <option>Sort by: Latest</option>
            <option>Sort by: Deadline</option>
            <option>Sort by: Value (High to Low)</option>
            <option>Sort by: Value (Low to High)</option>
          </select>
        </div>
      </div>

      {/* Tender Cards */}
      <div className="space-y-4">
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
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">{tender.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(tender.category)}`}>
                      {tender.category.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Building2 className="h-4 w-4 mr-2" />
                    {tender.department}
                  </div>
                  <div className="text-sm text-gray-500">
                    Tender No: {tender.tenderNumber}
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <div className={`text-sm px-3 py-1 rounded-full border font-medium ${getUrgencyColor(daysRemaining)}`}>
                    {daysRemaining > 0 ? `${daysRemaining} days left` : 'Expired'}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Users className="h-3 w-3 mr-1" />
                    {tender._count.applications} applicants
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center text-sm">
                  <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                  <div>
                    <div className="font-medium text-gray-700">Estimated Value</div>
                    <div className="text-gray-900 font-semibold">{formatCurrency(tender.estimatedValue)}</div>
                  </div>
                </div>

                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-700">Location</div>
                    <div className="text-gray-900">{tender.location}, {tender.state}</div>
                  </div>
                </div>

                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                  <div>
                    <div className="font-medium text-gray-700">Submission Deadline</div>
                    <div className="text-gray-900">{formatDate(tender.lastDateSubmission)}</div>
                  </div>
                </div>

                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-orange-600" />
                  <div>
                    <div className="font-medium text-gray-700">Work Duration</div>
                    <div className="text-gray-900">{tender.workCompletionTime} days</div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              {tender.earnestMoney && (
                <div className="bg-gray-50 rounded-md p-3 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Earnest Money: </span>
                      <span className="text-gray-900">{formatCurrency(tender.earnestMoney)}</span>
                    </div>
                    {tender.tenderFee && (
                      <div>
                        <span className="font-medium text-gray-700">Tender Fee: </span>
                        <span className="text-gray-900">{formatCurrency(tender.tenderFee)}</span>
                      </div>
                    )}
                    <div>
                      <span className="font-medium text-gray-700">Validity: </span>
                      <span className="text-gray-900">{tender.validityPeriod} days</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Info */}
              <div className="text-sm text-gray-600 mb-4">
                <span className="font-medium">Contact: </span>
                {tender.contactPerson} • {tender.contactEmail} • {tender.contactPhone}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex space-x-3">
                  <button className="inline-flex items-center text-gray-600 hover:text-gray-800 text-sm font-medium">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </button>
                  <button className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                    <FileText className="h-4 w-4 mr-1" />
                    Download Document
                  </button>
                </div>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors">
                    Save for Later
                  </button>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Pagination */}
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
            3
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700">
            Next
          </button>
        </nav>
      </div>
    </div>
  )
}
