'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle, LayoutDashboard, FileText, Send, CreditCard,
  UserCircle, Menu, X, Coins,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', href: '/profesional/dashboard', icon: LayoutDashboard },
  { label: 'Solicitudes', href: '/profesional/solicitudes', icon: FileText },
  { label: 'Mis Ofertas', href: '/profesional/ofertas', icon: Send },
  { label: 'Creditos', href: '/profesional/creditos', icon: CreditCard },
  { label: 'Mi Perfil', href: '/profesional/perfil', icon: UserCircle },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-[#F5F5F0]/06">
        <Link href="/" className="flex items-center gap-2">
          <CheckCircle className="w-7 h-7 text-[#00C896]" />
          <span className="text-xl font-bold font-display">
            <span className="text-gradient-success">Presupuestos</span>Ya
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all min-h-[44px] ${
                isActive
                  ? 'bg-[#00C896]/10 text-[#00C896]'
                  : 'text-[#F5F5F0]/50 hover:text-[#F5F5F0] hover:bg-[#F5F5F0]/05'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Credit balance footer */}
      <div className="p-4 border-t border-[#F5F5F0]/06">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Coins className="w-5 h-5 text-[#00C896]" />
            <span className="text-sm text-[#F5F5F0]/50">Creditos disponibles</span>
          </div>
          <div className="text-2xl font-bold text-[#00C896]">24</div>
          <Link
            href="/profesional/creditos"
            className="text-xs text-[#0066FF] hover:underline mt-1 inline-block"
          >
            Comprar mas creditos
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F0]">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-[#F5F5F0]/06 bg-[#111111]">
        <Link href="/" className="flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-[#00C896]" />
          <span className="font-bold font-display text-gradient-success">PresupuestosYa</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="lg:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 h-screen sticky top-0 bg-[#111111] border-r border-[#F5F5F0]/06">
          <SidebarContent />
        </aside>

        {/* Mobile sidebar */}
        <motion.aside
          initial={false}
          animate={{ x: sidebarOpen ? 0 : -280 }}
          className="lg:hidden fixed left-0 top-0 z-50 w-[280px] h-screen bg-[#111111] border-r border-[#F5F5F0]/06"
        >
          <SidebarContent />
        </motion.aside>

        {/* Main content */}
        <main className="flex-1 min-h-screen">
          {children}
        </main>
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
