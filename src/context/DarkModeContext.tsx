'use client';

import { createContext, useState, useMemo, useEffect } from 'react';

const updateDarkMode = (darkMode: boolean) => {
  localStorage.theme = darkMode ? 'dark' : 'light';
  if (darkMode) {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    return;
  }
  document.documentElement.classList.add('light');
  document.documentElement.classList.remove('dark');
};

export const DarkModeContext = createContext<{
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}>({ isDarkMode: true, toggleDarkMode: () => null });

export function DarkModeContextProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    updateDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const isDark =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    updateDarkMode(isDark);
  }, []);

  const contextValue = useMemo(() => ({ isDarkMode, toggleDarkMode }), [isDarkMode, toggleDarkMode]);

  return <DarkModeContext.Provider value={contextValue}>{children}</DarkModeContext.Provider>;
}
