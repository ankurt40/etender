import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { DashboardHeader } from '@/components/common/dashboard-header'
import { TenderFilters } from '@/modules/tender/components/tender-filters'
import { TenderList } from '@/modules/tender/components/tender-list'
import { AddTenderButton } from '@/modules/tender/components/add-tender-button'

export default async function TendersPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  // Check if user is admin (demo user is not admin)
  const isAdmin = session.user.role === 'ADMIN' && session.user.id !== 'demo-user'

  // Mock data for tenders
  const tenders = [
    {
      id: '1',
      tenderNumber: 'TND-2025-ABC123',
      title: 'Construction of Highway Bridge - Phase 2',
      department: 'Ministry of Road Transport and Highways',
      category: 'CONSTRUCTION',
      serviceType: 'Civil Engineering',
      estimatedValue: 15000000,
      earnestMoney: 300000,
      tenderFee: 5000,
      location: 'Mumbai',
      state: 'Maharashtra',
      district: 'Mumbai',
      publishedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      lastDateSubmission: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      openingDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
      validityPeriod: 90,
      workCompletionTime: 365,
      contactPerson: 'Engineer Rajesh Kumar',
      contactEmail: 'rajesh.kumar@morth.gov.in',
      contactPhone: '+91-9876543210',
      status: 'ACTIVE',
      applications: [],
      _count: { applications: 12 }
    },
    {
      id: '2',
      tenderNumber: 'TND-2025-DEF456',
      title: 'IT Infrastructure Modernization for Government Offices',
      department: 'Department of Electronics & IT',
      category: 'IT_SOFTWARE',
      serviceType: 'Software Development',
      estimatedValue: 8500000,
      earnestMoney: 170000,
      tenderFee: 3000,
      location: 'Delhi',
      state: 'Delhi',
      district: 'New Delhi',
      publishedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      lastDateSubmission: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
      openingDate: new Date(Date.now() + 13 * 24 * 60 * 60 * 1000),
      validityPeriod: 60,
      workCompletionTime: 180,
      contactPerson: 'Dr. Priya Sharma',
      contactEmail: 'priya.sharma@deity.gov.in',
      contactPhone: '+91-9876543211',
      status: 'ACTIVE',
      applications: [],
      _count: { applications: 8 }
    },
    {
      id: '3',
      tenderNumber: 'TND-2025-GHI789',
      title: 'Supply of Medical Equipment to District Hospitals',
      department: 'Ministry of Health and Family Welfare',
      category: 'SUPPLY',
      serviceType: 'Medical Equipment Supply',
      estimatedValue: 5200000,
      earnestMoney: 104000,
      tenderFee: 2000,
      location: 'Bangalore',
      state: 'Karnataka',
      district: 'Bangalore Urban',
      publishedDate: new Date(),
      lastDateSubmission: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      openingDate: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000),
      validityPeriod: 120,
      workCompletionTime: 90,
      contactPerson: 'Ms. Anita Reddy',
      contactEmail: 'anita.reddy@mohfw.gov.in',
      contactPhone: '+91-9876543212',
      status: 'ACTIVE',
      applications: [],
      _count: { applications: 15 }
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={session.user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Government Tenders</h1>
              <p className="text-gray-600 mt-2">
                Browse and apply for government tender opportunities across India
              </p>
            </div>
            {/* Add Tender Button - Admin Only */}
            {isAdmin && <AddTenderButton />}
          </div>
        </div>

        {/* Filters and Search */}
        <TenderFilters />

        {/* Tender List */}
        <TenderList tenders={tenders} />
      </main>
    </div>
  )
}
