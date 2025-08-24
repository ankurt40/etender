'use client'

import { useState } from 'react'
import { Search, MapPin, DollarSign } from 'lucide-react'

export function TenderFilters() {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    state: '',
    minValue: '',
    maxValue: '',
    status: 'ACTIVE'
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

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filter Tenders</h2>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          Clear All Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Tenders
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, department..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filters.state}
              onChange={(e) => handleFilterChange('state', e.target.value)}
            >
              <option value="">All States</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Min Value */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Value (₹)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="number"
              placeholder="0"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filters.minValue}
              onChange={(e) => handleFilterChange('minValue', e.target.value)}
            />
          </div>
        </div>

        {/* Max Value */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Value (₹)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="number"
              placeholder="No limit"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filters.maxValue}
              onChange={(e) => handleFilterChange('maxValue', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Filters</h3>
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors">
            Closing Soon (7 days)
          </button>
          <button className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-colors">
            High Value (&gt;₹1 Crore)
          </button>
          <button className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm hover:bg-purple-200 transition-colors">
            Construction
          </button>
          <button className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm hover:bg-orange-200 transition-colors">
            IT & Software
          </button>
        </div>
      </div>
    </div>
  )
}
