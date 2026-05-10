import { create } from 'zustand'

interface CarouselState {
  currentRotation: number
  targetRotation: number
  isDragging: boolean
  activeCanIndex: number | null
  dragStartX: number
  lastDragX: number
  setCurrentRotation: (rotation: number) => void
  setTargetRotation: (rotation: number) => void
  setIsDragging: (dragging: boolean) => void
  setActiveCanIndex: (index: number | null) => void
  setDragStartX: (x: number) => void
  setLastDragX: (x: number) => void
  syncRotation: () => void
}

export const useCarouselStore = create<CarouselState>((set) => ({
  currentRotation: 0,
  targetRotation: 0,
  isDragging: false,
  activeCanIndex: null,
  dragStartX: 0,
  lastDragX: 0,
  setCurrentRotation: (rotation) => set({ currentRotation: rotation }),
  setTargetRotation: (rotation) => set({ targetRotation: rotation }),
  setIsDragging: (dragging) => set({ isDragging: dragging }),
  setActiveCanIndex: (index) => set({ activeCanIndex: index }),
  setDragStartX: (x) => set({ dragStartX: x }),
  setLastDragX: (x) => set({ lastDragX: x }),
  syncRotation: () => set((state) => ({ targetRotation: state.currentRotation })),
}))
