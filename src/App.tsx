/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCatalog from './components/ProductCatalog';
import AboutUs from './components/AboutUs';
import QualityAssurance from './components/QualityAssurance';
import QuoteBuilder from './components/QuoteBuilder';
import OwnerDesk from './components/OwnerDesk';
import HeroVideoBanner from './components/HeroVideoBanner';
import { FAQS, PRODUCTS } from './data';
import {
  ShieldCheck,
  ChevronDown,
  HelpCircle,
  Star,
  Wrench,
  Cpu,
  CornerDownRight,
  TrendingUp,
  AlertCircle,
  Phone,
  ArrowRight,
  Info,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  FileText,
  Building2,
  Mail,
  MapPin,
  CheckCircle2,
  Download
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<string>('');
  const [targetCatalogProductId, setTargetCatalogProductId] = useState<string | null>(null);

  // FAQ accordion active state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Hero Product Slideshow State
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Auto-play slideshow every 5 seconds if on home page
  useEffect(() => {
    if (activeTab !== 'home') return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % PRODUCTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeTab]);

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % PRODUCTS.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
  };

  const handleOpenProductDetailFromSlide = (productId: string) => {
    setTargetCatalogProductId(productId);
    setActiveTab('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Micro-damping simulation state on home page
  const [homeSimState, setHomeSimState] = useState<'idle' | 'pothole' | 'speed_breaker'>('idle');
  const [springPositions, setSpringPositions] = useState({ standard: 0, md: 0 });

  const triggerHomeSimulation = (type: 'pothole' | 'speed_breaker') => {
    if (homeSimState !== 'idle') return;
    setHomeSimState(type);

    let frame = 0;
    const interval = setInterval(() => {
      frame++;

      const forceMultiplier = type === 'pothole' ? 35 : -35;
      const t = frame * 0.15;
      const stdY = Math.sin(t * 3) * forceMultiplier * Math.exp(-t * 0.15);
      const mdY = Math.sin(t * 4) * forceMultiplier * Math.exp(-t * 0.85);

      setSpringPositions({ standard: stdY, md: mdY });

      if (frame > 45) {
        clearInterval(interval);
        setSpringPositions({ standard: 0, md: 0 });
        setHomeSimState('idle');
      }
    }, 45);
  };

  const handleSelectProductForQuote = (productName: string) => {
    setSelectedProductForQuote(productName);
    setActiveTab('contact'); // Send direct to contact/quote hub
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearInitialProduct = () => {
    setSelectedProductForQuote('');
  };

  // Standard WhatsApp URL generator with prefilled message
  const triggerWhatsApp = (msgText: string) => {
    const encoded = encodeURIComponent(msgText);
    window.open(`https://wa.me/917030727770?text=${encoded}`, '_blank');
  };

  const currentSlideProduct = PRODUCTS[currentSlideIndex];

  return (
    <div className="min-h-screen w-full theme-page flex flex-col justify-between font-sans selection:bg-[#FFCC00] selection:text-black" id="mdautotech-automotive-web">

      {/* Persistent global header with updated branding and links */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content shell — ~15% less side gap than 1320px (max ~1410px) */}
      <main className={`flex-grow w-full max-w-[1410px] mx-auto px-5 sm:px-7 lg:px-10 ${activeTab === 'home' ? 'pt-2 sm:pt-4 pb-10' : 'py-6 md:py-10'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="w-full"
          >
            {/* HOME VIEW: LANDING EXHIBITION PORTFOLIO WITH HERO VIDEO & SLIDESHOW */}
            {activeTab === 'home' && (
              <div className="space-y-12 w-full" id="home-view">

                {/* 1. HERO VIDEO — replace video file in public/videos/ (see HeroVideoBanner.tsx) */}
                <HeroVideoBanner
                  setActiveTab={setActiveTab}
                  triggerWhatsApp={triggerWhatsApp}
                  handleOpenProductCategory={(cat) => {
                    setActiveTab('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />

                {/* 2. PRODUCT SLIDESHOW — photos come from each product's imageUrl in src/data.ts */}
                <section className="relative bg-[#181818] border border-zinc-800 rounded-xs overflow-hidden shadow-2xl" id="hero-slideshow">

                  {/* Öhlins Top Gold Accent Stripe */}
                  <div className="h-1.5 bg-[#FFCC00] w-full" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">

                    {/* Left Info Column */}
                    <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8 z-10 bg-[#181818]">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="bg-[#FFCC00] text-black text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-1">
                            FLAGSHIP PRODUCT {currentSlideIndex + 1} / {PRODUCTS.length}
                          </span>
                          <span className="text-zinc-400 font-mono text-xs font-bold uppercase tracking-widest">
                            {currentSlideProduct.category} SERIES
                          </span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none">
                          {currentSlideProduct.name}
                        </h1>

                        <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-xl font-medium">
                          {currentSlideProduct.longDescription}
                        </p>

                        {/* Quick Spec Highlights */}
                        <div className="grid grid-cols-3 gap-3 pt-2">
                          <div className="bg-black/60 p-3 border border-zinc-800">
                            <span className="text-[9px] text-zinc-400 font-mono font-bold block uppercase">PRELOAD</span>
                            <span className="text-xs font-mono font-bold text-[#FFCC00]">
                              {currentSlideProduct.technicalDetails.preloadAdjustable ? 'ADJUSTABLE' : 'STANDARD'}
                            </span>
                          </div>
                          <div className="bg-black/60 p-3 border border-zinc-800">
                            <span className="text-[9px] text-zinc-400 font-mono font-bold block uppercase">PISTON DIA</span>
                            <span className="text-xs font-mono font-bold text-white">
                              {currentSlideProduct.technicalDetails.pistonDiameter}
                            </span>
                          </div>
                          <div className="bg-black/60 p-3 border border-zinc-800">
                            <span className="text-[9px] text-zinc-400 font-mono font-bold block uppercase">STROKE</span>
                            <span className="text-xs font-mono font-bold text-white">
                              {currentSlideProduct.technicalDetails.strokeLength}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* CTAs on Slide */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button
                          onClick={() => handleOpenProductDetailFromSlide(currentSlideProduct.id)}
                          className="cursor-pointer bg-[#FFCC00] hover:bg-[#e6b800] text-black font-extrabold text-xs uppercase font-mono tracking-widest py-3.5 px-6 flex items-center gap-2 transition-transform duration-100 rounded-xs shadow-md"
                          id="btn-slide-to-product"
                        >
                          DIRECT LINK TO PRODUCT <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                        </button>

                        <button
                          onClick={() => triggerWhatsApp(`Hello MD AutoTech! I am looking for pricing and wholesale availability for "${currentSlideProduct.name}". Please assist.`)}
                          className="cursor-pointer bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-xs uppercase font-mono tracking-widest py-3.5 px-5 flex items-center gap-2 transition-colors rounded-xs"
                          id="btn-slide-whatsapp"
                        >
                          <MessageSquare className="w-4 h-4 fill-black stroke-none" /> WHATSAPP INQUIRY
                        </button>
                      </div>

                      {/* Slide Nav Buttons */}
                      <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
                        <div className="flex gap-2">
                          {PRODUCTS.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentSlideIndex(idx)}
                              className={`h-2 transition-all cursor-pointer ${idx === currentSlideIndex ? 'w-8 bg-[#FFCC00]' : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                                }`}
                              aria-label={`Go to slide ${idx + 1}`}
                            />
                          ))}
                        </div>

                        <div className="flex gap-1.5">
                          <button
                            onClick={prevSlide}
                            className="p-2.5 bg-black hover:bg-zinc-800 text-white border border-zinc-700 cursor-pointer transition-colors"
                            aria-label="Previous slide"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={nextSlide}
                            className="p-2.5 bg-black hover:bg-zinc-800 text-white border border-zinc-700 cursor-pointer transition-colors"
                            aria-label="Next slide"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right Image Canvas
                        >>> PUT REAL PRODUCT PHOTO:
                        >>> 1) Save file → public/images/products/<product-id>.jpg
                        >>> 2) Set imageUrl in src/data.ts for this product to '/images/products/<product-id>.jpg'
                        >>> Example: '/images/products/md-mono-x1.jpg'
                    */}
                    <div className="lg:col-span-6 relative bg-zinc-900 border-t lg:border-t-0 lg:border-l border-zinc-800 min-h-[320px] overflow-hidden group flex items-center justify-center">
                      <img
                        key={currentSlideProduct.id}
                        src={currentSlideProduct.imageUrl}
                        alt={currentSlideProduct.name}
                        className="w-full h-full object-contain bg-black p-4 transition-all duration-700 animate-in fade-in zoom-in-95"
                      />

                      {/* Product Overlay Tag */}
                      <div className="absolute bottom-4 left-4 bg-black/90 p-3 border border-zinc-800 flex items-center gap-3">
                        <Star className="w-4 h-4 fill-[#FFCC00] stroke-[#FFCC00]" />
                        <div className="text-[10px] font-mono">
                          <span className="text-[#FFCC00] font-bold block">OEM COMPATIBLE</span>
                          <span className="text-zinc-400">Tested to 10M+ Compression Cycles</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </section>


                {/* 2. CORE FOCUS PILLARS: 4 MAIN GOALS IN HIGHLIGHT CARDS */}
                <section className="space-y-4" id="core-focus-pillars">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <span className="text-xs font-mono font-bold text-[#FFCC00] uppercase tracking-widest">
                      ✦ CORE CUSTOMER DIRECTIVES
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">MD AUTOTECH HUB</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* Goal 1: See Products */}
                    <div
                      onClick={() => { setActiveTab('products'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="bg-[#181818] border border-zinc-800 p-6 hover:border-[#FFCC00] cursor-pointer transition-all duration-200 group flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono font-extrabold text-[#FFCC00] uppercase tracking-widest block">
                          01. CATALOG SEARCH
                        </span>
                        <h3 className="text-lg font-bold text-white group-hover:text-[#FFCC00] transition-colors flex items-center justify-between">
                          1) SEE PRODUCTS
                          <ArrowRight className="w-4 h-4 text-[#FFCC00] group-hover:translate-x-1 transition-transform" />
                        </h3>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          Explore our complete line of gas shock absorbers, USD front fork pipes, and double-lip Viton seals.
                        </p>
                      </div>
                      <span className="text-[10px] font-mono font-extrabold text-[#FFCC00] uppercase tracking-wider flex items-center gap-1">
                        VIEW CATALOG (10+ MODELS) →
                      </span>
                    </div>

                    {/* Goal 2: Get Contact Details */}
                    <div
                      onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="bg-[#181818] border border-zinc-800 p-6 hover:border-[#FFCC00] cursor-pointer transition-all duration-200 group flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono font-extrabold text-[#FFCC00] uppercase tracking-widest block">
                          02. DIRECT DESK
                        </span>
                        <h3 className="text-lg font-bold text-white group-hover:text-[#FFCC00] transition-colors flex items-center justify-between">
                          2) CONTACT DETAILS
                          <Phone className="w-4 h-4 text-[#FFCC00]" />
                        </h3>
                        <div className="text-xs text-zinc-300 space-y-1 font-mono">
                          <p className="text-[#FFCC00] font-bold">+91 70307 27770</p>
                          <p className="text-zinc-400 text-[11px]">contact@mdautotech.com</p>
                          <p className="text-zinc-500 text-[10px]">Sector 8, MIDC Industrial Area</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-extrabold text-[#FFCC00] uppercase tracking-wider flex items-center gap-1">
                        GET FULL ADDRESS &amp; INQUIRY FORM →
                      </span>
                    </div>

                    {/* Goal 3: Connect on WhatsApp */}
                    <div
                      onClick={() => triggerWhatsApp('Hello MD AutoTech! I would like to connect with your technical sales team regarding wholesale supply.')}
                      className="bg-[#181818] border border-zinc-800 p-6 hover:border-[#25D366] cursor-pointer transition-all duration-200 group flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono font-extrabold text-[#25D366] uppercase tracking-widest block">
                          03. INSTANT CHAT
                        </span>
                        <h3 className="text-lg font-bold text-white group-hover:text-[#25D366] transition-colors flex items-center justify-between">
                          3) WHATSAPP CONNECT
                          <MessageSquare className="w-4 h-4 fill-[#25D366] stroke-none" />
                        </h3>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          Direct instant messaging with our technical engineers for quick stock availability &amp; custom specifications.
                        </p>
                      </div>
                      <span className="text-[10px] font-mono font-extrabold text-[#25D366] uppercase tracking-wider flex items-center gap-1">
                        OPEN WHATSAPP CHAT NOW →
                      </span>
                    </div>

                    {/* Goal 4: Download Catalog */}
                    <div
                      onClick={() => triggerWhatsApp('Hello MD AutoTech! Please send me your complete product catalog PDF and wholesale price sheet.')}
                      className="bg-[#181818] border border-zinc-800 p-6 hover:border-[#FFCC00] cursor-pointer transition-all duration-200 group flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono font-extrabold text-[#FFCC00] uppercase tracking-widest block">
                          04. BROCHURE &amp; SPEC
                        </span>
                        <h3 className="text-lg font-bold text-white group-hover:text-[#FFCC00] transition-colors flex items-center justify-between">
                          4) CATALOG DOWNLOAD
                          <Download className="w-4 h-4 text-[#FFCC00]" />
                        </h3>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          Receive our full OEM catalog brochure sent directly to your phone via WhatsApp.
                        </p>
                      </div>
                      <span className="text-[10px] font-mono font-extrabold text-[#FFCC00] uppercase tracking-wider flex items-center gap-1">
                        REQUEST CATALOG ON WHATSAPP →
                      </span>
                    </div>

                  </div>
                </section>


                {/* 3. DYNAMIC DEMONSTRATED DAMPING FORCE MICRO-SIMULATOR */}
                <section className="bg-[#181818] border border-zinc-800 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="micro-simulator-section">
                  {/* Left explanation text block */}
                  <div className="lg:col-span-5 space-y-6">
                    <span className="text-xs font-bold text-[#FFCC00] uppercase tracking-widest font-mono">Real-Time Calibration Check</span>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase leading-none">
                      Stock Springs Bounce. <br /><span className="text-[#FFCC00]">MD Damping</span> Stabilizes.
                    </h2>
                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                      Standard springs compress on potholes but fail to absorb kinetic rebound, causing unsafe continuous chassis bouncing. <br /><br />
                      MD AutoTech shock absorbers deploy **15 bar Nitrogen cylinders** and multi-rate oil displacement to cancel kinetic energy instantly, locking tyre grip back within milliseconds.
                    </p>

                    <div className="flex flex-wrap gap-2.5 pt-2">
                      <button
                        onClick={() => triggerHomeSimulation('pothole')}
                        disabled={homeSimState !== 'idle'}
                        className={`cursor-pointer px-4.5 py-3 font-mono font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-2 transition-all ${homeSimState !== 'idle'
                            ? 'bg-zinc-900 text-zinc-600 border border-zinc-800'
                            : 'bg-zinc-900 hover:bg-zinc-800 text-[#FFCC00] border border-[#FFCC00]'
                          }`}
                        id="micro-trigger-pothole"
                      >
                        ⚡ Simulate Pothole Impact
                      </button>

                      <button
                        onClick={() => triggerHomeSimulation('speed_breaker')}
                        disabled={homeSimState !== 'idle'}
                        className={`cursor-pointer px-4.5 py-3 font-mono font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-2 transition-all ${homeSimState !== 'idle'
                            ? 'bg-zinc-900 text-zinc-600 border border-zinc-800'
                            : 'bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700'
                          }`}
                        id="micro-trigger-speed-bump"
                      >
                        ⚡ Simulate Speed Breaker
                      </button>
                    </div>

                    <div className="p-4 bg-black border border-zinc-800 text-[11px] leading-relaxed text-zinc-400 flex gap-2.5 font-sans">
                      <AlertCircle className="w-4.5 h-4.5 text-[#FFCC00] shrink-0 mt-0.5" />
                      <span>
                        Simulate pothole impact above to witness standard coil compression vs. MD AutoTech progressive decay in real-time.
                      </span>
                    </div>
                  </div>

                  {/* Right animated physical twin comparison layout */}
                  <div className="lg:col-span-7 bg-black p-6 text-white grid grid-cols-2 gap-4 border border-zinc-800 relative">

                    {/* Active dynamic state watermarks */}
                    {homeSimState !== 'idle' && (
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 bg-[#FFCC00] text-black font-mono text-[9px] font-black tracking-widest uppercase shadow-md">
                        ACTIVE IMPACT: {homeSimState.replace('_', ' ')}
                      </div>
                    )}

                    {/* Channel 1: Cheap Un-Damped Coil */}
                    <div className="bg-[#181818] p-4.5 border border-zinc-800 text-center flex flex-col justify-between" style={{ minHeight: '300px' }}>
                      <div>
                        <span className="text-[9px] text-zinc-500 font-mono tracking-widest font-bold block uppercase">
                          Channel A Standard
                        </span>
                        <h4 className="text-xs font-bold text-zinc-400 mt-1 uppercase tracking-wide">Generic Stock Coil</h4>
                      </div>

                      {/* Visual Piston spring graphic representation */}
                      <div className="relative h-40 flex items-center justify-center">
                        <div className="absolute inset-x-0 bottom-0 h-4 bg-zinc-800" />

                        {/* Shaking Chassis Block */}
                        <div
                          className="absolute w-24 bg-zinc-800 h-8 border border-zinc-700 transition-all text-[9px] font-mono flex items-center justify-center font-bold text-zinc-400 uppercase tracking-tight"
                          style={{
                            transform: `translateY(${springPositions.standard}px)`,
                            bottom: '100px'
                          }}
                        >
                          Chassis Frame
                        </div>

                        {/* Coiled spring vector drawing */}
                        <svg className="w-10 h-24 overflow-visible absolute" style={{ bottom: '20px' }}>
                          <path
                            d={`M 20 0 
                                C 5 ${10 + springPositions.standard * 0.1}, 35 ${10 + springPositions.standard * 0.1}, 20 ${20 + springPositions.standard * 0.2}
                                C 5 ${30 + springPositions.standard * 0.3}, 35 ${30 + springPositions.standard * 0.3}, 20 ${40 + springPositions.standard * 0.4}
                                C 5 ${50 + springPositions.standard * 0.5}, 35 ${50 + springPositions.standard * 0.5}, 20 ${60 + springPositions.standard * 0.6}
                                C 5 ${70 + springPositions.standard * 0.7}, 35 ${70 + springPositions.standard * 0.7}, 20 ${80 + springPositions.standard * 0.8}
                                C 5 90, 35 90, 20 100`}
                            fill="none"
                            stroke="#71717a"
                            strokeWidth="3.5"
                          />
                        </svg>

                        {/* Tire Wheel */}
                        <div className="absolute bottom-2 w-10 h-10 rounded-full bg-black border border-zinc-800 flex items-center justify-center font-mono font-bold text-[8px] text-zinc-600">
                          TYRE
                        </div>
                      </div>

                      <div className="bg-black p-2 text-[10px] font-mono text-zinc-500 mt-2 uppercase tracking-wider">
                        {homeSimState === 'idle'
                          ? 'Steady State'
                          : `Bouncing Stage`}
                      </div>
                    </div>

                    {/* Channel 2: MD Nitrogen Damper */}
                    <div className="bg-[#181818] p-4.5 border border-zinc-800 text-center flex flex-col justify-between" style={{ minHeight: '300px' }}>
                      <div>
                        <span className="text-[9px] text-[#FFCC00] font-mono tracking-widest font-bold block uppercase">
                          Channel B Enhanced
                        </span>
                        <h4 className="text-xs font-bold text-white mt-1 uppercase tracking-wide">MD Suspension</h4>
                      </div>

                      {/* Visual Golden/Yellow Shock Absorber with active canister */}
                      <div className="relative h-40 flex items-center justify-center">
                        <div className="absolute inset-x-0 bottom-0 h-4 bg-zinc-800" />

                        {/* Shaking Chassis Block */}
                        <div
                          className="absolute w-24 bg-[#FFCC00] h-8 text-black transition-all text-[9px] font-mono flex items-center justify-center font-black shadow-md uppercase tracking-tight"
                          style={{
                            transform: `translateY(${springPositions.md}px)`,
                            bottom: '100px'
                          }}
                        >
                          MD Steady Frame
                        </div>

                        {/* Coiled spring vector drawing with yellow color block */}
                        <svg className="w-10 h-24 overflow-visible absolute" style={{ bottom: '20px' }}>
                          <line x1="20" y1="0" x2="20" y2="80" stroke="#d4d4d8" strokeWidth="6" />

                          <path
                            d={`M 20 0 
                                C 5 ${12 + springPositions.md * 0.15}, 35 ${12 + springPositions.md * 0.15}, 20 ${24 + springPositions.md * 0.25}
                                C 5 ${36 + springPositions.md * 0.35}, 35 ${36 + springPositions.md * 0.35}, 20 ${48 + springPositions.md * 0.45}
                                C 5 ${60 + springPositions.md * 0.55}, 35 ${60 + springPositions.md * 0.55}, 20 ${72 + springPositions.md * 0.65}
                                C 5 85, 35 85, 20 100`}
                            fill="none"
                            stroke="#FFCC00"
                            strokeWidth="4"
                          />
                        </svg>

                        {/* Gas canister representing Piggyback N2 reservoir */}
                        <div className="absolute right-2 top-11 w-4 h-9 bg-black text-[#FFCC00] font-mono font-black text-[7px] flex items-center justify-center flex-col leading-none border border-zinc-800">
                          <span>N2</span>
                        </div>

                        {/* Tire Wheel */}
                        <div className="absolute bottom-2 w-10 h-10 rounded-full bg-black border-2 border-[#FFCC00] flex items-center justify-center font-mono font-bold text-[8px] text-white">
                          GRIP+
                        </div>
                      </div>

                      <div className="bg-black p-2 text-[10px] font-mono text-[#FFCC00] mt-2 font-bold uppercase tracking-wider">
                        {homeSimState === 'idle'
                          ? 'CALM CHAMBER'
                          : `Settle: 0.28s`}
                      </div>
                    </div>

                  </div>
                </section>


                {/* 4. ACTIVE FAQ ACCORDION DIVISION */}
                <section className="bg-[#181818] border border-zinc-800 p-6 sm:p-12 font-sans text-left" id="faq-section">
                  <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
                    <span className="text-xs font-bold text-[#FFCC00] uppercase tracking-widest font-mono">Technical Lab Q&amp;A</span>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
                      Distributor &amp; <span className="text-[#FFCC00]">Engineering FAQs</span>
                    </h2>
                    <p className="text-zinc-400 text-xs sm:text-sm">
                      Learn about stiction friction, oil-aeration cavitation, progressive rate coils, and standard wholesale dealership requirements.
                    </p>
                  </div>

                  <div className="max-w-3xl mx-auto space-y-3">
                    {FAQS.map((faq, idx) => {
                      const isOpen = openFaqIndex === idx;
                      return (
                        <div
                          key={idx}
                          className="bg-black border border-zinc-800 overflow-hidden transition-all duration-300"
                        >
                          <button
                            onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                            className="cursor-pointer w-full text-left p-4 sm:p-5 flex justify-between items-center gap-4 text-white hover:text-[#FFCC00] font-bold text-xs sm:text-sm uppercase font-mono tracking-wider"
                          >
                            <span className="flex gap-3 items-center leading-snug">
                              <HelpCircle className="w-4 h-4 text-[#FFCC00] shrink-0" />
                              <span>{faq.question}</span>
                            </span>
                            <ChevronDown className={`w-4 h-4 shrink-0 transition-transform text-zinc-500 ${isOpen ? 'rotate-180 text-[#FFCC00]' : ''}`} />
                          </button>

                          {isOpen && (
                            <div className="p-5 pt-0 border-t border-zinc-900 text-zinc-300 text-xs leading-relaxed pl-11 font-sans">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>

              </div>
            )}

            {activeTab === 'about' && <AboutUs />}

            {/* PRODUCT IMAGES: grid reads imageUrl from src/data.ts — put files in public/images/products/ */}
            {activeTab === 'products' && (
              <ProductCatalog
                onSelectProductForQuote={handleSelectProductForQuote}
                initialSelectedProductId={targetCatalogProductId}
              />
            )}

            {activeTab === 'quality' && <QualityAssurance />}

            {activeTab === 'contact' && (
              <QuoteBuilder
                initialProductName={selectedProductForQuote}
                onClearInitialProduct={clearInitialProduct}
              />
            )}

            {activeTab === 'owner-desk' && <OwnerDesk />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating WhatsApp Action Pill - Persistent Across Site */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => triggerWhatsApp('Hello MD AutoTech! I have an urgent inquiry regarding product availability and custom specifications.')}
          className="cursor-pointer bg-[#25D366] hover:bg-[#20bd5a] text-black shadow-2xl p-3.5 sm:px-5 sm:py-3.5 rounded-full font-mono font-extrabold text-xs uppercase tracking-wider flex items-center gap-2.5 transition-transform hover:scale-105 active:scale-95 border-2 border-black"
          aria-label="Connect on WhatsApp"
        >
          <MessageSquare className="w-5 h-5 fill-black stroke-none" />
          <span className="hidden sm:inline">WhatsApp Us Direct</span>
        </button>
      </div>

      {/* Corporate core Footer with MD AutoTech values and links */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

