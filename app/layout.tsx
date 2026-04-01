import type { Metadata } from 'next'
import './globals.css'
import LayoutShell from '@/components/LayoutShell'

export const metadata: Metadata = {
  title: 'PresupuestosYa | Pide Presupuesto Gratis a Profesionales en España',
  description:
    'El marketplace de servicios en España. Pide presupuesto gratis, recibe hasta 5 ofertas de profesionales verificados en minutos.',
  keywords: 'presupuesto gratis, profesionales, fontanero, electricista, reformas, España, marketplace servicios',
  authors: [{ name: 'PresupuestosYa' }],
  openGraph: {
    title: 'PresupuestosYa | Presupuestos Gratis de Profesionales',
    description: 'Publica tu necesidad gratis y recibe hasta 5 presupuestos de profesionales verificados en minutos.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'PresupuestosYa',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PresupuestosYa',
    description: 'El marketplace de servicios en España.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  )
}
