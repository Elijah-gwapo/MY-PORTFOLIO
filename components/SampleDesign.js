'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, Check, AlertCircle, ArrowRight, MousePointer2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const customCSS = `
  @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
  @keyframes float-delayed { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
  @keyframes shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); } 20%, 40%, 60%, 80% { transform: translateX(5px); } }
  @keyframes wiggle { 0%, 10  0% { transform: rotate(-8deg); } 50% { transform: rotate(8deg); } }
  @keyframes jump { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
  @keyframes shimmer { 0% { transform: translateX(-100%) skewX(-12deg); } 100% { transform: translateX(200%) skewX(-12deg); } }
  .glass-panel { background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite; animation-delay: 2s; }
`;

const CyberPet = ({ focused, textLength, showPassword, status, className = "" }) => {
  let pupilOffsetX = 0;
  let pupilOffsetY = 0;
  if (focused === 'email' || focused === 'name') {
    pupilOffsetX = Math.max(Math.min((textLength * 0.8) - 8, 8), -8);
    pupilOffsetY = 2;
  } else if (focused === 'password') {
    pupilOffsetY = 4;
    pupilOffsetX = -8;
  }
  const isPasswordMode = focused === 'password';
  const isPeeking = isPasswordMode && showPassword;
  const isCovering = isPasswordMode && !showPassword;

  return (
    <div className={`z-20 pointer-events-none ${className} ${status === 'success' ? 'animate-[jump_0.6s_ease-in-out_infinite]' : 'animate-float'}`}>
      <svg width="280" height="260" viewBox="0 0 140 130" className="drop-shadow-2xl overflow-visible">
        <path d="M 70 35 L 70 15" stroke="#475569" strokeWidth="4" strokeLinecap="round" className="origin-bottom" style={{ transformOrigin: '70px 35px', animation: (focused === 'email' || focused === 'name') ? 'wiggle 0.4s ease-in-out infinite' : 'none' }} />
        <circle cx="70" cy="12" r="6" fill="#38bdf8" className={(focused === 'email' || focused === 'name') ? 'animate-pulse' : ''} />
        <rect x="25" y="35" width="90" height="75" rx="35" fill="#1e293b" stroke="#334155" strokeWidth="2" />
        <rect x="35" y="45" width="70" height="50" rx="20" fill="#020617" />
        <ellipse cx="45" cy="80" rx="6" ry="3" fill="#f472b6" style={{ opacity: status === 'success' ? 0.6 : 0, transition: 'opacity 0.4s' }} />
        <ellipse cx="95" cy="80" rx="6" ry="3" fill="#f472b6" style={{ opacity: status === 'success' ? 0.6 : 0, transition: 'opacity 0.4s' }} />
        <g>
          <circle cx="55" cy="65" r="10" fill="#1e293b" />
          {status === 'success' ? ( <path d="M 48 65 Q 55 58 62 65" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          ) : status === 'error' ? ( <path d="M 50 60 L 60 70 M 60 60 L 50 70" fill="none" stroke="#f87171" strokeWidth="3" strokeLinecap="round" />
          ) : ( <circle cx={55 + pupilOffsetX} cy={65 + pupilOffsetY} r="4" fill="#38bdf8" className="transition-all duration-75" /> )}
          
          <circle cx="85" cy="65" r="10" fill="#1e293b" />
          {status === 'success' ? ( <path d="M 78 65 Q 85 58 92 65" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          ) : status === 'error' ? ( <path d="M 80 60 L 90 70 M 90 60 L 80 70" fill="none" stroke="#f87171" strokeWidth="3" strokeLinecap="round" />
          ) : ( <circle cx={85 + pupilOffsetX} cy={65 + pupilOffsetY} r="4" fill="#38bdf8" className="transition-all duration-75" /> )}
        </g>
        <g style={{ transform: 'translateY(0px)', transition: 'all 0.3s' }}>
          {status === 'success' ? ( <path d="M 60 75 Q 70 85 80 75" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          ) : status === 'error' ? ( <path d="M 60 80 L 65 75 L 70 80 L 75 75 L 80 80" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" />
          ) : (focused === 'email' || focused === 'name') ? ( <ellipse cx="70" cy="82" rx="4" ry="2" fill="#38bdf8" className="animate-pulse" />
          ) : ( <line x1="65" y1="82" x2="75" y2="82" stroke="#475569" strokeWidth="3" strokeLinecap="round" /> )}
        </g>
        <g className="transition-all duration-500 ease-in-out">
          <g style={{ transform: (isCovering || isPeeking) ? 'translate(20px, -45px) rotate(-20deg)' : 'translate(0px, 0px) rotate(0deg)', transformOrigin: '35px 110px', transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)' }}>
            <rect x="25" y="105" width="22" height="25" rx="11" fill="#38bdf8" />
          </g>
          <g style={{ transform: isCovering ? 'translate(-20px, -45px) rotate(20deg)' : isPeeking ? 'translate(-5px, -25px) rotate(45deg)' : 'translate(0px, 0px) rotate(0deg)', transformOrigin: '105px 110px', transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)' }}>
            <rect x="93" y="105" width="22" height="25" rx="11" fill="#38bdf8" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default function SampleDesign() {
  const [hasMounted, setHasMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [focused, setFocused] = useState('none');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState('idle');
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});

  useEffect(() => { setHasMounted(true); }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    setTiltStyle({ transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`, transition: 'transform 0.1s ease-out' });
  };

  const handleMouseLeave = () => { setTiltStyle({ transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)', transition: 'transform 0.5s ease-out' }); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === 'loading' || status === 'success') return;
    if (email.length < 3 || password.length < 3 || (!isLogin && name.length < 2)) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
      return;
    }
    setStatus('loading');
    setFocused('none');
    setTimeout(() => {
      if (password === 'wrong') { setStatus('error'); setTimeout(() => setStatus('idle'), 2500); }
      else { setStatus('success'); setTimeout(() => { setStatus('idle'); setEmail(''); setPassword(''); setName(''); }, 3000); }
    }, 1500);
  };

  const toggleMode = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
    setStatus('idle');
    setEmail('');
    setPassword('');
    setName('');
    setFocused('none');
  };

  if (!hasMounted) return <section id="sample-design" className="pt-32 pb-20 bg-[#030308] min-h-screen" />;

  return (
    <section id="sample-design" className="pt-32 pb-20 bg-[#030308] relative overflow-hidden bg-grid">
      <style dangerouslySetInnerHTML={{ __html: customCSS }} />
      
      {/* Background large decorative text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none z-0">
        <h2 className="text-[20vw] font-black text-white/[0.02] uppercase tracking-tighter leading-none select-none">
          EXPERIMENTS
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-24 text-center"
        >
          <div className="relative">
            <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter relative z-10">UI/UX Designs</h2>
            <span className="absolute -top-10 -right-12 text-8xl font-black text-white/[0.03] italic pointer-events-none select-none">05</span>
          </div>
          <div className="w-24 h-1.5 bg-blue-600 mt-8 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)]"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 text-blue-500 font-black tracking-widest text-xs uppercase">
                <MousePointer2 size={16} className="animate-bounce" />
                Interactive Prototypes
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
                Crafting <span className="text-blue-500">Playful</span> <br />
                User Experiences.
              </h3>
              <p className="text-lg text-slate-400 leading-relaxed font-light">
                This interactive login form is a demonstration of my ability to combine functional logic with engaging character animations. Every input interaction triggers a unique physical response from the "Cyber Pet" guardian.
              </p>
              <div className="flex gap-4">
                <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white">SVG Animations</div>
                <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white">State Management</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              ref={cardRef} 
              onMouseMove={handleMouseMove} 
              onMouseLeave={handleMouseLeave} 
              style={tiltStyle} 
              className={`relative z-10 w-full rounded-[3rem] glass-panel overflow-hidden border border-white/10 shadow-2xl ${status === 'error' ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
            >
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-10 bg-[#030308]/40">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">{isLogin ? 'Secure Entry' : 'New Identity'}</h2>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{isLogin ? 'Authorized Personnel Only' : 'Register for access'}</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                      <div className="relative h-14">
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} onFocus={() => setFocused('name')} onBlur={() => setFocused('none')} className="w-full h-full bg-white/5 rounded-2xl border border-white/10 px-6 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all" placeholder="Full Name" />
                      </div>
                    )}
                    <div className="relative h-14">
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setFocused('email')} onBlur={() => setFocused('none')} className="w-full h-full bg-white/5 rounded-2xl border border-white/10 px-6 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all" placeholder="Email Address" />
                    </div>
                    <div className="relative h-14">
                      <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} onFocus={() => setFocused('password')} onBlur={() => setFocused('none')} className="w-full h-full bg-white/5 rounded-2xl border border-white/10 px-6 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-all" placeholder="Security Key" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                    </div>
                    <button type="submit" disabled={status === 'loading' || status === 'success'} className={`relative w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all active:scale-95 mt-4 flex items-center justify-center gap-2 ${status === 'idle' ? 'bg-blue-600 hover:bg-blue-500 text-white' : ''} ${status === 'success' ? 'bg-emerald-500 text-white' : ''} ${status === 'error' ? 'bg-rose-500 text-white' : ''}`}>
                      {status === 'idle' && <><Lock size={14} /> {isLogin ? 'Authenticate' : 'Establish Link'}</>}
                      {status === 'loading' && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                      {status === 'success' && <><Check size={14} /> Access Granted</>}
                      {status === 'error' && <><AlertCircle size={14} /> Denied</>}
                    </button>
                  </form>
                  <p className="text-center text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-8">
                    {isLogin ? "No access? " : "Already established? "}
                    <button onClick={toggleMode} className="text-blue-500 hover:text-blue-400">{isLogin ? 'Request Key' : 'Sign In'}</button>
                  </p>
                </div>
                <div className="hidden md:flex w-1/2 relative items-center justify-center p-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-l border-white/5">
                  <CyberPet focused={focused} textLength={email.length + name.length} showPassword={showPassword} status={status} className="relative z-10" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
