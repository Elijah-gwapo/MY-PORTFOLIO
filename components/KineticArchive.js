'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import { MousePointer2, MoveRight, Layers, Activity, Grid } from 'lucide-react';

export default function KineticArchive() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Magnetic displacement logic using quickTo for performance
      const xTo = gsap.quickTo(textRef.current, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(textRef.current, "y", { duration: 0.6, ease: "power3" });
      
      const imgXTo = gsap.quickTo(imageRef.current, "x", { duration: 0.8, ease: "power3" });
      const imgYTo = gsap.quickTo(imageRef.current, "y", { duration: 0.8, ease: "power3" });

      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        // Calculate displacement
        const xMove = (clientX / innerWidth - 0.5) * 60;
        const yMove = (clientY / innerHeight - 0.5) * 60;
        
        xTo(xMove);
        yTo(yMove);
        
        imgXTo(xMove * -0.5);
        imgYTo(yMove * -0.5);
      };

      window.addEventListener("mousemove", handleMouseMove);
      
      // Text reveal animation
      gsap.from(".reveal-text", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.5
      });

      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full bg-[#DEDCD3] flex items-center justify-center p-10 md:p-24 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Technical Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.05]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,15,15,0.2)_1px,transparent_1px),linear-gradient(rgba(15,15,15,0.2)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="container mx-auto relative z-10 grid lg:grid-cols-12 gap-20 items-center">
        
        {/* Massive Magnetic Typography */}
        <div className="lg:col-span-6 relative z-20">
          <div ref={textRef} className="space-y-8 select-none pointer-events-none">
            <div className="overflow-hidden">
              <span className="reveal-text block text-meta text-blue-600 mb-4">SYSTEM_EXPERIMENTAL_V2</span>
            </div>
            <div className="overflow-hidden">
              <h2 className="reveal-text text-7xl md:text-[10vw] text-display leading-[0.8] text-[#0F0F0F]">
                KINETIC <br />
                <span className="font-serif italic text-blue-600">ARCHIVE.</span>
              </h2>
            </div>
            <div className="overflow-hidden pt-8">
              <p className="reveal-text text-xl md:text-3xl font-light text-slate-600 leading-relaxed max-w-md uppercase tracking-tighter">
                Exploring the **physics of digital surfaces** through elastic motion and structural transparency.
              </p>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="pt-16 flex items-center gap-10"
          >
            <button className="text-meta border-b-2 border-blue-600 pb-2 hover:text-blue-600 transition-colors">INITIALIZE_SEQUENCE</button>
            <div className="flex items-center gap-4 text-slate-400">
              <Activity size={14} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest">LIVE_CORE_ACTIVE</span>
            </div>
          </motion.div>
        </div>

        {/* The Distorted Image Plane */}
        <div className="lg:col-span-6 relative">
          <div 
            className="relative aspect-[3/4] w-full max-w-lg ml-auto overflow-hidden rounded-[4rem] shadow-[0_80px_120px_-30px_rgba(0,0,0,0.2)] bg-white group"
          >
            <div ref={imageRef} className="absolute inset-0 w-full h-[120%] -top-[10%] scale-110 group-hover:scale-100 transition-transform duration-[2000ms] ease-out">
              <Image 
                src="/bw-elijah.png" 
                alt="Experimental Surface" 
                fill
                className="object-cover grayscale brightness-[0.9] contrast-[1.1]"
              />
            </div>
            
            {/* Dynamic UI Overlay */}
            <div className="absolute inset-0 z-20 p-12 flex flex-col justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <Grid size={20} />
                </div>
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  <span className="text-[8px] font-black text-white uppercase tracking-widest">X_COORD_SYNC</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="h-px w-full bg-white/20"></div>
                <div className="flex justify-between items-center text-white">
                  <span className="text-[10px] font-black uppercase tracking-widest">Architectural_Node</span>
                  <span className="text-[10px] font-mono">0x420_EO</span>
                </div>
              </div>
            </div>

            {/* Interaction Hint */}
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
              <motion.div 
                animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? 20 : 0 }}
                className="bg-[#0F0F0F] text-white px-10 py-6 rounded-full shadow-2xl flex items-center gap-6"
              >
                <MousePointer2 size={24} className="text-blue-500 animate-bounce" />
                <span className="text-meta">INTERACT WITH SURFACE</span>
              </motion.div>
            </div>
          </div>

          {/* Floating Background Element */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 border border-blue-600/10 rounded-full animate-spin-slow"></div>
        </div>

      </div>
    </div>
  );
}
