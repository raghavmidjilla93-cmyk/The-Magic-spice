'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { restaurantInfo } from '@/lib/menuData';
import toast from 'react-hot-toast';

function ContactCard({ icon: Icon, title, lines, href }: { icon: any; title: string; lines: string[]; href?: string }) {
  const content = (
    <div className="glass-card p-6 rounded flex gap-4 items-start h-full transition-all">
      <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
           style={{background:'rgba(212,175,55,0.08)',border:'1px solid rgba(212,175,55,0.25)'}}>
        <Icon size={20} style={{color:'#D4AF37'}} />
      </div>
      <div>
        <p className="text-[10px] tracking-[0.25em] uppercase font-semibold mb-2" style={{color:'#D4AF37',fontFamily:'Poppins,sans-serif'}}>{title}</p>
        {lines.map((line, i) => (
          <p key={i} className={`text-sm leading-relaxed ${i === 0 ? 'text-white/80' : 'text-white/45'}`} style={{fontFamily:'Inter,sans-serif'}}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
  return href
    ? <a href={href} className="block">{content}</a>
    : <div>{content}</div>;
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', date: '', time: '', guests: '2', message: '', occasion: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    toast.success('Reservation request sent! We\'ll confirm shortly.');
  };

  const inputClass = "w-full bg-transparent border rounded-sm px-4 py-3.5 text-sm text-white placeholder:text-white/25 focus:outline-none transition-colors";
  const inputStyle = {
    fontFamily:'Inter,sans-serif',
    borderColor:'rgba(255,255,255,0.1)',
    background:'rgba(255,255,255,0.03)',
  };
  const focusStyle = { borderColor:'rgba(212,175,55,0.4)', outline:'none' };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80" alt="Contact hero" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0" style={{background:'linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.88) 60%, #0A0A0A 100%)'}} />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{color:'#D4AF37',fontFamily:'Poppins,sans-serif'}}>
            Reach Out
          </motion.p>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.15,duration:0.8}} className="text-5xl md:text-7xl font-bold mb-4" style={{fontFamily:'Playfair Display,serif'}}>
            Contact Us
          </motion.h1>
          <div className="h-px w-16 mb-5 mx-auto" style={{background:'linear-gradient(90deg,transparent,#D4AF37,transparent)'}} />
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}} className="text-white/60 italic text-lg" style={{fontFamily:'Cormorant Garamond,serif'}}>
            Reserve a table, inquire about catering, or simply say hello
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-32 md:pb-20">

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {[
            { icon: Phone,          title: 'Call Us',      lines: ['9849 122 963', 'All days · 11 AM – 11 PM'],    href: 'tel:9849122963' },
            { icon: MessageCircle,  title: 'WhatsApp',     lines: ['+91 9849 122 963', 'Quick response guaranteed'], href: 'https://wa.me/919849122963' },
            { icon: Mail,           title: 'Email',        lines: ['info@themagicspice.in', 'Catering inquiries welcome'], href: 'mailto:info@themagicspice.in' },
            { icon: Clock,          title: 'Hours',        lines: ['11:00 AM – 11:00 PM', 'Open All Days · 365 Days'] },
          ].map(card => (
            <motion.div key={card.title}
              initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}>
              <ContactCard {...card} />
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">

          {/* Reservation Form */}
          <motion.div
            id="reservation"
            initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.8}}
          >
            <p className="text-[10px] tracking-[0.35em] uppercase mb-2" style={{color:'#D4AF37',fontFamily:'Poppins,sans-serif'}}>Reserve Your Table</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{fontFamily:'Playfair Display,serif'}}>Make a Reservation</h2>
            <div className="h-px w-14 mb-8" style={{background:'linear-gradient(90deg,#D4AF37,transparent)'}} />

            {submitted ? (
              <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} className="glass-card p-10 rounded text-center">
                <CheckCircle size={56} className="mx-auto mb-4" style={{color:'#D4AF37'}} />
                <h3 className="text-2xl font-bold mb-2" style={{fontFamily:'Playfair Display,serif'}}>Request Received!</h3>
                <p className="text-white/60 text-sm mb-6" style={{fontFamily:'Inter,sans-serif'}}>
                  Thank you, {form.name}. We&apos;ll confirm your reservation at {form.phone} shortly. Looking forward to hosting you!
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-outline-gold">
                  Make Another Reservation
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-8 rounded space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2" style={{fontFamily:'Poppins,sans-serif'}}>Your Name *</label>
                    <input
                      name="name" required value={form.name} onChange={handleChange}
                      placeholder="Full name"
                      className={inputClass} style={inputStyle}
                      onFocus={e => Object.assign(e.target.style, focusStyle)}
                      onBlur={e => Object.assign(e.target.style, {borderColor:'rgba(255,255,255,0.1)'})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2" style={{fontFamily:'Poppins,sans-serif'}}>Phone *</label>
                    <input
                      name="phone" required value={form.phone} onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className={inputClass} style={inputStyle}
                      onFocus={e => Object.assign(e.target.style, focusStyle)}
                      onBlur={e => Object.assign(e.target.style, {borderColor:'rgba(255,255,255,0.1)'})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2" style={{fontFamily:'Poppins,sans-serif'}}>Email</label>
                  <input
                    name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="your@email.com"
                    className={inputClass} style={inputStyle}
                    onFocus={e => Object.assign(e.target.style, focusStyle)}
                    onBlur={e => Object.assign(e.target.style, {borderColor:'rgba(255,255,255,0.1)'})}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2" style={{fontFamily:'Poppins,sans-serif'}}>Date *</label>
                    <input
                      name="date" type="date" required value={form.date} onChange={handleChange}
                      className={inputClass} style={{...inputStyle, colorScheme:'dark'}}
                      onFocus={e => Object.assign(e.target.style, focusStyle)}
                      onBlur={e => Object.assign(e.target.style, {borderColor:'rgba(255,255,255,0.1)'})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2" style={{fontFamily:'Poppins,sans-serif'}}>Time *</label>
                    <input
                      name="time" type="time" required value={form.time} onChange={handleChange}
                      className={inputClass} style={{...inputStyle, colorScheme:'dark'}}
                      onFocus={e => Object.assign(e.target.style, focusStyle)}
                      onBlur={e => Object.assign(e.target.style, {borderColor:'rgba(255,255,255,0.1)'})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2" style={{fontFamily:'Poppins,sans-serif'}}>Guests</label>
                    <select
                      name="guests" value={form.guests} onChange={handleChange}
                      className={inputClass} style={inputStyle}
                    >
                      {[1,2,3,4,5,6,7,8,9,'10+'].map(n => <option key={n} value={String(n)} style={{background:'#1C1C1E'}}>{n} {n === 1 ? 'Person' : 'People'}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2" style={{fontFamily:'Poppins,sans-serif'}}>Occasion</label>
                  <select
                    name="occasion" value={form.occasion} onChange={handleChange}
                    className={inputClass} style={inputStyle}
                  >
                    <option value="" style={{background:'#1C1C1E'}}>Select occasion (optional)</option>
                    {['Birthday Celebration','Anniversary','Business Lunch','Corporate Event','Family Gathering','Date Night','Barbeque Party','Other'].map(o => (
                      <option key={o} value={o} style={{background:'#1C1C1E'}}>{o}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2" style={{fontFamily:'Poppins,sans-serif'}}>Special Requests</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange} rows={3}
                    placeholder="Any dietary requirements or special requests..."
                    className={`${inputClass} resize-none`} style={inputStyle}
                    onFocus={e => Object.assign(e.target.style, focusStyle)}
                    onBlur={e => Object.assign(e.target.style, {borderColor:'rgba(255,255,255,0.1)'})}
                  />
                </div>

                <button type="submit" disabled={loading}
                        className="btn-gold w-full py-4 flex items-center justify-center gap-3 disabled:opacity-60">
                  {loading ? (
                    <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                  ) : (
                    <Send size={15} />
                  )}
                  {loading ? 'Sending...' : 'Confirm Reservation'}
                </button>

                <p className="text-[10px] text-white/25 text-center" style={{fontFamily:'Inter,sans-serif'}}>
                  We&apos;ll call you within 30 minutes to confirm.
                </p>
              </form>
            )}
          </motion.div>

          {/* Locations + Map */}
          <motion.div
            initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.8}}
          >
            <p className="text-[10px] tracking-[0.35em] uppercase mb-2" style={{color:'#D4AF37',fontFamily:'Poppins,sans-serif'}}>Our Locations</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{fontFamily:'Playfair Display,serif'}}>Find Us</h2>
            <div className="h-px w-14 mb-8" style={{background:'linear-gradient(90deg,#D4AF37,transparent)'}} />

            {/* Map embed */}
            <div className="rounded overflow-hidden mb-6" style={{border:'1px solid rgba(212,175,55,0.2)',height:'280px'}}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.9!2d78.2965!3d16.4954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bca6bad653e0a3f%3A0x86a6b5829bb4d70e!2sTHE%20MAGIC%20SPICE!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%" height="100%" allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="filter grayscale contrast-110 brightness-75"
                title="The Magic Spice Map"
              />
            </div>

            {/* Location list */}
            {restaurantInfo.locations.map(loc => (
              <div key={loc.city} className="glass-card p-5 rounded mb-3 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                     style={{background: loc.isMain ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.04)', border:`1px solid ${loc.isMain ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.08)'}`}}>
                  <MapPin size={16} style={{color: loc.isMain ? '#D4AF37' : 'rgba(255,255,255,0.4)'}} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white flex items-center gap-2" style={{fontFamily:'Poppins,sans-serif'}}>
                    {loc.city}
                    {loc.isMain && <span className="text-[8px] tracking-widest uppercase px-1.5 py-0.5 rounded-sm" style={{background:'rgba(212,175,55,0.15)',color:'#D4AF37',border:'1px solid rgba(212,175,55,0.3)'}}>Main</span>}
                  </p>
                  <p className="text-xs text-white/45 mt-0.5" style={{fontFamily:'Inter,sans-serif'}}>{loc.address}</p>
                  {loc.isMain && (
                    <a href={restaurantInfo.googleMapsLink} target="_blank" rel="noreferrer"
                       className="text-[10px] mt-2 inline-block transition-colors" style={{color:'#D4AF37',fontFamily:'Poppins,sans-serif',letterSpacing:'0.1em'}}>
                      Get Directions →
                    </a>
                  )}
                </div>
              </div>
            ))}

            {/* Catering */}
            <div className="mt-6 p-6 rounded" style={{border:'1px solid rgba(212,175,55,0.2)',background:'rgba(212,175,55,0.03)'}}>
              <p className="text-xs tracking-widest uppercase font-semibold mb-3" style={{color:'#D4AF37',fontFamily:'Poppins,sans-serif'}}>Catering Services</p>
              <div className="grid grid-cols-2 gap-2">
                {restaurantInfo.catering.map(item => (
                  <div key={item} className="flex items-center gap-2 text-xs text-white/55" style={{fontFamily:'Inter,sans-serif'}}>
                    <span style={{color:'#D4AF37'}}>✓</span> {item}
                  </div>
                ))}
              </div>
              <a href="https://wa.me/919849122963" target="_blank" rel="noreferrer"
                 className="btn-gold w-full text-center block mt-5 py-3">
                Inquire About Catering
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
