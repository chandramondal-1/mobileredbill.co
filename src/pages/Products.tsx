import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShoppingCart, Zap, Droplets, Flame, Star, ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const products = [
  {
    id: 'original',
    name: 'KHAOS ORIGINAL',
    tagline: 'The Classic Storm',
    image: '/assets/can-original.png',
    color: '#4A90E2',
    price: '$2.99',
    rating: 4.8,
    stats: { caffeine: '160mg', sugar: '27g', calories: '110' },
    desc: 'The original formula that started it all. Bold energy with a crisp, refreshing taste that awakens your senses.',
    features: ['Original Formula', 'Refreshing Taste', '160mg Caffeine'],
  },
  {
    id: 'zero',
    name: 'KHAOS ZERO',
    tagline: 'No Sugar. All Fury.',
    image: '/assets/can-zero.png',
    color: '#E31937',
    price: '$2.99',
    rating: 4.9,
    stats: { caffeine: '160mg', sugar: '0g', calories: '10' },
    desc: 'Maximum energy with zero sugar. The same explosive kick without the crash. Engineered for sustained performance.',
    features: ['Zero Sugar', 'No Crash', 'Only 10 Calories'],
  },
  {
    id: 'summer',
    name: 'KHAOS SUMMER',
    tagline: 'Tropical Voltage',
    image: '/assets/can-summer.png',
    color: '#FF6B35',
    price: '$3.49',
    rating: 4.7,
    stats: { caffeine: '160mg', sugar: '25g', calories: '105' },
    desc: 'A tropical explosion of mango and passionfruit. Limited edition summer vibes in every sip.',
    features: ['Limited Edition', 'Tropical Flavor', 'Summer Vibes'],
  },
  {
    id: 'frost',
    name: 'KHAOS FROST',
    tagline: 'Ice-Cold Intensity',
    image: '/assets/can-frost.png',
    color: '#00D4FF',
    price: '$3.49',
    rating: 4.9,
    stats: { caffeine: '200mg', sugar: '20g', calories: '95' },
    desc: 'Our most intense formula yet. 200mg caffeine with an arctic blast of cool mint and wintergreen.',
    features: ['200mg Caffeine', 'Arctic Mint', 'Maximum Intensity'],
  },
]

const categories = ['All', 'Original', 'Zero Sugar', 'Limited Edition']

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('All')
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = section.querySelectorAll('.product-card')
    gsap.fromTo(
      cards,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
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

  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((p) => {
          if (activeCategory === 'Zero Sugar') return p.id === 'zero'
          if (activeCategory === 'Limited Edition')
            return p.id === 'summer' || p.id === 'frost'
          return p.id === 'original'
        })

  return (
    <main className="relative min-h-screen pt-24 pb-24">
      {/* Header */}
      <div className="w-full px-6 lg:px-12 py-16">
        <h1 className="font-display text-6xl sm:text-8xl lg:text-9xl text-white">
          THE LINEUP
        </h1>
        <p className="font-body text-[#8A8F98] mt-4 max-w-xl text-lg">
          Four formulas. One mission: deliver unstoppable energy. Choose your weapon.
        </p>
      </div>

      {/* Category Filter */}
      <div className="w-full px-6 lg:px-12 mb-12 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 font-secondary text-sm tracking-widest border transition-all duration-300 ${
              activeCategory === cat
                ? 'bg-[#E31937] border-[#E31937] text-white'
                : 'border-white/10 text-[#8A8F98] hover:border-white/30 hover:text-white'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div ref={sectionRef} className="w-full px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card group relative bg-[#10101A] border border-white/5 p-8 lg:p-12 hover:border-white/10 transition-all duration-500"
            >
              {/* Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 30%, ${product.color} 0%, transparent 70%)`,
                }}
              />

              <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-center">
                {/* Image */}
                <div className="flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-40 lg:w-56 h-auto object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                    draggable={false}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center gap-2 justify-center lg:justify-start mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={
                            i < Math.floor(product.rating)
                              ? 'text-[#E31937] fill-[#E31937]'
                              : 'text-[#8A8F98]'
                          }
                        />
                      ))}
                    </div>
                    <span className="font-body text-xs text-[#8A8F98]">
                      {product.rating}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl lg:text-4xl text-white mb-1">
                    {product.name}
                  </h3>
                  <p
                    className="font-secondary text-sm tracking-widest mb-4"
                    style={{ color: product.color }}
                  >
                    {product.tagline}
                  </p>
                  <p className="font-body text-sm text-[#8A8F98] leading-relaxed mb-6 max-w-sm">
                    {product.desc}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-6 justify-center lg:justify-start mb-6">
                    <div className="flex items-center gap-2">
                      <Zap size={14} style={{ color: product.color }} />
                      <span className="font-body text-xs text-[#8A8F98]">
                        {product.stats.caffeine}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplets size={14} style={{ color: product.color }} />
                      <span className="font-body text-xs text-[#8A8F98]">
                        {product.stats.sugar}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flame size={14} style={{ color: product.color }} />
                      <span className="font-body text-xs text-[#8A8F98]">
                        {product.stats.calories} cal
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                    {product.features.map((feat, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white/5 font-body text-[10px] tracking-wider text-[#8A8F98]"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-4 justify-center lg:justify-start">
                    <span className="font-display text-2xl text-white">
                      {product.price}
                    </span>
                    <button
                      className="inline-flex items-center gap-2 px-6 py-3 font-secondary text-sm tracking-widest text-white transition-all duration-300 hover:scale-105"
                      style={{ backgroundColor: product.color }}
                    >
                      <ShoppingCart size={14} />
                      ADD TO CART
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all duration-300">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compare Banner */}
      <div className="w-full px-6 lg:px-12 mt-24">
        <div className="bg-[#10101A] border border-white/5 p-8 lg:p-12">
          <h3 className="font-display text-3xl text-white mb-6">
            COMPARE FORMULAS
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 font-secondary text-xs tracking-widest text-[#8A8F98]">
                    SPEC
                  </th>
                  {products.map((p) => (
                    <th
                      key={p.id}
                      className="text-center py-4 font-secondary text-xs tracking-widest"
                      style={{ color: p.color }}
                    >
                      {p.name.replace('KHAOS ', '')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Caffeine', key: 'caffeine' },
                  { label: 'Sugar', key: 'sugar' },
                  { label: 'Calories', key: 'calories' },
                  { label: 'Price', key: 'price' },
                ].map((row) => (
                  <tr key={row.key} className="border-b border-white/5">
                    <td className="py-4 font-body text-sm text-[#8A8F98]">
                      {row.label}
                    </td>
                    {products.map((p) => (
                      <td
                        key={p.id}
                        className="text-center py-4 font-body text-sm text-white"
                      >
                        {row.key === 'price'
                          ? p.price
                          : p.stats[row.key as keyof typeof p.stats]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
