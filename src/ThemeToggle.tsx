import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    className={`p-2 rounded-full ${isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'} 
    absolute top-1 right-2 hover:opacity-80 transition-opacity`}
    aria-label="Toggle theme"
  >
    {isDark ? <Sun size={16} /> : <Moon size={16} />}
  </button>
);