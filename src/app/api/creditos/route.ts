import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getDb() {
  return createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_SERVICE_KEY || '')
}

const PACKS = [
  { id: 'pack_10', credits: 10, price: 999, label: '10 créditos — 9,99€' },
  { id: 'pack_25', credits: 25, price: 1999, label: '25 créditos — 19,99€' },
  { id: 'pack_60', credits: 60, price: 3999, label: '60 créditos — 39,99€' },
  { id: 'pack_150', credits: 150, price: 7999, label: '150 créditos — 79,99€' },
]

export async function GET() {
  return NextResponse.json({ packs: PACKS })
}

export async function POST(req: NextRequest) {
  try {
    const { profesional_id, pack_id, stripe_payment_id } = await req.json()
    if (!profesional_id || !pack_id) {
      return NextResponse.json({ error: 'profesional_id and pack_id required' }, { status: 400 })
    }

    const pack = PACKS.find(p => p.id === pack_id)
    if (!pack) return NextResponse.json({ error: 'Pack no válido' }, { status: 400 })

    const db = getDb()

    // Get current credits
    const { data: prof } = await db.from('profesionales').select('creditos').eq('id', profesional_id).single()
    if (!prof) return NextResponse.json({ error: 'Profesional no encontrado' }, { status: 404 })

    // Add credits
    await db.from('profesionales').update({ creditos: prof.creditos + pack.credits }).eq('id', profesional_id)

    // Log transaction
    await db.from('creditos_transacciones').insert({
      profesional_id, cantidad: pack.credits, tipo: 'compra',
      descripcion: pack.label, stripe_payment_id: stripe_payment_id || null,
    })

    return NextResponse.json({ ok: true, creditos: prof.creditos + pack.credits })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
