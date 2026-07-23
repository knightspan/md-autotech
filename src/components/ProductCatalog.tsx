/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import { Search, Info, Star, Compass, Settings2, SlidersHorizontal, ArrowUpRight, ShieldCheck, Check, Phone, ArrowRight, MessageSquare } from 'lucide-react';

interface ProductCatalogProps {
  onSelectProductForQuote: (productName: string) => void;
  initialSelectedProductId?: string | null;
}

export default function ProductCatalog({ onSelectProductForQuote, initialSelectedProductId }: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'suspension' | 'parts' | 'performance'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Auto-open modal if navigated from hero slideshow
  useEffect(() => {
    if (initialSelectedProductId) {
      const match = PRODUCTS.find(p => p.id === initialSelectedProductId);
      if (match) {
        setSelectedProduct(match);
      }
    }
  }, [initialSelectedProductId]);

  // Spring Preload Preview State inside modal
  const [preloadStep, setPreloadStep] = useState(3); // 1 to 5 steps

  // Filter products based on search term and category selection
  const filteredProducts = PRODUCTS.filter((p) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(q) ||
      p.type.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.specs.some((s) => s.value.toLowerCase().includes(q));

    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getSpringCalculations = (step: number) => {
    const baseStiffness = 45; // N/mm
    const stiffnessMultiplier = 1 + (step - 1) * 0.12;
    const finalStiffness = (baseStiffness * stiffnessMultiplier).toFixed(1);
    const mmTravelReduction = (step - 1) * 4; // mm pre-compressed
    const activeCoils = 8.5 - (step - 1) * 0.2;
    return {
      stiffness: finalStiffness,
      compression: mmTravelReduction,
      activeCoils: activeCoils.toFixed(1),
      rideQuality: step <= 2 ? 'Premium Comfort' : step === 3 ? 'Dual-Balanced Touring' : 'Track Sport & Stability Control'
    };
  };

  const currentSpringCalc = selectedProduct ? getSpringCalculations(preloadStep) : null;

  // Direct WhatsApp prefill text helper for instant customer experience (No mention of price!)
  const triggerWhatsAppInquiry = (productName: string) => {
    const textMsg = `Hello MD AutoTech! I am interested in inquiring about technical parameters and custom wholesale supply options for "${productName}". Please share product specifications and dealer details.`;
    const encodedText = encodeURIComponent(textMsg);
    const waUrl = `https://wa.me/917030727770?text=${encodedText}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section className="space-y-10 focus:outline-none animate-in fade-in duration-200" id="product-catalog-section">

      {/* Upper header segment - Öhlins Style */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-800 pb-8 bg-[#181818] p-6 text-white rounded-xs">
        <div>
          <span className="text-xs font-bold text-[#FFCC00] uppercase tracking-widest font-mono block mb-1">
            ✦ MD AutoTech Original Equipment
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none uppercase">
            PRODUCT <span className="text-[#FFCC00]">CATALOG</span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-xl">
            Official MD Autotech shock absorbers for Hero, Bajaj, TVS, Honda, and Yamaha — with real catalogue part numbers and product photos.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 bg-zinc-900 p-1.5 border border-zinc-800">
          {[
            { id: 'all', label: 'All Catalog' },
            { id: 'suspension', label: 'Shock Absorbers' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`cursor-pointer px-4 py-2 text-[11px] uppercase font-mono font-extrabold tracking-wider transition-all duration-150 ${selectedCategory === cat.id
                  ? 'bg-[#FFCC00] text-black font-black'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Modern Search/Filtering Bar Row */}
      <div className="bg-[#1a1a1a] p-4 border border-zinc-800 flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full sm:flex-grow">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search parts by name (e.g. 'Mono X1', 'Fork Pipe', 'Dual Tourer', 'Oil Seals')..."
            className="w-full bg-[#121212] text-white border border-zinc-700 pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#FFCC00] placeholder-zinc-500 font-mono font-medium"
          />
        </div>

        <div className="w-full sm:w-auto shrink-0 flex items-center justify-between sm:justify-start gap-4">
          <span className="text-xs text-zinc-400 font-mono font-bold">
            SHOWING <strong className="text-[#FFCC00] font-black">{filteredProducts.length}</strong> PRODUCTS
          </span>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="px-3.5 py-2 text-[10px] uppercase font-mono tracking-wider font-extrabold bg-zinc-800 border border-zinc-700 text-zinc-300 cursor-pointer hover:bg-zinc-700 hover:text-white transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Grid container of products */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-[#181818] border border-zinc-800 overflow-hidden hover:border-[#FFCC00] transition-all duration-200 flex flex-col justify-between group h-full shadow-lg"
              id={`product-card-${p.id}`}
            >
              {/*
                >>> PRODUCT CARD IMAGE
                >>> Comes from p.imageUrl in src/data.ts
                >>> Put file in: public/images/products/<product-id>.jpg
                >>> Then set imageUrl to '/images/products/<product-id>.jpg'
              */}
              <div className="relative h-56 w-full bg-black overflow-hidden shrink-0 border-b border-zinc-800">
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                />

                <span className="absolute top-3 left-3 bg-[#FFCC00] text-black text-[9px] font-mono font-black uppercase tracking-wider px-2.5 py-1 shadow-md">
                  {p.specs.find((s) => s.label === 'Part Number')?.value ?? p.type}
                </span>

                <span className="absolute bottom-3 right-3 text-white bg-black/90 px-2.5 py-0.5 font-mono text-[9px] font-bold tracking-widest uppercase border border-zinc-700">
                  OEM FIT
                </span>
              </div>

              {/* Title & Description details */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-zinc-400 uppercase font-mono tracking-wider font-bold">
                    <span className="text-[#FFCC00]">Shock Absorber</span>
                    <span className="flex items-center gap-1 text-white">
                      <Star className="w-3.5 h-3.5 fill-[#FFCC00] stroke-[#FFCC00]" /> {p.rating}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-base group-hover:text-[#FFCC00] transition-colors leading-tight uppercase">
                    {p.name}
                  </h3>
                  <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed font-sans">
                    {p.description}
                  </p>
                </div>

                {/* Micro engineering details list */}
                <div className="bg-zinc-900 p-3 border border-zinc-800 flex flex-wrap gap-x-3 gap-y-1 text-[9.5px] font-mono text-zinc-400">
                  <span className="flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00]" /> PRELOAD: {p.technicalDetails.preloadAdjustable ? 'ADJUSTABLE' : 'FIXED'}
                  </span>
                  {p.technicalDetails.reboundClicks ? (
                    <span className="flex items-center gap-1 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00]" /> REBOUND: {p.technicalDetails.reboundClicks} CLICKS
                    </span>
                  ) : null}
                  <span className="flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" /> PISTON: {p.technicalDetails.pistonDiameter}
                  </span>
                </div>

                {/* Direct Action Buttons: Spec Sheet & WhatsApp Inquiry */}
                <div className="pt-2 grid grid-cols-2 gap-2 text-center shrink-0">
                  <button
                    onClick={() => {
                      setPreloadStep(3);
                      setSelectedProduct(p);
                    }}
                    className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] font-mono font-bold uppercase tracking-wider py-2.5 px-2 flex items-center justify-center gap-1 transition-colors border border-zinc-700"
                    id={`btn-view-details-${p.id}`}
                  >
                    <Info className="w-3.5 h-3.5 stroke-[2.5]" /> Spec Sheet
                  </button>
                  <button
                    onClick={() => triggerWhatsAppInquiry(p.name)}
                    className="cursor-pointer bg-[#25D366] hover:bg-[#20bd5a] text-black text-[10px] font-mono font-extrabold uppercase tracking-wider py-2.5 px-2 flex items-center justify-center gap-1 transition-colors"
                    id={`btn-inquire-${p.id}`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-black stroke-none" /> WhatsApp
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center border border-dashed border-zinc-800 bg-[#181818] text-white">
          <SlidersHorizontal className="w-12 h-12 text-[#FFCC00] mx-auto stroke-1 mb-2" />
          <h3 className="text-sm font-bold text-white uppercase font-mono">No Catalog Parts Found</h3>
          <p className="text-xs text-zinc-400 mt-1">Try clearing your search query to view all available products.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="cursor-pointer mt-4 bg-[#FFCC00] text-black font-extrabold text-xs px-5 py-2.5 uppercase tracking-widest transition-colors"
          >
            Reset Search
          </button>
        </div>
      )}

      {/* MARKETING VALUE CARD (Aesthetic corporate trust callout) */}
      <div className="bg-[#181818] text-white p-6 sm:p-10 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-left">
          <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#FFCC00]">
            ✦ DIRECT MANUFACTURER SUPPLY
          </span>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
            Wholesale Dealerships &amp; Mechanical Workshops
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            Register as an authorized regional distributor. We provide direct factory pricing, customized bulk packaging, and comprehensive dynamic testing warranties.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <button
            onClick={() => triggerWhatsAppInquiry('All Catalog Parts')}
            className="cursor-pointer bg-[#25D366] hover:bg-[#20bd5a] text-black px-6 py-3.5 text-xs uppercase font-mono tracking-widest font-extrabold transition-transform duration-100 flex items-center justify-center gap-2 rounded-xs"
          >
            <MessageSquare className="w-4 h-4 fill-black stroke-none" /> WhatsApp Direct Connect
          </button>
          <button
            onClick={() => onSelectProductForQuote('')}
            className="cursor-pointer bg-[#FFCC00] hover:bg-[#e6b800] text-black px-6 py-3.5 text-xs uppercase font-mono tracking-widest font-extrabold transition-transform duration-100 flex items-center justify-center gap-2 rounded-xs"
          >
            Configure Inquiry <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* PRODUCT DETAIL MODAL DRAWER */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150" id="product-detail-modal">
          <div className="bg-[#181818] max-w-3xl w-full border border-zinc-700 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col justify-between text-white">

            {/* Modal header */}
            <div className="p-5 bg-black text-white flex justify-between items-center border-b border-zinc-800 shrink-0">
              <div>
                <span className="text-[9px] font-mono font-bold text-[#FFCC00] tracking-widest uppercase">{selectedProduct.type} TECHNICAL SPEC CARD</span>
                <h3 className="text-lg font-bold tracking-tight mt-0.5 text-white uppercase">{selectedProduct.name}</h3>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="cursor-pointer text-xs uppercase tracking-widest font-mono font-black p-2 text-zinc-400 hover:text-[#FFCC00] transition-colors"
                id="btn-close-modal"
              >
                ✕ Close
              </button>
            </div>

            {/* Modal Body scrollable */}
            <div className="overflow-y-auto p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 flex-grow">

              {/* Left Column: Image and standard Specs table */}
              <div className="md:col-span-5 space-y-6">
                <div className="h-64 bg-black overflow-hidden border border-zinc-700 relative shadow-inner">
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    className="w-full h-full object-contain p-4"
                  />
                  <div className="absolute bottom-3 left-3 bg-[#FFCC00] text-black px-3 py-1 font-mono text-[9px] font-black uppercase tracking-wider shadow-sm">
                    {selectedProduct.specs.find((s) => s.label === 'Part Number')?.value ?? 'MD AUTOTECH'}
                  </div>
                </div>

                {/* Specs list matrix */}
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-[#FFCC00] font-mono tracking-widest uppercase block border-b border-zinc-800 pb-1.5">Engineering Parameters</span>
                  <table className="w-full text-xs font-sans text-zinc-300">
                    <tbody>
                      {selectedProduct.specs.map((item, idx) => (
                        <tr key={idx} className="border-b border-zinc-800 hover:bg-zinc-900">
                          <td className="py-2 font-medium text-zinc-400 pr-4">{item.label}</td>
                          <td className="py-2 text-right font-bold text-white font-mono text-[11px]">{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Rating count block */}
                <div className="bg-zinc-900 border border-zinc-800 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white text-xs font-bold">
                    <Star className="w-4.5 h-4.5 fill-[#FFCC00] stroke-[#FFCC00]" />
                    <span>Workshop Certified: {selectedProduct.rating} / 5</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono font-bold tracking-tight uppercase">{selectedProduct.reviewsCount} reviews</span>
                </div>
              </div>

              {/* Right Column: Engineering explanation and preload simulation */}
              <div className="md:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#FFCC00] uppercase font-mono tracking-wider block">Description &amp; Construction</span>
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                    {selectedProduct.longDescription}
                  </p>
                </div>

                {/* Highlight Check marks */}
                <div className="space-y-3">
                  <span className="text-[9px] font-bold text-[#FFCC00] font-mono tracking-widest uppercase block border-b border-zinc-800 pb-1.5">Compliance &amp; Build Certifications</span>
                  <div className="grid grid-cols-1 gap-2.5">
                    {selectedProduct.features.map((feat, idx) => (
                      <div key={idx} className="flex gap-2 items-start text-xs font-sans text-zinc-300 leading-normal">
                        <Check className="w-4 h-4 text-[#FFCC00] shrink-0 stroke-[2.5] mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* INTERACTIVE SPRING PRELOAD SELECTOR GADGET */}
                {selectedProduct.category === 'suspension' ? (
                  <div className="bg-zinc-900 border border-zinc-800 p-4.5 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase font-mono tracking-wide">
                          <Compass className="w-4 h-4 text-[#FFCC00]" /> Coil Preload Simulator
                        </h4>
                        <p className="text-[10px] text-zinc-400 mt-0.5">
                          Configure helical mechanical coil step to calculate wire response rate.
                        </p>
                      </div>
                      <span className="p-0.5 px-2 bg-[#FFCC00] text-black font-mono text-[9px] font-black">
                        STEP: {preloadStep}
                      </span>
                    </div>

                    {/* Preload Slider Selector (1 - 5) */}
                    <div className="flex items-center gap-4 py-1">
                      <span className="text-[10px] font-mono text-zinc-500">SOFT (1)</span>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        value={preloadStep}
                        onChange={(e) => setPreloadStep(parseInt(e.target.value))}
                        className="w-full accent-[#FFCC00] cursor-pointer h-2 bg-zinc-800"
                      />
                      <span className="text-[10px] font-mono text-zinc-500">HARD (5)</span>
                    </div>

                    {/* Simulation results readout columns */}
                    <div className="grid grid-cols-3 gap-2.5">
                      <div className="bg-black p-2.5 border border-zinc-800">
                        <span className="text-[9px] text-zinc-500 block font-mono font-bold tracking-wider">COMPRESSION</span>
                        <span className="text-xs font-bold text-white font-mono">
                          -{currentSpringCalc?.compression} mm
                        </span>
                      </div>
                      <div className="bg-black p-2.5 border border-zinc-800">
                        <span className="text-[9px] text-zinc-500 block font-mono font-bold tracking-wider">STIFFNESS</span>
                        <span className="text-xs font-bold text-[#FFCC00] font-mono">
                          {currentSpringCalc?.stiffness} N/mm
                        </span>
                      </div>
                      <div className="bg-black p-2.5 border border-zinc-800">
                        <span className="text-[9px] text-zinc-500 block font-mono font-bold tracking-wider">ACTIVE COILS</span>
                        <span className="text-xs font-bold text-white font-mono">
                          {currentSpringCalc?.activeCoils} Coils
                        </span>
                      </div>
                    </div>

                    {/* Quality statement callback */}
                    <div className="p-3 bg-black text-zinc-300 text-[10px] leading-relaxed flex gap-2 items-start border border-zinc-800">
                      <Settings2 className="w-3.5 h-3.5 text-[#FFCC00] shrink-0 mt-0.5" />
                      <div>
                        <strong>Coil response rating: </strong>
                        {currentSpringCalc?.rideQuality}. Validated with zero mechanical sag risk.
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-zinc-900 border border-zinc-800 flex gap-3 text-zinc-300">
                    <ShieldCheck className="w-5 h-5 text-[#FFCC00] shrink-0" />
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wide">CNC Superfinish Tested</h4>
                      <p className="text-[10px] leading-relaxed text-zinc-400">
                        This catalog part is machined under strict CNC standards of +/- 0.02mm. Direct fitment with zero aftermarket adjustments.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal actions footer */}
            <div className="p-5 bg-black border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0">
              <span className="text-[11px] text-zinc-400 font-medium">
                Request technical drawings or custom wholesale packing specifications:
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => triggerWhatsAppInquiry(selectedProduct.name)}
                  className="cursor-pointer bg-[#25D366] hover:bg-[#20bd5a] text-black text-[11px] py-2.5 px-4 font-extrabold font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 rounded-xs"
                >
                  <MessageSquare className="w-4 h-4 fill-black stroke-none" /> WhatsApp Inquiry
                </button>
                <button
                  onClick={() => {
                    onSelectProductForQuote(selectedProduct.name);
                    setSelectedProduct(null);
                  }}
                  className="cursor-pointer bg-[#FFCC00] hover:bg-[#e6b800] text-black text-[11px] py-2.5 px-4.5 font-extrabold font-mono uppercase tracking-widest transition-colors rounded-xs shadow-xs"
                >
                  Configure Spec Sheet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
