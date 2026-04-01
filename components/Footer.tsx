import Link from 'next/link'
import { Zap, Wrench } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '60px 24px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 40, marginBottom: 48 }}>

          {/* Column 1 — Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #00C896, #0066FF)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={16} color="#fff" fill="#fff" />
              </div>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 18, background: 'linear-gradient(135deg, #00C896, #0066FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                PresupuestosYa
              </span>
            </div>
            <p style={{ color: '#888', fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>
              El marketplace de servicios en España. Pide presupuesto gratis y conecta con los mejores profesionales de tu zona.
            </p>

            {/* FixPro cross-promo */}
            <div style={{
              background: 'rgba(0,102,255,0.08)', border: '1px solid rgba(0,102,255,0.2)',
              borderRadius: 12, padding: '14px 16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: 'linear-gradient(135deg, #0066FF, #00C896)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Wrench size={13} color="#fff" />
                </div>
                <span style={{ fontWeight: 700, fontSize: 13, color: '#F5F5F0' }}>También en FixPro</span>
              </div>
              <p style={{ color: '#888', fontSize: 12, lineHeight: 1.5 }}>
                Gestiona tus trabajos, facturas y clientes con FixPro — el CRM para profesionales autónomos.
              </p>
              <Link href="https://fixpro.up.railway.app" target="_blank" style={{ color: '#0066FF', fontSize: 12, fontWeight: 600, textDecoration: 'none', marginTop: 6, display: 'inline-block' }}>
                Probar gratis →
              </Link>
            </div>
          </div>

          {/* Column 2 — Servicios */}
          <div>
            <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: '#F5F5F0', marginBottom: 16 }}>
              Servicios
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                ['Fontanería', '/solicitar?categoria=fontaneria'],
                ['Electricidad', '/solicitar?categoria=electricidad'],
                ['Reformas', '/solicitar?categoria=reformas'],
                ['Climatización', '/solicitar?categoria=climatizacion'],
                ['Pintura', '/solicitar?categoria=pintura'],
                ['Mudanzas', '/solicitar?categoria=mudanzas'],
                ['Diseño Web', '/solicitar?categoria=diseno-web'],
                ['Ver todas →', '/solicitar'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} style={{ color: '#888', fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#00C896' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#888' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Para profesionales */}
          <div>
            <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: '#F5F5F0', marginBottom: 16 }}>
              Para profesionales
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                ['Registrarme como pro', '/registro-pro'],
                ['Ver solicitudes', '/solicitudes'],
                ['Comprar créditos', '/creditos'],
                ['Dashboard', '/profesional'],
                ['Plan Pro mensual', '/creditos#pro'],
                ['Cómo funciona', '/#como-funciona'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} style={{ color: '#888', fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#0066FF' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#888' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Empresa */}
          <div>
            <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: '#F5F5F0', marginBottom: 16 }}>
              Empresa
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                ['Sobre nosotros', '/sobre-nosotros'],
                ['Términos y condiciones', '/terminos'],
                ['Política de privacidad', '/privacidad'],
                ['Política de cookies', '/cookies'],
                ['Contacto', '/contacto'],
                ['Afiliados', '/afiliados'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} style={{ color: '#888', fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#F5F5F0' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#888' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: '#555', fontSize: 12 }}>
            © {year} PresupuestosYa. Todos los derechos reservados.
          </p>
          <p style={{ color: '#555', fontSize: 12 }}>
            Hecho con ❤️ en España · Parte del ecosistema{' '}
            <span style={{ color: '#00C896', fontWeight: 600 }}>IAWebs</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
