-- ============================================================
-- PresupuestosYa — Schema Supabase
-- Marketplace de servicios profesionales en España
-- ============================================================

CREATE TABLE IF NOT EXISTS solicitudes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cliente_nombre TEXT NOT NULL,
  cliente_telefono TEXT NOT NULL,
  cliente_email TEXT NOT NULL,
  categoria TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  urgencia TEXT DEFAULT 'sin_prisa' CHECK (urgencia IN ('urgente', 'esta_semana', 'sin_prisa')),
  provincia TEXT NOT NULL,
  ciudad TEXT,
  fotos TEXT[],
  estado TEXT DEFAULT 'activa' CHECK (estado IN ('activa', 'cerrada', 'expirada', 'cancelada')),
  ofertas_recibidas INT DEFAULT 0,
  max_ofertas INT DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS profesionales (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  auth_id UUID,
  nombre TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  telefono TEXT,
  sectores TEXT[],
  provincia TEXT,
  zonas TEXT[],
  descripcion TEXT,
  foto TEXT,
  creditos INT DEFAULT 5,
  valoracion_media NUMERIC(3,2) DEFAULT 0,
  total_valoraciones INT DEFAULT 0,
  total_trabajos INT DEFAULT 0,
  verificado BOOLEAN DEFAULT FALSE,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ofertas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  solicitud_id UUID REFERENCES solicitudes(id) ON DELETE CASCADE,
  profesional_id UUID REFERENCES profesionales(id) ON DELETE CASCADE,
  descripcion TEXT,
  precio_estimado TEXT,
  creditos_gastados INT DEFAULT 1,
  estado TEXT DEFAULT 'enviada' CHECK (estado IN ('enviada', 'vista', 'aceptada', 'rechazada')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS creditos_transacciones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profesional_id UUID REFERENCES profesionales(id) ON DELETE CASCADE,
  cantidad INT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('compra', 'gasto', 'bienvenida', 'suscripcion', 'reembolso')),
  descripcion TEXT,
  stripe_payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS valoraciones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profesional_id UUID REFERENCES profesionales(id) ON DELETE CASCADE,
  solicitud_id UUID REFERENCES solicitudes(id) ON DELETE CASCADE,
  cliente_nombre TEXT,
  puntuacion INT NOT NULL CHECK (puntuacion BETWEEN 1 AND 5),
  comentario TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Coste de créditos por categoría
CREATE TABLE IF NOT EXISTS categorias_config (
  id TEXT PRIMARY KEY,
  nombre TEXT NOT NULL,
  creditos_coste INT DEFAULT 2,
  icono TEXT
);

INSERT INTO categorias_config (id, nombre, creditos_coste) VALUES
  ('fontaneria', 'Fontanería', 2),
  ('electricidad', 'Electricidad', 2),
  ('reformas', 'Reformas', 5),
  ('carpinteria', 'Carpintería', 2),
  ('cerrajeria', 'Cerrajería', 3),
  ('informatica', 'Informática', 1),
  ('climatizacion', 'Climatización', 2),
  ('pintura', 'Pintura', 2),
  ('jardineria', 'Jardinería', 1),
  ('mudanzas', 'Mudanzas', 3),
  ('limpieza', 'Limpieza', 1),
  ('mecanica', 'Mecánica', 2),
  ('instalaciones', 'Instalaciones', 2),
  ('diseno_web', 'Diseño web', 2),
  ('contabilidad', 'Contabilidad', 2),
  ('fotografia', 'Fotografía', 1),
  ('clases', 'Clases particulares', 1),
  ('otros', 'Otros', 1)
ON CONFLICT (id) DO NOTHING;

-- Admin user
INSERT INTO profesionales (nombre, email, creditos, verificado, plan)
VALUES ('Admin', 'mrc106@gmail.com', 999, true, 'pro')
ON CONFLICT (email) DO UPDATE SET creditos = 999, verificado = true;

-- RLS
ALTER TABLE solicitudes ENABLE ROW LEVEL SECURITY;
ALTER TABLE profesionales ENABLE ROW LEVEL SECURITY;
ALTER TABLE ofertas ENABLE ROW LEVEL SECURITY;
ALTER TABLE creditos_transacciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE valoraciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE categorias_config ENABLE ROW LEVEL SECURITY;

-- Public read for solicitudes activas
CREATE POLICY "Public read active" ON solicitudes FOR SELECT USING (estado = 'activa');
-- Service role full access
CREATE POLICY "Service full" ON solicitudes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service full" ON profesionales FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service full" ON ofertas FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service full" ON creditos_transacciones FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service full" ON valoraciones FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read" ON categorias_config FOR SELECT USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_solicitudes_estado ON solicitudes(estado);
CREATE INDEX IF NOT EXISTS idx_solicitudes_provincia ON solicitudes(provincia);
CREATE INDEX IF NOT EXISTS idx_solicitudes_categoria ON solicitudes(categoria);
CREATE INDEX IF NOT EXISTS idx_ofertas_solicitud ON ofertas(solicitud_id);
CREATE INDEX IF NOT EXISTS idx_ofertas_profesional ON ofertas(profesional_id);
CREATE INDEX IF NOT EXISTS idx_profesionales_provincia ON profesionales(provincia);
