import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getDb() {
  return createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_SERVICE_KEY || '')
}

export async function GET(req: NextRequest) {
  try {
    const db = getDb()
    const provincia = req.nextUrl.searchParams.get('provincia')
    const categoria = req.nextUrl.searchParams.get('categoria')
    const estado = req.nextUrl.searchParams.get('estado') || 'activa'

    let query = db.from('solicitudes').select('*').eq('estado', estado).order('created_at', { ascending: false })
    if (provincia) query = query.eq('provincia', provincia)
    if (categoria) query = query.eq('categoria', categoria)

    const { data, error } = await query.limit(50)
    if (error) throw error

    // Remove contact info for professional view
    const sanitized = (data || []).map(s => ({
      ...s,
      cliente_telefono: '***',
      cliente_email: '***',
      descripcion: s.descripcion.substring(0, 200) + (s.descripcion.length > 200 ? '...' : ''),
    }))

    return NextResponse.json(sanitized)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { cliente_nombre, cliente_telefono, cliente_email, categoria, descripcion, urgencia, provincia, ciudad, fotos } = body

    if (!cliente_nombre || !cliente_telefono || !cliente_email || !categoria || !descripcion || !provincia) {
      return NextResponse.json({ error: 'Campos obligatorios: nombre, teléfono, email, categoría, descripción, provincia' }, { status: 400 })
    }

    const db = getDb()
    const { data, error } = await db.from('solicitudes').insert({
      cliente_nombre, cliente_telefono, cliente_email,
      categoria, descripcion, urgencia: urgencia || 'sin_prisa',
      provincia, ciudad: ciudad || null, fotos: fotos || [],
    }).select().single()

    if (error) throw error

    return NextResponse.json({ ok: true, solicitud: data }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
