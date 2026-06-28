'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ArrowRight, Phone, ChevronLeft, ChevronRight } from 'lucide-react';

const WA = '919849122963';
const WA_BASE = `https://wa.me/${WA}`;

/* ════════════════════════════════════════════════════════════
   HERO — cinematic auto-slide between Biryani & Sizzler
═══════════════════════════════════════════════════════════ */

const SLIDES = [
  {
    img:   '/images/dishes/dum-biryani-handi.jpg',
    badge: '★ The Magic Spice Special',
    title: 'Hyderabadi Dum',
    gold:  'Biryani',
    desc:  'Slow-cooked in a sealed handi · saffron · whole spices · leg piece',
    price: 'from ₹199',
    wa:    'Hyderabadi%20Dum%20Biryani',
  },
  {
    img:   '/images/tandoori-hero.jpg',
    badge: '🔥 Bestseller · Signature',
    title: 'Sizzling Tandoori',
    gold:  'Chicken with Sizzler',
    desc:  'Charcoal-fired clay oven · served sizzling hot on cast iron',
    price: 'from ₹249',
    wa:    'Tandoori%20Chicken%20with%20Sizzler',
  },
];

function Hero() {
  const [active, setActive] = useState(0);
  const [prev,   setPrev]   = useState<number|null>(null);

  const go = useCallback((idx: number) => {
    setPrev(active);
    setActive(idx);
  }, [active]);

  // Auto-advance every 5 s
  useEffect(() => {
    const t = setInterval(() => go((active + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, [active, go]);

  const slide = SLIDES[active];

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">

      {/* ── Photo layer — crossfade ── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={active}
          initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
          transition={{duration:1.1, ease:'easeInOut'}}
          className="absolute inset-0">
          <Image
            src={slide.img}
            alt={slide.title}
            fill priority
            className="object-cover"
            style={{ objectPosition: active === 0 ? 'center 30%' : 'center center' }}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient — slide-specific: tandoori photo has baked-in text at top so we darken it more */}
      <div className="absolute inset-0 pointer-events-none z-10"
           style={{background: active === 1
             ? 'linear-gradient(to bottom, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.7) 22%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.9) 100%)'
             : 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.88) 100%)'
           }}/>

      {/* ── Slide dots + brand label — same row, spaced apart ── */}
      <div className="absolute top-24 left-0 right-0 z-20 px-6 md:px-10 flex items-center justify-between">
        {/* Brand label — hidden on very small screens to avoid crowding */}
        <p className="text-[9px] tracking-[0.6em] uppercase hidden sm:block"
           style={{color:'rgba(212,175,55,0.85)',fontFamily:'Poppins,sans-serif'}}>
          Est. 2019 · Nagarkurnool
        </p>
        {/* Dots */}
        <div className="flex items-center gap-2 sm:mx-0 mx-auto">
          {SLIDES.map((_,i) => (
            <button key={i} onClick={()=>go(i)}
              className="transition-all duration-400 rounded-full"
              style={{
                width:  i===active ? '24px' : '6px',
                height: '6px',
                background: i===active ? '#D4AF37' : 'rgba(255,255,255,0.3)',
              }}/>
          ))}
        </div>
      </div>

      {/* ── Bottom text + CTA ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-6 md:px-10 pb-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">

          {/* Text — AnimatePresence for smooth swap */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{opacity:0, y:18}}
              animate={{opacity:1, y:0}}
              exit={{opacity:0,   y:-12}}
              transition={{duration:0.55, ease:[0.23,1,0.32,1]}}>
              <p className="text-[9px] tracking-[0.5em] uppercase mb-2"
                 style={{color:'#D4AF37',fontFamily:'Poppins,sans-serif'}}>
                {slide.badge}
              </p>
              <h1 className="text-white font-bold leading-tight"
                  style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(1.75rem,4.5vw,3.5rem)'}}>
                {slide.title}
                <span className="block italic"
                      style={{background:'linear-gradient(90deg,#D4AF37,#F5E27A)',
                              WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
                  {slide.gold}
                </span>
              </h1>
              <p className="text-white/45 mt-2 italic hidden sm:block"
                 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'1.05rem'}}>
                {slide.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Buttons */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`cta-${active}`}
              initial={{opacity:0,x:16}} animate={{opacity:1,x:0}} exit={{opacity:0}}
              transition={{duration:0.5,delay:0.1}}
              className="flex items-center gap-3 pb-1 shrink-0">
              <a href={`${WA_BASE}?text=Hi%2C%20I%20want%20to%20order%20${slide.wa}`}
                 target="_blank" rel="noreferrer"
                 className="flex items-center gap-2 py-3 px-7 rounded-xl text-[11px] font-bold tracking-widest uppercase transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                 style={{background:'#25D366',color:'#fff',fontFamily:'Poppins,sans-serif',
                         boxShadow:'0 8px 28px rgba(37,211,102,0.4)'}}>
                <MessageCircle size={13}/> Order · {slide.price}
              </a>
              <Link href="/menu"
                 className="hidden sm:flex items-center gap-2 py-3 px-6 rounded-xl text-[11px] font-bold tracking-widest uppercase transition-all hover:scale-105 whitespace-nowrap"
                 style={{background:'rgba(255,255,255,0.08)',backdropFilter:'blur(12px)',
                         border:'1px solid rgba(255,255,255,0.15)',color:'rgba(255,255,255,0.8)',
                         fontFamily:'Poppins,sans-serif'}}>
                View Menu <ArrowRight size={11}/>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Cuisine ticker */}
        <div className="max-w-7xl mx-auto mt-5 pt-4 flex items-center gap-6 overflow-x-auto scrollbar-hide"
             style={{borderTop:'1px solid rgba(255,255,255,0.08)'}}>
          {['Hyderabadi Biryani','Mughlai','Arabian Mandi','Tandoori','Seafood','Chinese','Desserts'].map((c,i)=>(
            <span key={c} className="flex items-center gap-6 text-[8px] tracking-[0.4em] uppercase text-white/30 shrink-0"
                  style={{fontFamily:'Poppins,sans-serif'}}>
              {i > 0 && <span style={{color:'rgba(212,175,55,0.2)'}}>✦</span>}
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Prev / Next arrows — 44px touch target */}
      <button onClick={()=>go((active-1+SLIDES.length)%SLIDES.length)}
        className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-95"
        style={{background:'rgba(5,5,5,0.55)',backdropFilter:'blur(12px)',border:'1px solid rgba(255,255,255,0.14)'}}>
        <ChevronLeft size={18} className="text-white/75"/>
      </button>
      <button onClick={()=>go((active+1)%SLIDES.length)}
        className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-95"
        style={{background:'rgba(5,5,5,0.55)',backdropFilter:'blur(12px)',border:'1px solid rgba(255,255,255,0.14)'}}>
        <ChevronRight size={18} className="text-white/75"/>
      </button>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   DISHES GRID — 9 real photos from the restaurant
═══════════════════════════════════════════════════════════ */

const DISHES = [
  { name:'Hyderabadi Biryani',      sub:'Chicken · Silver Thali',   price:199, tag:'Specialty',  img:'/images/dishes/biryani-silver-thali.jpg',    wa:'Hyderabadi%20Biryani' },
  { name:'Dum Biryani',             sub:'Handi Style · Leg Piece',  price:249, tag:'Must Try',   img:'/images/dishes/dum-biryani-handi.jpg',        wa:'Dum%20Biryani%20in%20Handi' },
  { name:'Mutton Fry',              sub:'Spicy · Dry Gravy',        price:320, tag:'',           img:'/images/dishes/mutton-fry-curry.jpg',         wa:'Mutton%20Fry' },
  { name:'Mutton Biryani',          sub:'Kadai · Rich Masala',      price:299, tag:'',           img:'/images/dishes/mutton-biryani-kadai.jpg',     wa:'Mutton%20Biryani' },
  { name:'Tandoori Chicken Mandi',  sub:'Whole Bird · Charcoal',    price:550, tag:'★ Signature', img:'/images/dishes/tandoori-chicken-mandi.jpg',  wa:'Tandoori%20Chicken%20Mandi' },
  { name:'Chicken Mandi',           sub:'Arabian Style',            price:249, tag:'Bestseller', img:'/images/dishes/chicken-mandi-plate.jpg',      wa:'Chicken%20Mandi' },
  { name:'Lamb Biryani',            sub:'Slow Cooked',              price:349, tag:'',           img:'/images/dishes/lamb-biryani-bowl.jpg',        wa:'Lamb%20Biryani' },
  { name:'Arabian Mandi',           sub:'Wanaparthi Special 🔥',    price:399, tag:'★ Famous',   img:'/images/dishes/arabian-mandi-pot.jpg',        wa:'Arabian%20Mandi' },
  { name:'Chicken Platter',         sub:'Family Serve',             price:650, tag:'',           img:'/images/dishes/chicken-platter.jpg',          wa:'Chicken%20Platter' },
];

function DishesGrid() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          className="text-center mb-10">
          <p className="text-[9px] tracking-[0.55em] uppercase mb-2"
             style={{color:'#D4AF37',fontFamily:'Poppins,sans-serif'}}>From Our Kitchen</p>
          <h2 className="text-3xl font-bold" style={{fontFamily:'Playfair Display,serif'}}>Our Dishes</h2>
          <div className="h-px w-10 mx-auto mt-3"
               style={{background:'linear-gradient(90deg,transparent,#D4AF37,transparent)'}}/>
        </motion.div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DISHES.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
              transition={{delay:(i%3)*0.08,duration:0.65}}
              className="group rounded-2xl overflow-hidden"
              style={{background:'rgba(12,11,11,0.95)',
                      border:'1px solid rgba(212,175,55,0.1)',
                      boxShadow:'0 12px 36px rgba(0,0,0,0.45)',
                      transition:'border-color 0.3s,box-shadow 0.3s'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(212,175,55,0.32)';e.currentTarget.style.boxShadow='0 20px 50px rgba(0,0,0,0.6)';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(212,175,55,0.1)';e.currentTarget.style.boxShadow='0 12px 36px rgba(0,0,0,0.45)';}}>

              {/* Photo */}
              <div className="relative overflow-hidden" style={{height:'190px'}}>
                <Image
                  src={d.img}
                  alt={d.name} fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw"
                  onError={(e)=>{
                    // fallback to unsplash if local file not yet saved
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=600&q=80';
                  }}
                />
                <div className="absolute inset-0"
                     style={{background:'linear-gradient(to bottom,transparent 40%,rgba(5,5,5,0.88) 100%)'}}/>
                {d.tag && (
                  <span className="absolute top-3 left-3 text-[8px] tracking-widest uppercase px-2.5 py-1 rounded-lg"
                        style={{background:'rgba(5,5,5,0.65)',backdropFilter:'blur(8px)',
                                border:'1px solid rgba(212,175,55,0.35)',color:'#D4AF37',
                                fontFamily:'Poppins,sans-serif'}}>
                    {d.tag}
                  </span>
                )}
                {/* Price badge bottom-right of photo */}
                <span className="absolute bottom-3 right-3 text-base font-bold"
                      style={{color:'#F5E27A',fontFamily:'Playfair Display,serif',
                              textShadow:'0 2px 8px rgba(0,0,0,0.8)'}}>
                  ₹{d.price}
                </span>
              </div>

              {/* Info row */}
              <div className="px-4 py-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-white truncate"
                      style={{fontFamily:'Playfair Display,serif'}}>{d.name}</h3>
                  <p className="text-[10px] text-white/38 mt-0.5 truncate italic"
                     style={{fontFamily:'Cormorant Garamond,serif',fontSize:'0.85rem'}}>{d.sub}</p>
                </div>
                <a href={`${WA_BASE}?text=Hi%2C%20I%20want%20to%20order%20${d.wa}`}
                   target="_blank" rel="noreferrer"
                   className="flex items-center gap-1.5 py-2 px-4 rounded-xl text-[9px] font-bold tracking-widest uppercase shrink-0 transition-all hover:scale-105"
                   style={{background:'#25D366',color:'#fff',fontFamily:'Poppins,sans-serif',
                           boxShadow:'0 4px 14px rgba(37,211,102,0.3)'}}>
                  <MessageCircle size={10}/> Order
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}
          transition={{delay:0.3}} className="text-center mt-10">
          <Link href="/menu"
            className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase transition-all hover:gap-3"
            style={{color:'rgba(212,175,55,0.65)',fontFamily:'Poppins,sans-serif'}}>
            See full menu — 200+ dishes <ArrowRight size={12}/>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   BRANCHES — 3 locations with specialties
═══════════════════════════════════════════════════════════ */
function Branches() {
  const branches = [
    {
      city: 'Nagarkurnool',
      state: 'Telangana',
      tag: 'Flagship',
      specialty: 'Full menu · Dine-in & Takeaway',
      note: '',
      phone: '98491 22963',
      emoji: '🏠',
      highlight: false,
    },
    {
      city: 'Wanaparthi',
      state: 'Telangana',
      tag: '★ Mandi Special',
      specialty: 'Arabian Mandi Biryani',
      note: 'Our most celebrated Mandi Biryani — slow-cooked in a traditional underground pit. A must-try.',
      phone: '98491 22963',
      emoji: '🍖',
      highlight: true,
    },
    {
      city: 'Bangalore',
      state: 'Karnataka',
      tag: 'New Outlet',
      specialty: 'Multi-cuisine · Pan-India delivery',
      note: '',
      phone: '98491 22963',
      emoji: '🏙️',
      highlight: false,
    },
  ];

  return (
    <section className="py-16 px-6" style={{borderTop:'1px solid rgba(255,255,255,0.04)'}}>
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          className="text-center mb-10">
          <p className="text-[9px] tracking-[0.55em] uppercase mb-2"
             style={{color:'#D4AF37',fontFamily:'Poppins,sans-serif'}}>Our Locations</p>
          <h2 className="text-3xl font-bold" style={{fontFamily:'Playfair Display,serif'}}>3 Branches, 1 Standard</h2>
          <div className="h-px w-10 mx-auto mt-3" style={{background:'linear-gradient(90deg,transparent,#D4AF37,transparent)'}}/>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {branches.map((b, i) => (
            <motion.div
              key={b.city}
              initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
              transition={{delay:i*0.1,duration:0.7}}
              className="relative rounded-2xl p-6 flex flex-col gap-4 overflow-hidden"
              style={b.highlight ? {
                background:'rgba(212,175,55,0.06)',
                border:'1px solid rgba(212,175,55,0.35)',
                boxShadow:'0 0 40px rgba(212,175,55,0.08), 0 16px 48px rgba(0,0,0,0.4)',
              } : {
                background:'rgba(14,13,13,0.8)',
                border:'1px solid rgba(255,255,255,0.06)',
                boxShadow:'0 16px 48px rgba(0,0,0,0.3)',
              }}>

              {/* Glow for highlighted branch */}
              {b.highlight && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full pointer-events-none"
                     style={{background:'radial-gradient(circle,rgba(212,175,55,0.12) 0%,transparent 70%)'}}/>
              )}

              <div className="flex items-start justify-between">
                <span className="text-3xl">{b.emoji}</span>
                <span className="text-[8px] tracking-widest uppercase px-2.5 py-1 rounded-lg"
                      style={b.highlight
                        ? {background:'rgba(212,175,55,0.15)',color:'#D4AF37',border:'1px solid rgba(212,175,55,0.3)',fontFamily:'Poppins,sans-serif'}
                        : {background:'rgba(255,255,255,0.05)',color:'rgba(255,255,255,0.4)',border:'1px solid rgba(255,255,255,0.08)',fontFamily:'Poppins,sans-serif'}
                      }>
                  {b.tag}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white" style={{fontFamily:'Playfair Display,serif'}}>{b.city}</h3>
                <p className="text-xs text-white/35 mt-0.5" style={{fontFamily:'Inter,sans-serif'}}>{b.state}</p>
              </div>

              <div className="h-px" style={{background:'rgba(255,255,255,0.06)'}}/>

              <div>
                <p className="text-xs font-semibold mb-1"
                   style={{color: b.highlight ? '#D4AF37' : 'rgba(255,255,255,0.6)',fontFamily:'Poppins,sans-serif'}}>
                  {b.specialty}
                </p>
                {b.note && (
                  <p className="text-xs text-white/40 leading-relaxed italic mt-1"
                     style={{fontFamily:'Cormorant Garamond,serif',fontSize:'0.95rem'}}>{b.note}</p>
                )}
              </div>

              <div className="mt-auto flex items-center justify-between">
                <a href={`tel:${b.phone.replace(/\s/g,'')}`}
                   className="flex items-center gap-1.5 text-xs transition-colors"
                   style={{color:'rgba(255,255,255,0.35)',fontFamily:'Inter,sans-serif'}}>
                  <Phone size={11}/> {b.phone}
                </a>
                <a href={`${WA_BASE}?text=Hi%2C%20I%20am%20at%20${b.city}%20and%20want%20to%20order`}
                   target="_blank" rel="noreferrer"
                   className="flex items-center gap-1.5 text-[9px] tracking-wider uppercase py-2 px-4 rounded-lg transition-all hover:scale-105"
                   style={{background:'rgba(37,211,102,0.12)',color:'#4ade80',
                           border:'1px solid rgba(37,211,102,0.2)',fontFamily:'Poppins,sans-serif'}}>
                  <MessageCircle size={10}/> Order
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   CTA
═══════════════════════════════════════════════════════════ */
function CTA() {
  return (
    <section className="relative py-20 px-6 overflow-hidden"
             style={{borderTop:'1px solid rgba(255,255,255,0.04)'}}>
      <div className="absolute inset-0 pointer-events-none"
           style={{background:'radial-gradient(ellipse at center,rgba(212,175,55,0.05) 0%,transparent 65%)'}}/>

      <motion.div
        initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
        transition={{duration:0.8}}
        className="max-w-lg mx-auto text-center">
        <p className="text-[9px] tracking-[0.55em] uppercase mb-3"
           style={{color:'#D4AF37',fontFamily:'Poppins,sans-serif'}}>Ready to eat?</p>
        <h2 className="text-4xl font-bold mb-3" style={{fontFamily:'Playfair Display,serif'}}>
          Order in 30 Seconds
        </h2>
        <p className="text-white/35 italic mb-8"
           style={{fontFamily:'Cormorant Garamond,serif',fontSize:'1.1rem'}}>
          Message us on WhatsApp — we confirm instantly
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href={`${WA_BASE}?text=Hi%2C%20I%20want%20to%20place%20an%20order`}
             target="_blank" rel="noreferrer"
             className="flex items-center gap-2 py-3.5 px-9 rounded-xl font-bold text-[11px] tracking-widest uppercase transition-all hover:scale-105"
             style={{background:'#25D366',color:'#fff',fontFamily:'Poppins,sans-serif',
                     boxShadow:'0 10px 30px rgba(37,211,102,0.4)'}}>
            <MessageCircle size={14}/> WhatsApp Order
          </a>
          <Link href="/contact"
            className="flex items-center gap-2 py-3.5 px-9 rounded-xl font-bold text-[11px] tracking-widest uppercase transition-all hover:scale-105"
            style={{background:'rgba(212,175,55,0.08)',border:'1px solid rgba(212,175,55,0.25)',
                    color:'#D4AF37',fontFamily:'Poppins,sans-serif'}}>
            Book a Table
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <Hero />
      <DishesGrid />
      <Branches />
      <CTA />
    </>
  );
}
