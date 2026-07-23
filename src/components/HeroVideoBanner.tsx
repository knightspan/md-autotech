/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useRef } from 'react';
import { ArrowRight, Play, Pause, Volume2, VolumeX, MessageSquare, Cpu, ChevronRight } from 'lucide-react';

interface HeroVideoBannerProps {
  setActiveTab: (tab: string) => void;
  triggerWhatsApp: (msg: string) => void;
  handleOpenProductCategory?: (category: string) => void;
}

/*
  ============================================================
  HERO VIDEO (wired)
  Source file copied from: create_a_video_for_my_motocycl.mp4
  Served from: public/videos/hlins-expanding-our-legacy.mp4
  ============================================================
*/
const HERO_VIDEO_SRC = '/videos/hlins-expanding-our-legacy.mp4';

/* Optional fallback if local video is missing */
const HERO_VIDEO_FALLBACK =
  'https://cdn.coverr.co/videos/coverr-a-motorcycle-racing-on-a-track-5334/1080p.mp4';

/*
  ============================================================
  >>> PUT HERO POSTER IMAGE HERE (shows before / if video fails)
  >>> Disk path:  public/images/hero/hero-poster.jpg
  >>> Then set HERO_POSTER below to: '/images/hero/hero-poster.jpg'
  ============================================================
*/
const HERO_POSTER =
  'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1600&q=80';

