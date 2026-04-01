import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, CheckCircle2, Mail, Building2, User, MessageSquare } from 'lucide-react';
import { HeroScene, ServiceIcon } from './components/ThreeScene';
import { Chatbot } from './components/Chatbot';
import { cn } from './lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
      isScrolled ? "glass py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-4xl font-serif font-bold tracking-tighter text-brand-gold">ARKS</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-brand-text/70 hover:text-brand-gold transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="px-5 py-2 rounded-full border border-brand-gold/30 text-brand-gold text-sm font-medium hover:bg-brand-gold hover:text-brand-bg transition-all duration-300">
            Start a Project
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-brand-text"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass border-t-0 p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-brand-text"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" className="w-full py-3 rounded-xl bg-brand-gold text-brand-bg font-bold block text-center" onClick={() => setIsMobileMenuOpen(false)}>
              Start a Project
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold leading-[0.9] mb-6 gold-glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            We Build <br />
            <span className="text-brand-gold italic">Systems</span> <br />
            That Think.
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-brand-text/70 max-w-lg mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            ARKS is a North Carolina technical consulting firm that turns complex business problems into intelligent, production-grade software.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#contact" className="px-8 py-4 rounded-full bg-brand-gold text-brand-bg font-bold text-lg hover:scale-105 transition-transform animate-pulse-gold">
              Start a Project
            </a>
            <a href="#work" className="px-8 py-4 rounded-full border border-white/10 glass font-medium text-lg hover:bg-white/10 transition-all">
              Our Work
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll to explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-brand-gold to-transparent" />
      </div>
    </section>
  );
};

const ServiceCard = ({ title, icon, delay }: { title: string, icon: 'cube' | 'data' | 'ai' | 'gears', delay: number }) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass p-8 rounded-3xl group cursor-pointer hover:border-brand-gold/50 transition-all duration-500"
    >
      <ServiceIcon type={icon} />
      <h3 className="text-2xl font-bold mb-4 text-center group-hover:text-brand-gold transition-colors">{title}</h3>
      <p className="text-brand-text/60 text-center text-sm leading-relaxed">
        Leveraging cutting-edge architecture to deliver robust, scalable solutions tailored to your unique business needs.
      </p>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-brand-gold text-sm font-bold uppercase tracking-[0.4em] mb-4 block"
        >
          Capabilities
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold"
        >
          What We Build
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <ServiceCard title="AI and Machine Learning Systems" icon="ai" delay={0.1} />
        <ServiceCard title="Data Pipelines and Automation" icon="data" delay={0.2} />
        <ServiceCard title="Custom Platform Development" icon="cube" delay={0.3} />
        <ServiceCard title="API and Systems Integration" icon="gears" delay={0.4} />
      </div>
    </section>
  );
};

const FeaturedWork = () => {
  return (
    <section id="work" className="py-32 px-6 bg-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center glass p-8 md:p-16 rounded-[3rem] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/10 blur-[120px] -z-10" />
          
          <div className="flex-1">
            <span className="text-brand-gold font-bold uppercase tracking-widest text-sm mb-6 block">Featured Work</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Vantage Real Estate Platform</h2>
            
            <div className="space-y-8 mb-10">
              <div>
                <h4 className="text-brand-gold font-bold text-sm uppercase mb-2">The Challenge</h4>
                <p className="text-brand-text/70">Manually identifying high-value real estate deals across thousands of parcels was inefficient and prone to human error.</p>
              </div>
              <div>
                <h4 className="text-brand-gold font-bold text-sm uppercase mb-2">The Solution</h4>
                <p className="text-brand-text/70">ARKS built an automated scoring engine and investor matching platform that processes massive datasets in real-time.</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="text-center p-4 glass rounded-2xl">
                <div className="text-2xl font-bold text-brand-gold">218k+</div>
                <div className="text-[10px] uppercase text-brand-text/50">Parcels Scored</div>
              </div>
              <div className="text-center p-4 glass rounded-2xl">
                <div className="text-2xl font-bold text-brand-gold">47</div>
                <div className="text-[10px] uppercase text-brand-text/50">Tier 1 Deals</div>
              </div>
              <div className="text-center p-4 glass rounded-2xl">
                <div className="text-2xl font-bold text-brand-gold">100%</div>
                <div className="text-[10px] uppercase text-brand-text/50">Automated</div>
              </div>
            </div>

            <button className="flex items-center gap-2 text-brand-gold font-bold group">
              View Case Study <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="flex-1 relative">
            <motion.div 
              className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              whileHover={{ scale: 1.05, rotateY: -5 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&h=800&auto=format&fit=crop" 
                alt="Vantage Platform" 
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-gold/10 blur-[80px] -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

const WhyUs = () => {
  const points = [
    {
      title: "Deep Technical Execution",
      desc: "We do not hand off work. Our senior engineers build everything end-to-end, ensuring architectural integrity.",
      icon: <Building2 className="w-8 h-8 text-brand-gold" />
    },
    {
      title: "Built for Your Business",
      desc: "Every system is designed around your specific workflow and data, not a generic template or off-the-shelf tool.",
      icon: <CheckCircle2 className="w-8 h-8 text-brand-gold" />
    },
    {
      title: "North Carolina Based",
      desc: "Local presence, direct communication, and no timezone friction. We're partners in your backyard.",
      icon: <User className="w-8 h-8 text-brand-gold" />
    }
  ];

  return (
    <section id="about" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-3 gap-12">
        {points.map((point, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="space-y-6"
          >
            <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mb-8">
              {point.icon}
            </div>
            <h3 className="text-3xl font-bold leading-tight">{point.title}</h3>
            <p className="text-brand-text/60 leading-relaxed">{point.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-7xl mx-auto glass p-12 md:p-20 rounded-[4rem] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(#e8b84b_1px,transparent_1px)] [background-size:40px_40px]" />
        
        <div className="grid md:grid-cols-2 gap-20 relative z-10">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold mb-8">Ready to Build Something <span className="text-brand-gold italic">Intelligent?</span></h2>
            <p className="text-xl text-brand-text/60 mb-12">Let's discuss your technical challenges and how ARKS can help you scale with custom AI and data systems.</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-brand-gold">
                  <Mail size={20} />
                </div>
                <span className="text-lg">hello@arks.studio</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-brand-gold">
                  <Building2 size={20} />
                </div>
                <span className="text-lg">Charlotte, North Carolina</span>
              </div>
            </div>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-brand-text/40 ml-2">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-brand-text/40 ml-2">Company</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-all"
                  placeholder="Acme Inc."
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-brand-text/40 ml-2">Message</label>
              <textarea 
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-all resize-none"
                placeholder="Tell us what you want to build..."
              />
            </div>
            <button className="w-full py-5 rounded-2xl bg-brand-gold text-brand-bg font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              Send Message <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:row items-center justify-between gap-8">
        <div className="text-2xl font-serif font-bold text-brand-gold">ARKS</div>
        <div className="flex gap-8 text-sm text-brand-text/40">
          <a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-brand-gold transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-brand-gold transition-colors">LinkedIn</a>
        </div>
        <div className="text-sm text-brand-text/20 italic">
          © 2026 ARKS Technical Consulting. Built for intelligence.
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <div className="min-h-screen selection:bg-brand-gold/30">
      <Navbar />
      <motion.div 
        style={{ opacity, scale }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <HeroScene />
      </motion.div>
      <main className="relative z-10">
        <Hero />
        <Services />
        <FeaturedWork />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
