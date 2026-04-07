'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MoveRight, Layers, Box } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STORIES = [
  {
    id: 1,
    title: "Cinematic Precision",
    subtitle: "VISUAL ARCHITECTURE",
    image: "/codigo-landing.png",
    text: "Designing spaces where every pixel serves a purpose in the narrative flow."
  },
  {
    id: 2,
    title: "Technical Soul",
    subtitle: "ENGINEERING BEAUTY",
    image: "/invtry-landing.png",
    text: "Code is not just logic; it is the invisible foundation of digital craftsmanship."
  },
  {
    id: 3,
    title: "Atmospheric Flow",
    subtitle: "SPATIAL EXPERIENCE",
    image: "/brisasolei.png",
    text: "Crafting interfaces that breathe through intentional and cinematic whitespace."
  },
  {
    id: 4,
    title: "System Integrity",
    subtitle: "ARCHITECTURAL NODES",
    image: "/fonus.png",
    text: "Building robust infrastructures that disappear seamlessly into their core function."
  }
];

export default function ElijahStoryStream() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.story-item');
      
      gsap.to(items, {
        xPercent: -100 * (items.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (items.length - 1),
          start: "top top",
          end: () => "+=" + containerRef.current.offsetWidth,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#DEDCD3] overflow-hidden rounded-[4rem]">
      <div className="h-screen flex items-center">
        
        <div ref={scrollRef} className="flex flex-nowrap h-full">
          {STORIES.map((story, i) => (
            <div key={story.id} className="story-item min-w-full h-full flex items-center justify-center px-10 md:px-32 relative">
              
              {/* Background Large Number */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
                <span className="text-[60vw] font-serif italic leading-none">{i + 1}</span>
              </div>

              <div className="grid lg:grid-cols-12 gap-20 items-center w-full max-w-7xl relative z-10">
                
                {/* Image Side - Cinematic Framing */}
                <div className="lg:col-span-7 relative h-[65vh] overflow-hidden rounded-[3rem] group shadow-[0_50px_100px_rgba(0,0,0,0.1)]">
                  <Image 
                    src={story.image} 
                    alt={story.title} 
                    fill 
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                  />
                  
                  {/* High-End Masking Overlay */}
                  <div className="absolute inset-0 bg-[#DEDCD3]/10 mix-blend-multiply"></div>
                  
                  {/* Floating Identity Marker */}
                  <div className="absolute top-12 left-12 flex items-center gap-4">
                    <div className="bg-[#0F0F0F] text-white px-6 py-2 rounded-full flex items-center gap-3 shadow-2xl">
                      <Box size={14} className="text-blue-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest">ARCHIVE_NODE_0{i + 1}</span>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="lg:col-span-5 space-y-12">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-px bg-blue-600"></div>
                      <span className="text-meta text-blue-600">{story.subtitle}</span>
                    </div>
                    <h2 className="text-7xl md:text-9xl text-display text-[#0F0F0F] leading-[0.8]">
                      {story.title.split(' ')[0]} <br />
                      <span className="font-serif italic pl-[5vw] text-blue-600">{story.title.split(' ')[1]}</span>
                    </h2>
                  </div>
                  
                  <p className="text-2xl md:text-3xl font-light text-slate-600 leading-relaxed max-w-lg">
                    {story.text}
                  </p>

                  <div className="pt-10">
                    <button className="group flex items-center gap-8 text-xl font-serif italic text-[#0F0F0F] hover:text-blue-600 transition-all">
                      <span className="border-b border-black/10 pb-2 group-hover:border-blue-600">View Technical Study</span>
                      <div className="w-14 h-14 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                        <MoveRight size={24} />
                      </div>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
