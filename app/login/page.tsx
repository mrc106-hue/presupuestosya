'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Zap, ArrowRight, CheckCircle, Mail, Lock, Eye, EyeOff, User } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type Mode = 'login' | 'register'

export default function LoginPage() {
  const [mode, setMode]         = useState<Mode>('login')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [nombre, setNombre]     = useState('')
  const [showPwd, setShowPwd]   = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [success, setSuccess]   = useState('')

  async function handleGoogleLogin() {
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) { setError(error.message); setLoading(false) }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError(''); setSuccess('')
    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else window.location.href = '/profesional'
    } else {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { data: { nombre } },
      })
      if (error) setError(error.message)
      else setSuccess('Revisa tu email para confirmar tu cuenta.')
    }
    setLoading(false)
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      minHeight: '100vh',
    }}>
      {/* ── LEFT PANEL — Visual ─────────────────────────────── */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(160deg,#050a0e 0%,#041212 30%,#001a1a 60%,#002200 100%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        padding: '60px 52px',
      }}>
        {/* Glow orbs */}
        <div style={{ position: 'absolute', top: '10%', left: '-10%', width: 500, height: 500, background: 'radial-gradient(circle,rgba(0,200,150,0.15) 0%,transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '5%', right: '-5%', width: 400, height: 400, background: 'radial-gradient(circle,rgba(0,102,255,0.12) 0%,transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, background: 'radial-gradient(circle,rgba(0,200,150,0.04) 0%,transparent 70%)', pointerEvents: 'none' }} />

        {/* Grid overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,200,150,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,200,150,0.03) 1px,transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

        {/* Animated ring */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 480, height: 480, borderRadius: '50%', border: '1px solid rgba(0,200,150,0.06)', pointerEvents: 'none', animation: 'rotateSlow 30s linear infinite' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 360, height: 360, borderRadius: '50%', border: '1px solid rgba(0,102,255,0.05)', pointerEvents: 'none', animation: 'rotateSlow 20s linear infinite reverse' }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 400, width: '100%' }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 64 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#00C896,#0066FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 24px rgba(0,200,150,0.3)' }}>
              <Zap size={22} color="#fff" fill="#fff" />
            </div>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 22, background: 'linear-gradient(135deg,#00C896,#0066FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              PresupuestosYa
            </span>
          </Link>

          {/* Big statement */}
          <h2 style={{
            fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900,
            fontSize: 'clamp(42px,4.5vw,58px)', lineHeight: 0.92,
            color: '#F0F0EB', marginBottom: 24, letterSpacing: '-0.02em',
          }}>
            MÁS TRABAJO.<br />
            <span style={{
              background: 'linear-gradient(135deg,#00C896,#0066FF)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              CADA DÍA.
            </span>
          </h2>
          <p style={{ color: '#555', fontSize: 15, lineHeight: 1.7, marginBottom: 44 }}>
            Accede a tu panel de profesional y gestiona tus presupuestos, créditos y reseñas desde un solo lugar.
          </p>

          {/* Feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: '🎯', text: 'Solicitudes en tu zona en tiempo real' },
              { icon: '💬', text: 'Envía presupuestos con un clic' },
              { icon: '⭐', text: 'Construye tu reputación con valoraciones' },
              { icon: '📊', text: 'Estadísticas y panel de control completo' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(0,200,150,0.08)', border: '1px solid rgba(0,200,150,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                  {f.icon}
                </div>
                <span style={{ color: '#888', fontSize: 14 }}>{f.text}</span>
              </div>
            ))}
          </div>

          {/* Social proof */}
          <div style={{
            marginTop: 48, padding: '18px 22px', borderRadius: 14,
            background: 'rgba(0,200,150,0.04)', border: '1px solid rgba(0,200,150,0.12)',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{ display: 'flex' }}>
              {['MG', 'JR', 'PF'].map((av, i) => (
                <div key={i} style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: `linear-gradient(135deg,hsl(${i * 80},70%,40%),hsl(${i * 80 + 40},70%,30%))`,
                  border: '2px solid #060606',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 700, color: '#fff',
                  marginLeft: i > 0 ? -8 : 0,
                }}>
                  {av}
                </div>
              ))}
            </div>
            <div>
              <div style={{ color: '#F0F0EB', fontSize: 13, fontWeight: 600 }}>+3.200 profesionales activos</div>
              <div style={{ color: '#444', fontSize: 11, marginTop: 2 }}>Se han unido este mes</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL — Form ──────────────────────────────── */}
      <div style={{
        background: '#080808',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '60px 48px',
        position: 'relative',
      }}>
        {/* Top nav */}
        <div style={{ position: 'absolute', top: 28, right: 36, display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ color: '#444', fontSize: 13 }}>
            {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          </span>
          <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); setSuccess('') }}
            style={{
              padding: '8px 18px', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer',
              border: '1.5px solid rgba(0,200,150,0.3)', background: 'transparent',
              color: '#00C896', transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,200,150,0.08)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {mode === 'login' ? 'Registrarme' : 'Iniciar sesión'}
          </button>
        </div>

        <div style={{ width: '100%', maxWidth: 400 }}>
          {/* Header */}
          <h1 style={{
            fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900,
            fontSize: 'clamp(34px,3.5vw,44px)', color: '#F0F0EB',
            marginBottom: 8, lineHeight: 1,
          }}>
            {mode === 'login' ? 'BIENVENIDO' : 'CREA TU CUENTA'}
          </h1>
          <p style={{ color: '#555', fontSize: 14, marginBottom: 36 }}>
            {mode === 'login' ? 'Accede a tu panel de profesional' : 'Empieza a recibir trabajos hoy mismo'}
          </p>

          {/* Google button */}
          <button onClick={handleGoogleLogin} disabled={loading}
            style={{
              width: '100%', padding: '14px 20px', borderRadius: 14, cursor: 'pointer',
              background: '#0E0E0E', border: '1px solid #1E1E1E',
              color: '#F0F0EB', fontSize: 14, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              transition: 'all 0.2s', marginBottom: 24,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = '#141414' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E1E1E'; e.currentTarget.style.background = '#0E0E0E' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {loading ? 'Conectando...' : `Continuar con Google`}
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 1, background: '#1A1A1A' }} />
            <span style={{ color: '#333', fontSize: 12 }}>o con email</span>
            <div style={{ flex: 1, height: 1, background: '#1A1A1A' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {mode === 'register' && (
              <div style={{ position: 'relative' }}>
                <User size={15} color="#333" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  type="text" placeholder="Tu nombre" value={nombre} onChange={e => setNombre(e.target.value)}
                  required
                  style={{
                    width: '100%', padding: '14px 14px 14px 40px',
                    background: '#0E0E0E', border: '1px solid #1A1A1A',
                    borderRadius: 12, color: '#F0F0EB', fontSize: 14, outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(0,200,150,0.4)'}
                  onBlur={e => e.target.style.borderColor = '#1A1A1A'}
                />
              </div>
            )}

            <div style={{ position: 'relative' }}>
              <Mail size={15} color="#333" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                type="email" placeholder="tu@email.com" value={email} onChange={e => setEmail(e.target.value)}
                required
                style={{
                  width: '100%', padding: '14px 14px 14px 40px',
                  background: '#0E0E0E', border: '1px solid #1A1A1A',
                  borderRadius: 12, color: '#F0F0EB', fontSize: 14, outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(0,200,150,0.4)'}
                onBlur={e => e.target.style.borderColor = '#1A1A1A'}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <Lock size={15} color="#333" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                type={showPwd ? 'text' : 'password'}
                placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)}
                required minLength={6}
                style={{
                  width: '100%', padding: '14px 44px 14px 40px',
                  background: '#0E0E0E', border: '1px solid #1A1A1A',
                  borderRadius: 12, color: '#F0F0EB', fontSize: 14, outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(0,200,150,0.4)'}
                onBlur={e => e.target.style.borderColor = '#1A1A1A'}
              />
              <button type="button" onClick={() => setShowPwd(!showPwd)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#333', padding: 4 }}>
                {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {mode === 'login' && (
              <div style={{ textAlign: 'right' }}>
                <a href="#" style={{ color: '#444', fontSize: 12, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#00C896'}
                  onMouseLeave={e => e.currentTarget.style.color = '#444'}
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            )}

            {/* Error / Success */}
            {error && (
              <div style={{
                padding: '12px 14px', borderRadius: 10,
                background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
                color: '#ef4444', fontSize: 13,
              }}>{error}</div>
            )}
            {success && (
              <div style={{
                padding: '12px 14px', borderRadius: 10,
                background: 'rgba(0,200,150,0.08)', border: '1px solid rgba(0,200,150,0.2)',
                color: '#00C896', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <CheckCircle size={14} /> {success}
              </div>
            )}

            <button type="submit" disabled={loading}
              style={{
                width: '100%', padding: '15px', borderRadius: 14,
                background: loading ? 'rgba(0,200,150,0.5)' : 'linear-gradient(135deg,#00C896,#00A87A)',
                color: '#fff', border: 'none', fontWeight: 700, fontSize: 15,
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 0.25s', marginTop: 4,
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,200,150,0.35)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '' }}
            >
              {loading ? 'Cargando...' : mode === 'login' ? <>Acceder <ArrowRight size={17} /></> : <>Crear cuenta <ArrowRight size={17} /></>}
            </button>
          </form>

          {/* Footer */}
          <p style={{ color: '#333', fontSize: 11.5, textAlign: 'center', marginTop: 28, lineHeight: 1.6 }}>
            Al continuar aceptas nuestros{' '}
            <a href="#" style={{ color: '#444', textDecoration: 'none' }}>Términos de uso</a>
            {' '}y{' '}
            <a href="#" style={{ color: '#444', textDecoration: 'none' }}>Política de privacidad</a>
          </p>

          {/* Cliente link */}
          <div style={{
            marginTop: 32, padding: '14px 18px', borderRadius: 12,
            background: '#0E0E0E', border: '1px solid #1A1A1A',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ color: '#777', fontSize: 12, marginBottom: 2 }}>¿Buscas profesionales?</div>
              <div style={{ color: '#F0F0EB', fontSize: 13, fontWeight: 600 }}>Solicita presupuesto gratis</div>
            </div>
            <Link href="/solicitar" style={{
              padding: '8px 14px', borderRadius: 10, fontSize: 12, fontWeight: 700,
              background: 'rgba(0,200,150,0.1)', border: '1px solid rgba(0,200,150,0.2)',
              color: '#00C896', textDecoration: 'none', transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: 5,
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,200,150,0.18)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,200,150,0.1)'}
            >
              Empezar <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
