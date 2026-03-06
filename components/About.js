'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Palette, Globe, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;
    
    gsap.to(textRef.current, {
      x: -200,
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });
  }, []);

  const stats = [
    { label: 'Clean Code', icon: <Code2 className="w-5 h-5" />, color: 'text-blue-500' },
    { label: 'Modern UI/UX', icon: <Palette className="w-5 h-5" />, color: 'text-fuchsia-500' },
    { label: 'Global Scale', icon: <Globe className="w-5 h-5" />, color: 'text-emerald-500' },
    { label: 'Performance', icon: <Cpu className="w-5 h-5" />, color: 'text-amber-500' },
  ];

  return (
    <section id="about" className="py-32 bg-[#0a0f1c] relative overflow-hidden bg-dots">
      
      {/* Background large stroke text with GSAP Parallax */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none z-0">
        <h2 ref={textRef} className="text-[25vw] font-black text-white/[0.02] uppercase tracking-tighter leading-none select-none whitespace-nowrap">
          ABOUT ME ABOUT ME
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-24"
        >
          <div className="relative">
            <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter relative z-10">About Me</h2>
            <span className="absolute -top-10 -right-12 text-8xl font-black text-white/[0.03] italic pointer-events-none select-none">01</span>
          </div>
          <div className="w-24 h-1.5 bg-blue-600 mt-8 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)]"></div>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="p-8 md:p-16 rounded-[4rem] glass border border-white/5 relative overflow-hidden group hover:border-blue-500/20 transition-all duration-700 shadow-2xl"
          >
            {/* Animated Glow inside card */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] group-hover:bg-blue-600/20 transition-all duration-1000"></div>

            <div className="grid lg:grid-cols-2 gap-16 items-start relative z-10">
              <div className="space-y-8">
                <p className="text-2xl md:text-3xl text-white font-light leading-relaxed">
                  I'm <span className="text-white font-black text-glow">Elijah Alrhoy Ortega</span>, an Information Technology undergraduate at Benedicto College. 
                </p>
                <p className="text-lg text-slate-400 leading-relaxed font-light">
                  I specialize in creating immersive digital experiences. My journey from AMA Computer Learning Center to my current studies has been fueled by a passion for modern web engineering and clean, scalable code.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 group/stat hover:bg-white/10 transition-all">
                      <div className={`${stat.color} group-hover/stat:scale-110 transition-transform`}>{stat.icon}</div>
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-10">
                <p className="text-lg text-slate-400 leading-relaxed font-light">
                  I believe that the best products are built at the intersection of performance and aesthetics. I am always eager to learn new tools and refine my craft to deliver exceptional results.
                </p>
                <div className="p-8 bg-blue-600/10 rounded-[2.5rem] border border-blue-500/20 relative">
                  <div className="absolute top-6 left-6 text-blue-500/30 font-serif text-6xl leading-none">"</div>
                  <p className="text-xl text-white font-serif italic relative z-10 pl-4">
                    The best way to predict the future is to create it.
                  </p>
                  <div className="mt-4 flex items-center gap-4 pl-4">
                    <div className="h-px w-8 bg-blue-500"></div>
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Philosophy</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
