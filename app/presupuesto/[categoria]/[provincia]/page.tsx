import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, MapPin, Star } from 'lucide-react'
import { CATEGORIAS, PROVINCIAS, MOCK_SOLICITUDES } from '@/lib/data'

interface PageProps {
  params: { categoria: string; provincia: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cat = CATEGORIAS.find(c => c.id === params.categoria)
  const prov = decodeURIComponent(params.provincia)
  const catLabel = cat?.label || params.categoria

  return {
    title: `Presupuesto de ${catLabel} en ${prov} | PresupuestosYa`,
    description: `Pide presupuesto gratis de ${catLabel} en ${prov}. Recibe hasta 5 ofertas de profesionales verificados en minutos. Compara y elige el mejor.`,
    openGraph: {
      title: `Presupuesto de ${catLabel} en ${prov}`,
      description: `Conectamos clientes con los mejores profesionales de ${catLabel} en ${prov}.`,
    },
  }
}

export async function generateStaticParams() {
  const params = []
  for (const cat of CATEGORIAS.slice(0, 5)) {
    for (const prov of PROVINCIAS.slice(0, 10)) {
      params.push({
        categoria: cat.id,
        provincia: encodeURIComponent(prov),
      })
    }
  }
  return params
}

export default function PresupuestoCategoriaPage({ params }: PageProps) {
  const cat = CATEGORIAS.find(c => c.id === params.categoria)
  const prov = decodeURIComponent(params.provincia)
  const relatedSolicitudes = MOCK_SOLICITUDES.filter(s => s.categoria === params.categoria).slice(0, 3)

  if (!cat) {
    return (
      <div style={{ background: '#080808', minHeight: '100vh', paddingTop: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#888', fontSize: 18, marginBottom: 16 }}>Categoría no encontrada</p>
          <Link href="/solicitar" className="btn-green">Ver todas las categorías</Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#080808', minHeight: '100vh', paddingTop: 64 }}>
      {/* Hero */}
      <section style={{ padding: '80px 24px 60px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
            <MapPin size={14} color="#888" />
            <span style={{ color: '#888', fontSize: 13 }}>
              <Link href="/" style={{ color: '#888', textDecoration: 'none' }}>Inicio</Link>
              {' / '}
              <Link href={`/solicitar?categoria=${cat.id}`} style={{ color: '#888', textDecoration: 'none' }}>{cat.label}</Link>
              {' / '}
              <span style={{ color: '#F5F5F0' }}>{prov}</span>
            </span>
          </div>

          <div style={{ fontSize: 64, marginBottom: 16 }}>{cat.emoji}</div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 52, color: '#F5F5F0', marginBottom: 16 }}>
            Presupuesto de {cat.label} en {prov}
          </h1>
          <p style={{ color: '#888', fontSize: 17, marginBottom: 32, lineHeight: 1.7 }}>
            Pide presupuesto gratis de {cat.label} en {prov}. Conectamos con los mejores profesionales de tu zona.
            Recibe hasta 5 ofertas comparativas en minutos.
          </p>

          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
            {[
              { n: '142+', label: `Profesionales en ${prov}` },
              { n: '4.8★', label: 'Valoración media' },
              { n: '< 15min', label: 'Tiempo respuesta' },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#00C896' }}>{stat.n}</div>
                <div style={{ color: '#888', fontSize: 12 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <Link href={`/solicitar?categoria=${cat.id}&provincia=${encodeURIComponent(prov)}`} style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '16px 36px', borderRadius: 14, fontWeight: 700, fontSize: 16,
            background: 'linear-gradient(135deg, #00C896, #00A87A)',
            color: '#fff', textDecoration: 'none',
            boxShadow: '0 8px 30px rgba(0,200,150,0.25)',
          }}>
            Pedir presupuesto gratis en {prov} <ArrowRight size={18} />
          </Link>
          <p style={{ color: '#555', fontSize: 12, marginTop: 12 }}>Gratis · Sin compromiso · Hasta 5 ofertas</p>
        </div>
      </section>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 24px' }}>
        {/* Why use us */}
        <section style={{ marginBottom: 60 }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 38, color: '#F5F5F0', marginBottom: 28, textAlign: 'center' }}>
            ¿Por qué usar PresupuestosYa para {cat.label} en {prov}?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
            {[
              { icon: '💰', title: 'Gratis para clientes', desc: `Publicar tu solicitud de ${cat.label} en ${prov} es completamente gratis. Sin costes ocultos.` },
              { icon: '⚡', title: 'Respuestas rápidas', desc: 'Los profesionales de tu zona reciben tu solicitud al instante y responden en minutos.' },
              { icon: '🛡️', title: 'Profesionales verificados', desc: `Todos los ${cat.label.toLowerCase()}s de ${prov} han pasado nuestro proceso de verificación.` },
              { icon: '📊', title: 'Compara con libertad', desc: 'Recibe hasta 5 presupuestos y elige el que mejor se adapta a ti. Sin presión.' },
            ].map(item => (
              <div key={item.title} style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '28px 24px' }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{item.icon}</div>
                <h3 style={{ color: '#F5F5F0', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ color: '#888', fontSize: 13, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recent requests in this area */}
        {relatedSolicitudes.length > 0 && (
          <section style={{ marginBottom: 60 }}>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 38, color: '#F5F5F0', marginBottom: 8 }}>
              Solicitudes recientes de {cat.label}
            </h2>
            <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>Estos son ejemplos de trabajos que se solicitan en la plataforma</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {relatedSolicitudes.map(sol => (
                <div key={sol.id} style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <span className={`badge-${sol.urgencia === 'urgente' ? 'urgente' : sol.urgencia === 'esta_semana' ? 'semana' : 'sin-prisa'}`}>
                      {sol.urgencia === 'urgente' ? '🔴 Urgente' : sol.urgencia === 'esta_semana' ? '🔵 Esta semana' : '🟢 Sin prisa'}
                    </span>
                    {sol.ofertas_recibidas > 0 && (
                      <span style={{ color: '#00C896', fontSize: 12, fontWeight: 600 }}>
                        ✓ {sol.ofertas_recibidas} oferta{sol.ofertas_recibidas > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  <p style={{ color: '#ccc', fontSize: 13, lineHeight: 1.6 }}>
                    {sol.descripcion.slice(0, 120)}...
                  </p>
                  <div style={{ marginTop: 10, color: '#555', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <MapPin size={11} /> {sol.ciudad}, {sol.provincia}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section style={{
          background: 'linear-gradient(135deg, rgba(0,200,150,0.08), rgba(0,102,255,0.06))',
          border: '1px solid rgba(0,200,150,0.2)',
          borderRadius: 20, padding: '48px', textAlign: 'center',
        }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 40, color: '#F5F5F0', marginBottom: 12 }}>
            ¿Necesitas un {cat.label.toLowerCase()} en {prov}?
          </h2>
          <p style={{ color: '#888', fontSize: 16, marginBottom: 28 }}>
            Publica tu solicitud ahora y recibe presupuestos gratuitos en minutos.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              <CheckCircle key="1" size={14} color="#00C896" />,
              <CheckCircle key="2" size={14} color="#00C896" />,
              <CheckCircle key="3" size={14} color="#00C896" />,
            ].map((_, i) => null)}
            {['Es completamente gratis', 'Hasta 5 presupuestos', 'Profesionales verificados'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#ccc', fontSize: 14 }}>
                <CheckCircle size={14} color="#00C896" /> {item}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <Link href={`/solicitar?categoria=${cat.id}&provincia=${encodeURIComponent(prov)}`} style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '16px 36px', borderRadius: 14, fontWeight: 700, fontSize: 16,
              background: 'linear-gradient(135deg, #00C896, #00A87A)',
              color: '#fff', textDecoration: 'none',
            }}>
              Pedir mi presupuesto gratis <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
