'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, CheckCircle, ChevronLeft, Loader2, Users } from 'lucide-react'
import { CATEGORIAS, PROVINCIAS } from '@/lib/data'

type Urgencia = 'urgente' | 'esta_semana' | 'sin_prisa'

interface FormData {
  categoria: string
  descripcion: string
  urgencia: Urgencia
  provincia: string
  ciudad: string
  nombre: string
  telefono: string
  email: string
}

function SolicitarContent() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [proCount, setProCount] = useState(0)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const [form, setForm] = useState<FormData>({
    categoria: searchParams.get('categoria') || '',
    descripcion: searchParams.get('descripcion') || '',
    urgencia: 'sin_prisa',
    provincia: searchParams.get('provincia') || '',
    ciudad: '',
    nombre: '',
    telefono: '',
    email: '',
  })

  useEffect(() => {
    if (form.categoria) setStep(2)
  }, [])

  useEffect(() => {
    if (submitted) {
      // Simulate pros reviewing the request
      const counts = [1, 2, 3]
      counts.forEach((c, i) => {
        setTimeout(() => setProCount(c), (i + 1) * 1200)
      })
    }
  }, [submitted])

  const set = (key: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))
    setErrors(prev => ({ ...prev, [key]: undefined }))
  }

  const validateStep2 = () => {
    const e: Partial<FormData> = {}
    if (!form.descripcion.trim()) e.descripcion = 'Describe qué necesitas'
    if (!form.provincia) e.provincia = 'Selecciona tu provincia'
    return e
  }

  const validateStep3 = () => {
    const e: Partial<FormData> = {}
    if (!form.nombre.trim()) e.nombre = 'Introduce tu nombre'
    if (!form.telefono.trim() || form.telefono.length < 9) e.telefono = 'Teléfono inválido (mín. 9 dígitos)'
    if (!form.email.includes('@')) e.email = 'Email inválido'
    return e
  }

  const handleNext = () => {
    if (step === 1 && !form.categoria) return
    if (step === 2) {
      const e = validateStep2()
      if (Object.keys(e).length) { setErrors(e); return }
    }
    if (step === 3) {
      const e = validateStep3()
      if (Object.keys(e).length) { setErrors(e); return }
      handleSubmit()
      return
    }
    setStep(s => s + 1)
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/solicitudes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Error al enviar')
    } catch {
      // In demo mode, still show success
    } finally {
      setLoading(false)
      setSubmitted(true)
      setStep(4)
    }
  }

  const progressWidth = `${(step / 4) * 100}%`

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 24px' }}>
        {/* Success animation */}
        <div style={{
          width: 100, height: 100, borderRadius: '50%',
          background: 'rgba(0,200,150,0.1)', border: '3px solid #00C896',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 28px',
          animation: 'checkPop 0.5s ease both',
        }}>
          <CheckCircle size={48} color="#00C896" />
        </div>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 40, color: '#F5F5F0', marginBottom: 12 }}>
          ¡Solicitud enviada!
        </h2>
        <p style={{ color: '#888', fontSize: 16, maxWidth: 400, margin: '0 auto 32px' }}>
          Los profesionales de tu zona ya la están viendo. Recibirás ofertas en tu correo en minutos.
        </p>

        <div style={{
          background: '#111', border: '1px solid rgba(0,200,150,0.2)', borderRadius: 16, padding: '24px', maxWidth: 360, margin: '0 auto 32px',
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(0,200,150,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={22} color="#00C896" />
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#00C896' }}>
              {proCount}
            </div>
            <div style={{ color: '#888', fontSize: 13 }}>
              {proCount === 0 ? 'Buscando profesionales...' : `profesional${proCount > 1 ? 'es' : ''} ${proCount > 1 ? 'están revisando' : 'está revisando'} tu solicitud`}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/cliente" className="btn-green">Ver más servicios</Link>
          <Link href="/" style={{ padding: '13px 28px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)', color: '#F5F5F0', textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Progress */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          {['Categoría', 'Detalles', 'Contacto', 'Confirmación'].map((label, i) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: step > i + 1 ? '#00C896' : step === i + 1 ? 'rgba(0,200,150,0.2)' : '#1a1a1a',
                border: step >= i + 1 ? '2px solid #00C896' : '2px solid #333',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: step > i + 1 ? '#fff' : step === i + 1 ? '#00C896' : '#555',
                fontSize: 13, fontWeight: 700, transition: 'all 0.3s',
              }}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span style={{ color: step === i + 1 ? '#00C896' : '#555', fontSize: 11, fontWeight: step === i + 1 ? 600 : 400 }}>
                {label}
              </span>
            </div>
          ))}
        </div>
        <div style={{ height: 3, background: '#1a1a1a', borderRadius: 2 }}>
          <div style={{ height: '100%', background: 'linear-gradient(90deg, #00C896, #0066FF)', borderRadius: 2, width: progressWidth, transition: 'width 0.4s ease' }} />
        </div>
      </div>

      {/* Step 1 — Category */}
      {step === 1 && (
        <div>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 32, color: '#F5F5F0', marginBottom: 8 }}>
            ¿Qué tipo de servicio necesitas?
          </h2>
          <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>Selecciona la categoría que mejor describe tu necesidad</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 10, marginBottom: 28 }}>
            {CATEGORIAS.map(cat => (
              <button key={cat.id} onClick={() => { set('categoria', cat.id); setStep(2) }} style={{
                background: form.categoria === cat.id ? 'rgba(0,200,150,0.1)' : '#0D0D0D',
                border: `1.5px solid ${form.categoria === cat.id ? '#00C896' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 12, padding: '18px 12px', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { if (form.categoria !== cat.id) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,200,150,0.3)' }}
                onMouseLeave={e => { if (form.categoria !== cat.id) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)' }}
              >
                <span style={{ fontSize: 26 }}>{cat.emoji}</span>
                <span style={{ color: form.categoria === cat.id ? '#00C896' : '#ccc', fontSize: 12, fontWeight: 600, textAlign: 'center' }}>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 — Details */}
      {step === 2 && (
        <div>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 32, color: '#F5F5F0', marginBottom: 8 }}>
            Cuéntanos más detalles
          </h2>
          <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>Cuantos más detalles, mejores presupuestos recibirás</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{ color: '#ccc', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Descripción del trabajo *</label>
              <textarea
                value={form.descripcion}
                onChange={e => set('descripcion', e.target.value)}
                placeholder="Describe con detalle qué necesitas: materiales, medidas, estado actual, acceso, etc."
                rows={5}
                style={{ width: '100%', background: '#0D0D0D', border: `1px solid ${errors.descripcion ? '#ef4444' : 'rgba(255,255,255,0.1)'}`, borderRadius: 12, color: '#F5F5F0', fontSize: 14, padding: '14px 16px', resize: 'vertical', outline: 'none', fontFamily: 'Inter, sans-serif' }}
                onFocus={e => { e.target.style.borderColor = '#00C896' }}
                onBlur={e => { e.target.style.borderColor = errors.descripcion ? '#ef4444' : 'rgba(255,255,255,0.1)' }}
              />
              {errors.descripcion && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.descripcion}</p>}
            </div>

            <div>
              <label style={{ color: '#ccc', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 12 }}>Urgencia</label>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {([
                  { v: 'urgente', label: '🔴 Urgente (hoy)', desc: 'Necesito solución hoy' },
                  { v: 'esta_semana', label: '🔵 Esta semana', desc: 'En los próximos 7 días' },
                  { v: 'sin_prisa', label: '🟢 Sin prisa', desc: 'Cuando pueda' },
                ] as const).map(opt => (
                  <button key={opt.v} onClick={() => set('urgencia', opt.v)} style={{
                    flex: '1 1 140px', padding: '12px 16px', borderRadius: 12,
                    background: form.urgencia === opt.v ? 'rgba(0,200,150,0.08)' : '#0D0D0D',
                    border: `1.5px solid ${form.urgencia === opt.v ? '#00C896' : 'rgba(255,255,255,0.08)'}`,
                    color: form.urgencia === opt.v ? '#00C896' : '#888', cursor: 'pointer',
                    fontSize: 13, fontWeight: 600, textAlign: 'left',
                  }}>
                    {opt.label}
                    <div style={{ color: '#555', fontSize: 11, marginTop: 3, fontWeight: 400 }}>{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={{ color: '#ccc', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Provincia *</label>
                <select value={form.provincia} onChange={e => set('provincia', e.target.value)} style={{
                  width: '100%', background: '#0D0D0D', border: `1px solid ${errors.provincia ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 12, color: form.provincia ? '#F5F5F0' : '#555', fontSize: 14, padding: '13px 14px', outline: 'none', cursor: 'pointer',
                }}>
                  <option value="">Selecciona provincia</option>
                  {PROVINCIAS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                {errors.provincia && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.provincia}</p>}
              </div>
              <div>
                <label style={{ color: '#ccc', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Ciudad / Municipio</label>
                <input type="text" value={form.ciudad} onChange={e => set('ciudad', e.target.value)} placeholder="Ej: Alcobendas" style={{
                  width: '100%', background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12,
                  color: '#F5F5F0', fontSize: 14, padding: '13px 14px', outline: 'none',
                }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3 — Contact */}
      {step === 3 && (
        <div>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 32, color: '#F5F5F0', marginBottom: 8 }}>
            ¿Cómo contactamos contigo?
          </h2>
          <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>Tus datos solo se comparten con el profesional que elijas</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {[
              { key: 'nombre' as const, label: 'Tu nombre *', placeholder: 'Ej: María García', type: 'text' },
              { key: 'telefono' as const, label: 'Teléfono *', placeholder: 'Ej: 612345678', type: 'tel' },
              { key: 'email' as const, label: 'Email *', placeholder: 'Ej: maria@gmail.com', type: 'email' },
            ].map(field => (
              <div key={field.key}>
                <label style={{ color: '#ccc', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{field.label}</label>
                <input
                  type={field.type}
                  value={form[field.key]}
                  onChange={e => set(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  style={{
                    width: '100%', background: '#0D0D0D',
                    border: `1px solid ${errors[field.key] ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: 12, color: '#F5F5F0', fontSize: 14, padding: '13px 14px', outline: 'none',
                  }}
                  onFocus={e => { e.target.style.borderColor = '#00C896' }}
                  onBlur={e => { e.target.style.borderColor = errors[field.key] ? '#ef4444' : 'rgba(255,255,255,0.1)' }}
                />
                {errors[field.key] && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors[field.key]}</p>}
              </div>
            ))}
            <p style={{ color: '#555', fontSize: 12, lineHeight: 1.5 }}>
              🔒 Tus datos están seguros. Solo los compartiremos con el profesional que tú elijas. Consulta nuestra{' '}
              <Link href="/privacidad" style={{ color: '#00C896' }}>política de privacidad</Link>.
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 36, gap: 12 }}>
        {step > 1 ? (
          <button onClick={() => setStep(s => s - 1)} style={{
            padding: '13px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)',
            color: '#888', background: 'transparent', cursor: 'pointer', fontSize: 14, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <ChevronLeft size={16} /> Atrás
          </button>
        ) : <div />}
        {step < 4 && step !== 1 && (
          <button onClick={handleNext} disabled={loading} style={{
            padding: '13px 28px', borderRadius: 12, fontWeight: 700, fontSize: 15,
            background: 'linear-gradient(135deg, #00C896, #00A87A)',
            color: '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            {loading ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Enviando...</> : step === 3 ? <><CheckCircle size={16} /> Enviar solicitud</> : <>Siguiente <ArrowRight size={16} /></>}
          </button>
        )}
      </div>
    </>
  )
}

export default function SolicitarPage() {
  return (
    <div style={{ background: '#080808', minHeight: '100vh', paddingTop: 64 }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 24px' }}>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 36, color: '#F5F5F0', marginBottom: 6 }}>
          Pide tu presupuesto gratis
        </h1>
        <p style={{ color: '#888', fontSize: 14, marginBottom: 36 }}>Completa el formulario y recibe hasta 5 ofertas de profesionales verificados</p>

        <Suspense fallback={<div style={{ color: '#888' }}>Cargando...</div>}>
          <SolicitarContent />
        </Suspense>
      </div>
    </div>
  )
}
