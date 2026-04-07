'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import HackerText from './HackerText';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch("https://formsubmit.co/ajax/eaortega04@proton.me", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ ...formData, _subject: `Portfolio v2 Message from ${formData.name}` })
      });
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else { setSubmitStatus('error'); }
    } catch (error) { setSubmitStatus('error'); }
    finally { setIsSubmitting(false); setTimeout(() => setSubmitStatus(null), 5000); }
  };

  const socialLinks = [
    { icon: <Github size={20} />, link: "https://github.com/Elijah-gwapo", label: "Github" },
    { icon: <Facebook size={20} />, link: "https://www.facebook.com/kyuu420", label: "Facebook" },
    { icon: <Linkedin size={20} />, link: "https://www.linkedin.com/in/elijah-ortega-8a3347386/", label: "LinkedIn" }
  ];

  return (
    <section id="contact" className="py-48 bg-[#030308] relative overflow-hidden selection:bg-[#38BDF8] selection:text-[#030308]">
      
      {/* Structural Background Text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none z-0 select-none">
        <h2 className="text-[15vw] md:text-[22vw] font-black text-white/[0.1] uppercase tracking-tighter leading-none whitespace-nowrap">
          GET IN TOUCH
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid lg:grid-cols-12 gap-24 items-start">
            
            {/* Left Side: Info & Socials */}
            <div className="lg:col-span-5 space-y-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
                  <HackerText text="LET'S CREATE" speed={30} /> <br />
                  <span className="text-[#38BDF8]"><HackerText text="SOMETHING." speed={50} /></span>
                </h2>
                <p className="text-slate-500 text-lg md:text-xl font-light max-w-md leading-relaxed">
                  Have a project in mind? Let's build something exceptional together. 
                  Currently available for freelance and full-time opportunities.
                </p>
              </motion.div>

              <div className="space-y-8">
                <div className="grid grid-cols-1 gap-6">
                  {[
                    { icon: <Mail size={18} />, label: "Email", val: "eaortega04@proton.me" },
                    { icon: <Phone size={18} />, label: "Phone", val: "09618382725" },
                    { icon: <MapPin size={18} />, label: "Location", val: "Mandaue City, Cebu, PH" }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-6 group"
                    >
                      <div className="w-12 h-12 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center text-slate-500 group-hover:text-[#38BDF8] group-hover:border-[#38BDF8]/30 transition-all duration-500">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-600 uppercase tracking-[0.3em] font-bold mb-1">{item.label}</p>
                        <p className="text-slate-300 font-medium">{item.val}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex gap-4 pt-4">
                  {socialLinks.map((social, i) => (
                    <motion.a 
                      key={i} 
                      href={social.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 + (i * 0.1) }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                      className="w-14 h-14 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center text-slate-400 hover:text-white hover:border-[#38BDF8]/50 transition-all duration-500"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="lg:col-span-7 relative">
              {/* Floating Glow Effect */}
              <div className="absolute -inset-4 bg-[#38BDF8]/5 blur-3xl rounded-[4rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="p-8 md:p-16 rounded-[3rem] bg-white/[0.04] border border-white/15 backdrop-blur-3xl relative z-10 shadow-[0_40px_100px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)] group"
              >
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#38BDF8]/15 to-transparent rounded-tr-[3rem] pointer-events-none"></div>

                <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Name</label>
                      <input 
                        type="text" 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                        required 
                        style={{ textShadow: 'none' }}
                        className="w-full bg-transparent border-b border-white/20 py-4 px-2 text-white text-lg focus:outline-none focus:border-[#38BDF8] transition-all duration-500 placeholder:text-slate-600" 
                        placeholder="Your Name" 
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Email Address</label>
                      <input 
                        type="email" 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                        required 
                        style={{ textShadow: 'none' }}
                        className="w-full bg-transparent border-b border-white/20 py-4 px-2 text-white text-lg focus:outline-none focus:border-[#38BDF8] transition-all duration-500 placeholder:text-slate-600" 
                        placeholder="Your Email Address" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Project Message</label>
                    <textarea 
                      value={formData.message} 
                      onChange={e => setFormData({...formData, message: e.target.value})} 
                      rows="4" 
                      required 
                      className="w-full bg-transparent border-b border-white/20 py-4 px-2 text-white text-lg focus:outline-none focus:border-[#38BDF8] transition-all duration-500 placeholder:text-slate-600 resize-none" 
                      placeholder="Tell me about your vision..."
                    ></textarea>
                  </div>

                  <motion.button 
                    type="submit" 
                    disabled={isSubmitting} 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-20 bg-[#38BDF8] text-[#030308] font-black rounded-2xl transition-all duration-500 flex items-center justify-center gap-4 group disabled:opacity-50 overflow-hidden relative"
                  >
                    <span className="relative z-10 text-sm uppercase tracking-[0.2em]">
                      {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                    </span>
                    <Send size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    
                    {/* Hover effect background */}
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  </motion.button>
                  
                  {submitStatus === 'success' && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#38BDF8] text-center text-xs font-bold tracking-[0.2em] uppercase">
                      Message sent successfully. I'll get back to you soon.
                    </motion.p>
                  )}
                  {submitStatus === 'error' && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-rose-500 text-center text-xs font-bold tracking-[0.2em] uppercase">
                      Failed to send message. Please try again.
                    </motion.p>
                  )}
                </form>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
