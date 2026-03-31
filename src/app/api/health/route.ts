import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'presupuestosya',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    supabase: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    stripe: !!process.env.STRIPE_SECRET_KEY,
  })
}
