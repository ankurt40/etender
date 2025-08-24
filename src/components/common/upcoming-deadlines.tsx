'use client'

import { Clock, AlertTriangle, Calendar } from 'lucide-react'
import { formatDate, calculateDaysRemaining } from '@/lib/utils'

interface UpcomingDeadlinesProps {
  deadlines: Array<{
    id: string
    title: string
    dueDate: Date
    type: 'tender' | 'deliverable'
  }>
}

export function UpcomingDeadlines({ deadlines }: UpcomingDeadlinesProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h3>
        <p className="text-sm text-gray-600 mt-1">Don&apos;t miss these important dates</p>
      </div>

      <div className="p-6">
        {deadlines.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No upcoming deadlines</p>
            <p className="text-sm text-gray-400 mt-1">You&apos;re all caught up!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {deadlines.map((deadline) => {
              const daysRemaining = calculateDaysRemaining(deadline.dueDate)
              const isUrgent = daysRemaining <= 2
              const isWarning = daysRemaining <= 5

              return (
                <div key={deadline.id} className={`border rounded-lg p-3 ${
                  isUrgent ? 'border-red-200 bg-red-50' :
                  isWarning ? 'border-yellow-200 bg-yellow-50' :
                  'border-gray-200'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        {deadline.type === 'tender' ? (
                          <Clock className="h-4 w-4 text-blue-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                        )}
                        <span className={`text-xs px-2 py-1 rounded ${
                          deadline.type === 'tender' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                        }`}>
                          {deadline.type.toUpperCase()}
                        </span>
                      </div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        {deadline.title}
                      </h4>
                      <p className="text-xs text-gray-600">
                        Due: {formatDate(deadline.dueDate)}
                      </p>
                    </div>
                    <div className={`text-xs font-medium px-2 py-1 rounded ${
                      isUrgent ? 'bg-red-100 text-red-800' :
                      isWarning ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {daysRemaining > 0 ? `${daysRemaining} days` : 'Overdue'}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="mt-6 text-center">
          <a href="/deadlines" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
            View All Deadlines →
          </a>
        </div>
      </div>
    </div>
  )
}
