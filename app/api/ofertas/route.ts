import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { CATEGORIAS } from '@/lib/data'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const solicitudId = searchParams.get('solicitud_id')

    if (!solicitudId) {
      return NextResponse.json({ error: 'solicitud_id requerido' }, { status: 400 })
    }

    const supabase = getServiceClient()
    const { data, error } = await supabase
      .from('ofertas')
      .select('id, profesional_id, descripcion, precio_estimado, creditos_gastados, estado, created_at')
      .eq('solicitud_id', solicitudId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return NextResponse.json({ ofertas: data })
  } catch (err) {
    console.error('GET /api/ofertas error:', err)
    return NextResponse.json({ error: 'Error al obtener ofertas' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { solicitud_id, profesional_id, descripcion, precio_estimado } = body

    if (!solicitud_id || !profesional_id) {
      return NextResponse.json({ error: 'solicitud_id y profesional_id son requeridos' }, { status: 400 })
    }

    const supabase = getServiceClient()

    // Get solicitud to know categoria and credit cost
    const { data: solicitud, error: solError } = await supabase
      .from('solicitudes')
      .select('categoria, estado, cliente_nombre, cliente_telefono, cliente_email')
      .eq('id', solicitud_id)
      .single()

    if (solError || !solicitud) {
      return NextResponse.json({ error: 'Solicitud no encontrada' }, { status: 404 })
    }

    if (solicitud.estado !== 'activa') {
      return NextResponse.json({ error: 'La solicitud ya no está activa' }, { status: 400 })
    }

    const cat = CATEGORIAS.find(c => c.id === solicitud.categoria)
    const creditos_coste = cat?.creditos_coste || 1

    // Check profesional has enough credits
    const { data: pro, error: proError } = await supabase
      .from('profesionales')
      .select('creditos')
      .eq('id', profesional_id)
      .single()

    if (proError || !pro) {
      return NextResponse.json({ error: 'Profesional no encontrado' }, { status: 404 })
    }

    if (pro.creditos < creditos_coste) {
      return NextResponse.json({
        error: `Créditos insuficientes. Necesitas ${creditos_coste} créditos.`,
        creditos_disponibles: pro.creditos,
        creditos_requeridos: creditos_coste,
      }, { status: 402 })
    }

    // Check if already sent offer for this solicitud
    const { data: existingOffer } = await supabase
      .from('ofertas')
      .select('id')
      .eq('solicitud_id', solicitud_id)
      .eq('profesional_id', profesional_id)
      .single()

    if (existingOffer) {
      return NextResponse.json({ error: 'Ya enviaste una oferta para esta solicitud' }, { status: 409 })
    }

    // Create offer
    const { data: oferta, error: ofertaError } = await supabase
      .from('ofertas')
      .insert({ solicitud_id, profesional_id, descripcion, precio_estimado, creditos_gastados: creditos_coste, estado: 'enviada' })
      .select()
      .single()

    if (ofertaError) throw ofertaError

    // Deduct credits
    await supabase
      .from('profesionales')
      .update({ creditos: pro.creditos - creditos_coste })
      .eq('id', profesional_id)

    // Log transaction
    await supabase
      .from('creditos_transacciones')
      .insert({ profesional_id, cantidad: -creditos_coste, tipo: 'gasto' })

    // Increment offers count
    await supabase
      .from('solicitudes')
      .update({ ofertas_recibidas: supabase.rpc ? undefined : 0 })
      .eq('id', solicitud_id)

    // Return client contact data (now unlocked)
    return NextResponse.json({
      oferta,
      cliente: {
        nombre: solicitud.cliente_nombre,
        telefono: solicitud.cliente_telefono,
        email: solicitud.cliente_email,
      },
      creditos_restantes: pro.creditos - creditos_coste,
    }, { status: 201 })
  } catch (err) {
    console.error('POST /api/ofertas error:', err)
    return NextResponse.json({ error: 'Error al crear oferta' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, estado } = body

    if (!id || !estado) {
      return NextResponse.json({ error: 'Faltan id o estado' }, { status: 400 })
    }

    const supabase = getServiceClient()
    const { data, error } = await supabase
      .from('ofertas')
      .update({ estado })
      .eq('id', id)
      .select('id, estado')
      .single()

    if (error) throw error
    return NextResponse.json({ oferta: data })
  } catch (err) {
    console.error('PATCH /api/ofertas error:', err)
    return NextResponse.json({ error: 'Error al actualizar oferta' }, { status: 500 })
  }
}
