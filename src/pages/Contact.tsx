import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  Globe,
  Zap,
  User,
  AtSign,
  FileText,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    q: 'Where can I buy Khaos Energy?',
    a: 'Khaos Energy is available at major retailers, convenience stores, and online through our website and Amazon. Use our store locator to find the nearest location.',
  },
  {
    q: 'How much caffeine is in a can?',
    a: 'Khaos Original, Zero, and Summer contain 160mg of caffeine. Khaos Frost contains 200mg for maximum intensity.',
  },
  {
    q: 'Is Khaos Energy vegan?',
    a: 'Yes! All Khaos Energy formulas are 100% vegan and free from animal-derived ingredients.',
  },
  {
    q: 'Do you offer wholesale or bulk orders?',
    a: 'Absolutely. Contact our sales team at wholesale@khaosenergy.com for bulk pricing and distribution partnerships.',
  },
]

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@khaosenergy.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (888) KHAOS-01',
  },
  {
    icon: MapPin,
    label: 'Headquarters',
    value: 'Los Angeles, California',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon-Fri 9AM - 6PM PST',
  },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { from: 'bot', text: 'Hey there! I am the Khaos AI assistant. How can I help you today?' },
  ])
  const [chatInput, setChatInput] = useState('')
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const items = section.querySelectorAll('.contact-reveal')
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Message sent! We will get back to you within 24 hours.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChatSend = () => {
    if (!chatInput.trim()) return
    const userMsg = chatInput.trim()
    setChatMessages((prev) => [...prev, { from: 'user', text: userMsg }])
    setChatInput('')

    // Simulated AI response
    setTimeout(() => {
      const responses = [
        'That is a great question! All our products are available on our website and at select retailers.',
        'Thanks for reaching out! Our team typically responds within 24 hours.',
        'Did you know Khaos Zero has zero sugar but the same explosive energy?',
        'You can find our full ingredient list and nutrition facts on each product page.',
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setChatMessages((prev) => [...prev, { from: 'bot', text: randomResponse }])
    }, 1000)
  }

  return (
    <main className="relative min-h-screen pt-24 pb-24" ref={sectionRef}>
      {/* Header */}
      <div className="w-full px-6 lg:px-12 py-16">
        <h1 className="font-display text-6xl sm:text-8xl lg:text-9xl text-white">
          GET IN TOUCH
        </h1>
        <p className="font-body text-[#8A8F98] mt-4 max-w-xl text-lg">
          Have a question? Want to partner? Just want to say hi? We are all ears.
          Or use our AI assistant for instant answers.
        </p>
      </div>

      <div className="w-full px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="contact-reveal">
            <div className="bg-[#10101A] border border-white/5 p-8">
              <h2 className="font-display text-2xl text-white mb-6">
                SEND A MESSAGE
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8F98]"
                    />
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-[#050507] border border-white/10 pl-10 pr-4 py-3 font-body text-sm text-white placeholder:text-[#8A8F98]/50 focus:outline-none focus:border-[#E31937]/50 transition-colors duration-300"
                      required
                    />
                  </div>
                  <div className="relative">
                    <AtSign
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8F98]"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-[#050507] border border-white/10 pl-10 pr-4 py-3 font-body text-sm text-white placeholder:text-[#8A8F98]/50 focus:outline-none focus:border-[#E31937]/50 transition-colors duration-300"
                      required
                    />
                  </div>
                </div>
                <div className="relative">
                  <FileText
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8F98]"
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full bg-[#050507] border border-white/10 pl-10 pr-4 py-3 font-body text-sm text-white placeholder:text-[#8A8F98]/50 focus:outline-none focus:border-[#E31937]/50 transition-colors duration-300"
                    required
                  />
                </div>
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={6}
                  className="w-full bg-[#050507] border border-white/10 px-4 py-3 font-body text-sm text-white placeholder:text-[#8A8F98]/50 focus:outline-none focus:border-[#E31937]/50 transition-colors duration-300 resize-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#E31937] text-white font-secondary text-sm tracking-widest hover:bg-[#ff3344] transition-colors duration-300"
                >
                  <Send size={16} />
                  SEND MESSAGE
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              {contactInfo.map((info, i) => (
                <div
                  key={i}
                  className="contact-reveal flex items-center gap-3 bg-[#10101A] border border-white/5 p-4"
                >
                  <info.icon size={18} className="text-[#E31937]" />
                  <div>
                    <p className="font-secondary text-[10px] tracking-widest text-[#8A8F98]">
                      {info.label}
                    </p>
                    <p className="font-body text-sm text-white">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: FAQ + Map placeholder */}
          <div className="space-y-8">
            {/* FAQ */}
            <div className="contact-reveal">
              <h2 className="font-display text-2xl text-white mb-6">
                FREQUENTLY ASKED
              </h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="bg-[#10101A] border border-white/5 p-6"
                  >
                    <h3 className="font-secondary text-sm tracking-wider text-white mb-2">
                      {faq.q}
                    </h3>
                    <p className="font-body text-sm text-[#8A8F98] leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Global Offices */}
            <div className="contact-reveal bg-[#10101A] border border-white/5 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Globe size={18} className="text-[#4A90E2]" />
                <h3 className="font-secondary text-sm tracking-widest text-white">
                  GLOBAL PRESENCE
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { city: 'Los Angeles', role: 'HQ' },
                  { city: 'London', role: 'Europe' },
                  { city: 'Tokyo', role: 'Asia Pacific' },
                  { city: 'Sydney', role: 'Oceania' },
                ].map((office, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#E31937]" />
                    <div>
                      <p className="font-body text-sm text-white">
                        {office.city}
                      </p>
                      <p className="font-body text-[10px] text-[#8A8F98]">
                        {office.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen && (
          <div className="mb-4 w-80 sm:w-96 bg-[#10101A] border border-white/10 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Chat Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#E31937]">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-white" />
                <span className="font-secondary text-sm tracking-wider text-white">
                  KHAOS AI
                </span>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-white/80 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 text-sm font-body ${
                      msg.from === 'user'
                        ? 'bg-[#E31937] text-white'
                        : 'bg-white/5 text-[#8A8F98]'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 p-3 border-t border-white/5">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                placeholder="Ask anything..."
                className="flex-1 bg-[#050507] border border-white/10 px-3 py-2 font-body text-sm text-white placeholder:text-[#8A8F98]/50 focus:outline-none focus:border-[#E31937]/50"
              />
              <button
                onClick={handleChatSend}
                className="w-9 h-9 flex items-center justify-center bg-[#E31937] text-white hover:bg-[#ff3344] transition-colors duration-300"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 flex items-center justify-center bg-[#E31937] text-white shadow-lg hover:scale-110 transition-transform duration-300 neon-glow-red"
          data-cursor="pointer"
        >
          <MessageSquare size={24} />
        </button>
      </div>
    </main>
  )
}
