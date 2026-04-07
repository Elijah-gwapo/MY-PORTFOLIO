'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Cpu, Activity, Zap, Music, Boxes, Command, Grid } from 'lucide-react';
import HackerText from './HackerText';
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
    category: 'INTERACTIVE',
    component: SampleDesign,
    icon: <Activity size={18} />,
    scale: 0.55
  },
  {
    id: 'story-stream',
    title: 'Story Stream',
    category: 'NARRATIVE',
    component: StoryCarousel,
    icon: <Zap size={18} />,
    scale: 0.45
  },
  {
    id: 'quantum-core',
    title: 'Quantum Core',
    category: '3D GEOM',
    component: QuantumCore,
    icon: <Boxes size={18} />,
    scale: 0.5
  },
  {
    id: 'music-player',
    title: 'Pulse Audio',
    category: 'AUDIO',
    component: MusicPlayer,
    icon: <Music size={18} />,
    scale: 0.4
  },
  {
    id: 'neon-runner',
    title: 'Neon Runner',
    category: 'MOTION',
    component: NeonRunner,
    icon: <Cpu size={18} />,
    scale: 0.5
  },
  {
    id: 'obsidian-card',
    title: 'Obsidian UI',
    category: 'VISUAL',
    component: ObsidianCard,
    icon: <Command size={18} />,
    scale: 0.5
  }
];

const Modal = ({ isOpen, onClose, component: Component, title }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-[#030308] overflow-y-auto"
        >
          <div className="min-h-screen relative p-6 md:p-12">
            <div className="sticky top-0 w-full flex justify-between items-center z-[210] bg-[#030308]/80 backdrop-blur-xl border-b border-white/5 pb-6 mb-10">
              <div className="flex items-center gap-4 text-white">
                <div className="w-3 h-3 bg-[#38BDF8] rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">{title} // LIVE_CORE</span>
              </div>
              <button 
                onClick={onClose}
                className="group flex items-center gap-3 bg-white text-[#030308] px-6 py-3 rounded-full hover:bg-[#38BDF8] transition-all shadow-2xl active:scale-95"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">BACK</span>
                <div className="w-6 h-6 rounded-full bg-[#030308] text-white flex items-center justify-center group-hover:bg-white group-hover:text-[#030308] transition-colors">
                  <X size={14} />
                </div>
              </button>
            </div>
            <div className="container mx-auto">
              <Component />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default function UIUXExamples() {
  const [activeID, setActiveID] = useState(null);
  const activeExp = EXPERIMENTS.find(e => e.id === activeID);

  return (
    <section id="gallery" className="section-padding bg-[#030308] relative overflow-hidden">
      
      {/* BACKGROUND TEXT */}
      <div className="absolute inset-0 z-0 flex flex-col justify-center items-center pointer-events-none select-none opacity-[0.1]">
        <h2 className="text-[20vw] md:text-[35vw] font-black text-white leading-none uppercase tracking-tighter">DESIGN</h2>
      </div>

      <div className="container mx-auto px-10 relative z-10">
        <div className="max-w-4xl mb-24 space-y-6">
          <h2 className="text-7xl md:text-9xl font-black text-white uppercase tracking-tighter leading-none">
            <HackerText text="UI/UX" speed={30} /> <br /> <span className="text-[#38BDF8]"><HackerText text="ARCHIVE." speed={50} /></span>
          </h2>
          <p className="text-lg md:text-xl font-light text-slate-500 leading-relaxed max-w-lg uppercase tracking-widest pt-8 border-t border-white/10">
            A digital vault featuring <span className="text-white">interactive UI experiments</span> and design prototypes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {EXPERIMENTS.map((exp, i) => (
            <motion.div
              key={exp.id}
              whileHover={{ scale: 1.02, y: -10 }}
              onClick={() => setActiveID(exp.id)}
              className="relative aspect-[4/5] bg-white/[0.02] border border-white/10 rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl group transition-all duration-700"
            >
              {/* COMPONENT PREVIEW */}
              <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 origin-center pointer-events-none">
                <div style={{ 
                  transform: `scale(${exp.scale})`,
                  width: '1000px', 
                  height: '1200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <exp.component />
                </div>
              </div>

              {/* Overlays */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#030308] via-[#030308]/40 to-transparent opacity-100 group-hover:opacity-60 transition-opacity duration-700"></div>
              <div className="absolute inset-0 z-10 backdrop-blur-[2px] group-hover:backdrop-blur-0 transition-all duration-700"></div>

              {/* Information Overlay */}
              <div className="absolute inset-0 z-20 p-10 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-white/[0.05] border border-white/10 rounded-2xl text-[#38BDF8] flex items-center justify-center group-hover:bg-[#38BDF8] group-hover:text-[#030308] transition-colors duration-500 shadow-xl">
                    {exp.icon}
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-[#030308] transition-all">
                    <Maximize2 size={16} />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-[#38BDF8] uppercase tracking-[0.3em]">{exp.category}</span>
                    <div className="w-1 h-px bg-white/20"></div>
                    <span className="text-[10px] font-black text-slate-600">0{i + 1}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none group-hover:text-[#38BDF8] transition-colors">
                    <HackerText text={exp.title} speed={30} />
                  </h3>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
                    <span className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em]">Live Simulation Active</span>
                  </div>
                </div>
              </div>
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
