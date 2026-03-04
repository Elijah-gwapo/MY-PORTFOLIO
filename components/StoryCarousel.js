'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MoreHorizontal, X, ArrowUpRight, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const customCSS = `
  .glass-panel-story {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .noise-overlay {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.15;
    mix-blend-mode: overlay;
    pointer-events: none;
  }
  .slide-transition {
    transition: transform 1.2s cubic-bezier(0.32, 0.72, 0, 1), 
                opacity 1.2s cubic-bezier(0.32, 0.72, 0, 1),
                filter 1.2s cubic-bezier(0.32, 0.72, 0, 1);
  }
  .text-glow-story {
    text-shadow: 0 0 20px rgba(56, 189, 248, 0.5);
  }
`;

const SLIDES = [
  { id: 1, bgClass: 'bg-[#060b14]', imageOverlay: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80', content: (<div className="flex flex-col h-full justify-center px-8 relative z-10 mix-blend-screen"><div className="w-12 h-1 bg-blue-500 mb-8 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div><h2 className="text-6xl font-black text-white leading-[1.1] tracking-tighter mb-6 uppercase text-glow-story">Stay <br/> Focused.</h2><p className="text-sm text-blue-200/70 max-w-[200px] leading-relaxed font-medium">The future belongs to those who build it today. Block the noise.</p></div>) },
  { id: 2, bgClass: 'bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#020617]', content: (<div className="flex flex-col h-full justify-between pt-24 pb-12 px-6 z-10 relative"><div className="glass-panel-story p-8 rounded-[2rem] border-t border-l border-white/20 relative overflow-hidden"><div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl"></div><h2 className="text-3xl font-serif text-white/90 leading-snug italic mb-4">"Silence the noise. Focus on the signal."</h2><div className="flex items-center gap-3 mt-8"><div className="w-8 h-[1px] bg-indigo-400"></div><span className="text-xs text-indigo-300 font-medium tracking-widest uppercase">Clarity</span></div></div><div className="self-end text-right"><h3 className="text-5xl font-light text-white/10 tracking-tighter">02</h3></div></div>) },
  { id: 3, bgClass: 'bg-[#0a0f1c]', imageOverlay: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', content: (<div className="flex flex-col h-full justify-center items-center px-6 relative z-10 text-center"><div className="w-full max-w-[280px] aspect-square rounded-full border border-white/10 flex items-center justify-center p-8 relative"><div className="absolute inset-0 bg-blue-500/10 rounded-full blur-md"></div><h2 className="text-4xl font-bold text-white leading-tight drop-shadow-2xl relative z-10">Consistency <br/> is the key <br/> to mastery.</h2></div><p className="text-xs text-blue-300/60 mt-10 tracking-[0.2em] uppercase">Day by day</p></div>) },
  { id: 4, bgClass: 'bg-black', content: (<div className="flex flex-col h-full justify-end px-6 pb-20 relative z-10"><h2 className="text-[5rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 leading-[0.85] tracking-tighter mb-6">NO <br/> EXCUSES</h2><div className="flex items-start gap-4"><div className="w-1 h-12 bg-blue-600"></div><p className="text-sm text-white/60 max-w-[220px] leading-relaxed">Do it with passion or not at all. Excuses build bridges to nowhere.</p></div></div>) },
  { id: 5, bgClass: 'bg-gradient-to-t from-[#020617] to-[#0ea5e9]/20', imageOverlay: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80', content: (<div className="flex flex-col h-full justify-between px-6 pt-24 pb-12 relative z-10"><div><h2 className="text-3xl font-light text-white leading-tight mb-4">Growth happens <br/> outside the</h2><h2 className="text-5xl font-black text-white tracking-tight text-glow-story">COMFORT <br/> ZONE</h2></div><div className="glass-panel-story rounded-3xl p-4 flex items-center gap-4 border border-blue-500/30"><div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-400/50"><ArrowUpRight className="w-6 h-6 text-blue-400" /></div><div><h4 className="text-white text-sm font-bold">Keep moving</h4><p className="text-[10px] text-white/60">Push your limits daily.</p></div></div></div>) },
  { id: 6, bgClass: 'bg-gradient-to-bl from-[#0f172a] via-[#050b14] to-[#1e1b4b]', content: (<div className="flex flex-col h-full justify-center px-8 relative z-10 text-center"><h2 className="text-5xl font-serif text-white/90 leading-tight mb-6 drop-shadow-lg">Fall seven times,<br/><span className="text-blue-400 font-bold italic text-glow-story">stand up eight.</span></h2><div className="w-16 h-1 bg-white/20 mx-auto mt-8 mb-4"></div><p className="text-xs text-white/50 tracking-[0.3em] uppercase">Resilience</p></div>) },
  { id: 7, bgClass: 'bg-[#020617]', content: (<div className="flex flex-col h-full justify-end px-6 pb-24 relative z-10"><div className="absolute top-20 right-10 w-24 h-24 border border-cyan-500/30 rounded-full flex items-center justify-center"><div className="w-16 h-16 bg-cyan-500/10 rounded-full animate-pulse blur-sm"></div></div><h2 className="text-4xl font-bold text-white mb-2">IDEAS ARE CHEAP.</h2><h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-8 tracking-tighter text-glow-story">EXECUTION IS <br/> EVERYTHING.</h2><div className="glass-panel-story p-4 inline-block rounded-xl border-l-4 border-l-cyan-400 backdrop-blur-md"><p className="text-sm text-cyan-50 font-medium">Stop overthinking. Start doing.</p></div></div>) },
  { id: 8, bgClass: 'bg-gradient-to-tr from-[#000000] to-[#0c4a6e]', imageOverlay: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80', content: (<div className="flex flex-col h-full items-center justify-center p-6 relative z-10"><div className="glass-panel-story w-full p-10 rounded-[2.5rem] flex flex-col items-center text-center shadow-2xl shadow-sky-900/50 border border-sky-400/20 backdrop-blur-xl"><div className="w-12 h-12 rounded-full border border-sky-400/50 mb-6 flex items-center justify-center text-sky-300"><div className="w-4 h-4 bg-sky-400/50 rounded-full animate-ping"></div></div><h3 className="text-2xl font-light text-white mb-4">Great things take time.</h3><h2 className="text-4xl font-bold text-sky-400 tracking-tight text-glow-story">TRUST THE <br/> PROCESS.</h2></div></div>) },
  { id: 9, bgClass: 'bg-[#050505]', content: (<div className="flex flex-col h-full justify-between pt-24 pb-12 px-8 relative z-10 mix-blend-screen"><div><h3 className="text-xl text-white/40 tracking-widest font-mono uppercase mb-4">Paradigm Shift</h3><h2 className="text-5xl font-bold text-white leading-tight">Fear is a <br/> reaction.</h2></div><div><h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-400 leading-tight mb-4 text-glow-story">Courage is a <br/> decision.</h2><div className="w-full h-px bg-gradient-to-r from-blue-500/50 to-transparent mb-4"></div><p className="text-xs text-white/50">Choose wisely.</p></div></div>) },
  { id: 10, bgClass: 'bg-gradient-to-b from-[#0a0f1c] to-[#000000]', imageOverlay: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&w=800&q=80', content: (<div className="flex flex-col h-full items-center justify-end pb-24 px-6 relative z-10 text-center"><div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none"></div><h2 className="text-6xl font-black text-white leading-[0.9] tracking-tighter mb-4 relative z-10">CREATE <br/> THE <br/> <span className="text-blue-500 text-glow-story">FUTURE</span></h2><p className="text-sm text-blue-200/80 max-w-[240px] leading-relaxed relative z-10 mt-4">You don't predict it, you build it. Let's get to work.</p></div>) }
];

const StoryHeader = () => (
  <div className="absolute top-0 left-0 w-full z-50 p-4 pb-0 flex flex-col gap-3">
    <div className="flex gap-1.5 w-full">
      <div className="h-0.5 flex-1 bg-white/20 rounded-full overflow-hidden"><div className="h-full w-full bg-white rounded-full" /></div>
      <div className="h-0.5 flex-1 bg-white/20 rounded-full overflow-hidden"><div className="h-full w-0 bg-white rounded-full" /></div>
      <div className="h-0.5 flex-1 bg-white/20 rounded-full overflow-hidden"><div className="h-full w-0 bg-white rounded-full" /></div>
    </div>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center bg-black/50 text-white overflow-hidden"><div className="w-3 h-3 border-2 border-white rounded-sm"></div></div>
        <span className="text-white text-xs font-medium tracking-wide drop-shadow-md">ELIJAH <span className="opacity-50 font-normal">14h</span></span>
      </div>
      <div className="flex items-center gap-2 text-white drop-shadow-md"><MoreHorizontal className="w-5 h-5 opacity-80" /><X className="w-5 h-5 opacity-80" /></div>
    </div>
  </div>
);

export default function StoryCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [cardWidth, setCardWidth] = useState(320);
  const [hasMounted, setHasMounted] = useState(false);
  const containerRef = useRef(null);
  const gap = 24;

  useEffect(() => {
    setHasMounted(true);
    const handleResize = () => {
      if (window.innerWidth < 640) setCardWidth(280);
      else if (window.innerWidth < 1024) setCardWidth(320);
      else setCardWidth(360);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % SLIDES.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, hasMounted]);

  if (!hasMounted) return <div className="min-h-screen bg-[#0a0f1c]" />;

  const getCardStyle = (index) => {
    const offset = index - activeIndex;
    const itemFullWidth = cardWidth + gap;
    const translateX = offset * itemFullWidth;
    const isActive = offset === 0;
    const scale = isActive ? 1 : 0.85;
    const zIndex = 20 - Math.abs(offset);
    const opacity = Math.abs(offset) > 2 ? 0 : (isActive ? 1 : 0.6);
    const filter = isActive ? 'blur(0px)' : 'blur(2px)';
    return {
      transform: `translateX(${translateX}px) scale(${scale})`,
      zIndex, opacity, filter, width: `${cardWidth}px`
    };
  };

  return (
    <section className="relative w-full min-h-screen bg-[#0a0f1c] flex flex-col items-center justify-center overflow-hidden font-sans py-20 bg-mesh">
        <style dangerouslySetInnerHTML={{ __html: customCSS }} />
        
        {/* Background large stroke text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0">
          <h1 className="text-[15vw] font-black text-white/[0.02] tracking-tighter uppercase whitespace-nowrap select-none">
            STORY
          </h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 mb-12 text-center relative z-10"
        >
            <h2 className="text-4xl font-bold text-white mb-4 tracking-wide uppercase">Immersive Story Carousel</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                A premium immersive storytelling experience inspired by modern social media interfaces, optimized for engagement.
            </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          ref={containerRef}
          className="relative w-full h-[650px] lg:h-[750px] flex items-center justify-center z-10 perspective-1000"
        >
          {SLIDES.map((slide, index) => (
            <div key={slide.id} onClick={() => setActiveIndex(index)} className={`absolute h-full rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] slide-transition cursor-pointer border border-white/10 ${slide.bgClass}`} style={getCardStyle(index)}>
              {slide.imageOverlay && (<img src={slide.imageOverlay} alt="Texture" className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay pointer-events-none" draggable="false" />)}
              <div className="absolute inset-0 noise-overlay" />
              <StoryHeader />
              {slide.content}
              {activeIndex !== index && (<div className="absolute inset-0 bg-[#0a0f1c]/60 pointer-events-none transition-opacity duration-700" />)}
            </div>
          ))}
        </motion.div>

        <div className="flex items-center gap-6 mt-12 z-20">
          <button onClick={() => setActiveIndex((curr) => (curr - 1 + SLIDES.length) % SLIDES.length)} className="w-12 h-12 rounded-full glass-panel-story shadow-xl flex items-center justify-center text-white/80 hover:text-white hover:scale-110 hover:bg-white/10 transition-all border border-white/10"><ChevronLeft className="w-5 h-5" /></button>
          <button onClick={() => setIsAutoPlaying(!isAutoPlaying)} className="w-14 h-14 rounded-full bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all">{isAutoPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}</button>
          <button onClick={() => setActiveIndex((curr) => (curr + 1) % SLIDES.length)} className="w-12 h-12 rounded-full glass-panel-story shadow-xl flex items-center justify-center text-white/80 hover:text-white hover:scale-110 hover:bg-white/10 transition-all border border-white/10"><ChevronRight className="w-5 h-5" /></button>
        </div>
    </section>
  );
}
