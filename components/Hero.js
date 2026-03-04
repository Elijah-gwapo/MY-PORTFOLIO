'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FileText, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 min-h-screen flex items-center bg-[#030308] relative overflow-hidden bg-grid">
      
      {/* Background Profile Image */}
      <div className="absolute right-0 top-0 w-full h-full md:w-[65%] opacity-40 md:opacity-60 pointer-events-none select-none">
        <Image 
          src="/bw-elijah.png" 
          alt="Elijah Alrhoy Ortega Background" 
          fill
          className="object-cover object-[right_20%] scale-125"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030308] via-[#030308]/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030308] via-transparent to-transparent"></div>
      </div>

      {/* Large background decorative text */}
      <div className="absolute -bottom-10 -left-10 pointer-events-none z-0">
        <h2 className="text-[20vw] font-black text-white/[0.02] uppercase tracking-tighter leading-none select-none">
          PORTFOLIO
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-start max-w-4xl">
          
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xl md:text-2xl font-bold text-blue-500 mb-2 tracking-[0.2em] uppercase"
          >
            IT Student & Web Developer
          </motion.h2>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl md:text-9xl lg:text-[10rem] font-black text-white tracking-tighter leading-[0.85] mb-10"
          >
            ELIJAH<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-400 to-slate-800">ORTEGA</span>
            <span className="text-blue-600">.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl text-slate-400 max-w-2xl leading-relaxed mb-12 border-l-4 border-blue-600 pl-8"
          >
            I build accessible, pixel-perfect, and performant web experiences. 
            Currently focused on mastering full-stack development and creating 
            seamless user interfaces.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center gap-8"
          >
            <a 
              href="/resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black tracking-widest rounded-full transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:scale-105 active:scale-95 uppercase text-sm"
            >
              <FileText size={18} /> 
              View Resume
            </a>

            <Link 
              href="#projects" 
              className="group flex items-center gap-4 text-white hover:text-blue-400 transition-all duration-300"
            >
              <span className="text-xl font-bold tracking-widest uppercase border-b-2 border-white/10 group-hover:border-blue-400/50 pb-1">Selected Works</span>
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-400 group-hover:bg-blue-400/10 transition-all">
                <ArrowRight className="transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
