'use client';

import { motion } from 'framer-motion';
import {
  FileText, Users, DollarSign, Coins, TrendingUp,
  ArrowUpRight, ArrowDownRight, Clock, Shield,
} from 'lucide-react';

const stats = [
  {
    label: 'Total solicitudes', value: '2,847', change: '+12.3%', up: true,
    icon: FileText, color: '#00C896',
  },
  {
    label: 'Total profesionales', value: '1,203', change: '+8.7%', up: true,
    icon: Users, color: '#0066FF',
  },
  {
    label: 'Ingresos (mes)', value: '18,420€', change: '+23.1%', up: true,
    icon: DollarSign, color: '#F59E0B',
  },
  {
    label: 'Creditos vendidos', value: '6,340', change: '-2.1%', up: false,
    icon: Coins, color: '#8B5CF6',
  },
];

const recentSolicitudes = [
  { id: '#2847', cat: 'Fontaneria', ciudad: 'Madrid', estado: 'Activa', ofertas: 3, hace: 'Hace 5 min' },
  { id: '#2846', cat: 'Electricidad', ciudad: 'Barcelona', estado: 'Activa', ofertas: 1, hace: 'Hace 12 min' },
  { id: '#2845', cat: 'Pintura', ciudad: 'Valencia', estado: 'Completada', ofertas: 5, hace: 'Hace 28 min' },
  { id: '#2844', cat: 'Reformas', ciudad: 'Sevilla', estado: 'Activa', ofertas: 2, hace: 'Hace 45 min' },
  { id: '#2843', cat: 'Cerrajeria', ciudad: 'Malaga', estado: 'Expirada', ofertas: 0, hace: 'Hace 1 hora' },
  { id: '#2842', cat: 'Jardineria', ciudad: 'Bilbao', estado: 'Activa', ofertas: 4, hace: 'Hace 2 horas' },
];

const recentProfesionales = [
  { nombre: 'Carlos Martinez', email: 'carlos@email.com', plan: 'Pro', creditos: 34, registro: '28 Mar 2026' },
  { nombre: 'Ana Garcia', email: 'ana@email.com', plan: 'Packs', creditos: 12, registro: '27 Mar 2026' },
  { nombre: 'Miguel Torres', email: 'miguel@email.com', plan: 'Pro', creditos: 40, registro: '26 Mar 2026' },
  { nombre: 'Laura Fernandez', email: 'laura@email.com', plan: 'Gratis', creditos: 0, registro: '25 Mar 2026' },
  { nombre: 'Roberto Sanchez', email: 'roberto@email.com', plan: 'Packs', creditos: 8, registro: '24 Mar 2026' },
];

const recentTransactions = [
  { id: 'TX-4821', tipo: 'Suscripcion Pro', usuario: 'Carlos Martinez', monto: '29.99€', fecha: '28 Mar 2026' },
  { id: 'TX-4820', tipo: 'Pack 25 creditos', usuario: 'Ana Garcia', monto: '19.99€', fecha: '27 Mar 2026' },
  { id: 'TX-4819', tipo: 'Pack 60 creditos', usuario: 'Pedro Lopez', monto: '39.99€', fecha: '27 Mar 2026' },
  { id: 'TX-4818', tipo: 'Suscripcion Pro', usuario: 'Miguel Torres', monto: '29.99€', fecha: '26 Mar 2026' },
  { id: 'TX-4817', tipo: 'Pack 10 creditos', usuario: 'Sofia Ruiz', monto: '9.99€', fecha: '26 Mar 2026' },
];

const estadoColor: Record<string, string> = {
  Activa: 'bg-[#00C896]/10 text-[#00C896]',
  Completada: 'bg-[#0066FF]/10 text-[#0066FF]',
  Expirada: 'bg-[#F5F5F0]/10 text-[#F5F5F0]/40',
};

