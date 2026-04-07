'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Cpu, Activity, Zap, Music, Boxes, Command, Eye } from 'lucide-react';
import SampleDesign from './SampleDesign';
import StoryCarousel from './StoryCarousel';
import QuantumCore from './QuantumCore';
import MusicPlayer from './MusicPlayer';
import NeonRunner from './NeonRunner';
import ObsidianCard from './ObsidianCard';

const EXPERIMENTS = [
  {
    id: 'cyber-pet',
    title: 'Cyber Pet UI',
    category: 'INTERACTIVE',
    component: SampleDesign,
    size: 'lg',
    icon: <Activity size={20} />,
    desc: 'Custom physics and state-aware interaction.',
    scale: 0.55
  },
  {
    id: 'story-stream',
    title: 'Story Stream',
    category: 'NARRATIVE',
    component: StoryCarousel,
    size: 'wide',
    icon: <Zap size={20} />,
    desc: 'A horizontal scroll experience.',
    scale: 0.45
  },
  {
    id: 'quantum-core',
    title: 'Quantum Core',
    category: '3D GEOM',
    component: QuantumCore,
    size: 'tall',
    icon: <Boxes size={20} />,
    desc: 'Experimenting with CSS 3D depth.',
    scale: 0.5
  },
  {
    id: 'music-player',
    title: 'Pulse Audio',
    category: 'AUDIO',
    component: MusicPlayer,
    size: 'sm',
    icon: <Music size={20} />,
    desc: 'Reactive sound and visual components.',
    scale: 0.4
  },
  {
    id: 'neon-runner',
    title: 'Neon Runner',
    category: 'MOTION',
    component: NeonRunner,
    size: 'md',
    icon: <Cpu size={20} />,
    desc: 'Fast-paced animation studies.',
    scale: 0.5
  },
  {
    id: 'obsidian-card',
    title: 'Obsidian Design',
    category: 'VISUAL',
    component: ObsidianCard,
    size: 'md',
    icon: <Command size={20} />,
    desc: 'Glassmorphism and dark UI architecture.',
    scale: 0.5
  }
];

const Modal = ({ isOpen, onClose, component: Component, title }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-[#F7F7F9] overflow-y-auto"
      >
        <div className="min-h-screen relative p-6 md:p-12">
          <div className="sticky top-0 w-full flex justify-between items-center z-[210] bg-[#F7F7F9]/80 backdrop-blur-xl border-b border-black/5 pb-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-meta font-black">{title} // SYSTEM_ACTIVE</span>
            </div>
            <button 
              onClick={onClose}
              className="w-12 h-12 rounded-full bg-[#111111] text-white flex items-center justify-center hover:bg-blue-600 transition-all shadow-xl"
            >
              <X size={24} />
            </button>
          </div>
          <div className="container mx-auto">
            <Component />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function BentoPlayground() {
  const [activeID, setActiveID] = useState(null);
  const activeExp = EXPERIMENTS.find(e => e.id === activeID);

  return (
    <section id="playground" className="section-padding bg-[#F7F7F9]">
      <div className="container mx-auto px-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
          <div className="space-y-6">
            <h2 className="text-6xl md:text-8xl text-display text-[#111111]">
              Live <span className="font-serif italic text-blue-600">Previews.</span>
            </h2>
          </div>
          <div className="max-w-sm space-y-4 border-l border-black/10 pl-8">
            <p className="text-slate-500 text-sm uppercase tracking-widest leading-loose text-justify">
              A modular space for testing and previewing interactive UI components and experimental layouts.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Ready to View</span>
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
          {EXPERIMENTS.map((exp) => (
            <motion.div
              key={exp.id}
              whileHover={{ y: -10 }}
              onClick={() => setActiveID(exp.id)}
              className={`
                group relative bg-white border border-black/5 rounded-[3rem] overflow-hidden cursor-pointer hover:shadow-[0_50px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700
                ${exp.size === 'lg' ? 'md:col-span-2 md:row-span-2' : ''}
                ${exp.size === 'wide' ? 'md:col-span-2 md:row-span-1' : ''}
                ${exp.size === 'tall' ? 'md:col-span-1 md:row-span-2' : ''}
                ${exp.size === 'md' ? 'md:col-span-1 md:row-span-1' : ''}
                ${exp.size === 'sm' ? 'md:col-span-1 md:row-span-1' : ''}
              `}
            >
              {/* Live Component Preview */}
              <div className="absolute inset-0 z-0 flex items-center justify-center opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 origin-center pointer-events-none grayscale-[0.5] group-hover:grayscale-0 bg-slate-50/50">
                <div style={{ 
                  transform: `scale(${exp.scale})`,
                  width: '1200px', 
                  height: '1000px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  <exp.component />
                </div>
              </div>

              {/* Minimal Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/10 to-transparent group-hover:from-white/40 transition-all duration-700 z-10"></div>

              {/* UI Badges */}
              <div className="absolute top-8 right-8 z-20 flex flex-col items-end gap-3">
                <div className="bg-[#111111] text-white px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <Eye size={10} className="text-blue-500" />
                  Inspect Logic
                </div>
              </div>

              {/* Information Content */}
              <div className="h-full flex flex-col justify-between relative z-20 p-10">
                <div className="flex justify-between items-start">
                  <div className="p-4 bg-[#111111] rounded-2xl text-white group-hover:bg-blue-600 transition-all duration-500 shadow-xl group-hover:scale-110">
                    {exp.icon}
                  </div>
                  <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all shadow-sm">
                    <Maximize2 size={18} className="text-black/20 group-hover:text-black transition-colors" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">{exp.category}</span>
                    <div className="w-1 h-1 bg-blue-600/30 rounded-full"></div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">v2.0</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif italic text-[#111111] leading-none">{exp.title}</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-500">{exp.desc}</p>
                </div>
              </div>

              {/* Interactive Progress Line */}
              <div className="absolute bottom-0 left-0 w-0 h-2 bg-blue-600 group-hover:w-full transition-all duration-1000 ease-out z-30"></div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Modal */}
      <Modal 
        isOpen={!!activeID} 
        onClose={() => setActiveID(null)} 
        component={activeExp?.component || (() => null)} 
        title={activeExp?.title}
      />
    </section>
  );
}
