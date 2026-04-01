import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const categoria = searchParams.get('categoria')
    const provincia = searchParams.get('provincia')
    const urgencia = searchParams.get('urgencia')
    const estado = searchParams.get('estado') || 'activa'

    const supabase = getServiceClient()
    let query = supabase
      .from('solicitudes')
      .select('id, categoria, descripcion, urgencia, provincia, ciudad, estado, ofertas_recibidas, created_at')
      .order('created_at', { ascending: false })
      .limit(50)

    if (categoria) query = query.eq('categoria', categoria)
    if (provincia) query = query.eq('provincia', provincia)
    if (urgencia)  query = query.eq('urgencia', urgencia)
    if (estado)    query = query.eq('estado', estado)

    const { data, error } = await query
    if (error) throw error

    return NextResponse.json({ solicitudes: data })
  } catch (err) {
    console.error('GET /api/solicitudes error:', err)
    return NextResponse.json({ error: 'Error al obtener solicitudes' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { categoria, descripcion, urgencia, provincia, ciudad, nombre, telefono, email } = body

    if (!categoria || !descripcion || !provincia || !nombre || !telefono || !email) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    const supabase = getServiceClient()
    const { data, error } = await supabase
      .from('solicitudes')
      .insert({
        categoria,
        descripcion,
        urgencia: urgencia || 'sin_prisa',
        provincia,
        ciudad,
        cliente_nombre: nombre,
        cliente_telefono: telefono,
        cliente_email: email,
        estado: 'activa',
        ofertas_recibidas: 0,
      })
      .select('id, categoria, provincia, urgencia, created_at')
      .single()

    if (error) throw error

    return NextResponse.json({ solicitud: data }, { status: 201 })
  } catch (err) {
    console.error('POST /api/solicitudes error:', err)
    return NextResponse.json({ error: 'Error al crear solicitud' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, estado } = body

    if (!id || !estado) {
      return NextResponse.json({ error: 'Faltan id o estado' }, { status: 400 })
    }

    const validStates = ['activa', 'en_proceso', 'completada', 'cancelada']
    if (!validStates.includes(estado)) {
      return NextResponse.json({ error: 'Estado inválido' }, { status: 400 })
    }

    const supabase = getServiceClient()
    const { data, error } = await supabase
      .from('solicitudes')
      .update({ estado })
      .eq('id', id)
      .select('id, estado')
      .single()

    if (error) throw error
    return NextResponse.json({ solicitud: data })
  } catch (err) {
    console.error('PATCH /api/solicitudes error:', err)
    return NextResponse.json({ error: 'Error al actualizar solicitud' }, { status: 500 })
  }
}
