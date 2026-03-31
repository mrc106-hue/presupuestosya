'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Star, MessageCircle, User, ExternalLink, Inbox,
  Clock, MapPin, Phone,
} from 'lucide-react';

const mockOfertas = [
  {
    id: 1,
    nombre: 'Carlos Martinez',
    color: '#00C896',
    rating: 4.8,
    reviews: 47,
    descripcion: 'Fontanero profesional con 15 anos de experiencia. Garantia de 2 anos en todos los trabajos. Incluyo materiales de primera calidad.',
    precio: '120 - 180€',
    tiempo: 'Hace 2 horas',
  },
  {
    id: 2,
    nombre: 'Ana Garcia Lopez',
    color: '#0066FF',
    rating: 4.9,
    reviews: 83,
    descripcion: 'Especialista en reparaciones urgentes. Disponibilidad inmediata. Presupuesto sin compromiso con desglose detallado de materiales y mano de obra.',
    precio: '95 - 150€',
    tiempo: 'Hace 3 horas',
  },
  {
    id: 3,
    nombre: 'Miguel Torres',
    color: '#8B5CF6',
    rating: 4.6,
    reviews: 31,
    descripcion: 'Tecnico certificado. Trabajo limpio y eficiente. Puedo ir manana por la manana si te viene bien.',
    precio: '140 - 200€',
    tiempo: 'Hace 5 horas',
  },
  {
    id: 4,
    nombre: 'Laura Fernandez',
    color: '#F59E0B',
    rating: 4.7,
    reviews: 56,
    descripcion: 'Mas de 20 anos en el sector. Ofrezco diagnostico gratuito y presupuesto cerrado. Materiales incluidos.',
    precio: '110 - 160€',
    tiempo: 'Hace 8 horas',
  },
  {
    id: 5,
    nombre: 'Roberto Sanchez',
    color: '#EF4444',
    rating: 4.5,
    reviews: 22,
    descripcion: 'Profesional autonomo con tarifas competitivas. Trabajo flexible en horarios. Factura incluida.',
    precio: '85 - 130€',
    tiempo: 'Hace 1 dia',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= Math.floor(rating)
              ? 'text-yellow-400 fill-yellow-400'
              : star - 0.5 <= rating
              ? 'text-yellow-400 fill-yellow-400/50'
              : 'text-[#F5F5F0]/20'
          }`}
        />
      ))}
      <span className="text-sm text-[#F5F5F0]/60 ml-1">
        {rating} ({reviews} opiniones)
      </span>
    </div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-20"
    >
      <div className="w-20 h-20 rounded-full bg-[#111111] flex items-center justify-center mx-auto mb-6">
        <Inbox className="w-10 h-10 text-[#F5F5F0]/30" />
      </div>
      <h2 className="text-2xl font-bold font-display mb-3">Aun no tienes ofertas</h2>
      <p className="text-[#F5F5F0]/50 max-w-md mx-auto mb-8">
        Los profesionales estan revisando tu solicitud. Recibiras ofertas en las proximas horas.
      </p>
      <a
        href="/solicitar"
        className="btn-success inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold min-h-[44px]"
      >
        Crear nueva solicitud
      </a>
    </motion.div>
  );
}

export default function OfertasPage() {
  const [showEmpty] = useState(false);

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F0]">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">
            <span className="text-gradient-success">Tus ofertas</span> recibidas
          </h1>
          <p className="text-[#F5F5F0]/50">
            Fontaneria &middot; Madrid &middot; 5 ofertas recibidas
          </p>
        </motion.div>

        {showEmpty ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {mockOfertas.map((oferta, idx) => (
              <motion.div
                key={oferta.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex gap-4">
                  {/* Avatar */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-lg"
                    style={{ backgroundColor: oferta.color }}
                  >
                    {oferta.nombre.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{oferta.nombre}</h3>
                      <span className="text-xs text-[#F5F5F0]/40 whitespace-nowrap flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {oferta.tiempo}
                      </span>
                    </div>

                    <StarRating rating={oferta.rating} />

                    <p className="text-[#F5F5F0]/60 text-sm mt-3 mb-4">
                      {oferta.descripcion}
                    </p>

                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="text-2xl font-bold text-gradient-success">
                        {oferta.precio}
                      </div>
                      <div className="flex items-center gap-3">
                        <a
                          href="#"
                          className="text-[#0066FF] hover:underline text-sm flex items-center gap-1 min-h-[44px]"
                        >
                          <User className="w-4 h-4" />
                          Ver perfil
                        </a>
                        <a
                          href="#"
                          className="btn-success inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm min-h-[44px]"
                        >
                          <Phone className="w-4 h-4" />
                          Contactar por WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
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

function reviews({ rating }: { rating: number }) {
  return 0;
}
