import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { KEYS, loadJSON, saveJSON } from '../storage/storage';

const AppContext = createContext(null);

const palettes = {
  light: { background: '#F5F6FA', card: '#FFFFFF', text: '#1B1B1F', muted: '#6B7280', accent: '#E8501F' },
  dark: { background: '#121214', card: '#1E1E22', text: '#F2F2F5', muted: '#9CA3AF', accent: '#FF7A4D' },
};

export function AppProvider({ children }) {
  const [savedServices, setSavedServices] = useState([]);
  const [theme, setTheme] = useState('light');
  const [hydrated, setHydrated] = useState(false);

  // Restore both values once, before the UI is shown
  useEffect(() => {
    let active = true;
    (async () => {
      const [saved, storedTheme] = await Promise.all([
        loadJSON(KEYS.savedServices, []),
        loadJSON(KEYS.theme, 'light'),
      ]);
      if (!active) return;
      setSavedServices(Array.isArray(saved) ? saved : []);
      setTheme(storedTheme === 'dark' ? 'dark' : 'light');
      setHydrated(true);
    })();
    return () => { active = false; };
  }, []);

  // Persist changes (only after restore, so we never overwrite with empty defaults)
  useEffect(() => { if (hydrated) saveJSON(KEYS.savedServices, savedServices); }, [savedServices, hydrated]);
  useEffect(() => { if (hydrated) saveJSON(KEYS.theme, theme); }, [theme, hydrated]);

  const addSavedService = useCallback((service) => {
    setSavedServices((prev) => (prev.some((s) => s.id === service.id) ? prev : [...prev, service]));
  }, []);

  const removeSavedService = useCallback((id) => {
    setSavedServices((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const toggleTheme = useCallback(() => setTheme((t) => (t === 'light' ? 'dark' : 'light')), []);

  const value = useMemo(
    () => ({
      savedServices, addSavedService, removeSavedService,
      theme, toggleTheme, colors: palettes[theme], hydrated,
    }),
    [savedServices, addSavedService, removeSavedService, theme, toggleTheme, hydrated]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}
