import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { redirect } from 'next/navigation'
import { TenderDetails } from '@/modules/tender/components/tender-details'

interface TenderDetailsPageProps {
  params: {
    id: string
  }
}

export default async function TenderDetailsPage({ params }: TenderDetailsPageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  return <TenderDetails tenderId={params.id} />
}
