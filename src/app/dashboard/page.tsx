import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { DashboardHeader } from '@/components/common/dashboard-header'
import { DashboardStats } from '@/components/common/dashboard-stats'
import { RecentTenders } from '@/modules/tender/components/recent-tenders'
import { RecentProposals } from '@/modules/proposal/components/recent-proposals'
import { UpcomingDeadlines } from '@/components/common/upcoming-deadlines'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  // Mock data for demo (since database might not be connected yet)
  const stats = {
    totalTenders: 145,
    activeTenders: 32,
    myProposals: 8,
    wonContracts: 3,
    pendingDeliverables: 2,
    totalEarnings: 24500
  }

  const recentTenders = [
    {
      id: '1',
      title: 'Construction of Highway Bridge - Phase 2',
      category: 'CONSTRUCTION',
      estimatedValue: 15000000,
      lastDateSubmission: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      location: 'Mumbai',
      state: 'Maharashtra'
    },
    {
      id: '2',
      title: 'IT Infrastructure Modernization',
      category: 'IT_SOFTWARE',
      estimatedValue: 8500000,
      lastDateSubmission: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
      location: 'Delhi',
      state: 'Delhi'
    }
  ]

  const recentProposals = [
    {
      id: '1',
      title: 'School Building Construction',
      status: 'SUBMITTED',
      totalAmount: 5000000,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      tender: {
        title: 'School Building Construction',
        estimatedValue: 6000000
      }
    }
  ]

  const upcomingDeadlines = [
    {
      id: '1',
      title: 'Highway Bridge Tender Submission',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      type: 'tender' as const
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={session.user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {session.user.name}
          </h1>
          <p className="text-gray-600 mt-2">
            Here&apos;s what&apos;s happening with your tenders and contracts today.
          </p>
        </div>

        {/* Dashboard Stats */}
        <DashboardStats stats={stats} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Recent Tenders */}
          <div className="lg:col-span-2">
            <RecentTenders tenders={recentTenders} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <RecentProposals proposals={recentProposals} />
            <UpcomingDeadlines deadlines={upcomingDeadlines} />
          </div>
        </div>
      </main>
    </div>
  )
}
