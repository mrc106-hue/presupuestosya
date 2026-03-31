'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Droplets, Zap, Paintbrush, Hammer, Thermometer, Lock,
  Trees, Truck, Clock, MapPin, Users, Filter, Search,
  AlertTriangle, ChevronDown,
} from 'lucide-react';

const categorias = [
  'Todas', 'Fontaneria', 'Electricidad', 'Pintura', 'Reformas',
  'Climatizacion', 'Cerrajeria', 'Jardineria', 'Mudanzas',
];

const provincias = [
  'Todas', 'Madrid', 'Barcelona', 'Valencia', 'Sevilla',
  'Zaragoza', 'Malaga', 'Bilbao', 'Alicante',
];

const urgencias = ['Todas', 'Urgente', 'Esta semana', 'Sin prisa'];

const iconMap: Record<string, any> = {
  Fontaneria: Droplets,
  Electricidad: Zap,
  Pintura: Paintbrush,
  Reformas: Hammer,
  Climatizacion: Thermometer,
  Cerrajeria: Lock,
  Jardineria: Trees,
  Mudanzas: Truck,
};

const mockSolicitudes = [
  {
    id: 1, categoria: 'Fontaneria',
    descripcion: 'Necesito arreglar una fuga en el bano principal. El grifo gotea constantemente y ha empezado a manchar el techo del vecino de abajo.',
    provincia: 'Madrid', ciudad: 'Centro',
    urgencia: 'Urgente', tiempo: 'Hace 10 min', ofertas: 1, creditos: 3,
  },
  {
    id: 2, categoria: 'Electricidad',
    descripcion: 'Instalacion completa de iluminacion LED en oficina de 120m2. Necesito 20 puntos de luz y cambio de cuadro electrico.',
    provincia: 'Madrid', ciudad: 'Chamartin',
    urgencia: 'Esta semana', tiempo: 'Hace 30 min', ofertas: 3, creditos: 4,
  },
  {
    id: 3, categoria: 'Pintura',
    descripcion: 'Pintar exterior de chalet adosado, fachada principal y lateral. Aproximadamente 150m2 de superficie.',
    provincia: 'Madrid', ciudad: 'Pozuelo',
    urgencia: 'Sin prisa', tiempo: 'Hace 1 hora', ofertas: 2, creditos: 3,
  },
  {
    id: 4, categoria: 'Reformas',
    descripcion: 'Reforma integral de cocina. Tirar tabique, nueva distribucion, muebles, electrodomesticos, fontaneria y electricidad.',
    provincia: 'Barcelona', ciudad: 'Eixample',
    urgencia: 'Esta semana', tiempo: 'Hace 2 horas', ofertas: 5, creditos: 6,
  },
  {
    id: 5, categoria: 'Climatizacion',
    descripcion: 'Instalacion de sistema de aerotermia para vivienda unifamiliar de 200m2. Incluir suelo radiante.',
    provincia: 'Valencia', ciudad: 'Centro',
    urgencia: 'Sin prisa', tiempo: 'Hace 3 horas', ofertas: 1, creditos: 5,
  },
  {
    id: 6, categoria: 'Cerrajeria',
    descripcion: 'Cambio de cerradura de seguridad en puerta blindada. Necesito cerradura antibumping de alta seguridad.',
    provincia: 'Sevilla', ciudad: 'Triana',
    urgencia: 'Urgente', tiempo: 'Hace 4 horas', ofertas: 0, creditos: 2,
  },
  {
    id: 7, categoria: 'Jardineria',
    descripcion: 'Diseno y ejecucion de jardin en terraza de 40m2. Cesped artificial, plantas, sistema de riego y iluminacion.',
    provincia: 'Malaga', ciudad: 'Marbella',
    urgencia: 'Esta semana', tiempo: 'Hace 5 horas', ofertas: 4, creditos: 3,
  },
  {
    id: 8, categoria: 'Mudanzas',
    descripcion: 'Mudanza de piso de 3 habitaciones en 4o piso sin ascensor. Destino a 15km. Necesito embalaje completo.',
    provincia: 'Madrid', ciudad: 'Vallecas',
    urgencia: 'Esta semana', tiempo: 'Hace 6 horas', ofertas: 2, creditos: 3,
  },
];

