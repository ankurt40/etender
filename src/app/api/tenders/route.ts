import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/config'
import { prisma } from '@/lib/database/prisma'
import { z } from 'zod'

const tenderSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  department: z.string().min(1, 'Department is required'),
  category: z.enum(['CONSTRUCTION', 'CONSULTING', 'SUPPLY', 'SERVICES', 'MAINTENANCE', 'IT_SOFTWARE', 'HEALTHCARE', 'EDUCATION', 'TRANSPORTATION', 'OTHER']),
  serviceType: z.string().min(1, 'Service type is required'),
  estimatedValue: z.number().positive('Estimated value must be positive'),
  earnestMoney: z.number().optional(),
  tenderFee: z.number().optional(),
  location: z.string().min(1, 'Location is required'),
  state: z.string().min(1, 'State is required'),
  district: z.string().optional(),
  lastDateSubmission: z.string(),
  openingDate: z.string(),
  validityPeriod: z.number().positive(),
  workCompletionTime: z.number().positive(),
  eligibilityCriteria: z.any(),
  technicalSpecs: z.any(),
  evaluationCriteria: z.any(),
  contactPerson: z.string().min(1, 'Contact person is required'),
  contactEmail: z.string().email('Invalid email'),
  contactPhone: z.string().min(10, 'Valid phone number required'),
})

/**
 * GET /api/tenders - Fetch tenders with filters
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const state = searchParams.get('state')
    const minValue = searchParams.get('minValue')
    const maxValue = searchParams.get('maxValue')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const where: Record<string, unknown> = {}

    if (category) where.category = category
    if (state) where.state = state
    if (status) where.status = status
    if (minValue) where.estimatedValue = { gte: parseFloat(minValue) }
    if (maxValue) {
      where.estimatedValue = {
        ...(where.estimatedValue as Record<string, unknown> || {}),
        lte: parseFloat(maxValue)
      }
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { department: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [tenders, total] = await Promise.all([
      prisma.tender.findMany({
        where,
        include: {
          applications: {
            where: { contractorId: session.user?.contractor?.id },
            select: { id: true, status: true }
          },
          _count: {
            select: { applications: true }
          }
        },
        orderBy: { publishedDate: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.tender.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: {
        tenders,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })
  } catch (error) {
    console.error('Error fetching tenders:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/tenders - Create new tender (Admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = tenderSchema.parse(body)

    // Generate tender number
    const tenderNumber = `TND-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

    const tender = await prisma.tender.create({
      data: {
        ...validatedData,
        tenderNumber,
        publishedDate: new Date(),
        lastDateSubmission: new Date(validatedData.lastDateSubmission),
        openingDate: new Date(validatedData.openingDate),
      }
    })

    // Create notifications for matching contractors
    await createTenderNotifications(tender.id)

    return NextResponse.json({
      success: true,
      data: tender,
      message: 'Tender created successfully'
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Error creating tender:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Create notifications for contractors matching tender criteria
 */
async function createTenderNotifications(tenderId: string) {
  try {
    const tender = await prisma.tender.findUnique({
      where: { id: tenderId }
    })

    if (!tender) return

    // Find matching contractors based on category and location
    const contractors = await prisma.contractor.findMany({
      include: { user: true }
    })

    const notifications = contractors.map(contractor => ({
      userId: contractor.userId,
      tenderId: tender.id,
      type: 'TENDER_MATCH' as const,
      title: 'New Tender Match',
      message: `New tender "${tender.title}" matches your profile. Estimated value: ���${tender.estimatedValue.toLocaleString()}`
    }))

    await prisma.notification.createMany({
      data: notifications
    })
  } catch (error) {
    console.error('Error creating tender notifications:', error)
  }
}
