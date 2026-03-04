'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Heart, Shuffle, ListMusic, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Custom CSS for intricate animations ---
const customCSS = `
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes eq-bounce {
    0%, 100% { transform: scaleY(0.3); }
    50% { transform: scaleY(1); }
  }

  @keyframes pop {
    0% { transform: scale(1); }
    50% { transform: scale(1.4); }
    100% { transform: scale(1); }
  }

  @keyframes pulse-glow {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.1); }
  }

  .animate-spin-slow {
    animation: spin-slow 4s linear infinite;
  }
  
  .animate-pop {
    animation: pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }

  .glass-panel-music {
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  .scrubber-thumb::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(255,255,255,0.8);
    transition: transform 0.1s;
  }
  
  .scrubber-thumb::-webkit-slider-thumb:hover {
    transform: scale(1.4);
  }

  .playlist-scroll::-webkit-scrollbar {
    width: 6px;
  }
  .playlist-scroll::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }
  .playlist-scroll::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
  }
`;

const tracks = [
  {
    id: 1,
    title: 'Malibu Nights',
    artist: 'LANY',
    cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    audio: '/malibu-nights.mp3',
    colorFrom: 'from-blue-600',
    colorTo: 'to-indigo-600',
    glow: 'bg-blue-600'
  },
  {
    id: 2,
    title: 'ILYSB',
    artist: 'LANY',
    cover: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=500&q=80',
    audio: '/ilysb.mp3',
    colorFrom: 'from-fuchsia-600',
    colorTo: 'to-pink-600',
    glow: 'bg-pink-600'
  },
  {
    id: 3,
    title: 'Thick And Thin',
    artist: 'LANY',
    cover: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=500&q=80',
    audio: '/thick-and-thin.mp3',
    colorFrom: 'from-amber-500',
    colorTo: 'to-orange-600',
    glow: 'bg-orange-500'
  },
  {
    id: 4,
    title: 'Super Far',
    artist: 'LANY',
    cover: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=500&q=80',
    audio: '/super-far.mp3',
    colorFrom: 'from-purple-600',
    colorTo: 'to-indigo-900',
    glow: 'bg-purple-600'
  }
];

