'use client';

import { motion } from 'framer-motion';
import {
  Coins, Briefcase, Star, Send, Droplets, Zap, Paintbrush,
  Hammer, Thermometer, Clock, MapPin, Users, ArrowRight,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Creditos disponibles', value: '24', icon: Coins, color: '#00C896' },
  { label: 'Trabajos este mes', value: '12', icon: Briefcase, color: '#0066FF' },
  { label: 'Valoracion media', value: '4.8', icon: Star, color: '#F59E0B' },
  { label: 'Ofertas enviadas', value: '31', icon: Send, color: '#8B5CF6' },
];

const solicitudes = [
  {
    id: 1,
    categoria: 'Fontaneria',
    icon: Droplets,
    descripcion: 'Necesito arreglar una fuga en el bano principal. El grifo gotea constantemente...',
    provincia: 'Madrid',
    tiempo: 'Hace 15 min',
    ofertas: 2,
    creditos: 3,
  },
  {
    id: 2,
    categoria: 'Electricidad',
    icon: Zap,
    descripcion: 'Instalacion de 4 puntos de luz en salon y cambio de cuadro electrico...',
    provincia: 'Madrid',
    tiempo: 'Hace 45 min',
    ofertas: 1,
    creditos: 3,
  },
  {
    id: 3,
    categoria: 'Pintura',
    icon: Paintbrush,
    descripcion: 'Pintar piso completo de 80m2, 3 habitaciones, salon y cocina. Paredes y techos...',
    provincia: 'Alcorcon',
    tiempo: 'Hace 1 hora',
    ofertas: 4,
    creditos: 2,
  },
  {
    id: 4,
    categoria: 'Reformas',
    icon: Hammer,
    descripcion: 'Reforma integral de bano. Cambiar banera por plato de ducha, alicatar...',
    provincia: 'Getafe',
    tiempo: 'Hace 2 horas',
    ofertas: 3,
    creditos: 5,
  },
  {
    id: 5,
    categoria: 'Climatizacion',
    icon: Thermometer,
    descripcion: 'Instalacion de aire acondicionado split en dos habitaciones...',
    provincia: 'Madrid',
    tiempo: 'Hace 3 horas',
    ofertas: 0,
    creditos: 3,
  },
];

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-8 max-w-5xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold font-display mb-1">
          Buenos dias, <span className="text-gradient-success">Carlos</span>
        </h1>
        <p className="text-[#F5F5F0]/50">Tienes 5 nuevas solicitudes en tu zona</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card rounded-xl p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-[#F5F5F0]/40">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Solicitudes feed */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold font-display">Solicitudes en tu zona</h2>
        <Link
          href="/profesional/solicitudes"
          className="text-[#0066FF] text-sm hover:underline flex items-center gap-1"
        >
          Ver todas <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {solicitudes.map((sol, idx) => {
          const Icon = sol.icon;
          return (
            <motion.div
              key={sol.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.08 }}
              className="glass-card rounded-xl p-5"
            >
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#00C896]/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#00C896]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <span className="text-sm font-semibold text-[#00C896]">{sol.categoria}</span>
                      <div className="flex items-center gap-3 text-xs text-[#F5F5F0]/40 mt-0.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {sol.provincia}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {sol.tiempo}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" /> {sol.ofertas} ofertas
                        </span>
                      </div>
                    </div>
                    <span className="shrink-0 text-xs font-semibold bg-[#00C896]/10 text-[#00C896] px-2.5 py-1 rounded-full">
                      {sol.creditos} creditos
                    </span>
                  </div>
                  <p className="text-sm text-[#F5F5F0]/60 mt-2 mb-3 line-clamp-2">
                    {sol.descripcion}
                  </p>
                  <button className="btn-success px-5 py-2 rounded-lg text-sm font-semibold min-h-[44px]">
                    Enviar presupuesto
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Buy credits CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 glass-card rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-[#00C896]" />
          <div>
            <p className="font-semibold">Consigue mas clientes</p>
            <p className="text-sm text-[#F5F5F0]/50">Compra creditos y responde a mas solicitudes</p>
          </div>
        </div>
        <Link
          href="/profesional/creditos"
          className="btn-success px-6 py-3 rounded-xl font-semibold min-h-[44px] whitespace-nowrap"
        >
          Comprar creditos
        </Link>
      </motion.div>
    </div>
  );
}
