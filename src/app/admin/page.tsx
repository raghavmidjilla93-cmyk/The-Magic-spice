'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, UtensilsCrossed, Settings, LogOut,
  Eye, MessageSquare, Plus, Edit3, Trash2,
  Lock, Clock, Phone, MapPin, Star, X, Save, Check, AlertTriangle
} from 'lucide-react';
import { menuData, MenuItem, MenuTag } from '@/lib/menuData';
import { getStoredItems, saveItems, dispatchMenuUpdated, LS_KEY } from '@/lib/useMenuItems';

/* ════════════════════════════════════════════════════════════
   AUTH
═══════════════════════════════════════════════════════════ */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    if (creds.username === 'admin' && creds.password === 'magicspice2024') {
      sessionStorage.setItem('tms_admin', '1');
      onLogin();
    } else {
      setError('Wrong username or password');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{background:'#050505'}}>
      <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8}} className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
               style={{background:'rgba(212,175,55,0.1)',border:'1px solid rgba(212,175,55,0.3)'}}>
            <Lock size={28} style={{color:'#D4AF37'}} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1" style={{fontFamily:'Playfair Display,serif'}}>Admin Login</h1>
          <p className="text-xs text-white/40" style={{fontFamily:'Inter,sans-serif'}}>The Magic Spice · Dashboard</p>
        </div>

        <div className="glass-card p-8 rounded">
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2" style={{fontFamily:'Poppins,sans-serif'}}>Username</label>
              <input type="text" required autoFocus
                value={creds.username} onChange={e=>setCreds(c=>({...c,username:e.target.value}))}
                className="w-full bg-transparent border border-white/10 rounded-sm px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-yellow-500/40 transition-colors"
                style={{fontFamily:'Inter,sans-serif'}} placeholder="admin" />
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2" style={{fontFamily:'Poppins,sans-serif'}}>Password</label>
              <input type="password" required
                value={creds.password} onChange={e=>setCreds(c=>({...c,password:e.target.value}))}
                className="w-full bg-transparent border border-white/10 rounded-sm px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none transition-colors"
                style={{fontFamily:'Inter,sans-serif'}} placeholder="••••••••••" />
            </div>
            {error && <p className="text-xs text-red-400 text-center" style={{fontFamily:'Inter,sans-serif'}}>{error}</p>}
            <button type="submit" disabled={loading}
              className="btn-gold w-full py-3.5 flex items-center justify-center gap-2 disabled:opacity-60">
              {loading && <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin"/>}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
            <p className="text-[10px] text-center text-white/20" style={{fontFamily:'Inter,sans-serif'}}>
              admin / magicspice2024
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   TOAST
═══════════════════════════════════════════════════════════ */
function Toast({ msg, type, onClose }: { msg:string; type:'success'|'error'; onClose:()=>void }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return ()=>clearTimeout(t); }, [onClose]);
  return (
    <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:10}}
      className="fixed bottom-6 right-6 z-[999] flex items-center gap-3 px-5 py-3.5 rounded-sm shadow-2xl"
      style={{background: type==='success'?'#14532d':'#7f1d1d', border:`1px solid ${type==='success'?'rgba(34,197,94,0.4)':'rgba(239,68,68,0.4)'}`,
              fontFamily:'Inter,sans-serif',minWidth:'200px'}}>
      {type==='success' ? <Check size={15} style={{color:'#4ade80'}}/> : <AlertTriangle size={15} style={{color:'#f87171'}}/>}
      <span className="text-sm text-white">{msg}</span>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   ADD / EDIT MODAL
═══════════════════════════════════════════════════════════ */
const DEFAULT_FORM: Partial<MenuItem> & { tagsStr: string } = {
  name:'', price:'', description:'', category:'mandi', subCategory:'',
  image:'', priceNote:'', isSignature: false,
  tags:['non-veg'] as MenuTag[], tagsStr:'non-veg',
};

type FormState = typeof DEFAULT_FORM;

