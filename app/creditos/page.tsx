'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, Coins, Crown, Loader2, Zap } from 'lucide-react'
import { PACKS_CREDITOS, CATEGORIAS } from '@/lib/data'

export default function CreditosPage() {
  const [loading, setLoading] = useState<string | null>(null)

  const handleBuy = async (packId: string) => {
    setLoading(packId)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packId,
          profesionalId: 'demo-user',
          successUrl: `${window.location.origin}/creditos?success=1`,
          cancelUrl: `${window.location.origin}/creditos`,
        }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {
      alert('Error al iniciar el pago. Configura las variables de entorno de Stripe.')
    } finally {
      setLoading(null)
    }
  }

  const packsList = PACKS_CREDITOS.filter(p => !p.suscripcion)
  const proPlan = PACKS_CREDITOS.find(p => p.suscripcion)

  return (
    <div style={{ background: '#080808', minHeight: '100vh', paddingTop: 64 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,200,150,0.1)', border: '1px solid rgba(0,200,150,0.2)', borderRadius: 20, padding: '5px 14px', marginBottom: 20 }}>
            <Coins size={14} color="#00C896" />
            <span style={{ color: '#00C896', fontSize: 12, fontWeight: 700 }}>SISTEMA DE CRÉDITOS</span>
          </div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 52, color: '#F5F5F0', marginBottom: 16 }}>
            Elige tu pack de créditos
          </h1>
          <p style={{ color: '#888', fontSize: 17, maxWidth: 500, margin: '0 auto' }}>
            Usa créditos para responder a solicitudes. Solo pagas cuando contactas con un cliente potencial.
          </p>
        </div>

        {/* Credit packs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 32 }}>
          {packsList.map(pack => (
            <div key={pack.id} style={{
              background: pack.popular ? 'rgba(0,200,150,0.05)' : '#111',
              border: `1.5px solid ${pack.popular ? '#00C896' : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 20, padding: '32px 24px', position: 'relative',
              display: 'flex', flexDirection: 'column',
            }}>
              {pack.popular && (
                <div style={{
                  position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #00C896, #00A87A)',
                  color: '#fff', fontSize: 11, fontWeight: 800, padding: '4px 14px', borderRadius: 20, whiteSpace: 'nowrap',
                }}>
                  ⭐ MÁS POPULAR
                </div>
              )}

              <div style={{ marginBottom: 'auto' }}>
                <div style={{ color: '#888', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{pack.label}</div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 64, color: pack.popular ? '#00C896' : '#F5F5F0', lineHeight: 1, marginBottom: 4 }}>
                  {pack.creditos}
                </div>
                <div style={{ color: '#888', fontSize: 13, marginBottom: 20 }}>créditos</div>

                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 34, color: '#F5F5F0' }}>
                    {pack.precio}€
                  </span>
                  <span style={{ color: '#888', fontSize: 13, marginLeft: 6 }}>
                    ({(pack.precio / pack.creditos).toFixed(2)}€/cr)
                  </span>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
                  {[
                    `Responde a ${Math.floor(pack.creditos / 2)} solicitudes básicas`,
                    pack.creditos >= 25 ? 'Acceso a todas las categorías' : 'Fontanería, electricidad y más',
                    pack.creditos >= 60 ? 'Soporte prioritario' : 'Sin caducidad',
                    pack.creditos >= 150 ? 'Badge profesional verificado' : 'Usa cuando quieras',
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, color: '#ccc', fontSize: 13 }}>
                      <Check size={14} color={pack.popular ? '#00C896' : '#555'} style={{ flexShrink: 0, marginTop: 2 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button onClick={() => handleBuy(pack.id)} disabled={loading === pack.id} style={{
                padding: '13px 20px', borderRadius: 12, fontWeight: 700, fontSize: 14,
                background: pack.popular ? 'linear-gradient(135deg, #00C896, #00A87A)' : '#1a1a1a',
                color: pack.popular ? '#fff' : '#F5F5F0',
                border: pack.popular ? 'none' : '1px solid rgba(255,255,255,0.12)',
                cursor: loading === pack.id ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { if (!pack.popular) (e.currentTarget as HTMLElement).style.borderColor = '#00C896' }}
                onMouseLeave={e => { if (!pack.popular) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)' }}
              >
                {loading === pack.id
                  ? <><Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> Redirigiendo...</>
                  : <>Comprar {pack.creditos} créditos</>
                }
              </button>
            </div>
          ))}
        </div>

        {/* Pro plan */}
        {proPlan && (
          <div id="pro" style={{
            background: 'linear-gradient(135deg, rgba(0,102,255,0.1), rgba(0,200,150,0.06))',
            border: '1.5px solid rgba(0,102,255,0.4)',
            borderRadius: 24, padding: '40px', marginBottom: 60,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24,
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, #0066FF, #004FCC)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Crown size={20} color="#fff" />
                </div>
                <div>
                  <div style={{ color: '#0066FF', fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>SUSCRIPCIÓN MENSUAL</div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#F5F5F0' }}>Plan Pro Mensual</div>
                </div>
              </div>
              <p style={{ color: '#888', fontSize: 14, marginBottom: 16 }}>
                Recibe créditos automáticamente cada mes + beneficios exclusivos
              </p>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {[
                  `${proPlan.creditos} créditos/mes`,
                  'Badge verificado',
                  'Prioridad en el feed',
                  'Estadísticas avanzadas',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#ccc', fontSize: 13 }}>
                    <Check size={14} color="#0066FF" /> {item}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 52, color: '#F5F5F0', lineHeight: 1 }}>
                {proPlan.precio}€
              </div>
              <div style={{ color: '#888', fontSize: 13, marginBottom: 16 }}>/mes · cancela cuando quieras</div>
              <button onClick={() => handleBuy('pro')} disabled={loading === 'pro'} style={{
                padding: '14px 32px', borderRadius: 14, fontWeight: 700, fontSize: 15,
                background: 'linear-gradient(135deg, #0066FF, #004FCC)',
                color: '#fff', border: 'none', cursor: loading === 'pro' ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
              }}>
                {loading === 'pro'
                  ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Redirigiendo...</>
                  : <>Activar Plan Pro <Zap size={16} /></>
                }
              </button>
            </div>
          </div>
        )}

        {/* Credit cost table */}
        <div>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 36, color: '#F5F5F0', marginBottom: 8, textAlign: 'center' }}>
            Coste por categoría
          </h2>
          <p style={{ color: '#888', fontSize: 14, textAlign: 'center', marginBottom: 28 }}>
            El coste depende del valor potencial del trabajo
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
            {CATEGORIAS.map(cat => (
              <div key={cat.id} style={{
                background: '#111', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12,
                padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 20 }}>{cat.emoji}</span>
                  <span style={{ color: '#ccc', fontSize: 14 }}>{cat.label}</span>
                </div>
                <span style={{
                  background: 'rgba(0,200,150,0.1)', color: '#00C896',
                  border: '1px solid rgba(0,200,150,0.2)',
                  padding: '4px 10px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                }}>
                  {cat.creditos_coste} cr
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: 60 }}>
          <p style={{ color: '#888', fontSize: 14, marginBottom: 16 }}>
            ¿Eres nuevo? Regístrate como profesional y recibe <strong style={{ color: '#00C896' }}>5 créditos gratis</strong> de bienvenida.
          </p>
          <Link href="/registro-pro" className="btn-green" style={{ fontSize: 16, padding: '14px 32px' }}>
            Registrarme y recibir 5 créditos gratis <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}
