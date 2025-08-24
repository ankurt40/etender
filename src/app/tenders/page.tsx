import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { DashboardHeader } from '@/components/common/dashboard-header'
import { TenderDataGrid } from '@/modules/tender/components/tender-data-grid'
import { AddTenderButton } from '@/modules/tender/components/add-tender-button'

export default async function TendersPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  const isAdmin = session.user.role === 'ADMIN'

  // Mock tender data - in real app, fetch from database
  const tenders = [
    {
      id: '1',
      tenderNumber: 'TN-2025-001',
      title: 'Construction of Highway Bridge - Phase 2',
      department: 'Ministry of Road Transport and Highways',
      category: 'CONSTRUCTION',
      serviceType: 'Infrastructure',
      estimatedValue: 15000000,
      earnestMoney: 150000,
      tenderFee: 5000,
      location: 'Mumbai',
      state: 'Maharashtra',
      district: 'Mumbai',
      publishedDate: new Date('2025-08-20'),
      lastDateSubmission: new Date('2025-09-15'),
      openingDate: new Date('2025-09-16'),
      validityPeriod: 180,
      workCompletionTime: 365,
      contactPerson: 'John Doe',
      contactEmail: 'john@example.com',
      contactPhone: '+91-9876543210',
      status: 'ACTIVE',
      applications: [],
      _count: { applications: 12 }
    },
    {
      id: '2',
      tenderNumber: 'TN-2025-002',
      title: 'IT Infrastructure Modernization for Government Offices',
      department: 'Department of Electronics & IT',
      category: 'IT_SOFTWARE',
      serviceType: 'Technology',
      estimatedValue: 8500000,
      earnestMoney: 85000,
      tenderFee: 3000,
      location: 'Delhi',
      state: 'Delhi',
      district: 'New Delhi',
      publishedDate: new Date('2025-08-22'),
      lastDateSubmission: new Date('2025-09-20'),
      openingDate: new Date('2025-09-21'),
      validityPeriod: 120,
      workCompletionTime: 180,
      contactPerson: 'Jane Smith',
      contactEmail: 'jane@example.com',
      contactPhone: '+91-9876543211',
      status: 'ACTIVE',
      applications: [],
      _count: { applications: 8 }
    },
    {
      id: '3',
      tenderNumber: 'TN-2025-003',
      title: 'Supply of Medical Equipment to District Hospitals',
      department: 'Ministry of Health and Family Welfare',
      category: 'SUPPLY',
      serviceType: 'Healthcare',
      estimatedValue: 5200000,
      earnestMoney: 52000,
      tenderFee: 2000,
      location: 'Bangalore',
      state: 'Karnataka',
      district: 'Bangalore Urban',
      publishedDate: new Date('2025-08-23'),
      lastDateSubmission: new Date('2025-09-25'),
      openingDate: new Date('2025-09-26'),
      validityPeriod: 90,
      workCompletionTime: 120,
      contactPerson: 'Mike Johnson',
      contactEmail: 'mike@example.com',
      contactPhone: '+91-9876543212',
      status: 'ACTIVE',
      applications: [],
      _count: { applications: 15 }
    },
    {
      id: '4',
      tenderNumber: 'TN-2025-004',
      title: 'School Building Construction Project',
      department: 'Ministry of Education',
      category: 'CONSTRUCTION',
      serviceType: 'Infrastructure',
      estimatedValue: 12000000,
      earnestMoney: 120000,
      tenderFee: 4000,
      location: 'Pune',
      state: 'Maharashtra',
      district: 'Pune',
      publishedDate: new Date('2025-08-24'),
      lastDateSubmission: new Date('2025-09-30'),
      openingDate: new Date('2025-10-01'),
      validityPeriod: 150,
      workCompletionTime: 300,
      contactPerson: 'Sarah Wilson',
      contactEmail: 'sarah@example.com',
      contactPhone: '+91-9876543213',
      status: 'ACTIVE',
      applications: [],
      _count: { applications: 6 }
    },
    {
      id: '5',
      tenderNumber: 'TN-2025-005',
      title: 'Digital Governance Platform Development',
      department: 'Department of Administrative Reforms',
      category: 'IT_SOFTWARE',
      serviceType: 'Technology',
      estimatedValue: 25000000,
      earnestMoney: 250000,
      tenderFee: 8000,
      location: 'Hyderabad',
      state: 'Telangana',
      district: 'Hyderabad',
      publishedDate: new Date('2025-08-21'),
      lastDateSubmission: new Date('2025-09-18'),
      openingDate: new Date('2025-09-19'),
      validityPeriod: 200,
      workCompletionTime: 365,
      contactPerson: 'David Brown',
      contactEmail: 'david@example.com',
      contactPhone: '+91-9876543214',
      status: 'ACTIVE',
      applications: [],
      _count: { applications: 22 }
    },
    {
      id: '6',
      tenderNumber: 'TN-2025-006',
      title: 'Rural Road Connectivity Enhancement',
      department: 'Ministry of Rural Development',
      category: 'CONSTRUCTION',
      serviceType: 'Infrastructure',
      estimatedValue: 18000000,
      earnestMoney: 180000,
      tenderFee: 6000,
      location: 'Jaipur',
      state: 'Rajasthan',
      district: 'Jaipur',
      publishedDate: new Date('2025-08-19'),
      lastDateSubmission: new Date('2025-09-12'),
      openingDate: new Date('2025-09-13'),
      validityPeriod: 160,
      workCompletionTime: 400,
      contactPerson: 'Lisa Davis',
      contactEmail: 'lisa@example.com',
      contactPhone: '+91-9876543215',
      status: 'ACTIVE',
      applications: [],
      _count: { applications: 18 }
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={session.user} />

      <main className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* Material UI DataGrid */}
        <TenderDataGrid tenders={tenders} />
      </main>
    </div>
  )
}
