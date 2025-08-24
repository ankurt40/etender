import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { DashboardHeader } from '@/components/common/dashboard-header'
import { ProfileCompletionBar } from '@/modules/contractor/components/profile-completion-bar'
import { AccountOverview } from '@/modules/contractor/components/account-overview'
import { ProfileEditor } from '@/modules/contractor/components/profile-editor'

export default async function ManageAccountPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  // Mock contractor profile data - in real app, fetch from database
  const contractorProfile = {
    id: session.user.id,
    email: session.user.email,
    firstName: session.user.name?.split(' ')[0] || '',
    lastName: session.user.name?.split(' ')[1] || '',
    phone: '+91-9876543210',
    avatar: null,

    // Company Information
    companyName: session.user.contractor?.companyName || '',
    businessType: 'PRIVATE_LIMITED',
    gstNumber: '',
    panNumber: '',
    registrationNumber: '',
    yearEstablished: null,
    employeeCount: null,
    turnover: null,

    // Contact Information
    address: '',
    city: '',
    state: '',
    pincode: '',
    website: '',

    // Additional Information
    description: '',
    specializations: [],
    certifications: [],
    experience: '',

    // Verification Status
    isEmpanelled: false,
    isVerified: session.user.isVerified,
    verificationDocuments: []
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={session.user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Account</h1>
          <p className="text-gray-600 mt-2">
            Complete your contractor profile to increase your chances of winning tenders
          </p>
        </div>

        {/* Profile Completion Bar */}
        <ProfileCompletionBar profile={contractorProfile} />

        {/* Account Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Account Overview */}
          <div className="lg:col-span-1">
            <AccountOverview profile={contractorProfile} />
          </div>

          {/* Profile Editor */}
          <div className="lg:col-span-2">
            <ProfileEditor profile={contractorProfile} />
          </div>
        </div>
      </main>
    </div>
  )
}
