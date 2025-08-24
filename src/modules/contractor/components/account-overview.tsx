'use client'

import { User, Mail, Phone, MapPin, Globe } from 'lucide-react'

interface AccountOverviewProps {
  profile: Record<string, unknown>
}

export function AccountOverview({ profile }: AccountOverviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Overview</h3>

      {/* Profile Picture */}
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
          <User className="h-8 w-8 text-white" />
        </div>
        <div className="ml-4">
          <h4 className="text-lg font-medium text-gray-900">
            {profile.firstName as string} {profile.lastName as string}
          </h4>
          <p className="text-sm text-gray-600">{(profile.companyName as string) || 'Company not specified'}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center text-sm">
          <Mail className="h-4 w-4 text-gray-400 mr-3" />
          <span className="text-gray-600">{profile.email as string}</span>
        </div>

        {Boolean(profile.phone) && (
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 text-gray-400 mr-3" />
            <span className="text-gray-600">{profile.phone as string}</span>
          </div>
        )}

        {Boolean(profile.address) && (
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 text-gray-400 mr-3" />
            <span className="text-gray-600">{profile.city as string}, {profile.state as string}</span>
          </div>
        )}

        {Boolean(profile.website) && (
          <div className="flex items-center text-sm">
            <Globe className="h-4 w-4 text-gray-400 mr-3" />
            <a href={profile.website as string} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
              {profile.website as string}
            </a>
          </div>
        )}
      </div>

      {/* Company Info */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Company Information</h4>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Business Type:</span>
            <span className="text-gray-900">{(profile.businessType as string)?.replace('_', ' ') || 'Not specified'}</span>
          </div>

          {Boolean(profile.yearEstablished) && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Established:</span>
              <span className="text-gray-900">{profile.yearEstablished as string}</span>
            </div>
          )}

          {Boolean(profile.employeeCount) && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Employees:</span>
              <span className="text-gray-900">{profile.employeeCount as string}</span>
            </div>
          )}

          {Boolean(profile.gstNumber) && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">GST Number:</span>
              <span className="text-gray-900 font-mono text-xs">{profile.gstNumber as string}</span>
            </div>
          )}
        </div>
      </div>

      {/* Verification Status */}
      <div className="border-t border-gray-200 pt-6 mt-6">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Verification Status</h4>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Email Verified</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              profile.isVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {profile.isVerified ? 'Verified' : 'Not Verified'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Documents</span>
            <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
              Pending Review
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Empanelment</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              profile.isEmpanelled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {profile.isEmpanelled ? 'Empanelled' : 'Not Empanelled'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-200 pt-6 mt-6 space-y-3">
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
          Upload Documents
        </button>
        <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium">
          Download Profile
        </button>
      </div>
    </div>
  )
}
