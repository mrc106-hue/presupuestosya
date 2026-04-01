export const CATEGORIAS = [
  { id: 'fontaneria',    label: 'Fontanería',       emoji: '🔧', creditos_coste: 2 },
  { id: 'electricidad',  label: 'Electricidad',      emoji: '⚡', creditos_coste: 2 },
  { id: 'reformas',      label: 'Reformas',          emoji: '🏗️', creditos_coste: 5 },
  { id: 'carpinteria',   label: 'Carpintería',       emoji: '🪵', creditos_coste: 3 },
  { id: 'cerrajeria',    label: 'Cerrajería',        emoji: '🔑', creditos_coste: 2 },
  { id: 'informatica',   label: 'Informática',       emoji: '💻', creditos_coste: 2 },
  { id: 'climatizacion', label: 'Climatización',     emoji: '❄️', creditos_coste: 3 },
  { id: 'pintura',       label: 'Pintura',           emoji: '🎨', creditos_coste: 2 },
  { id: 'jardineria',    label: 'Jardinería',        emoji: '🌿', creditos_coste: 2 },
  { id: 'mudanzas',      label: 'Mudanzas',          emoji: '📦', creditos_coste: 3 },
  { id: 'limpieza',      label: 'Limpieza',          emoji: '🧹', creditos_coste: 1 },
  { id: 'mecanica',      label: 'Mecánica',          emoji: '🚗', creditos_coste: 3 },
  { id: 'instalaciones', label: 'Instalaciones',     emoji: '🔌', creditos_coste: 2 },
  { id: 'diseno-web',    label: 'Diseño Web',        emoji: '🌐', creditos_coste: 3 },
  { id: 'contabilidad',  label: 'Contabilidad',      emoji: '📊', creditos_coste: 3 },
  { id: 'fotografia',    label: 'Fotografía',        emoji: '📷', creditos_coste: 2 },
  { id: 'clases',        label: 'Clases',            emoji: '📚', creditos_coste: 1 },
  { id: 'otros',         label: 'Otros',             emoji: '✨', creditos_coste: 1 },
]

export const PROVINCIAS = [
  'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila',
  'Badajoz', 'Islas Baleares', 'Barcelona', 'Burgos',
  'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ceuta', 'Ciudad Real', 'Córdoba', 'Cuenca',
  'Girona', 'Granada', 'Guadalajara', 'Guipúzcoa',
  'Huelva', 'Huesca',
  'Jaén',
  'La Coruña', 'La Rioja', 'Las Palmas', 'León', 'Lleida', 'Lugo',
  'Madrid', 'Málaga', 'Melilla', 'Murcia',
  'Navarra',
  'Orense',
  'Palencia', 'Pontevedra',
  'Salamanca', 'Santa Cruz de Tenerife', 'Segovia', 'Sevilla', 'Soria',
  'Tarragona', 'Teruel', 'Toledo',
  'Valencia', 'Valladolid', 'Vizcaya',
  'Zamora', 'Zaragoza',
]

export const PACKS_CREDITOS = [
  { id: 'pack10',  creditos: 10,  precio: 9.99,  label: 'Pack Básico',      popular: false, suscripcion: false },
  { id: 'pack25',  creditos: 25,  precio: 19.99, label: 'Pack Estándar',    popular: true,  suscripcion: false },
  { id: 'pack60',  creditos: 60,  precio: 39.99, label: 'Pack Pro',         popular: false, suscripcion: false },
  { id: 'pack150', creditos: 150, precio: 79.99, label: 'Pack Elite',       popular: false, suscripcion: false },
  { id: 'pro',     creditos: 40,  precio: 29.99, label: 'Plan Pro Mensual', popular: false, suscripcion: true  },
]

export interface MockSolicitud {
  id: string
  categoria: string
  emoji: string
  descripcion: string
  provincia: string
  ciudad: string
  urgencia: 'urgente' | 'esta_semana' | 'sin_prisa'
  ofertas_recibidas: number
  created_at: string
  creditos_coste: number
}

