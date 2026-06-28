'use client';

import { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MessageCircle } from 'lucide-react';
import { menuData, MenuItem, MenuTag } from '@/lib/menuData';
import { useMenuItems } from '@/lib/useMenuItems';

const WA = '919849122963';

/* Category hero images — one unique photo per cuisine */
const CAT_IMAGES: Record<string, string> = {
  mandi:          'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80',
  soups:          'https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=80',
  'veg-starters': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80',
  'nonveg-starters': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=1200&q=80',
  biryani:        'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=1200&q=80',
  gravies:        'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=1200&q=80',
  seafood:        'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=1200&q=80',
  chinese:        'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1200&q=80',
  desserts:       'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1200&q=80',
  beverages:      'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=1200&q=80',
  'rice-breads':  'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1200&q=80',
};

function TagDot({ tag }: { tag: MenuTag }) {
  if (tag === 'signature') return null;
  const map: Record<string, {color:string;label:string}> = {
    'veg':     {color:'#22c55e', label:'VEG'},
    'non-veg': {color:'#ef4444', label:'NON-VEG'},
    'egg':     {color:'#f59e0b', label:'EGG'},
    'spicy':   {color:'#f97316', label:'SPICY'},
  };
  const t = map[tag];
  if (!t) return null;
  return (
    <span className="inline-flex items-center gap-1 text-[8px] font-bold tracking-wider uppercase"
          style={{color:t.color,fontFamily:'Poppins,sans-serif'}}>
      <span className="w-2 h-2 rounded-full inline-block" style={{background:t.color}} />
      {t.label}
    </span>
  );
}

