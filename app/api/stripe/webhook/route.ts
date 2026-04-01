import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { addCredits, getServiceClient } from '@/lib/supabase'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Webhook secret no configurado' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature error:', err)
    return NextResponse.json({ error: 'Firma de webhook inválida' }, { status: 400 })
  }

  const supabase = getServiceClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const profesionalId = session.metadata?.profesional_id
        const packId = session.metadata?.pack_id
        const creditos = parseInt(session.metadata?.creditos || '0')

        if (!profesionalId || !creditos) break

        // Add credits
        await addCredits(profesionalId, creditos, 'compra', session.payment_intent as string)

        // Store stripe customer ID if new
        if (session.customer) {
          await supabase
            .from('profesionales')
            .update({ stripe_customer_id: session.customer as string })
            .eq('id', profesionalId)
        }

        // If subscription, mark plan as pro
        if (packId === 'pro' && session.subscription) {
          await supabase
            .from('profesionales')
            .update({
              plan: 'pro',
              stripe_subscription_id: session.subscription as string,
            })
            .eq('id', profesionalId)
        }

        console.log(`✅ Credits added: ${creditos} → ${profesionalId}`)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        // Only for subscription renewals (not the first payment which is handled by checkout.session.completed)
        if (invoice.billing_reason === 'subscription_cycle') {
          const customerId = invoice.customer as string

          // Find profesional by stripe_customer_id
          const { data: pro } = await supabase
            .from('profesionales')
            .select('id')
            .eq('stripe_customer_id', customerId)
            .single()

          if (pro) {
            await addCredits(pro.id, 40, 'suscripcion', invoice.payment_intent as string)
            console.log(`✅ Monthly Pro credits: 40 → ${pro.id}`)
          }
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        const { data: pro } = await supabase
          .from('profesionales')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (pro) {
          await supabase
            .from('profesionales')
            .update({ plan: 'gratis', stripe_subscription_id: null })
            .eq('id', pro.id)
          console.log(`⚠️ Pro subscription cancelled for: ${pro.id}`)
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string
        const status = subscription.status

        if (status === 'past_due' || status === 'unpaid') {
          const { data: pro } = await supabase
            .from('profesionales')
            .select('id')
            .eq('stripe_customer_id', customerId)
            .single()

          if (pro) {
            await supabase
              .from('profesionales')
              .update({ plan: 'gratis' })
              .eq('id', pro.id)
          }
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }
  } catch (err) {
    console.error(`Error processing webhook event ${event.type}:`, err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
