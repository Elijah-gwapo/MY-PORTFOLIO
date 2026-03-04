'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Shield, Zap, AlertTriangle, Cpu, Layers, Power, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const customCSS = `
  .scene-container { perspective: 1200px; touch-action: none; }
  .world { transform-style: preserve-3d; transition: transform 0.1s ease-out; }
  .world.snap-back { transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1); }
  .preserve-3d { transform-style: preserve-3d; }
  .grid-floor { position: absolute; width: 300vw; height: 300vh; left: -100vw; top: -100vh; background-image: linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px); background-size: 100px 100px; transform: rotateX(90deg) translateZ(-250px); opacity: 0.15; mask-image: radial-gradient(circle at center, black 10%, transparent 50%); -webkit-mask-image: radial-gradient(circle at center, black 10%, transparent 50%); }
  .animate-tesseract { animation: spin-cube 20s linear infinite; }
  .animate-tesseract-reverse { animation: spin-cube-reverse 15s linear infinite; }
  .animate-tesseract-slow { animation: spin-cube 40s linear infinite; }
  @keyframes spin-cube { 0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); } 100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(180deg); } }
  @keyframes spin-cube-reverse { 0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); } 100% { transform: rotateX(-360deg) rotateY(-360deg) rotateZ(-180deg); } }
  @keyframes spin-ring-1 { 0% { transform: rotateX(75deg) rotateY(0deg) rotateZ(0deg); } 100% { transform: rotateX(75deg) rotateY(0deg) rotateZ(360deg); } }
  @keyframes spin-ring-2 { 0% { transform: rotateX(45deg) rotateY(60deg) rotateZ(0deg); } 100% { transform: rotateX(45deg) rotateY(60deg) rotateZ(-360deg); } }
  @keyframes spin-ring-3 { 0% { transform: rotateX(15deg) rotateY(120deg) rotateZ(0deg); } 100% { transform: rotateX(15deg) rotateY(120deg) rotateZ(360deg); } }
  .overload-shake { animation: shake 0.3s ease-in-out infinite; }
  @keyframes shake { 0%, 100% { transform: translate3d(0,0,0); } 25% { transform: translate3d(4px, -4px, 0); } 50% { transform: translate3d(-4px, 4px, 0); } 75% { transform: translate3d(4px, 4px, 0); } }
  .glass-hud-core { background: rgba(10, 15, 25, 0.5); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 30px 60px -10px rgba(0,0,0,0.8); }
  input[type=range].core-slider { -webkit-appearance: none; background: rgba(255,255,255,0.1); height: 4px; border-radius: 2px; outline: none; width: 100%; }
  input[type=range].core-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; background: var(--theme-hex); border-radius: 50%; cursor: pointer; box-shadow: 0 0 15px var(--theme-hex); transition: transform 0.1s; }
