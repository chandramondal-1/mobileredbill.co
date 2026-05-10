import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Trophy, TrendingUp, Award, Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const athletes = [
  {
    name: 'MARCUS CHEN',
    sport: 'Skateboarding',
    image: '/assets/athlete-skate.jpg',
    location: 'Los Angeles, CA',
    achievements: ['X Games Gold 2025', 'Street League Champion'],
    stats: { competitions: 42, wins: 28, rank: 3 },
    bio: 'Marcus Chen burst onto the skateboarding scene at age 16 and has been pushing the boundaries of street skateboarding ever since. Known for his technical precision and creative lines.',
  },
  {
    name: 'ELENA RODRIGUEZ',
    sport: 'Motocross',
    image: '/assets/athlete-motocross.jpg',
    location: 'Barcelona, Spain',
    achievements: ['World MX Champion 2024', 'Red Bull Straight Rhythm Winner'],
    stats: { competitions: 38, wins: 22, rank: 1 },
    bio: 'Elena Rodriguez is a force of nature on the track. The first woman to win a major motocross championship, she continues to inspire the next generation of riders.',
  },
  {
    name: 'KAI TANAKA',
    sport: 'Surfing',
    image: '/assets/athlete-surf.jpg',
    location: 'Pipeline, HI',
    achievements: ['WSL Championship Tour Winner', 'Pipe Masters 2025'],
    stats: { competitions: 35, wins: 19, rank: 2 },
    bio: 'Kai Tanaka dominates the most challenging waves on the planet. His fearless approach to big-wave surfing has earned him a reputation as one of the sport\'s most exciting athletes.',
  },
  {
    name: 'SOPHIE ANDERSON',
    sport: 'Snowboarding',
    image: '/assets/athlete-snow.jpg',
    location: 'Aspen, CO',
    achievements: ['Olympic Gold Medalist', 'US Open Champion'],
    stats: { competitions: 45, wins: 31, rank: 1 },
    bio: 'Sophie Anderson combines grace and power in ways that redefine snowboarding. Her signature backside 1080 is considered one of the most difficult tricks in women\'s snowboarding.',
  },
  {
    name: 'JAMES WRIGHT',
    sport: 'BMX',
    image: '/assets/athlete-bmx.jpg',
    location: 'Austin, TX',
    achievements: ['Dew Tour Champion', 'Nitro Circus Star'],
    stats: { competitions: 50, wins: 27, rank: 4 },
    bio: 'James Wright brings creativity and technical mastery to every BMX competition. Known for inventing new tricks and pushing the sport into uncharted territory.',
  },
  {
    name: 'LUNA PARK',
    sport: 'Esports',
    image: '/assets/athlete-esports-2.jpg',
    location: 'Seoul, South Korea',
    achievements: ['World Championship MVP', 'All-Pro Team 2025'],
    stats: { competitions: 60, wins: 45, rank: 1 },
    bio: 'Luna Park is one of the most dominant players in professional esports. Her strategic mind and lightning-fast reflexes make her a formidable opponent in any arena.',
  },
]

const disciplines = [
  { name: 'Skateboarding', count: 4, icon: Trophy },
  { name: 'Motocross', count: 3, icon: TrendingUp },
  { name: 'Surfing', count: 2, icon: Award },
  { name: 'Snowboarding', count: 3, icon: Star },
  { name: 'BMX', count: 2, icon: Trophy },
  { name: 'Esports', count: 4, icon: TrendingUp },
]

