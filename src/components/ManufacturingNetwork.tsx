/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MANUFACTURING_STEPS, DISTRIBUTORS } from '../data';
import { DistributorLocation } from '../types';
import { Factory, Truck, MapPin, Phone, Mail, RotateCw, CheckCircle, PackageOpen, Award, Compass, Search } from 'lucide-react';

export default function ManufacturingNetwork() {
  const [selectedHub, setSelectedHub] = useState<DistributorLocation | null>(DISTRIBUTORS[0]);
  const [routeSimulation, setRouteSimulation] = useState<{
    isRunning: boolean;
    progress: number;
    arrivalSec: number;
    status: string;
  }>({
    isRunning: false,
    progress: 0,
    arrivalSec: 0,
    status: 'Ready'
  });

  const [searchCity, setSearchCity] = useState('');

  // Handle Dispatch Simulation
  const triggerDispatch = (hubName: string) => {
    if (routeSimulation.isRunning) return;

    setRouteSimulation({
      isRunning: true,
      progress: 0,
      arrivalSec: 10,
      status: `Assembling freight truck loads for ${hubName}...`
    });

    const interval = setInterval(() => {
      setRouteSimulation((prev) => {
        if (prev.progress >= 100) {
          clearInterval(interval);
          return {
            isRunning: false,
            progress: 100,
            arrivalSec: 0,
            status: `Shipment arrived at ${hubName} Warehouse successfully!`
          };
        }

        const nextProgress = prev.progress + 10;
        let nextStatus = prev.status;
        if (nextProgress === 30) nextStatus = `Customs cleared & packed. Truck dispatched onto Highway Express corridor.`;
        if (nextProgress === 60) nextStatus = `Traversing regional toll checkpoints. GPS telemetry active.`;
        if (nextProgress === 85) nextStatus = `Last-mile hub entry. Off-loading standard shock stock.`;

        return {
          isRunning: true,
          progress: nextProgress,
          arrivalSec: Math.max(0, prev.arrivalSec - 1),
          status: nextStatus
        };
      });
    }, 800);
  };

  const filteredDistributors = DISTRIBUTORS.filter(d => 
    d.city.toLowerCase().includes(searchCity.toLowerCase()) || 
    d.state.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <section className="space-y-12" id="manufacturing-network-section">
      
      {/* Visual Title Header block */}
      <div className="border-b border-slate-100 pb-6 text-center md:text-left">
        <span className="text-xs font-bold text-amber-500 uppercase tracking-widest font-mono">Durable Manufacturing Scale</span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Precision Factory &amp; National Delivery Channels
        </h2>
        <p className="text-slate-500 text-sm mt-1 max-w-xl md:mx-0 mx-auto">
          We operate dual micro-honing centers and high-tension wire-forming lines supplying premium suspension parts to over 300 retailers globally.
        </p>
      </div>

      {/* Grid: 4 Process Steps Layout */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 font-mono tracking-widest uppercase flex items-center gap-2">
          <Factory className="w-4 h-4 text-amber-500" /> State-of-the-art Production Steps
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MANUFACTURING_STEPS.map((step) => (
            <div 
              key={step.id}
              className="bg-white border border-slate-100 rounded-2xl p-5 hover:border-amber-300 transition-all shadow-xs relative overflow-hidden group"
            >
              {/* Micro decoration element */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 rounded-bl-full flex items-center justify-center font-mono font-black text-slate-200 group-hover:text-amber-100 group-hover:bg-amber-50 transition-all">
                0{step.id}
              </div>

              <div className="space-y-3 relative">
                {/* Numeric badge */}
                <span className="p-1.5 px-3 rounded-lg text-xs font-mono font-bold bg-slate-900 text-white inline-block shadow-sm">
                  {step.stat}
                </span>
                
                <div className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">{step.statLabel}</div>
                
                <h4 className="font-extrabold text-slate-900 text-xs text-amber-600 group-hover:text-amber-500 transition-all leading-tight pr-5">
                  {step.title}
                </h4>
                
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Geospatial Distribution Locator Dashboard Segment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
        
        {/* Left Column (Spans 5) - National Hub Selection & Dispatch simulator */}
        <div className="lg:col-span-5 bg-white border border-slate-100 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 font-mono tracking-widest uppercase flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-amber-500" /> Regional Delivery Hubs
            </h3>
            
            {/* Short Search element */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search delivery points..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg text-xs pl-8 pr-3 py-1.5 text-slate-700 outline-none focus:ring-1 focus:ring-slate-950"
              />
            </div>

            {/* List of Distributors */}
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {filteredDistributors.map((hub) => (
                <button
                  key={hub.id}
                  onClick={() => {
                    setSelectedHub(hub);
                    // Cancel active simulation if switching hubs
                    setRouteSimulation({ isRunning: false, progress: 0, arrivalSec: 0, status: 'Ready' });
                  }}
                  className={`cursor-pointer w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                    selectedHub?.id === hub.id
                      ? 'bg-slate-950 border-slate-950 text-white shadow-md'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-100 text-slate-700'
                  }`}
                  id={`hub-selector-${hub.id}`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-xs">{hub.city}, {hub.state}</span>
                      <span className={`text-[8px] font-bold p-0.5 px-1.5 rounded-full ${
                        selectedHub?.id === hub.id 
                          ? 'bg-amber-400 text-slate-950' 
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {hub.type}
                      </span>
                    </div>
                    <p className={`text-[10px] line-clamp-1 truncate ${
                      selectedHub?.id === hub.id ? 'text-slate-450' : 'text-slate-500'
                    }`}>
                      {hub.address}
                    </p>
                  </div>
                  <span className="text-xs shrink-0 font-bold">→</span>
                </button>
              ))}
            </div>
          </div>

          {/* SPREAD/ROUTING SIMULATOR BOX */}
          {selectedHub && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">
                  SIMULATE NATIONAL WAREHOUSE DISPATCH
                </span>
                <span className="text-[10px] font-mono font-bold text-amber-500">
                  ROUTE: PUNE PLANT → {selectedHub.city.toUpperCase()}
                </span>
              </div>

              {!routeSimulation.isRunning && routeSimulation.progress !== 100 ? (
                <div className="space-y-2">
                  <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
                    Instantly simulate the real-time freight distribution and highway transport logistics from our high-output Pune automated plant to {selectedHub.city}.
                  </p>
                  <button
                    onClick={() => triggerDispatch(selectedHub.city)}
                    className="cursor-pointer w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
                    id="btn-simulate-transit"
                  >
                    <Truck className="w-3.5 h-3.5" /> Dispatch Simulated Truck Shipment
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Active progress tracker status text */}
                  <div className="flex justify-between text-[11px] font-mono font-semibold">
                    <span className="text-slate-600 truncate max-w-[210px]">{routeSimulation.status}</span>
                    <span className="text-amber-600 shrink-0">{routeSimulation.progress}% Completed</span>
                  </div>

                  {/* Visual progress bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-amber-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${routeSimulation.progress}%` }}
                    />
                  </div>

                  {routeSimulation.isRunning ? (
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                      <span className="flex items-center gap-1">
                        <RotateCw className="w-3 h-3 animate-spin text-amber-500" /> Packing &amp; Transit Active
                      </span>
                      <span>ETA Counter: {routeSimulation.arrivalSec}s ago</span>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center text-[10px] text-emerald-600 font-mono">
                      <span className="flex items-center gap-1 font-bold">
                        <CheckCircle className="w-3.5 h-3.5" /> Shipment Stock Loaded
                      </span>
                      <button
                        onClick={() => setRouteSimulation({ isRunning: false, progress: 0, arrivalSec: 0, status: 'Ready' })}
                        className="text-slate-400 hover:text-slate-600 underline font-semibold cursor-pointer"
                      >
                        Reset Simulator
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column (Spans 7) - Graphic Representation map and Selected Hub Card */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 text-white flex flex-col justify-between" style={{ minHeight: '440px' }}>
          
          {/* Spatial Hub Map representation */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] text-sky-400 font-mono tracking-widest font-bold block uppercase">
                  Active Dispatch Terminal
                </span>
                <h4 className="text-sm font-extrabold tracking-tight">Geospatial Logistics Matrix</h4>
              </div>
              <span className="p-1 px-2.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300 border border-slate-700 font-bold uppercase">
                Satellite Node Map
              </span>
            </div>

            {/* Simulated Grid map layout with clean lines representing Indian subcontinent route nodes */}
            <div className="relative h-60 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center p-4">
              
              {/* Blueprint mesh background */}
              <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                backgroundSize: '16px 16px'
              }} />

              {/* Central Pune root anchor marker */}
              <div className="absolute left-[45%] top-[60%] flex flex-col items-center">
                <span className="w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-white animate-ping absolute" />
                <span className="w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-slate-950 relative z-10" />
                <span className="text-[9px] font-mono font-bold text-amber-400 bg-slate-950 px-1 py-0.5 rounded shadow-sm border border-slate-800 mt-1">
                  PUNE HQ (CENTRAL)
                </span>
              </div>

              {/* Delivery Node points representation mapping */}
              {[
                { city: 'Chennai', top: '78%', left: '55%', id: 'south-dist' },
                { city: 'New Delhi', top: '22%', left: '50%', id: 'north-dist' },
                { city: 'Ahmedabad', top: '48%', left: '32%', id: 'west-hub' },
                { city: 'Bengaluru', top: '73%', left: '48%', id: 'bengaluru-sales' }
              ].map((loc) => {
                const isCurrent = selectedHub?.id === loc.id;
                return (
                  <div 
                    key={loc.id}
                    className="absolute flex flex-col items-center transition-all cursor-pointer group"
                    style={{ top: loc.top, left: loc.left }}
                    onClick={() => {
                      const found = DISTRIBUTORS.find(d => d.id === loc.id);
                      if (found) setSelectedHub(found);
                    }}
                  >
                    {/* Simulated visual connection line from Pune parent */}
                    {isCurrent && (
                      <svg className="absolute w-40 h-40 overflow-visible pointer-events-none z-0 opacity-40 animate-pulse stroke-amber-400 fill-none" style={{
                        transform: 'translate(-50%, -50%)'
                      }}>
                        {/* Dynamic path from middle Pune */}
                      </svg>
                    )}

                    <span className={`w-3 h-3 rounded-full border-2 transition-all group-hover:scale-125 z-10 ${
                      isCurrent 
                        ? 'bg-sky-400 border-white shadow-lg scale-110' 
                        : 'bg-slate-700 border-slate-800'
                    }`} />
                    
                    <span className={`text-[8px] font-bold font-mono px-1 py-0.5 rounded shadow-sm border mt-1 select-none transition-all ${
                      isCurrent 
                        ? 'bg-sky-400 text-slate-950 border-white' 
                        : 'bg-slate-900 text-slate-400 border-slate-800 group-hover:text-slate-200'
                    }`}>
                      {loc.city.toUpperCase()}
                    </span>
                  </div>
                );
              })}

              <div className="absolute bottom-3 left-3 bg-slate-950/90 text-[9px] text-slate-400 p-2 rounded border border-slate-800 font-mono space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Central automated manufacturing plant
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> Selected Hub logistics terminal
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600" /> Offline warehouse nodes
                </div>
              </div>
            </div>
          </div>

          {/* Selected Distributor Hub details information panel */}
          {selectedHub ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mt-4 space-y-4">
              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[9px] text-amber-500 font-mono font-bold uppercase tracking-wider block">
                    Contact &amp; Allocation
                  </span>
                  <h5 className="text-sm font-bold text-slate-100">{selectedHub.city} Distribution Terminal</h5>
                </div>
                
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 p-1 px-2.5 rounded-md border border-emerald-500/20 font-bold uppercase">
                  STOCKING STABILIZED
                </span>
              </div>

              {/* Details table block */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2">
                  <div className="text-slate-400">
                    <strong className="text-slate-300 block font-sans">Full Address:</strong>
                    <span className="text-[11px]">{selectedHub.address}</span>
                  </div>
                  <div className="text-slate-400 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Call: {selectedHub.phone}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-slate-400">
                    <strong className="text-slate-300 block font-sans">Sub-Region Authority:</strong>
                    <span className="text-[11px]">{selectedHub.state}, {selectedHub.country} Hub</span>
                  </div>
                  <div className="text-slate-400 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Email: {selectedHub.email}</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Capacity Badge list */}
              <div className="pt-2 border-t border-slate-800 flex gap-2.5 text-[9px] font-mono font-bold uppercase text-slate-400">
                <span className="p-1 px-2 rounded bg-slate-950 border border-slate-800">
                  MONO SHOCKS ALLOCATION: 1,200 UNITS
                </span>
                <span className="p-1 px-2 rounded bg-slate-950 border border-slate-800">
                  DUAL TOURER ACC BALANCE: 800 UNITS
                </span>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-slate-500 font-sans border border-dashed border-slate-800 rounded-xl mt-4">
              Select or click on any logistics hub location point to analyze active storage metrics.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
