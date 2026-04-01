'use client'

import { useState } from 'react'
import { Clock, Filter, MapPin, X, Loader2, CheckCircle } from 'lucide-react'
import { CATEGORIAS, PROVINCIAS, MOCK_SOLICITUDES, MockSolicitud } from '@/lib/data'
import CreditBadge from '@/components/CreditBadge'

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `hace ${mins} min`
  const hrs = Math.floor(mins / 60)
  return hrs < 24 ? `hace ${hrs}h` : `hace ${Math.floor(hrs / 24)}d`
}

function OfferModal({ sol, onClose }: { sol: MockSolicitud; onClose: () => void }) {
  const [oferta, setOferta] = useState('')
  const [precio, setPrecio] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const cat = CATEGORIAS.find(c => c.id === sol.categoria)

  const handleSend = async () => {
    if (!oferta.trim()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSent(true)
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
      zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{
        background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20,
        padding: '32px', maxWidth: 560, width: '100%', maxHeight: '90vh', overflow: 'auto',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 26, color: '#F5F5F0' }}>
            Enviar presupuesto
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(0,200,150,0.1)', border: '2px solid #00C896', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle size={36} color="#00C896" />
            </div>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#F5F5F0', marginBottom: 8 }}>¡Presupuesto enviado!</h3>
            <p style={{ color: '#888', fontSize: 14, marginBottom: 8 }}>Se han descontado <strong style={{ color: '#00C896' }}>{sol.creditos_coste} créditos</strong> de tu saldo.</p>
            <p style={{ color: '#555', fontSize: 13, marginBottom: 24 }}>El cliente recibirá tu propuesta y podrá contactarte directamente.</p>

            {/* Show client contact */}
            <div style={{ background: '#0D0D0D', borderRadius: 12, padding: '16px', marginBottom: 20, textAlign: 'left' }}>
              <p style={{ color: '#888', fontSize: 11, marginBottom: 8, fontWeight: 600, letterSpacing: 1 }}>DATOS DEL CLIENTE</p>
              <p style={{ color: '#F5F5F0', fontSize: 14 }}>📱 612 345 678</p>
              <p style={{ color: '#F5F5F0', fontSize: 14 }}>📧 cliente@example.com</p>
            </div>
            <button onClick={onClose} style={{ padding: '12px 28px', borderRadius: 12, background: 'linear-gradient(135deg,#00C896,#00A87A)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>
              Cerrar
            </button>
          </div>
        ) : (
          <>
            {/* Solicitud summary */}
            <div style={{ background: '#0D0D0D', borderRadius: 14, padding: '20px', marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 22 }}>{cat?.emoji}</span>
                <div>
                  <span style={{ color: '#F5F5F0', fontWeight: 600, fontSize: 15 }}>{cat?.label}</span>
                  <div style={{ color: '#888', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <MapPin size={11} /> {sol.ciudad}, {sol.provincia}
                  </div>
                </div>
                <span className={`badge-${sol.urgencia === 'urgente' ? 'urgente' : sol.urgencia === 'esta_semana' ? 'semana' : 'sin-prisa'}`} style={{ marginLeft: 'auto' }}>
                  {sol.urgencia === 'urgente' ? 'Urgente' : sol.urgencia === 'esta_semana' ? 'Esta semana' : 'Sin prisa'}
                </span>
              </div>
              <p style={{ color: '#ccc', fontSize: 13, lineHeight: 1.6 }}>{sol.descripcion}</p>
            </div>

            {/* Offer form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ color: '#ccc', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Tu propuesta *</label>
                <textarea
                  value={oferta}
                  onChange={e => setOferta(e.target.value)}
                  placeholder="Describe cómo puedes ayudar, tu experiencia, plazos estimados..."
                  rows={4}
                  style={{ width: '100%', background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#F5F5F0', fontSize: 14, padding: '14px', resize: 'vertical', outline: 'none', fontFamily: 'Inter, sans-serif' }}
                  onFocus={e => { e.target.style.borderColor = '#00C896' }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
                />
              </div>
              <div>
                <label style={{ color: '#ccc', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Precio estimado</label>
                <input
                  type="text"
                  value={precio}
                  onChange={e => setPrecio(e.target.value)}
                  placeholder="Ej: 150€ - 200€ (materiales incluidos)"
                  style={{ width: '100%', background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#F5F5F0', fontSize: 14, padding: '13px 14px', outline: 'none' }}
                  onFocus={e => { e.target.style.borderColor = '#00C896' }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
                />
              </div>

              <div style={{ background: 'rgba(0,200,150,0.05)', border: '1px solid rgba(0,200,150,0.15)', borderRadius: 12, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#888', fontSize: 13 }}>Coste de esta solicitud</span>
                <CreditBadge amount={sol.creditos_coste} size="md" />
              </div>

              <button onClick={handleSend} disabled={loading || !oferta.trim()} style={{
                padding: '14px 24px', borderRadius: 12, fontWeight: 700, fontSize: 15,
                background: 'linear-gradient(135deg, #00C896, #00A87A)',
                color: '#fff', border: 'none', cursor: loading || !oferta.trim() ? 'not-allowed' : 'pointer',
                opacity: !oferta.trim() ? 0.5 : 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                {loading
                  ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Enviando...</>
                  : <>Confirmar — gasta {sol.creditos_coste} créditos</>
                }
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function SolicitudesPage() {
  const [filters, setFilters] = useState({ categoria: '', provincia: '', urgencia: '', maxCreditos: 10 })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedSol, setSelectedSol] = useState<MockSolicitud | null>(null)

  const filtered = MOCK_SOLICITUDES.filter(s => {
    if (filters.categoria && s.categoria !== filters.categoria) return false
    if (filters.provincia && s.provincia !== filters.provincia) return false
    if (filters.urgencia && s.urgencia !== filters.urgencia) return false
    if (s.creditos_coste > filters.maxCreditos) return false
    return true
  })

  const offerColor = (n: number) => n === 0 ? '#00C896' : n <= 2 ? '#f59e0b' : '#ef4444'

  return (
    <div style={{ background: '#080808', minHeight: '100vh', paddingTop: 64 }}>
      {selectedSol && <OfferModal sol={selectedSol} onClose={() => setSelectedSol(null)} />}

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 40, color: '#F5F5F0', marginBottom: 4 }}>
              Solicitudes disponibles
            </h1>
            <p style={{ color: '#888', fontSize: 14 }}>{filtered.length} solicitudes en tu zona</p>
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
            padding: '10px 18px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)',
            color: '#F5F5F0', background: 'transparent', cursor: 'pointer', fontSize: 14, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <Filter size={16} /> Filtros
            {(filters.categoria || filters.provincia || filters.urgencia) && (
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00C896', display: 'inline-block' }} />
            )}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: sidebarOpen ? '260px 1fr' : '1fr', gap: 24 }}>

          {/* Sidebar filters */}
          {sidebarOpen && (
            <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '24px', height: 'fit-content' }}>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 20, color: '#F5F5F0', marginBottom: 20 }}>
                Filtros
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Categoria */}
                <div>
                  <label style={{ color: '#ccc', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 8 }}>CATEGORÍA</label>
                  <select value={filters.categoria} onChange={e => setFilters(f => ({ ...f, categoria: e.target.value }))} style={{
                    width: '100%', background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10,
                    color: '#F5F5F0', fontSize: 13, padding: '10px 12px', outline: 'none', cursor: 'pointer',
                  }}>
                    <option value="">Todas las categorías</option>
                    {CATEGORIAS.map(c => <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>)}
                  </select>
                </div>

                {/* Provincia */}
                <div>
                  <label style={{ color: '#ccc', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 8 }}>PROVINCIA</label>
                  <select value={filters.provincia} onChange={e => setFilters(f => ({ ...f, provincia: e.target.value }))} style={{
                    width: '100%', background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10,
                    color: '#F5F5F0', fontSize: 13, padding: '10px 12px', outline: 'none', cursor: 'pointer',
                  }}>
                    <option value="">Todas las provincias</option>
                    {PROVINCIAS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>

                {/* Urgencia */}
                <div>
                  <label style={{ color: '#ccc', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 8 }}>URGENCIA</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {[
                      { v: '', label: 'Todas' },
                      { v: 'urgente', label: '🔴 Urgente' },
                      { v: 'esta_semana', label: '🔵 Esta semana' },
                      { v: 'sin_prisa', label: '🟢 Sin prisa' },
                    ].map(opt => (
                      <button key={opt.v} onClick={() => setFilters(f => ({ ...f, urgencia: opt.v }))} style={{
                        padding: '8px 12px', borderRadius: 8, border: `1px solid ${filters.urgencia === opt.v ? '#00C896' : 'rgba(255,255,255,0.08)'}`,
                        background: filters.urgencia === opt.v ? 'rgba(0,200,150,0.08)' : 'transparent',
                        color: filters.urgencia === opt.v ? '#00C896' : '#888', cursor: 'pointer', fontSize: 13, textAlign: 'left',
                      }}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Max credits */}
                <div>
                  <label style={{ color: '#ccc', fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 8 }}>
                    MÁX. CRÉDITOS: <span style={{ color: '#00C896' }}>{filters.maxCreditos}</span>
                  </label>
                  <input type="range" min={1} max={10} value={filters.maxCreditos} onChange={e => setFilters(f => ({ ...f, maxCreditos: Number(e.target.value) }))}
                    style={{ width: '100%', accentColor: '#00C896' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555', fontSize: 11, marginTop: 4 }}>
                    <span>1 cr</span><span>10 cr</span>
                  </div>
                </div>

                {/* Reset */}
                <button onClick={() => setFilters({ categoria: '', provincia: '', urgencia: '', maxCreditos: 10 })} style={{
                  padding: '8px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)',
                  color: '#888', background: 'transparent', cursor: 'pointer', fontSize: 13,
                }}>
                  Limpiar filtros
                </button>
              </div>
            </div>
          )}

          {/* Cards grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 24px', background: '#111', borderRadius: 16, border: '1px solid rgba(255,255,255,0.07)' }}>
                <p style={{ color: '#555', fontSize: 16 }}>No hay solicitudes con estos filtros</p>
                <button onClick={() => setFilters({ categoria: '', provincia: '', urgencia: '', maxCreditos: 10 })} style={{ marginTop: 16, color: '#00C896', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
                  Ver todas las solicitudes
                </button>
              </div>
            ) : filtered.map(sol => {
              const cat = CATEGORIAS.find(c => c.id === sol.categoria)
              return (
                <div key={sol.id} style={{
                  background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '22px',
                  transition: 'border-color 0.2s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,200,150,0.25)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 26 }}>{cat?.emoji}</span>
                      <div>
                        <div style={{ color: '#F5F5F0', fontWeight: 600, fontSize: 16 }}>{cat?.label}</div>
                        <div style={{ color: '#888', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                          <MapPin size={11} /> {sol.ciudad ? `${sol.ciudad}, ` : ''}{sol.provincia}
                          <span style={{ color: '#333' }}>·</span>
                          <Clock size={11} /> {timeAgo(sol.created_at)}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className={`badge-${sol.urgencia === 'urgente' ? 'urgente' : sol.urgencia === 'esta_semana' ? 'semana' : 'sin-prisa'}`}>
                        {sol.urgencia === 'urgente' ? '🔴 Urgente' : sol.urgencia === 'esta_semana' ? '🔵 Esta semana' : '🟢 Sin prisa'}
                      </span>
                      <CreditBadge amount={sol.creditos_coste} size="sm" />
                    </div>
                  </div>

                  <p style={{ color: '#bbb', fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>
                    {sol.descripcion.slice(0, 100)}...
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: offerColor(sol.ofertas_recibidas) }}>
                      {sol.ofertas_recibidas === 0
                        ? '✨ Primero en responder'
                        : `${sol.ofertas_recibidas} oferta${sol.ofertas_recibidas > 1 ? 's' : ''} enviada${sol.ofertas_recibidas > 1 ? 's' : ''}`
                      }
                    </span>
                    <button onClick={() => setSelectedSol(sol)} style={{
                      padding: '9px 20px', borderRadius: 10, fontSize: 13, fontWeight: 700,
                      background: 'linear-gradient(135deg, #00C896, #00A87A)',
                      color: '#fff', border: 'none', cursor: 'pointer',
                    }}>
                      Enviar presupuesto →
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
