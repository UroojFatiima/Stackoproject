import { NextResponse } from 'next/server'
import { notifyAuthEvent } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const type = body.type as 'signup' | 'signin'
    const email = String(body.email ?? '')

    if (!email || (type !== 'signup' && type !== 'signin')) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const result = await notifyAuthEvent(type, email)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Auth notify error:', error)
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 })
  }
}
