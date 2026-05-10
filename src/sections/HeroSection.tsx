import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FRAME_COUNT = 210
const FRAME_URL = (index: number) => `/hero-sequence/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const airpodsRef = useRef({ frame: 1 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    // Preload images
    const preloadImages = () => {
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image()
        img.src = FRAME_URL(i)
        imagesRef.current[i] = img
      }
    }

    const render = () => {
      const img = imagesRef.current[airpodsRef.current.frame]
      if (img && img.complete) {
        // Clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height)
        
        // Calculate aspect ratio to cover canvas
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height)
        const x = (canvas.width / 2) - (img.width / 2) * scale
        const y = (canvas.height / 2) - (img.height / 2) * scale
        
        context.drawImage(img, x, y, img.width * scale, img.height * scale)
      }
    }

    const handleResize = () => {
      // Set the requested 1000x1500 resolution for the canvas
      canvas.width = 1000
      canvas.height = 1500
      render()
    }

    preloadImages()
    window.addEventListener('resize', handleResize)
    handleResize()

    // Scroll Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%', // Scroll distance
        scrub: 0.5,
        pin: true,
        onUpdate: render,
      },
    })

    tl.to(airpodsRef.current, {
      frame: FRAME_COUNT,
      snap: 'frame',
      ease: 'none',
    })

    // Typography Animations
    gsap.fromTo(
      '.hero-title',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: true,
        },
      }
    )

    // Initial entrance for the first frame
    const firstImg = new Image()
    firstImg.src = FRAME_URL(1)
    firstImg.onload = () => {
      imagesRef.current[1] = firstImg
      render()
      gsap.fromTo(
        canvas,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }
      )
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center"
    >
      <div className="relative w-full h-full sm:w-[400px] sm:h-[600px] sm:aspect-[2/3] flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="relative z-0"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Brand Accents */}
      <div className="absolute top-10 left-10 z-20 pointer-events-none">
        <div className="flex items-center gap-4">
          <div className="w-12 h-[2px] bg-[#E31937]" />
          <span className="font-secondary text-xs tracking-widest text-white/50 uppercase">
            Est. 2024
          </span>
        </div>
      </div>

      <div className="absolute top-10 right-10 z-20 pointer-events-none">
        <span className="font-secondary text-xs tracking-[0.3em] text-[#E31937] uppercase">
          Cinematic Energy
        </span>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <span className="font-body text-[10px] tracking-[0.4em] text-white/40 uppercase">
          Scroll to animate
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#E31937] to-transparent" />
      </div>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-radial-vignette" />
    </section>
  )
}
