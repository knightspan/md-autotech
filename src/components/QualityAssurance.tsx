/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import DampingLab from './DampingLab';
import ManufacturingNetwork from './ManufacturingNetwork';
import { ShieldCheck, Cpu, Factory, Award } from 'lucide-react';

export default function QualityAssurance() {
  const [subTab, setSubTab] = useState<'simulator' | 'facilities'>('simulator');

  return (
    <div className="space-y-10 animate-in fade-in duration-200 text-white" id="quality-assurance-wrapper">
      
      {/* Editorial Overview header segment */}
      <div className="border-b border-zinc-800 pb-6 bg-[#181818] p-6 sm:p-8 rounded-xs flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="text-xs font-bold text-[#FFCC00] uppercase tracking-widest font-mono block">
            ✦ Certified Quality Assurance (QA/QC)
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase leading-none mt-1">
            Execution &amp; <span className="text-[#FFCC00]">Validation</span>
          </h2>
          <p className="text-zinc-300 text-xs sm:text-sm mt-2 max-w-xl font-medium">
            At MD AutoTech, quality is validated in real-time. Toggle below to load our interactive Suspension Damping simulation, or view our 4 high-output MIDC factory facilities.
          </p>
        </div>

        {/* Audit certification seal block */}
        <div className="flex items-center gap-3 bg-black text-white p-3.5 border border-zinc-800 font-sans shrink-0">
          <Award className="w-5 h-5 text-[#FFCC00] shrink-0" />
          <div className="text-[10px] uppercase font-mono tracking-wider">
            <span className="font-bold text-white block">ISO 9001:2015 REGISTERED</span>
            <span className="text-zinc-400 text-[9px] font-normal">IATF 16949 QC COMPLIANT COILS</span>
          </div>
        </div>
      </div>

      {/* Segmented Sub-tab controllers */}
      <div className="flex border-b border-zinc-800 bg-[#181818]" id="qa-subtabs">
        <button
          onClick={() => setSubTab('simulator')}
          className={`cursor-pointer flex-1 py-4 text-center text-xs uppercase tracking-widest font-mono font-extrabold transition-all duration-150 flex items-center justify-center gap-2 border-b-2 ${
            subTab === 'simulator'
              ? 'border-[#FFCC00] text-[#FFCC00] bg-black/40'
              : 'border-transparent text-zinc-400 hover:text-white hover:bg-black/20'
          }`}
          id="btn-subtab-simulator"
        >
          <Cpu className="w-4 h-4 stroke-[2]" /> Dynamic Suspension Lab
        </button>
        <button
          onClick={() => setSubTab('facilities')}
          className={`cursor-pointer flex-1 py-4 text-center text-xs uppercase tracking-widest font-mono font-extrabold transition-all duration-150 flex items-center justify-center gap-2 border-b-2 ${
            subTab === 'facilities'
              ? 'border-[#FFCC00] text-[#FFCC00] bg-black/40'
              : 'border-transparent text-zinc-400 hover:text-white hover:bg-black/20'
          }`}
          id="btn-subtab-facilities"
        >
          <Factory className="w-4 h-4 stroke-[2]" /> Plants &amp; Logistics Network
        </button>
      </div>

      {/* Render sub-view with custom transition styling */}
      <div className="pt-2" id="qa-active-subview">
        {subTab === 'simulator' ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {/* Quick lab info banner */}
            <div className="bg-[#181818] border-l-4 border-[#FFCC00] p-4 text-xs text-zinc-200 flex gap-3 border border-zinc-800">
              <ShieldCheck className="w-5 h-5 text-[#FFCC00] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-mono uppercase">Active Engineering Laboratory: </strong>
                Adjust Road velocity parameters, choose between pothole and speed bumps, and calibrate spring stiffness to witness how pressurized twin-chambers cancel vertical kinetic drag instantly.
              </div>
            </div>
            <DampingLab />
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
            <ManufacturingNetwork />
          </div>
        )}
      </div>

    </div>
  );
}

