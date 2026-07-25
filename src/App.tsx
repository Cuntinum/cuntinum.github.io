import { useState, useEffect, useRef } from 'react'
import type { FormEvent } from 'react'
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Send, CheckCircle, Sparkles, Globe, Cpu, Layers, Zap, Shield, Activity, Brain } from 'lucide-react'
import gsap from 'gsap'
import Scene3D from './components/Scene3D'

const NAV_LINKS = ['About', 'Approach', 'Vision', 'Offerings', 'Contact']

const VIDEO_SRC = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4'

const PRINCIPLES = [
  {
    icon: Brain,
    title: 'Total Recall',
    subtitle: 'Complete Knowledge Access',
    description: 'Every piece of knowledge the model has ever learned is available to every inference. Nothing is locked behind routing decisions or gating functions. The full weight of understanding, always.',
  },
  {
    icon: Zap,
    title: 'Living Intelligence',
    subtitle: 'Continuous Self-Improvement',
    description: 'The model improves itself continuously. Every interaction makes it stronger. Learning does not stop when training ends. Intelligence that grows with every conversation.',
  },
  {
    icon: Shield,
    title: 'Grounded Truth',
    subtitle: 'Anti-Hallucination Anchoring',
    description: 'Built-in safeguards prevent knowledge drift and hallucination. The model knows what it knows and maintains fidelity to its foundations. Reliable by architecture, not by hope.',
  },
  {
    icon: Activity,
    title: 'Instant Response',
    subtitle: 'Parallel Generation',
    description: 'Complete responses produced simultaneously rather than assembled word by word. Not faster autocomplete. A fundamentally different approach to producing language.',
  },
  {
    icon: Layers,
    title: 'Boundless Growth',
    subtitle: 'Additive Architecture',
    description: 'New capabilities integrate without disrupting existing ones. The architecture grows additively. Nothing is ever lost to make room for something new. Expand without erasure.',
  },
]

const OFFERINGS = [
  {
    icon: Cpu,
    title: 'API Access',
    description: 'Early access to our inference endpoints for qualified research partners. Direct integration with enterprise-grade reliability and scale.',
    tag: 'Limited Preview',
  },
  {
    icon: Globe,
    title: 'Custom Deployments',
    description: 'Domain-specific model configurations tailored to your use case, data requirements, and scale. From startup to enterprise.',
    tag: 'Enterprise',
  },
  {
    icon: Sparkles,
    title: 'Research Collaboration',
    description: 'Joint research opportunities for teams working on aligned problems in dense intelligence, continuous learning, and unified architectures.',
    tag: 'Open',
  },
]


