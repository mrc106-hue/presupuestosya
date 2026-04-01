'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, ChevronLeft, Coins, Loader2 } from 'lucide-react'
import { CATEGORIAS, PROVINCIAS } from '@/lib/data'

interface ProForm {
  nombre: string
  email: string
  telefono: string
  foto: string
  sectores: string[]
  provincia: string
  zonas: string
  descripcion: string
  anios_experiencia: string
}

function CoinAnimation() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 28 }}>
      {[0, 1, 2, 3, 4].map(i => (
        <div key={i} style={{
          width: 48, height: 48, borderRadius: '50%',
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(245,158,11,0.4)',
          animation: `float 0.6s ${i * 0.12}s ease both`,
        }}>
          <Coins size={22} color="#fff" />
        </div>
      ))}
    </div>
  )
}

export default function RegistroProPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<ProForm>>({})

  const [form, setForm] = useState<ProForm>({
    nombre: '',
    email: '',
    telefono: '',
    foto: '',
    sectores: [],
    provincia: '',
    zonas: '',
    descripcion: '',
    anios_experiencia: '',
  })

  const set = (key: keyof ProForm, value: string | string[]) => {
    setForm(prev => ({ ...prev, [key]: value }))
    setErrors(prev => ({ ...prev, [key]: undefined }))
  }

  const toggleSector = (id: string) => {
    setForm(prev => ({
      ...prev,
      sectores: prev.sectores.includes(id)
        ? prev.sectores.filter(s => s !== id)
        : [...prev.sectores, id],
    }))
  }

  const validateStep1 = () => {
    const e: Partial<ProForm> = {}
    if (!form.nombre.trim()) e.nombre = 'Introduce tu nombre'
    if (!form.email.includes('@')) e.email = 'Email inválido'
    if (!form.telefono.trim() || form.telefono.length < 9) e.telefono = 'Teléfono inválido'
    return e
  }

  const validateStep2 = () => {
    const e: Partial<ProForm> = {}
    if (form.sectores.length === 0) e.sectores = 'Selecciona al menos una especialidad' as unknown as string[]
    if (!form.provincia) e.provincia = 'Selecciona tu provincia'
    return e
  }

  const handleNext = () => {
    if (step === 1) {
      const e = validateStep1()
      if (Object.keys(e).length) { setErrors(e); return }
      setStep(2)
    } else if (step === 2) {
      const e = validateStep2()
      if (Object.keys(e).length) { setErrors(e); return }
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/profesionales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
    } catch {
      // Demo mode — show success anyway
    } finally {
      setLoading(false)
      setSubmitted(true)
      setStep(3)
    }
  }

  const progress = (step / 3) * 100

  return (
    <div style={{ background: '#080808', minHeight: '100vh', paddingTop: 64 }}>
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '48px 24px' }}>

        {/* Progress */}
        {!submitted && (
          <div style={{ marginBottom: 36 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              {['Datos personales', 'Perfil profesional', 'Bienvenida'].map((label, i) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: step > i + 1 ? '#00C896' : step === i + 1 ? 'rgba(0,102,255,0.2)' : '#1a1a1a',
                    border: step >= i + 1 ? `2px solid ${step > i + 1 ? '#00C896' : '#0066FF'}` : '2px solid #333',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: step > i + 1 ? '#fff' : step === i + 1 ? '#0066FF' : '#555',
                    fontSize: 13, fontWeight: 700, transition: 'all 0.3s',
                  }}>
                    {step > i + 1 ? '✓' : i + 1}
                  </div>
                  <span style={{ color: step === i + 1 ? '#0066FF' : '#555', fontSize: 10, fontWeight: step === i + 1 ? 600 : 400, textAlign: 'center' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ height: 3, background: '#1a1a1a', borderRadius: 2 }}>
              <div style={{ height: '100%', background: 'linear-gradient(90deg, #0066FF, #00C896)', borderRadius: 2, width: `${progress}%`, transition: 'width 0.4s ease' }} />
            </div>
          </div>
        )}

        {/* Step 1 — Personal data */}
        {step === 1 && (
          <div>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 36, color: '#F5F5F0', marginBottom: 8 }}>
              Crea tu perfil profesional
            </h1>
            <p style={{ color: '#888', fontSize: 14, marginBottom: 28 }}>Cuéntanos quién eres para que los clientes te encuentren</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { key: 'nombre' as const, label: 'Nombre completo *', placeholder: 'Ej: Carlos Martínez García', type: 'text' },
                { key: 'email' as const, label: 'Email *', placeholder: 'tu@email.com', type: 'email' },
                { key: 'telefono' as const, label: 'Teléfono *', placeholder: '612 345 678', type: 'tel' },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ color: '#ccc', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>{field.label}</label>
                  <input
                    type={field.type}
                    value={form[field.key] as string}
                    onChange={e => set(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    style={{
                      width: '100%', background: '#0D0D0D',
                      border: `1px solid ${errors[field.key] ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: 12, color: '#F5F5F0', fontSize: 14, padding: '13px 14px', outline: 'none',
                    }}
                    onFocus={e => { e.target.style.borderColor = '#0066FF' }}
                    onBlur={e => { e.target.style.borderColor = errors[field.key] ? '#ef4444' : 'rgba(255,255,255,0.1)' }}
                  />
                  {errors[field.key] && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors[field.key] as string}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 — Professional info */}
        {step === 2 && (
          <div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 36, color: '#F5F5F0', marginBottom: 8 }}>
              Tu perfil profesional
            </h2>
            <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>Define tus especialidades y zona de trabajo</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={{ color: '#ccc', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 10 }}>
                  Especialidades * (selecciona todas las que aplican)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 8 }}>
                  {CATEGORIAS.map(cat => (
                    <button key={cat.id} onClick={() => toggleSector(cat.id)} style={{
                      padding: '10px 8px', borderRadius: 10,
                      background: form.sectores.includes(cat.id) ? 'rgba(0,102,255,0.1)' : '#0D0D0D',
                      border: `1.5px solid ${form.sectores.includes(cat.id) ? '#0066FF' : 'rgba(255,255,255,0.08)'}`,
                      color: form.sectores.includes(cat.id) ? '#0066FF' : '#888',
                      cursor: 'pointer', fontSize: 12, fontWeight: 600, textAlign: 'center',
                    }}>
                      <div style={{ fontSize: 18, marginBottom: 4 }}>{cat.emoji}</div>
                      {cat.label}
                    </button>
                  ))}
                </div>
                {(errors.sectores as unknown as string) && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 6 }}>{errors.sectores as unknown as string}</p>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={{ color: '#ccc', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Provincia principal *</label>
                  <select value={form.provincia} onChange={e => set('provincia', e.target.value)} style={{
                    width: '100%', background: '#0D0D0D', border: `1px solid ${errors.provincia ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: 12, color: form.provincia ? '#F5F5F0' : '#555', fontSize: 13, padding: '12px 12px', outline: 'none',
                  }}>
                    <option value="">Selecciona</option>
                    {PROVINCIAS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                  {errors.provincia && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors.provincia}</p>}
                </div>
                <div>
                  <label style={{ color: '#ccc', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Años de experiencia</label>
                  <select value={form.anios_experiencia} onChange={e => set('anios_experiencia', e.target.value)} style={{
                    width: '100%', background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12, color: form.anios_experiencia ? '#F5F5F0' : '#555', fontSize: 13, padding: '12px 12px', outline: 'none',
                  }}>
                    <option value="">Selecciona</option>
                    {['Menos de 1 año', '1-3 años', '3-5 años', '5-10 años', 'Más de 10 años'].map(v => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ color: '#ccc', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Zonas de trabajo (municipios o barrios)</label>
                <input type="text" value={form.zonas} onChange={e => set('zonas', e.target.value)} placeholder="Ej: Madrid centro, Alcobendas, Alcalá de Henares" style={{
                  width: '100%', background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12,
                  color: '#F5F5F0', fontSize: 14, padding: '13px 14px', outline: 'none',
                }} />
              </div>

              <div>
                <label style={{ color: '#ccc', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Descripción de tus servicios</label>
                <textarea value={form.descripcion} onChange={e => set('descripcion', e.target.value)} placeholder="Cuéntales a los clientes sobre tu experiencia, qué servicios ofreces y por qué deberían elegirte..." rows={4} style={{
                  width: '100%', background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12,
                  color: '#F5F5F0', fontSize: 14, padding: '14px', resize: 'vertical', outline: 'none', fontFamily: 'Inter, sans-serif',
                }} />
              </div>
            </div>
          </div>
        )}

        {/* Step 3 — Success */}
        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CoinAnimation />

            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'rgba(0,200,150,0.1)', border: '3px solid #00C896',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px', animation: 'checkPop 0.5s ease both',
            }}>
              <CheckCircle size={40} color="#00C896" />
            </div>

            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 40, color: '#F5F5F0', marginBottom: 12 }}>
              ¡Ya eres profesional!
            </h2>
            <p style={{ color: '#888', fontSize: 16, maxWidth: 380, margin: '0 auto 32px' }}>
              Te hemos dado <strong style={{ color: '#f59e0b' }}>5 créditos de bienvenida 🎁</strong> para que empieces a conseguir clientes.
            </p>

            <div style={{
              background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)',
              borderRadius: 14, padding: '20px', maxWidth: 360, margin: '0 auto 32px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ color: '#ccc', fontSize: 14 }}>Créditos de bienvenida</span>
                <span style={{ color: '#f59e0b', fontWeight: 800, fontSize: 18 }}>+5 créditos</span>
              </div>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 12 }} />
              <div style={{ color: '#888', fontSize: 12, lineHeight: 1.5 }}>
                Con 5 créditos puedes responder a solicitudes de fontanería (2 cr), electricidad (2 cr), o limpieza (1 cr) para probar la plataforma.
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/solicitudes" className="btn-green" style={{ fontSize: 15 }}>
                Ver solicitudes disponibles <ArrowRight size={16} />
              </Link>
              <Link href="/creditos" style={{ padding: '13px 24px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)', color: '#F5F5F0', textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>
                Comprar más créditos
              </Link>
            </div>
          </div>
        )}

        {/* Navigation */}
        {!submitted && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 36, gap: 12 }}>
            {step > 1 ? (
              <button onClick={() => setStep(s => s - 1)} style={{
                padding: '12px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)',
                color: '#888', background: 'transparent', cursor: 'pointer', fontSize: 14, fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <ChevronLeft size={16} /> Atrás
              </button>
            ) : <div />}
            <button onClick={handleNext} disabled={loading} style={{
              padding: '13px 28px', borderRadius: 12, fontWeight: 700, fontSize: 15,
              background: 'linear-gradient(135deg, #0066FF, #004FCC)',
              color: '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', gap: 8,
              opacity: loading ? 0.7 : 1,
            }}>
              {loading
                ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Creando perfil...</>
                : step === 2
                  ? <><CheckCircle size={16} /> Crear mi perfil</>
                  : <>Siguiente <ArrowRight size={16} /></>
              }
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
