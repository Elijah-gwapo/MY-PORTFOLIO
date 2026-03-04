'use client';

import { motion } from 'framer-motion';

export default function UIUXConclusion() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="container mx-auto px-6 py-32 text-center relative z-10"
    >
      <div className="max-w-4xl mx-auto">
        <p className="text-slate-400 text-2xl leading-relaxed font-medium">
          These designs represent my commitment to blending high-performance logic with immersive, user-centric aesthetics. 
          This philosophy drives every project I undertake, guiding the way to our next collaboration.
        </p>
      </div>
    </motion.div>
  );
}
