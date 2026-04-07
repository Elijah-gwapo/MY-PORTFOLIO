'use client';

import { motion } from 'framer-motion';

export default function UIUXConclusion() {
  return (
    <section className="py-64 bg-[#030308] relative overflow-hidden flex items-center justify-center">

      {/* Structural Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <motion.h2 
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-[30vw] font-black text-white/[0.01] uppercase tracking-tighter leading-none select-none"
        >
          VISION
        </motion.h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <h2 className="text-4xl md:text-6xl font-light text-white tracking-tighter leading-tight">
              DESIGN IS NOT JUST HOW IT LOOKS.<br />
              <span className="font-black text-[#38BDF8]">IT'S HOW IT WORKS.</span>
            </h2>

            <div className="h-px w-24 bg-white/10 mx-auto"></div>

            <p className="text-slate-500 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto leading-relaxed uppercase">
              Pushing the boundaries of digital experiences through <br />
              <span className="text-white">minimalism, performance, and purpose.</span>
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true }}
              className="pt-12"
            >
              <span className="text-[10px] font-black text-slate-800 uppercase tracking-[1.5em]">2026 Edition</span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
