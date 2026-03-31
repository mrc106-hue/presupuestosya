'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Coins, CheckCircle, Star, Zap, Crown, ArrowRight,
  ShieldCheck, TrendingUp, Calendar, CreditCard,
} from 'lucide-react';

const packs = [
  { credits: 10, price: '9.99', perCredit: '1.00', popular: false },
  { credits: 25, price: '19.99', perCredit: '0.80', popular: true },
  { credits: 60, price: '39.99', perCredit: '0.67', popular: false },
  { credits: 150, price: '79.99', perCredit: '0.53', popular: false },
];

const transactions = [
  { date: '28 Mar 2026', desc: 'Compra de 25 creditos', amount: '+25', type: 'compra', cost: '-19.99€' },
  { date: '27 Mar 2026', desc: 'Presupuesto enviado - Fontaneria Madrid', amount: '-3', type: 'gasto', cost: '' },
  { date: '26 Mar 2026', desc: 'Presupuesto enviado - Electricidad Barcelona', amount: '-4', type: 'gasto', cost: '' },
  { date: '25 Mar 2026', desc: 'Presupuesto enviado - Pintura Valencia', amount: '-3', type: 'gasto', cost: '' },
  { date: '24 Mar 2026', desc: 'Compra de 10 creditos', amount: '+10', type: 'compra', cost: '-9.99€' },
  { date: '23 Mar 2026', desc: 'Presupuesto enviado - Reformas Madrid', amount: '-5', type: 'gasto', cost: '' },
  { date: '20 Mar 2026', desc: 'Suscripcion Pro - 40 creditos', amount: '+40', type: 'compra', cost: '-29.99€' },
];

export default function CreditosPage() {
  const [selectedPack, setSelectedPack] = useState<number | null>(null);

  return (
    <div className="p-4 md:p-8 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold font-display mb-1">
          <span className="text-gradient-success">Creditos</span>
        </h1>
        <p className="text-[#F5F5F0]/50">Compra creditos para enviar presupuestos a clientes</p>
      </motion.div>

      {/* Current balance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#00C896]/10 flex items-center justify-center">
            <Coins className="w-7 h-7 text-[#00C896]" />
          </div>
          <div>
            <p className="text-sm text-[#F5F5F0]/50">Saldo actual</p>
            <p className="text-4xl font-bold text-[#00C896]">24 <span className="text-lg font-normal text-[#F5F5F0]/40">creditos</span></p>
          </div>
        </div>
        <div className="text-sm text-[#F5F5F0]/40">
          Suficiente para ~8 presupuestos
        </div>
      </motion.div>

      {/* Credit packs */}
      <h2 className="text-xl font-bold font-display mb-4">Packs de creditos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {packs.map((pack, idx) => (
          <motion.button
            key={pack.credits}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + idx * 0.08 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedPack(pack.credits)}
            className={`relative glass-card rounded-xl p-5 text-left transition-all min-h-[44px] ${
              selectedPack === pack.credits
                ? 'border-[#00C896] ring-1 ring-[#00C896]'
                : ''
            }`}
          >
            {pack.popular && (
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#00C896] text-[#080808] text-xs font-bold px-3 py-1 rounded-full">
                Popular
              </span>
            )}
            <div className="text-3xl font-bold mb-1">{pack.credits}</div>
            <div className="text-sm text-[#F5F5F0]/40 mb-3">creditos</div>
            <div className="text-2xl font-bold text-gradient-success mb-1">{pack.price}€</div>
            <div className="text-xs text-[#F5F5F0]/30">{pack.perCredit}€ por credito</div>
          </motion.button>
        ))}
      </div>

      {selectedPack && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-10"
        >
          <button className="btn-success w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-bold min-h-[44px] flex items-center justify-center gap-2">
            <CreditCard className="w-5 h-5" />
            Comprar {selectedPack} creditos
          </button>
        </motion.div>
      )}

      {/* Pro subscription */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-10"
      >
        <h2 className="text-xl font-bold font-display mb-4">Suscripcion Pro</h2>
        <div className="glass-card rounded-2xl p-6 border-[#00C896]/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#00C896] text-[#080808] text-xs font-bold px-4 py-1 rounded-bl-xl">
            RECOMENDADO
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Crown className="w-8 h-8 text-[#00C896]" />
                <div>
                  <h3 className="text-2xl font-bold">Plan Pro</h3>
                  <p className="text-[#F5F5F0]/50 text-sm">Todo lo que necesitas para crecer</p>
                </div>
              </div>
              <div className="text-4xl font-bold mb-4">
                <span className="text-gradient-success">29.99€</span>
                <span className="text-lg font-normal text-[#F5F5F0]/40">/mes</span>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  { icon: Coins, text: '40 creditos incluidos al mes' },
                  { icon: ShieldCheck, text: 'Insignia de profesional verificado' },
                  { icon: TrendingUp, text: 'Prioridad en el feed de solicitudes' },
                  { icon: Star, text: 'Perfil destacado en resultados' },
                  { icon: Zap, text: 'Soporte prioritario' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <Icon className="w-4 h-4 text-[#00C896] shrink-0" />
                      <span className="text-[#F5F5F0]/70">{item.text}</span>
                    </li>
                  );
                })}
              </ul>
              <button className="btn-success px-8 py-3 rounded-xl font-bold min-h-[44px] flex items-center gap-2">
                <Crown className="w-5 h-5" />
                Suscribirme al Plan Pro
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Transaction history */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-xl font-bold font-display mb-4">Historial de transacciones</h2>
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#F5F5F0]/06">
                  <th className="text-left p-4 text-[#F5F5F0]/40 font-medium">Fecha</th>
                  <th className="text-left p-4 text-[#F5F5F0]/40 font-medium">Descripcion</th>
                  <th className="text-right p-4 text-[#F5F5F0]/40 font-medium">Creditos</th>
                  <th className="text-right p-4 text-[#F5F5F0]/40 font-medium">Coste</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, i) => (
                  <tr key={i} className="border-b border-[#F5F5F0]/04 last:border-0">
                    <td className="p-4 text-[#F5F5F0]/50 whitespace-nowrap">{tx.date}</td>
                    <td className="p-4">{tx.desc}</td>
                    <td className={`p-4 text-right font-semibold ${
                      tx.type === 'compra' ? 'text-[#00C896]' : 'text-red-400'
                    }`}>
                      {tx.amount}
                    </td>
                    <td className="p-4 text-right text-[#F5F5F0]/40">{tx.cost || '\u2014'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
