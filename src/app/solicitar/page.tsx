'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wrench, Paintbrush, Zap, Droplets, Thermometer, Home,
  Trees, ShieldCheck, Truck, Hammer, Wind, Lightbulb,
  Lock, Brush, Bug, Wifi, Car, Scissors,
  Upload, Camera, CheckCircle, Clock, AlertTriangle, ArrowRight,
  X,
} from 'lucide-react';

const categories = [
  { name: 'Fontaneria', icon: Droplets },
  { name: 'Electricidad', icon: Zap },
  { name: 'Pintura', icon: Paintbrush },
  { name: 'Reformas', icon: Hammer },
  { name: 'Climatizacion', icon: Thermometer },
  { name: 'Cerrajeria', icon: Lock },
  { name: 'Limpieza', icon: Brush },
  { name: 'Jardineria', icon: Trees },
  { name: 'Mudanzas', icon: Truck },
  { name: 'Seguridad', icon: ShieldCheck },
  { name: 'Ventanas', icon: Wind },
  { name: 'Iluminacion', icon: Lightbulb },
  { name: 'Plagas', icon: Bug },
  { name: 'Internet/Redes', icon: Wifi },
  { name: 'Mecanica', icon: Car },
  { name: 'Carpinteria', icon: Home },
  { name: 'Mantenimiento', icon: Wrench },
  { name: 'Peluqueria', icon: Scissors },
];

const provincias = [
  'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza',
  'Malaga', 'Bilbao', 'Alicante', 'Murcia', 'Valladolid',
];

