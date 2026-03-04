'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Shield, Zap, Layers, ArrowRight, Lock, Eye, CheckCircle2, Globe, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const customCSS = `
  .scene-container-card {
    perspective: 1500px;
    transform-style: preserve-3d;
  }
  .preserve-3d {
    transform-style: preserve-3d;
  }
  .card-rig {
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    will-change: transform;
  }
  .card-layer {
    position: absolute;
    inset: 0;
    border-radius: 1.5rem;
    transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .card-glass {
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.2);
    box-shadow: 0 30px 60px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2);
  }
  @keyframes auto-spin {
    0% { transform: rotateX(15deg) rotateY(0deg) rotateZ(0deg); }
    100% { transform: rotateX(15deg) rotateY(360deg) rotateZ(0deg); }
  }
  .animate-auto-spin {
    animation: auto-spin 20s linear infinite;
  }
  @keyframes float-widget {
    0%, 100% { transform: translateY(0px) translateZ(var(--tz)); }
    50% { transform: translateY(-15px) translateZ(var(--tz)); }
  }
  .animate-float-1 { animation: float-widget 4s ease-in-out infinite; }
  .animate-float-2 { animation: float-widget 5s ease-in-out infinite 1s; }
  @keyframes scan-sweep {
    0% { transform: translateY(-100%) rotate(-45deg); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(200%) rotate(-45deg); opacity: 0; }
  }
  .laser-scanner {
    position: absolute;
    width: 200%;
    height: 4px;
    background: #10b981;
    box-shadow: 0 0 20px 5px #10b981, 0 0 40px 10px #34d399;
    left: -50%;
    top: 0;
    animation: scan-sweep 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    z-index: 50;
    pointer-events: none;
    mix-blend-mode: screen;
  }
  @keyframes ping-glow {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(3); opacity: 0; }
  }
  .map-node::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: #10b981;
    animation: ping-glow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
