'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import TMSLogo from '@/components/Logo';

const navLinks = [
  { href: '/',        label: 'Home' },
  { href: '/menu',    label: 'Menu' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

const WA = '919849122963';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={scrolled ? {
          background: 'rgba(5,5,5,0.72)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          borderBottom: '1px solid rgba(212,175,55,0.12)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
          paddingTop: '0.6rem',
          paddingBottom: '0.6rem',
        } : {
          background: 'transparent',
          paddingTop: '1.25rem',
          paddingBottom: '1.25rem',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <Link href="/">
            <TMSLogo size={44} showText={true} />
          </Link>

          {/* Desktop Nav — glass pill */}
          <nav className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full"
               style={{background:'rgba(255,255,255,0.04)',
                       backdropFilter:'blur(12px)',
                       border:'1px solid rgba(255,255,255,0.07)'}}>
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-5 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-300"
                style={{
                  fontFamily: 'Poppins,sans-serif',
                  background: pathname === href ? 'rgba(212,175,55,0.15)' : 'transparent',
                  color: pathname === href ? '#D4AF37' : 'rgba(255,255,255,0.6)',
                  border: pathname === href ? '1px solid rgba(212,175,55,0.25)' : '1px solid transparent',
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <a href="tel:9849122963"
               className="hidden md:flex items-center gap-2 text-[10px] tracking-widest transition-colors"
               style={{color:'rgba(212,175,55,0.8)',fontFamily:'Poppins,sans-serif'}}>
              <Phone size={13}/> 9849 122 963
            </a>
            <a href={`https://wa.me/${WA}?text=Hi%2C%20I%20want%20to%20order`}
               target="_blank" rel="noreferrer"
               className="hidden md:flex items-center gap-2 py-2.5 px-5 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all hover:scale-105"
               style={{background:'#25D366',color:'#fff',fontFamily:'Poppins,sans-serif',
                       boxShadow:'0 4px 16px rgba(37,211,102,0.3)'}}>
              <MessageCircle size={12}/> Order
            </a>

            {/* Hamburger — min 44×44 touch target */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-lg transition-colors"
              style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)'}}
              aria-label="Toggle menu">
              {menuOpen ? <X size={20} className="text-white/80"/> : <Menu size={20} className="text-white/80"/>}
            </button>
          </div>
        </div>

        {/* Mobile drawer — glass */}
        <div className={`md:hidden transition-all duration-500 overflow-hidden ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="mx-4 mb-3 mt-2 rounded-2xl px-6 py-5 flex flex-col gap-4"
               style={{background:'rgba(5,5,5,0.85)',backdropFilter:'blur(28px)',
                       WebkitBackdropFilter:'blur(28px)',
                       border:'1px solid rgba(212,175,55,0.12)'}}>
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href}
                className="text-sm tracking-[0.18em] uppercase font-medium transition-colors py-3"
                style={{fontFamily:'Poppins,sans-serif',
                        color: pathname === href ? '#D4AF37' : 'rgba(255,255,255,0.6)'}}>
                {label}
              </Link>
            ))}
            <div className="pt-3 border-t flex items-center gap-3" style={{borderColor:'rgba(255,255,255,0.06)'}}>
              <a href="tel:9849122963"
                 className="flex items-center gap-2 text-sm flex-1"
                 style={{color:'rgba(212,175,55,0.8)',fontFamily:'Inter,sans-serif'}}>
                <Phone size={14}/> 9849 122 963
              </a>
              <a href={`https://wa.me/${WA}?text=Hi%2C%20I%20want%20to%20order`}
                 target="_blank" rel="noreferrer"
                 className="flex items-center gap-2 py-2.5 px-5 rounded-xl text-[10px] font-bold"
                 style={{background:'#25D366',color:'#fff',fontFamily:'Poppins,sans-serif'}}>
                <MessageCircle size={12}/> Order
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
