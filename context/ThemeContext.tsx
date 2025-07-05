import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Theme {
  // Background colors
  background: string;
  surface: string;
  card: string;
  
  // Text colors
  text: string;
  textSecondary: string;
  textMuted: string;
  
  // Primary colors
  primary: string;
  primaryDark: string;
  primaryLight: string;
  
  // Accent colors
  accent: string;
  success: string;
  warning: string;
  error: string;
  
  // Border and divider colors
  border: string;
  divider: string;
  
  // Chess-specific colors
  chessLight: string;
  chessDark: string;
  chessHighlight: string;
  chessSelected: string;
  
  // Status bar
  statusBarStyle: 'light-content' | 'dark-content';
}

export const lightTheme: Theme = {
  // Background colors
  background: '#ffffff',
  surface: '#f8f9fa',
  card: '#ffffff',
  
  // Text colors
  text: '#1a1a1a',
  textSecondary: '#666666',
  textMuted: '#999999',
  
  // Primary colors
  primary: '#8bc34a',
  primaryDark: '#689f38',
  primaryLight: '#aed581',
  
  // Accent colors
  accent: '#2196f3',
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  
  // Border and divider colors
  border: '#e0e0e0',
  divider: '#f0f0f0',
  
  // Chess-specific colors
  chessLight: '#f0d9b5',
  chessDark: '#b58863',
  chessHighlight: '#ffff00',
  chessSelected: '#ff6b6b',
  
  // Status bar
  statusBarStyle: 'dark-content',
};

export const darkTheme: Theme = {
  // Background colors
  background: '#121212',
  surface: '#1e1e1e',
  card: '#2d2d2d',
  
  // Text colors
  text: '#ffffff',
  textSecondary: '#cccccc',
  textMuted: '#888888',
  
  // Primary colors
  primary: '#8bc34a',
  primaryDark: '#689f38',
  primaryLight: '#aed581',
  
  // Accent colors
  accent: '#64b5f6',
  success: '#66bb6a',
  warning: '#ffb74d',
  error: '#ef5350',
  
  // Border and divider colors
  border: '#404040',
  divider: '#333333',
  
  // Chess-specific colors
  chessLight: '#f0d9b5',
  chessDark: '#b58863',
  chessHighlight: '#ffff00',
  chessSelected: '#ff6b6b',
  
  // Status bar
  statusBarStyle: 'light-content',
};

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme !== null) {
        setIsDark(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const saveTheme = async (isDarkTheme: boolean) => {
    try {
      await AsyncStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    saveTheme(newIsDark);
  };

  const setTheme = (isDarkTheme: boolean) => {
    setIsDark(isDarkTheme);
    saveTheme(isDarkTheme);
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
