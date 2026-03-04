'use client';

import { motion } from 'framer-motion';

const customCSS = `
  .glass-card-skills {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;
  }
  .glass-card-skills:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(59, 130, 246, 0.3);
    transform: translateY(-10px);
  }
  .skill-icon-container {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
  }
  .group:hover .skill-icon-container {
    border-color: rgba(59, 130, 246, 0.3);
    background: rgba(59, 130, 246, 0.05);
  }
`;

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "HTML5", icon: "devicon-html5-plain", color: "text-[#e44d26]" },
        { name: "CSS3", icon: "devicon-css3-plain", color: "text-[#264de4]" },
        { name: "JavaScript", icon: "devicon-javascript-plain", color: "text-[#f0db4f]" },
        { name: "React", icon: "devicon-react-original", color: "text-[#61dbfb]" },
        { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain", color: "text-[#38bdf8]" },
        { name: "DaisyUI", icon: "fas fa-wind", color: "text-white" },
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: "devicon-nodejs-plain", color: "text-[#68a063]" },
        { name: "Express", icon: "devicon-express-original", color: "text-white" },
        { name: "Angular", icon: "devicon-angularjs-plain", color: "text-[#dd0031]" },
        { name: "Next.js", icon: "devicon-nextjs-plain", color: "text-white" },
      ]
    },
    {
      title: "Database",
      skills: [
        { name: "MySQL", icon: "devicon-mysql-plain", color: "text-[#4479a1]" },
        { name: "Workbench", icon: "fas fa-database", color: "text-[#00758f]" },
        { name: "MariaDB", icon: "fas fa-database", color: "text-[#005aab]" },
        { name: "Firebase", icon: "devicon-firebase-plain", color: "text-[#ffca28]" },
      ]
    },
    {
      title: "Tools & OS",
      skills: [
        { name: "Git", icon: "devicon-git-plain", color: "text-[#f05032]" },
        { name: "GitHub", icon: "devicon-github-original", color: "text-white" },
        { name: "VS Code", icon: "devicon-visualstudio-plain", color: "text-[#007acc]" },
        { name: "macOS", icon: "devicon-apple-original", color: "text-white" },
        { name: "Linux Mint", icon: "devicon-linux-plain", color: "text-[#87cf3e]" },
      ]
    }
  ];

  return (
    <section id="skills" className="py-32 bg-[#030308] relative overflow-hidden bg-grid">
      <style dangerouslySetInnerHTML={{ __html: customCSS }} />
      
      {/* Background large stroke text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none z-0">
        <h2 className="text-[20vw] font-black text-white/[0.02] uppercase tracking-tighter leading-none select-none">
          SKILLS
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
          <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-sm mb-4 block">EXPERTIZES</span>
          <h2 className="text-6xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">Technical Skills</h2>
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
          className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto"
        >
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index} 
              variants={{
                hidden: { opacity: 0, scale: 0.8, x: index % 2 === 0 ? -100 : 100, rotate: index % 2 === 0 ? -5 : 5 },
                show: { opacity: 1, scale: 1, x: 0, rotate: 0 }
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="p-10 rounded-[3rem] glass-card-skills border border-white/5 group/card"
            >
              <h3 className="text-3xl font-black mb-10 text-white flex items-center gap-4 uppercase tracking-tighter">
                <span className="w-2 h-10 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"></span>
                {category.title}
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-10">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex flex-col items-center gap-4 group cursor-default">
                    <div className="w-16 h-16 flex items-center justify-center rounded-[1.5rem] skill-icon-container relative overflow-hidden">
                      <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <i className={`${skill.icon} text-4xl ${skill.color} transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 relative z-10`}></i>
                    </div>
                    <span className="text-[11px] font-black tracking-[0.2em] text-slate-500 uppercase group-hover:text-blue-400 transition-colors">{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
