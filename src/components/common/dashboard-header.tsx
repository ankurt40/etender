'use client'

import { useState, useRef, useEffect } from 'react'
import { Bell, User, LogOut, Settings, ChevronDown, UserCog } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

interface DashboardHeaderProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
    role?: string
  }
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    setIsDropdownOpen(false)
    signOut()
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo - Far Left */}
          <div className="flex items-center flex-shrink-0 mr-8">
            <Link href="/" className="block">
              <h1 className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer">
                TenderGenix
              </h1>
            </Link>
          </div>

          {/* Navigation - Expanded Center */}
          <nav className="hidden md:flex flex-1 justify-center space-x-12">
            <Link href="/dashboard" className="text-gray-900 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors">
              Dashboard
            </Link>
            <Link href="/tenders" className="text-gray-500 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors">
              Tenders
            </Link>
            <Link href="/proposals" className="text-gray-500 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors">
              Proposals
            </Link>
            <Link href="/contracts" className="text-gray-500 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors">
              Contracts
            </Link>
            <Link href="/analytics" className="text-gray-500 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors">
              Analytics
            </Link>
          </nav>

          {/* Profile Section - Far Right */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            {/* Notifications */}
            <button className="relative p-2 text-gray-500 hover:text-gray-700">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-gray-900">{user.name}</span>
                    <span className="text-xs text-gray-500 capitalize">{user.role?.toLowerCase()}</span>
                  </div>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    {/* User Info Section */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                          <p className="text-xs text-blue-600 capitalize">{user.role?.toLowerCase()} Account</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      {/* Manage Account - Only for Contractors */}
                      {user.role === 'CONTRACTOR' && (
                        <a
                          href="/account"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <UserCog className="h-4 w-4 mr-3 text-gray-400" />
                          Manage Account
                        </a>
                      )}

                      {/* Settings */}
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => {
                          setIsDropdownOpen(false)
                          // Add settings functionality here
                          console.log('Settings clicked')
                        }}
                      >
                        <Settings className="h-4 w-4 mr-3 text-gray-400" />
                        Settings
                      </button>

                      {/* Divider */}
                      <div className="border-t border-gray-100 my-1"></div>

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <LogOut className="h-4 w-4 mr-3 text-red-400" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