function ItemModal({
  item, onSave, onClose
}: { item: MenuItem|null; onSave:(data:FormState)=>void; onClose:()=>void }) {
  const [form, setForm] = useState<FormState>(() =>
    item ? { ...item, tagsStr: item.tags.join(', ') } : { ...DEFAULT_FORM }
  );
  const nameRef = useRef<HTMLInputElement>(null);
  useEffect(() => { nameRef.current?.focus(); }, []);

  const set = (key: keyof FormState, val: unknown) => setForm(f => ({...f, [key]: val}));

  const handleSave = () => {
    if (!form.name?.toString().trim()) { alert('Name is required'); return; }
    if (!form.price?.toString().trim()) { alert('Price is required'); return; }
    const tags = (form.tagsStr||'').split(',').map(t=>t.trim().toLowerCase()).filter(Boolean) as MenuTag[];
    onSave({ ...form, tags });
  };

  const inputCls = "w-full bg-transparent border border-white/10 rounded-sm px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-yellow-500/30 transition-colors";
  const labelCls = "block text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1.5";

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{background:'rgba(0,0,0,0.87)'}}
      onClick={onClose}>
      <motion.div initial={{scale:0.94,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.94,opacity:0}}
        className="admin-card p-7 rounded w-full max-w-md my-8"
        onClick={e=>e.stopPropagation()}>

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white" style={{fontFamily:'Playfair Display,serif'}}>
            {item ? 'Edit Dish' : 'Add New Dish'}
          </h3>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors"><X size={18}/></button>
        </div>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className={labelCls} style={{fontFamily:'Poppins,sans-serif'}}>Dish Name *</label>
            <input ref={nameRef} value={form.name as string} onChange={e=>set('name',e.target.value)}
              placeholder="e.g. Chicken Al Faham" className={inputCls} style={{fontFamily:'Inter,sans-serif'}}/>
          </div>

          {/* Category + SubCategory */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls} style={{fontFamily:'Poppins,sans-serif'}}>Category *</label>
              <select value={form.category as string} onChange={e=>set('category',e.target.value)}
                className={inputCls} style={{fontFamily:'Inter,sans-serif'}}>
                {menuData.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls} style={{fontFamily:'Poppins,sans-serif'}}>Sub-Category</label>
              <input value={form.subCategory as string} onChange={e=>set('subCategory',e.target.value)}
                placeholder="e.g. Chicken Mandi" className={inputCls} style={{fontFamily:'Inter,sans-serif'}}/>
            </div>
          </div>

          {/* Price + Price Note */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls} style={{fontFamily:'Poppins,sans-serif'}}>Price (₹) *</label>
              <input value={form.price as string|number} onChange={e=>set('price',e.target.value)}
                placeholder="299" type="number" min="0" className={inputCls} style={{fontFamily:'Inter,sans-serif'}}/>
            </div>
            <div>
              <label className={labelCls} style={{fontFamily:'Poppins,sans-serif'}}>Price Note</label>
              <input value={form.priceNote as string||''} onChange={e=>set('priceNote',e.target.value)}
                placeholder="e.g. per person" className={inputCls} style={{fontFamily:'Inter,sans-serif'}}/>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={labelCls} style={{fontFamily:'Poppins,sans-serif'}}>Description</label>
            <textarea value={form.description as string||''} onChange={e=>set('description',e.target.value)}
              rows={2} placeholder="Brief description of the dish..."
              className={`${inputCls} resize-none`} style={{fontFamily:'Inter,sans-serif'}}/>
          </div>

          {/* Image URL */}
          <div>
            <label className={labelCls} style={{fontFamily:'Poppins,sans-serif'}}>Photo URL</label>
            <input value={form.image as string||''} onChange={e=>set('image',e.target.value)}
              placeholder="https://images.unsplash.com/..." className={inputCls} style={{fontFamily:'Inter,sans-serif'}}/>
            <p className="text-[9px] text-white/20 mt-1" style={{fontFamily:'Inter,sans-serif'}}>
              Paste any image URL (Unsplash, Google, etc.)
            </p>
          </div>

          {/* Tags */}
          <div>
            <label className={labelCls} style={{fontFamily:'Poppins,sans-serif'}}>Tags (comma-separated)</label>
            <input value={form.tagsStr} onChange={e=>set('tagsStr',e.target.value)}
              placeholder="veg, spicy, signature" className={inputCls} style={{fontFamily:'Inter,sans-serif'}}/>
            <p className="text-[9px] text-white/20 mt-1" style={{fontFamily:'Inter,sans-serif'}}>
              Options: veg · non-veg · egg · spicy · signature
            </p>
          </div>

          {/* Signature */}
          <label className="flex items-center gap-3 cursor-pointer">
            <div onClick={()=>set('isSignature',!form.isSignature)}
              className="w-10 h-5 rounded-full relative transition-colors"
              style={{background: form.isSignature ? '#D4AF37':'rgba(255,255,255,0.12)'}}>
              <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all"
                    style={{left: form.isSignature ? '1.4rem':'0.1rem'}} />
            </div>
            <span className="text-sm text-white/60" style={{fontFamily:'Inter,sans-serif'}}>Mark as Signature dish</span>
          </label>
        </div>

        <div className="flex gap-3 mt-7">
          <button onClick={handleSave} className="btn-gold flex-1 py-3 flex items-center justify-center gap-2 text-[11px]">
            <Save size={13}/> {item ? 'Save Changes' : 'Add Dish'}
          </button>
          <button onClick={onClose} className="btn-outline-gold px-5 text-[11px]">Cancel</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   MENU MANAGER (with real localStorage)
