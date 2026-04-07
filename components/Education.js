'use client';

import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight } from 'lucide-react';
import HackerText from './HackerText';

export default function Education() {
  const educationItems = [
    {
      date: "2022 — Present",
      degree: "Bachelor of Science in Information Technology",
      institution: "Benedicto College",
      description: "Focusing on software development, system architecture, and modern engineering principles."
    },
    {
      date: "2020 — 2022",
      degree: "Senior High School - ICT Strand",
      institution: "AMA Computer Learning Center",
      description: "Foundational studies in programming logic, web development, and computing hardware."
    },
    {
      date: "2016 — 2020",
      degree: "Junior High School",
      institution: "MCCNHS",
      description: "Early academic foundation with a strong emphasis on technology and mathematics."
    }
  ];

  return (
    <section id="education" className="py-32 bg-[#030308] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
            <HackerText text="Technical" speed={30} /> <br />
            <span className="text-[#38BDF8]"><HackerText text="Foundation." speed={50} /></span>
          </h2>
          <div className="h-1 w-20 bg-[#38BDF8] rounded-full"></div>
        </motion.div>
        
        <div className="max-w-5xl">
          {educationItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group border-b border-white/5 py-12 flex flex-col md:flex-row md:items-center gap-8 md:gap-20 hover:bg-white/[0.01] transition-all px-4 rounded-xl"
            >
              <div className="w-32 flex-shrink-0">
                <span className="text-xs font-black text-slate-600 uppercase tracking-[0.3em]">
                  {item.date}
                </span>
              </div>

              <div className="flex-grow">
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 group-hover:text-[#38BDF8] transition-colors uppercase tracking-tight">
                  {item.degree}
                </h3>
                <div className="flex items-center gap-3 text-slate-400 font-medium uppercase tracking-[0.2em] text-[10px]">
                  <span>{item.institution}</span>
                </div>
              </div>

              <div className="md:w-1/3">
                <p className="text-slate-500 text-sm leading-relaxed font-light uppercase tracking-wide">
                  {item.description}
                </p>
              </div>

              <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="text-[#38BDF8] w-6 h-6" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
