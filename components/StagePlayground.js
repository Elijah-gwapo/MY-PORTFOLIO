'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SampleDesign from './SampleDesign';
import StoryCarousel from './StoryCarousel';
import QuantumCore from './QuantumCore';
import MusicPlayer from './MusicPlayer';
import NeonRunner from './NeonRunner';
import ObsidianCard from './ObsidianCard';
import { ChevronRight, ChevronLeft, Layers, Compass } from 'lucide-react';

const EXPERIMENTS = [
  {
    id: 'cyber-pet',
    title: 'Cyber Pet',
    category: 'ANIMATED LOGIC',
    component: SampleDesign,
    year: '2026'
  },
  {
    id: 'story-stream',
    title: 'Story Stream',
    category: 'NARRATIVE',
    component: StoryCarousel,
    year: '2025'
  },
  {
    id: 'quantum-core',
    title: 'Quantum Core',
    category: '3D GEOMETRY',
    component: QuantumCore,
    year: '2025'
  },
  {
    id: 'music-player',
    title: 'Pulse Audio',
    category: 'INTERACTIVE',
    component: MusicPlayer,
    year: '2026'
  },
  {
    id: 'neon-runner',
    title: 'Neon Runner',
    category: 'ANIMATION',
    component: NeonRunner,
    year: '2025'
  },
  {
    id: 'obsidian-card',
    title: 'Obsidian UI',
    category: 'VISUAL DESIGN',
    component: ObsidianCard,
    year: '2024'
  }
];

export default function StagePlayground() {
  const [index, setIndex] = useState(0);
  const active = EXPERIMENTS[index];

  const next = () => setIndex((index + 1) % EXPERIMENTS.length);
  const prev = () => setIndex((index - 1 + EXPERIMENTS.length) % EXPERIMENTS.length);

  return (
    <section id="playground" className="min-h-screen bg-[#F7F7F9] py-20 overflow-hidden flex flex-col">
      <div className="container mx-auto px-10 mb-12 flex justify-between items-end">
        <div className="space-y-4">
          <h2 className="text-5xl md:text-7xl text-display text-[#111111]">
            Technical <span className="font-serif italic text-blue-600">Exhibition.</span>
          </h2>
        </div>
        
        <div className="flex items-center gap-10">
          <button onClick={prev} className="group flex items-center gap-4 text-meta hover:text-blue-600 transition-colors">
            <ChevronLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
            PREVIOUS
          </button>
          <div className="h-px w-12 bg-black/10"></div>
          <button onClick={next} className="group flex items-center gap-4 text-meta hover:text-blue-600 transition-colors">
            NEXT
            <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>

      {/* The Central Stage */}
      <div className="flex-grow w-full px-6 md:px-20 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
            className="w-full h-[75vh] bg-white rounded-[4rem] border border-black/5 shadow-[0_80px_120px_-20px_rgba(0,0,0,0.08)] overflow-hidden relative"
          >
            {/* Meta Info Overlay */}
            <div className="absolute top-10 left-10 z-50 flex flex-col gap-2">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{active.category}</span>
              <h3 className="text-3xl font-serif italic text-[#111111]">{active.title}</h3>
            </div>

            <div className="absolute top-10 right-10 z-50 text-right">
              <span className="text-[8vw] font-serif italic text-black/[0.03] leading-none select-none">0{index + 1}</span>
            </div>

            {/* Interactive Component Stage */}
            <div className="w-full h-full overflow-y-auto custom-scrollbar pt-20">
              <active.component />
            </div>

            {/* Bottom Status */}
            <div className="absolute bottom-10 left-10 z-50 flex items-center gap-6">
              <div className="flex items-center gap-3">
                <Compass size={14} className="text-blue-500 animate-spin-slow" />
                <span className="text-meta text-slate-400">READY_FOR_INTERACTION</span>
              </div>
              <div className="h-px w-8 bg-black/10"></div>
              <span className="text-[10px] font-black text-slate-300">CURATED // {active.year}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Background large decorative letter */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.01]">
        <h2 className="text-[50vw] font-serif italic leading-none">{active.title[0]}</h2>
      </div>
    </section>
  );
}
