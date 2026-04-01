import { NextRequest, NextResponse } from 'next/server'
import { stripe, STRIPE_PRICES, CREDITOS_POR_PACK } from '@/lib/stripe'
import { getServiceClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { packId, profesionalId, successUrl, cancelUrl } = body

    if (!packId || !profesionalId) {
      return NextResponse.json({ error: 'packId y profesionalId son requeridos' }, { status: 400 })
    }

    const priceId = STRIPE_PRICES[packId]
    if (!priceId) {
      return NextResponse.json({ error: `Pack no configurado: ${packId}` }, { status: 400 })
    }

    const creditos = CREDITOS_POR_PACK[packId]
    const isPro = packId === 'pro'

    // Get or retrieve stripe customer
    let stripeCustomerId: string | undefined
    try {
      const supabase = getServiceClient()
      const { data: pro } = await supabase
        .from('profesionales')
        .select('stripe_customer_id, email, nombre')
        .eq('id', profesionalId)
        .single()

      if (pro?.stripe_customer_id) {
        stripeCustomerId = pro.stripe_customer_id
      }
    } catch {
      // Continue without customer ID
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const sessionParams: Parameters<typeof stripe.checkout.sessions.create>[0] = {
      mode: isPro ? 'subscription' : 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl || `${appUrl}/creditos?success=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${appUrl}/creditos`,
      metadata: {
        profesional_id: profesionalId,
        pack_id: packId,
        creditos: String(creditos),
      },
    }

    if (stripeCustomerId) {
      sessionParams.customer = stripeCustomerId
    } else {
      if (!isPro) sessionParams.customer_creation = 'always'
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    return NextResponse.json({ url: session.url, sessionId: session.id })
  } catch (err) {
    console.error('POST /api/stripe/checkout error:', err)
    const message = err instanceof Error ? err.message : 'Error al crear sesión de pago'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
