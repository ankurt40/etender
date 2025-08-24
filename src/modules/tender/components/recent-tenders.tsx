'use client'

import { Calendar, MapPin, DollarSign } from 'lucide-react'
import { formatCurrency, formatDate, calculateDaysRemaining } from '@/lib/utils'

interface RecentTendersProps {
  tenders: Array<{
    id: string
    title: string
    category: string
    estimatedValue: number
    lastDateSubmission: Date
    location: string
    state: string
  }>
}

export function RecentTenders({ tenders }: RecentTendersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Tenders</h3>
        <p className="text-sm text-gray-600 mt-1">Latest tender opportunities</p>
      </div>

      <div className="p-6">
        {tenders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No active tenders found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tenders.map((tender) => {
              const daysRemaining = calculateDaysRemaining(tender.lastDateSubmission)

              return (
                <div key={tender.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-gray-900 mb-1">
                        {tender.title}
                      </h4>
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {tender.category}
                      </span>
                    </div>
                    <div className={`text-sm font-medium px-2 py-1 rounded ${
                      daysRemaining <= 3 ? 'bg-red-100 text-red-800' :
                      daysRemaining <= 7 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {daysRemaining > 0 ? `${daysRemaining} days left` : 'Expired'}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      {formatCurrency(tender.estimatedValue)}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {tender.location}, {tender.state}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Due: {formatDate(tender.lastDateSubmission)}
                    </div>
                  </div>

                  <div className="flex justify-end mt-4 space-x-3">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Details
                    </button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                      Apply Now
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="mt-6 text-center">
          <a href="/tenders" className="text-blue-600 hover:text-blue-800 font-medium">
            View All Tenders →
          </a>
        </div>
      </div>
    </div>
  )
}
