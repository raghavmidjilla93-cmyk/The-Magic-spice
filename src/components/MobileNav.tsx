'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, UtensilsCrossed, Image, Phone } from 'lucide-react';

const tabs = [
  { href: '/',        label: 'Home',    icon: Home },
  { href: '/menu',    label: 'Menu',    icon: UtensilsCrossed },
  { href: '/gallery', label: 'Gallery', icon: Image },
  { href: '/contact', label: 'Contact', icon: Phone },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe"
         style={{background:'rgba(10,10,10,0.95)', backdropFilter:'blur(20px)', borderTop:'1px solid rgba(212,175,55,0.12)'}}>
      <div className="flex items-center justify-around py-2">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 py-1.5 px-4 min-w-[60px]"
            >
              <Icon
                size={20}
                strokeWidth={active ? 2 : 1.5}
                className={`transition-all duration-300 ${active ? 'text-gold-500' : 'text-white/40'}`}
                style={{color: active ? '#D4AF37' : 'rgba(255,255,255,0.4)'}}
              />
              <span
                className={`mobile-nav-item text-[10px] ${active ? 'active' : ''}`}
                style={{color: active ? '#D4AF37' : 'rgba(255,255,255,0.4)'}}
              >
                {label}
              </span>
              {active && (
                <span
                  className="absolute top-0 h-0.5 w-8 rounded-full"
                  style={{background:'#D4AF37'}}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
