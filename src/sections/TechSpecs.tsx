import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown, Beaker, Shield, Zap, Award } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  '200MG CAFFEINE',
  'ZERO SUGAR CRASH',
  'B-VITAMIN COMPLEX',
  'TAURINE + GINSENG',
  'ELECTROLYTE BLEND',
  'FAST ABSORPTION',
  'NO ARTIFICIAL COLORS',
  'GMP CERTIFIED',
]

const ingredients = [
  {
    title: 'Caffeine Anhydrous',
    value: '200mg',
    desc: 'Pure, pharmaceutical-grade caffeine for rapid energy release.',
  },
  {
    title: 'Taurine',
    value: '1000mg',
    desc: 'Supports cardiovascular function and muscle performance.',
  },
  {
    title: 'B-Vitamin Complex',
    value: '100% DV',
    desc: 'B3, B5, B6, and B12 for sustained metabolic energy.',
  },
  {
    title: 'Ginseng Extract',
    value: '50mg',
    desc: 'Adaptogenic herb for mental clarity and reduced fatigue.',
  },
]

const certifications = [
  { icon: Shield, label: 'FDA REGISTERED' },
  { icon: Award, label: 'ESPORTS CERTIFIED' },
  { icon: Beaker, label: 'LAB TESTED' },
  { icon: Zap, label: 'INFORMED SPORT' },
]

export default function TechSpecs() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const [openAccordion, setOpenAccordion] = useState<number | null>(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const items = section.querySelectorAll('.spec-reveal')
    gsap.fromTo(
      items,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#050507] border-t border-white/5"
    >
      <div className="w-full px-6 lg:px-12 py-24 lg:py-32">
        <div className="mb-16 spec-reveal">
          <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl text-white">
            TECHNICAL SPECS
          </h2>
          <p className="font-body text-[#8A8F98] mt-4 max-w-lg">
            Every ingredient is precision-dosed for maximum performance.
            No fillers. No compromises.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left: Scrolling Marquee */}
          <div className="spec-reveal relative overflow-hidden h-[500px] lg:h-[600px] bg-[#10101A] border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-b from-[#050507] via-transparent to-[#050507] z-10 pointer-events-none" />
            <div ref={marqueeRef} className="marquee-vertical py-8">
              {[...stats, ...stats, ...stats, ...stats].map((stat, i) => (
                <div
                  key={i}
                  className="py-6 px-8 border-b border-white/5"
                >
                  <p className="font-display text-3xl sm:text-4xl text-white/5 hover:text-white/20 transition-colors duration-300 select-none">
                    {stat}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Accordion */}
          <div className="spec-reveal space-y-4">
            {/* Certifications */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-[#10101A] border border-white/5 px-4 py-3"
                >
                  <cert.icon size={16} className="text-[#E31937]" />
                  <span className="font-secondary text-xs tracking-wider text-[#8A8F98]">
                    {cert.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Ingredient Accordion */}
            {ingredients.map((ing, i) => (
              <div
                key={i}
                className="border border-white/5 bg-[#10101A] overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === i ? null : i)
                  }
                  className="w-full flex items-center justify-between px-6 py-5 hover:bg-white/[0.02] transition-colors duration-300"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-secondary text-sm tracking-wider text-[#E31937]">
                      {ing.value}
                    </span>
                    <span className="font-body text-sm text-white">
                      {ing.title}
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-[#8A8F98] transition-transform duration-300 ${
                      openAccordion === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openAccordion === i ? 'max-h-32' : 'max-h-0'
                  }`}
                >
                  <p className="px-6 pb-5 font-body text-sm text-[#8A8F98] leading-relaxed">
                    {ing.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* Nutrition Facts Mini */}
            <div className="mt-8 border border-white/5 bg-[#10101A] p-6">
              <h4 className="font-secondary text-sm tracking-widest text-white mb-4 border-b border-white/10 pb-3">
                NUTRITION FACTS
              </h4>
              <div className="space-y-2">
                {[
                  { label: 'Serving Size', value: '1 can (250ml)' },
                  { label: 'Calories', value: '110' },
                  { label: 'Total Carbohydrates', value: '27g' },
                  { label: 'Sugars', value: '27g' },
                  { label: 'Vitamin B6', value: '250% DV' },
                  { label: 'Vitamin B12', value: '200% DV' },
                  { label: 'Niacin (B3)', value: '120% DV' },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex justify-between font-body text-xs py-1 border-b border-white/5 last:border-0"
                  >
                    <span className="text-[#8A8F98]">{row.label}</span>
                    <span className="text-white">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