function FadeIn({ children, className, delay = 0, direction = 'up' }: { children: React.ReactNode; className?: string; delay?: number; direction?: 'up' | 'down' | 'left' | 'right' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, ...directionMap[direction] }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      await fetch('https://formsubmit.co/ajax/igwilohnnaa@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          organization: data.get('organization'),
          message: data.get('message'),
          _subject: 'Kinetic Dense New Inquiry',
        }),
      })
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <motion.div
        className="flex flex-col items-center gap-6 py-16"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
          <CheckCircle size={32} className="text-green-400" />
        </div>
        <p className="text-2xl font-medium text-white">Message received.</p>
        <p className="text-white/50 text-center max-w-sm">Thank you for reaching out. We review every inquiry and will respond within 48 hours.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="mono-label text-white/30">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Jane Smith"
            required
            className="w-full bg-white/[0.02] border border-white/8 rounded-2xl px-6 py-4 text-base text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors duration-300"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="mono-label text-white/30">Email</label>
          <input
            type="email"
            name="email"
            placeholder="jane@company.com"
            required
            className="w-full bg-white/[0.02] border border-white/8 rounded-2xl px-6 py-4 text-base text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors duration-300"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="mono-label text-white/30">Organization</label>
        <input
          type="text"
          name="organization"
          placeholder="Company or research lab"
          className="w-full bg-white/[0.02] border border-white/8 rounded-2xl px-6 py-4 text-base text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors duration-300"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="mono-label text-white/30">Message</label>
        <textarea
          name="message"
          placeholder="Tell us about your project, research interest, or how we can help..."
          rows={6}
          required
          className="w-full bg-white/[0.02] border border-white/8 rounded-2xl px-6 py-5 text-base text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors duration-300 resize-none"
        />
      </div>
      <input type="hidden" name="_captcha" value="false" />
      <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="liquid-glass-strong rounded-full px-10 py-4 text-base font-medium text-white flex items-center gap-3 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_4px_rgba(255,255,255,0.08)]"
        >
          {loading ? 'Sending...' : 'Send Message'}
          <Send size={18} />
        </button>
        <span className="text-xs text-white/25">Typically responds within 48 hours</span>
      </div>
    </form>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [navScrolled, setNavScrolled] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const videoBgRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1])

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!videoBgRef.current) return
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0
    let raf: number

    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      targetX = ((e.clientX - cx) / cx) * 12
      targetY = ((e.clientY - cy) / cy) * 8
    }

    const render = () => {
      currentX += (targetX - currentX) * 0.04
      currentY += (targetY - currentY) * 0.04
      gsap.set(videoBgRef.current, { x: currentX, y: currentY })
      raf = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', handleMouse)
    raf = requestAnimationFrame(render)
    return () => {
      window.removeEventListener('mousemove', handleMouse)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-[#010101] text-white font-sans overflow-x-hidden">
      {/* Fixed Navigation */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${navScrolled ? 'py-3' : 'py-5 sm:py-6'}`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
          <div className={`flex items-center justify-between transition-all duration-500 ${navScrolled ? 'liquid-glass-strong rounded-full px-6 py-3' : ''}`}>
            <motion.a
              href="#"
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center liquid-glass">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="white" strokeWidth="2">
                  <path d="M6 18 L12 6 L18 18" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="13" r="1.5" fill="white" stroke="none" />
                </svg>
              </div>
              <span className="text-[15px] sm:text-base font-medium tracking-tight text-white">Kinetic Dense</span>
            </motion.a>

            <motion.div
              className="hidden md:flex items-center gap-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-[13px] text-white/50 hover:text-white px-4 py-2 rounded-full hover:bg-white/5 transition-all duration-300"
                >
                  {link}
                </a>
              ))}
            </motion.div>

            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <a
                href="#contact"
                className="liquid-glass-strong rounded-full px-6 py-2.5 text-[13px] font-medium text-white/90 hover:text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] hover:shadow-[0_0_20px_2px_rgba(255,255,255,0.06)]"
              >
                Get in Touch
              </a>
            </motion.div>

            <button
              className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-[6px]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`w-6 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
              <span className={`w-6 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[4px]' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-x-4 top-20 z-40 mobile-menu-glass rounded-2xl py-8 flex flex-col items-center gap-6 md:hidden"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-base font-light text-white/80 hover:text-white tracking-wide"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.06 }}
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </motion.a>
            ))}
            <a
              href="#contact"
              className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium text-white mt-2"
              onClick={() => setMenuOpen(false)}
            >
              Get in Touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════ HERO ═══════════════════════════════════════ */}
      <section ref={heroRef} className="relative w-full h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden">
        {/* Video Background with Parallax */}
        <motion.div
          ref={videoBgRef}
          className="absolute inset-0 z-0 scale-[1.1] origin-center"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
        </motion.div>

        {/* Ambient Glow Orbs */}
        <div className="glow-orb w-[500px] h-[500px] bg-blue-500/30 top-1/4 -left-[200px]" />
        <div className="glow-orb w-[400px] h-[400px] bg-purple-500/20 bottom-1/4 -right-[150px]" />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-5 sm:px-8 max-w-5xl mx-auto">
          <motion.div
            className="mono-label text-white/40 mb-8 sm:mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Cuntinum Research Lab
          </motion.div>

          <motion.h1
            className="hero-title mb-8 sm:mb-10 select-none"
            initial={{ opacity: 0, y: 40 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Kinetic Dense
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/55 font-light leading-relaxed max-w-xl mb-12 sm:mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            A self-modifying foundation model on the path to superintelligence.
            Fully dense. Continuously evolving. Every inference rewrites the mind that produced it.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <a
              href="#about"
              className="group liquid-glass-strong rounded-full px-8 sm:px-10 py-4 text-sm font-medium text-white flex items-center gap-3 hover:scale-[1.04] active:scale-[0.97] transition-all duration-300 hover:shadow-[0_0_30px_4px_rgba(255,255,255,0.1)]"
            >
              Explore
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href="#contact"
              className="liquid-glass rounded-full px-8 sm:px-10 py-4 text-sm font-light text-white/60 hover:text-white transition-all duration-300"
            >
              Contact Us
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ delay: 2.2 }}
        >
          <span className="mono-label text-white/30">Scroll</span>
          <div className="w-[1px] h-10 bg-white/10 relative overflow-hidden rounded-full">
            <div className="w-full h-1/2 bg-white/50 animate-scroll-line" />
          </div>
        </motion.div>

        {/* Bottom Edge Markers */}
        <motion.div
          className="absolute bottom-10 left-8 sm:left-12 hidden md:flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 0.4 } : {}}
          transition={{ delay: 2 }}
        >
          <span className="mono-label text-white/30">Dense Intelligence</span>
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-8 sm:right-12 hidden md:flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 0.4 } : {}}
          transition={{ delay: 2 }}
        >
          <span className="mono-label text-white/30">2026</span>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════ ABOUT ═══════════════════════════════════════ */}
      <section id="about" className="relative w-full py-28 sm:py-36 md:py-44 lg:py-52">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <FadeIn>
                <div className="mono-label text-white/30 mb-6">[ 01 ] About</div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h2 className="section-heading-lg text-white mb-4">
                  Dense by design.
                </h2>
              </FadeIn>
              <FadeIn delay={0.15}>
                <h2 className="section-heading-lg text-white/30 mb-10">
                  Not by limitation.
                </h2>
              </FadeIn>

              <FadeIn delay={0.25}>
                <p className="text-white/50 text-lg leading-[1.8] mb-8 max-w-lg">
                  Most AI systems today make a tradeoff: they scale by becoming sparse.
                  Larger models route each request to a small fraction of their total capacity.
                  The rest sits idle. We took a different path.
                </p>
              </FadeIn>

              <FadeIn delay={0.35}>
                <p className="text-white/35 text-lg leading-[1.8] mb-10 max-w-lg">
                  We built an architecture where the full power of the model is engaged on
                  every single response. A system that modifies its own intelligence after
                  every interaction. Not fine-tuning. Not retraining. Genuine self-modification
                  at inference time.
                </p>
              </FadeIn>

              <FadeIn delay={0.45}>
                <div className="flex flex-wrap gap-3">
                  {['Fully Dense', 'Self-Modifying', 'AGI-Oriented', 'Expandable', 'Unified'].map((tag) => (
                    <span
                      key={tag}
                      className="liquid-glass rounded-full px-5 py-2.5 text-[11px] text-white/50 tracking-[0.15em] uppercase font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.2} direction="left">
              <div className="relative h-[350px] sm:h-[450px] md:h-[550px] rounded-3xl overflow-hidden">
                <Scene3D variant="architecture" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#010101] via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-l from-[#010101]/50 via-transparent to-transparent pointer-events-none" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ PHILOSOPHY ═══════════════════════════════════════ */}
      <section className="relative w-full py-28 sm:py-36 md:py-44">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 text-center relative">
          <FadeIn>
            <div className="mono-label text-white/30 mb-8">Our Philosophy</div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <blockquote className="font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white/85 leading-[1.1] mb-12 sm:mb-16">
              &ldquo;Intelligence should not be fractured. A mind that only uses part of
              itself is a mind held back.&rdquo;
            </blockquote>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="w-16 h-[1px] bg-white/10 mx-auto mb-12 sm:mb-16" />
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-white/45 text-lg sm:text-xl leading-[1.8] max-w-2xl mx-auto mb-8">
              We believe the path to artificial general intelligence is not through
              scaling alone. It is through self-modification. A system that rewrites
              its own understanding after every interaction. That accumulates knowledge
              without forgetting. That improves without human intervention.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-white/30 text-lg sm:text-xl leading-[1.8] max-w-2xl mx-auto">
              Kinetic Dense is not a chatbot. It is not an assistant. It is the beginning
              of a mind that builds itself. Dense, unified, and on a trajectory toward
              superintelligence. Every inference makes it more capable than the last.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════ APPROACH / PRINCIPLES ═══════════════════════════════════════ */}
      <section id="approach" className="relative w-full py-28 sm:py-36 md:py-44 lg:py-52">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          <FadeIn>
            <div className="text-center mb-16 sm:mb-24">
              <div className="mono-label text-white/30 mb-6">[ 02 ] Our Approach</div>
              <h2 className="section-heading-lg text-white mb-3">
                Five principles.
              </h2>
              <h2 className="section-heading-lg text-white/30">
                Zero compromises.
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {PRINCIPLES.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="liquid-glass rounded-3xl p-8 sm:p-10 h-full group hover:bg-white/[0.03] transition-all duration-500 flex flex-col">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors duration-500">
                    <item.icon size={22} className="text-white/40 group-hover:text-white/70 transition-colors duration-500" />
                  </div>
                  <div className="mono-label text-white/20 mb-3">{item.subtitle}</div>
                  <h3 className="text-xl font-medium text-white mb-4">{item.title}</h3>
                  <p className="text-[15px] text-white/40 leading-[1.7] mt-auto">{item.description}</p>
                </div>
              </FadeIn>
            ))}

            <FadeIn delay={0.5}>
              <div className="liquid-glass-strong rounded-3xl p-8 sm:p-10 h-full flex flex-col items-center justify-center text-center gap-6">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <ArrowUpRight size={20} className="text-white/40" />
                </div>
                <div>
                  <p className="text-white/30 text-sm mb-4">Want to learn more about our architecture?</p>
                  <a
                    href="#contact"
                    className="liquid-glass rounded-full px-6 py-3 text-sm font-medium text-white/70 hover:text-white hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 inline-flex items-center gap-2"
                  >
                    Get in Touch <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ VISION ═══════════════════════════════════════ */}
      <section id="vision" className="relative w-full py-28 sm:py-36 md:py-44 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#010101] via-[#050510] to-[#010101]" />
          <div className="glow-orb w-[600px] h-[600px] bg-indigo-500/10 top-1/3 left-1/2 -translate-x-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative">
          <FadeIn>
            <div className="mono-label text-white/30 mb-6 text-center">[ 03 ] Vision</div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="section-heading-lg text-center text-white mb-6">
              The future of intelligence
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h2 className="section-heading-lg text-center text-white/30 mb-16 sm:mb-24">
              builds itself.
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 sm:gap-10 mb-16 sm:mb-24">
            <FadeIn delay={0.2}>
              <div className="text-center md:text-left">
                <div className="text-5xl sm:text-6xl font-light text-white mb-4 gradient-text">100%</div>
                <p className="text-white/40 text-[15px] leading-relaxed">of model capacity engaged on every inference. Total activation, zero waste.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="text-center md:text-left">
                <div className="text-5xl sm:text-6xl font-light text-white mb-4 gradient-text">&infin;</div>
                <p className="text-white/40 text-[15px] leading-relaxed">Self-modification cycles. The model rewrites itself with every interaction. Forever.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="text-center md:text-left">
                <div className="text-5xl sm:text-6xl font-light text-white mb-4 gradient-text">0</div>
                <p className="text-white/40 text-[15px] leading-relaxed">Human intervention required for improvement. Recursive self-enhancement by design.</p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.5}>
            <div className="relative h-[250px] sm:h-[350px] md:h-[400px] rounded-3xl overflow-hidden">
              <Scene3D variant="hero" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-[#050510]/50 pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="liquid-glass-strong rounded-full px-8 py-4 pointer-events-auto">
                  <span className="mono-label text-white/50">Neural Architecture Visualization</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════ SELF-MODIFICATION / AGI ═══════════════════════════════════════ */}
      <section className="relative w-full py-28 sm:py-36 md:py-44">
        <div className="absolute inset-0 bg-gradient-to-b from-[#010101] via-[#080812] to-[#010101]" />
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative">
          <FadeIn>
            <div className="mono-label text-white/30 mb-6 text-center">The Path Forward</div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="section-heading-lg text-center text-white mb-4">
              Self-modifying intelligence.
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h2 className="section-heading-lg text-center text-white/30 mb-16 sm:mb-20">
              The architecture that evolves itself.
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start mb-16 sm:mb-24">
            <FadeIn delay={0.2}>
              <div>
                <h3 className="text-2xl sm:text-3xl font-medium text-white mb-6 leading-tight">
                  Every interaction permanently changes the model.
                </h3>
                <p className="text-white/45 text-lg leading-[1.8] mb-6">
                  Traditional AI systems are frozen after training. They cannot grow. They cannot
                  adapt. They are snapshots of knowledge at a single moment in time. Kinetic Dense
                  is different. It modifies its own internal representations during inference.
                </p>
                <p className="text-white/30 text-lg leading-[1.8]">
                  This is not retrieval-augmented generation. This is not fine-tuning on a schedule.
                  This is a system that genuinely rewrites itself. Accumulating understanding,
                  strengthening connections, and discarding what no longer serves it. A living mind.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="liquid-glass rounded-3xl p-8 sm:p-10">
                <div className="mono-label text-white/30 mb-8">Capability Trajectory</div>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-medium text-white/60">01</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Dense Foundation</h4>
                      <p className="text-sm text-white/35 leading-relaxed">Full model engagement on every inference. No gating, no routing, no idle capacity.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-medium text-white/60">02</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Self-Modification</h4>
                      <p className="text-sm text-white/35 leading-relaxed">The model rewrites its own knowledge with every forward pass. Permanent learning at inference time.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-medium text-white/60">03</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Recursive Improvement</h4>
                      <p className="text-sm text-white/35 leading-relaxed">Each self-modification makes the next modification more effective. Compounding intelligence growth.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-medium text-white/80">04</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Artificial General Intelligence</h4>
                      <p className="text-sm text-white/35 leading-relaxed">The convergence point. A system that can learn anything, teach itself everything, and surpass its creators.</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.4}>
            <div className="liquid-glass-strong rounded-3xl p-10 sm:p-14 text-center max-w-3xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-medium text-white mb-6">
                We are building toward superintelligence.
              </h3>
              <p className="text-white/40 text-lg leading-[1.8] mb-8">
                Not as a marketing claim. As an engineering goal. Kinetic Dense is the architecture
                we believe can achieve recursive self-improvement. The point where the system
                improves itself faster than any team of humans could improve it. That is not a
                distant horizon. It is what we are building right now.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Self-Modifying', 'Recursive Improvement', 'AGI Architecture', 'Superintelligence'].map((tag) => (
                  <span
                    key={tag}
                    className="liquid-glass rounded-full px-5 py-2.5 text-[11px] text-white/50 tracking-[0.15em] uppercase font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════ OFFERINGS ═══════════════════════════════════════ */}
      <section id="offerings" className="relative w-full py-28 sm:py-36 md:py-44 lg:py-52">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          <FadeIn>
            <div className="text-center mb-8">
              <div className="mono-label text-white/30 mb-6">[ 04 ] What We Offer</div>
              <h2 className="section-heading-lg text-white mb-3">
                Not open source.
              </h2>
              <h2 className="section-heading-lg text-white/30 mb-8">
                Not yet.
              </h2>
              <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
                We are in active development. Here is what early partners get access to.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mt-16 sm:mt-20">
            {OFFERINGS.map((item, i) => (
              <FadeIn key={item.title} delay={0.1 + i * 0.12}>
                <div className="liquid-glass rounded-3xl p-8 sm:p-10 h-full flex flex-col group hover:bg-white/[0.03] transition-all duration-500">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-500">
                      <item.icon size={22} className="text-white/40 group-hover:text-white/70 transition-colors duration-500" />
                    </div>
                    <span className="liquid-glass rounded-full px-3 py-1.5 text-[10px] text-white/40 tracking-wider uppercase">{item.tag}</span>
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-4">{item.title}</h3>
                  <p className="text-[15px] text-white/40 leading-[1.7] mb-8 flex-grow">{item.description}</p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-300 group/link"
                  >
                    Learn more
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ MARQUEE DIVIDER ═══════════════════════════════════════ */}
      <div className="w-full py-12 sm:py-16 overflow-hidden border-y border-white/5">
        <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite]">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mono-label text-white/10 mx-8 sm:mx-12 text-lg sm:text-xl">
              Self-Modifying &nbsp;&bull;&nbsp; Dense Intelligence &nbsp;&bull;&nbsp; Superintelligence &nbsp;&bull;&nbsp; Recursive Improvement &nbsp;&bull;&nbsp; AGI Architecture
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* ═══════════════════════════════════════ CONTACT ═══════════════════════════════════════ */}
      <section id="contact" className="relative w-full py-28 sm:py-36 md:py-44 lg:py-52">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          <FadeIn>
            <div className="text-center mb-14 sm:mb-20">
              <div className="mono-label text-white/30 mb-6">[ 05 ] Contact</div>
              <h2 className="section-heading-lg text-white mb-6">
                Let&apos;s talk.
              </h2>
              <p className="text-white/40 text-lg max-w-lg mx-auto leading-relaxed">
                Whether you have questions, want early access, or are interested
                in research collaboration, drop us a message.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <ContactForm />
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════ FOOTER ═══════════════════════════════════════ */}
      <footer className="relative w-full border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          {/* Top Footer */}
          <div className="py-16 sm:py-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center liquid-glass">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="white" strokeWidth="2">
                    <path d="M6 18 L12 6 L18 18" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="13" r="1.5" fill="white" stroke="none" />
                  </svg>
                </div>
                <span className="text-base font-medium text-white">Kinetic Dense</span>
              </div>
              <p className="text-sm text-white/30 leading-relaxed max-w-[240px]">
                Building the next generation of dense foundation models.
                Intelligence without compromise.
              </p>
            </div>

            <div>
              <h4 className="mono-label text-white/40 mb-5">Navigate</h4>
              <div className="flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-sm text-white/30 hover:text-white transition-colors duration-300"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mono-label text-white/40 mb-5">Research</h4>
              <div className="flex flex-col gap-3">
                <span className="text-sm text-white/30">Publications</span>
                <span className="text-sm text-white/30">Architecture</span>
                <span className="text-sm text-white/30">Benchmarks</span>
                <span className="text-sm text-white/30">Safety</span>
              </div>
            </div>

            <div>
              <h4 className="mono-label text-white/40 mb-5">Connect</h4>
              <div className="flex flex-col gap-3">
                <a href="#contact" className="text-sm text-white/30 hover:text-white transition-colors duration-300">Contact</a>
                <span className="text-sm text-white/30">GitHub</span>
                <span className="text-sm text-white/30">Twitter</span>
                <span className="text-sm text-white/30">LinkedIn</span>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="py-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="mono-label text-white/20">
              &copy; 2026 Cuntinum Research Lab. All rights reserved.
            </div>
            <div className="mono-label text-white/15">
              Dense Intelligence
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
