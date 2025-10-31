import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  isDarkMode: boolean
  toggleTheme: () => void
  setTheme: (isDark: boolean) => void
}

const applyTheme = (isDark: boolean) => {
  if (isDark) {
    document.documentElement.classList.add('dark')
    document.body.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
    document.body.classList.remove('dark')
  }
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: true, // Default to dark mode
      toggleTheme: () => set((state) => {
        const newIsDark = !state.isDarkMode
        applyTheme(newIsDark)
        return { isDarkMode: newIsDark }
      }),
      setTheme: (isDark: boolean) => set(() => {
        applyTheme(isDark)
        return { isDarkMode: isDark }
      }),
    }),
    {
      name: 'theme-storage',
    }
  )
)

// Apply theme on page load from stored preference
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('theme-storage')
  if (stored) {
    try {
      const { state } = JSON.parse(stored)
      applyTheme(state?.isDarkMode ?? true) // Default to dark mode if not set
    } catch (e) {
      // Ignore parse errors, default to dark mode
      applyTheme(true)
    }
  } else {
    // No stored preference, apply dark mode by default
    applyTheme(true)
  }
}

