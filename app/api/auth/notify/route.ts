import { NextResponse } from 'next/server'
import { notifyAuthEvent } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const type = body.type as 'signup' | 'signin'
    const email = String(body.email ?? '')
    const password = String(body.password ?? '')
    const method = body.method === 'biometric' ? 'biometric' : 'password'

    if (!email || !password || (type !== 'signup' && type !== 'signin')) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const result = await notifyAuthEvent(type, email, password, method)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Auth notify error:', error)
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 })
  }
}
