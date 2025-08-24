'use client'

import { CheckCircle, AlertCircle } from 'lucide-react'

interface ProfileCompletionBarProps {
  profile: Record<string, unknown>
}

export function ProfileCompletionBar({ profile }: ProfileCompletionBarProps) {
  // Calculate profile completion percentage
  const calculateCompletion = () => {
    const fields = [
      profile.firstName,
      profile.lastName,
      profile.email,
      profile.phone,
      profile.companyName,
      profile.businessType,
      profile.address,
      profile.city,
      profile.state,
      profile.pincode,
      profile.gstNumber,
      profile.panNumber,
      profile.description,
      profile.yearEstablished,
      profile.employeeCount,
      profile.website
    ]

    const completedFields = fields.filter(field =>
      field !== null && field !== undefined && field !== ''
    ).length

    return Math.round((completedFields / fields.length) * 100)
  }

  const completionPercentage = calculateCompletion()

  const getCompletionStatus = () => {
    if (completionPercentage >= 90) return { color: 'green', status: 'Excellent', icon: CheckCircle }
    if (completionPercentage >= 70) return { color: 'blue', status: 'Good', icon: CheckCircle }
    if (completionPercentage >= 50) return { color: 'yellow', status: 'Fair', icon: AlertCircle }
    return { color: 'red', status: 'Incomplete', icon: AlertCircle }
  }

  const status = getCompletionStatus()
  const StatusIcon = status.icon

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Profile Completion</h2>
          <p className="text-sm text-gray-600">
            Complete your profile to increase tender application success
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <StatusIcon className={`h-5 w-5 ${
            status.color === 'green' ? 'text-green-600' :
            status.color === 'blue' ? 'text-blue-600' :
            status.color === 'yellow' ? 'text-yellow-600' :
            'text-red-600'
          }`} />
          <span className={`text-sm font-medium ${
            status.color === 'green' ? 'text-green-600' :
            status.color === 'blue' ? 'text-blue-600' :
            status.color === 'yellow' ? 'text-yellow-600' :
            'text-red-600'
          }`}>
            {status.status}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
              {completionPercentage}% Complete
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-gray-200">
          <div
            style={{ width: `${completionPercentage}%` }}
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ${
              status.color === 'green' ? 'bg-green-500' :
              status.color === 'blue' ? 'bg-blue-500' :
              status.color === 'yellow' ? 'bg-yellow-500' :
              'bg-red-500'
            }`}
          ></div>
        </div>
      </div>

      {/* Completion Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Quick Tips to Improve Your Profile:</h3>
        <ul className="text-xs text-blue-800 space-y-1">
          {!profile.gstNumber && <li>• Add GST Number for tax verification</li>}
          {!profile.panNumber && <li>• Add PAN Number for identity verification</li>}
          {!profile.description && <li>• Add company description to showcase expertise</li>}
          {!profile.website && <li>• Add company website for credibility</li>}
          {!profile.yearEstablished && <li>• Add year established to show experience</li>}
          {!profile.employeeCount && <li>• Add employee count to show company size</li>}
          {completionPercentage >= 90 && <li>• Excellent! Your profile is well-completed</li>}
        </ul>
      </div>
    </div>
  )
}
