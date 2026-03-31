'use client';

import { motion } from 'framer-motion';
import {
  CheckCircle, Coins, Crown, ShieldCheck, TrendingUp,
  Star, Zap, ArrowRight, X as XIcon,
} from 'lucide-react';

const packs = [
  { credits: 10, price: '9.99', perCredit: '1.00' },
  { credits: 25, price: '19.99', perCredit: '0.80', popular: true },
  { credits: 60, price: '39.99', perCredit: '0.67' },
  { credits: 150, price: '79.99', perCredit: '0.53', best: true },
];

const features = [
  { name: 'Enviar presupuestos', free: false, packs: true, pro: true },
  { name: 'Perfil de profesional', free: true, packs: true, pro: true },
  { name: 'Recibir valoraciones', free: true, packs: true, pro: true },
  { name: 'Creditos mensuales incluidos', free: false, packs: false, pro: '40/mes' },
  { name: 'Insignia verificado', free: false, packs: false, pro: true },
  { name: 'Prioridad en el feed', free: false, packs: false, pro: true },
  { name: 'Perfil destacado', free: false, packs: false, pro: true },
  { name: 'Soporte prioritario', free: false, packs: false, pro: true },
  { name: 'Estadisticas avanzadas', free: false, packs: false, pro: true },
];

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) return <CheckCircle className="w-5 h-5 text-[#00C896] mx-auto" />;
  if (value === false) return <XIcon className="w-5 h-5 text-[#F5F5F0]/20 mx-auto" />;
  return <span className="text-[#00C896] font-semibold text-sm">{value}</span>;
}

export default function PlanesPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F0]">
      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
            <span className="text-gradient-success">Planes y precios</span> para profesionales
          </h1>
          <p className="text-lg text-[#F5F5F0]/50 max-w-2xl mx-auto">
            Elige la opcion que mejor se adapte a tu negocio. Compra creditos sueltos o
            suscribete al Plan Pro para maximizar tus oportunidades.
          </p>
        </motion.div>

        {/* Credit packs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold font-display text-center mb-2">Packs de creditos</h2>
          <p className="text-center text-[#F5F5F0]/40 mb-8">Compra creditos y usarlos cuando quieras, sin caducidad</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {packs.map((pack, idx) => (
              <motion.div
                key={pack.credits}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.08 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className={`relative glass-card rounded-2xl p-6 text-center ${
                  pack.popular ? 'ring-2 ring-[#00C896]' : ''
                }`}
              >
                {pack.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00C896] text-[#080808] text-xs font-bold px-4 py-1 rounded-full">
                    MAS POPULAR
                  </span>
                )}
                {pack.best && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0066FF] text-white text-xs font-bold px-4 py-1 rounded-full">
                    MEJOR PRECIO
                  </span>
                )}
                <div className="text-4xl font-bold mb-1">{pack.credits}</div>
                <div className="text-[#F5F5F0]/40 mb-4">creditos</div>
                <div className="text-3xl font-bold text-gradient-success mb-1">{pack.price}€</div>
                <div className="text-sm text-[#F5F5F0]/30 mb-6">{pack.perCredit}€/credito</div>
                <button className={`w-full py-3 rounded-xl font-semibold min-h-[44px] transition-all ${
                  pack.popular
                    ? 'btn-success'
                    : 'border border-[#F5F5F0]/10 hover:border-[#00C896] text-[#F5F5F0]'
                }`}>
                  Comprar
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pro subscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="glass-card rounded-2xl p-8 md:p-10 relative overflow-hidden border-[#00C896]/20">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-[#00C896] to-[#0066FF] text-[#080808] text-sm font-bold px-6 py-2 rounded-bl-2xl">
              RECOMENDADO
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Crown className="w-10 h-10 text-[#00C896]" />
                  <h3 className="text-3xl font-bold font-display">Plan Pro</h3>
                </div>
                <div className="text-5xl font-bold mb-2">
                  <span className="text-gradient-success">29.99€</span>
                  <span className="text-xl font-normal text-[#F5F5F0]/40">/mes</span>
                </div>
                <ul className="space-y-2 mt-4">
                  {[
                    '40 creditos incluidos cada mes',
                    'Insignia de profesional verificado',
                    'Prioridad en el feed de solicitudes',
                    'Perfil destacado en resultados',
                    'Estadisticas avanzadas',
                    'Soporte prioritario',
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#F5F5F0]/70">
                      <CheckCircle className="w-4 h-4 text-[#00C896] shrink-0" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="shrink-0">
                <button className="btn-success px-10 py-4 rounded-xl text-lg font-bold min-h-[44px] flex items-center gap-2">
                  <Crown className="w-5 h-5" />
                  Empezar ahora
                  <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-xs text-[#F5F5F0]/30 text-center mt-2">Cancela cuando quieras</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold font-display text-center mb-8">Comparativa de planes</h2>
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#F5F5F0]/06">
                    <th className="text-left p-4 text-[#F5F5F0]/40 font-medium">Caracteristica</th>
                    <th className="text-center p-4 text-[#F5F5F0]/40 font-medium">Gratis</th>
                    <th className="text-center p-4 text-[#F5F5F0]/40 font-medium">Packs</th>
                    <th className="text-center p-4 font-medium text-[#00C896]">
                      <div className="flex items-center justify-center gap-1">
                        <Crown className="w-4 h-4" /> Pro
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feat, i) => (
                    <tr key={i} className="border-b border-[#F5F5F0]/04 last:border-0">
                      <td className="p-4">{feat.name}</td>
                      <td className="p-4 text-center"><CellValue value={feat.free} /></td>
                      <td className="p-4 text-center"><CellValue value={feat.packs} /></td>
                      <td className="p-4 text-center"><CellValue value={feat.pro} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* FAQ hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 text-[#F5F5F0]/40 text-sm"
        >
          Tienes dudas? <a href="#" className="text-[#0066FF] hover:underline">Contacta con nosotros</a>
        </motion.div>
      </div>

      <style jsx global>{`
        .glass-card {
          background: #111111;
          border: 1px solid rgba(245, 245, 240, 0.06);
          backdrop-filter: blur(12px);
        }
        .text-gradient-success {
          background: linear-gradient(135deg, #00C896, #0066FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .btn-success {
          background: linear-gradient(135deg, #00C896, #00A87A);
          color: #080808;
          border: none;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .btn-success:hover {
          opacity: 0.9;
        }
        .font-display {
          font-family: system-ui, -apple-system, sans-serif;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}
