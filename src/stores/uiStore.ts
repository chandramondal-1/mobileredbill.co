import { create } from 'zustand'

interface UIState {
  menuOpen: boolean
  cursorVariant: 'default' | 'pointer'
  transitioning: boolean
  currentPage: string
  setMenuOpen: (open: boolean) => void
  setCursorVariant: (variant: 'default' | 'pointer') => void
  setTransitioning: (transitioning: boolean) => void
  setCurrentPage: (page: string) => void
  toggleMenu: () => void
}

export const useUIStore = create<UIState>((set) => ({
  menuOpen: false,
  cursorVariant: 'default',
  transitioning: false,
  currentPage: '/',
  setMenuOpen: (open) => set({ menuOpen: open }),
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
  setTransitioning: (transitioning) => set({ transitioning }),
  setCurrentPage: (page) => set({ currentPage: page }),
  toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),
}))
