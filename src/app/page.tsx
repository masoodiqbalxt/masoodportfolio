'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import {
  Mail,
  Menu,
  X,
  Plus,
  ArrowDown,
  ArrowUpRight,
  ChevronRight,
  Globe,
  Server,
  Layers,
  Activity,
  Phone
} from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);

  useEffect(() => {
    // Defer state update to avoid cascading renders flagged by linter
    const timer = setTimeout(() => setMounted(true), 0);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen theme-transition-base overflow-x-hidden selection:bg-accent selection:text-white">
      <div className="noise-overlay" />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Header - Fixed & Visible on Scroll */}
      <header className="fixed top-0 w-full z-[90] transition-all duration-500 py-4 bg-[--bg-primary]/80 backdrop-blur-xl shadow-md border-b border-[--border-primary]/50">
        <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
          <div className="relative group z-[100]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setShowContactInfo(!showContactInfo)}
            >
              <div className="text-xl md:text-2xl font-black tracking-tighter uppercase leading-none">
                <span className="text-accent">Masood</span> <span className="text-[--text-primary]">Iqbal</span>
              </div>
              <ChevronRight className={`transition-transform duration-300 ml-1 opacity-50 ${showContactInfo ? 'rotate-90' : ''}`} size={18} />
            </motion.div>

            <AnimatePresence>
              {showContactInfo && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 15, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-0 mt-4 p-6 rounded-3xl bg-[--bg-primary]/95 backdrop-blur-2xl border border-[--border-primary] shadow-2xl min-w-[300px]"
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 group/item">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent"><Phone size={20} /></div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[--text-secondary] mb-1">Phone</span>
                        <a href="tel:03095990499" className="font-black tracking-wider text-sm hover:text-accent transition-colors">03095990499</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 group/item">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent"><Mail size={20} /></div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[--text-secondary] mb-1">Email</span>
                        <a href="mailto:masoodiqbalxt@gmail.com" className="font-black tracking-wider text-sm hover:text-accent transition-colors">masoodiqbalxt@gmail.com</a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-8">
            <nav className="hidden lg:flex gap-12">
              {['Work', 'Career', 'Stack'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="nav-link border-b-2 border-transparent hover:border-accent transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>
            <div className="h-6 w-px bg-[--border-primary] hidden lg:block" />
            <ThemeToggle />
            <motion.button
              onClick={() => setIsMenuOpen(true)}
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full border border-[--border-primary] flex items-center justify-center hover:bg-accent/20 hover:text-accent hover:border-accent transition-all shadow-sm relative overflow-hidden group"
              aria-label="Open navigation menu"
            >
              <div className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <Menu size={20} className="relative z-10" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Fullscreen Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#030712]/95 backdrop-blur-3xl p-8 md:p-20 flex flex-col justify-between overflow-hidden"
          >
            {/* Tech-Savvy Background Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.15) 0%, transparent 70%), linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '100% 100%, 40px 40px, 40px 40px' }} />
            <motion.div 
              initial={{ y: "-100%" }}
              animate={{ y: "100vh" }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent z-0 opacity-30"
            />
            
            <div className="relative z-10 flex justify-between items-center">
              <div className="text-2xl font-black italic tracking-tighter">M.I</div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-16 h-16 rounded-full border border-[--border-primary] flex items-center justify-center hover:rotate-90 transition-transform hover:bg-accent/10"
                aria-label="Close navigation menu"
              >
                <X size={32} />
              </button>
            </div>

            <nav className="relative z-10 flex flex-col gap-8">
              {['Home', 'Work', 'Career', 'Contact'].map((item, i) => (
                <motion.a
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter hover:text-accent transition-all flex items-center group leading-none w-max relative"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="opacity-10 group-hover:opacity-100 group-hover:text-accent text-xl font-bold mr-8 hidden md:block transition-all duration-300">0{i + 1}</span>
                  {item}
                  <motion.div className="h-1 bg-accent absolute -bottom-2 left-16 right-0 origin-left" initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.3 }} />
                </motion.a>
              ))}
            </nav>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-10">
              <div className="space-y-4">
                <div className="text-[10px] font-black uppercase tracking-[0.5em] text-[--text-secondary]">Socials</div>
                <div className="flex gap-10">
                  <a href="https://www.linkedin.com/in/masood-iqbal-38a7321b0/" target="_blank" rel="noopener noreferrer" className="font-bold border-b-2 border-accent/20 hover:border-accent transition-all pb-1 text-xs text-white">LinkedIn</a>
                  <a href="#" className="font-bold border-b-2 border-accent/20 hover:border-accent transition-all pb-1 text-xs text-white">GitHub</a>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-black uppercase tracking-[0.5em] text-[--text-secondary] mb-2">Direct</div>
                <div className="text-lg font-black italic tracking-tight text-white">masoodiqbalxt@gmail.com</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col justify-center items-center px-8 relative pt-32 mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center z-10"
          >
            <div className="badge mb-14 mx-auto shadow-xl shadow-accent/10">Masood Iqbal • I.T Expert</div>
            <h1 className="text-5xl md:text-[7rem] lg:text-[9rem] font-black tracking-tighter leading-[1.1] mb-12 relative z-10 flex flex-col items-center justify-center">
              <motion.span 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative block"
              >
                BUILDING
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gradient drop-shadow-[0_0_25px_rgba(56,189,248,0.4)] block"
              >
                NETWORK
              </motion.span>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.6 }}
                className="italic font-light select-none block text-[--text-secondary] text-3xl md:text-5xl mt-4 max-w-max bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.05)]"
              >
                <span className="text-accent animate-pulse mr-2">_</span>SYNERGY
              </motion.span>
            </h1>

            <p className="text-lg md:text-xl max-w-2xl mx-auto text-[--text-secondary] leading-relaxed font-medium mb-16 text-balance px-4 relative z-10">
              Network Technician at CYBERNET. Architecting resilient fiber environments and optimizing core networks. Powered by industry-leading certifications in advanced networking and hardware diagnostics.
            </p>

            <motion.a
              href="#work"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-14 h-14 rounded-full border border-[--border-primary] flex items-center justify-center mx-auto hover:bg-accent/20 hover:border-accent transition-all backdrop-blur-md relative z-10 group shadow-[0_0_10px_rgba(56,189,248,0.1)]"
            >
              <ArrowDown size={24} className="text-accent group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.8)] transition-all" />
            </motion.a>
          </motion.div>

          {/* Tech-Savvy Background */}
          <motion.div
            style={{ y: backgroundY, opacity: opacityProgress }}
            className="absolute inset-0 flex justify-center items-center -z-10 select-none overflow-hidden"
          >
            {/* Ambient glowing orb */}
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-accent/20 rounded-full blur-[100px] opacity-60" />
            {/* Matrix Grid */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            {/* Huge Background Text */}
            <div className="text-[20vw] md:text-[12vw] font-black tracking-tighter leading-none opacity-5 text-transparent stroke-white" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>
              {"{ INIT }"}
            </div>
          </motion.div>
        </section>

        {/* Bento Grid Board */}
        <section id="work" className="max-w-[1500px] mx-auto section-padding">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12"
          >
            {/* Highlight Card */}
            <motion.div
              whileHover={{ y: -10 }}
              className="md:col-span-8 lg:col-span-7 bento-item group p-0 relative aspect-[14/9] md:aspect-auto md:min-h-[650px] shadow-2xl"
            >
              <Image
                src="minimal_network_node_1773338545985.png"
                alt="Infrastructure"
                fill
                priority
                quality={100}
                sizes="100vw"
                className="object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-10 md:p-16 flex flex-col justify-end">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-12 h-px bg-accent" />
                  <span className="text-xs font-black uppercase tracking-[0.4em] text-accent">Signature Project</span>
                </div>
                <h3 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-none">GE Infinia Hawkeye</h3>
                <p className="text-zinc-300 text-lg max-w-2xl mb-10 leading-relaxed font-medium">Network commissioning for ultra-high-precision medical imaging systems at IDC Islamabad.</p>
                <div className="flex flex-wrap gap-4">
                  <span className="px-5 py-2.5 bg-white/5 rounded-2xl text-[9px] font-black text-white uppercase tracking-[0.2em] border border-white/10 backdrop-blur-md">Healthcare IT</span>
                  <span className="px-5 py-2.5 bg-white/5 rounded-2xl text-[9px] font-black text-white uppercase tracking-[0.2em] border border-white/10 backdrop-blur-md">Network Ops</span>
                </div>
              </div>
            </motion.div>

            {/* Stats Card Cluster */}
            <div className="md:col-span-4 lg:col-span-5 flex flex-col gap-8">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bento-item bg-accent flex flex-col justify-between aspect-square md:aspect-auto flex-1 p-10 shadow-xl shadow-accent/10"
              >
                <Plus className="text-black" size={48} />
                <div>
                  <div className="text-8xl md:text-9xl font-black text-black leading-none mb-2 -ml-2">04+</div>
                  <div className="text-[11px] font-black uppercase tracking-[0.5em] text-black/60">Years of Experience</div>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bento-item bg-[--card-bg] flex flex-col justify-between aspect-square md:aspect-auto flex-1 p-10 shadow-lg"
              >
                <Globe className="text-accent" size={48} />
                <div className="space-y-4 md:space-y-6">
                  <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase">Based in Lahore</h3>
                  <p className="text-sm md:text-base text-[--text-secondary] font-medium leading-relaxed">Delivering reliable connectivity across Pakistan&apos;s major IT infrastructure corridors.</p>
                </div>
              </motion.div>
            </div>

            {/* Skills Arsenal Bento Grid Item */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-12 bento-item bg-[--bg-secondary] shadow-inner mt-4"
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-20">
                <div className="md:w-1/3">
                  <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter leading-[0.9]">TECHNICAL<br />ARSENAL.</h2>
                  <p className="mt-6 text-[--text-secondary] text-base font-medium leading-relaxed">Precision-engineered skills for modern network environments.</p>
                </div>
                <div className="flex-1 flex flex-wrap gap-3">
                  {['Professional Networking', 'IT Business Management', 'Computer Hardware Troubleshooting', 'Telecommunications', 'Optical Fiber', 'Network Testing', 'Fusion Splicing', 'Fiber Optics', 'IT Service Management', 'IT Operations', 'Sales & Marketing'].map((skill) => (
                    <motion.div
                      key={skill}
                      whileHover={{ scale: 1.05, y: -5, backgroundColor: '#38bdf8', color: 'black', borderColor: '#38bdf8' }}
                      className="px-6 py-4 rounded-[1.5rem] bg-[--bg-primary] border border-[--border-primary] text-[11px] md:text-xs font-black uppercase tracking-widest transition-all shadow-sm select-none"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="career" className="section-padding bg-[--bg-secondary]/20 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-8 mb-24 md:mb-32">
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none">CAREER_</h2>
              <div className="flex-1 h-px bg-accent/20" />
            </div>

            <div className="space-y-32 md:space-y-48">
              {[
                {
                  company: 'CYBERNET',
                  role: 'Network Technician',
                  period: '2024 - PRESENT',
                  details: 'Pioneering regional fiber solutions and optimizing backbone network resilience for enterprise-scale clients.'
                },
                {
                  company: 'IMAGINEERING',
                  role: 'IT Expert',
                  period: 'OCT 2022 - NOV 2023',
                  details: 'Pioneering solutions in radiation protection, Gamma Camera Services, and comprehensive IT/DICOM infrastructure.'
                },
                {
                  company: 'CUE CINEMAS',
                  role: 'IT Specialist',
                  period: 'JAN 2021 - OCT 2023',
                  details: 'Spearheaded IT infrastructure, POS ecosystems management, and ensured 100% network uptime for cinematic operations.'
                }
              ].map((job, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-16 group p-8 rounded-[2rem] hover:bg-white/5 transition-all duration-500 hover:border-accent/30 border border-transparent"
                >
                  <div className="text-accent font-black text-xl opacity-20 group-hover:opacity-100 transition-opacity">0{i + 1}</div>
                  <div className="md:w-3/5">
                    <div className="text-[11px] font-black text-accent uppercase tracking-[0.5em] mb-4">{job.period}</div>
                    <h3 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 group-hover:italic transition-all duration-700 tracking-tighter leading-none">{job.company}</h3>
                    <p className="text-xl md:text-2xl text-[--text-secondary] font-medium leading-relaxed max-w-2xl transition-colors">{job.details}</p>
                  </div>
                  <div className="md:w-1/4 pt-4 md:pt-16">
                    <div className="h-0.5 w-10 bg-accent mb-6" />
                    <h4 className="text-lg md:text-xl font-black text-accent uppercase tracking-[0.2em]">{job.role}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="section-padding bg-[--bg-primary] relative">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-8 mb-16 md:mb-24">
              <div className="flex-1 h-px bg-accent/20 hidden md:block" />
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-right">CERTIFICATIONS_</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                { name: 'Professional Networking for Career Growth', issuer: 'HP', date: 'Issued Jul 2025' },
                { name: 'IT for business success', issuer: 'HP', date: 'Issued Jul 2025' },
                { name: 'Network Technician Career Path', issuer: 'Cisco', date: 'Issued May 2024' },
                { name: 'Networking Devices and Initial Configuration', issuer: 'Cisco', date: 'Issued May 2024' },
                { name: 'Networking Basics', issuer: 'Cisco', date: 'Issued Apr 2024' },
                { name: 'Computer Hardware Basics', issuer: 'Cisco', date: 'Issued Apr 2024' },
                { name: 'Fujikura Fusion Splicer', issuer: 'Multitech Smart Solutions', date: 'Issued May 2024' }
              ].map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true, margin: '-50px' }}
                  whileHover={{ y: -5, borderColor: '#38bdf8' }}
                  className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[--text-secondary] mb-3">{cert.date}</div>
                    <h3 className="text-xl md:text-2xl font-bold leading-tight mb-4 group-hover:text-accent transition-colors">{cert.name}</h3>
                  </div>
                  <div className="flex items-center gap-3 mt-8">
                    <div className="w-8 h-px bg-[--border-primary]" />
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">{cert.issuer}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section id="contact" className="py-48 md:py-64 px-8 text-center bg-transparent">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-6xl md:text-9xl lg:text-[11rem] font-black tracking-tighter leading-[0.8] mb-20 italic overflow-hidden">
              LET&apos;S CONNECT <br />
              <span className="not-italic text-gradient">& WORK.</span>
            </h2>

            <div className="flex flex-col md:flex-row gap-10 items-center justify-center mt-20">
              <a
                href="mailto:masoodiqbalxt@gmail.com"
                className="text-4xl md:text-6xl font-black border-b-[10px] border-accent hover:text-accent transition-all pb-3 flex items-center gap-6 group"
              >
                CONTACT
                <ArrowUpRight size={60} className="group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform text-accent" />
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-[--border-primary] py-16 px-10 bg-[--header-bg] backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[--text-secondary]">Masood Iqbal • © 2026</div>
          <div className="flex gap-12">
            <a href="https://www.linkedin.com/in/masood-iqbal-38a7321b0/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-[0.3em] hover:text-accent transition-colors">LinkedIn</a>
            <a href="#" className="text-[10px] font-black uppercase tracking-[0.3em] hover:text-accent transition-colors">GitHub</a>
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">Lahore / Pakistan</div>
        </div>
      </footer>
    </div>
  );
}
