'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Zap } from 'lucide-react'
import ParticleField from '@/components/ParticleField'
import { MOCK_FEED_ACTIVITY } from '@/lib/data'

function TickerBar() {
  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      background: 'rgba(17,17,17,0.8)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '12px 0',
    }}>
      <div style={{
        display: 'flex',
        gap: 48,
        animation: 'ticker 30s linear infinite',
        whiteSpace: 'nowrap',
        width: 'max-content',
      }}>
        {[...MOCK_FEED_ACTIVITY, ...MOCK_FEED_ACTIVITY].map((item, i) => (
          <span key={i} style={{ color: '#888', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span>{item.emoji}</span>
            <span>{item.text}</span>
            <span style={{ color: '#333' }}>·</span>
            <span style={{ color: '#555' }}>{item.provincia}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function Counter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const steps = 50
    const inc = target / steps
    let cur = 0
    const t = setInterval(() => {
      cur += inc
      if (cur >= target) { setCount(target); clearInterval(t) }
      else setCount(Math.floor(cur))
    }, 40)
    return () => clearInterval(t)
  }, [target])
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 36, color: '#00C896' }}>
        {count.toLocaleString('es-ES')}+
      </div>
      <div style={{ color: '#888', fontSize: 12 }}>{label}</div>
    </div>
  )
}

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', background: '#080808' }}>
      <ParticleField />

      {/* Background glows */}
      <div style={{ position: 'absolute', top: '20%', left: '15%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(0,200,150,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '30%', right: '10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(0,102,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 40px' }}>

        {/* Logo badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, animation: 'fadeInUp 0.6s ease both' }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg, #00C896, #0066FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(0,200,150,0.3)' }}>
            <Zap size={26} color="#fff" fill="#fff" />
          </div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 38, background: 'linear-gradient(135deg, #00C896, #0066FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            PresupuestosYa
          </h1>
        </div>

        {/* Subtitle */}
        <p style={{ color: '#F5F5F0', fontSize: 20, fontWeight: 300, textAlign: 'center', maxWidth: 500, marginBottom: 8, animation: 'fadeInUp 0.6s 0.1s ease both', opacity: 0 }}>
          Pide presupuesto gratis.
        </p>
        <p style={{ color: '#888', fontSize: 16, textAlign: 'center', maxWidth: 460, marginBottom: 56, animation: 'fadeInUp 0.6s 0.2s ease both', opacity: 0 }}>
          Recibe hasta 5 ofertas de profesionales verificados en minutos.
        </p>

        {/* Role selector cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, maxWidth: 700, width: '100%', marginBottom: 56, animation: 'fadeInUp 0.6s 0.3s ease both', opacity: 0 }}>

          {/* Client card */}
          <Link href="/solicitar" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'rgba(17,17,17,0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0,200,150,0.25)',
              borderRadius: 20,
              padding: '36px 28px',
              cursor: 'pointer',
              transition: 'all 0.25s',
              height: '100%',
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,200,150,0.6)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 20px 60px rgba(0,200,150,0.15)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,200,150,0.25)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              <div style={{ fontSize: 52, marginBottom: 16 }}>👤</div>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 28, color: '#F5F5F0', marginBottom: 20 }}>
                Soy Cliente
              </h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                {[
                  'Publico mi necesidad gratis',
                  'Recibo hasta 5 presupuestos',
                  'Elijo al mejor profesional',
                ].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#ccc', fontSize: 14 }}>
                    <CheckCircle size={15} color="#00C896" />
                    {item}
                  </li>
                ))}
              </ul>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '13px 24px', borderRadius: 12, fontWeight: 700, fontSize: 15,
                background: 'linear-gradient(135deg, #00C896, #00A87A)', color: '#fff',
              }}>
                Pedir Presupuesto Gratis <ArrowRight size={16} />
              </div>
            </div>
          </Link>

          {/* Professional card */}
          <Link href="/registro-pro" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'rgba(17,17,17,0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0,102,255,0.25)',
              borderRadius: 20,
              padding: '36px 28px',
              cursor: 'pointer',
              transition: 'all 0.25s',
              height: '100%',
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,102,255,0.6)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 20px 60px rgba(0,102,255,0.15)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,102,255,0.25)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              <div style={{ fontSize: 52, marginBottom: 16 }}>🔧</div>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 28, color: '#F5F5F0', marginBottom: 20 }}>
                Soy Profesional
              </h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                {[
                  'Veo trabajos en mi zona',
                  'Envío presupuestos con créditos',
                  'Consigo más clientes',
                ].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#ccc', fontSize: 14 }}>
                    <CheckCircle size={15} color="#0066FF" />
                    {item}
                  </li>
                ))}
              </ul>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '13px 24px', borderRadius: 12, fontWeight: 700, fontSize: 15,
                background: 'linear-gradient(135deg, #0066FF, #004FCC)', color: '#fff',
              }}>
                Quiero Más Trabajo <ArrowRight size={16} />
              </div>
            </div>
          </Link>
        </div>

        {/* Counters */}
        <div style={{
          display: 'flex', gap: 48, flexWrap: 'wrap', justifyContent: 'center',
          marginBottom: 48,
          animation: 'fadeInUp 0.6s 0.45s ease both', opacity: 0,
        }}>
          <Counter target={12840} label="presupuestos enviados hoy" />
          <Counter target={3200} label="profesionales activos" />
          <Counter target={98} label="% de clientes satisfechos" />
        </div>
      </div>

      {/* Ticker */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <TickerBar />
      </div>
    </div>
  )
}
