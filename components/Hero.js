'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, Shield, Zap, Code2 } from 'lucide-react';
import MagneticButton from './MagneticButton';
import HackerText from './HackerText';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TechNode = ({ delay, x, y }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.1, 0.4, 0.1], 
      scale: [1, 1.5, 1],
      x: [0, 15, 0],
      y: [0, -15, 0]
    }}
    transition={{ 
      duration: 5 + Math.random() * 3, 
      repeat: Infinity, 
      delay 
    }}
    className="absolute w-1 h-1 bg-blue-500 rounded-full"
    style={{ left: `${x}%`, top: `${y}%`, boxShadow: '0 0 15px #3b82f6' }}
  />
);

export default function Hero() {
  const bgRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Parallax effect for the background image
    gsap.to(bgRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Parallax effect for the large background text
    gsap.to(textRef.current, {
      xPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 30;
    const y = (clientY / innerHeight - 0.5) * 30;
    setMousePos({ x, y });
  };

  return (
    <section 
      id="home" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="pt-32 pb-20 min-h-screen flex items-center bg-[#030308] relative overflow-hidden bg-grid"
    >
      {/* Background Profile Image */}
      <div 
        ref={bgRef} 
        className="absolute right-0 top-0 w-full h-[120%] md:w-[65%] opacity-40 md:opacity-70 pointer-events-none select-none overflow-hidden"
        style={{ transform: `translate(${mousePos.x * -0.6}px, ${mousePos.y * -0.6}px)` }}
      >
        <div className="relative w-full h-full">
          <Image 
            src="/bw-elijah.png" 
            alt="Elijah Alrhoy Ortega Background" 
            fill
            className="object-cover object-[right_45%] scale-110 grayscale brightness-75"
            style={{ clipPath: 'inset(0 0 8% 0)' }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030308] via-[#030308]/50 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#030308] via-transparent to-transparent z-10"></div>
        </div>
      </div>

      {/* Tech Nodes / Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <TechNode key={i} delay={i * 0.4} x={Math.random() * 100} y={Math.random() * 100} />
        ))}
      </div>

      {/* Large background decorative text */}
      <div className="absolute -bottom-10 -left-10 pointer-events-none z-0">
        <h2 ref={textRef} className="text-[20vw] font-black text-white/[0.03] uppercase tracking-tighter leading-none select-none">
          DEVELOPER
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-40">
        <div className="flex flex-col items-start max-w-4xl">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px w-12 bg-blue-500/50"></div>
            <span className="text-blue-500 font-black tracking-[0.4em] uppercase text-[10px] flex items-center gap-2">
              <Code2 size={14} className="animate-pulse" />
              Web Developer & Engineer
            </span>
          </motion.div>

          <div className="mb-10">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-9xl lg:text-[11rem] font-black text-white tracking-tighter leading-[0.8] uppercase"
            >
              <HackerText text="ELIJAH" className="block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-400 to-slate-700">
                <HackerText text="ORTEGA" />
              </span>
              <span className="text-blue-600">.</span>
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-3xl text-slate-400 max-w-2xl leading-relaxed mb-16 font-light"
          >
            Transforming complex ideas into <span className="text-white font-medium italic underline underline-offset-8 decoration-blue-600/50">High-Performance</span> web applications through modern engineering.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap items-center gap-8"
          >
            <MagneticButton>
              <a 
                href="/resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black tracking-widest rounded-full transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:scale-105 active:scale-95 uppercase text-xs border border-white/10"
              >
                <Shield size={18} /> 
                View Resume
              </a>
            </MagneticButton>

            <MagneticButton>
              <Link 
                href="#projects" 
                className="group flex items-center gap-4 text-white hover:text-blue-400 transition-all duration-300"
              >
                <span className="text-xl font-bold tracking-widest uppercase border-b-2 border-white/10 group-hover:border-blue-400/50 pb-1">Projects</span>
                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-400 group-hover:bg-blue-400/10 transition-all shadow-xl">
                  <ArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Floating Status Bar */}
      <div className="absolute bottom-12 left-12 hidden lg:flex items-center gap-8 opacity-40">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Stack.Active</span>
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-slate-700 rounded-full"></div>
            <div className="w-2 h-2 bg-slate-700 rounded-full"></div>
          </div>
        </div>
        <div className="h-8 w-px bg-white/10"></div>
        <div className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">Based in Cebu, PH</div>
      </div>
    </section>
  );
}