const urgenciaColor: Record<string, string> = {
  Urgente: 'bg-red-500/10 text-red-400',
  'Esta semana': 'bg-yellow-500/10 text-yellow-400',
  'Sin prisa': 'bg-[#00C896]/10 text-[#00C896]',
};

export default function SolicitudesPage() {
  const [catFilter, setCatFilter] = useState('Todas');
  const [provFilter, setProvFilter] = useState('Todas');
  const [urgFilter, setUrgFilter] = useState('Todas');

  const filtered = mockSolicitudes.filter((s) => {
    if (catFilter !== 'Todas' && s.categoria !== catFilter) return false;
    if (provFilter !== 'Todas' && s.provincia !== provFilter) return false;
    if (urgFilter !== 'Todas' && s.urgencia !== urgFilter) return false;
    return true;
  });

  return (
    <div className="p-4 md:p-8 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl md:text-3xl font-bold font-display mb-1">
          <span className="text-gradient-success">Solicitudes</span> disponibles
        </h1>
        <p className="text-[#F5F5F0]/50">Encuentra trabajos en tu zona y envia presupuestos</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-xl p-4 mb-6"
      >
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-[#00C896]" />
          <span className="text-sm font-semibold">Filtros</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            className="w-full bg-[#080808] border border-[#F5F5F0]/10 rounded-lg px-4 py-3 text-sm text-[#F5F5F0] focus:border-[#00C896] focus:outline-none min-h-[44px]"
          >
            {categorias.map((c) => (
              <option key={c} value={c}>{c === 'Todas' ? 'Todas las categorias' : c}</option>
            ))}
          </select>
          <select
            value={provFilter}
            onChange={(e) => setProvFilter(e.target.value)}
            className="w-full bg-[#080808] border border-[#F5F5F0]/10 rounded-lg px-4 py-3 text-sm text-[#F5F5F0] focus:border-[#00C896] focus:outline-none min-h-[44px]"
          >
            {provincias.map((p) => (
              <option key={p} value={p}>{p === 'Todas' ? 'Todas las provincias' : p}</option>
            ))}
          </select>
          <select
            value={urgFilter}
            onChange={(e) => setUrgFilter(e.target.value)}
            className="w-full bg-[#080808] border border-[#F5F5F0]/10 rounded-lg px-4 py-3 text-sm text-[#F5F5F0] focus:border-[#00C896] focus:outline-none min-h-[44px]"
          >
            {urgencias.map((u) => (
              <option key={u} value={u}>{u === 'Todas' ? 'Todas las urgencias' : u}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Results count */}
      <p className="text-sm text-[#F5F5F0]/40 mb-4">{filtered.length} solicitudes encontradas</p>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((sol, idx) => {
          const Icon = iconMap[sol.categoria] || Hammer;
          return (
            <motion.div
              key={sol.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + idx * 0.05 }}
              className="glass-card rounded-xl p-5"
            >
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#00C896]/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#00C896]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-[#00C896]">{sol.categoria}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${urgenciaColor[sol.urgencia]}`}>
                          {sol.urgencia}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[#F5F5F0]/40 mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {sol.provincia}, {sol.ciudad}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {sol.tiempo}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" /> {sol.ofertas} ofertas
                        </span>
                      </div>
                    </div>
                    <span className="shrink-0 text-xs font-bold bg-[#00C896]/10 text-[#00C896] px-3 py-1.5 rounded-full">
                      {sol.creditos} creditos
                    </span>
                  </div>
                  <p className="text-sm text-[#F5F5F0]/60 mt-2 mb-4">
                    {sol.descripcion}
                  </p>
                  <button className="btn-success px-5 py-2.5 rounded-lg text-sm font-semibold min-h-[44px]">
                    Enviar presupuesto
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Search className="w-12 h-12 text-[#F5F5F0]/20 mx-auto mb-4" />
          <p className="text-[#F5F5F0]/40">No se encontraron solicitudes con estos filtros</p>
        </div>
      )}
    </div>
  );
}