function DishRow({ item }: { item: MenuItem }) {
  const msg = `Hi%2C%20I%20want%20to%20order%3A%20${encodeURIComponent(item.name)}%20-%20%E2%82%B9${item.price}`;
  return (
    <motion.div
      layout
      initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}}
      transition={{duration:0.3}}
      className="group flex items-center justify-between gap-4 py-4 border-b transition-colors"
      style={{borderColor:'rgba(255,255,255,0.06)'}}
    >
      {/* Left: tags + name + desc */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          {item.tags.filter(t=>t!=='signature').map(t=><TagDot key={t} tag={t as MenuTag}/>)}
          {item.isSignature && (
            <span className="text-[8px] tracking-widest uppercase px-1.5 py-0.5 rounded-sm"
                  style={{background:'rgba(212,175,55,0.12)',color:'#D4AF37',border:'1px solid rgba(212,175,55,0.25)',fontFamily:'Poppins,sans-serif'}}>
              ★ Signature
            </span>
          )}
        </div>
        <h3 className="text-sm font-semibold text-white group-hover:text-yellow-200 transition-colors leading-snug"
            style={{fontFamily:'Playfair Display,serif'}}>
          {item.name}
        </h3>
        {item.description && (
          <p className="text-xs text-white/35 mt-0.5 line-clamp-1" style={{fontFamily:'Inter,sans-serif'}}>
            {item.description}
          </p>
        )}
        {item.priceNote && (
          <p className="text-[10px] text-white/25 mt-0.5" style={{fontFamily:'Inter,sans-serif'}}>{item.priceNote}</p>
        )}
      </div>

      {/* Right: price + order */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-base font-bold" style={{color:'#D4AF37',fontFamily:'Playfair Display,serif'}}>
          ₹{item.price}
        </span>
        <a
          href={`https://wa.me/${WA}?text=${msg}`}
          target="_blank" rel="noreferrer"
          className="flex items-center gap-1.5 py-2 px-3.5 rounded-sm text-[9px] font-bold tracking-widest uppercase transition-all opacity-0 group-hover:opacity-100 hover:opacity-90"
          style={{background:'#25D366',color:'#fff',fontFamily:'Poppins,sans-serif'}}
        >
          <MessageCircle size={10}/> Order
        </a>
        {/* Mobile always visible */}
        <a
          href={`https://wa.me/${WA}?text=${msg}`}
          target="_blank" rel="noreferrer"
          className="md:hidden flex items-center gap-1 py-1.5 px-2.5 rounded-sm text-[9px] font-bold"
          style={{background:'rgba(37,211,102,0.15)',color:'#25D366',border:'1px solid rgba(37,211,102,0.3)',fontFamily:'Poppins,sans-serif'}}
        >
          <MessageCircle size={10}/>
        </a>
      </div>
    </motion.div>
  );
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [filterTag, setFilterTag] = useState<'all'|'veg'|'non-veg'|'egg'>('all');
  const [search, setSearch] = useState('');

  // Reads from localStorage (updated live when admin adds/edits dishes)
  const allItems = useMenuItems();

  const filtered = useMemo(() => {
    let items: MenuItem[] = activeCategory === 'all'
      ? allItems
      : allItems.filter(i => i.category === activeCategory);

    if (filterTag !== 'all')
      items = items.filter(i => i.tags.includes(filterTag as MenuTag));

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(i => i.name.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q));
    }
    return items;
  }, [activeCategory, filterTag, search, allItems]);

  /* Group by category for display */
  const grouped = useMemo(() => {
    if (activeCategory !== 'all') {
      const cat = menuData.find(c => c.id === activeCategory);
      return cat ? [{ cat, items: filtered }] : [];
    }
    return menuData
      .map(cat => ({ cat, items: filtered.filter(i => i.category === cat.id) }))
      .filter(g => g.items.length > 0);
  }, [activeCategory, filtered]);

  const clearFilters = useCallback(() => {
    setFilterTag('all'); setSearch(''); setActiveCategory('all');
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={activeCategory !== 'all' && CAT_IMAGES[activeCategory]
              ? CAT_IMAGES[activeCategory]
              : 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=1600&q=80'}
            alt="Menu" fill className="object-cover transition-all duration-700" sizes="100vw"
          />
          <div className="absolute inset-0" style={{background:'linear-gradient(to bottom,rgba(5,5,5,0.65) 0%,rgba(5,5,5,0.88) 60%,#050505 100%)'}} />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.p initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.6}}
            className="text-[9px] tracking-[0.5em] uppercase mb-3" style={{color:'#D4AF37',fontFamily:'Poppins,sans-serif'}}>
            The Magic Spice
          </motion.p>
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1,duration:0.7}}
            className="text-5xl md:text-7xl font-bold mb-4" style={{fontFamily:'Playfair Display,serif'}}>
            Our Menu
          </motion.h1>
          <div className="h-px w-16 mx-auto mb-4" style={{background:'linear-gradient(90deg,transparent,#D4AF37,transparent)'}} />
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.25,duration:0.6}}
            className="text-white/45 italic text-lg" style={{fontFamily:'Cormorant Garamond,serif'}}>
            {allItems.length} dishes across 9 cuisines
          </motion.p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 pb-32 md:pb-20">

        {/* ── Sticky filter bar ── */}
        <div className="sticky top-[72px] z-30 py-4 mb-8 -mx-4 px-4"
             style={{background:'rgba(5,5,5,0.97)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(212,175,55,0.1)'}}>
          {/* Search */}
          <div className="relative mb-3">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"/>
            <input
              type="text" placeholder="Search dishes..."
              value={search} onChange={e=>setSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-3 text-sm text-white bg-transparent border rounded-sm focus:outline-none transition-colors placeholder:text-white/20"
              style={{borderColor:'rgba(255,255,255,0.08)',fontFamily:'Inter,sans-serif'}}
            />
            {search && (
              <button onClick={()=>setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                <X size={13}/>
              </button>
            )}
          </div>

          {/* Veg / Non-veg filter */}
          <div className="flex items-center gap-2 flex-wrap">
            {(['all','veg','non-veg','egg'] as const).map(t=>(
              <button key={t} onClick={()=>setFilterTag(t)}
                className="text-[9px] tracking-widest uppercase py-1.5 px-3 rounded-sm transition-all"
                style={{
                  fontFamily:'Poppins,sans-serif',
                  fontWeight: filterTag===t ? '700':'500',
                  background: filterTag===t ? '#D4AF37':'rgba(255,255,255,0.03)',
                  color: filterTag===t ? '#0A0A0A':'rgba(255,255,255,0.4)',
                  border:`1px solid ${filterTag===t ? '#D4AF37':'rgba(255,255,255,0.08)'}`,
                }}>
                {t==='all'?'All':t==='non-veg'?'Non-Veg':t[0].toUpperCase()+t.slice(1)}
              </button>
            ))}
            {(search||filterTag!=='all') && (
              <button onClick={clearFilters} className="text-[9px] text-white/30 hover:text-white/60 flex items-center gap-1 ml-auto transition-colors" style={{fontFamily:'Inter,sans-serif'}}>
                <X size={10}/> Clear
              </button>
            )}
          </div>
        </div>

        {/* ── Category tabs ── */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide">
          <button onClick={()=>setActiveCategory('all')}
            className="whitespace-nowrap text-[9px] tracking-widest uppercase py-2 px-4 rounded-sm shrink-0 transition-all"
            style={{
              fontFamily:'Poppins,sans-serif',fontWeight:activeCategory==='all'?'700':'400',
              background:activeCategory==='all'?'#D4AF37':'rgba(255,255,255,0.03)',
              color:activeCategory==='all'?'#0A0A0A':'rgba(255,255,255,0.4)',
              border:`1px solid ${activeCategory==='all'?'#D4AF37':'rgba(255,255,255,0.08)'}`,
            }}>
            All
          </button>
          {menuData.map(cat=>(
            <button key={cat.id} onClick={()=>setActiveCategory(cat.id)}
              className="whitespace-nowrap text-[9px] tracking-widest uppercase py-2 px-4 rounded-sm shrink-0 transition-all flex items-center gap-1.5"
              style={{
                fontFamily:'Poppins,sans-serif',fontWeight:activeCategory===cat.id?'700':'400',
                background:activeCategory===cat.id?'#D4AF37':'rgba(255,255,255,0.03)',
                color:activeCategory===cat.id?'#0A0A0A':'rgba(255,255,255,0.4)',
                border:`1px solid ${activeCategory===cat.id?'#D4AF37':'rgba(255,255,255,0.08)'}`,
              }}>
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* ── Dish list ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-white/30">
            <p className="text-4xl mb-3">🍽️</p>
            <p className="text-lg mb-4" style={{fontFamily:'Playfair Display,serif'}}>No dishes found</p>
            <button onClick={clearFilters} className="btn-outline-gold text-xs">Clear filters</button>
          </div>
        ) : (
          <div>
            {grouped.map(({cat, items}) => (
              <div key={cat.id} className="mb-12">
                {/* Category header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative h-14 w-20 rounded overflow-hidden shrink-0">
                    <Image
                      src={CAT_IMAGES[cat.id] || 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=70'}
                      alt={cat.name} fill className="object-cover"
                      sizes="80px"
                    />
                    <div className="absolute inset-0" style={{background:'rgba(5,5,5,0.3)'}}/>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white" style={{fontFamily:'Playfair Display,serif'}}>
                      {cat.icon} {cat.name}
                    </h2>
                    <p className="text-xs text-white/35 mt-0.5 italic" style={{fontFamily:'Cormorant Garamond,serif'}}>{cat.description}</p>
                  </div>
                </div>

                {/* Items */}
                <AnimatePresence>
                  {items.map(item => <DishRow key={item.id} item={item}/>)}
                </AnimatePresence>
              </div>
            ))}

            <p className="text-xs text-center text-white/20 pt-4" style={{fontFamily:'Inter,sans-serif'}}>
              Showing {filtered.length} items · Prices exclusive of taxes
            </p>
          </div>
        )}
      </div>
    </>
  );
}
