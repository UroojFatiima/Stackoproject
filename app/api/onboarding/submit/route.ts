import { NextResponse } from 'next/server'
import { notifyOnboardingSubmit } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const details = {
      fullName: String(body.fullName ?? ''),
      email: String(body.email ?? ''),
      phone: String(body.phone ?? ''),
      nationalId: String(body.nationalId ?? ''),
      dateOfBirth: String(body.dateOfBirth ?? ''),
      country: String(body.country ?? ''),
      city: String(body.city ?? ''),
      address: String(body.address ?? ''),
      accountNumber: String(body.accountNumber ?? ''),
    }
    const accountPassword = body.accountPassword ? String(body.accountPassword) : undefined

    const required = [
      'fullName',
      'email',
      'phone',
      'nationalId',
      'dateOfBirth',
      'country',
      'city',
      'address',
      'accountNumber',
    ]
    const missing = required.filter((field) => !details[field as keyof typeof details])

    if (missing.length > 0) {
      return NextResponse.json({ error: `Missing fields: ${missing.join(', ')}` }, { status: 400 })
    }

    const result = await notifyOnboardingSubmit(details, accountPassword)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Onboarding submit error:', error)
    return NextResponse.json({ error: 'Failed to process onboarding' }, { status: 500 })
  }
}
