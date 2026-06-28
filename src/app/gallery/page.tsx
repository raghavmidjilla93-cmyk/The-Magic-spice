'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

const categories = ['All', 'Food', 'Mandi', 'Biryani', 'Starters', 'Ambiance', 'Events'];

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=900&q=80',  alt: 'Hyderabadi Biryani',        cat: 'Biryani',  span: 'row-span-2' },
  { src: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=900&q=80',  alt: 'Arabian Mandi',            cat: 'Mandi',    span: '' },
  { src: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=900&q=80',  alt: 'Tandoori Chicken',         cat: 'Starters', span: '' },
  { src: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=900&q=80',  alt: 'Butter Chicken Gravy',     cat: 'Food',     span: 'row-span-2' },
  { src: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=900&q=80',  alt: 'Mutton Masala',            cat: 'Food',     span: '' },
  { src: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=900&q=80',  alt: 'Seekh Kabab Platter',      cat: 'Starters', span: '' },
  { src: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=900&q=80',  alt: 'Prawn Masala',             cat: 'Food',     span: '' },
  { src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&q=80',  alt: 'Veg Platter',              cat: 'Food',     span: '' },
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80',  alt: 'Restaurant Ambiance',      cat: 'Ambiance', span: 'row-span-2' },
  { src: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=900&q=80',     alt: 'Mencho Soup',              cat: 'Food',     span: '' },
  { src: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=900&q=80',  alt: 'Chicken Fried Rice',       cat: 'Food',     span: '' },
  { src: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=900&q=80',  alt: 'Garlic Naan',              cat: 'Food',     span: '' },
  { src: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=900&q=80',  alt: 'Noodles Bowl',             cat: 'Food',     span: '' },
  { src: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=900&q=80',     alt: 'Desserts',                 cat: 'Food',     span: 'row-span-2' },
  { src: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&q=80',     alt: 'Beverages',                cat: 'Food',     span: '' },
  { src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=900&q=80',  alt: 'Egg Specials',             cat: 'Food',     span: '' },
  { src: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=900&q=80',  alt: 'Catering Event',           cat: 'Events',   span: 'row-span-2' },
  { src: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=900&q=80',  alt: 'Chef Preparation',         cat: 'Events',   span: '' },
  { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=80',     alt: 'Restaurant Interior',      cat: 'Ambiance', span: '' },
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80',  alt: 'Dining Hall',              cat: 'Ambiance', span: '' },
  { src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=900&q=80',     alt: 'Mandi Oven',               cat: 'Mandi',    span: '' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.cat === activeCategory);

  const openLightbox = useCallback((index: number) => setLightbox(index), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox(l => l !== null ? (l - 1 + filtered.length) % filtered.length : null), [filtered.length]);
  const next = useCallback(() => setLightbox(l => l !== null ? (l + 1) % filtered.length : null), [filtered.length]);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80" alt="Gallery hero" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0" style={{background:'linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.85) 60%, #0A0A0A 100%)'}} />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{color:'#D4AF37',fontFamily:'Poppins,sans-serif'}}>
            Visual Stories
          </motion.p>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.15,duration:0.8}} className="text-5xl md:text-7xl font-bold mb-4" style={{fontFamily:'Playfair Display,serif'}}>
            Gallery
          </motion.h1>
          <div className="h-px w-16 mb-5 mx-auto" style={{background:'linear-gradient(90deg,transparent,#D4AF37,transparent)'}} />
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}} className="text-white/60 italic text-lg" style={{fontFamily:'Cormorant Garamond,serif'}}>
            A feast for the eyes — before it becomes one for the soul
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-32 md:pb-20">
        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-10 justify-center flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="text-[10px] tracking-[0.18em] uppercase py-2.5 px-5 rounded-sm transition-all shrink-0"
              style={{
                fontFamily:'Poppins,sans-serif',
                fontWeight: activeCategory === cat ? '700' : '500',
                background: activeCategory === cat ? '#D4AF37' : 'rgba(255,255,255,0.04)',
                color: activeCategory === cat ? '#0A0A0A' : 'rgba(255,255,255,0.5)',
                border: `1px solid ${activeCategory === cat ? '#D4AF37' : 'rgba(255,255,255,0.1)'}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <motion.div layout className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          <AnimatePresence>
            {filtered.map((img, i) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="gallery-item break-inside-avoid mb-3 rounded overflow-hidden cursor-pointer"
                style={{display:'block'}}
                onClick={() => openLightbox(i)}
              >
                <div className="relative group">
                  <Image
                    src={img.src} alt={img.alt}
                    width={600} height={400}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width:640px)100vw,(max-width:1024px)50vw,25vw"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400"
                       style={{background:'rgba(0,0,0,0.5)'}}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{background:'rgba(212,175,55,0.2)',border:'1px solid rgba(212,175,55,0.5)'}}>
                      <ZoomIn size={20} style={{color:'#D4AF37'}} />
                    </div>
                  </div>
                  {/* Category label */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-400"
                       style={{background:'linear-gradient(to top,rgba(0,0,0,0.8),transparent)'}}>
                    <span className="text-[9px] tracking-widest uppercase" style={{color:'#D4AF37',fontFamily:'Poppins,sans-serif'}}>{img.cat}</span>
                    <p className="text-xs text-white font-medium mt-0.5" style={{fontFamily:'Inter,sans-serif'}}>{img.alt}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{background:'rgba(0,0,0,0.95)'}}
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                    style={{border:'1px solid rgba(255,255,255,0.2)',color:'rgba(255,255,255,0.7)'}}>
              <X size={18} />
            </button>
            <button onClick={e => { e.stopPropagation(); prev(); }}
                    className="absolute left-4 md:left-8 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:border-gold-500/60"
                    style={{border:'1px solid rgba(212,175,55,0.3)',color:'#D4AF37'}}>
              <ChevronLeft size={22} />
            </button>
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[80vh] w-full rounded overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={filtered[lightbox].src} alt={filtered[lightbox].alt}
                width={1200} height={800}
                className="w-full h-auto object-contain max-h-[80vh]"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4" style={{background:'linear-gradient(to top,rgba(0,0,0,0.8),transparent)'}}>
                <p className="text-sm text-white font-medium" style={{fontFamily:'Playfair Display,serif'}}>{filtered[lightbox].alt}</p>
                <p className="text-[10px] uppercase tracking-widest mt-1" style={{color:'#D4AF37',fontFamily:'Poppins,sans-serif'}}>{filtered[lightbox].cat}</p>
              </div>
            </motion.div>
            <button onClick={e => { e.stopPropagation(); next(); }}
                    className="absolute right-4 md:right-8 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:border-gold-500/60"
                    style={{border:'1px solid rgba(212,175,55,0.3)',color:'#D4AF37'}}>
              <ChevronRight size={22} />
            </button>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/40" style={{fontFamily:'Inter,sans-serif'}}>
              {lightbox + 1} / {filtered.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