export default function HeroVideoBanner({ setActiveTab, triggerWhatsApp, handleOpenProductCategory }: HeroVideoBannerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [useFallback, setUseFallback] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSegmentClick = (category: string) => {
    if (handleOpenProductCategory) {
      handleOpenProductCategory(category);
    } else {
      setActiveTab('products');
    }
    window.scrollTo({ top: 500, behavior: 'smooth' });
  };

  return (
    <section
      className="relative w-full h-[88vh] min-h-[580px] max-h-[920px] bg-black text-white overflow-hidden flex flex-col justify-between"
      id="hero-video-banner"
    >
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black">
        <video
          ref={videoRef}
          key={useFallback ? 'fallback' : 'local'}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onError={() => {
            if (!useFallback) setUseFallback(true);
          }}
          className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.15] scale-105"
          poster={HERO_POSTER}
        >
          {/* Local video first; falls back to HERO_VIDEO_FALLBACK on error */}
          <source src={useFallback ? HERO_VIDEO_FALLBACK : HERO_VIDEO_SRC} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/60 pointer-events-none" />
      </div>

      <div className="relative z-10 pt-28 sm:pt-32 px-6 sm:px-10 lg:px-16 xl:px-20 flex justify-between items-center w-full">
        <div className="inline-flex items-center gap-2 bg-black/60 border border-[#FFCC00]/40 px-3 py-1 text-[10px] font-mono font-bold text-[#FFCC00] uppercase tracking-widest backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#FFCC00] animate-pulse" />
          HIGH-PERFORMANCE DAMPING TECHNOLOGY
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="p-2 bg-black/70 hover:bg-[#FFCC00] hover:text-black border border-zinc-700 text-white transition-colors cursor-pointer text-xs flex items-center gap-1 font-mono"
            title={isPlaying ? 'Pause Video' : 'Play Video'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline text-[10px] uppercase font-bold">{isPlaying ? 'PAUSE' : 'PLAY'}</span>
          </button>
          <button
            onClick={toggleMute}
            className="p-2 bg-black/70 hover:bg-[#FFCC00] hover:text-black border border-zinc-700 text-white transition-colors cursor-pointer text-xs flex items-center gap-1 font-mono"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline text-[10px] uppercase font-bold">{isMuted ? 'MUTED' : 'SOUND ON'}</span>
          </button>
        </div>
      </div>

      <div className="relative z-10 px-6 sm:px-10 lg:px-16 xl:px-20 my-auto w-full max-w-none space-y-5">
        <div className="space-y-2 max-w-5xl">
          <span className="text-xs sm:text-sm font-mono font-black text-[#FFCC00] uppercase tracking-[0.25em] block">
            ✦ MD AUTOTECH PERFORMANCE SUSPENSIONS
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight text-white leading-[0.95] drop-shadow-lg font-display">
            FROM THE RACE TRACK <br />
            <span className="text-[#FFCC00]">TO YOUR RIDE</span>
          </h1>
        </div>

        <p className="text-zinc-200 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-medium drop-shadow">
          Engineered to withstand extreme loads, high-velocity rebound cycles, and rigorous road conditions. Discover factory-grade shock absorbers, USD front forks, and Viton oil seals built for Indian and international vehicles.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={() => { setActiveTab('products'); window.scrollTo({ top: 500, behavior: 'smooth' }); }}
            className="cursor-pointer bg-[#FFCC00] hover:bg-[#e6b800] text-black font-black text-xs uppercase font-mono tracking-widest py-3.5 px-7 flex items-center gap-2.5 transition-transform hover:scale-[1.02] duration-150 rounded-xs shadow-xl"
            id="hero-btn-products"
          >
            EXPLORE PRODUCTS <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>

          <button
            onClick={() => setActiveTab('quality')}
            className="cursor-pointer bg-black/80 hover:bg-zinc-900 border border-zinc-700 hover:border-[#FFCC00] text-white font-extrabold text-xs uppercase font-mono tracking-widest py-3.5 px-6 flex items-center gap-2 transition-colors rounded-xs"
            id="hero-btn-lab"
          >
            <Cpu className="w-4 h-4 text-[#FFCC00]" /> DAMPING LAB SIMULATOR
          </button>

          <button
            onClick={() => triggerWhatsApp('Hello MD AutoTech! I am watching your high-performance suspension video and would like to inquire about wholesale dealership.')}
            className="cursor-pointer bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-xs uppercase font-mono tracking-widest py-3.5 px-5 flex items-center gap-2 transition-colors rounded-xs shadow-md"
            id="hero-btn-whatsapp"
          >
            <MessageSquare className="w-4 h-4 fill-black stroke-none" /> WHATSAPP DIRECT
          </button>
        </div>
      </div>

      <div className="relative z-10 w-full bg-black/85 backdrop-blur-md border-t border-zinc-800 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-800" id="hero-segment-bar">
        <button
          onClick={() => handleSegmentClick('Shocks')}
          className="p-4 sm:p-5 text-left hover:bg-zinc-900/80 transition-colors group cursor-pointer flex items-center justify-between"
          id="segment-motorcycle"
        >
          <div>
            <span className="text-[10px] font-mono font-bold text-[#FFCC00] tracking-widest uppercase block mb-0.5">
              SEGMENT
            </span>
            <span className="text-sm sm:text-base font-black text-white uppercase tracking-wider group-hover:text-[#FFCC00] transition-colors flex items-center gap-2">
              MOTORCYCLE
            </span>
            <span className="text-[11px] text-zinc-400 block mt-0.5 font-mono">USD Forks, Monoshocks &amp; Gas Dampers</span>
          </div>
          <ChevronRight className="w-5 h-5 text-[#FFCC00] group-hover:translate-x-1.5 transition-transform" />
        </button>

        <button
          onClick={() => handleSegmentClick('Forks')}
          className="p-4 sm:p-5 text-left hover:bg-zinc-900/80 transition-colors group cursor-pointer flex items-center justify-between"
          id="segment-automotive"
        >
          <div>
            <span className="text-[10px] font-mono font-bold text-[#FFCC00] tracking-widest uppercase block mb-0.5">
              SEGMENT
            </span>
            <span className="text-sm sm:text-base font-black text-white uppercase tracking-wider group-hover:text-[#FFCC00] transition-colors flex items-center gap-2">
              AUTOMOTIVE
            </span>
            <span className="text-[11px] text-zinc-400 block mt-0.5 font-mono">Heavy Duty Struts &amp; Hydraulic Dampers</span>
          </div>
          <ChevronRight className="w-5 h-5 text-[#FFCC00] group-hover:translate-x-1.5 transition-transform" />
        </button>

        <button
          onClick={() => handleSegmentClick('Seals')}
          className="p-4 sm:p-5 text-left hover:bg-zinc-900/80 transition-colors group cursor-pointer flex items-center justify-between"
          id="segment-mountainbike"
        >
          <div>
            <span className="text-[10px] font-mono font-bold text-[#FFCC00] tracking-widest uppercase block mb-0.5">
              SEGMENT
            </span>
            <span className="text-sm sm:text-base font-black text-white uppercase tracking-wider group-hover:text-[#FFCC00] transition-colors flex items-center gap-2">
              MOUNTAIN BIKE &amp; OFF-ROAD
            </span>
            <span className="text-[11px] text-zinc-400 block mt-0.5 font-mono">Double-Lip Viton Oil Seals &amp; Precision Bushings</span>
          </div>
          <ChevronRight className="w-5 h-5 text-[#FFCC00] group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </section>
  );
}
