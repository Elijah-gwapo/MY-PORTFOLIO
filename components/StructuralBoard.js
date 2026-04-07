'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, Layers, Grid, Crosshair } from 'lucide-react';
import gsap from 'gsap';

export default function StructuralBoard() {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const marqueeLeftRef = useRef(null);
  const marqueeRightRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    // Infinite Marquee Animation
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

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full min-h-[80vh] bg-[#DEDCD3] flex items-center justify-center p-10 md:p-20 relative overflow-hidden border-y border-black/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* INFINITE MOVING TYPOGRAPHY BACKGROUND */}
      <div className="absolute inset-0 z-0 flex flex-col justify-center gap-0 pointer-events-none select-none opacity-[0.03]">
        <div ref={marqueeLeftRef} className="flex whitespace-nowrap">
          <span className="text-[25vw] font-black uppercase pr-20">SYSTEM_ARCHITECT SYSTEM_ARCHITECT</span>
          <span className="text-[25vw] font-black uppercase pr-20">SYSTEM_ARCHITECT SYSTEM_ARCHITECT</span>
        </div>
        <div ref={marqueeRightRef} className="flex whitespace-nowrap -mt-[10vw]">
          <span className="text-[25vw] font-serif italic text-blue-600 pr-20">Precision_Logic Precision_Logic</span>
          <span className="text-[25vw] font-serif italic text-blue-600 pr-20">Precision_Logic Precision_Logic</span>
        </div>
      </div>

      <div className="container mx-auto relative z-10 grid lg:grid-cols-12 gap-20 items-center">
        
        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-blue-600">
              <Grid size={16} />
              <span className="text-meta">UI_SURFACE_STUDY</span>
            </div>
            <h3 className="text-5xl md:text-7xl text-display text-[#0F0F0F]">
              Structural <br /> <span className="font-serif italic text-blue-600">Board.</span>
            </h3>
          </div>
          <p className="text-xl md:text-2xl font-light text-slate-600 leading-relaxed max-w-lg uppercase tracking-tighter">
            Analyzing the underlying geometry of high-fidelity surfaces. Hover to deconstruct.
          </p>
        </div>

        {/* The Interactive Board */}
        <div className="lg:col-span-7 relative">
          <div className="relative aspect-[16/10] w-full bg-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden">
            
            <div className="absolute inset-0 bg-slate-50 flex flex-col p-12 space-y-8">
              <div className="w-20 h-2 bg-black/10 rounded-full"></div>
              <div className="w-full h-px bg-black/5"></div>
              <div className="grid grid-cols-3 gap-8 h-full opacity-20">
                <div className="bg-slate-200 rounded-2xl"></div>
                <div className="bg-slate-200 rounded-2xl"></div>
                <div className="bg-slate-200 rounded-2xl"></div>
              </div>
            </div>

            <AnimatePresence>
              {isHovered && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 bg-blue-600/5 backdrop-blur-[2px]"
                >
                  <div className="absolute inset-0 border-x-[40px] border-y-[40px] border-blue-600/10"></div>
                  <div className="absolute top-1/2 left-0 w-full h-px bg-blue-600/30"></div>
                  <div className="absolute left-1/2 top-0 w-px h-full bg-blue-600/30"></div>
                  <div className="absolute bottom-12 left-12 bg-blue-600 text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl">
                    GRID_ACTIVE_0x1
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!isHovered && (
              <div className="absolute inset-0 z-30 flex items-center justify-center">
                <div className="bg-white/80 backdrop-blur-md px-10 py-6 rounded-full shadow-xl flex items-center gap-4">
                  <Ruler size={20} className="text-blue-600" />
                  <span className="text-meta">ANALYZE STRUCTURE</span>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
