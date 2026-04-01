'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowRight, CheckCircle, Zap, Search, Star, Shield, Clock, TrendingUp,
  Users, Award, MessageSquare, ChevronRight, Sparkles,
} from 'lucide-react'
import { CATEGORIAS, PROVINCIAS, MOCK_FEED_ACTIVITY, MOCK_SOLICITUDES } from '@/lib/data'

/* ── Animated canvas particles ─────────────────────────── */
function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext('2d'); if (!ctx) return
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight }
    resize(); window.addEventListener('resize', resize)
    const COLS = ['#00C896', '#0066FF', '#00A87A', '#4F46E5', '#00E5B0']
    const ps = Array.from({ length: 90 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.4, a: Math.random() * 0.5 + 0.15,
      col: COLS[Math.floor(Math.random() * COLS.length)],
    }))
    let id: number
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height)
      ps.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.col + Math.round(p.a * 255).toString(16).padStart(2, '0')
        ctx.fill()
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = c.width; if (p.x > c.width) p.x = 0
        if (p.y < 0) p.y = c.height; if (p.y > c.height) p.y = 0
      })
      id = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
}

/* ── Live activity ticker ───────────────────────────────── */
function Ticker() {
  const items = [...MOCK_FEED_ACTIVITY, ...MOCK_FEED_ACTIVITY]
  return (
    <div style={{
      overflow: 'hidden', background: 'rgba(10,10,10,0.9)',
      borderTop: '1px solid rgba(0,200,150,0.1)',
      borderBottom: '1px solid rgba(0,200,150,0.1)',
      padding: '11px 0', position: 'relative',
    }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(90deg,#060606,transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(-90deg,#060606,transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ display: 'flex', gap: 48, animation: 'ticker 34s linear infinite', whiteSpace: 'nowrap', width: 'max-content' }}>
        {items.map((item, i) => (
          <span key={i} style={{ color: '#555', fontSize: 12.5, display: 'inline-flex', alignItems: 'center', gap: 7 }}>
            <span style={{ fontSize: 14 }}>{item.emoji}</span>
            <span style={{ color: '#888' }}>{item.text}</span>
            <span style={{ color: '#333' }}>·</span>
            <span style={{ color: '#00C896', fontWeight: 500 }}>{item.provincia}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Animated stat counter ──────────────────────────────── */
function StatCount({ end, label, prefix = '', suffix = '' }: { end: number; label: string; prefix?: string; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      let start = 0; const steps = 60; const inc = end / steps
      const t = setInterval(() => {
        start += inc
        if (start >= end) { setVal(end); clearInterval(t) }
        else setVal(Math.floor(start))
      }, 28)
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end])
  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 46,
        lineHeight: 1,
        background: 'linear-gradient(135deg,#00C896,#0066FF)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        animation: 'shimmerGreen 3s linear infinite',
      }}>
        {prefix}{val.toLocaleString('es-ES')}{suffix}
      </div>
      <div style={{ color: '#555', fontSize: 12, fontWeight: 500, marginTop: 4, letterSpacing: '0.04em' }}>{label}</div>
    </div>
  )
}

/* ── Search widget ──────────────────────────────────────── */
function SearchWidget() {
  const [categoria, setCategoria] = useState('')
  const [provincia, setProvincia] = useState('')
  return (
    <div style={{
      display: 'flex', gap: 0, borderRadius: 18, overflow: 'hidden',
      background: 'rgba(14,14,14,0.95)', border: '1px solid rgba(0,200,150,0.2)',
      boxShadow: '0 16px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,200,150,0.05)',
      maxWidth: 700, width: '100%',
    }}>
      <select value={categoria} onChange={e => setCategoria(e.target.value)}
        style={{ flex: 1.6, padding: '18px 20px', background: 'transparent', border: 'none', color: categoria ? '#F0F0EB' : '#555', fontSize: 15, outline: 'none', cursor: 'pointer', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
        <option value="">¿Qué necesitas?</option>
        {CATEGORIAS.map(c => <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>)}
      </select>
      <select value={provincia} onChange={e => setProvincia(e.target.value)}
        style={{ flex: 1, padding: '18px 16px', background: 'transparent', border: 'none', color: provincia ? '#F0F0EB' : '#555', fontSize: 15, outline: 'none', cursor: 'pointer', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
        <option value="">¿En qué provincia?</option>
        {PROVINCIAS.map(p => <option key={p} value={p}>{p}</option>)}
      </select>
      <Link
        href={`/solicitar${categoria ? `?categoria=${categoria}` : ''}${provincia ? `&provincia=${provincia}` : ''}`}
        style={{
          padding: '18px 30px', background: 'linear-gradient(135deg,#00C896,#00A87A)',
          color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 15,
          display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#00E5B0,#00C896)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#00C896,#00A87A)' }}
      >
        <Search size={17} /> Pedir gratis
      </Link>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   HOMEPAGE
   ══════════════════════════════════════════════════════════ */
export default function Home() {
  const [hoveredCat, setHoveredCat] = useState<string | null>(null)

  const testimonials = [
    { name: 'Carlos Romero', job: 'Propietario en Madrid', text: 'En menos de 30 minutos tenía 3 presupuestos de fontaneros verificados. Increíble.', stars: 5, avatar: 'CR' },
    { name: 'Ana Martínez', job: 'Diseñadora en Barcelona', text: 'Busqué un electricista urgente y en 10 minutos me llamó uno. Servicio impecable.', stars: 5, avatar: 'AM' },
    { name: 'Luis García', job: 'Profesional en Valencia', text: 'Como profesional, recibo trabajos constantemente. Vale cada céntimo invertido.', stars: 5, avatar: 'LG' },
    { name: 'María Santos', job: 'Arquitecta en Sevilla', text: 'La mejor plataforma para encontrar profesionales de calidad en España.', stars: 5, avatar: 'MS' },
  ]

  return (
    <>
      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh', position: 'relative', display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '100px 24px 60px', overflow: 'hidden',
      }}>
        {/* Canvas BG */}
        <ParticleCanvas />

        {/* Deep glow orbs */}
        <div style={{ position: 'absolute', top: '15%', left: '10%', width: 600, height: 600, background: 'radial-gradient(circle,rgba(0,200,150,0.07) 0%,transparent 65%)', pointerEvents: 'none', animation: 'glowPulse 6s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '25%', right: '8%', width: 500, height: 500, background: 'radial-gradient(circle,rgba(0,102,255,0.07) 0%,transparent 65%)', pointerEvents: 'none', animation: 'glowPulse 8s ease-in-out infinite 2s' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '40%', width: 300, height: 300, background: 'radial-gradient(circle,rgba(79,70,229,0.06) 0%,transparent 65%)', pointerEvents: 'none' }} />

        {/* Grid lines */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,200,150,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,200,150,0.025) 1px,transparent 1px)', backgroundSize: '80px 80px', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 960, width: '100%' }}>
          {/* Status badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 9, marginBottom: 36,
            padding: '8px 20px', borderRadius: 100,
            background: 'rgba(0,200,150,0.08)', border: '1px solid rgba(0,200,150,0.2)',
            animation: 'fadeInUp 0.5s ease both',
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#00C896', animation: 'pulseGreen 2s infinite', display: 'inline-block' }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: '#00C896', letterSpacing: '0.12em' }}>
              MARKETPLACE DE PROFESIONALES EN ESPAÑA
            </span>
          </div>

          {/* Main headline */}
          <h1 style={{
            fontFamily: "'Barlow Condensed',sans-serif",
            fontSize: 'clamp(56px,9.5vw,118px)',
            fontWeight: 900, lineHeight: 0.9,
            letterSpacing: '-0.02em', marginBottom: 28,
            animation: 'fadeInUp 0.6s 0.1s ease both', opacity: 0,
          }}>
            <span style={{ color: '#F0F0EB', display: 'block' }}>PRESUPUESTO</span>
            <span style={{
              display: 'block',
              background: 'linear-gradient(135deg,#00C896 0%,#0066FF 50%,#00C896 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              animation: 'shimmerGreen 4s linear infinite',
            }}>GRATIS</span>
            <span style={{ color: '#F0F0EB', display: 'block' }}>EN MINUTOS</span>
          </h1>

          <p style={{
            color: '#777', fontSize: 19, lineHeight: 1.7,
            maxWidth: 560, margin: '0 auto 44px',
            animation: 'fadeInUp 0.6s 0.2s ease both', opacity: 0,
          }}>
            Publica lo que necesitas. Recibe hasta{' '}
            <strong style={{ color: '#F0F0EB', fontWeight: 600 }}>5 presupuestos</strong>{' '}
            de profesionales verificados en tu zona.{' '}
            <strong style={{ color: '#00C896' }}>Siempre gratis para ti.</strong>
          </p>

          {/* Search widget */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20, animation: 'fadeInUp 0.6s 0.3s ease both', opacity: 0 }}>
            <SearchWidget />
          </div>

          {/* Quick tags */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 56, animation: 'fadeInUp 0.6s 0.35s ease both', opacity: 0 }}>
            {CATEGORIAS.slice(0, 7).map(c => (
              <Link key={c.id} href={`/solicitar?categoria=${c.id}`} style={{
                padding: '5px 14px', borderRadius: 20,
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                color: '#666', fontSize: 12, textDecoration: 'none', transition: 'all 0.2s',
                display: 'inline-flex', alignItems: 'center', gap: 5,
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,200,150,0.3)'; e.currentTarget.style.color = '#00C896'; e.currentTarget.style.background = 'rgba(0,200,150,0.06)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#666'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
              >
                {c.emoji} {c.label}
              </Link>
            ))}
            <Link href="/solicitar" style={{
              padding: '5px 14px', borderRadius: 20,
              background: 'transparent', border: '1px solid rgba(255,255,255,0.07)',
              color: '#444', fontSize: 12, textDecoration: 'none', transition: 'all 0.2s',
            }}>+ Ver todas</Link>
          </div>

          {/* Hero stats */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap',
            animation: 'fadeInUp 0.6s 0.45s ease both', opacity: 0,
          }}>
            <StatCount end={12840} label="PRESUPUESTOS HOY" suffix="+" />
            <StatCount end={3200} label="PROFESIONALES ACTIVOS" suffix="+" />
            <StatCount end={98} label="CLIENTES SATISFECHOS" suffix="%" />
            <StatCount end={4} label="PROVINCIAS CUBIERTAS" suffix="7" prefix="" />
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', animation: 'float 2.4s ease-in-out infinite', opacity: 0.35 }}>
          <div style={{ width: 22, height: 38, borderRadius: 11, border: '1.5px solid #333', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '5px 0' }}>
            <div style={{ width: 2.5, height: 7, borderRadius: 2, background: '#00C896' }} />
          </div>
        </div>
      </section>

      {/* ══ TICKER ════════════════════════════════════════════ */}
      <Ticker />

      {/* ══ ROLE CARDS ════════════════════════════════════════ */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <p style={{ color: '#00C896', fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', marginBottom: 12 }}>¿CÓMO QUIERES USAR PRESUPUESTOSYA?</p>
            <h2 className="section-title" style={{ fontSize: 'clamp(36px,5vw,60px)' }}>ELIGE TU ROL</h2>
            <div className="sep-green" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 28, maxWidth: 860, margin: '0 auto' }}>
            {/* Client */}
            <Link href="/solicitar" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'rgba(0,200,150,0.03)',
                border: '1px solid rgba(0,200,150,0.15)',
                borderRadius: 24, padding: '44px 36px',
                cursor: 'pointer', transition: 'all 0.3s',
                position: 'relative', overflow: 'hidden',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.borderColor = 'rgba(0,200,150,0.5)'
                  e.currentTarget.style.boxShadow = '0 24px 80px rgba(0,200,150,0.12)'
                  e.currentTarget.style.background = 'rgba(0,200,150,0.05)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = ''
                  e.currentTarget.style.borderColor = 'rgba(0,200,150,0.15)'
                  e.currentTarget.style.boxShadow = ''
                  e.currentTarget.style.background = 'rgba(0,200,150,0.03)'
                }}
              >
                <div style={{ position: 'absolute', top: -40, right: -40, width: 150, height: 150, background: 'radial-gradient(circle,rgba(0,200,150,0.08) 0%,transparent 70%)', pointerEvents: 'none' }} />
                <div style={{
                  width: 64, height: 64, borderRadius: 18,
                  background: 'linear-gradient(135deg,rgba(0,200,150,0.2),rgba(0,200,150,0.05))',
                  border: '1px solid rgba(0,200,150,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28, marginBottom: 24,
                }}>👤</div>
                <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 34, color: '#F0F0EB', marginBottom: 8 }}>
                  Soy Cliente
                </h3>
                <p style={{ color: '#555', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
                  Publica lo que necesitas gratis y recibe presupuestos de profesionales verificados en minutos.
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                  {['Publico mi necesidad gratis', 'Recibo hasta 5 presupuestos', 'Elijo al mejor profesional', 'Sin comisiones ocultas'].map(t => (
                    <li key={t} style={{ display: 'flex', alignItems: 'center', gap: 9, color: '#aaa', fontSize: 14 }}>
                      <CheckCircle size={15} color="#00C896" style={{ flexShrink: 0 }} />
                      {t}
                    </li>
                  ))}
                </ul>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '14px 28px', borderRadius: 14, fontWeight: 700, fontSize: 15,
                  background: 'linear-gradient(135deg,#00C896,#00A87A)', color: '#fff',
                  transition: 'all 0.2s',
                }}>
                  Pedir Presupuesto Gratis <ArrowRight size={17} />
                </div>
              </div>
            </Link>

            {/* Professional */}
            <Link href="/registro-pro" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'rgba(0,102,255,0.03)',
                border: '1px solid rgba(0,102,255,0.2)',
                borderRadius: 24, padding: '44px 36px',
                cursor: 'pointer', transition: 'all 0.3s',
                position: 'relative', overflow: 'hidden',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.borderColor = 'rgba(0,102,255,0.5)'
                  e.currentTarget.style.boxShadow = '0 24px 80px rgba(0,102,255,0.12)'
                  e.currentTarget.style.background = 'rgba(0,102,255,0.05)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = ''
                  e.currentTarget.style.borderColor = 'rgba(0,102,255,0.2)'
                  e.currentTarget.style.boxShadow = ''
                  e.currentTarget.style.background = 'rgba(0,102,255,0.03)'
                }}
              >
                <div style={{ position: 'absolute', top: -40, right: -40, width: 150, height: 150, background: 'radial-gradient(circle,rgba(0,102,255,0.08) 0%,transparent 70%)', pointerEvents: 'none' }} />
                <div style={{
                  width: 64, height: 64, borderRadius: 18,
                  background: 'linear-gradient(135deg,rgba(0,102,255,0.2),rgba(0,102,255,0.05))',
                  border: '1px solid rgba(0,102,255,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28, marginBottom: 24,
                }}>🔧</div>
                <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 34, color: '#F0F0EB', marginBottom: 8 }}>
                  Soy Profesional
                </h3>
                <p style={{ color: '#555', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
                  Encuentra trabajos en tu zona, envía presupuestos y consigue más clientes cada semana.
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                  {['Veo trabajos en mi zona', 'Envío presupuestos con créditos', 'Consigo más clientes', 'Panel de control completo'].map(t => (
                    <li key={t} style={{ display: 'flex', alignItems: 'center', gap: 9, color: '#aaa', fontSize: 14 }}>
                      <CheckCircle size={15} color="#0066FF" style={{ flexShrink: 0 }} />
                      {t}
                    </li>
                  ))}
                </ul>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '14px 28px', borderRadius: 14, fontWeight: 700, fontSize: 15,
                  background: 'linear-gradient(135deg,#0066FF,#004FCC)', color: '#fff',
                  transition: 'all 0.2s',
                }}>
                  Quiero Más Trabajo <ArrowRight size={17} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ CATEGORIAS ════════════════════════════════════════ */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 44, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ color: '#00C896', fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', marginBottom: 8 }}>ESPECIALIDADES</p>
              <h2 className="section-title" style={{ fontSize: 'clamp(32px,4.5vw,54px)' }}>
                18 CATEGORÍAS<br />DE SERVICIOS
              </h2>
              <div className="sep-green" style={{ margin: '10px 0 0' }} />
            </div>
            <Link href="/solicitar" className="btn-outline-green" style={{ padding: '11px 22px', fontSize: 13 }}>
              Ver todas <ChevronRight size={15} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(130px,1fr))', gap: 10 }}>
            {CATEGORIAS.map(cat => (
              <Link key={cat.id} href={`/solicitar?categoria=${cat.id}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    background: hoveredCat === cat.id ? 'rgba(0,200,150,0.06)' : 'rgba(14,14,14,0.9)',
                    border: `1px solid ${hoveredCat === cat.id ? 'rgba(0,200,150,0.3)' : '#1A1A1A'}`,
                    borderRadius: 16, padding: '20px 12px', textAlign: 'center',
                    transition: 'all 0.22s', cursor: 'pointer',
                    transform: hoveredCat === cat.id ? 'translateY(-4px)' : '',
                  }}
                  onMouseEnter={() => setHoveredCat(cat.id)}
                  onMouseLeave={() => setHoveredCat(null)}
                >
                  <div style={{ fontSize: 30, marginBottom: 8 }}>{cat.emoji}</div>
                  <div style={{
                    color: hoveredCat === cat.id ? '#00C896' : '#666',
                    fontSize: 11.5, fontWeight: 600, letterSpacing: '0.03em', lineHeight: 1.3,
                    transition: 'color 0.2s',
                  }}>{cat.label}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══════════════════════════════════════ */}
      <section id="como-funciona" style={{
        padding: '100px 24px',
        background: 'linear-gradient(160deg,rgba(0,200,150,0.03),transparent,rgba(0,102,255,0.02))',
        borderTop: '1px solid #0F0F0F', borderBottom: '1px solid #0F0F0F',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ color: '#00C896', fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', marginBottom: 12 }}>PROCESO SIMPLE</p>
            <h2 className="section-title" style={{ fontSize: 'clamp(36px,5vw,60px)' }}>ASÍ FUNCIONA</h2>
            <div className="sep-green" />
            <p style={{ color: '#555', fontSize: 15, marginTop: 16 }}>En 3 pasos y menos de 2 minutos</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {[
              {
                n: '01', icon: <MessageSquare size={28} color="#00C896" />, color: '#00C896',
                title: 'Describe lo que necesitas',
                desc: 'Explica el trabajo, elige la categoría y tu provincia. Totalmente gratis y sin registro previo.',
              },
              {
                n: '02', icon: <Users size={28} color="#0066FF" />, color: '#0066FF',
                title: 'Recibe hasta 5 presupuestos',
                desc: 'Los mejores profesionales verificados de tu zona te enviarán sus propuestas en cuestión de minutos.',
              },
              {
                n: '03', icon: <Award size={28} color="#4F46E5" />, color: '#4F46E5',
                title: 'Elige y contrata',
                desc: 'Compara precios, valoraciones y elige al profesional que más te convenza. Sin compromisos.',
              },
            ].map((s, i) => (
              <div key={i} style={{
                background: '#0E0E0E', border: `1px solid rgba(255,255,255,0.05)`,
                borderRadius: 20, padding: '36px 28px',
                position: 'relative', overflow: 'hidden',
                transition: 'all 0.25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${s.color}30`; e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = '' }}
              >
                <div style={{ position: 'absolute', top: -1, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${s.color}60,transparent)` }} />
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 72, fontWeight: 900, color: `${s.color}10`, lineHeight: 1, position: 'absolute', top: 12, right: 20, userSelect: 'none' }}>{s.n}</div>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${s.color}12`, border: `1px solid ${s.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  {s.icon}
                </div>
                <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 24, color: '#F0F0EB', marginBottom: 10, lineHeight: 1.2 }}>
                  {s.title}
                </h3>
                <p style={{ color: '#555', fontSize: 14, lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ LIVE SOLICITUDES ══════════════════════════════════ */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 44, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00C896', display: 'inline-block', animation: 'pulseGreen 2s infinite' }} />
                <span style={{ color: '#00C896', fontSize: 12, fontWeight: 700, letterSpacing: '0.14em' }}>EN TIEMPO REAL</span>
              </div>
              <h2 className="section-title" style={{ fontSize: 'clamp(30px,4vw,50px)' }}>
                SOLICITUDES<br />RECIENTES
              </h2>
            </div>
            <Link href="/solicitudes" className="btn-outline-green" style={{ padding: '11px 22px', fontSize: 13 }}>
              Ver todas <ChevronRight size={15} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 16 }}>
            {MOCK_SOLICITUDES.slice(0, 6).map(s => (
              <div key={s.id} style={{
                background: '#0E0E0E', border: '1px solid #1A1A1A', borderRadius: 16,
                padding: '22px 20px', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,200,150,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#1A1A1A'; e.currentTarget.style.transform = '' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 22 }}>{s.emoji}</span>
                    <div>
                      <div style={{ color: '#F0F0EB', fontSize: 13, fontWeight: 600 }}>
                        {CATEGORIAS.find(c => c.id === s.categoria)?.label}
                      </div>
                      <div style={{ color: '#444', fontSize: 11, marginTop: 2 }}>{s.provincia} · {s.ciudad}</div>
                    </div>
                  </div>
                  <span className={s.urgencia === 'urgente' ? 'badge-urgente' : s.urgencia === 'esta_semana' ? 'badge-semana' : 'badge-sin-prisa'}>
                    {s.urgencia === 'urgente' ? 'URGENTE' : s.urgencia === 'esta_semana' ? 'ESTA SEMANA' : 'SIN PRISA'}
                  </span>
                </div>
                <p style={{ color: '#555', fontSize: 13, lineHeight: 1.6, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {s.descripcion}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#444', fontSize: 12 }}>
                    <TrendingUp size={12} color={s.ofertas_recibidas > 0 ? '#00C896' : '#444'} />
                    <span style={{ color: s.ofertas_recibidas > 0 ? '#00C896' : '#444' }}>
                      {s.ofertas_recibidas} {s.ofertas_recibidas === 1 ? 'oferta' : 'ofertas'}
                    </span>
                  </div>
                  <Link href={`/solicitar?categoria=${s.categoria}`} style={{
                    padding: '6px 14px', borderRadius: 10, fontSize: 12, fontWeight: 600,
                    background: 'rgba(0,200,150,0.08)', border: '1px solid rgba(0,200,150,0.2)',
                    color: '#00C896', textDecoration: 'none', transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,200,150,0.14)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,200,150,0.08)'}
                  >
                    Enviar oferta →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TRUST / FEATURES ══════════════════════════════════ */}
      <section style={{
        padding: '80px 24px',
        background: 'rgba(0,200,150,0.02)',
        borderTop: '1px solid #0F0F0F', borderBottom: '1px solid #0F0F0F',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 32 }}>
            {[
              { icon: <Shield size={24} color="#00C896" />, title: 'Profesionales Verificados', desc: 'Revisamos la identidad y experiencia de cada profesional antes de activar su cuenta.' },
              { icon: <Clock size={24} color="#0066FF" />, title: 'Respuesta en Minutos', desc: 'El 94% de las solicitudes recibe al menos una oferta en menos de 30 minutos.' },
              { icon: <Star size={24} color="#FFB800" />, title: 'Valoraciones Reales', desc: 'Solo clientes que han contratado pueden dejar valoraciones. Sin trampa.' },
              { icon: <Sparkles size={24} color="#4F46E5" />, title: 'Siempre Gratis', desc: 'Para el cliente es totalmente gratuito. Sin comisiones, sin sorpresas.' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 14 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: '#141414', border: '1px solid #1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {f.icon}
                </div>
                <div>
                  <h4 style={{ color: '#F0F0EB', fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{f.title}</h4>
                  <p style={{ color: '#555', fontSize: 13, lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══════════════════════════════════════ */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ color: '#00C896', fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', marginBottom: 12 }}>LO QUE DICEN</p>
            <h2 className="section-title" style={{ fontSize: 'clamp(32px,4.5vw,54px)' }}>OPINIONES REALES</h2>
            <div className="sep-green" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 20 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{
                background: '#0E0E0E', border: '1px solid #1A1A1A', borderRadius: 18,
                padding: '28px 24px', transition: 'all 0.25s', position: 'relative',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,200,150,0.2)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#1A1A1A'; e.currentTarget.style.transform = '' }}
              >
                <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: 2 }}>
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={12} fill="#FFB800" color="#FFB800" />
                  ))}
                </div>
                <div style={{ fontSize: 22, color: '#00C896', marginBottom: 12, opacity: 0.4, lineHeight: 1 }}>"</div>
                <p style={{ color: '#888', fontSize: 14, lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>
                  {t.text}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: '50%',
                    background: 'linear-gradient(135deg,#00C896,#0066FF)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0,
                  }}>{t.avatar}</div>
                  <div>
                    <div style={{ color: '#F0F0EB', fontSize: 13, fontWeight: 600 }}>{t.name}</div>
                    <div style={{ color: '#444', fontSize: 11 }}>{t.job}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ═════════════════════════════════════════ */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{
            borderRadius: 28, padding: '72px 48px', textAlign: 'center',
            background: 'linear-gradient(135deg,rgba(0,200,150,0.08),rgba(0,102,255,0.05))',
            border: '1px solid rgba(0,200,150,0.15)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -80, left: '30%', width: 350, height: 350, background: 'radial-gradient(circle,rgba(0,200,150,0.08) 0%,transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -60, right: '20%', width: 280, height: 280, background: 'radial-gradient(circle,rgba(0,102,255,0.06) 0%,transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 14, color: '#00C896', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 16 }}>
                ¿LISTO PARA EMPEZAR?
              </div>
              <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 'clamp(40px,6vw,70px)', color: '#F0F0EB', lineHeight: 0.95, marginBottom: 20 }}>
                TU PRÓXIMO PROFESIONAL<br />ESTÁ A UN CLIC
              </h2>
              <p style={{ color: '#666', fontSize: 16, lineHeight: 1.6, marginBottom: 36, maxWidth: 500, margin: '0 auto 36px' }}>
                Publica tu solicitud en menos de 2 minutos. Gratis siempre para el cliente.
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/solicitar" className="btn-green" style={{ fontSize: 16, padding: '16px 36px' }}>
                  Pedir Presupuesto Gratis <ArrowRight size={18} />
                </Link>
                <Link href="/registro-pro" className="btn-outline-green" style={{ fontSize: 15, padding: '15px 28px' }}>
                  Soy Profesional →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