`;

export default function ObsidianCard() {
  const [hasMounted, setHasMounted] = useState(false);
  const [isExploded, setIsExploded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [tilt, setTilt] = useState({ x: 15, y: -25 });
  
  const containerRef = useRef(null);

  useEffect(() => { setHasMounted(true); }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current || !isHovering) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -30;
    const rotateY = ((x - centerX) / centerX) * 30;
    setTilt({ x: rotateX, y: rotateY });
  };

  const layerZ = {
    back: isExploded ? -100 : -1,
    hologram: isExploded ? -30 : 0,
    nfc: isExploded ? 40 : 1,
    front: isExploded ? 110 : 2
  };

  if (!hasMounted) return <section className="min-h-screen bg-[#050914]" />;

  return (
    <section className="relative w-full min-h-screen bg-[#050914] flex flex-col items-center justify-center py-20 px-6 font-sans overflow-hidden bg-grid">
      <style dangerouslySetInnerHTML={{ __html: customCSS }} />
      
      {/* Background large stroke text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0">
        <h1 className="text-[15vw] font-black text-white/[0.02] tracking-tighter uppercase whitespace-nowrap select-none">
          SYSTEM
        </h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 mb-12 text-center relative z-50"
      >
        <h2 className="text-4xl font-bold text-white mb-4 tracking-wide uppercase">Multi-Layered Interface</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          An exploration into 3D spatial UI design, featuring exploded-view architecture and real-time physical depth tracking.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          className="flex flex-col items-start text-left order-2 lg:order-1"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Next-Gen Architecture
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-6 uppercase">
            The card that <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
              thinks in 3D.
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-lg mb-10 leading-relaxed font-medium">
            We completely rebuilt the payment experience from the silicon up. Explore the multi-layered security and aerospace-grade materials that power the Obsidian Card.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
            <button className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 rounded-full font-black uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-3 group shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Order Card
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            <button 
              onClick={() => setIsExploded(!isExploded)}
              className={`w-full sm:w-auto px-10 py-5 rounded-full font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 border-2
                ${isExploded 
                  ? 'bg-emerald-500 border-emerald-400 text-white shadow-[0_0_40px_rgba(16,185,129,0.4)]' 
                  : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/30'
                }`}
            >
              <Layers className="w-5 h-5" />
              {isExploded ? 'Collapse' : 'Inspect'}
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, type: "spring" }}
          viewport={{ once: true }}
          ref={containerRef}
          className="scene-container-card relative w-full h-[500px] lg:h-[700px] flex items-center justify-center order-1 lg:order-2"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => { setIsHovering(false); setTilt({ x: 15, y: -25 }); }}
        >
          <div 
            className={`card-rig relative w-[320px] md:w-[380px] aspect-[1.586/1] preserve-3d ${!isHovering && !isExploded ? 'animate-auto-spin' : ''}`}
            style={{ 
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              marginTop: isHovering ? '-20px' : '0px'
            }}
          >
            <div className="card-layer card-glass" style={{ transform: `translateZ(${layerZ.back}px)` }}>
              <div className="absolute top-8 left-0 w-full h-12 bg-black/80 backdrop-blur-md" />
              <div className="absolute top-24 left-6 right-20 h-10 bg-white/10 rounded border border-white/5 flex items-center px-4">
                 <div className="w-full h-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-50" />
              </div>
            </div>
            <div className="card-layer overflow-hidden flex items-center justify-center border border-white/5 bg-gradient-to-tr from-emerald-900/20 to-blue-900/20" style={{ transform: `translateZ(${layerZ.hologram}px)` }}>
              <Globe className="absolute -right-10 -bottom-10 w-64 h-64 text-emerald-500/10 stroke-[0.5]" />
              <div className="map-node absolute top-[30%] left-[20%] w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              <div className="map-node absolute top-[45%] left-[60%] w-1.5 h-1.5 bg-emerald-400 rounded-full" style={{ animationDelay: '0.5s' }} />
              <div className="map-node absolute top-[60%] left-[80%] w-1.5 h-1.5 bg-emerald-400 rounded-full" style={{ animationDelay: '1s' }} />
            </div>
            <div className="card-layer flex items-center justify-center pointer-events-none" style={{ transform: `translateZ(${layerZ.nfc}px)` }}>
              <svg viewBox="0 0 100 100" className="w-[80%] h-[80%] opacity-20">
                <rect x="5" y="5" width="90" height="90" rx="10" fill="none" stroke="#34d399" strokeWidth="1" />
                <rect x="10" y="10" width="80" height="80" rx="8" fill="none" stroke="#34d399" strokeWidth="1" />
                <rect x="15" y="15" width="70" height="70" rx="6" fill="none" stroke="#34d399" strokeWidth="1" />
                <rect x="20" y="20" width="60" height="60" rx="4" fill="none" stroke="#34d399" strokeWidth="1" />
                <path d="M 50 20 L 50 0 M 50 80 L 50 100 M 20 50 L 0 50 M 80 50 L 100 50" stroke="#34d399" strokeWidth="1" />
              </svg>
            </div>
            <div className="card-layer" style={{ transform: `translateZ(${layerZ.front}px)` }}>
              {!isExploded && <div className="laser-scanner" />}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-10 rounded-md bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 border border-yellow-700/50 flex flex-col justify-between p-1 shadow-inner relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxwYXRoIGQ9Ik0wIDBoOHY4SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAgMGg0djRIMG00IDBoNHY0SDRNMCg0aDR2NEgwbTQtNGg0djRINCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjE1Ii8+PC9zdmc+')] mix-blend-overlay" />
                    <div className="w-full h-[1px] bg-yellow-700/50" /><div className="w-full h-[1px] bg-yellow-700/50" /><div className="w-full h-[1px] bg-yellow-700/50" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 text-white mb-1"><Lock className="w-4 h-4" /><span className="font-black tracking-tighter text-lg uppercase">Obsidian</span></div>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-emerald-400 uppercase">World Elite</span>
                  </div>
                </div>
                <div>
                  <div className="font-mono text-white/80 text-lg md:text-xl tracking-widest mb-4 drop-shadow-md">**** **** **** 4092</div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-[8px] text-white/50 uppercase tracking-widest mb-1">Cardholder Name</div>
                      <div className="text-white font-black tracking-wider uppercase text-sm drop-shadow-md">Elijah Ortega</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[8px] text-white/50 uppercase tracking-widest mb-1">Valid Thru</div>
                      <div className="font-mono text-white text-sm">12/28</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute glass-hud-core px-4 py-3 rounded-2xl flex items-center gap-3 animate-float-1 preserve-3d" style={{ '--tz': '100px', transform: `translate3d(-180px, -120px, 100px) rotateY(${tilt.y * 0.5}deg) rotateX(${tilt.x * 0.5}deg)`, opacity: isExploded ? 0 : 1, transition: 'opacity 0.3s' }}>
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30"><Shield className="w-4 h-4 text-emerald-400" /></div>
            <div><p className="text-[10px] text-slate-400 uppercase tracking-wider font-black">Security</p><p className="text-white text-xs font-black uppercase">AES-256 Active</p></div>
          </div>
          <div className="absolute glass-hud-core px-4 py-3 rounded-2xl flex items-center gap-3 animate-float-2 preserve-3d" style={{ '--tz': '80px', transform: `translate3d(160px, 100px, 80px) rotateY(${tilt.y * 0.5}deg) rotateX(${tilt.x * 0.5}deg)`, opacity: isExploded ? 0 : 1, transition: 'opacity 0.3s' }}>
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30"><Zap className="w-4 h-4 text-blue-400" /></div>
            <div><p className="text-[10px] text-slate-400 uppercase tracking-wider font-black">Latency</p><p className="text-white text-xs font-black uppercase">12ms Sync</p></div>
          </div>
          <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 preserve-3d ${isExploded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute top-1/2 left-1/2" style={{ transform: `translate3d(240px, -60px, ${layerZ.front}px)` }}><div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black tracking-widest uppercase"><div className="w-8 h-px bg-emerald-400/50" /> Interface Layer</div></div>
            <div className="absolute top-1/2 left-1/2" style={{ transform: `translate3d(240px, -20px, ${layerZ.nfc}px)` }}><div className="flex items-center gap-2 text-blue-400 text-[10px] font-black tracking-widest uppercase"><div className="w-8 h-px bg-blue-400/50" /> Near-Field Coil</div></div>
            <div className="absolute top-1/2 left-1/2" style={{ transform: `translate3d(240px, 20px, ${layerZ.hologram}px)` }}><div className="flex items-center gap-2 text-purple-400 text-[10px] font-black tracking-widest uppercase"><div className="w-8 h-px bg-purple-400/50" /> Holographic Mesh</div></div>
            <div className="absolute top-1/2 left-1/2" style={{ transform: `translate3d(240px, 60px, ${layerZ.back}px)` }}><div className="flex items-center gap-2 text-slate-400 text-[10px] font-black tracking-widest uppercase"><div className="w-8 h-px bg-slate-400/50" /> Obsidian Chassis</div></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