`;

const THEMES = [
  { id: 'cyan', hex: '#06b6d4', glow: 'rgba(6,182,212,0.6)', name: 'Quantum Cyan' },
  { id: 'fuchsia', hex: '#d946ef', glow: 'rgba(217,70,239,0.6)', name: 'Plasma Pink' },
  { id: 'emerald', hex: '#10b981', glow: 'rgba(16,185,129,0.6)', name: 'Toxic Green' },
  { id: 'amber', hex: '#f59e0b', glow: 'rgba(245,158,11,0.6)', name: 'Solar Gold' },
  { id: 'danger', hex: '#ef4444', glow: 'rgba(239,68,68,0.8)', name: 'Critical Red', hidden: true }
];

const CubeFace = ({ rot, tZ, size, color, opacity, blur, showPattern }) => (
  <div className="absolute top-1/2 left-1/2 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]" style={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2, transform: `${rot} translateZ(${tZ}px)`, backgroundColor: opacity, border: `1px solid ${color}`, backdropFilter: blur ? `blur(${blur}px)` : 'none', boxShadow: `inset 0 0 ${size / 3}px ${color}80` }}>
    {showPattern && (<div className="absolute inset-2 border border-white/20 rounded-sm flex items-center justify-center pointer-events-none"><div className="w-6 h-6 rounded-full opacity-50" style={{ border: `1px dashed ${color}` }} /></div>)}
  </div>
);

const TesseractCube = ({ size, expand, color, opacity, blur, spinClass, showPatterns }) => {
  const faces = [{ rot: 'rotateY(0deg)' }, { rot: 'rotateY(180deg)' }, { rot: 'rotateY(90deg)' }, { rot: 'rotateY(-90deg)' }, { rot: 'rotateX(90deg)' }, { rot: 'rotateX(-90deg)' }];
  return (<div className={`absolute top-1/2 left-1/2 preserve-3d ${spinClass}`} style={{ width: 0, height: 0 }}>{faces.map((f, i) => (<CubeFace key={i} rot={f.rot} tZ={expand} size={size} color={color} opacity={opacity} blur={blur} showPattern={showPatterns} />))}</div>);
};

const OrbitRings = ({ color, speed }) => (
  <div className="absolute top-1/2 left-1/2 preserve-3d" style={{ width: 0, height: 0 }}>
    <div className="absolute top-1/2 left-1/2 rounded-full border border-white/20 transition-colors duration-500" style={{ width: 400, height: 400, marginLeft: -200, marginTop: -200, boxShadow: `0 0 30px ${color}40, inset 0 0 20px ${color}40`, animation: `spin-ring-1 ${12 / speed}s linear infinite` }} />
    <div className="absolute top-1/2 left-1/2 rounded-full border border-white/20 transition-colors duration-500" style={{ width: 500, height: 500, marginLeft: -250, marginTop: -250, boxShadow: `0 0 20px ${color}40, inset 0 0 20px ${color}40`, animation: `spin-ring-2 ${15 / speed}s linear infinite` }} />
    <div className="absolute top-1/2 left-1/2 rounded-full border border-white/20 transition-colors duration-500" style={{ width: 600, height: 600, marginLeft: -300, marginTop: -300, boxShadow: `0 0 10px ${color}40, inset 0 0 20px ${color}40`, animation: `spin-ring-3 ${18 / speed}s linear infinite` }} />
  </div>
);

export default function QuantumCore() {
  const [hasMounted, setHasMounted] = useState(false);
  const [themeId, setThemeId] = useState('cyan');
  const [containment, setContainment] = useState(80);
  const [coreDensity, setCoreDensity] = useState(40);
  const [resonance, setResonance] = useState(true);
  const [overload, setOverload] = useState(false);
  const [rotation, setRotation] = useState({ x: -15, y: -30 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });

  useEffect(() => { setHasMounted(true); }, []);

  if (!hasMounted) return <section className="min-h-screen bg-[#030508]" />;

  const activeTheme = overload ? THEMES.find(t => t.id === 'danger') : THEMES.find(t => t.id === themeId);
  const activeContainment = overload ? 280 : containment;
  const activeDensity = overload ? 140 : coreDensity;
  const ringSpeed = overload ? 6 : (resonance ? 1 : 0.2);
  const integrityPercent = Math.max(0, Math.min(100, 100 - ((activeContainment - 80) / 170) * 100));
  const outputPercent = Math.max(0, Math.min(100, ((activeDensity - 40) / 110) * 100));

  const handlePointerDown = (e) => { setIsDragging(true); dragStart.current = { x: e.clientX || e.touches?.[0].clientX, y: e.clientY || e.touches?.[0].clientY, rotX: rotation.x, rotY: rotation.y }; };
  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || e.touches?.[0].clientX;
    const currentY = e.clientY || e.touches?.[0].clientY;
    const deltaX = currentX - dragStart.current.x;
    const deltaY = currentY - dragStart.current.y;
    const newRotY = dragStart.current.rotY + (deltaX * 0.4);
    const newRotX = Math.max(-60, Math.min(60, dragStart.current.rotX - (deltaY * 0.4)));
    setRotation({ x: newRotX, y: newRotY });
  };
  const handlePointerUp = () => setIsDragging(false);
  const resetView = () => setRotation({ x: -15, y: -30 });

  return (
    <section className="py-20 bg-[#030508] relative overflow-hidden bg-grid">
      <style dangerouslySetInnerHTML={{ __html: customCSS }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0">
        <h1 className="text-[15vw] font-black text-white/[0.02] tracking-tighter uppercase whitespace-nowrap select-none">ENGINE</h1>
      </div>
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="container mx-auto px-4 mb-12 text-center relative z-50">
        <h2 className="text-4xl font-bold text-white mb-4 tracking-wide uppercase">Quantum Tesseract Engine</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">An advanced 3D interactive environment demonstrating complex state synchronization, 3D CSS transforms, and real-time physics simulation.</p>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative w-full h-[800px] overflow-hidden font-sans scene-container cursor-grab active:cursor-grabbing selection:bg-transparent"
        style={{ '--theme-hex': activeTheme.hex }}
        onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerLeave={handlePointerUp}
      >
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full blur-[200px] pointer-events-none transition-all duration-1000 mix-blend-screen ${overload ? 'animate-pulse' : ''}`} style={{ background: activeTheme.glow, opacity: overload ? 0.8 : 0.5 }} />
        <div className={`world w-full h-full absolute inset-0 flex items-center justify-center ${!isDragging ? 'snap-back' : ''}`} style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}>
          <div className="grid-floor transition-colors duration-1000" style={{ color: activeTheme.hex }} />
          <div className={`preserve-3d ${overload ? 'overload-shake' : ''}`}>
            <OrbitRings color={activeTheme.hex} speed={ringSpeed} />
            <div className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full -mt-8 -ml-8 transition-all duration-500 z-10" style={{ backgroundColor: activeTheme.hex, boxShadow: `0 0 80px 30px ${activeTheme.glow}`, transform: `scale(${overload ? 1.5 : 1 + (activeDensity-40)/200})` }} />
            <TesseractCube size={160} expand={activeContainment} color={activeTheme.hex} opacity="rgba(255,255,255,0.02)" blur={4} spinClass={resonance ? 'animate-tesseract' : 'animate-tesseract-slow'} showPatterns={true} />
            <TesseractCube size={80} expand={activeDensity} color={activeTheme.hex} opacity={activeTheme.glow} blur={0} spinClass={resonance ? 'animate-tesseract-reverse' : 'animate-tesseract-slow'} showPatterns={false} />
          </div>
          <div className="absolute glass-hud-core p-6 rounded-[2rem] w-72 pointer-events-none transition-shadow duration-500" style={{ transform: 'translate3d(-550px, -150px, 150px) rotateY(25deg)', boxShadow: `0 30px 60px -10px rgba(0,0,0,0.8), inset 0 0 20px ${activeTheme.glow}` }}>
            <div className="flex items-center gap-3 mb-8"><Cpu className="w-6 h-6" style={{ color: activeTheme.hex }} /><h3 className="text-white font-bold tracking-[0.2em] uppercase text-sm">Diagnostics</h3></div>
            <div className="space-y-6">
              <div><div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 text-white/70"><span>Integrity</span><span style={{ color: activeTheme.hex }}>{integrityPercent.toFixed(0)}%</span></div><div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden"><div className="h-full transition-all duration-300 rounded-full" style={{ width: `${integrityPercent}%`, backgroundColor: activeTheme.hex, boxShadow: `0 0 10px ${activeTheme.hex}` }} /></div></div>
              <div><div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 text-white/70"><span>Output Power</span><span style={{ color: activeTheme.hex }}>{outputPercent.toFixed(0)}%</span></div><div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden"><div className="h-full transition-all duration-300 rounded-full" style={{ width: `${outputPercent}%`, backgroundColor: activeTheme.hex, boxShadow: `0 0 10px ${activeTheme.hex}` }} /></div></div>
              <div className="pt-4 border-t border-white/10"><div className="flex items-center gap-3">{overload ? <AlertTriangle className="w-5 h-5 text-red-500 animate-pulse" /> : <Shield className="w-5 h-5 text-emerald-400" />}<div><p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">System Status</p><p className={`font-bold ${overload ? 'text-red-500' : 'text-emerald-400'}`}>{overload ? 'CRITICAL OVERLOAD' : 'STABLE'}</p></div></div></div>
            </div>
          </div>
          <div className="absolute glass-hud-core p-6 rounded-[2rem] w-72 transition-shadow duration-500" style={{ transform: 'translate3d(550px, -150px, 150px) rotateY(-25deg)', boxShadow: `0 30px 60px -10px rgba(0,0,0,0.8), inset 0 0 20px ${activeTheme.glow}` }} onPointerDown={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-8 pointer-events-none"><Layers className="w-6 h-6" style={{ color: activeTheme.hex }} /><h3 className="text-white font-bold tracking-[0.2em] uppercase text-sm">Parameters</h3></div>
            <div className={`space-y-8 ${overload ? 'opacity-50 pointer-events-none' : ''} transition-opacity`}>
              <div><label className="flex justify-between text-xs font-bold uppercase tracking-wider mb-3 text-white/70">Containment Field</label><input type="range" min="80" max="250" value={containment} onChange={(e) => setContainment(Number(e.target.value))} className="core-slider" /></div>
              <div><label className="flex justify-between text-xs font-bold uppercase tracking-wider mb-3 text-white/70">Core Density</label><input type="range" min="40" max="150" value={coreDensity} onChange={(e) => setCoreDensity(Number(e.target.value))} className="core-slider" /></div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-wider text-white/70">Resonance</span><button onClick={() => setResonance(!resonance)} className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${resonance ? 'bg-white/20' : 'bg-black/50 border border-white/20'}`}><div className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-all duration-300 ${resonance ? 'translate-x-6 bg-white shadow-[0_0_10px_white]' : 'translate-x-0 bg-white/50'}`} /></button></div>
            </div>
          </div>
        </div> 
        <div className="absolute top-8 left-8 z-50 pointer-events-none"><h1 className="text-4xl font-black text-white tracking-tighter mb-1 transition-colors duration-500" style={{ textShadow: `0 0 20px ${activeTheme.glow}` }}>AEGIS CORE</h1><p className="text-xs text-white/50 tracking-[0.3em] uppercase font-bold">Quantum Tesseract Engine</p></div>
        <div className="absolute top-8 right-8 z-50"><button onClick={(e) => { e.stopPropagation(); resetView(); }} className="glass-hud-core p-4 rounded-full text-white/70 hover:text-white hover:scale-110 transition-all border border-white/10" title="Recenter Camera"><RotateCcw className="w-5 h-5" /></button></div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 glass-hud-core px-10 py-5 rounded-[2.5rem] flex items-center gap-12 border border-white/10" onPointerDown={e => e.stopPropagation()}>
          <div className="flex flex-col items-center"><span className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-3">Plasma State</span><div className="flex gap-4">{THEMES.filter(t => !t.hidden).map(t => (<button key={t.id} onClick={() => { setThemeId(t.id); setOverload(false); }} className={`w-8 h-8 rounded-full transition-all duration-300 ${themeId === t.id && !overload ? 'scale-125 ring-2 ring-white ring-offset-4 ring-offset-[#030508]' : 'hover:scale-110 opacity-50 hover:opacity-100'}`} style={{ backgroundColor: t.hex, boxShadow: themeId === t.id && !overload ? `0 0 20px ${t.hex}` : 'none' }} title={t.name} />))}</div></div>
          <div className="w-px h-12 bg-white/10" />
          <div className="flex flex-col items-center"><span className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-3">Emergency Control</span><button onClick={() => setOverload(!overload)} className={`relative px-10 py-3 rounded-full font-black tracking-[0.2em] uppercase transition-all duration-500 flex items-center gap-3 overflow-hidden border-2 ${overload ? 'bg-red-500 border-red-400 text-white shadow-[0_0_40px_rgba(239,68,68,0.8)] animate-pulse scale-105' : 'bg-black/50 border-red-500/30 text-red-500 hover:bg-red-500/10 hover:border-red-500/60'}`}><Power className="w-5 h-5 relative z-10" /><span className="relative z-10">{overload ? 'ABORT' : 'OVERLOAD'}</span></button></div>
        </div>
        <div className="absolute bottom-40 left-1/2 -translate-x-1/2 text-white/20 text-[10px] tracking-[0.3em] uppercase animate-pulse pointer-events-none">[ Drag environment to rotate camera ]</div>
      </motion.div>
    </section>
  );
}
