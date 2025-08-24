'use client'

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">TenderGenix</h1>
            <span className="ml-2 text-sm text-gray-500 hidden sm:inline">Government Tender Portal</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#recent-tenders" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              Recent Tenders
            </a>
            <a href="#news" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              News
            </a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              About
            </a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              Contact
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <a href="/auth/signin" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Sign In
            </a>
            <a href="/auth/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
