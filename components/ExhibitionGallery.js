'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SampleDesign from './SampleDesign';
import StoryCarousel from './StoryCarousel';
import QuantumCore from './QuantumCore';
import { X, Maximize2, Layers, Cpu, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GalleryModal = ({ isOpen, onClose, component: Component }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 z-[200] bg-[#F7F7F9] overflow-y-auto"
      >
        <div className="min-h-screen relative">
          <div className="sticky top-0 w-full p-8 md:p-12 flex justify-between items-center z-[210] bg-[#F7F7F9]/90 backdrop-blur-xl border-b border-black/5">
            <div className="flex items-center gap-6">
              <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-meta tracking-[0.5em] font-black">ACTIVE_PROTOTYPE_L1</span>
            </div>
            <button 
              onClick={onClose}
              className="w-14 h-14 rounded-full bg-[#111111] text-white flex items-center justify-center hover:bg-blue-600 transition-all shadow-xl"
            >
              <X size={28} />
            </button>
          </div>
          <div className="container mx-auto py-20 px-6">
            <Component />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function ExhibitionGallery() {
  const triggerRef = useRef(null);
  const containerRef = useRef(null);
  const [activeModal, setActiveModal] = useState(null);

  const galleryItems = [
    {
      id: 1,
      title: "Cyber Pet UI",
      category: "ANIMATED LOGIC",
      image: "/s1.png",
      description: "A high-performance login interface using state-aware character physics and reactive form logic.",
      component: SampleDesign,
      tech: "FRAMER + REACT"
    },
    {
      id: 2,
      title: "Story Stream",
      category: "HORIZONTAL NAV",
      image: "/s2.png",
      description: "A cinematic storytelling architecture for high-end catalogs and digital editorials.",
      component: StoryCarousel,
      tech: "GSAP + SCROLL"
    },
    {
      id: 3,
      title: "Quantum Core",
      category: "3D GEOMETRY",
      image: "/s3.png",
      description: "Advanced CSS 3D transforms creating an interactive multidimensional navigational core.",
      component: QuantumCore,
      tech: "3D CSS + GSAP"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.gallery-item');
      
      gsap.to(items, {
        xPercent: -100 * (items.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 0.5,
          snap: 1 / (items.length - 1),
          start: "top top", // Starts immediately when top hits top
          end: () => "+=" + containerRef.current.offsetWidth,
          anticipatePin: 1
        }
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={triggerRef} className="bg-[#111111] overflow-hidden">
      <div className="min-h-screen flex flex-col justify-center py-24 relative">
        
        {/* Header */}
        <div className="container mx-auto px-10 mb-20 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="space-y-6 text-white">
              <h2 className="text-7xl md:text-9xl text-display leading-none">
                Interactive <br />
                <span className="font-serif italic text-blue-600 pl-[10vw]">Experiments.</span>
              </h2>
            </div>
            <div className="max-w-sm space-y-6 border-l border-white/10 pl-8 pb-4">
              <p className="text-slate-400 text-sm uppercase tracking-widest leading-loose">
                An archive of digital surfaces where technical architecture meets interaction.
              </p>
              <div className="flex items-center gap-4 text-blue-500/50">
                <Compass size={14} className="animate-spin-slow" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Scroll to Navigate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Slider */}
        <div ref={containerRef} className="flex flex-nowrap h-full">
          {galleryItems.map((item, index) => (
            <div key={item.id} className="gallery-item min-w-full h-[60vh] md:h-[70vh] flex items-center justify-center px-6 md:px-20">
              <div className="grid lg:grid-cols-12 gap-10 md:gap-20 items-center w-full max-w-7xl h-full bg-white/5 border border-white/10 p-10 md:p-16 rounded-[3.5rem] hover:border-blue-600/30 transition-colors duration-700 backdrop-blur-sm relative overflow-hidden group">
                
                {/* Number Overlay */}
                <div className="absolute top-10 right-10 text-[12vw] font-serif italic text-white/[0.03] leading-none pointer-events-none group-hover:text-blue-600/5 transition-colors duration-700">
                  0{item.id}
                </div>

                {/* Visual Side */}
                <div 
                  className="lg:col-span-7 relative w-full h-full min-h-[300px] overflow-hidden rounded-[2.5rem] shadow-2xl cursor-pointer bg-black"
                  onClick={() => setActiveModal(item.id)}
                >
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 grayscale group-hover:grayscale-0" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                    <div className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center shadow-2xl">
                      <Maximize2 size={32} />
                    </div>
                  </div>

                  <div className="absolute bottom-8 left-8 flex items-center gap-4 bg-black/60 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Open Prototype</span>
                  </div>
                </div>
                
                {/* Content Side */}
                <div className="lg:col-span-5 space-y-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black text-blue-500 uppercase tracking-[0.4em]">{item.category}</span>
                      <div className="h-px w-12 bg-blue-500/20"></div>
                    </div>
                    <h3 className="text-5xl md:text-7xl text-white font-serif italic leading-none">{item.title}</h3>
                  </div>

                  <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-md">
                    {item.description}
                  </p>

                  <div className="flex flex-col gap-8 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-6">
                      <Layers size={18} className="text-slate-600" />
                      <span className="text-meta text-slate-500">{item.tech}</span>
                    </div>
                    <button 
                      onClick={() => setActiveModal(item.id)}
                      className="inline-flex items-center gap-6 text-white hover:text-blue-500 transition-all duration-500 group/btn"
                    >
                      <span className="text-meta uppercase tracking-[0.5em] font-black border-b border-white/20 pb-1 group-hover/btn:border-blue-500">INITIALIZE EXPERIENCE</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Global Progress Line */}
        <div className="absolute bottom-16 left-10 right-10 h-[1px] bg-white/5 pointer-events-none">
          <div className="w-24 h-[2px] bg-blue-600 absolute left-0 -top-[0.5px]"></div>
        </div>
      </div>

      {/* Modals for Interactive Components */}
      {galleryItems.map((item) => (
        <GalleryModal 
          key={item.id}
          isOpen={activeModal === item.id} 
          onClose={() => setActiveModal(null)} 
          component={item.component} 
        />
      ))}
    </section>
  );
}
