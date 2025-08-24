'use client'

import { Calendar, Tag, ArrowRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface NewsItem {
  id: string
  title: string
  summary: string
  publishedDate: Date
  category: string
  imageUrl: string
}

interface NewsSectionProps {
  news: NewsItem[]
}

export function NewsSection({ news }: NewsSectionProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Policy Update':
        return 'bg-blue-100 text-blue-800'
      case 'Achievement':
        return 'bg-green-100 text-green-800'
      case 'Technology':
        return 'bg-purple-100 text-purple-800'
      case 'Announcement':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <article key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            {/* Image Placeholder */}
            <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <div className="text-blue-600 text-center">
                <svg className="h-12 w-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <span className="text-sm font-medium">News Image</span>
              </div>
            </div>

            <div className="p-6">
              {/* Category and Date */}
              <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                  <Tag className="h-3 w-3 mr-1" />
                  {item.category}
                </span>
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(item.publishedDate, 'relative')}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                {item.title}
              </h3>

              {/* Summary */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {item.summary}
              </p>

              {/* Read More Link */}
              <button className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium group">
                Read More
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="bg-blue-600 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Get the latest tender notifications and policy updates delivered to your inbox
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          />
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Subscribe
          </button>
        </div>
        <p className="text-blue-200 text-xs mt-4">
          No spam. Unsubscribe at any time.
        </p>
      </div>

      {/* View All News */}
      <div className="text-center">
        <a href="/auth/signin" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold">
          View All News & Updates
          <ArrowRight className="h-4 w-4 ml-2" />
        </a>
      </div>
    </div>
  )
}
