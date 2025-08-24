'use client'

import { Bell, User, LogOut, Settings } from 'lucide-react'
import { signOut } from 'next-auth/react'

interface DashboardHeaderProps {
  user: any
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">TenderGenix</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="/dashboard" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Dashboard
            </a>
            <a href="/tenders" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Tenders
            </a>
            <a href="/proposals" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Proposals
            </a>
            <a href="/contracts" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Contracts
            </a>
            <a href="/analytics" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Analytics
            </a>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-500 hover:text-gray-700">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{user.name}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <Settings className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => signOut()}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
