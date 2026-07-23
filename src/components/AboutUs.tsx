/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from 'react';
import { Shield, Sparkles, Settings, Users, ArrowRight, Award, Compass, Heart, MessageSquare } from 'lucide-react';

export default function AboutUs() {
  const triggerWhatsApp = (msgText: string) => {
    const encoded = encodeURIComponent(msgText);
    window.open(`https://wa.me/917030727770?text=${encoded}`, '_blank');
  };

  return (
    <div className="space-y-12 text-white" id="about-us-view">

      {/* 1. EDITORIAL HEADER SECTION */}
      <div className="border-b border-zinc-800 pb-8 bg-[#181818] p-6 sm:p-10 rounded-xs">
        <span className="text-xs font-bold text-[#FFCC00] uppercase tracking-[0.2em] font-mono block mb-1">
          ✦ MD AutoTech Corporate Legacy &amp; Values
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none uppercase">
          Precision Manufacturing <span className="text-[#FFCC00]">Since 1979</span>
        </h2>
        <p className="text-zinc-300 text-xs sm:text-sm mt-3 max-w-2xl leading-relaxed font-medium">
          MD AutoTech is part of an elite industrial group with over four decades of engineering eminence in heavy-duty shock absorbers, front forks, and precision fluor-elastomer oil seals.
        </p>
      </div>

      {/* 2. CHRONICLE LEGACY GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#181818] border border-zinc-800 p-6 sm:p-10 shadow-xl">

        {/* Left narrative - 7 columns */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
          <div className="space-y-5">
            <span className="text-[10px] uppercase font-bold text-[#FFCC00] font-mono tracking-widest block">
              ✦ OUR ORIGIN STORY
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug uppercase">
              From a single lathe to four state-of-the-art plants.
            </h3>
            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-medium">
              <strong>MD AutoTech</strong> was founded under a premier industrial group established in <strong>1979</strong> by <strong>Mr. K J Patil</strong>, a dedicated Mechanical Engineer with a vision for world-class localized manufacturing.
            </p>
            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-medium">
              From those modest beginnings of a single manual lathe machine and one worker, our enterprise has expanded systematically. Today, our advanced manufacturing centers span <strong>4 state-of-the-art facilities</strong> in western India, employing over <strong>200+ specialized technicians and quality engineers</strong>.
            </p>
          </div>

          {/* Core bullet highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-zinc-800 font-sans">
            <div className="flex gap-2.5">
              <div className="w-5 h-5 bg-[#FFCC00] text-black font-black flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                ✓
              </div>
              <div>
                <strong className="text-white text-xs block font-bold uppercase tracking-wider font-mono">Precision Products First</strong>
                <p className="text-zinc-400 text-[11px] leading-relaxed mt-0.5">Zero tolerance on piston-shaft surfaces and fluid seal degradation.</p>
              </div>
            </div>
            <div className="flex gap-2.5">
              <div className="w-5 h-5 bg-[#FFCC00] text-black font-black flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                ✓
              </div>
              <div>
                <strong className="text-white text-xs block font-bold uppercase tracking-wider font-mono">In-House R&amp;D Testing</strong>
                <p className="text-zinc-400 text-[11px] leading-relaxed mt-0.5">Equipped with specialized computer-controlled dual-axis hydraulic dynamometers.</p>
              </div>
            </div>
            <div className="flex gap-2.5">
              <div className="w-5 h-5 bg-[#FFCC00] text-black font-black flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                ✓
              </div>
              <div>
                <strong className="text-white text-xs block font-bold uppercase tracking-wider font-mono">Robotic Manufacturing</strong>
                <p className="text-zinc-400 text-[11px] leading-relaxed mt-0.5">Robotized pulse MIG/TIG welding cells and high-speed CNC winding formers.</p>
              </div>
            </div>
            <div className="flex gap-2.5">
              <div className="w-5 h-5 bg-[#FFCC00] text-black font-black flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                ✓
              </div>
              <div>
                <strong className="text-white text-xs block font-bold uppercase tracking-wider font-mono">Expert Panel</strong>
                <p className="text-zinc-400 text-[11px] leading-relaxed mt-0.5">Directed by veteran mechanical specialists with expertise across commercial vehicles.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side background visual - 5 columns */}
        <div className="lg:col-span-5 bg-black relative p-8 text-white flex flex-col justify-between overflow-hidden border border-zinc-800">
          <div className="relative z-10 space-y-4">
            <span className="text-[9px] font-mono tracking-widest text-[#FFCC00] uppercase font-extrabold block">
              ✦ CORE MANUFACTURING PHILOSOPHY
            </span>
            <div className="text-2xl font-bold uppercase text-white tracking-wide">
              &ldquo;Experience, Execution, Excellence.&rdquo;
            </div>
            <p className="text-zinc-300 text-xs leading-relaxed">
              We design the dynamic machinery that coils the springs, superfinishes the cylinders, and verifies fluid displacement curves. Every MD AutoTech shock handles rough roads because it was forged by customized manufacturing masters.
            </p>
          </div>

          <div className="relative z-10 space-y-4 pt-8">
            <div className="p-4 border-l-2 border-[#FFCC00] bg-zinc-900 space-y-1.5">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#FFCC00]">Pune &amp; MIDC Infrastructure</span>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                4 separate manufacturing buildings containing automated laser, forging, fluid packaging, and custom metallurgic hardening stations.
              </p>
            </div>
            <button
              onClick={() => triggerWhatsApp('Hello MD AutoTech! I am reading about your company legacy and would like to connect for dealer enrollment.')}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-black px-4 py-3 text-xs font-mono font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <MessageSquare className="w-4 h-4 fill-black stroke-none" /> Connect With Our Management
            </button>
          </div>
        </div>

      </div>

      {/* 3. MILESTONES STAT DIVISION */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-zinc-800 bg-[#181818] shadow-lg divide-y md:divide-y-0 md:divide-x divide-zinc-800 text-center py-6">
        <div className="p-4 space-y-1">
          <span className="block text-3xl sm:text-4xl font-mono font-black text-[#FFCC00]">1979</span>
          <span className="block text-[10px] uppercase font-mono font-bold text-zinc-400 tracking-widest">Year of Foundation</span>
        </div>
        <div className="p-4 space-y-1">
          <span className="block text-3xl sm:text-4xl font-mono font-black text-white">4</span>
          <span className="block text-[10px] uppercase font-mono font-bold text-zinc-400 tracking-widest">Active Plant Facilities</span>
        </div>
        <div className="p-4 space-y-1">
          <span className="block text-3xl sm:text-4xl font-mono font-black text-white">200+</span>
          <span className="block text-[10px] uppercase font-mono font-bold text-zinc-400 tracking-widest">Technical Employees</span>
        </div>
        <div className="p-4 space-y-1">
          <span className="block text-3xl sm:text-4xl font-mono font-black text-white">10M+</span>
          <span className="block text-[10px] uppercase font-mono font-bold text-zinc-400 tracking-widest">Damping Units Shipped</span>
        </div>
      </section>

      {/* 4. DESIGN STANDARDS INFOLINE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#181818] border border-zinc-800 p-6 sm:p-8">
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-bold text-[#FFCC00] uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4" /> Global Certifications &amp; Standards
          </h4>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight uppercase">
            ISO &amp; IATF Compliant Manufacturing Gates
          </h3>
          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
            Our facilities conform to international quality guidelines with <strong>ISO 9001:2015</strong> certification and **IATF 16949-compliant quality control gates**. Every shock absorber batch is trace-recorded and stress-tested.
          </p>
        </div>

        <div className="space-y-4 bg-black p-5 border border-zinc-800 text-xs text-zinc-300">
          <div className="flex gap-3 pb-3 border-b border-zinc-800">
            <Shield className="w-5 h-5 text-[#FFCC00] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white uppercase font-bold text-[10px] tracking-wider block font-mono">IATF 16949 Automotive Compliance</strong>
              <p className="text-zinc-400 mt-0.5 text-[11px]">Securing ultimate hardware safety and manufacturing traceability thresholds for standard factory replacement parts.</p>
            </div>
          </div>
          <div className="flex gap-3 pt-3">
            <Compass className="w-5 h-5 text-[#FFCC00] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white uppercase font-bold text-[10px] tracking-wider block font-mono">Direct Technical Partnership</strong>
              <p className="text-zinc-400 mt-0.5 text-[11px]">Partner with us for direct factory wholesale rates, bulk shipping, and customized technical specs.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