const planColor: Record<string, string> = {
  Pro: 'bg-[#00C896]/10 text-[#00C896]',
  Packs: 'bg-[#0066FF]/10 text-[#0066FF]',
  Gratis: 'bg-[#F5F5F0]/10 text-[#F5F5F0]/40',
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F0]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display">
              <span className="text-gradient-success">Admin</span> Panel
            </h1>
            <p className="text-[#F5F5F0]/50 text-sm">PresupuestosYa - Panel de administracion</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#F5F5F0]/40">
            <Shield className="w-4 h-4 text-[#00C896]" />
            Administrador
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="glass-card rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <span className={`flex items-center gap-1 text-xs font-medium ${
                    stat.up ? 'text-[#00C896]' : 'text-red-400'
                  }`}>
                    {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-xs text-[#F5F5F0]/40">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Tables grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent solicitudes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <h2 className="text-lg font-bold font-display mb-3">Solicitudes recientes</h2>
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#F5F5F0]/06">
                      <th className="text-left p-3 text-[#F5F5F0]/40 font-medium">ID</th>
                      <th className="text-left p-3 text-[#F5F5F0]/40 font-medium">Categoria</th>
                      <th className="text-left p-3 text-[#F5F5F0]/40 font-medium">Ciudad</th>
                      <th className="text-left p-3 text-[#F5F5F0]/40 font-medium">Estado</th>
                      <th className="text-right p-3 text-[#F5F5F0]/40 font-medium">Ofertas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSolicitudes.map((s) => (
                      <tr key={s.id} className="border-b border-[#F5F5F0]/04 last:border-0 hover:bg-[#F5F5F0]/02">
                        <td className="p-3 text-[#0066FF] font-mono text-xs">{s.id}</td>
                        <td className="p-3">{s.cat}</td>
                        <td className="p-3 text-[#F5F5F0]/50">{s.ciudad}</td>
                        <td className="p-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${estadoColor[s.estado]}`}>
                            {s.estado}
                          </span>
                        </td>
                        <td className="p-3 text-right">{s.ofertas}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Recent professionals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <h2 className="text-lg font-bold font-display mb-3">Profesionales recientes</h2>
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#F5F5F0]/06">
                      <th className="text-left p-3 text-[#F5F5F0]/40 font-medium">Nombre</th>
                      <th className="text-left p-3 text-[#F5F5F0]/40 font-medium">Plan</th>
                      <th className="text-right p-3 text-[#F5F5F0]/40 font-medium">Creditos</th>
                      <th className="text-right p-3 text-[#F5F5F0]/40 font-medium">Registro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentProfesionales.map((p) => (
                      <tr key={p.email} className="border-b border-[#F5F5F0]/04 last:border-0 hover:bg-[#F5F5F0]/02">
                        <td className="p-3">
                          <div>{p.nombre}</div>
                          <div className="text-xs text-[#F5F5F0]/30">{p.email}</div>
                        </td>
                        <td className="p-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${planColor[p.plan]}`}>
                            {p.plan}
                          </span>
                        </td>
                        <td className="p-3 text-right font-mono">{p.creditos}</td>
                        <td className="p-3 text-right text-[#F5F5F0]/40 text-xs">{p.registro}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-6"
        >
          <h2 className="text-lg font-bold font-display mb-3">Transacciones recientes</h2>
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#F5F5F0]/06">
                    <th className="text-left p-3 text-[#F5F5F0]/40 font-medium">ID</th>
                    <th className="text-left p-3 text-[#F5F5F0]/40 font-medium">Tipo</th>
                    <th className="text-left p-3 text-[#F5F5F0]/40 font-medium">Usuario</th>
                    <th className="text-right p-3 text-[#F5F5F0]/40 font-medium">Monto</th>
                    <th className="text-right p-3 text-[#F5F5F0]/40 font-medium">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-[#F5F5F0]/04 last:border-0 hover:bg-[#F5F5F0]/02">
                      <td className="p-3 text-[#0066FF] font-mono text-xs">{tx.id}</td>
                      <td className="p-3">{tx.tipo}</td>
                      <td className="p-3 text-[#F5F5F0]/60">{tx.usuario}</td>
                      <td className="p-3 text-right text-[#00C896] font-semibold">{tx.monto}</td>
                      <td className="p-3 text-right text-[#F5F5F0]/40 text-xs">{tx.fecha}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
