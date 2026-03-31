'use client'
import { motion } from 'framer-motion'
import { CheckCircle, CreditCard, Shield, Star, Zap, ArrowRight } from 'lucide-react'

const PACKS = [
  { credits: 10, price: '9,99€', per: '1,00€' },
  { credits: 25, price: '19,99€', per: '0,80€' },
  { credits: 60, price: '39,99€', per: '0,67€', popular: true },
  { credits: 150, price: '79,99€', per: '0,53€' },
]

export default function Planes() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F0]">
      <div className="max-w-5xl mx-auto py-20 px-6">
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl font-bold mb-4">Planes para <span className="text-gradient-success">Profesionales</span></h1>
          <p className="text-[#888888] text-lg">Compra créditos para contactar con clientes que necesitan tus servicios</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {PACKS.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className={`rounded-2xl p-6 text-center border transition-all cursor-pointer hover:shadow-lg ${p.popular ? 'border-[#00C896] bg-[#00C896]/5' : 'border-[#222222] bg-[#111111]'}`}>
              {p.popular && <div className="text-[#00C896] text-xs font-bold mb-2">★ MEJOR VALOR</div>}
              <div className="font-display text-4xl font-bold text-[#00C896]">{p.credits}</div>
              <div className="text-xs text-[#888888] mb-3">créditos</div>
              <div className="text-xl font-bold">{p.price}</div>
              <div className="text-xs text-[#888888] mb-4">{p.per}/crédito</div>
              <button className={`w-full py-3 rounded-xl font-bold ${p.popular ? 'bg-[#00C896] text-white' : 'border border-[#222222] text-[#888888] hover:border-[#00C896]'}`}>Comprar</button>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="rounded-2xl p-8 bg-[#111111] border border-[#0066FF]/30 text-center">
          <Shield size={32} className="text-[#0066FF] mx-auto mb-4" />
          <h2 className="font-display text-3xl font-bold mb-2">Plan Profesional</h2>
          <div className="font-display text-5xl font-bold text-[#0066FF] mb-2">29,99€<span className="text-lg text-[#888888]">/mes</span></div>
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto my-6">
            {['40 créditos/mes', 'Badge verificado', 'Prioridad en el feed', 'Sin caducidad de créditos'].map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm"><CheckCircle size={14} className="text-[#0066FF]" />{f}</div>
            ))}
          </div>
          <button className="px-8 py-4 rounded-xl bg-[#0066FF] text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(0,102,255,0.3)] transition-all">
            Suscribirme <ArrowRight size={16} className="inline ml-1" />
          </button>
        </motion.div>
      </div>
    </div>
  )
}
