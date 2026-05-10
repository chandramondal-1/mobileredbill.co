import { useRef, useCallback } from 'react'
import { useFlipStore } from '@/stores'
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { ShoppingCart, Zap, Droplets, Flame } from 'lucide-react'

gsap.registerPlugin(Flip)

const flavors = [
  {
    id: 'original',
    name: 'ORIGINAL',
    tagline: 'The Classic Storm',
    image: '/assets/can-original.png',
    color: '#4A90E2',
    stats: { caffeine: '160mg', sugar: '27g', calories: '110' },
    desc: 'The original formula that started it all. Bold energy with a crisp, refreshing taste.',
  },
  {
    id: 'zero',
    name: 'ZERO',
    tagline: 'No Sugar. All Fury.',
    image: '/assets/can-zero.png',
    color: '#E31937',
    stats: { caffeine: '160mg', sugar: '0g', calories: '10' },
    desc: 'Maximum energy with zero sugar. Same kick, no crash.',
  },
  {
    id: 'summer',
    name: 'SUMMER',
    tagline: 'Tropical Voltage',
    image: '/assets/can-summer.png',
    color: '#FF6B35',
    stats: { caffeine: '160mg', sugar: '25g', calories: '105' },
    desc: 'A tropical explosion of mango and passionfruit. Limited edition summer vibes.',
  },
  {
    id: 'frost',
    name: 'FROST',
    tagline: 'Ice-Cold Intensity',
    image: '/assets/can-frost.png',
    color: '#00D4FF',
    stats: { caffeine: '200mg', sugar: '20g', calories: '95' },
    desc: 'Our most intense formula. 200mg caffeine with an arctic blast of cool mint.',
  },
]

export default function FlavorMatrix() {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])
  const activeFlavorId = useFlipStore((s) => s.activeFlavorId)
  const isAnimating = useFlipStore((s) => s.isAnimating)
  const setActiveFlavorId = useFlipStore((s) => s.setActiveFlavorId)
  const setIsAnimating = useFlipStore((s) => s.setIsAnimating)

  const toggleItem = useCallback(
    (item: HTMLDivElement, flavorId: string) => {
      if (isAnimating) return
      if (activeFlavorId === flavorId) {
        collapseCurrent()
        return
      }

      setIsAnimating(true)

      const allItems = itemsRef.current.filter(Boolean)
      const state = Flip.getState(allItems)

      if (activeFlavorId) {
        collapseCurrent()
      }

      setActiveFlavorId(flavorId)

      const container = containerRef.current
      if (container) {
        container.classList.add('flavor-active')
      }

      item.classList.add('expanded')

      allItems.forEach((el) => {
        if (el !== item) {
          el.classList.add('collapsed')
        }
      })

      Flip.from(state, {
        duration: 0.6,
        ease: 'power3.inOut',
        absolute: true,
        onComplete: () => setIsAnimating(false),
      })
    },
    [activeFlavorId, isAnimating, setActiveFlavorId, setIsAnimating]
  )

  const collapseCurrent = useCallback(() => {
    const activeId = useFlipStore.getState().activeFlavorId
    if (!activeId) return

    const allItems = itemsRef.current.filter(Boolean)
    const state = Flip.getState(allItems)

    const activeItem = itemsRef.current.find(
      (_, i) => flavors[i]?.id === activeId
    )
    if (activeItem) {
      activeItem.classList.remove('expanded')
    }

    const container = containerRef.current
    if (container) {
      container.classList.remove('flavor-active')
    }

    allItems.forEach((el) => el.classList.remove('collapsed'))

    setActiveFlavorId(null)

    Flip.from(state, {
      duration: 0.6,
      ease: 'power3.inOut',
      absolute: true,
    })
  }, [setActiveFlavorId])

  return (
    <section className="relative w-full min-h-screen bg-[#050507] py-24">
      <div className="w-full px-6 lg:px-12 mb-12">
        <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl text-white">
          FLAVOR MATRIX
        </h2>
        <p className="font-body text-[#8A8F98] mt-4 max-w-lg">
          Four distinct formulas, each engineered for a different kind of intensity.
          Click to explore.
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full px-6 lg:px-12"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: '1px',
          minHeight: '70vh',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {flavors.map((flavor, i) => (
          <div
            key={flavor.id}
            ref={(el) => {
              if (el) itemsRef.current[i] = el
            }}
            className={`relative overflow-hidden cursor-pointer bg-[#10101A] transition-all duration-300 ${
              activeFlavorId && activeFlavorId !== flavor.id
                ? 'opacity-40'
                : activeFlavorId === flavor.id
                ? 'opacity-100'
                : 'hover:opacity-90'
            }`}
            style={{
              minHeight: '300px',
            }}
            onClick={(e) => toggleItem(e.currentTarget, flavor.id)}
            data-cursor="pointer"
          >
            {/* Background glow */}
            <div
              className="absolute inset-0 opacity-10 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at center, ${flavor.color} 0%, transparent 70%)`,
              }}
            />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
              <img
                src={flavor.image}
                alt={flavor.name}
                className="w-32 sm:w-40 lg:w-48 h-auto object-contain transition-transform duration-500 hover:scale-110"
                draggable={false}
              />
              <div className="text-center mt-6">
                <h3 className="font-display text-3xl sm:text-4xl text-white">
                  {flavor.name}
                </h3>
                <p
                  className="font-secondary text-sm tracking-widest mt-2"
                  style={{ color: flavor.color }}
                >
                  {flavor.tagline}
                </p>
              </div>

              {/* Expanded detail view */}
              {activeFlavorId === flavor.id && (
                <div className="mt-8 max-w-md text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <p className="font-body text-sm text-[#8A8F98] leading-relaxed mb-6">
                    {flavor.desc}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-center gap-8 mb-8">
                    <div className="flex flex-col items-center gap-1">
                      <Zap size={16} style={{ color: flavor.color }} />
                      <span className="font-secondary text-lg text-white">
                        {flavor.stats.caffeine}
                      </span>
                      <span className="font-body text-[10px] text-[#8A8F98]">
                        CAFFEINE
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Droplets size={16} style={{ color: flavor.color }} />
                      <span className="font-secondary text-lg text-white">
                        {flavor.stats.sugar}
                      </span>
                      <span className="font-body text-[10px] text-[#8A8F98]">
                        SUGAR
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Flame size={16} style={{ color: flavor.color }} />
                      <span className="font-secondary text-lg text-white">
                        {flavor.stats.calories}
                      </span>
                      <span className="font-body text-[10px] text-[#8A8F98]">
                        CALORIES
                      </span>
                    </div>
                  </div>

                  <button
                    className="inline-flex items-center gap-2 px-8 py-3 font-secondary text-sm tracking-widest text-white transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: flavor.color }}
                  >
                    <ShoppingCart size={14} />
                    BUY NOW
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
