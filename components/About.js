'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HackerText from './HackerText';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(textRef.current, 
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "#about",
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section id="about" className="section-padding bg-[#030308] relative overflow-hidden">
      {/* Background large decorative text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 select-none opacity-[0.1]">
        <h2 className="text-[15vw] md:text-[25vw] font-black text-white uppercase tracking-tighter leading-none whitespace-nowrap">
          IDENTITY
        </h2>
      </div>

      <div className="container mx-auto px-10 relative z-10">
        <div className="grid lg:grid-cols-12 gap-20 items-start">
          
          <div className="lg:col-span-8 space-y-20 flex flex-col items-center md:items-start">
            <h2 ref={textRef} className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white flex flex-col items-center md:items-start text-center md:text-left w-full">
              <span className="w-full"><HackerText text="A HIGH-PERFORMANCE" speed={30} delay={1500} /></span>
              <span className="text-[#38BDF8] w-full"><HackerText text="APPROACH." speed={50} delay={1500} /></span>
            </h2>

            <div className="grid md:grid-cols-2 gap-20">
              <p className="text-xl md:text-2xl font-light leading-relaxed text-slate-400 text-center md:text-left">
                I'm <span className="text-white">Elijah Ortega</span>, a Junior Developer based in Cebu. I build high-end web experiences with a focus on clean logic and functional design.
              </p>
              <div className="space-y-10">
                <p className="text-lg text-slate-500 leading-relaxed font-light text-center md:text-left">
                  Specializing in building scalable web applications and intuitive interfaces, my approach is to combine technical precision with a clear visual aesthetic to deliver products that work seamlessly and solve real-world problems.
                </p>
                <div className="flex flex-col gap-4 border-t border-white/5 pt-10 items-center md:items-start">
                  <span className="text-meta text-slate-600">CORE COMPETENCIES</span>
                  <div className="flex flex-wrap gap-x-10 gap-y-4 justify-center md:justify-start">
                    {["UI Architecture", "Frontend Systems", "Creative Logic", "System Design"].map(item => (
                      <span key={item} className="text-sm font-medium uppercase tracking-widest text-white/80">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}