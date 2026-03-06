'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import HackerText from './HackerText';

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Design', href: '#sample-design' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'py-4 bg-[#030308]/80 backdrop-blur-xl border-b border-white/5' : 'py-8 bg-transparent'}`}>
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 origin-left"
        style={{ scaleX }}
      />
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black text-white tracking-tighter"
        >
          <Link href="/" className="flex items-center">
            <HackerText text="ELIJAH" />
            <span className="text-blue-600">.</span>
          </Link>
        </motion.div>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link 
                href={link.href} 
                className="px-5 py-2 text-[11px] font-black tracking-[0.2em] text-slate-400 hover:text-white uppercase transition-colors relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-5 right-5 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-10 h-10 flex items-center justify-center text-white">
            <div className="w-6 space-y-1.5">
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : 'w-6'}`}></span>
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'w-4'}`}></span>
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : 'w-5'}`}></span>
            </div>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 w-full bg-[#030308]/95 backdrop-blur-2xl border-b border-white/5 shadow-2xl"
        >
          <div className="flex flex-col py-8 px-6 gap-6">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-sm font-black tracking-[0.3em] text-slate-400 hover:text-blue-500 uppercase transition-colors" onClick={() => setIsMenuOpen(false)}>{link.name}</Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
