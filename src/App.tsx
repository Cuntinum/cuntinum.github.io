import { useState, useEffect, useRef } from 'react'
import type { FormEvent } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, Brain, Zap, Shield, Layers, Activity, Send, CheckCircle } from 'lucide-react'
import Scene3D from './components/Scene3D'

const NAV_LINKS = ['About', 'Approach', 'Vision', 'Contact']

const PRINCIPLES = [
  {
    icon: Brain,
    title: 'Total Recall',
    description:
      'Every piece of knowledge the model has ever learned is available to every inference. Nothing is locked behind routing decisions or gating functions.',
  },
  {
    icon: Zap,
    title: 'Living Intelligence',
    description:
      'The model improves itself continuously. Every interaction makes it stronger. Learning does not stop when training ends.',
  },
  {
    icon: Shield,
    title: 'Grounded Truth',
    description:
      'Built in safeguards prevent knowledge drift and hallucination. The model knows what it knows and maintains fidelity to its foundations.',
  },
  {
    icon: Activity,
    title: 'Instant Response',
    description:
      'Parallel generation produces complete responses simultaneously rather than assembling them word by word. Speed without sacrifice.',
  },
  {
    icon: Layers,
    title: 'Boundless Growth',
    description:
      'New capabilities integrate without disrupting existing ones. The architecture grows additively. Nothing is ever lost to make room for something new.',
  },
]

