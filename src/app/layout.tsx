import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PresupuestosYa | Pide Presupuesto Gratis a Profesionales en España',
  description:
    'Marketplace donde particulares solicitan presupuestos gratuitos a profesionales verificados en toda España. Compara precios, lee opiniones y contrata al mejor profesional para tu proyecto.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="bg-py-bg font-body text-py-text antialiased">
        {children}
      </body>
    </html>
  );
}
