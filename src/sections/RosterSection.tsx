import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const athletes = [
  { name: 'MARCUS CHEN', sport: 'Skateboarding', image: '/assets/athlete-skate.jpg' },
  { name: 'VIKTOR KOWALSKI', sport: 'Esports', image: '/assets/athlete-esports-1.jpg' },
  { name: 'ELENA RODRIGUEZ', sport: 'Motocross', image: '/assets/athlete-motocross.jpg' },
  { name: 'JAMES WRIGHT', sport: 'BMX', image: '/assets/athlete-bmx.jpg' },
  { name: 'KAI TANAKA', sport: 'Surfing', image: '/assets/athlete-surf.jpg' },
  { name: 'SOPHIE ANDERSON', sport: 'Snowboarding', image: '/assets/athlete-snow.jpg' },
  { name: 'LUNA PARK', sport: 'Esports', image: '/assets/athlete-esports-2.jpg' },
  { name: 'RAFAEL SILVA', sport: 'Parkour', image: '/assets/athlete-parkour.jpg' },
  { name: 'MAYA JOHNSON', sport: 'MTB', image: '/assets/athlete-mtb.jpg' },
  { name: 'ALEX REYES', sport: 'Climbing', image: '/assets/athlete-climb.jpg' },
  { name: 'MARCUS CHEN', sport: 'Skateboarding', image: '/assets/athlete-skate.jpg' },
  { name: 'VIKTOR KOWALSKI', sport: 'Esports', image: '/assets/athlete-esports-1.jpg' },
  { name: 'ELENA RODRIGUEZ', sport: 'Motocross', image: '/assets/athlete-motocross.jpg' },
  { name: 'JAMES WRIGHT', sport: 'BMX', image: '/assets/athlete-bmx.jpg' },
  { name: 'KAI TANAKA', sport: 'Surfing', image: '/assets/athlete-surf.jpg' },
  { name: 'SOPHIE ANDERSON', sport: 'Snowboarding', image: '/assets/athlete-snow.jpg' },
  { name: 'LUNA PARK', sport: 'Esports', image: '/assets/athlete-esports-2.jpg' },
  { name: 'RAFAEL SILVA', sport: 'Parkour', image: '/assets/athlete-parkour.jpg' },
  { name: 'MAYA JOHNSON', sport: 'MTB', image: '/assets/athlete-mtb.jpg' },
  { name: 'ALEX REYES', sport: 'Climbing', image: '/assets/athlete-climb.jpg' },
  { name: 'MARCUS CHEN', sport: 'Skateboarding', image: '/assets/athlete-skate.jpg' },
  { name: 'VIKTOR KOWALSKI', sport: 'Esports', image: '/assets/athlete-esports-1.jpg' },
  { name: 'ELENA RODRIGUEZ', sport: 'Motocross', image: '/assets/athlete-motocross.jpg' },
  { name: 'ALEX REYES', sport: 'Climbing', image: '/assets/athlete-climb.jpg' },
]

export default function RosterSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    const section = sectionRef.current
    if (!grid || !section) return

    const items = grid.querySelectorAll<HTMLElement>('.roster-item')
    const w = window.innerWidth
    const h = window.innerHeight
    const gridCols = Math.min(6, Math.max(3, Math.floor(w / 200)))
    const gridRows = Math.ceil(items.length / gridCols)
    const dx = w / gridCols
    const dy = h / gridRows

    // Compute grid positions manually
    const getGridPos = (index: number) => {
      const col = index % gridCols
      const row = Math.floor(index / gridCols)
      const centerCol = (gridCols - 1) / 2
      const centerRow = (gridRows - 1) / 2
      return {
        x: (col - centerCol) * dx + w / 2 - dx / 2,
        y: (row - centerRow) * dy + h / 2 - dy / 2,
      }
    }

    const randomAngle = gsap.utils.random(-45, 45, true)
    const randomZ = gsap.utils.random(-2000, 2000, true)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 0.5,
        end: '+=2000',
      },
    })

    tl.fromTo(
      items,
      {
        x: () => w / 2 - dx / 2,
        y: () => h / 2 - dy / 2,
        scale: 0.5,
        rotationX: () => randomAngle(),
        rotationY: () => randomAngle(),
        z: () => randomZ(),
        opacity: 0,
      },
      {
        x: (i: number) => getGridPos(i).x,
        y: (i: number) => getGridPos(i).y,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        z: 0,
        opacity: 1,
        ease: 'power4.inOut',
      },
      0
    )

    // Headline reveal
    if (headlineRef.current) {
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
        0.7
      )
    }

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  const itemWidth = Math.min(180, Math.floor(typeof window !== 'undefined' ? window.innerWidth / 6 - 8 : 180))
  const itemHeight = Math.min(240, Math.floor(typeof window !== 'undefined' ? window.innerHeight / 4 - 8 : 240))

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#050507]"
      style={{ perspective: '1200px' }}
    >
      {/* Grid */}
      <div
        ref={gridRef}
        className="absolute inset-0 preserve-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {athletes.map((athlete, i) => (
          <div
            key={i}
            className="roster-item absolute preserve-3d overflow-hidden"
            style={{
              width: `${itemWidth}px`,
              height: `${itemHeight}px`,
              transformStyle: 'preserve-3d',
            }}
          >
            <img
              src={athlete.image}
              alt={athlete.name}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
              <p className="font-secondary text-[10px] tracking-widest text-white">
                {athlete.name}
              </p>
              <p className="font-body text-[8px] text-[#8A8F98]">{athlete.sport}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Headline Overlay */}
      <div
        ref={headlineRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-0"
      >
        <div className="text-center">
          <h2
            className="font-display text-[12vw] sm:text-[10vw] lg:text-[8vw] text-white leading-none"
            style={{
              textShadow:
                '0 0 60px rgba(227,25,55,0.4), 0 4px 20px rgba(0,0,0,0.9)',
            }}
          >
            THE CATALYST
          </h2>
          <div className="w-32 h-1 bg-[#E31937] mx-auto mt-6" />
          <p className="font-body text-sm text-[#8A8F98] mt-4 tracking-wider">
            24 ATHLETES. 9 DISCIPLINES. ONE FUEL.
          </p>
        </div>
      </div>
    </section>
  )
}
