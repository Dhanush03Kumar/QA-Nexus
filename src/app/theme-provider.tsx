import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextProps {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  isDarkMode: boolean
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const getStoredTheme = (): Theme => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme')
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored as Theme
      }
    }
    return 'system' // default to system preference
  }

  const [theme, setTheme] = useState<Theme>(getStoredTheme())

  // Determine if we should use dark mode
  const isDarkMode =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)

  useEffect(() => {
    const root = window.document.documentElement

    // Remove all theme classes first
    root.classList.remove('light', 'dark')

    // Apply the appropriate theme class
    if (isDarkMode) {
      root.classList.add('dark')
    } else {
      root.classList.add('light')
    }

    // Store preference in localStorage (but not 'system' value)
    if (theme !== 'system') {
      localStorage.setItem('theme', theme)
    }
  }, [theme, isDarkMode])

  const toggleTheme = () => {
    setTheme(prev => {
      const next =
        prev === 'light' ? 'dark' : prev === 'dark' ? 'light' : 'light'
      localStorage.setItem('theme', next)
      return next
    })
  }

  // Helper function to set theme directly
  const setThemeDirect = (newTheme: Theme) => {
    setTheme(newTheme)
    if (newTheme !== 'system') {
      localStorage.setItem('theme', newTheme)
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme: setThemeDirect,
        isDarkMode
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}