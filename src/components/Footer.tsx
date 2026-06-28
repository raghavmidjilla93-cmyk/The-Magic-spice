import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, MessageCircle } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-gold-500/10 pb-20 md:pb-0" style={{background:'#050505'}}>
      {/* Top gold line */}
      <div className="h-px w-full" style={{background:'linear-gradient(90deg,transparent,#D4AF37,transparent)'}} />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand */}
          <div>
            <h3 className="font-playfair text-2xl font-bold text-white mb-1" style={{fontFamily:'Playfair Display,serif'}}>
              The Magic Spice
            </h3>
            <p className="text-[10px] tracking-[0.35em] uppercase mb-5" style={{color:'#D4AF37',fontFamily:'Poppins,sans-serif'}}>
              Multi Cuisine Restaurant
            </p>
            <p className="text-white/50 text-sm leading-relaxed mb-6" style={{fontFamily:'Inter,sans-serif'}}>
              Crafting unforgettable dining experiences since 2019. From aromatic Hyderabadi biryani to smoky Arabian Mandi — every meal is a celebration.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer"
                 className="w-9 h-9 rounded-full border border-gold-500/20 flex items-center justify-center text-white/50 hover:text-gold-500 hover:border-gold-500/60 transition-all duration-300">
                <Instagram size={16} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer"
                 className="w-9 h-9 rounded-full border border-gold-500/20 flex items-center justify-center text-white/50 hover:text-gold-500 hover:border-gold-500/60 transition-all duration-300">
                <Facebook size={16} />
              </a>
              <a href="https://wa.me/919849122963" target="_blank" rel="noreferrer"
                 className="w-9 h-9 rounded-full border border-gold-500/20 flex items-center justify-center text-white/50 hover:text-gold-500 hover:border-gold-500/60 transition-all duration-300">
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase font-semibold mb-6" style={{color:'#D4AF37',fontFamily:'Poppins,sans-serif'}}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/menu', label: 'Our Menu' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/contact', label: 'Contact Us' },
                { href: '/contact#reservation', label: 'Book a Table' },
                { href: '/admin', label: 'Admin' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}
                        className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-2 group"
                        style={{fontFamily:'Inter,sans-serif'}}>
                    <span className="w-4 h-px transition-all group-hover:w-6" style={{background:'#D4AF37'}} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cuisine */}
          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase font-semibold mb-6" style={{color:'#D4AF37',fontFamily:'Poppins,sans-serif'}}>
              Cuisines
            </h4>
            <ul className="space-y-3">
              {['Hyderabadi','Mughlai','Arabian Mandi','Chinese','Continental','Sea Food','Tandoori','Desserts & Beverages'].map(c => (
                <li key={c}>
                  <Link href="/menu"
                        className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-2 group"
                        style={{fontFamily:'Inter,sans-serif'}}>
                    <span className="w-4 h-px transition-all group-hover:w-6" style={{background:'#D4AF37'}} />
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase font-semibold mb-6" style={{color:'#D4AF37',fontFamily:'Poppins,sans-serif'}}>
              Find Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/50" style={{fontFamily:'Inter,sans-serif'}}>
                <MapPin size={15} className="mt-0.5 shrink-0" style={{color:'#D4AF37'}} />
                <span>Nagarkurnool, Wanaparthi & Bangalore</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/50" style={{fontFamily:'Inter,sans-serif'}}>
                <Clock size={15} className="shrink-0" style={{color:'#D4AF37'}} />
                <span>11:00 AM – 11:00 PM · All Days</span>
              </li>
              <li>
                <a href="tel:9849122963" className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors" style={{fontFamily:'Inter,sans-serif'}}>
                  <Phone size={15} className="shrink-0" style={{color:'#D4AF37'}} />
                  9849 122 963
                </a>
              </li>
              <li>
                <a href="mailto:info@themagicspice.in" className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors" style={{fontFamily:'Inter,sans-serif'}}>
                  <Mail size={15} className="shrink-0" style={{color:'#D4AF37'}} />
                  info@themagicspice.in
                </a>
              </li>
            </ul>

            {/* Catering badge */}
            <div className="mt-6 p-4 rounded" style={{border:'1px solid rgba(212,175,55,0.2)',background:'rgba(212,175,55,0.04)'}}>
              <p className="text-xs tracking-widest uppercase mb-2" style={{color:'#D4AF37',fontFamily:'Poppins,sans-serif'}}>Catering Available</p>
              <p className="text-xs text-white/40" style={{fontFamily:'Inter,sans-serif'}}>Birthdays · Corporate · Barbeque · All Occasions</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-8" style={{background:'linear-gradient(90deg,transparent,rgba(212,175,55,0.2),transparent)'}} />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25" style={{fontFamily:'Inter,sans-serif'}}>
            © {year} The Magic Spice. All rights reserved. Est. 2019.
          </p>
          <p className="text-xs text-white/20" style={{fontFamily:'Poppins,sans-serif',letterSpacing:'0.12em'}}>
            CRAFTED WITH ♦ IN HYDERABAD
          </p>
        </div>
      </div>
    </footer>
  );
}
