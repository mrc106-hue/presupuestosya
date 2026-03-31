'use client'
import { motion } from 'framer-motion'
import { Shield, Users, FileText, CreditCard, TrendingUp, DollarSign } from 'lucide-react'

const STATS = [
  { label: 'Solicitudes totales', value: '12,847', icon: FileText, color: '#00C896' },
  { label: 'Profesionales', value: '3,420', icon: Users, color: '#0066FF' },
  { label: 'Ingresos mes', value: '€8,450', icon: DollarSign, color: '#22C55E' },
  { label: 'Créditos vendidos', value: '24,500', icon: CreditCard, color: '#FFB800' },
]

export default function Admin() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F0] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Shield size={24} className="text-[#00C896]" />
          <h1 className="font-display text-3xl font-bold">Admin Panel</h1>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-5 bg-[#111111] border border-[#222222]">
              <s.icon size={18} style={{ color: s.color }} className="mb-2" />
              <div className="text-2xl font-bold font-display" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-[#888888]">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
