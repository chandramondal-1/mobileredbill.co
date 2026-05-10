import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Trophy,
  Users,
  Calendar,
  Twitch,
  Youtube,
  Swords,
  Clock,
  TrendingUp,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const matches = [
  {
    id: 1,
    teamA: 'KHAOS STORM',
    teamB: 'VIPER SQUAD',
    game: 'VALORANT',
    date: '2026-05-15',
    time: '20:00 EST',
    status: 'UPCOMING',
  },
  {
    id: 2,
    teamA: 'KHAOS FURY',
    teamB: 'PHOENIX RISING',
    game: 'LEAGUE OF LEGENDS',
    date: '2026-05-18',
    time: '19:00 EST',
    status: 'UPCOMING',
  },
  {
    id: 3,
    teamA: 'KHAOS STORM',
    teamB: 'THUNDER WOLVES',
    game: 'CS2',
    date: '2026-05-12',
    time: '21:00 EST',
    status: 'LIVE',
  },
]

const leaderboard = [
  { rank: 1, team: 'KHAOS STORM', points: 2840, wins: 42, losses: 8 },
  { rank: 2, team: 'VIPER SQUAD', points: 2720, wins: 38, losses: 12 },
  { rank: 3, team: 'PHOENIX RISING', points: 2650, wins: 36, losses: 14 },
  { rank: 4, team: 'THUNDER WOLVES', points: 2580, wins: 34, losses: 16 },
  { rank: 5, team: 'SHADOW LEGION', points: 2490, wins: 31, losses: 19 },
]

const players = [
  { name: 'VIKTOR', handle: '@viktork', role: 'IGL', kda: '1.45', game: 'Valorant' },
  { name: 'LUNA', handle: '@lunapark', role: 'Duelist', kda: '1.82', game: 'Valorant' },
  { name: 'PHANTOM', handle: '@phantomx', role: 'AWPer', kda: '1.38', game: 'CS2' },
  { name: 'NEXUS', handle: '@nexuss', role: 'Mid', kda: '4.2', game: 'LoL' },
]

