'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Gamepad2, RotateCcw, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const customCSS = `
  .arcade-cabinet {
    position: relative;
    background: #050505;
    border-radius: 2rem;
    padding: 20px;
    box-shadow: 
      inset 0 0 100px rgba(0,0,0,0.9),
      0 30px 60px -10px rgba(0,0,0,0.8),
      0 0 0 4px #1a1a24;
  }
  .crt-screen {
    position: relative;
    overflow: hidden;
    border-radius: 1rem;
    background: #020617;
    box-shadow: inset 0 0 30px rgba(0,0,0,0.8);
    mask-image: radial-gradient(circle, white 80%, black 100%);
    -webkit-mask-image: radial-gradient(circle, white 80%, black 100%);
  }
  .crt-screen::before {
    content: " ";
    display: block;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
    z-index: 2;
    background-size: 100% 4px, 6px 100%;
    pointer-events: none;
  }
  .glass-hud-game {
    background: rgba(10, 15, 25, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

export default function NeonRunner() {
  const [hasMounted, setHasMounted] = useState(false);
  const [gameState, setGameState] = useState('idle'); 
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const canvasRef = useRef(null);
  const cabinetRef = useRef(null);
  const gameWrapperRef = useRef(null);
  
  const engine = useRef({
    ctx: null, animationId: null, frame: 0, width: 1000, height: 400,
    speed: 5, gravity: 0.8, floorY: 340,
    player: { x: 100, y: 200, w: 30, h: 30, vy: 0, jumpsLeft: 2, color: '#38bdf8', trail: [] },
    platforms: [], obstacles: [], coins: [], particles: [],
    currentScore: 0
  });

  useEffect(() => { setHasMounted(true); }, []);

  const handleJump = useCallback(() => {
    if (gameState !== 'playing') return;
    const state = engine.current;
    const p = state.player;
    if (p.jumpsLeft > 0) {
      p.vy = -14;
      p.jumpsLeft -= 1;
      for (let i=0; i<5; i++) {
        state.particles.push({
          x: p.x + p.w/2, y: p.y + p.h,
          vx: (Math.random() - 0.5) * 4, vy: Math.random() * 2,
          life: 1, color: '#ffffff'
        });
      }
    }
  }, [gameState]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.key === ' ') {
        if (gameState === 'playing') {
          e.preventDefault();
          handleJump();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleJump, gameState]);

  const handleGameOver = useCallback(() => {
    if (engine.current.animationId) cancelAnimationFrame(engine.current.animationId);
    setScore(engine.current.currentScore);
    setGameState('gameover');
  }, []);

  const gameLoop = useCallback(() => {
    const state = engine.current;
    if (!state.ctx) return;
    const ctx = state.ctx;
    state.frame++;
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, state.width, state.height);
    state.speed = 5 + (state.frame / 1000);
    if (state.frame % 100 === 0 || (Math.random() < 0.01 && state.frame > 100)) {
      const pWidth = 100 + Math.random() * 150;
      const pY = state.floorY - 60 - Math.random() * 120;
      state.platforms.push({ x: state.width, y: pY, w: pWidth, h: 20 });
      if (Math.random() > 0.5) state.coins.push({ x: state.width + pWidth/2 - 10, y: pY - 40, w: 20, h: 20 });
    }
    if (state.frame % 120 === 0 || (Math.random() < 0.015 && state.frame > 200)) {
      state.obstacles.push({ x: state.width, y: state.floorY - 30, w: 30, h: 30 });
    }
    if (Math.random() < 0.02) state.coins.push({ x: state.width, y: state.floorY - 40, w: 20, h: 20 });
    const p = state.player;
    p.vy += state.gravity;
    p.y += p.vy;
    p.trail.push({ x: p.x, y: p.y });
    if (p.trail.length > 10) p.trail.shift();
    let isGroundedThisFrame = false;
    if (p.y + p.h >= state.floorY) { p.y = state.floorY - p.h; p.vy = 0; isGroundedThisFrame = true; }
    for (let i = state.platforms.length - 1; i >= 0; i--) {
      const plat = state.platforms[i]; plat.x -= state.speed;
      if (p.vy > 0 && p.y + p.h >= plat.y && p.y + p.h - p.vy <= plat.y && p.x + p.w > plat.x && p.x < plat.x + plat.w) { p.y = plat.y - p.h; p.vy = 0; isGroundedThisFrame = true; }
      if (plat.x + plat.w < 0) state.platforms.splice(i, 1);
    }
    if (isGroundedThisFrame) p.jumpsLeft = 2;
    for (let i = state.coins.length - 1; i >= 0; i--) {
      const c = state.coins[i]; c.x -= state.speed;
      if (p.x < c.x + c.w && p.x + p.w > c.x && p.y < c.y + c.h && p.y + p.h > c.y) {
        state.currentScore += 10;
        for(let j=0; j<8; j++){ state.particles.push({ x: c.x + c.w/2, y: c.y + c.h/2, vx: (Math.random() - 0.5) * 8, vy: (Math.random() - 0.5) * 8, life: 1, color: '#facc15' }); }
        state.coins.splice(i, 1);
      } else if (c.x + c.w < 0) state.coins.splice(i, 1);
    }
    let isDead = false;
    for (let i = state.obstacles.length - 1; i >= 0; i--) {
      const obs = state.obstacles[i]; obs.x -= state.speed;
      if (p.x + p.w > obs.x + 8 && p.x < obs.x + obs.w - 8 && p.y + p.h > obs.y + 15 && p.y < obs.y + obs.h - 2) isDead = true;
      if (obs.x + obs.w < 0) state.obstacles.splice(i, 1);
    }
    if (state.frame % 10 === 0) state.currentScore += 1;
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, state.floorY); ctx.lineTo(state.width, state.floorY); ctx.stroke();
    const offset = (state.frame * state.speed) % 40;
    for(let i = -40; i <= state.width + 160; i += 40) { ctx.beginPath(); ctx.moveTo(i - offset, state.floorY); ctx.lineTo(i - offset - 100, state.height); ctx.stroke(); }
    ctx.shadowBlur = 10; ctx.shadowColor = '#c084fc'; ctx.fillStyle = '#a855f7';
    state.platforms.forEach(plat => { ctx.fillRect(plat.x, plat.y, plat.w, plat.h); ctx.fillStyle = '#f3e8ff'; ctx.fillRect(plat.x, plat.y, plat.w, 3); ctx.fillStyle = '#a855f7'; });
    ctx.shadowBlur = 0;
    state.player.trail.forEach((pos, i) => { const opacity = (i / state.player.trail.length) * 0.5; ctx.fillStyle = `rgba(56, 189, 248, ${opacity})`; ctx.fillRect(pos.x, pos.y, p.w, p.h); });
    ctx.shadowBlur = 20; ctx.shadowColor = p.color; ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, p.w, p.h); ctx.fillStyle = '#fff'; ctx.fillRect(p.x + p.w - 10, p.y + 5, 6, 6);
    ctx.shadowBlur = 15; ctx.shadowColor = '#ef4444'; ctx.fillStyle = '#ef4444';
    state.obstacles.forEach(obs => { ctx.beginPath(); ctx.moveTo(obs.x + obs.w/2, obs.y); ctx.lineTo(obs.x + obs.w, obs.y + obs.h); ctx.lineTo(obs.x, obs.y + obs.h); ctx.fill(); });
    ctx.shadowBlur = 15; ctx.shadowColor = '#facc15'; ctx.strokeStyle = '#facc15'; ctx.lineWidth = 4;
    state.coins.forEach(c => { ctx.beginPath(); const floatY = c.y + Math.sin(state.frame * 0.1) * 5; ctx.arc(c.x + c.w/2, floatY + c.h/2, c.w/2, 0, Math.PI * 2); ctx.stroke(); ctx.fillStyle = '#fef08a'; ctx.fill(); });
    for (let i = state.particles.length - 1; i >= 0; i--) { const part = state.particles[i]; part.x += part.vx; part.y += part.vy; part.life -= 0.05; ctx.globalAlpha = Math.max(0, part.life); ctx.shadowColor = part.color; ctx.fillStyle = part.color; ctx.fillRect(part.x, part.y, 4, 4); ctx.globalAlpha = 1.0; if (part.life <= 0) state.particles.splice(i, 1); }
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#fff'; ctx.font = 'bold 24px monospace'; ctx.fillText(`DATA: ${state.currentScore}`, 20, 40);
    if (isDead) { handleGameOver(); return; }
    state.animationId = requestAnimationFrame(gameLoop);
  }, [handleGameOver]);

  const startGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (gameWrapperRef.current) gameWrapperRef.current.focus();
    engine.current = {
      ...engine.current, ctx: canvas.getContext('2d'), frame: 0, speed: 5, currentScore: 0,
      player: { x: 100, y: 200, w: 30, h: 30, vy: 0, jumpsLeft: 2, color: '#38bdf8', trail: [] },
      platforms: [], obstacles: [], coins: [], particles: []
    };
    setGameState('playing');
    if (engine.current.animationId) cancelAnimationFrame(engine.current.animationId);
    engine.current.animationId = requestAnimationFrame(gameLoop);
  }, [gameLoop]);

  if (!hasMounted) return <section className="min-h-screen bg-[#020408] flex items-center justify-center"><div className="w-full max-w-6xl h-[400px] bg-white/5 animate-pulse rounded-[2rem]" /></section>;

  return (
    <section className="py-20 bg-[#020408] relative overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: customCSS }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0">
        <h1 className="text-[15vw] font-black text-white/[0.02] tracking-tighter uppercase whitespace-nowrap select-none">ARCADE</h1>
      </div>
      <div ref={gameWrapperRef} tabIndex={0} className="w-full flex items-center justify-center p-4 md:p-8 font-sans outline-none focus:ring-0 relative z-10">
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-4 px-2">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-4"><Gamepad2 className="w-4 h-4" />Canvas Physics Engine</div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none uppercase">Neon Runner</h1>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-300 font-medium bg-white/5 px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-md">
               <div className="flex items-center gap-2"><kbd className="px-2 py-1 bg-black/50 rounded border border-white/20 font-mono text-xs text-cyan-400 shadow-inner">SPACE</kbd><span>to Jump</span></div>
               <div className="w-px h-4 bg-white/20"></div>
               <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-amber-400" /><span className="hidden sm:inline">Double Jump Ready</span></div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} className="w-full" ref={cabinetRef}>
            <div className="arcade-cabinet">
              <div className="crt-screen relative w-full h-[300px] md:h-[450px] cursor-pointer" onPointerDown={(e) => { e.preventDefault(); handleJump(); }}>
                <canvas ref={canvasRef} width={1000} height={400} className="w-full h-full block object-fill" />
                {gameState === 'idle' && (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-10 backdrop-blur-sm group transition-all duration-500">
                    <div className="relative group cursor-pointer" onClick={(e) => { e.stopPropagation(); startGame(); }}>
                      <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                      <button className="relative px-12 py-6 rounded-2xl bg-cyan-600 text-white font-black tracking-[0.3em] uppercase shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] hover:bg-cyan-500 hover:scale-105 active:scale-95 transition-all flex items-center gap-4">
                        <Gamepad2 size={28} />
                        PLAY
                      </button>
                    </div>
                    <p className="mt-8 text-cyan-400/60 font-mono text-xs tracking-widest animate-pulse">READY TO BOOT SYSTEM_</p>
                  </div>
                )}
                {gameState === 'gameover' && (
                  <div className="absolute inset-0 bg-red-950/80 flex flex-col items-center justify-center z-10 backdrop-blur-sm animate-[slide-up-fade_0.3s_ease-out]">
                    <h2 className="text-4xl font-black text-red-500 tracking-widest mb-2 uppercase">Game Over</h2>
                    <div className="flex gap-6 mb-8">
                      <div className="glass-hud-game px-6 py-3 rounded-xl border border-red-500/20 text-center"><span className="block text-[10px] text-red-300 uppercase tracking-widest mb-1">Final Score</span><span className="block text-2xl font-black text-white tabular-nums">{score}</span></div>
                      <div className="glass-hud-game px-6 py-3 rounded-xl border border-amber-500/30 text-center"><span className="block text-[10px] text-amber-300 uppercase tracking-widest mb-1">High Score</span><span className="block text-2xl font-black text-white tabular-nums">{highScore}</span></div>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); startGame(); }} className="px-8 py-4 rounded-xl bg-white text-black font-black tracking-widest uppercase flex items-center gap-2"><RotateCcw className="w-5 h-5" /> Try Again</button>
                  </div>
                )}
              </div>
              <div className="mt-4 flex justify-between items-end px-4">
                <div className="flex items-center gap-2 opacity-50"><div className={`w-2 h-2 rounded-full transition-colors duration-500 ${gameState === 'playing' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-red-500 shadow-[0_0_10px_red]'}`}></div><span className="text-[10px] font-mono text-white tracking-widest uppercase">Sys.Pwr</span></div>
                <div className="text-[10px] font-mono text-white/30 tracking-widest uppercase">v2.0.0 // AUTO_BOOT_ENABLED</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
