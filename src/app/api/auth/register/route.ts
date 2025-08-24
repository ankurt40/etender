import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/database/prisma'
import { z } from 'zod'

const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().min(10, 'Valid phone number required'),
  companyName: z.string().min(1, 'Company name is required'),
  businessType: z.enum(['SOLE_PROPRIETORSHIP', 'PARTNERSHIP', 'PRIVATE_LIMITED', 'PUBLIC_LIMITED', 'LLP', 'OPC']),
  gstNumber: z.string().optional(),
  panNumber: z.string().optional(),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  pincode: z.string().min(6, 'Valid pincode required'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User already exists with this email' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12)

    // Create user and contractor profile in transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          email: validatedData.email,
          password: hashedPassword,
          phone: validatedData.phone,
          role: 'CONTRACTOR'
        }
      })

      const contractor = await tx.contractor.create({
        data: {
          userId: user.id,
          companyName: validatedData.companyName,
          businessType: validatedData.businessType,
          gstNumber: validatedData.gstNumber,
          panNumber: validatedData.panNumber,
          address: validatedData.address,
          city: validatedData.city,
          state: validatedData.state,
          pincode: validatedData.pincode,
        }
      })

      return { user, contractor }
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = result.user

    return NextResponse.json({
      success: true,
      data: {
        user: userWithoutPassword,
        contractor: result.contractor
      },
      message: 'Registration successful'
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