═══════════════════════════════════════════════════════════ */
function MenuManager({ showToast }: { showToast:(msg:string,type:'success'|'error')=>void }) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [selectedCat, setSelectedCat] = useState(menuData[0].id);
  const [editItem, setEditItem] = useState<MenuItem|null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string|null>(null);
  const [search, setSearch] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    setItems(getStoredItems());
  }, []);

  const persist = (next: MenuItem[]) => {
    setItems(next);
    saveItems(next);
    dispatchMenuUpdated();
  };

  const handleSave = (data: FormState) => {
    const tags = data.tags as MenuTag[];
    const price = isNaN(Number(data.price)) ? data.price as string : Number(data.price);

    if (editItem) {
      // Edit
      const next = items.map(i => i.id === editItem.id
        ? { ...i, ...data, price, tags, isSignature: !!data.isSignature }
        : i
      );
      persist(next);
      showToast('Dish updated!', 'success');
    } else {
      // Add new
      const newItem: MenuItem = {
        id: `custom_${Date.now()}`,
        name: data.name as string,
        price,
        description: data.description as string || undefined,
        category: data.category as string,
        subCategory: data.subCategory as string || undefined,
        tags,
        image: data.image as string || undefined,
        priceNote: data.priceNote as string || undefined,
        isSignature: !!data.isSignature,
      };
      persist([...items, newItem]);
      showToast('Dish added!', 'success');
    }
    setEditItem(null);
    setShowAdd(false);
  };

  const confirmDelete = (id: string) => {
    const next = items.filter(i => i.id !== id);
    persist(next);
    setDeleteTarget(null);
    showToast('Dish deleted', 'success');
  };

  const resetToDefault = () => {
    if (!confirm('This will reset ALL menu items back to default. Continue?')) return;
    localStorage.removeItem(LS_KEY);
    const defaults = menuData.flatMap(c => c.items);
    setItems(defaults);
    dispatchMenuUpdated();
    showToast('Menu reset to default', 'success');
  };

  const catItems = items.filter(i => {
    const catMatch = i.category === selectedCat;
    const q = search.toLowerCase();
    const searchMatch = !q || i.name.toLowerCase().includes(q);
    return catMatch && searchMatch;
  });

  const customCount = items.filter(i => i.id.startsWith('custom_')).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-white" style={{fontFamily:'Playfair Display,serif'}}>Menu Management</h2>
          {customCount > 0 && (
            <p className="text-xs text-white/35 mt-0.5" style={{fontFamily:'Inter,sans-serif'}}>
              {customCount} custom dish{customCount>1?'es':''} added by admin
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button onClick={resetToDefault}
            className="text-[10px] tracking-widest uppercase py-2 px-4 rounded-sm text-white/40 hover:text-white/70 transition-colors border border-white/10"
            style={{fontFamily:'Poppins,sans-serif'}}>
            Reset Default
          </button>
          <button onClick={()=>setShowAdd(true)} className="btn-gold py-2.5 px-5 flex items-center gap-2 text-[11px]">
            <Plus size={13}/> Add Dish
          </button>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
        {menuData.map(cat=>(
          <button key={cat.id} onClick={()=>setSelectedCat(cat.id)}
            className="whitespace-nowrap text-[10px] tracking-widest uppercase py-2 px-4 rounded-sm transition-all shrink-0"
            style={{
              fontFamily:'Poppins,sans-serif',fontWeight:selectedCat===cat.id?'700':'400',
              background:selectedCat===cat.id?'#D4AF37':'rgba(255,255,255,0.04)',
              color:selectedCat===cat.id?'#0A0A0A':'rgba(255,255,255,0.5)',
              border:`1px solid ${selectedCat===cat.id?'#D4AF37':'rgba(255,255,255,0.08)'}`,
            }}>
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <input type="text" value={search} onChange={e=>setSearch(e.target.value)}
          placeholder="Search in this category..."
          className="w-full bg-transparent border border-white/08 rounded-sm pl-4 pr-10 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none"
          style={{fontFamily:'Inter,sans-serif',borderColor:'rgba(255,255,255,0.08)'}}/>
        {search && <button onClick={()=>setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30"><X size={13}/></button>}
      </div>

      {/* Table */}
      <div className="admin-card overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr style={{borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
              {['Dish Name','Sub-Category','Price','Tags','Actions'].map(h=>(
                <th key={h} className="text-left py-3 px-4 text-[10px] tracking-widest uppercase text-white/30"
                    style={{fontFamily:'Poppins,sans-serif'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {catItems.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-12 text-white/25 text-sm" style={{fontFamily:'Inter,sans-serif'}}>
                No items. Click "Add Dish" to get started.
              </td></tr>
            ) : catItems.map(item=>(
              <tr key={item.id}
                className="transition-colors hover:bg-white/2"
                style={{borderBottom:'1px solid rgba(255,255,255,0.04)',
                        background: item.id.startsWith('custom_') ? 'rgba(212,175,55,0.03)' : 'transparent'}}>
                <td className="py-3 px-4">
                  <span className="text-sm text-white/85" style={{fontFamily:'Inter,sans-serif'}}>{item.name}</span>
                  {item.isSignature && <span className="ml-2 text-[8px] tracking-wider" style={{color:'#D4AF37'}}>★ SIG</span>}
                  {item.id.startsWith('custom_') && <span className="ml-2 text-[8px] px-1.5 py-0.5 rounded-sm" style={{background:'rgba(212,175,55,0.1)',color:'#D4AF37',fontFamily:'Poppins,sans-serif'}}>NEW</span>}
                </td>
                <td className="py-3 px-4 text-xs text-white/35" style={{fontFamily:'Inter,sans-serif'}}>{item.subCategory||'—'}</td>
                <td className="py-3 px-4 text-sm font-semibold" style={{color:'#D4AF37',fontFamily:'Playfair Display,serif'}}>₹{item.price}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-1 flex-wrap">
                    {item.tags.slice(0,3).map(t=>(
                      <span key={t} className="text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm"
                            style={{background:'rgba(255,255,255,0.05)',color:'rgba(255,255,255,0.35)',fontFamily:'Poppins,sans-serif'}}>{t}</span>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-1">
                    <button onClick={()=>setEditItem(item)}
                      className="w-7 h-7 rounded flex items-center justify-center hover:bg-white/10 transition-colors" title="Edit">
                      <Edit3 size={13} className="text-white/40 hover:text-white"/>
                    </button>
                    <button onClick={()=>setDeleteTarget(item.id)}
                      className="w-7 h-7 rounded flex items-center justify-center hover:bg-red-500/10 transition-colors" title="Delete">
                      <Trash2 size={13} className="text-white/40 hover:text-red-400"/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {catItems.length > 0 && (
          <p className="text-[10px] text-white/20 text-right py-3 px-4" style={{fontFamily:'Inter,sans-serif'}}>
            {catItems.length} item{catItems.length!==1?'s':''} in this category
          </p>
        )}
      </div>

      {/* Delete confirmation */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{background:'rgba(0,0,0,0.87)'}}
            onClick={()=>setDeleteTarget(null)}>
            <motion.div initial={{scale:0.9}} animate={{scale:1}} exit={{scale:0.9}}
              className="admin-card p-7 rounded max-w-sm w-full text-center"
              onClick={e=>e.stopPropagation()}>
              <Trash2 size={32} className="mx-auto mb-4 text-red-400"/>
              <h3 className="text-lg font-bold text-white mb-2" style={{fontFamily:'Playfair Display,serif'}}>Delete Dish?</h3>
              <p className="text-sm text-white/40 mb-6" style={{fontFamily:'Inter,sans-serif'}}>
                This will remove the dish from the menu. This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button onClick={()=>confirmDelete(deleteTarget)}
                  className="flex-1 py-3 rounded-sm text-[11px] font-bold tracking-widest uppercase bg-red-600 text-white hover:bg-red-500 transition-colors"
                  style={{fontFamily:'Poppins,sans-serif'}}>Delete</button>
                <button onClick={()=>setDeleteTarget(null)} className="btn-outline-gold px-5 text-[11px]">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {(showAdd || editItem) && (
          <ItemModal
            item={editItem}
            onSave={handleSave}
            onClose={()=>{ setShowAdd(false); setEditItem(null); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   ANALYTICS CARDS
═══════════════════════════════════════════════════════════ */
function AnalyticsCards() {
  const [itemCount, setItemCount] = useState(0);
  useEffect(() => { setItemCount(getStoredItems().length); }, []);

  const stats = [
    { label:'Website Visitors', value:'2,847', change:'+12%', color:'#D4AF37' },
    { label:'WhatsApp Orders', value:'23',    change:'+5',   color:'#22c55e' },
    { label:'Menu Items',      value:String(itemCount)+'', change:'',    color:'#3b82f6' },
    { label:'Google Rating',   value:'4.8 ★', change:'',    color:'#f59e0b' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map(({ label, value, change, color }) => (
        <div key={label} className="admin-card p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{background:`${color}18`}}>
              <Eye size={16} style={{color}}/>
            </div>
            {change && <span className="text-xs font-semibold" style={{color:'#22c55e',fontFamily:'Poppins,sans-serif'}}>{change}</span>}
          </div>
          <p className="text-2xl font-bold text-white mb-1" style={{fontFamily:'Playfair Display,serif'}}>{value}</p>
          <p className="text-xs text-white/40" style={{fontFamily:'Inter,sans-serif'}}>{label}</p>
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SETTINGS PANEL
═══════════════════════════════════════════════════════════ */
function SettingsPanel({ showToast }: { showToast:(msg:string,type:'success'|'error')=>void }) {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    phone: '9849 122 963',
    timings: '11:00 AM – 11:00 PM',
    address: 'Nagarkurnool, Telangana',
    email: 'info@themagicspice.in',
    whatsapp: '919849122963',
  });

  useEffect(()=>{
    const raw = localStorage.getItem('tms_settings');
    if (raw) setSettings(JSON.parse(raw));
  },[]);

  const save = () => {
    localStorage.setItem('tms_settings', JSON.stringify(settings));
    showToast('Settings saved!','success');
    setSaved(true);
    setTimeout(()=>setSaved(false), 2000);
  };

  const fields: {key:keyof typeof settings; label:string; icon:React.ReactNode}[] = [
    {key:'phone',    label:'Phone Number',   icon:<Phone size={14}/>},
    {key:'whatsapp', label:'WhatsApp Number (with country code)', icon:<MessageSquare size={14}/>},
    {key:'timings',  label:'Opening Hours',  icon:<Clock size={14}/>},
    {key:'address',  label:'Address',        icon:<MapPin size={14}/>},
    {key:'email',    label:'Email',          icon:<Star size={14}/>},
  ];

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-white mb-6" style={{fontFamily:'Playfair Display,serif'}}>Restaurant Settings</h2>
      <div className="space-y-4">
        {fields.map(({key,label,icon})=>(
          <div key={key} className="admin-card p-5">
            <label className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2"
                   style={{fontFamily:'Poppins,sans-serif'}}>
              <span style={{color:'#D4AF37'}}>{icon}</span> {label}
            </label>
            <input value={settings[key]} onChange={e=>setSettings(s=>({...s,[key]:e.target.value}))}
              className="w-full bg-transparent border border-white/10 rounded-sm px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-yellow-500/30 transition-colors"
              style={{fontFamily:'Inter,sans-serif'}}/>
          </div>
        ))}
        <button onClick={save}
          className="btn-gold py-3 px-8 flex items-center gap-2 text-[11px]">
          {saved ? <><Check size={13}/> Saved!</> : <><Save size={13}/> Save Settings</>}
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   DASHBOARD SHELL
═══════════════════════════════════════════════════════════ */
type Tab = 'dashboard' | 'menu' | 'settings';

function Dashboard({ onLogout }: { onLogout:()=>void }) {
  const [tab, setTab] = useState<Tab>('dashboard');
  const [toast, setToast] = useState<{msg:string;type:'success'|'error'}|null>(null);

  const showToast = (msg:string, type:'success'|'error') => setToast({msg,type});

  const nav: {key:Tab; label:string; icon:React.ReactNode}[] = [
    {key:'dashboard', label:'Dashboard', icon:<LayoutDashboard size={16}/>},
    {key:'menu',      label:'Menu',      icon:<UtensilsCrossed size={16}/>},
    {key:'settings',  label:'Settings',  icon:<Settings size={16}/>},
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{background:'#050505'}}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b"
           style={{borderColor:'rgba(212,175,55,0.12)',background:'rgba(8,8,8,0.98)'}}>
        <div className="flex items-center gap-6">
          <span className="text-sm font-bold text-white" style={{fontFamily:'Playfair Display,serif'}}>The Magic Spice</span>
          <nav className="hidden sm:flex items-center gap-1">
            {nav.map(n=>(
              <button key={n.key} onClick={()=>setTab(n.key)}
                className="flex items-center gap-2 px-4 py-2 rounded-sm text-[11px] tracking-widest uppercase transition-all"
                style={{
                  fontFamily:'Poppins,sans-serif',fontWeight:tab===n.key?'700':'400',
                  background: tab===n.key ? 'rgba(212,175,55,0.12)':'transparent',
                  color: tab===n.key ? '#D4AF37':'rgba(255,255,255,0.45)',
                }}>
                {n.icon} {n.label}
              </button>
            ))}
          </nav>
        </div>
        <button onClick={onLogout}
          className="flex items-center gap-2 text-[11px] text-white/35 hover:text-white/70 transition-colors"
          style={{fontFamily:'Poppins,sans-serif'}}>
          <LogOut size={14}/> Sign Out
        </button>
      </div>

      {/* Mobile nav */}
      <div className="sm:hidden flex gap-1 px-4 pt-3 pb-1 border-b" style={{borderColor:'rgba(255,255,255,0.06)'}}>
        {nav.map(n=>(
          <button key={n.key} onClick={()=>setTab(n.key)}
            className="flex-1 flex flex-col items-center gap-0.5 py-2 rounded-sm transition-all"
            style={{
              background: tab===n.key ? 'rgba(212,175,55,0.1)':'transparent',
              color: tab===n.key ? '#D4AF37':'rgba(255,255,255,0.35)',
            }}>
            {n.icon}
            <span className="text-[8px] tracking-wider uppercase" style={{fontFamily:'Poppins,sans-serif'}}>{n.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 px-4 sm:px-8 py-8 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:0.25}}>
            {tab === 'dashboard' && (
              <>
                <div className="mb-8">
                  <p className="text-[9px] tracking-[0.4em] uppercase mb-1" style={{color:'#D4AF37',fontFamily:'Poppins,sans-serif'}}>Admin Panel</p>
                  <h1 className="text-3xl font-bold text-white" style={{fontFamily:'Playfair Display,serif'}}>Dashboard</h1>
                </div>
                <AnalyticsCards/>
                <div className="admin-card p-6">
                  <h3 className="font-bold text-white mb-4" style={{fontFamily:'Playfair Display,serif'}}>Quick Actions</h3>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={()=>setTab('menu')} className="btn-gold py-2.5 px-5 flex items-center gap-2 text-[11px]">
                      <Plus size={13}/> Add New Dish
                    </button>
                    <a href="/menu" target="_blank" className="btn-outline-gold py-2.5 px-5 text-[11px] flex items-center gap-2">
                      <Eye size={13}/> View Live Menu
                    </a>
                  </div>
                </div>
              </>
            )}
            {tab === 'menu' && <MenuManager showToast={showToast}/>}
            {tab === 'settings' && <SettingsPanel showToast={showToast}/>}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast msg={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   PAGE ENTRY
═══════════════════════════════════════════════════════════ */
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(()=>{
    setAuthed(sessionStorage.getItem('tms_admin') === '1');
    setChecked(true);
  },[]);

  if (!checked) return null; // avoid hydration flash

  const logout = () => { sessionStorage.removeItem('tms_admin'); setAuthed(false); };

  return authed
    ? <Dashboard onLogout={logout}/>
    : <LoginScreen onLogin={()=>setAuthed(true)}/>;
}

