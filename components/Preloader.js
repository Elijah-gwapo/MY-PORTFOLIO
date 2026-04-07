'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        const remaining = 100 - prev;
        const jump = Math.max(1, Math.floor(remaining / 12));
        return prev + jump;
      });
    }, 70);

    return () => clearInterval(interval);
  }, []);

  const words = ["LOGIC", "ARCHITECTURE", "DESIGN", "FULL-STACK", "DEVELOPER", "ELIJAH ORTEGA"];

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ y: "0%" }}
          exit={{ 
            y: ["0%", "15%", "-100%"],
            transition: { 
              times: [0, 0.2, 1],
              duration: 1.2, 
              ease: [0.76, 0, 0.24, 1] 
            }
          }}
          className="fixed inset-0 z-[9999] bg-[#030308] flex items-center justify-center overflow-hidden"
        >
          {/* Content that fades out as the shutter "dips" */}
          <motion.div 
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="relative w-full h-full flex flex-col items-center justify-center"
          >
            <div className="relative h-20 flex items-center justify-center mb-4">
              <AnimatePresence mode="wait">
                <motion.span
                  key={Math.floor(percent / 16.7)}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="text-4xl md:text-6xl font-black text-white uppercase tracking-[0.2em] italic"
                >
                  {words[Math.min(words.length - 1, Math.floor(percent / 16.7))]}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="absolute bottom-12 right-12">
               <span className="text-8xl md:text-[12rem] font-black text-white/[0.03] tabular-nums tracking-tighter leading-none select-none">
                 {percent}
               </span>
            </div>

            <motion.div 
              style={{ top: `${percent}%` }}
              className="absolute left-0 right-0 h-px bg-[#38BDF8]/50 shadow-[0_0_20px_#38BDF8]"
            />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[80vw] h-[80vh] border border-white/[0.02] rounded-full" />
            </div>

            {/* Bottom decorative text - Positioned to fit perfectly */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none opacity-10">
              <h2 className="text-[7vw] md:text-[10vw] font-black text-white uppercase tracking-tighter leading-none whitespace-nowrap italic">
                STAY FOCUSED
              </h2>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
