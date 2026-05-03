'use client';

import { motion } from 'framer-motion';
import { Code2, Server, Database, Globe, Cpu, Layers } from 'lucide-react';
import HackerText from './HackerText';

export default function Skills() {
  const skillCategories = [
    {
      title: "FRONT-END",
      icon: <Globe className="w-5 h-5" />,
      skills: ["React", "Next.js", "Angular", "Tailwind CSS", "Framer Motion", "GSAP", "TypeScript"]
    },
    {
      title: "BACK-END",
      icon: <Server className="w-5 h-5" />,
      skills: ["Node.js", "Express", "REST APIs", "Prisma", "Auth Architecture"]
    },
    {
      title: "DATA SYSTEMS",
      icon: <Database className="w-5 h-5" />,
      skills: ["PostgreSQL", "MySQL", "Firebase", "Schema Design", "Sync Logic"]
    },
    {
      title: "ENGINEERING",
      icon: <Cpu className="w-5 h-5" />,
      skills: ["Git", "Linux", "macOS", "Testing", "Vercel", "Netlify"]
    }
  ];

  return (
    <section id="skills" className="section-padding bg-[#030308] relative overflow-hidden">
      {/* Background large decorative text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none z-0 select-none opacity-[0.1]">
        <h2 className="text-[15vw] md:text-[20vw] font-black text-white uppercase tracking-tighter leading-none whitespace-nowrap">
          EXPERTISE
        </h2>
      </div>

      <div className="container mx-auto px-10 relative z-10">
        
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-32 gap-12">
          <div className="space-y-6 text-center md:text-left w-full flex flex-col items-center md:items-start">
            <h2 className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter leading-none flex flex-col items-center md:items-start">
              <span><HackerText text="TECHNICAL" speed={30} delay={1500} /></span>
              <span className="text-[#38BDF8]"><HackerText text="EXPERTISE." speed={50} delay={1500} /></span>
            </h2>          </div>
          <p className="text-slate-500 max-w-sm text-sm uppercase tracking-[0.2em] font-light leading-relaxed text-center md:text-left mx-auto md:mx-0">
            A focused list of the tools and technologies I use to build <span className="text-white">scalable web applications and efficient digital systems.</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex flex-col gap-10 hover:bg-white/[0.04] hover:border-[#38BDF8]/20 transition-all duration-700 group relative overflow-hidden"
            >
              {/* Subtle background glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#38BDF8]/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="flex items-center justify-between relative z-10">
                <div className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center text-[#38BDF8] group-hover:bg-[#38BDF8] group-hover:text-[#030308] transition-all duration-500">
                  {category.icon}
                </div>
                <span className="text-[10px] font-black text-slate-800 group-hover:text-[#38BDF8] transition-colors tracking-widest">0{index + 1}</span>
              </div>

              <h3 className="text-2xl font-black text-white uppercase tracking-tighter relative z-10">
                {category.title}
              </h3>

              <ul className="space-y-4 relative z-10">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-center gap-4 text-slate-500 group-hover:text-slate-300 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] opacity-20 group-hover:opacity-100 group-hover:shadow-[0_0_8px_#38BDF8] transition-all duration-500"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}