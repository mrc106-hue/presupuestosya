import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export const STRIPE_PRICES: Record<string, string> = {
  pack10:       process.env.STRIPE_PRICE_PACK_10       || '',
  pack25:       process.env.STRIPE_PRICE_PACK_25       || '',
  pack60:       process.env.STRIPE_PRICE_PACK_60       || '',
  pack150:      process.env.STRIPE_PRICE_PACK_150      || '',
  pro:          process.env.STRIPE_PRICE_PRO_MENSUAL   || '',
}

export const CREDITOS_POR_PACK: Record<string, number> = {
  pack10:  10,
  pack25:  25,
  pack60:  60,
  pack150: 150,
  pro:     40,
}

export async function createCreditCheckout(params: {
  packId: string
  profesionalId: string
  stripeCustomerId?: string
  successUrl: string
  cancelUrl: string
}) {
  const { packId, profesionalId, stripeCustomerId, successUrl, cancelUrl } = params
  const priceId = STRIPE_PRICES[packId]
  if (!priceId) throw new Error(`No hay precio configurado para el pack: ${packId}`)

  const creditos = CREDITOS_POR_PACK[packId]
  const isPro = packId === 'pro'

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: isPro ? 'subscription' : 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      profesional_id: profesionalId,
      pack_id: packId,
      creditos: String(creditos),
    },
  }

  if (stripeCustomerId) {
    sessionParams.customer = stripeCustomerId
  } else {
    sessionParams.customer_creation = isPro ? undefined : 'always'
  }

  const session = await stripe.checkout.sessions.create(sessionParams)
  return session
}
