'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-[#030308] border-t border-white/5 py-12 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl font-black text-white tracking-tighter mb-4">
            ELIJAH<span className="text-blue-600">.</span>
          </h2>
          <p className="text-[11px] uppercase tracking-[0.4em] text-slate-500 font-black">
            Designed & Engineered by Elijah Ortega &copy; 2025
          </p>
        </motion.div>
      </div>
      
      {/* Background large stroke text */}
      <div className="absolute -bottom-10 right-0 pointer-events-none z-0">
        <h2 className="text-[10vw] font-black text-white/[0.02] uppercase tracking-tighter leading-none select-none">
          CREATIVE
        </h2>
      </div>
    </footer>
  );
}
