'use client';

import { motion } from 'framer-motion';
import { Github, Facebook, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: <Github size={18} />, href: "https://github.com/Elijah-gwapo" },
    { icon: <Facebook size={18} />, href: "https://www.facebook.com/kyuu420" },
    { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/elijah-ortega-8a3347386/" },
    { icon: <Mail size={18} />, href: "mailto:eaortega04@proton.me" }
  ];

  return (
    <footer className="bg-[#030308] border-t border-white/5 py-12">
      <div className="container mx-auto px-6 flex flex-col items-center gap-8">
        
        <div className="flex gap-6">
          {socialLinks.map((social, i) => (
            <a 
              key={i} 
              href={social.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors duration-300"
            >
              {social.icon}
            </a>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-xl font-black text-white tracking-tighter mb-2">
            ELIJAH<span className="text-[#38BDF8]">.</span>
          </h2>
          <p className="text-[10px] uppercase tracking-[0.4em] text-slate-700 font-bold">
            &copy; 2026 Designed & Engineered by Elijah Ortega
          </p>
        </div>

      </div>
    </footer>
  );
}