export default function Athletes() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [selectedAthlete, setSelectedAthlete] = useState<number | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = section.querySelectorAll('.athlete-card')
    gsap.fromTo(
      cards,
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
    <main className="relative min-h-screen pt-24 pb-24" ref={sectionRef}>
      {/* Header */}
      <div className="w-full px-6 lg:px-12 py-16">
        <h1 className="font-display text-6xl sm:text-8xl lg:text-9xl text-white">
          THE CATALYST
        </h1>
        <p className="font-body text-[#8A8F98] mt-4 max-w-xl text-lg">
          These athletes push beyond human limits. Khaos Energy is the fuel
          behind their extraordinary performances.
        </p>
      </div>

      {/* Discipline Stats */}
      <div className="w-full px-6 lg:px-12 mb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {disciplines.map((disc, i) => (
            <div
              key={i}
              className="bg-[#10101A] border border-white/5 p-4 text-center hover:border-white/10 transition-colors duration-300"
            >
              <disc.icon size={20} className="text-[#E31937] mx-auto mb-2" />
              <p className="font-secondary text-sm tracking-wider text-white">
                {disc.name}
              </p>
              <p className="font-body text-xs text-[#8A8F98]">
                {disc.count} athletes
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Athlete Grid */}
      <div className="w-full px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {athletes.map((athlete, i) => (
            <div
              key={i}
              className="athlete-card group relative bg-[#10101A] border border-white/5 overflow-hidden cursor-pointer hover:border-white/10 transition-all duration-500"
              onClick={() =>
                setSelectedAthlete(selectedAthlete === i ? null : i)
              }
              data-cursor="pointer"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={athlete.image}
                  alt={athlete.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10101A] via-transparent to-transparent" />
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/60 px-2 py-1">
                  <MapPin size={10} className="text-[#E31937]" />
                  <span className="font-body text-[10px] text-white">
                    {athlete.location}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-xl text-white">
                    {athlete.name}
                  </h3>
                  <span className="font-body text-xs text-[#E31937]">
                    #{athlete.stats.rank}
                  </span>
                </div>
                <p className="font-secondary text-xs tracking-widest text-[#8A8F98] mb-4">
                  {athlete.sport.toUpperCase()}
                </p>

                {/* Achievements */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {athlete.achievements.map((achievement, j) => (
                    <span
                      key={j}
                      className="px-2 py-1 bg-white/5 font-body text-[10px] tracking-wider text-[#8A8F98]"
                    >
                      {achievement}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 bg-[#050507]">
                    <p className="font-display text-lg text-white">
                      {athlete.stats.competitions}
                    </p>
                    <p className="font-body text-[8px] text-[#8A8F98]">
                      EVENTS
                    </p>
                  </div>
                  <div className="text-center p-2 bg-[#050507]">
                    <p className="font-display text-lg text-[#E31937]">
                      {athlete.stats.wins}
                    </p>
                    <p className="font-body text-[8px] text-[#8A8F98]">WINS</p>
                  </div>
                  <div className="text-center p-2 bg-[#050507]">
                    <p className="font-display text-lg text-white">
                      {athlete.stats.rank}
                    </p>
                    <p className="font-body text-[8px] text-[#8A8F98]">RANK</p>
                  </div>
                </div>

                {/* Expanded Bio */}
                {selectedAthlete === i && (
                  <div className="mt-4 pt-4 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-500">
                    <p className="font-body text-sm text-[#8A8F98] leading-relaxed">
                      {athlete.bio}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Marquee */}
      <div className="w-full mt-24 overflow-hidden border-y border-white/5 py-6">
        <div className="marquee-horizontal flex items-center gap-16 whitespace-nowrap">
          {[...Array(4)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center gap-16">
              <span className="font-display text-4xl text-white/10">
                24 ATHLETES
              </span>
              <span className="w-2 h-2 bg-[#E31937]" />
              <span className="font-display text-4xl text-white/10">
                9 DISCIPLINES
              </span>
              <span className="w-2 h-2 bg-[#4A90E2]" />
              <span className="font-display text-4xl text-white/10">
                100+ CHAMPIONSHIPS
              </span>
              <span className="w-2 h-2 bg-[#E31937]" />
              <span className="font-display text-4xl text-white/10">
                UNLIMITED ENERGY
              </span>
              <span className="w-2 h-2 bg-[#4A90E2]" />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