const EqBar = ({ height, colorClass }) => (
  <div 
    className={`w-1.5 rounded-full origin-bottom transition-all duration-100 ${colorClass || 'bg-white'}`}
    style={{ 
      height: `${height}px`,
      maxHeight: '32px',
      minHeight: '4px'
    }}
  />
);

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);
  const sourceRef = useRef(null);
  
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); 
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [barHeights, setBarHeights] = useState([4, 4, 4, 4, 4]);
  
  const [isLiked, setIsLiked] = useState(false);
  const [likeAnim, setLikeAnim] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const currentTrack = tracks[currentTrackIdx];

  const setupAudioContext = async () => {
    if (!audioRef.current) return;
    try {
      if (!analyserRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.8;
        const source = audioCtx.createMediaElementSource(audioRef.current);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        analyserRef.current = analyser;
        sourceRef.current = source;
      }
      const ctx = analyserRef.current.context;
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
    } catch (err) {
      console.error("Audio Context setup failed:", err);
    }
  };

  useEffect(() => {
    const updateFrequencyData = () => {
      if (!analyserRef.current || !isPlaying) {
        setBarHeights([4, 4, 4, 4, 4]);
        return;
      }
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);
      const scale = (val) => Math.max(4, Math.min(32, (val / 200) * 32));
      const newHeights = [
        scale(dataArray[3]),
        scale(dataArray[10]),
        scale(dataArray[25]),
        scale(dataArray[45]),
        scale(dataArray[70]),
      ];
      setBarHeights(newHeights);
      animationRef.current = requestAnimationFrame(updateFrequencyData);
    };
    if (isPlaying) {
      updateFrequencyData();
    } else {
      cancelAnimationFrame(animationRef.current);
      setBarHeights([4, 4, 4, 4, 4]);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(err => {
        if (err.name !== 'AbortError') console.error("Playback failed:", err);
      });
    }
  }, [currentTrackIdx]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setCurrentTime(audio.currentTime);
    setProgress((audio.currentTime / audio.duration) * 100);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(audio.duration);
  };

  const handleTrackEnd = () => handleNext();

  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      await setupAudioContext();
      audioRef.current.play().then(() => setIsPlaying(true)).catch(err => console.error("Play failed:", err));
    }
  };

  const handleNext = () => switchTrack((currentTrackIdx + 1) % tracks.length);
  const handlePrev = () => switchTrack((currentTrackIdx - 1 + tracks.length) % tracks.length);
  const switchTrack = (index) => {
    setCurrentTrackIdx(index);
    setProgress(0);
    setCurrentTime(0);
  };

  const handleScrub = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const scrubTime = (Number(e.target.value) / 100) * duration;
    audio.currentTime = scrubTime;
    setCurrentTime(scrubTime);
    setProgress(Number(e.target.value));
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeAnim(true);
    setTimeout(() => setLikeAnim(false), 400);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section className="py-20 bg-[#030308] relative overflow-hidden bg-dots">
      <style dangerouslySetInnerHTML={{ __html: customCSS }} />
      
      {/* Background large stroke text */}
      <div className="absolute top-40 right-0 w-full text-center pointer-events-none z-0">
        <h2 className="text-[15vw] font-black text-white/[0.03] uppercase tracking-tighter leading-none select-none">
          BEAT
        </h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="container mx-auto px-4 mb-12 text-center relative z-10"
      >
        <h2 className="text-4xl font-bold text-white mb-4 tracking-wide uppercase">Interactive Music Player</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          A modern, high-fidelity audio experience featuring real-time frequency analysis and immersive track-driven visuals.
        </p>
      </motion.div>

      <audio 
        ref={audioRef}
        src={currentTrack.audio}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleTrackEnd}
        preload="metadata"
        crossOrigin="anonymous"
      />

      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="min-h-[800px] w-full flex items-center justify-center p-4 relative"
      >
        <div className={`absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full mix-blend-screen filter blur-[120px] transition-all duration-1000 ${currentTrack.glow} opacity-30 animate-[pulse-glow_4s_ease-in-out_infinite]`} style={{ animationPlayState: isPlaying ? 'running' : 'paused' }} />
        <div className={`absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full mix-blend-screen filter blur-[100px] transition-all duration-1000 bg-fuchsia-600 opacity-20 animate-[pulse-glow_5s_ease-in-out_infinite_1s]`} style={{ animationPlayState: isPlaying ? 'running' : 'paused' }} />

        <div className="relative z-10 w-full max-w-md rounded-[2.5rem] glass-panel-music p-6 sm:p-8 overflow-hidden transition-all duration-500">
          <div className="flex items-center justify-between mb-8">
            <button onClick={() => setShowPlaylist(false)} className={`transition-all duration-300 ${showPlaylist ? 'text-white' : 'text-slate-400 hover:text-white'}`}>
              <ChevronDown className={`w-6 h-6 transform transition-transform duration-300 ${showPlaylist ? 'rotate-0' : 'rotate-90 opacity-0 cursor-default'}`} />
            </button>
            <span className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">{showPlaylist ? 'Playlist' : 'Now Playing'}</span>
            <button onClick={() => setShowPlaylist(!showPlaylist)} className={`transition-colors ${showPlaylist ? 'text-indigo-400' : 'text-slate-400 hover:text-white'}`}>
              <ListMusic className="w-5 h-5" />
            </button>
          </div>

          <div className={`transition-all duration-500 ${showPlaylist ? 'opacity-0 scale-95 pointer-events-none h-0 overflow-hidden' : 'opacity-100 scale-100 h-auto'}`}>
            <div className="relative h-64 w-full flex items-center justify-center mb-10 mt-2">
              <div className="relative z-20 w-56 h-56 rounded-2xl shadow-2xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] border border-white/10 scale-100" style={{ boxShadow: isPlaying ? `0 25px 50px -12px rgba(0,0,0,0.8)` : `0 15px 30px -10px rgba(0,0,0,0.8)` }}>
                <img src={currentTrack.cover} alt={currentTrack.title} className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${isPlaying ? 'scale-110' : 'scale-100'}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>

            <div className="flex items-end justify-between mb-8 px-2">
              <div className="w-3/4">
                <h2 className="text-2xl font-bold text-white mb-1 tracking-tight truncate" title={currentTrack.title}>{currentTrack.title}</h2>
                <p className="text-slate-400 text-sm font-medium">{currentTrack.artist}</p>
              </div>
              <div className="flex items-end gap-1 h-12 mb-1">
                <EqBar height={barHeights[0]} colorClass="bg-indigo-400" />
                <EqBar height={barHeights[1]} colorClass="bg-fuchsia-400" />
                <EqBar height={barHeights[2]} colorClass="bg-indigo-300" />
                <EqBar height={barHeights[3]} colorClass="bg-fuchsia-300" />
                <EqBar height={barHeights[4]} colorClass="bg-indigo-400" />
              </div>
            </div>

            <div className="mb-8 px-2">
              <div className="relative w-full h-1.5 bg-slate-700/50 rounded-full mb-3 flex items-center group">
                <div className={`absolute left-0 h-full bg-gradient-to-r ${currentTrack.colorFrom} ${currentTrack.colorTo} rounded-full transition-all duration-100 ease-linear`} style={{ width: `${progress}%`, boxShadow: `0 0 10px rgba(255,255,255,0.3)` }} />
                <input type="range" min="0" max="100" value={progress} onChange={handleScrub} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer scrubber-thumb z-10" />
                <div className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none transform scale-0 group-hover:scale-100 transition-transform duration-200" style={{ left: `calc(${progress}% - 6px)` }} />
              </div>
              <div className="flex justify-between text-[11px] font-medium text-slate-400 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between px-4">
              <button className="text-slate-500 hover:text-white transition-colors"><Shuffle className="w-5 h-5" /></button>
              <button onClick={handlePrev} className="text-white hover:text-indigo-300 transition-colors transform active:scale-95"><SkipBack className="w-8 h-8 fill-current" /></button>
              <button onClick={togglePlay} className="relative group w-20 h-20 flex items-center justify-center">
                <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${currentTrack.colorFrom} ${currentTrack.colorTo} blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-300 ${isPlaying ? 'animate-[spin-slow_3s_linear_infinite]' : ''}`} />
                <div className="relative w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-xl transform transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
                  {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
                </div>
              </button>
              <button onClick={handleNext} className="text-white hover:text-indigo-300 transition-colors transform active:scale-95"><SkipForward className="w-8 h-8 fill-current" /></button>
              <button onClick={handleLike} className={`transition-colors ${isLiked ? 'text-rose-500' : 'text-slate-500 hover:text-white'} ${likeAnim ? 'animate-pop' : ''}`}><Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} /></button>
            </div>
          </div>

          <div className={`transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden flex flex-col ${showPlaylist ? 'h-[440px] opacity-100' : 'h-0 opacity-0 pointer-events-none'}`}>
            <div className="flex-1 overflow-y-auto playlist-scroll pr-2 space-y-3 pb-4">
              {tracks.map((track, idx) => (
                <div key={track.id} onClick={() => { switchTrack(idx); setShowPlaylist(false); }} className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 group ${currentTrackIdx === idx ? 'bg-white/10 shadow-lg border border-white/5' : 'hover:bg-white/5 border border-transparent'}`}>
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
                    <img src={track.cover} alt={track.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    {currentTrackIdx === idx && isPlaying && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="flex items-end gap-[2px] h-3">
                          <EqBar height={barHeights[0]/4} colorClass="bg-white" />
                          <EqBar height={barHeights[2]/4} colorClass="bg-white" />
                          <EqBar height={barHeights[4]/4} colorClass="bg-white" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-bold truncate ${currentTrackIdx === idx ? 'text-white' : 'text-slate-200'}`}>{track.title}</h4>
                    <p className="text-slate-400 text-xs truncate">{track.artist}</p>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${currentTrackIdx === idx ? 'text-white' : 'text-transparent group-hover:text-white group-hover:bg-white/10'}`}>
                    {currentTrackIdx === idx ? (isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />) : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
