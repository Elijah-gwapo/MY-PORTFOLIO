'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const customCSS = `
  @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
  @keyframes float-delayed { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
  @keyframes shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); } 20%, 40%, 60%, 80% { transform: translateX(5px); } }
  @keyframes wiggle { 0%, 100% { transform: rotate(-8deg); } 50% { transform: rotate(8deg); } }
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

  if (!hasMounted) return <section id="sample-design" className="pt-32 pb-20 bg-[#0a0f1c] min-h-screen" />;

  return (
    <section id="sample-design" className="pt-32 pb-20 bg-[#0a0f1c] relative overflow-hidden bg-grid">
      <style dangerouslySetInnerHTML={{ __html: customCSS }} />
      <div className="absolute top-40 left-0 w-full text-center pointer-events-none z-0">
        <h2 className="text-[15vw] font-black text-white/[0.03] uppercase tracking-tighter leading-none select-none">DESIGN</h2>
      </div>
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true }} className="container mx-auto px-4 text-center mb-32 relative z-10">
        <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-sm mb-4 block">PORTFOLIO SHOWCASE</span>
        <h2 className="text-6xl md:text-7xl font-black text-white mb-2 uppercase tracking-tighter text-glow">Example UI/UX Designs</h2>
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 0.5 }} transition={{ delay: 0.5, duration: 1 }} className="text-slate-500 font-black tracking-[0.5em] uppercase text-sm mb-8 block">Explore</motion.span>
        <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)]"></div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} viewport={{ once: true }} className="container mx-auto px-4 mb-12 text-center relative z-10">
        <h3 className="text-4xl font-bold text-white mb-4 tracking-wide uppercase">Animated Login Form</h3>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">Experience interactive storytelling through motion. This animated login form demonstrates my capability in crafting engaging, user-centric experiences.</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: true }} className="w-full bg-[#0a0f1c]/50 flex items-center justify-center p-4 md:p-8 relative overflow-hidden font-sans selection:bg-blue-500/30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-float"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-600/10 rounded-full mix-blend-screen filter blur-[80px] animate-float" style={{ animationDelay: '1s' }}></div>
        <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={tiltStyle} className={`relative z-10 w-full max-w-4xl flex flex-col md:flex-row rounded-[2rem] glass-panel will-change-transform overflow-hidden ${status === 'error' ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-10 bg-[#0a0f1c]/40">
            <div className="text-center mb-8"><h2 className="text-3xl font-bold text-white mb-2 tracking-tight">{isLogin ? 'Welcome Back' : 'Create Account'}</h2><p className="text-slate-400 text-sm">{isLogin ? 'Sign in to continue to your dashboard' : 'Join us to start your journey'}</p></div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className={`relative group transition-all duration-500 overflow-hidden ${isLogin ? 'h-0 opacity-0' : 'h-14 opacity-100'}`}><div className={`absolute inset-0 rounded-xl bg-white/5 border border-white/10 transition-colors duration-300 ${focused === 'name' ? 'border-blue-500/50 bg-blue-500/10' : ''}`} /><svg className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-300 z-10 ${focused === 'name' ? 'text-blue-400' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                <input type="text" id="name" autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} onFocus={() => setFocused('name')} onBlur={() => setFocused('none')} className="absolute inset-0 w-full h-full bg-transparent rounded-xl pt-5 pb-1 pl-12 pr-4 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all z-20" placeholder="Full Name" tabIndex={isLogin ? -1 : 0} />
                <label htmlFor="name" className={`absolute left-12 transition-all duration-300 pointer-events-none z-10 origin-left ${focused === 'name' || name ? 'top-2 text-[11px] text-blue-400 font-medium tracking-wider uppercase' : 'top-1/2 -translate-y-1/2 text-base text-slate-400'}`}>Full Name</label>
              </div>
              <div className="relative h-14 group"><div className={`absolute inset-0 rounded-xl bg-white/5 border border-white/10 transition-colors duration-300 ${focused === 'email' ? 'border-blue-500/50 bg-blue-500/10' : ''}`} /><Mail className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-300 z-10 ${focused === 'email' ? 'text-blue-400' : 'text-slate-400'}`} />
                <input type="email" id="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setFocused('email')} onBlur={() => setFocused('none')} className="absolute inset-0 w-full h-full bg-transparent rounded-xl pt-5 pb-1 pl-12 pr-4 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all z-20" placeholder="Email" />
                <label htmlFor="email" className={`absolute left-12 transition-all duration-300 pointer-events-none z-10 origin-left ${focused === 'email' || email ? 'top-2 text-[11px] text-blue-400 font-medium tracking-wider uppercase' : 'top-1/2 -translate-y-1/2 text-base text-slate-400'}`}>Email Address</label>
              </div>
              <div className="relative h-14 group"><div className={`absolute inset-0 rounded-xl bg-white/5 border border-white/10 transition-colors duration-300 ${focused === 'password' ? 'border-blue-500/50 bg-blue-500/10' : ''}`} /><Lock className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-300 z-10 ${focused === 'password' ? 'text-blue-400' : 'text-slate-400'}`} />
                <input type={showPassword ? 'text' : 'password'} id="password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} onFocus={() => setFocused('password')} onBlur={() => setFocused('none')} className="absolute inset-0 w-full h-full bg-transparent rounded-xl pt-5 pb-1 pl-12 pr-12 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all z-20" placeholder="Password" />
                <label htmlFor="password" className={`absolute left-12 transition-all duration-300 pointer-events-none z-10 origin-left ${focused === 'password' || password ? 'top-2 text-[11px] text-blue-400 font-medium tracking-wider uppercase' : 'top-1/2 -translate-y-1/2 text-base text-slate-400'}`}>Password</label>
                <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors z-30 p-1 rounded-md hover:bg-white/10">{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>
              </div>
              <div className="flex items-center justify-between text-sm px-1 pt-2"><label className="flex items-center space-x-2 cursor-pointer group"><div className="relative flex items-center justify-center w-5 h-5 border-2 border-slate-500 rounded bg-transparent group-hover:border-blue-400 transition-colors"><input type="checkbox" className="peer opacity-0 absolute inset-0 cursor-pointer" /><Check className="h-3 w-3 text-blue-400 opacity-0 peer-checked:opacity-100 transition-opacity scale-50 peer-checked:scale-100" strokeWidth={4} /></div><span className="text-slate-400 group-hover:text-slate-300 transition-colors select-none">Remember me</span></label>{isLogin && ( <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors hover:underline underline-offset-4 font-medium">Forgot password?</a> )}</div>
              <button type="submit" disabled={status === 'loading' || status === 'success'} className={`relative w-full h-14 rounded-xl font-bold text-lg overflow-hidden group transition-all duration-500 flex items-center justify-center mt-4 ${status === 'idle' ? 'bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-[length:200%_auto] hover:bg-right text-white hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40' : ''} ${status === 'loading' ? 'bg-indigo-600/50 text-transparent cursor-not-allowed scale-[0.98]' : ''} ${status === 'success' ? 'bg-emerald-500 text-white scale-100 shadow-lg shadow-emerald-500/50' : ''} ${status === 'error' ? 'bg-rose-500 text-white scale-[0.98] shadow-lg shadow-rose-500/50' : ''}`}>{status === 'idle' && ( <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" /> )}<span className="relative z-10 flex items-center justify-center gap-2 w-full h-full">{status === 'idle' && ( <React.Fragment><span>{isLogin ? 'Sign In' : 'Sign Up'}</span><ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" /></React.Fragment> )}{status === 'loading' && ( <svg className="animate-spin h-6 w-6 text-white absolute" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> )}{status === 'success' && ( <div className="flex items-center gap-2 animate-[jump_0.3s_ease-out]"><Check className="h-6 w-6" strokeWidth={3} /><span>{isLogin ? 'Welcome Back!' : 'Account Created!'}</span></div> )}{status === 'error' && ( <div className="flex items-center gap-2 animate-[wiggle_0.3s_ease-out]"><AlertCircle className="h-6 w-6" strokeWidth={3} /><span>Try Again</span></div> )}</span></button>
            </form>
            <p className="text-center text-slate-400 text-sm mt-8">{isLogin ? "Don't have an account? " : "Already have an account? "}<a href="#" onClick={toggleMode} className="text-blue-400 hover:text-blue-300 transition-colors font-medium hover:underline underline-offset-4">{isLogin ? 'Sign up' : 'Sign in'}</a></p>
          </div>
          <div className="hidden md:flex w-1/2 relative items-center justify-center p-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-l border-white/5"><div className="absolute inset-0 overflow-hidden"><div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[60px] animate-float"></div><div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/20 rounded-full mix-blend-screen filter blur-[60px] animate-float-delayed"></div></div><CyberPet focused={focused} textLength={email.length + name.length} showPassword={showPassword} status={status} className="relative z-10" /><div className="absolute bottom-1/4 w-64 h-8 bg-white/5 rounded-[100%] blur-sm -z-10 animate-pulse"></div></div>
        </div>
      </motion.div>
    </section>
  );
}
