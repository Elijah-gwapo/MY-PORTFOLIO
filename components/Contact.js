'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Facebook, Linkedin, MessageSquare } from 'lucide-react';

const customCSS = `
  .contact-input {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: all 0.3s ease;
    text-shadow: none !important; /* Explicitly remove any text shadows */
  }
  .contact-input:focus {
    background: rgba(255, 255, 255, 0.05);
    border-color: #2563eb;
    outline: none;
  }
  .contact-input::placeholder {
    color: rgba(255, 255, 255, 0.2);
    text-shadow: none !important;
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
    <section id="contact" className="py-32 bg-[#030308] relative overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: customCSS }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
            Let's Create Something<span className="text-blue-600">.</span>
          </h2>
          <div className="h-1 w-20 bg-blue-600 rounded-full mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="space-y-4">
              {[
                { icon: <Mail size={20} />, label: "Email", val: "eaortega04@proton.me" },
                { icon: <Phone size={20} />, label: "Phone", val: "09618382725" },
                { icon: <MapPin size={20} />, label: "Location", val: "Mandaue City, Cebu, PH" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-all">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mb-1">{item.label}</p>
                    <p className="text-slate-200 text-sm font-bold">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              {[
                { icon: <Github size={18} />, link: "https://github.com/Elijah-gwapo" },
                { icon: <Facebook size={18} />, link: "https://www.facebook.com/kyuu420" },
                { icon: <Linkedin size={18} />, link: "https://www.linkedin.com/in/elijah-ortega-8a3347386/" }
              ].map((social, i) => (
                <a key={i} href={social.link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all">
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="p-8 md:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/5 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-3 mb-6 text-blue-500">
                  <MessageSquare size={18} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Send a message</span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Name</label>
                    <input 
                      type="text" 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})} 
                      required 
                      className="w-full px-6 py-4 rounded-xl contact-input text-white text-sm" 
                      placeholder="Your Name" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email</label>
                    <input 
                      type="email" 
                      value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})} 
                      required 
                      className="w-full px-6 py-4 rounded-xl contact-input text-white text-sm" 
                      placeholder="Your Email" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Message</label>
                  <textarea 
                    value={formData.message} 
                    onChange={e => setFormData({...formData, message: e.target.value})} 
                    rows="5" 
                    required 
                    className="w-full px-6 py-4 rounded-xl contact-input text-white text-sm resize-none" 
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] disabled:opacity-50 text-xs uppercase tracking-widest"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send size={16} />
                </button>
                
                {submitStatus === 'success' && (<p className="text-emerald-500 text-center text-xs font-bold mt-4">Message sent successfully!</p>)}
                {submitStatus === 'error' && (<p className="text-rose-500 text-center text-xs font-bold mt-4">Failed to send message. Try again.</p>)}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
