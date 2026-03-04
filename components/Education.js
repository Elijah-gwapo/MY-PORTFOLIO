'use client';

import { motion } from 'framer-motion';

const customCSS = `
  .glass-card-edu {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;
  }
  .glass-card-edu:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(59, 130, 246, 0.3);
  }
`;

export default function Education() {
  const educationItems = [
    {
      date: "2022 - Present",
      degree: "Bachelor of Science in Information Technology",
      institution: "Benedicto College",
      description: "Currently pursuing my Bachelor's degree in Information Technology, focusing on software development, database management, and system analysis."
    },
    {
      date: "2020 - 2022",
      degree: "Senior High School - ICT Strand",
      institution: "AMA Computer Learning Center",
      description: "Specialized in Information and Communications Technology, gaining foundational knowledge in programming, web development, and computer systems."
    },
    {
      date: "2016 - 2020",
      degree: "Junior High School",
      institution: "MCCNHS",
      description: "Completed junior high school education with a focus on science, technology, engineering, and mathematics."
    }
  ];

  return (
    <section id="education" className="py-32 bg-[#0a0f1c] relative overflow-hidden bg-dots">
      <style dangerouslySetInnerHTML={{ __html: customCSS }} />
      
      {/* Background large stroke text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none z-0">
        <h2 className="text-[20vw] font-black text-white/[0.02] uppercase tracking-tighter leading-none select-none">
          STUDY
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
          <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-sm mb-4 block">QUALIFICATIONS</span>
          <h2 className="text-6xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">Education</h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)]"></div>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <div className="space-y-12">
            {educationItems.map((item, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: index % 2 === 0 ? -150 : 150, rotate: index % 2 === 0 ? -10 : 10 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ type: "spring", stiffness: 80, damping: 15, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="p-10 md:p-16 rounded-[3rem] glass-card-edu border border-white/5 relative group"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-8">
                  <div>
                    <h3 className="text-4xl font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tighter">{item.degree}</h3>
                    <h4 className="text-2xl text-slate-400 font-bold mt-2 uppercase tracking-wide">{item.institution}</h4>
                  </div>
                  <div className="px-8 py-3 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-lg font-black tracking-widest whitespace-nowrap self-start shadow-[0_0_20px_rgba(37,99,235,0.1)]">
                    {item.date}
                  </div>
                </div>
                <p className="text-slate-400 leading-relaxed text-xl max-w-4xl font-medium">
                  {item.description}
                </p>
                
                {index !== educationItems.length - 1 && (
                    <div className="hidden md:block absolute -bottom-12 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-blue-600/50 to-transparent"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