export const MOCK_SOLICITUDES: MockSolicitud[] = [
  {
    id: '1',
    categoria: 'fontaneria',
    emoji: '🔧',
    descripcion: 'Tengo una fuga de agua debajo del fregadero de la cocina. Gotea constantemente y ya tengo manchas de humedad en el mueble inferior. Necesito arreglarlo lo antes posible.',
    provincia: 'Madrid',
    ciudad: 'Alcobendas',
    urgencia: 'urgente',
    ofertas_recibidas: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    creditos_coste: 2,
  },
  {
    id: '2',
    categoria: 'electricidad',
    emoji: '⚡',
    descripcion: 'Se me ha ido la luz en toda la habitación principal y el pasillo. Los fusibles están bien, creo que es un problema con el cableado interno. Piso de 90m2 en planta 4.',
    provincia: 'Barcelona',
    ciudad: 'L\'Hospitalet',
    urgencia: 'esta_semana',
    ofertas_recibidas: 1,
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    creditos_coste: 2,
  },
  {
    id: '3',
    categoria: 'reformas',
    emoji: '🏗️',
    descripcion: 'Quiero reformar el baño completo. Cambio de alicatado, plato de ducha nuevo en vez de bañera, nuevo inodoro y lavabo. El baño mide aproximadamente 5m2.',
    provincia: 'Valencia',
    ciudad: 'Paterna',
    urgencia: 'sin_prisa',
    ofertas_recibidas: 4,
    created_at: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    creditos_coste: 5,
  },
  {
    id: '4',
    categoria: 'climatizacion',
    emoji: '❄️',
    descripcion: 'Necesito instalar un aire acondicionado tipo split en el salón y en dos dormitorios. El piso tiene 110m2 y es de construcción moderna con buena orientación.',
    provincia: 'Sevilla',
    ciudad: 'Dos Hermanas',
    urgencia: 'esta_semana',
    ofertas_recibidas: 3,
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    creditos_coste: 3,
  },
  {
    id: '5',
    categoria: 'mudanzas',
    emoji: '📦',
    descripcion: 'Mudanza de piso completo. Tenemos 3 dormitorios con muebles grandes, cocina equipada y bastante ropa y cajas. El origen es Madrid centro y el destino Getafe.',
    provincia: 'Madrid',
    ciudad: 'Madrid Centro',
    urgencia: 'esta_semana',
    ofertas_recibidas: 0,
    created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    creditos_coste: 3,
  },
  {
    id: '6',
    categoria: 'diseno-web',
    emoji: '🌐',
    descripcion: 'Necesito una web para mi negocio de fotografía. Quiero un portfolio moderno, formulario de contacto, galería de fotos con lightbox y versión responsive. Tengo dominio propio.',
    provincia: 'Málaga',
    ciudad: 'Marbella',
    urgencia: 'sin_prisa',
    ofertas_recibidas: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    creditos_coste: 3,
  },
  {
    id: '7',
    categoria: 'pintura',
    emoji: '🎨',
    descripcion: 'Pintura completa de piso de 85m2. Salón, 3 habitaciones, cocina, baño y pasillo. Las paredes tienen alguna grieta pequeña que también habría que rellenar antes de pintar.',
    provincia: 'Zaragoza',
    ciudad: 'Zaragoza',
    urgencia: 'sin_prisa',
    ofertas_recibidas: 1,
    created_at: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    creditos_coste: 2,
  },
  {
    id: '8',
    categoria: 'cerrajeria',
    emoji: '🔑',
    descripcion: 'Se me ha quedado la llave dentro de casa y estoy en la puerta. Necesito un cerrajero urgente en zona Chamberí Madrid. El piso es un 5º sin ascensor.',
    provincia: 'Madrid',
    ciudad: 'Chamberí',
    urgencia: 'urgente',
    ofertas_recibidas: 0,
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    creditos_coste: 2,
  },
]

export const MOCK_FEED_ACTIVITY = [
  { id: 'a1', emoji: '🔧', text: 'Carlos G. solicitó fontanero en Madrid', provincia: 'Madrid', time: 'hace 2 min' },
  { id: 'a2', emoji: '⚡', text: 'Electricistas Pro respondió a una solicitud', provincia: 'Barcelona', time: 'hace 3 min' },
  { id: 'a3', emoji: '🏗️', text: 'Ana M. publicó reforma de baño completo', provincia: 'Sevilla', time: 'hace 5 min' },
  { id: 'a4', emoji: '❄️', text: 'TecnoClima envió presupuesto de climatización', provincia: 'Valencia', time: 'hace 7 min' },
  { id: 'a5', emoji: '📦', text: 'Luis R. necesita empresa de mudanzas urgente', provincia: 'Madrid', time: 'hace 9 min' },
  { id: 'a6', emoji: '🎨', text: 'Pintores Málaga ganó un trabajo nuevo', provincia: 'Málaga', time: 'hace 11 min' },
  { id: 'a7', emoji: '💻', text: 'Pedro F. solicita técnico informático a domicilio', provincia: 'Bilbao', time: 'hace 13 min' },
  { id: 'a8', emoji: '🔑', text: 'Cerrajero 24h respondió en menos de 5 min', provincia: 'Madrid', time: 'hace 15 min' },
  { id: 'a9', emoji: '🌿', text: 'María T. busca jardinero para jardín de 200m2', provincia: 'Zaragoza', time: 'hace 18 min' },
  { id: 'a10', emoji: '📊', text: 'Gestoría Express captó nuevo cliente empresarial', provincia: 'Madrid', time: 'hace 20 min' },
]
