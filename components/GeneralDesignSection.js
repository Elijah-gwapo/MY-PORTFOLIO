'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Box } from 'lucide-react';
import HackerText from './HackerText';

gsap.registerPlugin(ScrollTrigger);

const MOTIVATIONAL_QUOTES = [
  { quote: "If you want to shine like the sun, first burn like the sun.", author: "Abdul Kalam" },
  { quote: "While children are struggling to be unique, the world around them is trying all means to make them look like everybody else.", author: "Abdul Kalam" },
  { quote: "It's a dare. Impossible is potential. Impossible is temporary. Impossible is nothing.", author: "Muhammad Ali" },
  { quote: "When we practice loving kindness and compassion we are the first ones to profit.", author: "Rumi" },
  { quote: "You Were Born To Win, But To Be A Winner, You Must Plan To Win, Prepare To Win, And Expect To Win.", author: "Zig Ziglar" }
];

export default function GeneralDesignSection() {
  const marqueeLeftRef = useRef(null);
  const marqueeRightRef = useRef(null);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    // Infinite Marquee Logic
    gsap.to(marqueeLeftRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1
    });

    gsap.to(marqueeRightRef.current, {
      xPercent: 50,
      ease: "none",
      duration: 20,
      repeat: -1
    });

    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
    }, 6000);

    return () => clearInterval(quoteInterval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#030308]">
      {/* Background large decorative text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 select-none opacity-[0.1]">
        <h2 className="text-[15vw] md:text-[25vw] font-black text-white uppercase tracking-tighter leading-none whitespace-nowrap">
          BEYOND
        </h2>
      </div>
      
      {/* Fixed Split Layout */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Left Side: Inspiration Stage */}
        <div className="w-full lg:w-1/2 bg-[#030308] flex flex-col justify-center px-10 md:px-24 py-20 relative z-10 border-r border-white/5">
          <div className="space-y-12 max-w-2xl mx-auto lg:mx-0">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85]">
                <HackerText text="BEYOND" speed={30} /> <br /> <span className="text-[#38BDF8]"><HackerText text="BOUNDARIES." speed={50} /></span>
              </h2>
            </div>
            
            <div className="min-h-[200px] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuoteIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-8"
                >
                  <p className="text-2xl md:text-4xl font-light text-slate-400 leading-relaxed uppercase tracking-wide">
                    "{MOTIVATIONAL_QUOTES[currentQuoteIndex].quote}"
                  </p>
                  <div className="flex items-center gap-6">
                    <div className="h-px w-12 bg-[#38BDF8]/30"></div>
                    <span className="text-[10px] font-black text-[#38BDF8] uppercase tracking-[0.5em]">
                      // {MOTIVATIONAL_QUOTES[currentQuoteIndex].author}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Quote indicators */}
              <div className="flex gap-3 mt-12">
                {MOTIVATIONAL_QUOTES.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-0.5 transition-all duration-500 ${i === currentQuoteIndex ? 'w-12 bg-[#38BDF8]' : 'w-4 bg-white/10'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Code Terminal Stage */}
        <div className="w-full lg:w-1/2 bg-[#030308] flex items-center justify-center p-10 md:p-20 relative overflow-hidden">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative w-full max-w-lg aspect-[4/3] bg-white/[0.02] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col backdrop-blur-3xl"
          >
            {/* Terminal Header */}
            <div className="h-12 bg-white/[0.02] border-b border-white/5 px-8 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
                <div className="w-2 h-2 rounded-full bg-amber-500/20"></div>
                <div className="w-2 h-2 rounded-full bg-[#38BDF8]/20"></div>
              </div>
              <div className="font-mono text-[8px] text-slate-600 uppercase tracking-widest">Inspiration_Engine.sys</div>
              <div className="w-8"></div>
            </div>

            {/* Code Content */}
            <div className="flex-grow p-10 font-mono text-[10px] md:text-xs leading-relaxed overflow-hidden">
              <div className="flex gap-8 h-full">
                <div className="text-white/5 text-right select-none pr-6 border-r border-white/5 h-full font-bold">
                  {[...Array(14)].map((_, i) => <div key={i}>{(i + 1).toString().padStart(2, '0')}</div>)}
                </div>
                <div className="text-slate-400 overflow-hidden">
                  <div><span className="text-[#38BDF8]">const</span> <span className="text-white">InspirationStage</span> = () ={'>'} {'{'}</div>
                  <div className="pl-4"><span className="text-[#38BDF8]">const</span> [index, setIndex] = <span className="text-white">useState</span>(<span className="text-[#38BDF8]">0</span>);</div>
                  <div className="h-2"></div>
                  <div className="pl-4 opacity-20 italic">// Defining the rotation logic</div>
                  <div className="pl-4"><span className="text-white">useEffect</span>(() ={'>'} {'{'}</div>
                  <div className="pl-8"><span className="text-[#38BDF8]">const</span> timer = <span className="text-white">setInterval</span>(() ={'>'} {'{'}</div>
                  <div className="pl-12">setIndex(i ={'>'} (i + <span className="text-[#38BDF8]">1</span>) % quotes.length);</div>
                  <div className="pl-8">{'}'}, <span className="text-[#38BDF8]">6000</span>);</div>
                  <div className="pl-8"><span className="text-[#38BDF8]">return</span> () ={'>'} <span className="text-white">clearInterval</span>(timer);</div>
                  <div className="pl-4">{'}'}, []);</div>
                  <div className="h-2"></div>
                  <div className="pl-4"><span className="text-[#38BDF8]">return</span> <span className="text-slate-200">quotes</span>[index].<span className="text-white">innovate</span>();</div>
                  <div>{'}'}</div>
                  <div className="flex items-center gap-1 mt-4">
                    <span className="w-2 h-4 bg-[#38BDF8] animate-pulse"></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Terminal Status Bar */}
            <div className="h-10 bg-white/[0.02] border-t border-white/5 px-8 flex items-center justify-between font-mono text-[8px] text-slate-700">
              <div className="flex gap-6">
                <span className="text-[#38BDF8]">UTF-8</span>
                <span>SYSTEM_V2</span>
              </div>
              <div className="flex gap-6">
                <span>Ln 14, Col 28</span>
                <span className="text-emerald-500/40 font-bold uppercase tracking-widest">● Active</span>
              </div>
            </div>
          </motion.div>

          {/* Floating Callout */}
          <div className="absolute top-10 left-10 p-8 flex flex-col gap-2 font-mono text-[8px] font-black text-slate-800 uppercase tracking-widest">
            <span>SYNTAX_MODE: DEVELOPER</span>
            <div className="w-10 h-px bg-[#38BDF8]"></div>
          </div>

        </div>

      </div>

      {/* 2. Kinetic Marquee Section */}
      <div className="h-40 md:h-48 bg-[#030308] flex flex-col justify-center relative overflow-hidden border-y border-white/5">
        
        {/* Row 1: Move Left */}
        <div className="flex whitespace-nowrap">
          <div ref={marqueeLeftRef} className="flex">
            <span className="text-2xl md:text-6xl font-black text-white uppercase tracking-tighter pr-20 flex items-center gap-10">
              ELIJAH ORTEGA <div className="w-2 h-2 bg-[#38BDF8] rounded-full shadow-[0_0_10px_#38BDF8]"></div>
            </span>
            <span className="text-2xl md:text-6xl font-black text-white uppercase tracking-tighter pr-20 flex items-center gap-10">
              ELIJAH ORTEGA <div className="w-2 h-2 bg-[#38BDF8] rounded-full shadow-[0_0_10px_#38BDF8]"></div>
            </span>
            <span className="text-2xl md:text-6xl font-black text-white uppercase tracking-tighter pr-20 flex items-center gap-10">
              ELIJAH ORTEGA <div className="w-2 h-2 bg-[#38BDF8] rounded-full shadow-[0_0_10px_#38BDF8]"></div>
            </span>
          </div>
        </div>

        {/* Row 2: Move Right */}
        <div className="flex whitespace-nowrap mt-4">
          <div ref={marqueeRightRef} className="flex">
            <span className="text-2xl md:text-6xl font-black text-white/10 tracking-tighter pr-20 flex items-center gap-10 uppercase">
              DEVELOPER <div className="w-12 h-px bg-white/5"></div>
            </span>
            <span className="text-2xl md:text-6xl font-black text-white/10 tracking-tighter pr-20 flex items-center gap-10 uppercase">
              DEVELOPER <div className="w-12 h-px bg-white/5"></div>
            </span>
            <span className="text-2xl md:text-6xl font-black text-white/10 tracking-tighter pr-20 flex items-center gap-10 uppercase">
              DEVELOPER <div className="w-12 h-px bg-white/5"></div>
            </span>
          </div>
        </div>

      </div>

    </section>
  );
}
