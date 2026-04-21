'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Activity, Box, Github, Layers } from 'lucide-react';
import HackerText from './HackerText';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS_DATA = [
  {
    id: 1,
    title: "Own Inventory System",
    category: "SYSTEM DESIGN",
    description: "A full-stack inventory management system with real-time updates and automated reporting.",
    image: "/invtry-landing.png",
    year: "2025",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://elijahinventory.netlify.app/"
  },
  {
    id: 2,
    title: "Codigo Clothing",
    category: "WEB INTERFACE",
    description: "A minimal e-commerce landing page for a fashion brand, built with modern UI patterns and smooth animations.",
    image: "/codigo-landing.png",
    year: "2025",
    tech: ["React", "Tailwind", "GSAP"],
    link: "https://decodetheculture.vercel.app/"
  },
  {
    id: 3,
    title: "Fonus Federation",
    category: "SERVICE PLATFORM",
    description: "A digital platform for a federation cooperative to manage memorial services and membership data.",
    image: "/fonus.png",
    year: "2026",
    tech: ["Next.js", "Firebase", "Netlify"],
    link: "https://fonuscebu.netlify.app/"
  },
  {
    id: 4,
    title: "Brisasolei Resort",
    category: "BOOKING SYSTEM",
    description: "A booking and reservation system designed for a resort, featuring real-time availability.",
    image: "/brisasolei.png",
    year: "2025",
    tech: ["Next.js", "PostgreSQL", "Tailwind"],
    link: "https://brisasolei.netlify.app/"
  },
  {
    id: 5,
    title: "SHS Grading System",
    category: "ACADEMIC TOOL",
    description: "A grading and student record system built for Benedicto College to streamline academic workflows.",
    image: "/benedicto.jpeg",
    year: "2024",
    tech: ["Angular", "JavaScript", "Bootstrap", "MySQL"],
    link: "#"
  }
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const viewportRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Trigger switching when the project title hits the center of the viewport
      PROJECTS_DATA.forEach((_, index) => {
        ScrollTrigger.create({
          trigger: `#project-title-${index}`,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });

      // Pinning logic with an exit fade-out
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: viewportRef.current,
        pinSpacing: false,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Fade out the viewport content as we reach the very end of the section
          if (viewportRef.current) {
            const progress = self.progress;
            const content = viewportRef.current.querySelector('.viewport-content');
            if (content) {
              if (progress > 0.98) {
                content.style.opacity = (1 - (progress - 0.98) * 50).toString();
                content.style.transform = `scale(${1 - (progress - 0.98) * 0.5})`;
              } else {
                content.style.opacity = "1";
                content.style.transform = "scale(1)";
              }
            }
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#030308]" id="projects">
      {/* Background large decorative text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none z-0 select-none opacity-[0.1]">
        <h2 className="text-[15vw] md:text-[20vw] font-black text-white uppercase tracking-tighter leading-none whitespace-nowrap">
          WORKS
        </h2>
      </div>

      {/* 1. Title Section */}
      <section className="pt-48 pb-24 px-10 md:px-20 bg-[#030308]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="space-y-6">
              <h2 className="text-7xl md:text-9xl font-black text-white uppercase tracking-tighter leading-none">
                <HackerText text="SELECTED" speed={30} /> <br /> <span className="text-[#38BDF8]"><HackerText text="WORKS." speed={50} /></span>
              </h2>
            </div>
            <div className="max-w-md space-y-6 border-l border-white/10 pl-8 pb-4">
              <p className="text-slate-500 text-sm uppercase tracking-[0.2em] font-light leading-relaxed">
                A collection of web applications and systems I've built, focusing on <span className="text-white">solving real-world problems with efficient code.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Split-Screen Project Console */}
      <section ref={containerRef} className="relative">
        <div className="flex flex-col lg:flex-row min-h-screen">
          
          {/* Left Side: Fixed Project Viewport */}
          <div ref={viewportRef} className="w-full lg:w-1/2 h-[40vh] lg:h-screen sticky top-0 bg-[#030308] overflow-hidden border-r border-white/5">
            <div className="viewport-content w-full h-full relative transition-all duration-300">
              <div className="absolute top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-50">
                <div className="flex items-center gap-4">
                  <Box size={16} className="text-[#38BDF8]" />
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.5em]">Project_Observer // 0{activeIndex + 1}</span>
                </div>
                <div className="flex items-center gap-6 opacity-40 hidden md:flex">
                  <Activity size={14} className="text-[#38BDF8]" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">MINIMAL_DISPLAY</span>
                </div>
              </div>

              <div className="relative w-full h-full p-8 lg:p-12 flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full relative flex items-center justify-center"
                  >
                    <Image 
                      src={PROJECTS_DATA[activeIndex].image} 
                      alt={PROJECTS_DATA[activeIndex].title}
                      fill
                      className="object-contain drop-shadow-[0_50px_100px_rgba(0,0,0,0.3)]"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10 flex gap-2">
                {PROJECTS_DATA.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-0.5 flex-grow transition-all duration-500 ${i === activeIndex ? 'bg-[#38BDF8]' : 'bg-white/10'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Scrollable Technical Details */}
          <div className="w-full lg:w-1/2 px-6 md:px-24 bg-[#030308]">
            <div className="flex flex-col pb-[50vh]">
              {PROJECTS_DATA.map((project, index) => (
                <div key={project.id} id={`project-narrative-${index}`} className="min-h-[80vh] lg:h-screen flex flex-col justify-center border-b border-white/5 last:border-0 py-20 lg:py-0">
                  <div className="space-y-8 md:space-y-12">
                    <div className="flex items-center gap-6">
                      <span className="text-[10px] font-black text-[#38BDF8] uppercase tracking-[0.5em]">{project.category}</span>
                      <div className="h-px flex-grow bg-white/10"></div>
                      <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{project.year}</span>
                    </div>

                    <h3 id={`project-title-${index}`} className="text-4xl md:text-7xl text-white font-black uppercase tracking-tighter leading-none">
                      <HackerText text={project.title} speed={30} />
                    </h3>

                    <p className="text-lg md:text-2xl font-light text-slate-500 leading-relaxed max-w-lg border-l-2 border-[#38BDF8]/20 pl-6 md:pl-8 uppercase tracking-wide">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-4">
                      {project.tech.map(t => (
                        <span key={t} className="px-3 md:px-4 py-1.5 bg-white/[0.03] border border-white/5 rounded-full text-[8px] font-black uppercase tracking-widest text-slate-400">{t}</span>
                      ))}
                    </div>

                    <div className="pt-6 md:pt-10">
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-4 md:gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-white hover:text-[#38BDF8] transition-all"
                      >
                        EXECUTE VIEW
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#38BDF8] group-hover:border-[#38BDF8] group-hover:text-[#030308] transition-all duration-700 shadow-[0_0_20px_rgba(56,189,248,0)] group-hover:shadow-[0_0_30px_rgba(56,189,248,0.2)]">
                          <ArrowUpRight size={20} className="md:size-[24px]" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
