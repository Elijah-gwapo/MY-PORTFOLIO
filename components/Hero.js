'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HackerText from './HackerText';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Textback Parallax (Adjusted for upward motion)
      gsap.to(".hero-textback", {
        yPercent: -10,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // 2. Pin and Fade Effect
      gsap.to(".hero-main-content", {
        opacity: 0,
        y: -50,
        scale: 0.95,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false
      });

      // 3. Floating Scroll Indicator
      gsap.to(scrollRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex items-center bg-[#030308] overflow-hidden px-6 md:px-20 z-0"
    >
      {/* Textback Integration (Unboxed Background) */}
      <div className="absolute inset-0 pointer-events-none z-10 flex justify-end">
        <div className="relative w-full lg:w-2/3 h-full">
          {/* Internal Textback Layer (Positioned at Bottom) */}
          <div className="absolute inset-x-0 bottom-10 flex justify-center opacity-[0.15] z-0">
            <h2 className="text-[18vw] md:text-[12vw] font-black text-[#38BDF8] uppercase tracking-tighter leading-none whitespace-nowrap select-none">
              STAY FOCUSED
            </h2>
          </div>

          <Image 
            src="/bw-elijah.png" 
            alt="Elijah Ortega Textback" 
            fill
            className="hero-textback object-cover object-[center_25%] grayscale mix-blend-luminosity opacity-60 brightness-110 z-10"
            priority
          />
          {/* Advanced Gradient Masking */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030308] via-[#030308]/20 to-transparent z-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#030308] via-transparent to-transparent opacity-60 z-20"></div>
        </div>
      </div>

      <div className="container mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-20 pt-32 lg:pt-20 hero-main-content">
        
        {/* Left Side: Editorial Typography */}
        <div ref={textRef} className="lg:col-span-8 space-y-8 md:space-y-12">
          <div className="space-y-4">
            <span className="hero-meta block text-[10px] font-black text-[#38BDF8] uppercase tracking-[0.8em]">
              DEVELOPER
            </span>
            
            <h1 className="text-[14vw] md:text-[10vw] font-black tracking-tighter leading-[0.85] text-white uppercase select-none">
              <div className="overflow-hidden">
                <HackerText text="ELIJAH" speed={40} delay={4500} />
              </div>
              <div className="overflow-hidden">
                <span className="text-[#38BDF8]"><HackerText text="ORTEGA." speed={60} delay={4700} /></span>
              </div>
            </h1>
          </div>

          <div className="hero-desc space-y-6 md:space-y-8 pt-6 md:pt-8 border-l border-white/10 pl-6 md:pl-8">
            <p className="text-slate-400 text-lg md:text-2xl font-light max-w-lg leading-relaxed uppercase tracking-tighter">
              Building <span className="text-white">High-Performance Applications</span> <br />
              with a focus on clean logic, <br />
              architecture, and interaction.
            </p>
            
            <div className="flex gap-8 md:gap-12 pt-4">
              <button className="group text-[10px] font-black text-white uppercase tracking-[0.4em] flex items-center gap-4 transition-all hover:gap-6">
                VIEW ARCHIVE
                <div className="w-8 h-px bg-[#38BDF8]"></div>
              </button>

              <a 
                href="/eaortega-resume.pdf" 
                download="Elijah_Ortega_Resume.pdf"
                className="group text-[10px] font-black text-[#38BDF8] uppercase tracking-[0.4em] flex items-center gap-4 transition-all hover:gap-6"
              >
                DOWNLOAD RESUME
                <div className="w-8 h-px bg-white"></div>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Floating Scroll Indicator */}
      <div 
        ref={scrollRef}
        className="absolute bottom-12 left-6 md:left-20 flex flex-col items-start gap-4 z-20"
      >
        <span className="text-[8px] font-black text-slate-700 uppercase tracking-[0.5em] [writing-mode:vertical-lr]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#38BDF8] to-transparent"></div>
      </div>

      {/* Background Atmosphere */}
      <div className="absolute top-1/2 left-0 w-[50vw] h-[50vw] bg-[#38BDF8]/5 bg-[#38BDF8]/5 rounded-full blur-[150px] pointer-events-none -translate-x-1/2"></div>
    </section>
  );
}