export default function SolicitarPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [descripcion, setDescripcion] = useState('');
  const [urgencia, setUrgencia] = useState('esta-semana');
  const [provincia, setProvincia] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F0]">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-screen flex items-center justify-center px-4"
          >
            <div className="text-center max-w-md">
              <div className="relative mb-8">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.2, 0.8],
                      x: Math.cos((i * 30 * Math.PI) / 180) * 120,
                      y: Math.sin((i * 30 * Math.PI) / 180) * 120,
                    }}
                    transition={{ duration: 1.5, delay: i * 0.08 }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <CheckCircle className="w-6 h-6 text-[#00C896]" />
                  </motion.div>
                ))}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle className="w-24 h-24 text-[#00C896] mx-auto" />
                </motion.div>
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-3xl font-bold font-display mb-4"
              >
                <span className="text-gradient-success">Solicitud enviada</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-[#F5F5F0]/60 text-lg mb-8"
              >
                Los profesionales de tu zona recibiran tu solicitud y te enviaran
                presupuestos en las proximas horas.
              </motion.p>
              <motion.a
                href="/ofertas"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="btn-success inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg min-h-[44px]"
              >
                Ver mis ofertas <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-3xl mx-auto px-4 py-12"
          >
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
                <span className="text-gradient-success">Solicita presupuesto</span> gratis
              </h1>
              <p className="text-[#F5F5F0]/60 text-lg">
                Describe lo que necesitas y recibe ofertas de profesionales verificados
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Categoria */}
              <div className="glass-card rounded-2xl p-6">
                <label className="block text-lg font-semibold mb-4">
                  Selecciona una categoria
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = selectedCategory === cat.name;
                    return (
                      <motion.button
                        key={cat.name}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all min-h-[44px] ${
                          isSelected
                            ? 'border-[#00C896] bg-[#00C896]/10 text-[#00C896]'
                            : 'border-[#F5F5F0]/10 hover:border-[#F5F5F0]/30 text-[#F5F5F0]/60'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="text-xs text-center leading-tight">{cat.name}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Descripcion */}
              <div className="glass-card rounded-2xl p-6">
                <label className="block text-lg font-semibold mb-3">
                  Describe el trabajo con detalle
                </label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  rows={5}
                  placeholder="Ej: Necesito arreglar una fuga en el bano principal. El grifo gotea constantemente y la presion del agua ha bajado..."
                  className="w-full bg-[#080808] border border-[#F5F5F0]/10 rounded-xl p-4 text-[#F5F5F0] placeholder:text-[#F5F5F0]/30 focus:border-[#00C896] focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Urgencia */}
              <div className="glass-card rounded-2xl p-6">
                <label className="block text-lg font-semibold mb-4">Urgencia</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { value: 'urgente', label: 'Urgente', sublabel: 'Lo antes posible', icon: AlertTriangle, color: 'text-red-400' },
                    { value: 'esta-semana', label: 'Esta semana', sublabel: 'En los proximos dias', icon: Clock, color: 'text-yellow-400' },
                    { value: 'sin-prisa', label: 'Sin prisa', sublabel: 'Cuando sea posible', icon: Clock, color: 'text-[#00C896]' },
                  ].map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setUrgencia(opt.value)}
                        className={`flex items-center gap-3 p-4 rounded-xl border transition-all min-h-[44px] ${
                          urgencia === opt.value
                            ? 'border-[#00C896] bg-[#00C896]/10'
                            : 'border-[#F5F5F0]/10 hover:border-[#F5F5F0]/30'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${opt.color}`} />
                        <div className="text-left">
                          <div className="font-medium text-sm">{opt.label}</div>
                          <div className="text-xs text-[#F5F5F0]/40">{opt.sublabel}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Ubicacion */}
              <div className="glass-card rounded-2xl p-6">
                <label className="block text-lg font-semibold mb-4">Ubicacion</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select
                    value={provincia}
                    onChange={(e) => setProvincia(e.target.value)}
                    className="w-full bg-[#080808] border border-[#F5F5F0]/10 rounded-xl p-4 text-[#F5F5F0] focus:border-[#00C896] focus:outline-none transition-colors min-h-[44px]"
                  >
                    <option value="">Selecciona provincia</option>
                    {provincias.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    placeholder="Ciudad o localidad"
                    className="w-full bg-[#080808] border border-[#F5F5F0]/10 rounded-xl p-4 text-[#F5F5F0] placeholder:text-[#F5F5F0]/30 focus:border-[#00C896] focus:outline-none transition-colors min-h-[44px]"
                  />
                </div>
              </div>

              {/* Fotos */}
              <div className="glass-card rounded-2xl p-6">
                <label className="block text-lg font-semibold mb-4">
                  Fotos (opcional)
                </label>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                    dragOver
                      ? 'border-[#00C896] bg-[#00C896]/5'
                      : 'border-[#F5F5F0]/10 hover:border-[#F5F5F0]/30'
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-[#00C896]/10 flex items-center justify-center">
                      <Camera className="w-7 h-7 text-[#00C896]" />
                    </div>
                    <div>
                      <p className="font-medium">Arrastra fotos aqui</p>
                      <p className="text-sm text-[#F5F5F0]/40 mt-1">o haz clic para seleccionar</p>
                    </div>
                    <Upload className="w-5 h-5 text-[#F5F5F0]/30" />
                  </div>
                </div>
              </div>

              {/* Datos personales */}
              <div className="glass-card rounded-2xl p-6">
                <label className="block text-lg font-semibold mb-4">Tus datos</label>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre completo"
                    className="w-full bg-[#080808] border border-[#F5F5F0]/10 rounded-xl p-4 text-[#F5F5F0] placeholder:text-[#F5F5F0]/30 focus:border-[#00C896] focus:outline-none transition-colors min-h-[44px]"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholder="Telefono"
                      className="w-full bg-[#080808] border border-[#F5F5F0]/10 rounded-xl p-4 text-[#F5F5F0] placeholder:text-[#F5F5F0]/30 focus:border-[#00C896] focus:outline-none transition-colors min-h-[44px]"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="w-full bg-[#080808] border border-[#F5F5F0]/10 rounded-xl p-4 text-[#F5F5F0] placeholder:text-[#F5F5F0]/30 focus:border-[#00C896] focus:outline-none transition-colors min-h-[44px]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-success w-full py-4 rounded-xl text-lg font-bold min-h-[44px] flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Enviar solicitud gratis
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

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
