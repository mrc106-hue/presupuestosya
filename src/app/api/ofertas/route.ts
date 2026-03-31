import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getDb() {
  return createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_SERVICE_KEY || '')
}

export async function POST(req: NextRequest) {
  try {
    const { solicitud_id, profesional_id, descripcion, precio_estimado } = await req.json()
    if (!solicitud_id || !profesional_id) {
      return NextResponse.json({ error: 'solicitud_id and profesional_id required' }, { status: 400 })
    }

    const db = getDb()

    // Check solicitud exists and isn't full
    const { data: solicitud } = await db.from('solicitudes').select('*').eq('id', solicitud_id).single()
    if (!solicitud) return NextResponse.json({ error: 'Solicitud no encontrada' }, { status: 404 })
    if (solicitud.ofertas_recibidas >= solicitud.max_ofertas) {
      return NextResponse.json({ error: 'Esta solicitud ya tiene el máximo de ofertas' }, { status: 400 })
    }

    // Check professional has credits
    const { data: prof } = await db.from('profesionales').select('*').eq('id', profesional_id).single()
    if (!prof) return NextResponse.json({ error: 'Profesional no encontrado' }, { status: 404 })

    // Get credit cost for category
    const { data: catConfig } = await db.from('categorias_config').select('creditos_coste').eq('id', solicitud.categoria.toLowerCase().replace(/ /g, '_')).single()
    const creditCost = catConfig?.creditos_coste || 2

    if (prof.creditos < creditCost) {
      return NextResponse.json({ error: `Necesitas ${creditCost} créditos. Tienes ${prof.creditos}.` }, { status: 400 })
    }

    // Check not already sent
    const { data: existing } = await db.from('ofertas').select('id').eq('solicitud_id', solicitud_id).eq('profesional_id', profesional_id)
    if (existing && existing.length > 0) {
      return NextResponse.json({ error: 'Ya enviaste una oferta a esta solicitud' }, { status: 400 })
    }

    // Deduct credits
    await db.from('profesionales').update({ creditos: prof.creditos - creditCost }).eq('id', profesional_id)

    // Log transaction
    await db.from('creditos_transacciones').insert({
      profesional_id, cantidad: -creditCost, tipo: 'gasto',
      descripcion: `Oferta enviada: ${solicitud.categoria} en ${solicitud.provincia}`,
    })

    // Create offer
    const { data: oferta, error } = await db.from('ofertas').insert({
      solicitud_id, profesional_id, descripcion, precio_estimado, creditos_gastados: creditCost,
    }).select().single()
    if (error) throw error

    // Increment offers count
    await db.from('solicitudes').update({ ofertas_recibidas: solicitud.ofertas_recibidas + 1 }).eq('id', solicitud_id)

    return NextResponse.json({ ok: true, oferta, creditos_restantes: prof.creditos - creditCost })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
