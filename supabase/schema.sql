-- ═══════════════════════════════════════════════════════════════
--  PresupuestosYa — Supabase Schema
-- ═══════════════════════════════════════════════════════════════

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── Tables ─────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS solicitudes (
  id                 uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  cliente_nombre     text        NOT NULL,
  cliente_telefono   text        NOT NULL,
  cliente_email      text        NOT NULL,
  categoria          text        NOT NULL,
  descripcion        text        NOT NULL,
  urgencia           text        DEFAULT 'sin_prisa' CHECK (urgencia IN ('urgente', 'esta_semana', 'sin_prisa')),
  provincia          text        NOT NULL,
  ciudad             text,
  fotos              text[],
  estado             text        DEFAULT 'activa' CHECK (estado IN ('activa', 'en_proceso', 'completada', 'cancelada')),
  ofertas_recibidas  int         DEFAULT 0,
  created_at         timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS profesionales (
  id                      uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre                  text        NOT NULL,
  email                   text        UNIQUE NOT NULL,
  telefono                text,
  sectores                text[],
  provincia               text,
  zonas                   text[],
  descripcion             text,
  foto                    text,
  creditos                int         DEFAULT 5,
  valoracion_media        numeric     DEFAULT 0,
  total_trabajos          int         DEFAULT 0,
  verificado              boolean     DEFAULT false,
  plan                    text        DEFAULT 'gratis' CHECK (plan IN ('gratis', 'pro')),
  stripe_customer_id      text,
  stripe_subscription_id  text,
  created_at              timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ofertas (
  id                 uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  solicitud_id       uuid        REFERENCES solicitudes(id) ON DELETE CASCADE,
  profesional_id     uuid        REFERENCES profesionales(id) ON DELETE CASCADE,
  descripcion        text,
  precio_estimado    text,
  creditos_gastados  int         NOT NULL DEFAULT 0,
  estado             text        DEFAULT 'enviada' CHECK (estado IN ('enviada', 'aceptada', 'rechazada')),
  created_at         timestamptz DEFAULT now(),
  UNIQUE(solicitud_id, profesional_id)
);

CREATE TABLE IF NOT EXISTS creditos_transacciones (
  id                 uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  profesional_id     uuid        REFERENCES profesionales(id) ON DELETE CASCADE,
  cantidad           int         NOT NULL,
  tipo               text        NOT NULL CHECK (tipo IN ('compra', 'gasto', 'regalo', 'reembolso', 'suscripcion')),
  stripe_payment_id  text,
  created_at         timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS valoraciones (
  id                 uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  profesional_id     uuid        REFERENCES profesionales(id) ON DELETE CASCADE,
  solicitud_id       uuid        REFERENCES solicitudes(id) ON DELETE SET NULL,
  puntuacion         int         NOT NULL CHECK (puntuacion BETWEEN 1 AND 5),
  comentario         text,
  created_at         timestamptz DEFAULT now(),
  UNIQUE(profesional_id, solicitud_id)
);

-- ─── Indexes ────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_solicitudes_categoria   ON solicitudes(categoria);
CREATE INDEX IF NOT EXISTS idx_solicitudes_provincia   ON solicitudes(provincia);
CREATE INDEX IF NOT EXISTS idx_solicitudes_urgencia    ON solicitudes(urgencia);
CREATE INDEX IF NOT EXISTS idx_solicitudes_estado      ON solicitudes(estado);
CREATE INDEX IF NOT EXISTS idx_solicitudes_created_at  ON solicitudes(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_profesionales_email     ON profesionales(email);
CREATE INDEX IF NOT EXISTS idx_profesionales_provincia ON profesionales(provincia);
CREATE INDEX IF NOT EXISTS idx_profesionales_plan      ON profesionales(plan);

CREATE INDEX IF NOT EXISTS idx_ofertas_solicitud_id    ON ofertas(solicitud_id);
CREATE INDEX IF NOT EXISTS idx_ofertas_profesional_id  ON ofertas(profesional_id);

CREATE INDEX IF NOT EXISTS idx_creditos_profesional_id ON creditos_transacciones(profesional_id);
CREATE INDEX IF NOT EXISTS idx_creditos_created_at     ON creditos_transacciones(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_valoraciones_profesional ON valoraciones(profesional_id);

-- ─── Functions & Triggers ───────────────────────────────────────

-- Function: increment offers count
CREATE OR REPLACE FUNCTION increment_ofertas_recibidas()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE solicitudes
  SET ofertas_recibidas = ofertas_recibidas + 1
  WHERE id = NEW.solicitud_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: after insert on ofertas, increment count
DROP TRIGGER IF EXISTS trg_increment_ofertas ON ofertas;
CREATE TRIGGER trg_increment_ofertas
  AFTER INSERT ON ofertas
  FOR EACH ROW
  EXECUTE FUNCTION increment_ofertas_recibidas();

-- Function: update valoracion_media on profesionales
CREATE OR REPLACE FUNCTION update_valoracion_media()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profesionales
  SET valoracion_media = (
    SELECT ROUND(AVG(puntuacion)::numeric, 1)
    FROM valoraciones
    WHERE profesional_id = NEW.profesional_id
  ),
  total_trabajos = (
    SELECT COUNT(*)
    FROM valoraciones
    WHERE profesional_id = NEW.profesional_id
  )
  WHERE id = NEW.profesional_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: after insert/update on valoraciones
DROP TRIGGER IF EXISTS trg_update_valoracion ON valoraciones;
CREATE TRIGGER trg_update_valoracion
  AFTER INSERT OR UPDATE ON valoraciones
  FOR EACH ROW
  EXECUTE FUNCTION update_valoracion_media();

-- RPC: safe increment for offers (alternative to trigger)
CREATE OR REPLACE FUNCTION increment_ofertas(solicitud_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE solicitudes
  SET ofertas_recibidas = ofertas_recibidas + 1
  WHERE id = solicitud_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ─── Row Level Security ──────────────────────────────────────────

ALTER TABLE solicitudes           ENABLE ROW LEVEL SECURITY;
ALTER TABLE profesionales         ENABLE ROW LEVEL SECURITY;
ALTER TABLE ofertas               ENABLE ROW LEVEL SECURITY;
ALTER TABLE creditos_transacciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE valoraciones          ENABLE ROW LEVEL SECURITY;

-- solicitudes: public can read activas (without client contact data)
CREATE POLICY "solicitudes_public_read" ON solicitudes
  FOR SELECT USING (estado = 'activa');

-- solicitudes: service role can do everything (API uses service role)
CREATE POLICY "solicitudes_service_all" ON solicitudes
  FOR ALL USING (auth.role() = 'service_role');

-- profesionales: public can read basic profile data
CREATE POLICY "profesionales_public_read" ON profesionales
  FOR SELECT USING (true);

-- profesionales: service role full access
CREATE POLICY "profesionales_service_all" ON profesionales
  FOR ALL USING (auth.role() = 'service_role');

-- ofertas: only via service role
CREATE POLICY "ofertas_service_all" ON ofertas
  FOR ALL USING (auth.role() = 'service_role');

-- creditos_transacciones: only via service role
CREATE POLICY "creditos_service_all" ON creditos_transacciones
  FOR ALL USING (auth.role() = 'service_role');

-- valoraciones: public read, service role write
CREATE POLICY "valoraciones_public_read" ON valoraciones
  FOR SELECT USING (true);

CREATE POLICY "valoraciones_service_all" ON valoraciones
  FOR ALL USING (auth.role() = 'service_role');

-- ─── Seed data (optional demo) ──────────────────────────────────

-- INSERT INTO profesionales (nombre, email, telefono, sectores, provincia, descripcion, creditos, verificado, plan)
-- VALUES
--   ('Carlos Fontanero', 'carlos@example.com', '611111111', ARRAY['fontaneria', 'cerrajeria'], 'Madrid', 'Fontanero profesional con 15 años de experiencia en Madrid.', 25, true, 'pro'),
--   ('Ana Electricidad', 'ana@example.com', '622222222', ARRAY['electricidad', 'instalaciones'], 'Barcelona', 'Electricista autónoma, trabajos residenciales y comerciales.', 10, true, 'gratis');
