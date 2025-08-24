import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { PublicHeader } from '@/components/common/public-header'
import { PublicTenders } from '@/components/common/public-tenders'
import { NewsSection } from '@/components/common/news-section'
import { StatsSection } from '@/components/common/stats-section'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  // If user is already logged in, redirect to dashboard
  if (session) {
    redirect('/dashboard')
  }

  // Mock data for public display
  const publicTenders = [
    {
      id: '1',
      title: 'Construction of Highway Bridge - Phase 2',
      department: 'Ministry of Road Transport and Highways',
      category: 'CONSTRUCTION',
      estimatedValue: 15000000,
      lastDateSubmission: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      location: 'Mumbai',
      state: 'Maharashtra',
      publishedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      title: 'IT Infrastructure Modernization for Government Offices',
      department: 'Department of Electronics & IT',
      category: 'IT_SOFTWARE',
      estimatedValue: 8500000,
      lastDateSubmission: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
      location: 'Delhi',
      state: 'Delhi',
      publishedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      title: 'Supply of Medical Equipment to District Hospitals',
      department: 'Ministry of Health and Family Welfare',
      category: 'SUPPLY',
      estimatedValue: 5200000,
      lastDateSubmission: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      location: 'Bangalore',
      state: 'Karnataka',
      publishedDate: new Date()
    },
    {
      id: '4',
      title: 'School Building Construction Project',
      department: 'Ministry of Education',
      category: 'CONSTRUCTION',
      estimatedValue: 12000000,
      lastDateSubmission: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      location: 'Pune',
      state: 'Maharashtra',
      publishedDate: new Date()
    }
  ]

  const newsItems = [
    {
      id: '1',
      title: 'New Guidelines Released for Digital Signature Certificates in Government Tenders',
      summary: 'Government announces simplified DSC requirements to boost participation in e-tendering process.',
      publishedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      category: 'Policy Update',
      imageUrl: '/api/placeholder/400/200'
    },
    {
      id: '2',
      title: 'GeM Portal Crosses ₹2 Lakh Crore in Annual Procurement',
      summary: 'Government e-Marketplace achieves milestone with significant increase in MSME participation.',
      publishedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      category: 'Achievement',
      imageUrl: '/api/placeholder/400/200'
    },
    {
      id: '3',
      title: 'AI Integration in Tender Evaluation Process Shows 40% Efficiency Improvement',
      summary: 'Pilot program demonstrates significant time savings and improved accuracy in tender assessments.',
      publishedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      category: 'Technology',
      imageUrl: '/api/placeholder/400/200'
    }
  ]

  const platformStats = {
    totalTenders: 12847,
    activeTenders: 1423,
    registeredContractors: 8932,
    totalValueAwarded: 45230000000
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Government Tender Portal
              <span className="block text-blue-200">Powered by AI</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover the latest government tenders, streamline your bidding process,
              and win more contracts with AI-powered insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/auth/signup" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Start Bidding Today
              </a>
              <a href="#recent-tenders" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Browse Tenders
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Stats */}
      <StatsSection stats={platformStats} />

      {/* Recent Tenders Section */}
      <section id="recent-tenders" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Tenders</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest government tender opportunities across India
            </p>
          </div>
          <PublicTenders tenders={publicTenders} />
        </div>
      </section>

      {/* News & Updates Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">News & Updates</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Latest developments in government procurement and tendering
            </p>
          </div>
          <NewsSection news={newsItems} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Winning Tenders?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of contractors who trust TenderGenix for their government contracting needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/auth/signup" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Create Free Account
            </a>
            <a href="/auth/signin" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Sign In
            </a>
          </div>

          {/* Demo Credentials */}
          <div className="mt-8 bg-blue-700 border border-blue-500 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="font-semibold text-white mb-2">Try Demo Account</h3>
            <div className="text-sm font-mono bg-white text-gray-900 p-3 rounded border">
              <div>Email: demo@tendergenix.com</div>
              <div>Password: demo123</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">TenderGenix</h3>
              <p className="text-gray-300 mb-4">
                AI-powered platform for government contractors to discover, bid, and manage tenders efficiently.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#recent-tenders" className="text-gray-400 hover:text-white">Recent Tenders</a></li>
                <li><a href="/auth/signup" className="text-gray-400 hover:text-white">Sign Up</a></li>
                <li><a href="/auth/signin" className="text-gray-400 hover:text-white">Sign In</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">API</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 TenderGenix. All rights reserved. | Made for Indian Government Contractors
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
