import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const profesionalId = searchParams.get('profesional_id')

    if (!profesionalId) {
      return NextResponse.json({ error: 'profesional_id requerido' }, { status: 400 })
    }

    const supabase = getServiceClient()

    // Get balance
    const { data: pro, error: proError } = await supabase
      .from('profesionales')
      .select('creditos, plan')
      .eq('id', profesionalId)
      .single()

    if (proError || !pro) {
      return NextResponse.json({ error: 'Profesional no encontrado' }, { status: 404 })
    }

    // Get recent transactions
    const { data: transacciones } = await supabase
      .from('creditos_transacciones')
      .select('cantidad, tipo, created_at')
      .eq('profesional_id', profesionalId)
      .order('created_at', { ascending: false })
      .limit(20)

    return NextResponse.json({
      creditos: pro.creditos,
      plan: pro.plan,
      transacciones: transacciones || [],
    })
  } catch (err) {
    console.error('GET /api/creditos error:', err)
    return NextResponse.json({ error: 'Error al obtener créditos' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    // Admin-only manual adjustment
    const adminSecret = req.headers.get('x-admin-secret')
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await req.json()
    const { profesional_id, cantidad, tipo, nota } = body

    if (!profesional_id || cantidad === undefined || !tipo) {
      return NextResponse.json({ error: 'Faltan campos' }, { status: 400 })
    }

    const supabase = getServiceClient()

    const { data: pro, error: proError } = await supabase
      .from('profesionales')
      .select('creditos')
      .eq('id', profesional_id)
      .single()

    if (proError || !pro) {
      return NextResponse.json({ error: 'Profesional no encontrado' }, { status: 404 })
    }

    const nuevos_creditos = pro.creditos + cantidad
    if (nuevos_creditos < 0) {
      return NextResponse.json({ error: 'No se pueden tener créditos negativos' }, { status: 400 })
    }

    await supabase
      .from('profesionales')
      .update({ creditos: nuevos_creditos })
      .eq('id', profesional_id)

    await supabase
      .from('creditos_transacciones')
      .insert({ profesional_id, cantidad, tipo, stripe_payment_id: nota || null })

    return NextResponse.json({ creditos: nuevos_creditos, ajuste: cantidad })
  } catch (err) {
    console.error('POST /api/creditos error:', err)
    return NextResponse.json({ error: 'Error en ajuste manual' }, { status: 500 })
  }
}
