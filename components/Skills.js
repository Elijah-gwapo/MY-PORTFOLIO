'use client';

import { motion } from 'framer-motion';
import { Code2, Server, Database, Terminal, Cpu, Globe, Zap, Shield } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Globe className="w-6 h-6 text-blue-500" />,
      skills: [
        { name: "HTML5", color: "bg-orange-500/10 text-orange-500" },
        { name: "CSS3", color: "bg-blue-500/10 text-blue-500" },
        { name: "JavaScript", color: "bg-yellow-500/10 text-yellow-500" },
        { name: "React", color: "bg-cyan-500/10 text-cyan-500" },
        { name: "Tailwind CSS", color: "bg-sky-500/10 text-sky-500" },
        { name: "Framer Motion", color: "bg-pink-500/10 text-pink-500" },
        { name: "GSAP", color: "bg-green-500/10 text-green-500" },
        { name: "DaisyUI", color: "bg-white/10 text-white" },
      ]
    },
    {
      title: "Backend",
      icon: <Server className="w-6 h-6 text-emerald-500" />,
      skills: [
        { name: "Node.js", color: "bg-green-600/10 text-green-600" },
        { name: "Express", color: "bg-white/10 text-white" },
        { name: "Angular", color: "bg-red-600/10 text-red-600" },
        { name: "Next.js", color: "bg-white/10 text-white" },
      ]
    },
    {
      title: "Database",
      icon: <Database className="w-6 h-6 text-amber-500" />,
      skills: [
        { name: "MySQL", color: "bg-blue-600/10 text-blue-600" },
        { name: "Workbench", color: "bg-cyan-600/10 text-cyan-600" },
        { name: "MariaDB", color: "bg-blue-800/10 text-blue-800" },
        { name: "Firebase", color: "bg-orange-400/10 text-orange-400" },
      ]
    },
    {
      title: "Tools & OS",
      icon: <Terminal className="w-6 h-6 text-purple-500" />,
      skills: [
        { name: "Git", color: "bg-red-500/10 text-red-500" },
        { name: "GitHub", color: "bg-white/10 text-white" },
        { name: "VS Code", color: "bg-blue-500/10 text-blue-500" },
        { name: "macOS", color: "bg-white/10 text-white" },
        { name: "Linux Mint", color: "bg-green-500/10 text-green-500" },
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="skills" className="py-32 bg-[#030308] relative overflow-hidden bg-grid">
      
      {/* Background large decorative text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none z-0">
        <h2 className="text-[20vw] font-black text-white/[0.02] uppercase tracking-tighter leading-none select-none">
          EXPERTISE
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-24 text-center"
        >
          <div className="relative">
            <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter relative z-10">Technical Skills</h2>
            <span className="absolute -top-10 -right-12 text-8xl font-black text-white/[0.03] italic pointer-events-none select-none">03</span>
          </div>
          <div className="w-24 h-1.5 bg-blue-600 mt-8 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)]"></div>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="p-10 rounded-[4rem] bg-white/5 border border-white/10 group hover:border-blue-500/30 transition-all duration-700 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-600/5 rounded-full blur-[60px] group-hover:bg-blue-600/10 transition-all duration-1000"></div>
              
              <div className="flex items-center gap-6 mb-12">
                <div className="p-4 bg-white/5 rounded-3xl border border-white/10 group-hover:scale-110 transition-transform duration-500">
                  {category.icon}
                </div>
                <h3 className="text-4xl font-black text-white uppercase tracking-tighter group-hover:text-blue-400 transition-colors">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skillIndex}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`px-6 py-3 rounded-2xl border border-white/5 font-black uppercase tracking-widest text-[10px] flex items-center gap-3 transition-all ${skill.color} hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></div>
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
