'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Introduction', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Works', href: '#projects' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
    { name: 'Resume', href: '/eaortega-resume.pdf', download: true },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${isScrolled ? 'py-4 md:py-6 bg-[#030308]/80 backdrop-blur-xl border-b border-white/5' : 'py-6 md:py-10 bg-transparent'}`}>
      <div className="container mx-auto px-6 md:px-10 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg font-black tracking-tighter text-white z-[110]"
        >
          <Link href="/" className="flex items-center gap-1 group uppercase" onClick={() => setIsMenuOpen(false)}>
            ELIJAH ORTEGA<span className="w-1.5 h-1.5 bg-[#38BDF8] rounded-full group-hover:scale-[2.5] transition-transform duration-500 shadow-[0_0_10px_#38BDF8]"></span>
          </Link>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link, i) => (
            link.download ? (
              <a 
                key={link.name} 
                href={link.href} 
                download="Elijah_Ortega_Resume.pdf"
                className="text-[10px] font-black uppercase tracking-[0.4em] text-[#38BDF8] hover:text-white transition-colors duration-500 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#38BDF8] group-hover:w-full transition-all duration-500"></span>
              </a>
            ) : (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-colors duration-500 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#38BDF8] group-hover:w-full transition-all duration-500"></span>
              </Link>
            )
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white z-[110] p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-[#030308] z-[100] flex flex-col items-center justify-center p-10"
            >
              <div className="flex flex-col items-center gap-10">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {link.download ? (
                      <a 
                        href={link.href} 
                        download="Elijah_Ortega_Resume.pdf"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-2xl font-black uppercase tracking-[0.3em] text-[#38BDF8] hover:text-white transition-colors"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link 
                        href={link.href} 
                        onClick={() => setIsMenuOpen(false)}
                        className="text-2xl font-black uppercase tracking-[0.3em] text-slate-500 hover:text-[#38BDF8] transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
              
              <div className="absolute bottom-20 flex flex-col items-center gap-4 opacity-20">
                <span className="text-[10px] font-black uppercase tracking-[0.5em]">Based in Cebu, PH</span>
                <div className="w-12 h-px bg-white"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
