'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, MapPin, ArrowRight, Wrench, Zap, Home, Hammer, Key, Monitor,
  Wind, Paintbrush, TreePine, Truck, Sparkles, Car, Settings, Globe,
  Calculator, Camera, GraduationCap, MoreHorizontal, Clock, Star,
  Users, TrendingUp, CheckCircle, Shield, ChevronRight,
} from 'lucide-react'

const CATEGORIAS = [
  { name: 'Fontanería', icon: Wrench, color: '#00C896' },
  { name: 'Electricidad', icon: Zap, color: '#0066FF' },
  { name: 'Reformas', icon: Home, color: '#FF6B00' },
  { name: 'Carpintería', icon: Hammer, color: '#FFB800' },
  { name: 'Cerrajería', icon: Key, color: '#8B5CF6' },
  { name: 'Informática', icon: Monitor, color: '#3B82F6' },
  { name: 'Climatización', icon: Wind, color: '#06B6D4' },
  { name: 'Pintura', icon: Paintbrush, color: '#EC4899' },
  { name: 'Jardinería', icon: TreePine, color: '#22C55E' },
  { name: 'Mudanzas', icon: Truck, color: '#F59E0B' },
  { name: 'Limpieza', icon: Sparkles, color: '#14B8A6' },
  { name: 'Mecánica', icon: Car, color: '#EF4444' },
  { name: 'Instalaciones', icon: Settings, color: '#6366F1' },
  { name: 'Diseño web', icon: Globe, color: '#0EA5E9' },
  { name: 'Contabilidad', icon: Calculator, color: '#10B981' },
  { name: 'Fotografía', icon: Camera, color: '#A855F7' },
  { name: 'Clases', icon: GraduationCap, color: '#F97316' },
  { name: 'Otros', icon: MoreHorizontal, color: '#6B7280' },
]

const PROVINCIAS = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Málaga', 'Zaragoza', 'Bilbao', 'Alicante', 'Tarragona', 'Murcia', 'Otra']

const MOCK_SOLICITUDES = [
  { emoji: '🔧', texto: 'Fontanero urgente en Barcelona', tiempo: 'hace 5 min' },
  { emoji: '💻', texto: 'Técnico informático en Madrid', tiempo: 'hace 12 min' },
  { emoji: '🏠', texto: 'Reforma cocina en Tarragona', tiempo: 'hace 23 min' },
  { emoji: '⚡', texto: 'Electricista en Valencia', tiempo: 'hace 31 min' },
  { emoji: '🔑', texto: 'Cerrajero urgente en Sevilla', tiempo: 'hace 45 min' },
  { emoji: '🎨', texto: 'Pintor para piso en Málaga', tiempo: 'hace 1h' },
  { emoji: '🌳', texto: 'Jardinero para chalet en Zaragoza', tiempo: 'hace 1h' },
  { emoji: '📦', texto: 'Mudanza local en Bilbao', tiempo: 'hace 2h' },
]

