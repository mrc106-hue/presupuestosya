'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Zap, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: '0 24px',
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: scrolled ? 'rgba(8,8,8,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'linear-gradient(135deg, #00C896, #0066FF)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Zap size={18} color="#fff" fill="#fff" />
        </div>
        <span style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 800,
          fontSize: 20,
          background: 'linear-gradient(135deg, #00C896, #0066FF)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          PresupuestosYa
        </span>
      </Link>

      {/* Center Links — desktop */}
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="hidden md:flex">
        <Link href="/solicitudes" style={{ color: '#F5F5F0', textDecoration: 'none', fontSize: 14, fontWeight: 500, opacity: 0.8, transition: 'opacity 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.8')}
        >
          Solicitudes
        </Link>
        <Link href="/#como-funciona" style={{ color: '#F5F5F0', textDecoration: 'none', fontSize: 14, fontWeight: 500, opacity: 0.8, transition: 'opacity 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.8')}
        >
          Cómo funciona
        </Link>
        <Link href="/creditos" style={{ color: '#F5F5F0', textDecoration: 'none', fontSize: 14, fontWeight: 500, opacity: 0.8, transition: 'opacity 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.8')}
        >
          Precios
        </Link>
      </div>

      {/* Right CTAs — desktop */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }} className="hidden md:flex">
        <Link href="/solicitar" style={{
          padding: '8px 18px', borderRadius: 10, fontSize: 14, fontWeight: 700,
          border: '1.5px solid #00C896', color: '#00C896', textDecoration: 'none',
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,200,150,0.1)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
        >
          Soy cliente
        </Link>
        <Link href="/registro-pro" style={{
          padding: '8px 18px', borderRadius: 10, fontSize: 14, fontWeight: 700,
          background: 'linear-gradient(135deg, #0066FF, #004FCC)',
          color: '#fff', textDecoration: 'none', transition: 'all 0.2s',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(0,102,255,0.3)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
        >
          Soy profesional
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#F5F5F0', display: 'none' }}
        className="md:hidden block"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0,
          background: 'rgba(8,8,8,0.98)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          <Link href="/solicitudes" onClick={() => setMenuOpen(false)} style={{ color: '#F5F5F0', textDecoration: 'none', fontSize: 16, fontWeight: 500 }}>Solicitudes</Link>
          <Link href="/#como-funciona" onClick={() => setMenuOpen(false)} style={{ color: '#F5F5F0', textDecoration: 'none', fontSize: 16, fontWeight: 500 }}>Cómo funciona</Link>
          <Link href="/creditos" onClick={() => setMenuOpen(false)} style={{ color: '#F5F5F0', textDecoration: 'none', fontSize: 16, fontWeight: 500 }}>Precios</Link>
          <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
            <Link href="/solicitar" onClick={() => setMenuOpen(false)} style={{
              flex: 1, padding: '10px 16px', borderRadius: 10, fontSize: 14, fontWeight: 700,
              border: '1.5px solid #00C896', color: '#00C896', textDecoration: 'none', textAlign: 'center',
            }}>
              Soy cliente
            </Link>
            <Link href="/registro-pro" onClick={() => setMenuOpen(false)} style={{
              flex: 1, padding: '10px 16px', borderRadius: 10, fontSize: 14, fontWeight: 700,
              background: 'linear-gradient(135deg, #0066FF, #004FCC)',
              color: '#fff', textDecoration: 'none', textAlign: 'center',
            }}>
              Soy profesional
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
