'use client';

import { useState, useEffect } from 'react';
import { menuData, MenuItem } from '@/lib/menuData';

export const LS_KEY = 'tms_all_items';

/** Returns base items merged with any admin overrides from localStorage */
export function getStoredItems(): MenuItem[] {
  if (typeof window === 'undefined') return menuData.flatMap(c => c.items);
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw) as MenuItem[];
  } catch {}
  return menuData.flatMap(c => c.items);
}

export function saveItems(items: MenuItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LS_KEY, JSON.stringify(items));
}

/** Hook — reactive; updates when admin saves */
export function useMenuItems(): MenuItem[] {
  const [items, setItems] = useState<MenuItem[]>(() => getStoredItems());

  useEffect(() => {
    const handler = () => setItems(getStoredItems());
    window.addEventListener('tms_menu_updated', handler);
    return () => window.removeEventListener('tms_menu_updated', handler);
  }, []);

  return items;
}

/** Emit after saving so all hooks refresh */
export function dispatchMenuUpdated(): void {
  if (typeof window !== 'undefined')
    window.dispatchEvent(new Event('tms_menu_updated'));
}