function FadeIn({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
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
          message: data.get('message'),
          _subject: 'Kinetic Dense Inquiry',
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
        className="flex flex-col items-center gap-4 py-12"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <CheckCircle size={48} className="text-green-400" />
        <p className="text-xl font-medium text-white">Message sent.</p>
        <p className="text-white/50">We will get back to you soon.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          required
          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
        />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          required
          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
        />
      </div>
      <textarea
        name="message"
        placeholder="Tell us about your project or inquiry..."
        rows={5}
        required
        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
      />
      <input type="hidden" name="_captcha" value="false" />
      <button
        type="submit"
        disabled={loading}
        className="self-center liquid-glass-strong rounded-full px-8 py-4 text-sm font-medium text-white flex items-center gap-3 hover:scale-105 active:scale-95 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Sending...' : 'Send Message'}
        <Send size={16} />
      </button>
    </form>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen bg-[#010101] text-white font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 px-5 sm:px-8 md:px-12 py-4 sm:py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.a
            href="#"
            className="flex items-center gap-2.5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center liquid-glass">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="white" strokeWidth="2">
                <path d="M6 18 L12 6 L18 18" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="13" r="1.5" fill="white" stroke="none" />
              </svg>
            </div>
            <span className="text-base sm:text-lg font-medium tracking-tight text-white">Kinetic Dense</span>
          </motion.a>

          <motion.div
            className="hidden md:flex items-center gap-6 lg:gap-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-white/60 hover:text-white transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </motion.div>

          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a
              href="#contact"
              className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white/90 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Get in Touch
            </a>
          </motion.div>

          <button
            className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-2xl font-light text-white/80 hover:text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-5">
        <Scene3D variant="hero" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            className="mono-label text-white/50 mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Cuntinum Research Lab
          </motion.div>

          <motion.h1
            className="hero-title mb-6 sm:mb-8 select-none"
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Kinetic Dense
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-2xl mb-10 sm:mb-12 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            A new class of foundation model. Fully dense. Self improving.
            Every inference draws on the complete knowledge of the system.
            No compromises.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <a
              href="#about"
              className="group liquid-glass-strong rounded-full px-7 sm:px-8 py-3.5 sm:py-4 text-sm font-medium text-white flex items-center gap-3 hover:scale-105 active:scale-95 transition-transform duration-200"
            >
              Learn More
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="liquid-glass rounded-full px-7 sm:px-8 py-3.5 sm:py-4 text-sm font-light text-white/70 hover:text-white transition-colors duration-300"
            >
              Contact Us
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ delay: 2 }}
          style={{ opacity: Math.max(0, 1 - scrollY / 300) }}
        >
          <span className="mono-label text-white/40">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="relative w-full py-20 sm:py-28 md:py-36">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <FadeIn>
                <div className="mono-label text-white/40 mb-5">About</div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h2 className="section-heading text-white mb-6">
                  Dense by design.
                  <br />
                  <span className="text-white/40">Not by limitation.</span>
                </h2>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-white/55 text-base sm:text-lg leading-relaxed mb-6 max-w-lg">
                  Most AI systems today make a tradeoff: they scale by becoming sparse.
                  Larger models route each request to a small fraction of their total capacity.
                  The rest sits idle.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="text-white/45 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                  We took a different path. We built an architecture where the full power
                  of the model is engaged on every single response. Nothing is wasted.
                  Nothing is left behind.
                </p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="flex flex-wrap gap-2.5">
                  {['Fully Dense', 'Self Improving', 'Expandable', 'Unified'].map((tag) => (
                    <span
                      key={tag}
                      className="liquid-glass rounded-full px-4 py-2 text-xs text-white/60 tracking-wider uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.2}>
              <div className="relative h-[300px] sm:h-[400px] md:h-[450px] rounded-2xl sm:rounded-3xl overflow-hidden">
                <Scene3D variant="architecture" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#010101] via-transparent to-transparent pointer-events-none" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Approach / Principles Section */}
      <section id="approach" className="relative w-full py-20 sm:py-28 md:py-36 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
          <FadeIn>
            <div className="text-center mb-14 sm:mb-20">
              <div className="mono-label text-white/40 mb-5">Our Approach</div>
              <h2 className="section-heading text-white">
                Five principles.
                <br />
                <span className="text-white/40">Zero compromises.</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {PRINCIPLES.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="liquid-glass rounded-2xl p-6 sm:p-8 h-full group hover:bg-white/[0.02] transition-colors duration-500">
                  <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center mb-5 group-hover:bg-white/10 transition-colors">
                    <item.icon size={20} className="text-white/50" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{item.description}</p>
                </div>
              </FadeIn>
            ))}

            <FadeIn delay={0.4}>
              <div className="liquid-glass-strong rounded-2xl p-6 sm:p-8 h-full flex flex-col items-center justify-center text-center">
                <p className="text-white/40 text-sm mb-4">Want to know more?</p>
                <a
                  href="#contact"
                  className="liquid-glass rounded-full px-5 py-2.5 text-sm font-medium text-white/70 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
                >
                  Get in Touch <ArrowRight size={14} />
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Vision / Philosophy Section */}
      <section id="vision" className="relative w-full py-20 sm:py-28 md:py-36">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 md:px-12 text-center">
          <FadeIn>
            <div className="mono-label text-white/40 mb-8">Our Vision</div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white/85 leading-tight mb-10 sm:mb-14">
              "Intelligence should not be fractured. A mind that only uses part of
              itself is a mind held back."
            </blockquote>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-white/50 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              We believe the next breakthrough in AI will not come from making models
              bigger. It will come from making them more unified. From building systems
              where every piece of learned knowledge is always accessible, always active,
              always contributing.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-white/35 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              That is what we are building. Not another model that trades depth for breadth.
              A fundamentally different architecture that refuses to choose between them.
              Dense. Focused. Complete.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="relative w-full py-20 sm:py-28 md:py-36 bg-[#020202]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 md:px-12">
          <FadeIn>
            <div className="text-center mb-14 sm:mb-16">
              <div className="mono-label text-white/40 mb-5">What We Offer</div>
              <h2 className="section-heading text-white">
                Not open source. Not yet.
              </h2>
              <p className="text-white/45 text-base sm:text-lg mt-5 max-w-xl mx-auto">
                We are in active development. Here is what early partners get access to.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-3 gap-5 sm:gap-6">
            <FadeIn delay={0.1}>
              <div className="liquid-glass rounded-2xl p-6 sm:p-8 text-center">
                <div className="text-3xl sm:text-4xl font-light text-white mb-3">API</div>
                <p className="text-sm text-white/45">Early access to our inference endpoints for qualified research partners.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="liquid-glass rounded-2xl p-6 sm:p-8 text-center">
                <div className="text-3xl sm:text-4xl font-light text-white mb-3">Custom</div>
                <p className="text-sm text-white/45">Domain specific deployments tailored to your use case and scale requirements.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="liquid-glass rounded-2xl p-6 sm:p-8 text-center">
                <div className="text-3xl sm:text-4xl font-light text-white mb-3">Research</div>
                <p className="text-sm text-white/45">Collaboration opportunities for teams working on aligned problems in dense intelligence.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative w-full py-20 sm:py-28 md:py-36">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 md:px-12">
          <FadeIn>
            <div className="text-center mb-10 sm:mb-14">
              <div className="mono-label text-white/40 mb-5">Contact</div>
              <h2 className="section-heading text-white mb-4">
                Let's talk.
              </h2>
              <p className="text-white/45 text-base sm:text-lg max-w-lg mx-auto">
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

      {/* Footer */}
      <footer className="relative w-full py-10 sm:py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="white" strokeWidth="2">
                <path d="M6 18 L12 6 L18 18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-sm text-white/40">Cuntinum</span>
          </div>

          <div className="mono-label text-white/25">
            Dense Intelligence
          </div>

          <div className="text-xs text-white/25">
            All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
