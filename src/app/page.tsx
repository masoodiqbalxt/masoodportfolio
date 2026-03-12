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
  Cpu,
  Server,
  Layers,
  Activity
} from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Custom Cursor state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorSize = useMotionValue(24);

  useEffect(() => {
    // Defer state update to avoid cascading renders flagged by linter
    const timer = setTimeout(() => setMounted(true), 0);
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mouseX, mouseY]);

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen theme-transition-base overflow-x-hidden selection:bg-accent selection:text-white">
      <div className="noise-overlay" />

      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent pointer-events-none z-[9999] hidden lg:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: cursorSize,
          height: cursorSize
        }}
      />

      {/* Header - Fixed & Visible on Scroll */}
      <header className={`fixed top-0 w-full z-[90] transition-all duration-500 ${scrolled ? 'py-4 bg-[--header-bg] backdrop-blur-xl border-b border-[--border-primary] shadow-sm' : 'py-8 bg-transparent'}`}>
        <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 group cursor-none"
            onMouseEnter={() => cursorSize.set(60)}
            onMouseLeave={() => cursorSize.set(24)}
          >
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-black text-xs shadow-lg shadow-accent/20">M</div>
            <div className="text-sm font-black tracking-[0.3em] uppercase">IQBAL</div>
          </motion.div>

          <div className="flex items-center gap-8">
            <nav className="hidden lg:flex gap-12">
              {['Work', 'Career', 'Stack'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="nav-link border-b-2 border-transparent hover:border-accent">{item}</a>
              ))}
            </nav>
            <div className="h-6 w-px bg-[--border-primary] hidden lg:block" />
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(true)}
              className="w-12 h-12 rounded-full border border-[--border-primary] flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-all shadow-sm"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[--bg-primary] p-8 md:p-20 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <div className="text-2xl font-black italic tracking-tighter">M.I</div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-16 h-16 rounded-full border border-[--border-primary] flex items-center justify-center hover:rotate-90 transition-transform hover:bg-accent/10"
              >
                <X size={32} />
              </button>
            </div>

            <nav className="flex flex-col gap-8">
              {['Home', 'Work', 'Career', 'Contact'].map((item, i) => (
                <motion.a
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-6xl md:text-[9rem] font-black tracking-tighter hover:text-accent transition-all flex items-center group leading-none"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="opacity-10 text-xl font-bold mr-8 hidden md:block">0{i + 1}</span>
                  {item}
                </motion.a>
              ))}
            </nav>

            <div className="flex flex-col md:flex-row justify-between items-end gap-10">
              <div className="space-y-4">
                <div className="text-[10px] font-black uppercase tracking-[0.5em] text-[--text-secondary]">Socials</div>
                <div className="flex gap-10">
                  <a href="#" className="font-bold border-b-2 border-accent/20 hover:border-accent transition-all pb-1 text-xs">LinkedIn</a>
                  <a href="#" className="font-bold border-b-2 border-accent/20 hover:border-accent transition-all pb-1 text-xs">GitHub</a>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-black uppercase tracking-[0.5em] text-[--text-secondary] mb-2">Direct</div>
                <div className="text-lg font-black italic tracking-tight">masoodiqbalxt@gmail.com</div>
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
            <div className="badge mb-10 mx-auto shadow-xl shadow-accent/10">Masood Iqbal • Infrastructure Expert</div>
            <h1 className="text-6xl md:text-[9rem] lg:text-[11.5rem] font-black tracking-tighter leading-[0.85] mb-12 relative z-10">
              <span className="relative -top-12 md:-top-16 lg:-top-24 block">BUILDING</span>
              <span className="text-gradient">NETWORK</span> <br />
              <span className="italic font-light opacity-30 select-none block mt-[-0.2em]">SYNERGY_</span>
            </h1>

            <p className="text-lg md:text-xl max-w-2xl mx-auto text-[--text-secondary] leading-relaxed font-medium mb-16 text-balance px-4">
              Specializing in robust fiber networks and high-availability IT ecosystems. Delivering technical excellence across Pakistan.
            </p>

            <motion.a
              href="#work"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-14 h-14 rounded-full border border-[--border-primary] flex items-center justify-center mx-auto hover:bg-accent/10 transition-colors backdrop-blur-md"
            >
              <ArrowDown size={24} className="text-accent" />
            </motion.a>
          </motion.div>

          <motion.div
            style={{ y: backgroundY, opacity: opacityProgress }}
            className="absolute inset-0 flex justify-center items-center -z-10 opacity-[0.008] select-none text-[--text-secondary]"
          >
            <div className="text-[38vw] font-black tracking-tighter leading-none">TECH.</div>
          </motion.div>
        </section>

        {/* Bento Grid Board */}
        <section id="work" className="max-w-[1500px] mx-auto section-padding">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            {/* Highlight Card */}
            <motion.div
              whileHover={{ y: -10 }}
              className="md:col-span-8 lg:col-span-7 bento-item group p-0 relative aspect-[14/9] md:aspect-auto md:min-h-[650px] shadow-2xl"
            >
              <Image
                src="/minimal_network_node_1773338545985.png"
                alt="Infrastructure"
                fill
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
              <div className="bento-item bg-accent flex flex-col justify-between aspect-square md:aspect-auto flex-1 p-10 shadow-xl shadow-accent/10">
                <Plus className="text-black" size={48} />
                <div>
                  <div className="text-8xl md:text-9xl font-black text-black leading-none mb-2 -ml-2">04+</div>
                  <div className="text-[11px] font-black uppercase tracking-[0.5em] text-black/60">Years of Experience</div>
                </div>
              </div>
              <div className="bento-item bg-[--card-bg] flex flex-col justify-between aspect-square md:aspect-auto flex-1 p-10 shadow-lg">
                <Globe className="text-accent" size={48} />
                <div className="space-y-4 md:space-y-6">
                  <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase">Based in Lahore</h3>
                  <p className="text-sm md:text-base text-[--text-secondary] font-medium leading-relaxed">Delivering reliable connectivity across Pakistan&apos;s major IT infrastructure corridors.</p>
                </div>
              </div>
            </div>

            {/* Skills Arsenal Bento Grid Item */}
            <motion.div className="md:col-span-12 bento-item bg-[--bg-secondary] shadow-inner mt-4">
              <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-20">
                <div className="md:w-1/3">
                  <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter leading-[0.9]">TECHNICAL<br />ARSENAL.</h2>
                  <p className="mt-6 text-[--text-secondary] text-base font-medium leading-relaxed">Precision-engineered skills for modern network environments.</p>
                </div>
                <div className="flex-1 flex flex-wrap gap-3">
                  {['Fiber Connectivity', 'Cisco IOS Config', 'BGP & OSPF Routing', 'IPv4/v6 Subnetting', 'VLAN Segmenting', 'Hardware Diagnostics', 'Remote Management', 'SLA Target Response'].map((skill) => (
                    <motion.div
                      key={skill}
                      whileHover={{ scale: 1.05, y: -5, backgroundColor: '#38bdf8', color: 'white', borderColor: '#38bdf8' }}
                      className="px-6 py-4 rounded-[1.5rem] bg-[--bg-primary] border border-[--border-primary] text-[11px] md:text-xs font-black uppercase tracking-widest transition-all cursor-none shadow-sm"
                      onMouseEnter={() => cursorSize.set(80)}
                      onMouseLeave={() => cursorSize.set(24)}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
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
                  role: 'IT Support Service',
                  period: '2022 - 2023',
                  details: 'Advanced diagnostics for medical infrastructure systems and high-priority hardware deployment.'
                },
                {
                  company: 'CUE CINEMA',
                  role: 'IT Specialist',
                  period: '2021 - 2022',
                  details: 'POS infrastructure management and ensuring 100% network uptime for CINEMA ticketing ecosystems.'
                }
              ].map((job, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-16 group"
                >
                  <div className="text-accent font-black text-xl opacity-20">0{i + 1}</div>
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
                className="text-4xl md:text-6xl font-black border-b-[10px] border-accent hover:text-accent transition-all pb-3 flex items-center gap-6 group cursor-none"
                onMouseEnter={() => cursorSize.set(130)}
                onMouseLeave={() => cursorSize.set(24)}
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
            <a href="#" className="text-[10px] font-black uppercase tracking-[0.3em] hover:text-accent transition-colors">LinkedIn</a>
            <a href="#" className="text-[10px] font-black uppercase tracking-[0.3em] hover:text-accent transition-colors">GitHub</a>
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">Lahore / Pakistan</div>
        </div>
      </footer>
    </div>
  );
}
