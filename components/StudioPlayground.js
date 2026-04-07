'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Activity, Zap, Music, Boxes, Command, ChevronRight, ChevronLeft, Layout } from 'lucide-react';
import SampleDesign from './SampleDesign';
import StoryCarousel from './StoryCarousel';
import QuantumCore from './QuantumCore';
import MusicPlayer from './MusicPlayer';
import NeonRunner from './NeonRunner';
import ObsidianCard from './ObsidianCard';

const EXPERIMENTS = [
  {
    id: 'cyber-pet',
    title: 'Cyber Pet',
    category: 'ANIMATED LOGIC',
    component: SampleDesign,
    icon: <Activity size={18} />,
    desc: 'State-aware character physics.'
  },
  {
    id: 'story-stream',
    title: 'Story Stream',
    category: 'NARRATIVE',
    component: StoryCarousel,
    icon: <Zap size={18} />,
    desc: 'Cinematic horizontal navigation.'
  },
  {
    id: 'quantum-core',
    title: 'Quantum Core',
    category: '3D GEOMETRY',
    component: QuantumCore,
    icon: <Boxes size={18} />,
    desc: 'CSS 3D multidimensional nav.'
  },
  {
    id: 'music-player',
    title: 'Pulse Audio',
    category: 'INTERACTIVE',
    component: MusicPlayer,
    icon: <Music size={18} />,
    desc: 'Reactive sound architectures.'
  },
  {
    id: 'neon-runner',
    title: 'Neon Runner',
    category: 'ANIMATION',
    component: NeonRunner,
    icon: <Cpu size={18} />,
    desc: 'High-frequency motion engine.'
  },
  {
    id: 'obsidian-card',
    title: 'Obsidian UI',
    category: 'VISUAL DESIGN',
    component: ObsidianCard,
    icon: <Command size={18} />,
    desc: 'Minimalist surface architecture.'
  }
];

export default function StudioPlayground() {
  const [activeID, setActiveID] = useState('cyber-pet');
  const activeExp = EXPERIMENTS.find(e => e.id === activeID);

  return (
    <section id="playground" className="section-padding bg-[#111111] text-white">
      <div className="container mx-auto px-10">
        
        {/* Studio Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
          <div className="space-y-6">
            <h2 className="text-6xl md:text-8xl text-display text-white">
              Experimental <span className="font-serif italic text-blue-500 pl-4">Studio.</span>
            </h2>
          </div>
          <div className="max-w-sm space-y-4 border-l border-white/10 pl-8 pb-4">
            <p className="text-slate-400 text-sm uppercase tracking-widest leading-loose">
              A high-fidelity cinematic viewport for exploring real-time interface experiments and code logic.
            </p>
          </div>
        </div>

        {/* Massive Studio Viewport */}
        <div className="relative w-full aspect-video md:h-[80vh] bg-[#030308] rounded-[3rem] overflow-hidden shadow-[0_100px_150px_-50px_rgba(0,0,0,0.7)] border border-white/5 group">
          
          {/* Viewport Status Bar */}
          <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest">System_Live</span>
              </div>
              <div className="h-px w-12 bg-white/10"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">{activeExp.category}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-40">RES: 1920x1080</span>
            </div>
          </div>

          {/* THE LIVE STAGE */}
          <div className="w-full h-full relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeID}
                initial={{ opacity: 0, filter: 'blur(20px)', scale: 0.98 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.02 }}
                transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
                className="w-full h-full flex items-center justify-center bg-[#F7F7F9]"
              >
                {/* Mount the actual interactive component */}
                <div className="w-full h-full overflow-y-auto custom-scrollbar">
                  <activeExp.component />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Floating Info Overlay */}
          <div className="absolute bottom-10 left-10 z-50 pointer-events-none">
            <motion.div
              key={activeID}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-[#111111]/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 max-w-xs space-y-2 shadow-2xl"
            >
              <h3 className="text-2xl font-serif italic text-white">{activeExp.title}</h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                {activeExp.desc}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Sleek Interactive Dock */}
        <div className="mt-12 flex justify-center">
          <div className="bg-[#111111] border border-white/5 p-3 rounded-[2.5rem] flex items-center gap-3 shadow-2xl overflow-x-auto max-w-full no-scrollbar">
            {EXPERIMENTS.map((exp) => (
              <button
                key={exp.id}
                onClick={() => setActiveID(exp.id)}
                className={`
                  relative flex items-center gap-4 px-6 py-4 rounded-full transition-all duration-500 group whitespace-nowrap
                  ${activeID === exp.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'}
                `}
              >
                <div className={`${activeID === exp.id ? 'text-white' : 'text-blue-500'} transition-colors`}>
                  {exp.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {exp.title}
                </span>
                
                {activeID === exp.id && (
                  <motion.div
                    layoutId="active-dock-pill"
                    className="absolute inset-0 bg-blue-600 rounded-full -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
