'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const customCSS = `
  .glass-card-project {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .glass-card-project:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(59, 130, 246, 0.3);
    transform: translateY(-12px);
  }
  .tech-tag {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
`;

export default function Projects() {
  const projects = [
    {
      id: 3,
      title: "FONUS Cebu Federation Cooperatives",
      description: "A comprehensive memorial and funeral services platform for a federation cooperative in Cebu. Features memorial plan management, membership programs, and 24/7 service support.",
      technologies: ["Next.js", "Tailwind", "Firebase"],
      image: "/fonus.png",
      year: "2026",
      link: "https://fonuscebu.netlify.app/"
    },
    {
      id: 2,
      title: "Brisasolei Resort Booking",
      description: "A comprehensive resort booking system currently in development. Features real-time availability checking, secure payment processing, and an intuitive admin dashboard.",
      technologies: ["Next.js", "PostgreSQL", "Tailwind"],
      image: "/brisasolei.png",
      year: "IN DEV",
      link: "https://brisasolei.netlify.app/",
      isDevelopment: true
    },
    {
      id: 1,
      title: "Senior High Grading System",
      description: "A comprehensive grading system for Benedicto College's senior high school department, designed to streamline academic assessment processes.",
      technologies: ["React", "JavaScript", "Bootstrap"],
      image: "/benedicto.jpeg",
      year: "2024",
      isAcademic: true
    }
  ];

  return (
    <section id="projects" className="py-32 bg-[#030308] relative overflow-hidden bg-grid">
      <style dangerouslySetInnerHTML={{ __html: customCSS }} />
      
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
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-sm mb-4 block">WORK SAMPLES</span>
          <h2 className="text-6xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">Featured Projects</h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)]"></div>
        </motion.div>
        
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto"
        >
          {projects.map((project, index) => (
            <motion.div 
              key={project.id} 
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group glass-card-project rounded-[3rem] overflow-hidden flex flex-col h-full"
            >
              <div className="relative h-72 overflow-hidden">
                <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030308] via-transparent to-transparent opacity-80"></div>
                <div className="absolute top-8 right-8 px-6 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white font-black tracking-widest uppercase text-xs">
                  {project.year}
                </div>
              </div>
              
              <div className="p-10 flex flex-col flex-1">
                <div className="flex gap-3 mb-6">
                  {project.isAcademic && (
                    <span className="text-[11px] font-black text-blue-400 tracking-[0.2em] uppercase px-3 py-1.5 rounded-full bg-blue-400/10 border border-blue-400/20 shadow-[0_0_15px_rgba(37,99,235,0.1)]">Academic</span>
                  )}
                  {project.isDevelopment && (
                    <span className="text-[11px] font-black text-yellow-400 tracking-[0.2em] uppercase px-3 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center gap-2 shadow-[0_0_15px_rgba(250,204,21,0.1)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></span>
                      In Development
                    </span>
                  )}
                </div>
                
                <h3 className="text-3xl font-black mb-6 text-white group-hover:text-blue-400 transition-colors tracking-tighter uppercase">{project.title}</h3>
                <p className="text-slate-400 text-lg mb-10 leading-relaxed line-clamp-3 font-medium">{project.description}</p>
                
                <div className="mt-auto pt-8 flex items-center justify-between border-t border-white/5">
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="px-4 py-1.5 tech-tag text-slate-400 rounded-full text-[11px] font-black tracking-widest uppercase">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-500 hover:rotate-12">
                      <ExternalLink size={24} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
