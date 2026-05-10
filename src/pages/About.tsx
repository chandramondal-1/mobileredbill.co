import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Rocket, Globe, Leaf, Target, Zap, Users, Award, TrendingUp } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  {
    year: '2018',
    title: 'THE SPARK',
    desc: 'Khaos Energy was born in a small garage lab with a simple mission: create the most effective energy formula on the planet.',
    icon: Rocket,
  },
  {
    year: '2019',
    title: 'FIRST FORMULA',
    desc: 'After 147 iterations, the Original formula was perfected. A blend that delivered unmatched energy without the crash.',
    icon: Zap,
  },
  {
    year: '2020',
    title: 'GOING GLOBAL',
    desc: 'Khaos launched in 12 countries across Europe and North America. The world was ready for a new kind of energy.',
    icon: Globe,
  },
  {
    year: '2021',
    title: 'ATHLETE PROGRAM',
    desc: 'The Catalyst athlete program launched, supporting 8 elite athletes across skateboarding, motocross, and surfing.',
    icon: Users,
  },
  {
    year: '2022',
    title: 'ESPORTS DIVISION',
    desc: 'Khaos Storm entered the esports arena. Within a year, the team won their first major championship.',
    icon: Award,
  },
  {
    year: '2023',
    title: 'ZERO SUGAR',
    desc: 'Khaos Zero was released — the same explosive energy with zero sugar. A game-changer for health-conscious consumers.',
    icon: Leaf,
  },
  {
    year: '2024',
    title: '50 MILLION CANS',
    desc: 'Khaos crossed 50 million cans sold worldwide. From garage lab to global phenomenon in just 6 years.',
    icon: TrendingUp,
  },
  {
    year: '2025',
    title: 'THE FUTURE',
    desc: 'Launching Khaos Frost — our most intense formula yet. 200mg caffeine with an arctic blast of cool mint.',
    icon: Target,
  },
]

const stats = [
  { value: '50M+', label: 'CANS SOLD' },
  { value: '25+', label: 'COUNTRIES' },
  { value: '24', label: 'ATHLETES' },
  { value: '4', label: 'FORMULAS' },
]

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const items = section.querySelectorAll('.about-reveal')
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

    // Timeline items
    const timelineItems = section.querySelectorAll('.timeline-item')
    gsap.fromTo(
      timelineItems,
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section.querySelector('.timeline-container'),
          start: 'top 70%',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <main className="relative min-h-screen pt-24 pb-24" ref={sectionRef}>
      {/* Header */}
      <div className="w-full px-6 lg:px-12 py-16">
        <h1 className="font-display text-6xl sm:text-8xl lg:text-9xl text-white">
          OUR STORY
        </h1>
        <p className="font-body text-[#8A8F98] mt-4 max-w-xl text-lg">
          From a garage lab to a global energy phenomenon. This is how Khaos
          changed the game.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="w-full px-6 lg:px-12 mb-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="about-reveal bg-[#10101A] border border-white/5 p-8 text-center"
            >
              <p className="font-display text-4xl lg:text-5xl text-[#E31937]">
                {stat.value}
              </p>
              <p className="font-secondary text-xs tracking-widest text-[#8A8F98] mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Story */}
      <div className="w-full px-6 lg:px-12 mb-24">
        <div className="about-reveal grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-6">
              BORN FROM OBSESSION
            </h2>
            <p className="font-body text-[#8A8F98] leading-relaxed mb-4">
              In 2018, a group of bioengineers and extreme sports enthusiasts came
              together with a singular obsession: create an energy drink that
              actually worked. Not just caffeine and sugar — a precision-engineered
              fuel system for the human body.
            </p>
            <p className="font-body text-[#8A8F98] leading-relaxed mb-4">
              147 formula iterations later, Khaos Original was born. The perfect
              balance of caffeine, taurine, B-vitamins, and ginseng extract —
              designed for rapid absorption and sustained release.
            </p>
            <p className="font-body text-[#8A8F98] leading-relaxed">
              Today, Khaos Energy powers athletes, gamers, creators, and everyday
              warriors across 25+ countries. But the mission remains the same:
              Unleash the storm within.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-[#001B44] to-[#10101A] border border-white/5 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 relative">
                  <svg viewBox="0 0 40 40" className="w-full h-full">
                    <polygon
                      points="20,2 38,38 2,38"
                      fill="none"
                      stroke="#E31937"
                      strokeWidth="1.5"
                    />
                    <text
                      x="20"
                      y="30"
                      textAnchor="middle"
                      fill="#E31937"
                      fontSize="14"
                      fontFamily="Anton, sans-serif"
                    >
                      K
                    </text>
                  </svg>
                </div>
                <p className="font-display text-2xl text-white">KHAOS</p>
                <p className="font-secondary text-xs tracking-[0.5em] text-[#8A8F98] mt-2">
                  EST. 2018
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="w-full px-6 lg:px-12">
        <h2 className="about-reveal font-display text-4xl lg:text-5xl text-white mb-12">
          THE JOURNEY
        </h2>
        <div className="timeline-container relative">
          {/* Timeline line */}
          <div className="absolute left-4 lg:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#E31937] via-[#4A90E2] to-[#E31937]" />

          <div className="space-y-12">
            {timeline.map((item, i) => (
              <div
                key={i}
                className="timeline-item relative pl-16 lg:pl-24"
              >
                {/* Dot */}
                <div className="absolute left-2 lg:left-6 top-2 w-4 h-4 bg-[#E31937] border-4 border-[#050507]" />

                {/* Content */}
                <div className="bg-[#10101A] border border-white/5 p-6 lg:p-8 hover:border-white/10 transition-colors duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-[#E31937]/10 flex items-center justify-center">
                      <item.icon size={18} className="text-[#E31937]" />
                    </div>
                    <div>
                      <span className="font-secondary text-sm tracking-widest text-[#E31937]">
                        {item.year}
                      </span>
                      <h3 className="font-display text-xl text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <p className="font-body text-sm text-[#8A8F98] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sustainability */}
      <div className="w-full px-6 lg:px-12 mt-24">
        <div className="about-reveal bg-[#10101A] border border-white/5 p-8 lg:p-12">
          <div className="flex items-center gap-3 mb-6">
            <Leaf size={24} className="text-green-500" />
            <h2 className="font-display text-3xl text-white">
              SUSTAINABILITY COMMITMENT
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-secondary text-sm tracking-widest text-white mb-3">
                100% RECYCLABLE
              </h3>
              <p className="font-body text-sm text-[#8A8F98] leading-relaxed">
                All Khaos cans are made from 100% recyclable aluminum. We are
                committed to reducing our environmental footprint with every can.
              </p>
            </div>
            <div>
              <h3 className="font-secondary text-sm tracking-widest text-white mb-3">
                CARBON NEUTRAL BY 2027
              </h3>
              <p className="font-body text-sm text-[#8A8F98] leading-relaxed">
                We have pledged to achieve carbon neutrality across our entire
                supply chain by 2027 through renewable energy and offset programs.
              </p>
            </div>
            <div>
              <h3 className="font-secondary text-sm tracking-widest text-white mb-3">
                RESPONSIBLE SOURCING
              </h3>
              <p className="font-body text-sm text-[#8A8F98] leading-relaxed">
                All ingredients are sourced from certified suppliers who meet our
                strict ethical and environmental standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
