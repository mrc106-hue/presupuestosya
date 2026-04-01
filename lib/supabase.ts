import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

// ─── TypeScript Interfaces ────────────────────────────────────────────────────

export interface Solicitud {
  id: string
  cliente_nombre: string
  cliente_telefono: string
  cliente_email: string
  categoria: string
  descripcion: string
  urgencia: 'urgente' | 'esta_semana' | 'sin_prisa'
  provincia: string
  ciudad?: string
  fotos?: string[]
  estado: 'activa' | 'en_proceso' | 'completada' | 'cancelada'
  ofertas_recibidas: number
  created_at: string
}

export interface Profesional {
  id: string
  nombre: string
  email: string
  telefono?: string
  sectores?: string[]
  provincia?: string
  zonas?: string[]
  descripcion?: string
  foto?: string
  creditos: number
  valoracion_media: number
  total_trabajos: number
  verificado: boolean
  plan: 'gratis' | 'pro'
  stripe_customer_id?: string
  stripe_subscription_id?: string
  created_at: string
}

export interface Oferta {
  id: string
  solicitud_id: string
  profesional_id: string
  descripcion?: string
  precio_estimado?: string
  creditos_gastados: number
  estado: 'enviada' | 'aceptada' | 'rechazada'
  created_at: string
}

export interface CreditoTransaccion {
  id: string
  profesional_id: string
  cantidad: number
  tipo: 'compra' | 'gasto' | 'regalo' | 'reembolso' | 'suscripcion'
  stripe_payment_id?: string
  created_at: string
}

export interface Valoracion {
  id: string
  profesional_id: string
  solicitud_id: string
  puntuacion: number
  comentario?: string
  created_at: string
}

// ─── DB Helpers ───────────────────────────────────────────────────────────────

export async function getSolicitudes(filters?: {
  categoria?: string
  provincia?: string
  urgencia?: string
  estado?: string
}) {
  let query = supabase
    .from('solicitudes')
    .select('*')
    .order('created_at', { ascending: false })

  if (filters?.categoria) query = query.eq('categoria', filters.categoria)
  if (filters?.provincia) query = query.eq('provincia', filters.provincia)
  if (filters?.urgencia)  query = query.eq('urgencia', filters.urgencia)
  if (filters?.estado)    query = query.eq('estado', filters.estado)

  const { data, error } = await query
  if (error) throw error
  return data as Solicitud[]
}

export async function createSolicitud(solicitud: Omit<Solicitud, 'id' | 'created_at' | 'ofertas_recibidas' | 'estado'>) {
  const { data, error } = await supabase
    .from('solicitudes')
    .insert(solicitud)
    .select()
    .single()
  if (error) throw error
  return data as Solicitud
}

export async function getProfesional(id: string) {
  const { data, error } = await supabase
    .from('profesionales')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data as Profesional
}

export async function createOferta(oferta: Omit<Oferta, 'id' | 'created_at' | 'estado'>) {
  const serviceClient = getServiceClient()

  // Deduct credits
  const { data: pro, error: proError } = await serviceClient
    .from('profesionales')
    .select('creditos')
    .eq('id', oferta.profesional_id)
    .single()

  if (proError) throw proError
  if (pro.creditos < oferta.creditos_gastados) {
    throw new Error('Créditos insuficientes')
  }

  // Create offer
  const { data, error } = await serviceClient
    .from('ofertas')
    .insert(oferta)
    .select()
    .single()
  if (error) throw error

  // Deduct credits
  await serviceClient
    .from('profesionales')
    .update({ creditos: pro.creditos - oferta.creditos_gastados })
    .eq('id', oferta.profesional_id)

  // Log transaction
  await serviceClient
    .from('creditos_transacciones')
    .insert({
      profesional_id: oferta.profesional_id,
      cantidad: -oferta.creditos_gastados,
      tipo: 'gasto',
    })

  // Increment solicitud offers count
  await serviceClient.rpc('increment_ofertas', { solicitud_id: oferta.solicitud_id })

  return data as Oferta
}

export async function addCredits(profesionalId: string, cantidad: number, tipo: string, stripePaymentId?: string) {
  const serviceClient = getServiceClient()

  const { data: pro } = await serviceClient
    .from('profesionales')
    .select('creditos')
    .eq('id', profesionalId)
    .single()

  if (!pro) throw new Error('Profesional no encontrado')

  await serviceClient
    .from('profesionales')
    .update({ creditos: pro.creditos + cantidad })
    .eq('id', profesionalId)

  await serviceClient
    .from('creditos_transacciones')
    .insert({
      profesional_id: profesionalId,
      cantidad,
      tipo,
      stripe_payment_id: stripePaymentId,
    })
}
