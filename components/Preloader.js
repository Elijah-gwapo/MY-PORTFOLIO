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
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: -1000,
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] bg-[#030308] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Animated Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          <div className="relative flex flex-col items-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h1 className="text-8xl md:text-9xl font-black text-white tracking-tighter">
                EO<span className="text-blue-600">.</span>
              </h1>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                className="absolute top-0 left-0 h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.8)]"
              />
            </div>

            {/* Status Text */}
            <div className="flex justify-between w-64 px-1">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">
                Initializing System
              </span>
              <span className="text-[10px] font-black text-white uppercase tracking-widest tabular-nums">
                {percent}%
              </span>
            </div>

            {/* Decorative Scanning Line */}
            <motion.div 
              animate={{ 
                top: ['0%', '100%', '0%'],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -left-20 -right-20 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent pointer-events-none"
            />
          </div>

          {/* Large background stroke text */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none opacity-5">
            <h2 className="text-[10vw] font-black text-white uppercase tracking-tighter leading-none whitespace-nowrap">
              STAY FOCUSED
            </h2>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
