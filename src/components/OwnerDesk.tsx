/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from 'react';
import { QuoteRequest } from '../types';
import { PRODUCTS } from '../data';
import { Mail, Phone, MapPin, Trash2, CheckCircle2, ShieldAlert, Award, FileSpreadsheet, BellRing, UserCheck, RefreshCw } from 'lucide-react';

export default function OwnerDesk() {
  const [inquiries, setInquiries] = useState<QuoteRequest[]>([]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'reviewed' | 'approved'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [liveLog, setLiveLog] = useState<string[]>([]);

  // Prepopulate seed data if localStorage is empty, representing realistic wholesale customer queries
  const loadInquiriesFromDisk = () => {
    const fetched = localStorage.getItem('mdautotech_saved_quotes');
    if (fetched) {
      setInquiries(JSON.parse(fetched));
    } else {
      const seedData: QuoteRequest[] = [
        {
          id: 'MDI-481920',
          customerName: 'Karan Malhotra',
          companyName: 'Malhotra Bullet Workshop & Spares',
          email: 'karan@malhotracars.com',
          phone: '+91 98110 54109',
          vehicleModel: 'Royal Enfield Classic 350 / Himalayan',
          productInterest: 'MD-Pro Mono X1 Shock Absorber',
          quantity: 150,
          customSpringColor: 'Racing Red',
          dampingPreference: 'sport',
          message: 'Wholesale query for North India. Requesting customized firm damper tuning specs. Need dynamic outer laser packing text: "MALHOTRA-RE-SPECIAL".',
          status: 'pending',
          createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString() // 4 hrs ago
        },
        {
          id: 'MDI-309180',
          customerName: 'Ananthnarayan Swamy',
          companyName: 'Swamy Auto Spares Distributors',
          email: 'support@swamyauto.com',
          phone: '+91 44 2492 8812',
          vehicleModel: 'Hero Splendor Plus / Bajaj Pulsar 150',
          productInterest: 'MD-Dual Tourer S2 Shock Absorber',
          quantity: 400,
          customSpringColor: 'Classic Chrome Plated',
          dampingPreference: 'comfort',
          message: 'Direct dispatch of container items via Bhosari/Pune corridor. Custom outer trade box carton labeling required. Highly urgent for South India regional dealers.',
          status: 'reviewed',
          createdAt: new Date(Date.now() - 28 * 3600 * 1000).toISOString() // 1 day ago
        },
        {
          id: 'MDI-102948',
          customerName: 'K J Patil',
          companyName: 'Patil Mechanical Works Ltd',
          email: 'contact@patilworkshop.in',
          phone: '+91 70307 27770',
          vehicleModel: 'Suzuki Access 125 Commuter Fleet',
          productInterest: 'MD Premium Oil Seals & Bushings Pack',
          quantity: 1200,
          customSpringColor: 'Satin Black',
          dampingPreference: 'balanced',
          message: 'Testing sample batch with dual lip fluoroelastomer. If seal stiction remains under 10 bar, we will book 5000 kits. Please direct dial my helpline.',
          status: 'approved',
          createdAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString() // 3 days ago
        }
      ];
      localStorage.setItem('mdautotech_saved_quotes', JSON.stringify(seedData));
      setInquiries(seedData);
    }
  };

  useEffect(() => {
    loadInquiriesFromDisk();
    setLiveLog([
      `[SysEvent] Connection secure with MD AutoTech local db.`,
      `[SysEvent] Real-time email notification router initialized for contact@mdautotech.com`
    ]);
  }, []);

  // Update localStorage helper
  const saveToLocal = (newlist: QuoteRequest[]) => {
    localStorage.setItem('mdautotech_saved_quotes', JSON.stringify(newlist));
    setInquiries(newlist);
  };

  // Change Inquiry Status
  const handleUpdateStatus = (idxId: string, currentStatus: 'pending' | 'reviewed' | 'approved') => {
    const updated = inquiries.map((item) => {
      if (item.id === idxId) {
        let nextStatus: 'pending' | 'reviewed' | 'approved' = 'reviewed';
        if (currentStatus === 'pending') nextStatus = 'reviewed';
        if (currentStatus === 'reviewed') nextStatus = 'approved';
        if (currentStatus === 'approved') nextStatus = 'pending';
        
        setLiveLog((prev) => [
          `[StatusUpdate] Record ${idxId} updated from: "${currentStatus.toUpperCase()}" to: "${nextStatus.toUpperCase()}"`,
          ...prev
        ]);
        return { ...item, status: nextStatus };
      }
      return item;
    });
    saveToLocal(updated);
  };

  // Delete Inquiry
  const handleDeleteInquiry = (idxId: string) => {
    if (confirm(`Are you sure you want to permanently archive/delete Inquiry ${idxId}?`)) {
      const cleared = inquiries.filter((item) => item.id !== idxId);
      saveToLocal(cleared);
      setLiveLog((prev) => [`[Alert] Inquiry record ${idxId} permanently deleted.`, ...prev]);
    }
  };

  // Simulate receiving a live inquiry trigger
  const triggerSimulationInquiry = () => {
    const randomProduct = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)].name;
    const randomQuantities = [80, 150, 250, 500, 1000, 2000][Math.floor(Math.random() * 6)];
    const randomSurnames = ['Patel', 'Mahajan', 'Deshmukh', 'Chawla', 'Krishnan', 'Pillai', 'Rao'];
    const randomWorkshop = ['Premium Auto Spares Guild', 'Sahyadri Automotive Repairs', 'Guru Nanak Wheel Works', 'Apex Mechanicals Shop'];
    const randomCity = ['Pimpri', 'Nasik', 'Vashi', 'Coimbatore', 'Karol Bagh New Delhi'];
    const selectedSurname = randomSurnames[Math.floor(Math.random() * randomSurnames.length)];
    const selectedWorkshop = randomWorkshop[Math.floor(Math.random() * randomWorkshop.length)] + ` (${randomCity[Math.floor(Math.random() * randomCity.length)]})`;

    const fakeId = 'MDI-' + Math.floor(100000 + Math.random() * 900000);
    const fakeSpec: QuoteRequest = {
      id: fakeId,
      customerName: `Mr. Rajesh ${selectedSurname}`,
      companyName: selectedWorkshop,
      email: `${selectedSurname.toLowerCase()}@${selectedWorkshop.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`.substring(0, 36),
      phone: '+91 9' + Math.floor(820000000 + Math.random() * 99999999),
      vehicleModel: 'Hero Splendor / Bajaj Platina 110cc',
      productInterest: randomProduct,
      quantity: randomProduct.includes('Seal') ? randomQuantities * 5 : randomQuantities,
      customSpringColor: ['Racing Red', 'Classic Chrome Plated', 'Satin Black'][Math.floor(Math.random() * 3)],
      dampingPreference: ['comfort', 'balanced', 'sport'][Math.floor(Math.random() * 3)] as any,
      message: 'Urgent bulk stock confirmation needed. Best rates requested.',
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    const nextInquiries = [fakeSpec, ...inquiries];
    saveToLocal(nextInquiries);

    // Dynamic beep/alert sound
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime); // A4
      osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch (_) {}

    setLiveLog((prev) => [
      `🔔 [LiveNotification] New live spec sheet received! ID: ${fakeId} from ${fakeSpec.customerName} for ${fakeSpec.quantity} pcs!`,
      ...prev
    ]);
  };

  // Filter list
  const filtered = inquiries.filter((item) => {
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesSearch = item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.productInterest.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-10 animate-in fade-in duration-200" id="owner-desk-wrapper">
      
      {/* Editorial Corporate Header segment */}
      <div className="border-b border-zinc-200 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="text-xs font-bold text-[#E31E24] uppercase tracking-widest font-mono block">
            ✦ Owner Management Interface (Internal CRM)
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-zinc-950 tracking-tight leading-none mt-1">
            Inquiries &amp; <span className="font-serif italic text-zinc-805">Incoming Leads</span>
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm mt-1.5 max-w-xl">
            This dashboard displays all wholesale specification inquiries stored locally inside the application runtime. New entries will trigger audio/visual alerts instantly.
          </p>
        </div>

        {/* Audit certification seal block */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={triggerSimulationInquiry}
            className="cursor-pointer bg-[#E31E24] hover:bg-red-700 text-white px-4 py-2.5 text-[10.5px] uppercase font-mono tracking-widest bold transition-all flex items-center justify-center gap-1.5 font-bold"
          >
            <BellRing className="w-3.5 h-3.5 animate-pulse" /> Simulate Live Inquiry
          </button>
          
          <button
            onClick={() => {
              if (confirm('Clear entire saved inquiries list and reset defaults?')) {
                localStorage.removeItem('mdautotech_saved_quotes');
                loadInquiriesFromDisk();
                setLiveLog((prev) => [`[SysEvent] Databases successfully purged. Reloaded seed inquiries.`, ...prev]);
              }
            }}
            className="cursor-pointer bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 px-3 py-2.5 text-[10px] uppercase font-mono tracking-widest transition-all"
          >
            Reset CRM Data
          </button>
        </div>
      </div>

      {/* CRM Statistics Overview Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-zinc-200 p-4.5 space-y-1 shadow-xs">
          <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-zinc-400 block pb-1 border-b border-zinc-100">Total leads</span>
          <span className="text-3xl font-black text-zinc-900 font-sans block">{inquiries.length}</span>
        </div>
        <div className="bg-white border border-zinc-200 p-4.5 space-y-1 shadow-xs">
          <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-zinc-400 block pb-1 border-b border-zinc-100">Pending spec reviews</span>
          <span className="text-3xl font-black text-amber-600 font-sans block">
            {inquiries.filter((item) => item.status === 'pending').length}
          </span>
        </div>
        <div className="bg-white border border-zinc-200 p-4.5 space-y-1 shadow-xs">
          <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-zinc-400 block pb-1 border-b border-zinc-100">Approved deal packs</span>
          <span className="text-3xl font-black text-green-600 font-sans block">
            {inquiries.filter((item) => item.status === 'approved').length}
          </span>
        </div>
        <div className="bg-zinc-950 border border-zinc-800 p-4.5 space-y-1 text-white">
          <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-zinc-500 block pb-1 border-b border-zinc-900">Immediate Action Rate</span>
          <span className="text-3xl font-black text-[#E31E24] font-sans block">100%</span>
        </div>
      </div>

      {/* Primary search filter panel */}
      <div className="bg-zinc-50 p-4 border border-zinc-200 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:flex-grow">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search CRM logs by Spec ID, Dealer Name, Component or Company..."
            className="w-full bg-white border border-zinc-200 px-4 py-2 text-xs focus:outline-none focus:border-[#E31E24] placeholder-zinc-400 font-semibold"
          />
        </div>

        {/* Tab-controllers */}
        <div className="flex gap-1 shrink-0 bg-zinc-200/50 p-1 rounded">
          {[
            { id: 'all', label: 'All Leads' },
            { id: 'pending', label: 'Unread / Pending' },
            { id: 'reviewed', label: 'Under Review' },
            { id: 'approved', label: 'Followed Up' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id as any)}
              className={`cursor-pointer px-3 py-1.5 text-[9.5px] uppercase font-extrabold tracking-wider transition-colors ${
                filterStatus === tab.id
                  ? 'bg-zinc-950 text-white'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* CRM Leads Table List */}
        <div className="lg:col-span-8 space-y-4">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <div 
                key={item.id}
                className={`bg-white border p-5 sm:p-6 shadow-xs relative transition-all duration-200 hover:shadow-md ${
                  item.status === 'pending' ? 'border-l-4 border-l-[#E31E24] border-zinc-250' : 'border-zinc-200'
                }`}
                id={`crm-lead-${item.id}`}
              >
                {/* Header detail */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-zinc-100 pb-3 mb-4.5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="p-0.5 px-2 bg-zinc-150 text-zinc-900 font-mono text-[9px] font-bold">
                        {item.id}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        Received: {new Date(item.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-sm text-zinc-900">
                      {item.companyName}
                    </h3>
                  </div>

                  {/* Status Indicator pill */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateStatus(item.id, item.status as any)}
                      className={`cursor-pointer uppercase font-mono font-black text-[9px] px-2.5 py-1 border transition-all ${
                        item.status === 'pending'
                          ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100/50'
                          : item.status === 'reviewed'
                            ? 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100/50'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100/50'
                      }`}
                    >
                      ● {item.status === 'pending' ? 'PENDING REVIEW' : item.status === 'reviewed' ? 'REVIEWED' : 'FOLLOWED UP'}
                    </button>
                    <button
                      onClick={() => handleDeleteInquiry(item.id)}
                      className="cursor-pointer text-zinc-400 hover:text-red-650 p-1.5 transition-colors"
                      title="Archive Lead"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Grid details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 text-xs text-zinc-650">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono text-zinc-400 font-bold block uppercase">Contact Person</span>
                    <strong className="text-zinc-900 block font-bold">{item.customerName}</strong>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono text-zinc-400 font-bold block uppercase">Phone / WhatsApp</span>
                    <a href={`tel:${item.phone}`} className="text-zinc-900 font-mono font-bold block underline hover:text-[#E31E24]">
                      {item.phone}
                    </a>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono text-zinc-400 font-bold block uppercase">Client Email</span>
                    <a href={`mailto:${item.email}`} className="text-zinc-900 font-mono block underline hover:text-[#E31E24]">
                      {item.email}
                    </a>
                  </div>
                  <div className="space-y-0.5 col-span-2">
                    <span className="text-[9px] font-mono text-zinc-400 font-bold block uppercase">Product Spec Configured</span>
                    <strong className="text-[#E31E24] text-[12px] block font-black leading-tight">
                      {item.productInterest}
                    </strong>
                    <span className="text-[9.5px] block text-zinc-500 font-mono mt-0.5 font-bold uppercase">
                      Spring: {item.customSpringColor} // Valving: {item.dampingPreference.toUpperCase()} rate
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono text-zinc-400 font-bold block uppercase">Wholesale Qty</span>
                    <strong className="text-zinc-900 text-sm font-black font-mono block">
                      {item.quantity} units
                    </strong>
                  </div>
                  {item.vehicleModel && (
                    <div className="space-y-0.5 col-span-2">
                      <span className="text-[9px] font-mono text-zinc-400 font-bold block uppercase">Target Vehicle Fitment</span>
                      <span className="text-zinc-800 font-bold block">{item.vehicleModel}</span>
                    </div>
                  )}
                </div>

                {item.message && (
                  <div className="mt-4 bg-zinc-50 border border-zinc-150 p-3 text-[11px] leading-relaxed text-zinc-600 font-sans italic rounded">
                    <strong>Wholesale Packaging/Notes:</strong> &ldquo;{item.message}&rdquo;
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-16 text-center border-2 border-dashed border-zinc-200 bg-white">
              <UserCheck className="w-10 h-10 text-zinc-350 mx-auto stroke-1 mb-2" />
              <h3 className="text-xs font-bold text-zinc-805 uppercase tracking-wider">No Active Leads Match Search</h3>
              <p className="text-[11px] text-zinc-500 mt-0.5">Either purge filters or wait for clients to submit specifications.</p>
            </div>
          )}
        </div>

        {/* CRM Terminal Status Log feed */}
        <div className="lg:col-span-4 bg-white border border-zinc-200 shadow-xs divide-y divide-zinc-200">
          
          {/* Header segment */}
          <div className="p-4 bg-zinc-950 text-white flex justify-between items-center">
            <span className="text-[9px] font-mono tracking-widest uppercase font-bold text-[#E31E24]">
              CRM Pipeline Activity Feed
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#E31E24] animate-pulse" />
          </div>

          {/* Log blocks */}
          <div className="p-4 space-y-3 max-h-[340px] overflow-y-auto font-mono text-[10px]">
            {liveLog.map((log, idx) => (
              <div key={idx} className="text-zinc-500 hover:text-zinc-900 border-b border-zinc-95/40 pb-1 leading-normal">
                {log}
              </div>
            ))}
          </div>

          {/* Owner Checklist instructions card */}
          <div className="p-4 bg-zinc-50 space-y-3.5 text-xs text-zinc-650">
            <h4 className="font-mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-250 pb-1">
              CRM Integration Guidelines
            </h4>
            <div className="space-y-2.5">
              <div className="flex gap-2 items-start">
                <span className="text-[#E31E24] font-bold mt-0.5">●</span>
                <span>Wholesaler specifications are saved directly inside client&apos;s custom browser Cache and rendered here.</span>
              </div>
              <div className="flex gap-2 items-start">
                <span className="text-zinc-400 font-bold mt-0.5">●</span>
                <span>Clicking <strong>&ldquo;Simulate Live Inquiry&rdquo;</strong> generates high-fidelity random wholesale requests.</span>
              </div>
              <div className="flex gap-2 items-start">
                <span className="text-zinc-400 font-bold mt-0.5">●</span>
                <span>B2B emails are preconfigured to dispatch automatically using native Mailto.</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
