import { create } from 'zustand'

interface FlipState {
  activeFlavorId: string | null
  isAnimating: boolean
  setActiveFlavorId: (id: string | null) => void
  setIsAnimating: (animating: boolean) => void
  reset: () => void
}

export const useFlipStore = create<FlipState>((set) => ({
  activeFlavorId: null,
  isAnimating: false,
  setActiveFlavorId: (id) => set({ activeFlavorId: id }),
  setIsAnimating: (animating) => set({ isAnimating: animating }),
  reset: () => set({ activeFlavorId: null, isAnimating: false }),
}))
