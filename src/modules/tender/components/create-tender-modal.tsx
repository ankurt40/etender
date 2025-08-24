'use client'

import { useState } from 'react'
import { X, Calendar, DollarSign, MapPin, Clock, Building2, FileText } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface CreateTenderModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateTenderModal({ isOpen, onClose }: CreateTenderModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: '',
    category: 'CONSTRUCTION',
    serviceType: '',
    estimatedValue: '',
    earnestMoney: '',
    tenderFee: '',
    location: '',
    state: '',
    district: '',
    lastDateSubmission: '',
    openingDate: '',
    validityPeriod: '90',
    workCompletionTime: '365',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    eligibilityCriteria: '',
    technicalSpecs: '',
    evaluationCriteria: ''
  })

  const categories = [
    'CONSTRUCTION',
    'CONSULTING',
    'SUPPLY',
    'SERVICES',
    'MAINTENANCE',
    'IT_SOFTWARE',
    'HEALTHCARE',
    'EDUCATION',
    'TRANSPORTATION',
    'OTHER'
  ]

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
    'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/tenders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          estimatedValue: parseFloat(formData.estimatedValue),
          earnestMoney: formData.earnestMoney ? parseFloat(formData.earnestMoney) : undefined,
          tenderFee: formData.tenderFee ? parseFloat(formData.tenderFee) : undefined,
          validityPeriod: parseInt(formData.validityPeriod),
          workCompletionTime: parseInt(formData.workCompletionTime),
          eligibilityCriteria: { description: formData.eligibilityCriteria },
          technicalSpecs: { description: formData.technicalSpecs },
          evaluationCriteria: { description: formData.evaluationCriteria }
        }),
      })

      if (response.ok) {
        // Reset form and close modal
        setFormData({
          title: '',
          description: '',
          department: '',
          category: 'CONSTRUCTION',
          serviceType: '',
          estimatedValue: '',
          earnestMoney: '',
          tenderFee: '',
          location: '',
          state: '',
          district: '',
          lastDateSubmission: '',
          openingDate: '',
          validityPeriod: '90',
          workCompletionTime: '365',
          contactPerson: '',
          contactEmail: '',
          contactPhone: '',
          eligibilityCriteria: '',
          technicalSpecs: '',
          evaluationCriteria: ''
        })
        onClose()
        // Refresh the page to show new tender
        window.location.reload()
      } else {
        const errorData = await response.json()
        alert(`Error creating tender: ${errorData.error}`)
      }
    } catch (error) {
      alert('Error creating tender. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Create New Tender</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tender Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter tender title"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Detailed description of the tender"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department *
                </label>
                <input
                  type="text"
                  name="department"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="e.g., Ministry of Road Transport and Highways"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Type *
                </label>
                <input
                  type="text"
                  name="serviceType"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  placeholder="e.g., Civil Engineering, Software Development"
                />
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-green-600" />
              Financial Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Value (₹) *
                </label>
                <input
                  type="number"
                  name="estimatedValue"
                  required
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.estimatedValue}
                  onChange={handleInputChange}
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Earnest Money (₹)
                </label>
                <input
                  type="number"
                  name="earnestMoney"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.earnestMoney}
                  onChange={handleInputChange}
                  placeholder="Optional"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tender Fee (₹)
                </label>
                <input
                  type="number"
                  name="tenderFee"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.tenderFee}
                  onChange={handleInputChange}
                  placeholder="Optional"
                />
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-red-600" />
              Location Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City/Town"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <select
                  name="state"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.state}
                  onChange={handleInputChange}
                >
                  <option value="">Select State</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  District
                </label>
                <input
                  type="text"
                  name="district"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.district}
                  onChange={handleInputChange}
                  placeholder="District (Optional)"
                />
              </div>
            </div>
          </div>

          {/* Timeline Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-purple-600" />
              Timeline Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Submission Deadline *
                </label>
                <input
                  type="datetime-local"
                  name="lastDateSubmission"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.lastDateSubmission}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opening Date *
                </label>
                <input
                  type="datetime-local"
                  name="openingDate"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.openingDate}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Validity Period (days) *
                </label>
                <input
                  type="number"
                  name="validityPeriod"
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.validityPeriod}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Completion (days) *
                </label>
                <input
                  type="number"
                  name="workCompletionTime"
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.workCompletionTime}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Building2 className="h-5 w-5 mr-2 text-orange-600" />
              Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Person *
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email *
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  placeholder="email@department.gov.in"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Phone *
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  placeholder="+91-XXXXXXXXXX"
                />
              </div>
            </div>
          </div>

          {/* Detailed Specifications */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-indigo-600" />
              Detailed Specifications
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Eligibility Criteria *
                </label>
                <textarea
                  name="eligibilityCriteria"
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.eligibilityCriteria}
                  onChange={handleInputChange}
                  placeholder="Describe the eligibility requirements for contractors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technical Specifications *
                </label>
                <textarea
                  name="technicalSpecs"
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.technicalSpecs}
                  onChange={handleInputChange}
                  placeholder="Detailed technical requirements and specifications"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Evaluation Criteria *
                </label>
                <textarea
                  name="evaluationCriteria"
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.evaluationCriteria}
                  onChange={handleInputChange}
                  placeholder="How proposals will be evaluated and scored"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating Tender...' : 'Create Tender'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
