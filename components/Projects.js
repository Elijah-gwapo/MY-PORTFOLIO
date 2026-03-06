'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight, Github, Layout, Server, Database } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef(null);

  const projects = [
    {
      id: 3,
      title: "FONUS Cebu Federation",
      category: "E-Commerce & Services",
      description: "A comprehensive memorial and funeral services platform for a federation cooperative in Cebu. Features memorial plan management, membership programs, and 24/7 service support.",
      technologies: ["Next.js", "Tailwind", "Firebase", "Cloud Functions"],
      image: "/fonus.png",
      year: "2026",
      link: "https://fonuscebu.netlify.app/",
      accent: "from-blue-600 to-cyan-500"
    },
    {
      id: 2,
      title: "Brisasolei Resort",
      category: "Booking System",
      description: "A comprehensive resort booking system currently in development. Features real-time availability checking, secure payment processing, and an intuitive admin dashboard.",
      technologies: ["Next.js", "PostgreSQL", "Prisma", "Tailwind"],
      image: "/brisasolei.png",
      year: "IN DEV",
      link: "https://brisasolei.netlify.app/",
      isDevelopment: true,
      accent: "from-emerald-600 to-teal-500"
    },
    {
      id: 1,
      title: "SHS Grading System",
      category: "Academic Tool",
      description: "A robust academic management platform for Benedicto College, streamlining grading workflows and student records for the senior high school department.",
      technologies: ["React", "JavaScript", "Bootstrap", "MySQL"],
      image: "/benedicto.jpeg",
      year: "2024",
      isAcademic: true,
      accent: "from-indigo-600 to-blue-500"
    }
  ];

  return (
    <section id="projects" ref={containerRef} className="py-32 bg-[#030308] relative overflow-hidden bg-grid">
      
      {/* Background large stroke text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none z-0">
        <h2 className="text-[20vw] font-black text-white/[0.02] uppercase tracking-tighter leading-none select-none">
          WORKS
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-32 text-center"
        >
          <div className="relative">
            <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter relative z-10">My Projects</h2>
            <span className="absolute -top-10 -right-12 text-8xl font-black text-white/[0.03] italic pointer-events-none select-none">04</span>
          </div>
          <div className="w-24 h-1.5 bg-blue-600 mt-8 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)]"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 gap-32 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Image Showcase */}
              <div className="w-full lg:w-3/5 group cursor-pointer relative">
                <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden bg-slate-900 shadow-2xl transition-all duration-700 group-hover:scale-[0.98]">
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill 
                    className="object-cover object-top transition-transform duration-1000 group-hover:scale-110" 
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-20 mix-blend-overlay`}></div>
                  
                  {/* Floating Tech Badges */}
                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-20">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span key={i} className="px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl text-[8px] font-black text-white uppercase tracking-widest">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Details */}
              <div className={`w-full lg:w-2/5 space-y-8 ${index % 2 !== 0 ? 'lg:text-right lg:items-end' : ''} flex flex-col`}>
                <div className="space-y-4">
                  <div className={`flex items-center gap-4 text-blue-500 font-black tracking-widest text-[10px] uppercase ${index % 2 !== 0 ? 'justify-end' : ''}`}>
                    <span className="w-8 h-px bg-blue-500/50"></span>
                    {project.category}
                    <span className="w-8 h-px bg-blue-500/50"></span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
                    {project.title}
                  </h3>
                </div>

                <p className="text-lg text-slate-400 leading-relaxed font-light">
                  {project.description}
                </p>

                <div className={`flex flex-wrap gap-4 ${index % 2 !== 0 ? 'justify-end' : ''}`}>
                  <div className="flex flex-col items-center">
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Year</span>
                    <span className="text-white font-bold">{project.year}</span>
                  </div>
                  <div className="w-px h-8 bg-white/10"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</span>
                    <span className="text-emerald-400 font-bold">{project.isDevelopment ? 'Live Beta' : 'Production'}</span>
                  </div>
                </div>

                <div className={`flex items-center gap-6 ${index % 2 !== 0 ? 'justify-end' : ''}`}>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group/btn relative px-10 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl flex items-center gap-3 transition-all duration-500 hover:bg-blue-600 hover:text-white shadow-2xl active:scale-95"
                  >
                    Launch Experience
                    <ArrowUpRight size={18} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </a>
                  <button className="p-5 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all active:scale-95">
                    <Github size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
