'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Bell, Clock, Coins, MapPin, Star, TrendingUp, Wrench } from 'lucide-react'
import { CATEGORIAS, MOCK_SOLICITUDES } from '@/lib/data'
import CreditBadge from '@/components/CreditBadge'

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `hace ${mins} min`
  const hrs = Math.floor(mins / 60)
  return hrs < 24 ? `hace ${hrs}h` : `hace ${Math.floor(hrs / 24)}d`
}

const STATS = [
  { label: 'Solicitudes nuevas', value: '14', icon: Bell, color: '#00C896', bg: 'rgba(0,200,150,0.1)' },
  { label: 'Créditos', value: '23', icon: Coins, color: '#0066FF', bg: 'rgba(0,102,255,0.1)' },
  { label: 'Trabajos este mes', value: '7', icon: Wrench, color: '#00C896', bg: 'rgba(0,200,150,0.1)' },
  { label: 'Valoración', value: '4.8 ⭐', icon: Star, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
]

export default function ProfesionalPage() {
  const [activeTab, setActiveTab] = useState<'solicitudes' | 'actividad'>('solicitudes')

  return (
    <div style={{ background: '#080808', minHeight: '100vh', paddingTop: 64 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 40, color: '#F5F5F0', marginBottom: 4 }}>
                Dashboard Profesional
              </h1>
              <p style={{ color: '#888', fontSize: 14 }}>Hola, Carlos · Fontanería & Electricidad · Madrid</p>
            </div>
            <Link href="/creditos" className="btn-blue" style={{ gap: 8 }}>
              <Coins size={16} /> Comprar créditos
            </Link>
          </div>
        </div>

        {/* Stats cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 36 }}>
          {STATS.map(stat => {
            const Icon = stat.icon
            return (
              <div key={stat.label} style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ color: '#888', fontSize: 12, marginBottom: 8 }}>{stat.label}</div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 36, color: stat.color }}>{stat.value}</div>
                  </div>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={20} color={stat.color} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>

          {/* Main feed */}
          <div>
            <div style={{ display: 'flex', gap: 0, marginBottom: 24, background: '#111', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
              {['solicitudes', 'actividad'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab as typeof activeTab)} style={{
                  flex: 1, padding: '12px 20px', fontSize: 14, fontWeight: 600,
                  background: activeTab === tab ? 'rgba(0,200,150,0.1)' : 'transparent',
                  color: activeTab === tab ? '#00C896' : '#888',
                  border: 'none', cursor: 'pointer',
                  borderBottom: activeTab === tab ? '2px solid #00C896' : '2px solid transparent',
                  transition: 'all 0.2s',
                  textTransform: 'capitalize',
                }}>
                  {tab === 'solicitudes' ? 'Solicitudes nuevas' : 'Mi actividad'}
                </button>
              ))}
            </div>

            {activeTab === 'solicitudes' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {MOCK_SOLICITUDES.map(sol => {
                  const cat = CATEGORIAS.find(c => c.id === sol.categoria)
                  const offerColor = sol.ofertas_recibidas === 0 ? '#00C896' : sol.ofertas_recibidas <= 2 ? '#f59e0b' : '#ef4444'
                  return (
                    <div key={sol.id} style={{
                      background: '#111', border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: 16, padding: '20px',
                      transition: 'border-color 0.2s',
                    }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,200,150,0.3)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: 24 }}>{cat?.emoji}</span>
                          <div>
                            <div style={{ color: '#F5F5F0', fontWeight: 600, fontSize: 15 }}>{cat?.label}</div>
                            <div style={{ color: '#888', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                              <MapPin size={11} /> {sol.ciudad}, {sol.provincia}
                              <span style={{ color: '#333' }}>·</span>
                              <Clock size={11} /> {timeAgo(sol.created_at)}
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span className={`badge-${sol.urgencia === 'urgente' ? 'urgente' : sol.urgencia === 'esta_semana' ? 'semana' : 'sin-prisa'}`}>
                            {sol.urgencia === 'urgente' ? 'Urgente' : sol.urgencia === 'esta_semana' ? 'Esta semana' : 'Sin prisa'}
                          </span>
                          <CreditBadge amount={sol.creditos_coste} size="sm" />
                        </div>
                      </div>

                      <p style={{ color: '#ccc', fontSize: 13, lineHeight: 1.6, margin: '14px 0' }}>
                        {sol.descripcion.slice(0, 120)}...
                      </p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: offerColor }}>
                          {sol.ofertas_recibidas === 0 ? '✨ Sin ofertas aún' : `${sol.ofertas_recibidas} oferta${sol.ofertas_recibidas > 1 ? 's' : ''} enviada${sol.ofertas_recibidas > 1 ? 's' : ''}`}
                        </span>
                        <Link href={`/solicitudes`} style={{
                          padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 700,
                          background: 'linear-gradient(135deg, #00C896, #00A87A)',
                          color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
                        }}>
                          Ver solicitud <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {activeTab === 'actividad' && (
              <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '28px', textAlign: 'center' }}>
                <TrendingUp size={40} color="#333" style={{ margin: '0 auto 16px' }} />
                <p style={{ color: '#555', fontSize: 14 }}>Historial de actividad disponible próximamente</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Credit balance */}
            <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '24px' }}>
              <div style={{ color: '#888', fontSize: 12, marginBottom: 8 }}>Saldo de créditos</div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 52, color: '#00C896', lineHeight: 1, marginBottom: 4 }}>
                23
              </div>
              <div style={{ color: '#888', fontSize: 12, marginBottom: 20 }}>créditos disponibles</div>
              <Link href="/creditos" style={{
                display: 'block', textAlign: 'center', padding: '12px 16px', borderRadius: 12,
                background: 'linear-gradient(135deg, #0066FF, #004FCC)',
                color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 14,
              }}>
                Comprar más créditos
              </Link>
              <Link href="/creditos#pro" style={{
                display: 'block', textAlign: 'center', padding: '10px 16px', borderRadius: 12, marginTop: 8,
                border: '1px solid rgba(0,200,150,0.3)', color: '#00C896',
                textDecoration: 'none', fontWeight: 600, fontSize: 13,
              }}>
                Plan Pro — 40cr/mes
              </Link>
            </div>

            {/* Recent activity */}
            <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '24px' }}>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 18, color: '#F5F5F0', marginBottom: 16 }}>
                Actividad reciente
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { text: 'Oferta enviada — Fontanería en Madrid', creditos: -2, time: 'hace 2h' },
                  { text: 'Créditos comprados — Pack Estándar', creditos: +25, time: 'hace 1d' },
                  { text: 'Oferta enviada — Reformas en Alcobendas', creditos: -5, time: 'hace 2d' },
                  { text: 'Bienvenida — 5 créditos de regalo', creditos: +5, time: 'hace 5d' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <div>
                      <p style={{ color: '#ccc', fontSize: 12, lineHeight: 1.4 }}>{item.text}</p>
                      <p style={{ color: '#555', fontSize: 11 }}>{item.time}</p>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: item.creditos > 0 ? '#00C896' : '#ef4444', whiteSpace: 'nowrap' }}>
                      {item.creditos > 0 ? '+' : ''}{item.creditos} cr
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* FixPro promo */}
            <div style={{ background: 'rgba(0,102,255,0.08)', border: '1px solid rgba(0,102,255,0.2)', borderRadius: 16, padding: '20px' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>💼</div>
              <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 18, color: '#F5F5F0', marginBottom: 8 }}>
                FixPro CRM
              </h4>
              <p style={{ color: '#888', fontSize: 12, lineHeight: 1.5, marginBottom: 14 }}>
                Gestiona tus clientes, facturas y presupuestos con nuestro CRM para autónomos.
              </p>
              <Link href="https://fixpro.up.railway.app" target="_blank" style={{
                display: 'block', textAlign: 'center', padding: '10px 14px', borderRadius: 10,
                background: 'linear-gradient(135deg, #0066FF, #004FCC)',
                color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 13,
              }}>
                Probar FixPro gratis
              </Link>
            </div>
          </div>
        </div>

        {/* Pro plan CTA */}
        <div style={{
          marginTop: 40, padding: '40px', borderRadius: 20,
          background: 'linear-gradient(135deg, rgba(0,102,255,0.12), rgba(0,200,150,0.08))',
          border: '1px solid rgba(0,102,255,0.25)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20,
        }}>
          <div>
            <div style={{ color: '#0066FF', fontWeight: 700, fontSize: 12, marginBottom: 8, letterSpacing: 1 }}>PLAN PRO MENSUAL</div>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 32, color: '#F5F5F0', marginBottom: 8 }}>
              40 créditos cada mes por 29,99€
            </h3>
            <p style={{ color: '#888', fontSize: 14 }}>+ Badge verificado + Prioridad en el feed + Estadísticas avanzadas</p>
          </div>
          <Link href="/creditos#pro" className="btn-blue" style={{ fontSize: 16, padding: '15px 28px' }}>
            Activar Plan Pro <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}
