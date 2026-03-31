'use client'
import { motion } from 'framer-motion'
import { CreditCard, Zap, Shield, Star, TrendingUp, CheckCircle } from 'lucide-react'

const PACKS = [
  { credits: 10, price: '9,99€', perCredit: '1,00€', popular: false },
  { credits: 25, price: '19,99€', perCredit: '0,80€', popular: false },
  { credits: 60, price: '39,99€', perCredit: '0,67€', popular: true },
  { credits: 150, price: '79,99€', perCredit: '0,53€', popular: false },
]

export default function Creditos() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-2">Créditos</h1>
      <p className="text-[#888888] text-sm mb-8">Compra créditos para enviar presupuestos a clientes</p>

      {/* Current balance */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-[#00C896]/10 to-[#0066FF]/10 border border-[#00C896]/20 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#00C896]/20 flex items-center justify-center">
            <CreditCard size={28} className="text-[#00C896]" />
          </div>
          <div>
            <span className="text-sm text-[#888888]">Tu saldo actual</span>
            <div className="text-4xl font-bold font-display text-[#00C896]">5 créditos</div>
          </div>
        </div>
      </div>

      <h2 className="font-display text-xl font-bold mb-4">PACKS DE CRÉDITOS</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {PACKS.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className={`rounded-2xl p-6 border text-center cursor-pointer transition-all hover:shadow-lg ${p.popular ? 'border-[#00C896] bg-[#00C896]/5 shadow-[0_0_30px_rgba(0,200,150,0.1)]' : 'border-[#222222] bg-[#111111]'}`}>
            {p.popular && <div className="text-[#00C896] text-xs font-bold mb-2">★ MÁS POPULAR</div>}
            <div className="font-display text-4xl font-bold text-[#00C896] mb-1">{p.credits}</div>
            <div className="text-xs text-[#888888] mb-3">créditos</div>
            <div className="text-xl font-bold mb-1">{p.price}</div>
            <div className="text-xs text-[#888888] mb-4">{p.perCredit}/crédito</div>
            <button className={`w-full py-3 rounded-xl font-bold transition-all ${p.popular ? 'bg-[#00C896] text-white hover:shadow-[0_0_20px_rgba(0,200,150,0.3)]' : 'border border-[#222222] text-[#888888] hover:border-[#00C896] hover:text-[#00C896]'}`}>
              Comprar
            </button>
          </motion.div>
        ))}
      </div>

      {/* Subscription */}
      <div className="rounded-2xl p-6 bg-[#111111] border border-[#0066FF]/30">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#0066FF]/10 flex items-center justify-center shrink-0">
            <Shield size={24} className="text-[#0066FF]" />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-xl font-bold mb-1">Plan Profesional — 29,99€/mes</h3>
            <div className="grid grid-cols-2 gap-2 mt-3 mb-4">
              {['40 créditos/mes incluidos', 'Badge verificado', 'Apareces primero en el feed', 'Créditos sin caducidad'].map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-[#888888]">
                  <CheckCircle size={14} className="text-[#0066FF]" />{f}
                </div>
              ))}
            </div>
            <button className="px-6 py-3 rounded-xl bg-[#0066FF] text-white font-bold hover:shadow-[0_0_20px_rgba(0,102,255,0.3)] transition-all">
              Suscribirme ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