function LiveFeed() {
  const [items, setItems] = useState(MOCK_SOLICITUDES.slice(0, 5))
  const [counter, setCounter] = useState(847)

  useEffect(() => {
    const t = setInterval(() => {
      setItems(prev => {
        const next = MOCK_SOLICITUDES[Math.floor(Math.random() * MOCK_SOLICITUDES.length)]
        return [{ ...next, tiempo: 'ahora mismo' }, ...prev.slice(0, 4)]
      })
      setCounter(c => c + 1)
    }, 8000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-xl font-bold">SOLICITUDES EN VIVO</h3>
        <span className="text-xs px-3 py-1 rounded-full bg-py-green/10 text-py-green font-bold animate-pulse">
          ● EN DIRECTO
        </span>
      </div>
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {items.map((s, i) => (
            <motion.div
              key={`${s.texto}-${i}`}
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-3 py-2 border-b border-py-border/50 last:border-0"
            >
              <span className="text-lg">{s.emoji}</span>
              <span className="text-sm flex-1">{s.texto}</span>
              <span className="text-xs text-py-muted">{s.tiempo}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="mt-4 pt-4 border-t border-py-border">
        <div className="text-center">
          <span className="text-3xl font-bold font-display text-gradient-success">{counter}</span>
          <span className="text-sm text-py-muted ml-2">presupuestos enviados hoy</span>
        </div>
      </div>
    </div>
  )
}

function Particles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            left: `${Math.random() * 100}%`,
            bottom: `-5%`,
            background: `radial-gradient(circle, ${Math.random() > 0.5 ? '#00C896' : '#0066FF'}, transparent)`,
            animation: `particle-float ${8 + Math.random() * 12}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 10}s`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  )
}

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [provincia, setProvincia] = useState('')

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Particles />

      {/* Nav */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <CheckCircle size={24} className="text-py-green" />
          <span className="font-display text-2xl font-bold tracking-wide">PRESUPUESTOS<span className="text-py-green">YA</span></span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/profesional/dashboard" className="text-sm text-py-muted hover:text-py-green transition-colors">Soy profesional</a>
          <a href="/solicitar" className="btn-success px-5 py-2.5 rounded-xl text-white font-bold text-sm flex items-center gap-2">
            Pedir presupuesto <ArrowRight size={14} />
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 pt-16 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
            transition={{ duration: 1 }}
            className="font-display text-5xl md:text-7xl font-bold mb-4 tracking-tight"
          >
            ¿Qué necesitas<br /><span className="text-gradient-success">arreglar hoy</span>?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-py-muted mb-10"
          >
            Pide presupuesto gratis. Recibe ofertas en minutos.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card rounded-2xl p-3 flex flex-col md:flex-row gap-3 max-w-3xl mx-auto"
          >
            <div className="flex items-center gap-3 flex-1 bg-py-bg rounded-xl px-4 py-3 border border-py-border">
              <Search size={18} className="text-py-muted" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Describe qué necesitas..."
                className="bg-transparent flex-1 outline-none text-py-text placeholder:text-py-muted/50"
              />
            </div>
            <div className="flex items-center gap-3 bg-py-bg rounded-xl px-4 py-3 border border-py-border md:w-48">
              <MapPin size={18} className="text-py-muted" />
              <select
                value={provincia}
                onChange={e => setProvincia(e.target.value)}
                className="bg-transparent flex-1 outline-none text-py-text appearance-none cursor-pointer"
              >
                <option value="">Provincia</option>
                {PROVINCIAS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <a
              href="/solicitar"
              className="btn-success px-8 py-3 rounded-xl text-white font-bold flex items-center justify-center gap-2 whitespace-nowrap"
            >
              PEDIR GRATIS <ArrowRight size={16} />
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-sm text-py-muted mt-4 flex items-center justify-center gap-4"
          >
            <span className="flex items-center gap-1"><CheckCircle size={12} className="text-py-green" /> Es gratis</span>
            <span className="flex items-center gap-1"><Shield size={12} className="text-py-blue" /> Sin compromiso</span>
            <span className="flex items-center gap-1"><Users size={12} className="text-py-green" /> Hasta 5 ofertas</span>
          </motion.p>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-10">CATEGORÍAS POPULARES</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4">
            {CATEGORIAS.map((c, i) => (
              <motion.a
                key={i}
                href={`/solicitar?categoria=${encodeURIComponent(c.name)}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-py-border bg-py-card hover:border-py-green/30 transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: `${c.color}15` }}>
                  <c.icon size={20} style={{ color: c.color }} />
                </div>
                <span className="text-xs text-center text-py-muted group-hover:text-py-text transition-colors">{c.name}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* FEED + STATS */}
      <section className="relative z-10 py-16 px-6 bg-gradient-to-b from-transparent via-py-green/[0.02] to-transparent">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          <LiveFeed />

          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Solicitudes este mes', value: '12,847', icon: TrendingUp, color: '#00C896' },
                { label: 'Profesionales activos', value: '3,420', icon: Users, color: '#0066FF' },
                { label: 'Presupuestos enviados', value: '45,230', icon: CheckCircle, color: '#FFB800' },
                { label: 'Valoración media', value: '4.8/5', icon: Star, color: '#FF6B00' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-xl p-5"
                >
                  <s.icon size={18} style={{ color: s.color }} className="mb-2" />
                  <div className="text-2xl font-bold font-display" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-xs text-py-muted">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* How it works */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display text-xl font-bold mb-6">CÓMO FUNCIONA</h3>
              {[
                { step: '1', title: 'Describe tu necesidad', desc: 'Cuéntanos qué necesitas y dónde estás', color: '#00C896' },
                { step: '2', title: 'Recibe hasta 5 ofertas', desc: 'Profesionales verificados te envían su presupuesto', color: '#0066FF' },
                { step: '3', title: 'Elige y contrata', desc: 'Compara precios, valoraciones y elige el mejor', color: '#FFB800' },
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-4 mb-5 last:mb-0">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-display text-xl font-bold shrink-0" style={{ background: `${s.color}15`, color: s.color }}>{s.step}</div>
                  <div>
                    <h4 className="font-bold mb-1">{s.title}</h4>
                    <p className="text-sm text-py-muted">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Profesionales */}
      <section className="relative z-10 py-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-card rounded-2xl p-10 text-center border-py-blue/20"
        >
          <h2 className="font-display text-3xl font-bold mb-4">¿Eres profesional?</h2>
          <p className="text-py-muted mb-6">Recibe trabajos cerca de ti. 5 créditos gratis al registrarte.</p>
          <a href="/profesional/dashboard" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-py-blue text-white font-bold hover:shadow-[0_0_30px_rgba(0,102,255,0.3)] transition-all">
            Registrarme como profesional <ChevronRight size={16} />
          </a>
        </motion.div>
      </section>

      {/* Cross-promo FixPro */}
      <section className="relative z-10 py-8 px-6">
        <div className="max-w-4xl mx-auto text-center border border-py-border rounded-xl p-6 bg-py-card/50">
          <p className="text-sm text-py-muted">
            ¿Quieres visibilidad constante? Publica tu perfil en <a href="#" className="text-py-green font-bold hover:underline">FixPro.es</a> — el directorio premium de profesionales
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-py-border py-8 px-6 text-center text-py-muted text-sm">
        <p>© 2026 PresupuestosYa — Parte del ecosistema de webs IA</p>
      </footer>
    </div>
  )
}
