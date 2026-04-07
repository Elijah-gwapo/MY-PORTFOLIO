'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import KineticArchive from './KineticArchive';
import { Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function StackPlayground() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="relative bg-[#0F0F0F] overflow-hidden">
      
      {/* 1. Header Title (Intro) */}
      <div className="h-[60vh] flex flex-col justify-center px-10 md:px-20 bg-[#DEDCD3]">
        <div className="container mx-auto">
          <div className="space-y-6">
            <h2 className="text-7xl md:text-9xl text-display text-[#0F0F0F] leading-none">
              Interactive <br /> <span className="font-serif italic text-blue-600 pl-[10vw]">Masterpiece.</span>
            </h2>
          </div>
        </div>
      </div>

      {/* 2. The Flagship Masterpiece */}
      <div className="relative h-screen w-full bg-[#DEDCD3] overflow-hidden border-t border-black/5">
        <KineticArchive />
      </div>

      {/* Final Outro */}
      <div className="h-[20vh] bg-[#0F0F0F] flex items-center justify-center">
        <div className="flex items-center gap-6 opacity-20">
          <div className="w-12 h-px bg-white"></div>
          <span className="text-meta text-white">SYSTEM_IDLE</span>
          <div className="w-12 h-px bg-white"></div>
        </div>
      </div>
    </section>
  );
}
