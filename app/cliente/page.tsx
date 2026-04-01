'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, CheckCircle, Clock, MapPin, Star } from 'lucide-react'
import { CATEGORIAS, PROVINCIAS, MOCK_SOLICITUDES } from '@/lib/data'
import AnimatedCounter from '@/components/AnimatedCounter'

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `hace ${mins} min`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `hace ${hrs}h`
  return `hace ${Math.floor(hrs / 24)}d`
}

export default function ClientePage() {
  const router = useRouter()
  const [descripcion, setDescripcion] = useState('')
  const [provincia, setProvincia] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (descripcion) params.set('descripcion', descripcion)
    if (provincia) params.set('provincia', provincia)
    router.push(`/solicitar?${params.toString()}`)
  }

  return (
    <div style={{ background: '#080808', minHeight: '100vh', paddingTop: 64 }}>

      {/* Hero */}
      <section style={{
        padding: '80px 24px 60px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: 'radial-gradient(circle, rgba(0,200,150,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <h1 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(36px, 8vw, 72px)',
          color: '#F5F5F0',
          lineHeight: 1,
          marginBottom: 20,
          position: 'relative',
        }}>
          ¿QUÉ NECESITAS<br />
          <span style={{ background: 'linear-gradient(135deg, #00C896, #0066FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            ARREGLAR HOY?
          </span>
        </h1>
        <p style={{ color: '#888', fontSize: 18, maxWidth: 520, margin: '0 auto 40px' }}>
          Describe tu necesidad y recibe hasta 5 presupuestos gratis de profesionales verificados.
        </p>

        {/* Quick form */}
        <form onSubmit={handleSubmit} style={{ maxWidth: 680, margin: '0 auto 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <textarea
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            placeholder="Describe qué necesitas... (ej: tengo una fuga de agua en el baño)"
            rows={3}
            style={{
              width: '100%', background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14,
              color: '#F5F5F0', fontSize: 15, padding: '16px', resize: 'none', outline: 'none',
              fontFamily: 'Inter, sans-serif', transition: 'border-color 0.2s',
            }}
            onFocus={e => { e.target.style.borderColor = '#00C896' }}
            onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
          />
          <div style={{ display: 'flex', gap: 12 }}>
            <select
              value={provincia}
              onChange={e => setProvincia(e.target.value)}
              style={{
                flex: 1, background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14,
                color: provincia ? '#F5F5F0' : '#555', fontSize: 15, padding: '14px 16px', outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="">Selecciona tu provincia</option>
              {PROVINCIAS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <button type="submit" style={{
              padding: '14px 28px', borderRadius: 14, fontWeight: 700, fontSize: 15,
              background: 'linear-gradient(135deg, #00C896, #00A87A)',
              color: '#fff', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              PEDIR PRESUPUESTO GRATIS <ArrowRight size={16} />
            </button>
          </div>
        </form>

        {/* Trust badges */}
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['✓ Es gratis', '✓ Sin compromiso', '✓ Hasta 5 ofertas', '✓ En minutos'].map(item => (
            <span key={item} style={{ color: '#00C896', fontSize: 13, fontWeight: 600 }}>{item}</span>
          ))}
        </div>
      </section>

      {/* Categories grid */}
      <section style={{ padding: '60px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 36, color: '#F5F5F0', textAlign: 'center', marginBottom: 36 }}>
          Selecciona el tipo de servicio
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
          {CATEGORIAS.map(cat => (
            <Link key={cat.id} href={`/solicitar?categoria=${cat.id}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14,
                padding: '20px 12px', textAlign: 'center', cursor: 'pointer',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,200,150,0.4)'
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
                  ;(e.currentTarget as HTMLElement).style.background = 'rgba(0,200,150,0.05)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                  ;(e.currentTarget as HTMLElement).style.background = '#111'
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>{cat.emoji}</div>
                <div style={{ color: '#F5F5F0', fontSize: 12, fontWeight: 600 }}>{cat.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent solicitudes */}
      <section style={{ padding: '20px 24px 60px', maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 36, color: '#F5F5F0', marginBottom: 8 }}>
          Solicitudes recientes
        </h2>
        <p style={{ color: '#888', fontSize: 14, marginBottom: 28 }}>Profesionales están respondiendo a estas solicitudes ahora mismo</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {MOCK_SOLICITUDES.slice(0, 6).map(sol => (
            <div key={sol.id} style={{
              background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '20px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 20 }}>{sol.emoji}</span>
                  <span style={{ color: '#F5F5F0', fontSize: 13, fontWeight: 600 }}>
                    {CATEGORIAS.find(c => c.id === sol.categoria)?.label}
                  </span>
                </div>
                <span className={`badge-${sol.urgencia === 'urgente' ? 'urgente' : sol.urgencia === 'esta_semana' ? 'semana' : 'sin-prisa'}`}>
                  {sol.urgencia === 'urgente' ? '🔴 Urgente' : sol.urgencia === 'esta_semana' ? '🔵 Esta semana' : '🟢 Sin prisa'}
                </span>
              </div>
              <p style={{ color: '#ccc', fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>
                {sol.descripcion.slice(0, 100)}...
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#888', fontSize: 12 }}>
                  <MapPin size={12} />
                  {sol.ciudad}, {sol.provincia}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#555', fontSize: 11 }}>
                  <Clock size={11} />
                  {timeAgo(sol.created_at)}
                </div>
              </div>
              {sol.ofertas_recibidas > 0 && (
                <div style={{ marginTop: 10, padding: '6px 10px', background: 'rgba(0,200,150,0.06)', borderRadius: 8, color: '#00C896', fontSize: 11, fontWeight: 600 }}>
                  ✓ {sol.ofertas_recibidas} oferta{sol.ofertas_recibidas !== 1 ? 's' : ''} recibida{sol.ofertas_recibidas !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '60px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40 }}>
          <AnimatedCounter target={12840} suffix="+" label="Presupuestos enviados" color="#00C896" />
          <AnimatedCounter target={3200} suffix="+" label="Profesionales activos" color="#0066FF" />
          <AnimatedCounter target={52} label="Provincias cubiertas" color="#00C896" />
          <AnimatedCounter target={4.8} suffix="/5" label="Valoración media" color="#0066FF" />
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" style={{ padding: '80px 24px', maxWidth: 960, margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 42, color: '#F5F5F0', textAlign: 'center', marginBottom: 48 }}>
          ¿Cómo funciona?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          {[
            { n: '1', title: 'Describe tu necesidad', desc: 'Cuéntanos qué necesitas en menos de 2 minutos. Indica tu provincia y nivel de urgencia.', color: '#00C896', emoji: '📝' },
            { n: '2', title: 'Recibe ofertas', desc: 'Los profesionales de tu zona ven tu solicitud y te envían presupuestos detallados.', color: '#0066FF', emoji: '📨' },
            { n: '3', title: 'Elige y contrata', desc: 'Compara, habla con los profesionales y elige el que más te convenza. ¡Sin compromiso!', color: '#00C896', emoji: '✅' },
          ].map(step => (
            <div key={step.n} style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '32px 28px', textAlign: 'center' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: `rgba(${step.color === '#00C896' ? '0,200,150' : '0,102,255'},0.12)`, border: `2px solid ${step.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 24, color: step.color }}>
                {step.n}
              </div>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{step.emoji}</div>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 22, color: '#F5F5F0', marginBottom: 10 }}>{step.title}</h3>
              <p style={{ color: '#888', fontSize: 14, lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link href="/solicitar" className="btn-green" style={{ fontSize: 16, padding: '15px 32px' }}>
            Pedir mi presupuesto gratis <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
