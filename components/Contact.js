'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Facebook, Linkedin } from 'lucide-react';

const customCSS = `
  .glass-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }
  .contact-input {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
  }
  .contact-input:focus {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(59, 130, 246, 0.5);
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.1);
  }
`;

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
        body: JSON.stringify({ ...formData, _subject: `Portfolio Message from ${formData.name}` })
      });
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else { setSubmitStatus('error'); }
    } catch (error) { setSubmitStatus('error'); }
    finally { setIsSubmitting(false); setTimeout(() => setSubmitStatus(null), 5000); }
  };

  return (
    <section id="contact" className="py-32 bg-[#030308] relative overflow-hidden bg-grid">
      <style dangerouslySetInnerHTML={{ __html: customCSS }} />
      
      <div className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none z-0">
        <h2 className="text-[20vw] font-black text-white/[0.02] uppercase tracking-tighter leading-none select-none">
          TALK
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-sm mb-4 block">GET IN TOUCH</span>
          <h2 className="text-6xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">Let's Create Something</h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)]"></div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-16 max-w-6xl mx-auto items-start">
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-10"
          >
            <div>
              <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter">Contact Info</h3>
              <p className="text-slate-400 text-xl leading-relaxed font-medium">
                I'm currently available for freelance work or full-time positions. Let's build something extraordinary together.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: <Mail size={28} />, label: "Email", val: "eaortega04@proton.me", color: "text-blue-400", bg: "bg-blue-500/10" },
                { icon: <Phone size={28} />, label: "Phone", val: "09618382725", color: "text-indigo-400", bg: "bg-indigo-500/10" },
                { icon: <MapPin size={28} />, label: "Location", val: "Mandaue City, Cebu, PH", color: "text-purple-400", bg: "bg-purple-500/10" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-6 rounded-[2rem] glass group hover:border-blue-500/30 transition-all duration-500">
                  <div className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform duration-500`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-black mb-1">{item.label}</p>
                    <p className="text-slate-200 text-lg font-bold">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-10">
              <p className="text-xs text-slate-500 uppercase tracking-[0.3em] font-black mb-8">Social Profiles</p>
              <div className="flex gap-6">
                {[
                  { icon: <Github size={24} />, link: "https://github.com/Elijah-gwapo", color: "hover:bg-slate-800" },
                  { icon: <Facebook size={24} />, link: "https://www.facebook.com/kyuu420", color: "hover:bg-blue-600" },
                  { icon: <Linkedin size={24} />, link: "https://www.linkedin.com/in/elijah-ortega-8a3347386/", color: "hover:bg-blue-700" }
                ].map((social, i) => (
                  <a key={i} href={social.link} target="_blank" rel="noopener noreferrer" className={`w-16 h-16 rounded-2xl glass flex items-center justify-center text-slate-400 hover:text-white transition-all duration-500 ${social.color} hover:-translate-y-2`}>
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="p-10 md:p-16 rounded-[4rem] glass relative overflow-hidden group hover:border-blue-500/20 transition-all duration-500">
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-2">Your Name</label>
                    <input type="text" name="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="w-full px-8 py-5 rounded-[2rem] contact-input text-white text-lg font-medium focus:outline-none" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-2">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required className="w-full px-8 py-5 rounded-[2rem] contact-input text-white text-lg font-medium focus:outline-none" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-2">Project Details</label>
                  <textarea name="message" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows="6" required className="w-full px-8 py-5 rounded-[2rem] contact-input text-white text-lg font-medium focus:outline-none resize-none"></textarea>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full group bg-blue-600 hover:bg-blue-500 text-white font-black py-6 px-10 rounded-[2rem] transition-all duration-500 flex items-center justify-center gap-4 shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:shadow-[0_0_60px_rgba(37,99,235,0.5)] hover:-translate-y-1 active:scale-95 disabled:opacity-50 tracking-[0.2em] uppercase text-lg">
                  <span>{isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}</span>
                  <Send size={24} className={`transition-all duration-500 ${isSubmitting ? 'translate-x-10 opacity-0' : 'group-hover:translate-x-2 group-hover:-translate-y-2'}`} />
                </button>
                {submitStatus === 'success' && (<div className="mt-6 p-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-[2rem] text-center font-bold animate-in fade-in slide-in-from-top-4">Message sent successfully! I'll get back to you soon.</div>)}
                {submitStatus === 'error' && (<div className="mt-6 p-6 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-[2rem] text-center font-bold animate-in fade-in slide-in-from-top-4">Something went wrong. Please try again later.</div>)}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
