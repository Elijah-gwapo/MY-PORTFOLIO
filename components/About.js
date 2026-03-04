'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-32 bg-[#0a0f1c] relative overflow-hidden bg-dots">
      
      {/* Background large stroke text */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none z-0">
        <h2 className="text-[20vw] font-black text-white/[0.02] uppercase tracking-tighter leading-none select-none">
          ABOUT
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
          <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-sm mb-4 block">GET TO KNOW ME</span>
          <h2 className="text-6xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">About Me</h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)]"></div>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -150, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, duration: 1 }}
            viewport={{ once: true }}
            className="p-8 md:p-16 rounded-[3rem] glass border border-white/5 relative overflow-hidden group hover:border-blue-500/20 transition-all duration-500"
          >
            {/* Animated Glow inside card */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] group-hover:bg-blue-600/20 transition-all duration-700"></div>

            <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
              <div className="space-y-8 text-xl text-slate-400 leading-relaxed">
                <p>
                  I'm <span className="text-white font-black text-glow">Elijah Alrhoy Ortega</span>, an Information Technology undergraduate at Benedicto College. 
                  I'm passionate about creating modern, responsive websites and applications with a focus on 
                  user experience and clean code.
                </p>
                <p>
                  My educational journey includes graduating from AMA Computer Learning Center for Senior High School 
                  and Mandaue City Comprehensive National High School (MCCNHS) for Junior High School.
                </p>
              </div>
              
              <div className="space-y-8 text-xl text-slate-400 leading-relaxed">
                 <p>
                  Through my studies, I've developed skills in web development technologies including HTML, CSS, 
                  JavaScript, and various frameworks. I am always eager to learn new tools and improve my craft.
                </p>
                <div className="pt-6">
                    <div className="flex items-center gap-6 text-white font-serif text-2xl italic border-l-4 border-blue-600 pl-8 py-2">
                        "The best way to predict the future is to create it."
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
