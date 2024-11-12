'use client';

import React, {createContext, ReactNode, useContext, useState} from 'react';

export enum Theme {
  Light = 'light',
  Dark = 'dark'
}

interface IThemeContext {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext>({
  theme: Theme.Light,
  toggleTheme: () => {}
});

export const ThemeProvider = ({ children }: {children: ReactNode}) => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = typeof window !== 'undefined' ? localStorage?.getItem('theme') : null;
    return storedTheme ? (storedTheme as Theme) : Theme.Light;
  });

  const toggleTheme = () => {
    const newTheme = theme === Theme.Light ? Theme.Dark : Theme.Light;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext<IThemeContext>(ThemeContext);