export default function Esports() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [countdown, setCountdown] = useState({ h: 0, m: 0, s: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const target = new Date('2026-05-15T20:00:00')
      const diff = target.getTime() - now.getTime()
      if (diff > 0) {
        setCountdown({
          h: Math.floor(diff / 3600000),
          m: Math.floor((diff % 3600000) / 60000),
          s: Math.floor((diff % 60000) / 1000),
        })
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const items = section.querySelectorAll('.esports-reveal')
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
    <main className="relative min-h-screen pt-24 pb-24" ref={sectionRef}>
      {/* Hero */}
      <div className="w-full px-6 lg:px-12 py-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 bg-[#E31937] animate-pulse rounded-full" />
          <span className="font-secondary text-sm tracking-widest text-[#E31937]">
            ESPORTS DIVISION
          </span>
        </div>
        <h1 className="font-display text-6xl sm:text-8xl lg:text-9xl text-white mb-6">
          DIGITAL
          <br />
          <span className="text-gradient-red">ARENA</span>
        </h1>
        <p className="font-body text-[#8A8F98] max-w-xl text-lg">
          Where champions are forged. Khaos Energy powers the most elite
          esports teams across the globe.
        </p>
      </div>

      {/* Live Match Banner */}
      <div className="w-full px-6 lg:px-12 mb-16">
        <div className="relative bg-[#10101A] border border-[#E31937]/30 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#E31937]/5 via-transparent to-[#E31937]/5" />
          <div className="relative z-10 p-8 lg:p-12">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="font-secondary text-xs tracking-widest text-red-500">
                LIVE NOW
              </span>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h3 className="font-display text-4xl text-white">
                  KHAOS STORM
                </h3>
                <p className="font-body text-sm text-[#8A8F98] mt-1">
                  vs Thunder Wolves
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="font-display text-5xl text-[#E31937]">2</p>
                  <p className="font-body text-xs text-[#8A8F98]">MAPS</p>
                </div>
                <Swords size={24} className="text-[#8A8F98]" />
                <div className="text-center">
                  <p className="font-display text-5xl text-white">1</p>
                  <p className="font-body text-xs text-[#8A8F98]">MAPS</p>
                </div>
              </div>
              <div className="text-center lg:text-right">
                <h3 className="font-display text-4xl text-white">
                  THUNDER WOLVES
                </h3>
                <p className="font-body text-sm text-[#8A8F98] mt-1">
                  CS2 Pro League Finals
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-8">
              <button className="flex items-center gap-2 px-6 py-3 bg-[#E31937] text-white font-secondary text-sm tracking-widest hover:bg-[#ff3344] transition-colors duration-300">
                <Twitch size={16} />
                WATCH ON TWITCH
              </button>
              <button className="flex items-center gap-2 px-6 py-3 border border-white/10 text-white font-secondary text-sm tracking-widest hover:border-white/30 transition-colors duration-300">
                <Youtube size={16} />
                YOUTUBE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Countdown */}
      <div className="w-full px-6 lg:px-12 mb-16">
        <div className="bg-[#10101A] border border-white/5 p-8 text-center">
          <p className="font-secondary text-sm tracking-widest text-[#8A8F98] mb-6">
            NEXT MAJOR TOURNAMENT
          </p>
          <div className="flex items-center justify-center gap-4 sm:gap-8">
            {[
              { value: countdown.h, label: 'HOURS' },
              { value: countdown.m, label: 'MINUTES' },
              { value: countdown.s, label: 'SECONDS' },
            ].map((unit, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-5xl sm:text-7xl text-white bg-[#050507] border border-white/10 px-4 sm:px-6 py-3">
                  {String(unit.value).padStart(2, '0')}
                </div>
                <p className="font-secondary text-[10px] tracking-widest text-[#8A8F98] mt-2">
                  {unit.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="w-full px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Leaderboard */}
          <div className="esports-reveal">
            <div className="flex items-center gap-3 mb-6">
              <Trophy size={20} className="text-[#E31937]" />
              <h2 className="font-display text-2xl text-white">LEADERBOARD</h2>
            </div>
            <div className="bg-[#10101A] border border-white/5">
              {leaderboard.map((team) => (
                <div
                  key={team.rank}
                  className={`flex items-center justify-between px-6 py-4 border-b border-white/5 last:border-0 ${
                    team.rank === 1 ? 'bg-[#E31937]/5' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-display text-xl ${
                        team.rank === 1
                          ? 'text-[#E31937]'
                          : team.rank === 2
                          ? 'text-[#C0C0C0]'
                          : team.rank === 3
                          ? 'text-[#CD7F32]'
                          : 'text-[#8A8F98]'
                      }`}
                    >
                      {team.rank}
                    </span>
                    <span className="font-secondary text-sm tracking-wider text-white">
                      {team.team}
                    </span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-body text-xs text-[#8A8F98]">
                        {team.wins}W - {team.losses}L
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp size={12} className="text-green-500" />
                      <span className="font-body text-sm text-white">
                        {team.points}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Match Schedule */}
          <div className="esports-reveal">
            <div className="flex items-center gap-3 mb-6">
              <Calendar size={20} className="text-[#4A90E2]" />
              <h2 className="font-display text-2xl text-white">SCHEDULE</h2>
            </div>
            <div className="space-y-3">
              {matches.map((match) => (
                <div
                  key={match.id}
                  className="bg-[#10101A] border border-white/5 p-6 hover:border-white/10 transition-colors duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`font-secondary text-[10px] tracking-widest px-2 py-1 ${
                        match.status === 'LIVE'
                          ? 'bg-red-500/20 text-red-500'
                          : 'bg-white/5 text-[#8A8F98]'
                      }`}
                    >
                      {match.status}
                    </span>
                    <span className="font-body text-xs text-[#8A8F98]">
                      {match.game}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-secondary text-sm tracking-wider text-white">
                        {match.teamA}
                      </p>
                      <p className="font-secondary text-sm tracking-wider text-[#8A8F98]">
                        vs
                      </p>
                      <p className="font-secondary text-sm tracking-wider text-white">
                        {match.teamB}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-[#8A8F98]">
                        <Clock size={12} />
                        <span className="font-body text-xs">{match.time}</span>
                      </div>
                      <p className="font-body text-xs text-[#8A8F98] mt-1">
                        {match.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Player Roster */}
      <div className="w-full px-6 lg:px-12 mt-16">
        <div className="flex items-center gap-3 mb-8">
          <Users size={20} className="text-[#E31937]" />
          <h2 className="font-display text-3xl text-white">PLAYER ROSTER</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {players.map((player, i) => (
            <div
              key={i}
              className="esports-reveal group bg-[#10101A] border border-white/5 p-6 hover:border-[#E31937]/30 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#E31937]/20 to-[#4A90E2]/20 rounded-full flex items-center justify-center mb-4 group-hover:from-[#E31937]/40 group-hover:to-[#4A90E2]/40 transition-all duration-300">
                <span className="font-display text-2xl text-white">
                  {player.name[0]}
                </span>
              </div>
              <h4 className="font-secondary text-lg tracking-wider text-white">
                {player.name}
              </h4>
              <p className="font-body text-xs text-[#8A8F98] mb-3">
                {player.handle}
              </p>
              <div className="flex items-center justify-between">
                <span className="px-2 py-1 bg-white/5 font-body text-[10px] tracking-wider text-[#8A8F98]">
                  {player.role}
                </span>
                <span className="font-body text-xs text-[#E31937]">
                  KDA {player.kda}
                </span>
              </div>
              <p className="font-body text-[10px] text-[#8A8F98] mt-3">
                {player.game}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
