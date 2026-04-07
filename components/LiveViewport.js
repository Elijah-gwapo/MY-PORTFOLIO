'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SampleDesign from './SampleDesign';
import StoryCarousel from './StoryCarousel';
import QuantumCore from './QuantumCore';
import { Cpu, Terminal, Layers, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const UI_COMPONENTS = {
  CYBER_PET: SampleDesign,
  STORY_STREAM: StoryCarousel,
  QUANTUM_CORE: QuantumCore
};

export default function LiveViewport() {
  const [activeID, setActiveID] = useState('CYBER_PET');
  const containerRef = useRef(null);
  const viewportRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create ScrollTriggers for each narrative section
      const sections = ['#narrative-1', '#narrative-2', '#narrative-3'];
      const ids = ['CYBER_PET', 'STORY_STREAM', 'QUANTUM_CORE'];

      sections.forEach((selector, index) => {
        ScrollTrigger.create({
          trigger: selector,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveID(ids[index]),
          onEnterBack: () => setActiveID(ids[index]),
        });
      });

      // Pin the viewport container
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: viewportRef.current,
        pinSpacing: false,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const ActiveComponent = UI_COMPONENTS[activeID];

  return (
    <section ref={containerRef} className="relative bg-[#F7F7F9] min-h-[300vh]">
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Left Side: Fixed Interactive Viewport */}
        <div ref={viewportRef} className="w-full lg:w-1/2 h-[50vh] lg:h-screen sticky top-0 bg-[#111111] overflow-hidden border-r border-white/5">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          </div>

          {/* Viewport Header */}
          <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black text-white uppercase tracking-[0.5em]">Live_Stream // {activeID}</span>
            </div>
            <div className="flex items-center gap-6 opacity-40">
              <Activity size={14} className="text-blue-500" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">FPS: 60.0</span>
            </div>
          </div>

          {/* Component Container */}
          <div className="relative w-full h-full flex items-center justify-center p-4 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeID}
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
                className="w-full h-full rounded-[2rem] overflow-hidden bg-[#030308] border border-white/10 shadow-2xl relative"
              >
                <div className="absolute inset-0 z-50 pointer-events-none border-[20px] border-[#111111] rounded-[2rem]"></div>
                <div className="w-full h-full transform scale-[0.85] lg:scale-100 origin-center">
                  <ActiveComponent />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Viewport Decoration */}
          <div className="absolute bottom-8 left-8 flex items-center gap-4 opacity-30">
            <Terminal size={14} className="text-white" />
            <span className="text-[8px] font-mono text-white tracking-widest uppercase">Kernel_Ready_v2.0.26</span>
          </div>
        </div>

        {/* Right Side: Scrollable Technical Narrative */}
        <div className="w-full lg:w-1/2 px-10 md:px-24 py-40 space-y-[60vh]">
          
          {/* Narrative 1 */}
          <div id="narrative-1" className="min-h-[40vh] flex flex-col justify-center">
            <div className="space-y-8">
              <div className="flex items-center gap-4 text-blue-600">
                <span className="text-meta">EXPERIMENT 01</span>
                <div className="h-px w-12 bg-blue-600/20"></div>
              </div>
              <h2 className="text-6xl md:text-8xl text-display text-[#111111]">
                Reactive <br /> <span className="font-serif italic text-blue-600">Cognition.</span>
              </h2>
              <p className="text-xl md:text-2xl font-light text-slate-500 leading-relaxed max-w-lg">
                The Cyber Pet login system explores **state-aware UI physics**. It bridges the gap between functional security and character-driven interaction.
              </p>
              <div className="pt-10 flex flex-wrap gap-4">
                <span className="px-6 py-2 bg-white border border-black/5 rounded-full text-[10px] font-black uppercase tracking-widest">Framer Motion</span>
                <span className="px-6 py-2 bg-white border border-black/5 rounded-full text-[10px] font-black uppercase tracking-widest">SVG Physics</span>
              </div>
            </div>
          </div>

          {/* Narrative 2 */}
          <div id="narrative-2" className="min-h-[40vh] flex flex-col justify-center">
            <div className="space-y-8">
              <div className="flex items-center gap-4 text-blue-600">
                <span className="text-meta">EXPERIMENT 02</span>
                <div className="h-px w-12 bg-blue-600/20"></div>
              </div>
              <h2 className="text-6xl md:text-8xl text-display text-[#111111]">
                Linear <br /> <span className="font-serif italic text-blue-600">Dynamics.</span>
              </h2>
              <p className="text-xl md:text-2xl font-light text-slate-500 leading-relaxed max-w-lg">
                A horizontal storytelling engine powered by **GSAP ScrollTrigger**. Designed for editorial precision and cinematic flow in high-end catalogs.
              </p>
              <div className="pt-10 flex flex-wrap gap-4">
                <span className="px-6 py-2 bg-white border border-black/5 rounded-full text-[10px] font-black uppercase tracking-widest">GSAP v3</span>
                <span className="px-6 py-2 bg-white border border-black/5 rounded-full text-[10px] font-black uppercase tracking-widest">Pinning Logic</span>
              </div>
            </div>
          </div>

          {/* Narrative 3 */}
          <div id="narrative-3" className="min-h-[40vh] flex flex-col justify-center pb-40">
            <div className="space-y-8">
              <div className="flex items-center gap-4 text-blue-600">
                <span className="text-meta">EXPERIMENT 03</span>
                <div className="h-px w-12 bg-blue-600/20"></div>
              </div>
              <h2 className="text-6xl md:text-8xl text-display text-[#111111]">
                Spatial <br /> <span className="font-serif italic text-blue-600">Architecture.</span>
              </h2>
              <p className="text-xl md:text-2xl font-light text-slate-500 leading-relaxed max-w-lg">
                Pushing the limits of **CSS 3D Transforms** to create a navigational core that responds to multidimensional user input without WebGL.
              </p>
              <div className="pt-10 flex flex-wrap gap-4">
                <span className="px-6 py-2 bg-white border border-black/5 rounded-full text-[10px] font-black uppercase tracking-widest">3D Transforms</span>
                <span className="px-6 py-2 bg-white border border-black/5 rounded-full text-[10px] font-black uppercase tracking-widest">Performance</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
