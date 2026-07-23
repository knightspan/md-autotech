/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../data';
import { QuoteRequest } from '../types';
import { FileText, Smartphone, Mail, FileCheck, Check, Sparkles, Send, BellRing, Settings2, ShieldAlert } from 'lucide-react';

interface QuoteBuilderProps {
  initialProductName?: string;
  onClearInitialProduct?: () => void;
}

export default function QuoteBuilder({ initialProductName = '', onClearInitialProduct }: QuoteBuilderProps) {
  // Configured Specs Form State
  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(initialProductName || PRODUCTS[0].name);
  const [quantity, setQuantity] = useState(50); // Wholesaler minimum default
  const [customSpringColor, setCustomSpringColor] = useState('Racing Red');
  const [dampingPreference, setDampingPreference] = useState<'comfort' | 'balanced' | 'sport' | 'race'>('balanced');
  const [message, setMessage] = useState('');
  const [laserMarking, setLaserMarking] = useState('');

  // App-level simulated notifications / state confirmation
  const [lastSubmittedSpec, setLastSubmittedSpec] = useState<QuoteRequest | null>(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Handle immediate field prepopulation when selecting component from catalog
  useEffect(() => {
    if (initialProductName) {
      setSelectedProduct(initialProductName);
    }
  }, [initialProductName]);

  // Handle Spec Sheet submissions
  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !email || !phone) {
      setToastMessage('🚨 Please fill out all required contact fields.');
      setIsAlertVisible(true);
      setTimeout(() => setIsAlertVisible(false), 4000);
      return;
    }

    const uniqueId = 'MDI-' + Math.floor(100000 + Math.random() * 900000);
    const newSpec: QuoteRequest = {
      id: uniqueId,
      customerName,
      companyName: companyName || 'Independent Workshop',
      email,
      phone,
      vehicleModel: vehicleModel || 'Generic Premium Motorcycle',
      productInterest: selectedProduct,
      quantity,
      customSpringColor,
      dampingPreference,
      message: message + (laserMarking ? ` [Custom Shaft Laser Stamp: "${laserMarking}"]` : ''),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Store in localStorage for the "Owner Dashboard"
    const fetchedQuotes = localStorage.getItem('mdautotech_saved_quotes');
    const existingQuotes = fetchedQuotes ? JSON.parse(fetchedQuotes) : [];
    const updatedQuotes = [newSpec, ...existingQuotes];
    localStorage.setItem('mdautotech_saved_quotes', JSON.stringify(updatedQuotes));

    // Update state to show the success blueprint ticket
    setLastSubmittedSpec(newSpec);

    // Audio/visual notification cue for excellent UX
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.12); // A5
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch (e) {
      // Audio context blocked by browser gesture policies, ignore gracefully
    }

    // Trigger UI live notification alert for owner
    setToastMessage(`🔔 SUCCESS! Spec sheet ${uniqueId} saved. Stored in owner's portal and email notification logged!`);
    setIsAlertVisible(true);
    setTimeout(() => setIsAlertVisible(false), 6000);

    // Reset initial product reference if any
    if (onClearInitialProduct) {
      onClearInitialProduct();
    }
  };

  // Launch direct channels
  const sendEmailChannel = (spec: QuoteRequest) => {
    const subjectLine = `Wholesale Inquiry - Reference ${spec.id} (${spec.companyName})`;
    const bodyContent = `MD AutoTech Sales Team,

I have compiled our digital specification card via your portal:

INQUIRY SPECIFICATION CARD
---------------------------------------
SPECIFICATION REFERENCE: ${spec.id}
PRODUCT MODEL: ${spec.productInterest}
VOLUME QUANTITY: ${spec.quantity} Units
PROGRESSIVE SPRING COLOR: ${spec.customSpringColor}
DAMPING CALIBRATION: ${spec.dampingPreference.toUpperCase()}
FITMENT TARGET MODEL: ${spec.vehicleModel}
CONTACT PERSON: ${spec.customerName}
COMPANY/WORKSHOP: ${spec.companyName}
TELEPHONE CELL: ${spec.phone}
EMAIL ADDRESS: ${spec.email}

ADDITIONAL COMMENTS:
${spec.message || "None provided"}

---------------------------------------
Please compile our logistics dispatch feasibility timeline and verify raw material batch readiness.

Kind Regards,
${spec.customerName}`;

    const emailMailto = `mailto:contact@mdautotech.com?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(bodyContent)}`;
    window.open(emailMailto, '_blank');
  };

  const sendWhatsAppChannel = (spec: QuoteRequest) => {
    const textMsg = `Hello MD AutoTech! This is ${spec.customerName} from ${spec.companyName}. We have compiled wholesale inquiry Spec ${spec.id} for "${spec.productInterest}" (Quantity: ${spec.quantity} units, Color: ${spec.customSpringColor}). Looking forward to your stock readiness delivery notice.`;
    const waUrl = `https://wa.me/917030727770?text=${encodeURIComponent(textMsg)}`;
    window.open(waUrl, '_blank');
  };

  const activeProductObj = PRODUCTS.find((p) => p.name === selectedProduct) || PRODUCTS[0];

  return (
    <div className="space-y-12 animate-in fade-in duration-250" id="quote-builder-wrapper">

      {/* Toast Alert Box */}
      {isAlertVisible && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-950 text-white border border-red-500 shadow-2xl p-4 flex items-center gap-3 animate-bounce max-w-md">
          <BellRing className="w-6 h-6 text-[#E31E24] animate-wiggle shrink-0" />
          <div className="text-xs">
            <span className="font-extrabold uppercase text-[#E31E24] tracking-wider block">Live Transmission Node</span>
            <p className="text-zinc-300 font-mono mt-0.5 font-bold">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Corporate Editorial Header */}
      <div className="border-b border-zinc-200 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="text-xs font-bold text-[#E31E24] uppercase tracking-widest font-mono block">
            ✦ B2B Direct Dealership Network
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-zinc-955 tracking-tight leading-none mt-1">
            Wholesale <span className="font-serif italic text-zinc-800">Inquiry Desk</span>
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm mt-1.5 max-w-xl">
            Configure custom batch volumes, paint finishes, mechanical stampings, and damping valving. We support mechanical workshops and certified spares wholesalers worldwide.
          </p>
        </div>
        <div className="bg-emerald-50 text-emerald-950 border border-emerald-200 p-3 flex items-center gap-2.5 font-sans">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse mt-0.5" />
          <div className="text-[10px] uppercase font-mono tracking-wider">
            <strong className="block text-emerald-900">Direct Factory Access</strong>
            <span className="text-zinc-500 font-normal">No Middlemen Margin Markup</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* LEFT COLUMN: ACTIVE B2B CONFIGURATION FORM */}
        <div className="lg:col-span-7 bg-white border border-zinc-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-zinc-150 pb-4">
            <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
              STEP 1 OF 2
            </span>
            <h3 className="text-lg font-bold text-zinc-900 mt-0.5">
              Wholesale Part Specification Configuration
            </h3>
          </div>

          <form onSubmit={handleSubmitInquiry} className="space-y-6 font-sans">

            {/* Grid selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Product Interest selection */}
              <div className="space-y-1.5 col-span-2">
                <label className="text-[10px] font-mono tracking-wider font-extrabold text-zinc-500 uppercase block">
                  Select Core Component
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 p-3 text-xs font-bold text-zinc-900 focus:outline-none focus:border-[#E31E24]"
                >
                  {PRODUCTS.map((prod) => (
                    <option key={prod.id} value={prod.name}>
                      {prod.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Wholesale Target Volume */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono tracking-wider font-extrabold text-zinc-500 uppercase block">
                  Required Volume Batch (Units)
                </label>
                <input
                  type="number"
                  min="20"
                  max="10000"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 20)}
                  className="w-full bg-zinc-50 border border-zinc-200 p-2.5 text-xs font-mono font-black text-zinc-900 focus:outline-none focus:border-[#E31E24]"
                />
                <span className="text-[9.5px] text-zinc-400 block mt-0.5">
                  Min wholesale: 20 units per shipment box.
                </span>
              </div>

              {/* Spring Colors selection */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono tracking-wider font-extrabold text-zinc-500 uppercase block">
                  Spring Protective Color
                </label>
                <select
                  value={customSpringColor}
                  onChange={(e) => setCustomSpringColor(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 p-2.5 text-xs font-bold text-zinc-900 focus:outline-none focus:border-[#E31E24]"
                >
                  <option value="Classic Chrome Plated">Metallic Chrome</option>
                  <option value="Racing Red">MD Gloss Red</option>
                  <option value="Satin Black">Industrial Matte Black</option>
                  <option value="Titanium Gold PVD">Titanium Gold Slider Coat</option>
                  <option value="Hyper Yellow">Performance Neon Yellow</option>
                </select>
              </div>

              {/* Damping Calibration selection */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono tracking-wider font-extrabold text-zinc-500 uppercase block">
                  Damping Fluid Valving Tuning
                </label>
                <select
                  value={dampingPreference}
                  onChange={(e) => setDampingPreference(e.target.value as any)}
                  className="w-full bg-zinc-50 border border-zinc-200 p-2.5 text-xs font-bold text-zinc-900 focus:outline-none focus:border-[#E31E24]"
                >
                  <option value="comfort">Polished Velvet Comfort (Softer Ride)</option>
                  <option value="balanced">Dual-Balanced Commute (Standard)</option>
                  <option value="sport">Progressive Track Touring (Firmer Stability)</option>
                  <option value="race">Extreme Rigid Yaw Control (Ultra-Firm Track)</option>
                </select>
              </div>

              {/* Laser Engraving Shaft customization */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono tracking-wider font-extrabold text-zinc-500 uppercase block">
                  Laser Shaft Branding (Optional)
                </label>
                <input
                  type="text"
                  maxLength={25}
                  value={laserMarking}
                  onChange={(e) => setLaserMarking(e.target.value)}
                  placeholder="e.g. 'PATIL-PARTS-MUMBAI'"
                  className="w-full bg-zinc-50 border border-zinc-200 p-2.5 text-xs font-semibold placeholder-zinc-400 focus:outline-none focus:border-[#E31E24]"
                />
              </div>

              {/* Brand Fitment Reference */}
              <div className="space-y-1.5 col-span-2">
                <label className="text-[10px] font-mono tracking-wider font-extrabold text-zinc-500 uppercase block">
                  Target Vehicle Model / Fitment Specifications
                </label>
                <input
                  type="text"
                  required
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  placeholder="e.g. Hero Splendor Plus / Royal Enfield Bullet 350 / Commercial Fleet"
                  className="w-full bg-zinc-50 border border-zinc-200 p-3 text-xs font-semibold placeholder-zinc-400 focus:outline-none focus:border-[#E31E24]"
                />
              </div>

            </div>

            {/* Step 2 Header & Form fields */}
            <div className="border-t border-zinc-150 pt-6 space-y-4">
              <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                STEP 2 OF 2: B2B CONTACT AND DEPT DETAILS
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-wider font-extrabold text-zinc-500 uppercase block">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rajesh Patel"
                    className="w-full bg-zinc-50 border border-zinc-200 p-2.5 text-xs font-bold placeholder-zinc-400 focus:outline-none focus:border-[#E31E24]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-wider font-extrabold text-zinc-500 uppercase block">
                    Store / Workshop Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Patel Engineering &amp; Spares"
                    className="w-full bg-zinc-50 border border-zinc-200 p-2.5 text-xs font-bold placeholder-zinc-400 focus:outline-none focus:border-[#E31E24]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-wider font-extrabold text-zinc-500 uppercase block">
                    Contact Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rajesh@patelmotorparts.com"
                    className="w-full bg-zinc-50 border border-zinc-200 p-2.5 text-xs font-semibold placeholder-zinc-400 focus:outline-none focus:border-[#E31E24]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-wider font-extrabold text-zinc-500 uppercase block">
                    WhatsApp Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98230 11223"
                    className="w-full bg-zinc-50 border border-zinc-200 p-2.5 text-xs font-semibold placeholder-zinc-400 focus:outline-none focus:border-[#E31E24]"
                  />
                </div>
              </div>

              {/* Special instruction text content dropdown */}
              <div className="space-y-1.5 pt-2">
                <label className="text-[10px] font-mono tracking-wider font-extrabold text-zinc-500 uppercase block">
                  Wholesale Packaging or Logistic Instructions (Optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={2}
                  placeholder="Describe your specific packaging request, customized spring rate weights, or custom shipping dispatch corridors..."
                  className="w-full bg-zinc-50 border border-zinc-200 p-3 text-xs placeholder-zinc-400 focus:outline-none focus:border-[#E31E24]"
                />
              </div>

            </div>

            {/* Trigger Button bar */}
            <div className="pt-2">
              <button
                type="submit"
                className="cursor-pointer w-full bg-[#E31E24] hover:bg-red-700 text-white font-extrabold py-3.5 px-4 text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow"
              >
                <FileCheck className="w-4.5 h-4.5 stroke-[2.5]" /> Store Spec Sheet &amp; Transmit
              </button>
            </div>

          </form>
        </div>


        {/* RIGHT COLUMN: RECOGNITION VOUCHER SHEET (blueprint style) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-zinc-950 p-1 border border-zinc-800">
            <div className="bg-[#1A1C1E] border border-zinc-850 p-6 text-white text-left space-y-6 relative overflow-hidden font-mono text-[11px] selection:bg-red-650 selection:text-white leading-relaxed">

              {/* Overlay abstract lines */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-650/5 rounded-full blur-2xl" />

              {/* Header section branding */}
              <div className="border-b border-zinc-800 pb-4 flex justify-between items-start">
                <div>
                  <div className="text-[#E31E24] text-[13px] font-black italic tracking-tighter">MD AUTOTECH B2B</div>
                  <div className="text-[7.5px] uppercase text-zinc-400 tracking-[0.2em] font-bold">Inquiry Specification Certificate</div>
                </div>
                <div className="text-right">
                  <div className="text-[8px] text-zinc-500 font-bold">STATUSCODE</div>
                  <div className="text-[10px] text-zinc-300 font-black tracking-tighter">
                    {lastSubmittedSpec ? 'ACTIVE_TRANS_OK' : 'PENDING_CONFIG'}
                  </div>
                </div>
              </div>

              {/* Dynamic body elements based on configured choices */}
              <div className="space-y-4">
                <span className="text-[8px] font-bold text-[#E31E24] tracking-widest block uppercase border-b border-zinc-900 pb-1">
                  SPECIFICATION DATA MATRIX
                </span>

                <table className="w-full text-[10px] text-zinc-350">
                  <tbody>
                    <tr className="border-b border-zinc-900/40">
                      <td className="py-1 text-zinc-500">COMPONENT OF INTEREST:</td>
                      <td className="py-1 text-right font-black text-white">{selectedProduct.toUpperCase()}</td>
                    </tr>
                    <tr className="border-b border-zinc-900/40">
                      <td className="py-1 text-zinc-500">BATCH QUANTITY:</td>
                      <td className="py-1 text-right font-black text-[#E31E24]">{quantity} UNITS</td>
                    </tr>
                    <tr className="border-b border-zinc-900/40">
                      <td className="py-1 text-zinc-500">COIL EXTERIOR COLOR:</td>
                      <td className="py-1 text-right font-black text-white">{customSpringColor.toUpperCase()}</td>
                    </tr>
                    <tr className="border-b border-zinc-900/40">
                      <td className="py-1 text-zinc-505">PRESSURE CALIBRATION:</td>
                      <td className="py-1 text-right font-black text-white">{dampingPreference.toUpperCase()} RATE</td>
                    </tr>
                    <tr className="border-b border-zinc-900/40">
                      <td className="py-1 text-zinc-500">FITMENT VEHICLE:</td>
                      <td className="py-1 text-right font-black text-zinc-300">
                        {vehicleModel ? vehicleModel.toUpperCase() : 'NOT SPECIFIED'}
                      </td>
                    </tr>
                    <tr className="border-b border-zinc-900/40">
                      <td className="py-1 text-zinc-500">LASER MARKING BLOCK:</td>
                      <td className="py-1 text-right font-black text-[#00A8E8]">
                        {laserMarking ? `"${laserMarking.toUpperCase()}"` : 'NO STAMP'}
                      </td>
                    </tr>
                    <tr className="border-b border-zinc-900/40">
                      <td className="py-1 text-zinc-505">COMPLIANCE CODE:</td>
                      <td className="py-1 text-right font-black text-zinc-400">IATF-16949-QC // ISO-9001</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Customer summary block */}
              <div className="space-y-4 pt-2 border-t border-zinc-800">
                <span className="text-[8px] font-bold text-zinc-505 tracking-widest block uppercase border-b border-zinc-900 pb-1">
                  B2B CLIENT SIGN-OFF
                </span>

                <div className="space-y-1 bg-zinc-900 p-3 border border-zinc-850 text-[10px]">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">CONTACT PERSON:</span>
                    <span className="font-bold text-zinc-200">{customerName || 'Pending entry...'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">STORE/WORKSHOP:</span>
                    <span className="font-bold text-zinc-200">{companyName || 'Pending entry...'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">TELEPHONE PHONE:</span>
                    <span className="font-mono text-zinc-300">{phone || 'Pending entry...'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">CLIENT EMAIL:</span>
                    <span className="font-mono text-zinc-300">{email || 'Pending entry...'}</span>
                  </div>
                </div>

                {/* Secure certificate Stamp */}
                <div className="p-3 border border-red-950 bg-red-950/20 text-red-500 text-[10px] flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-red-400 font-extrabold">Notice: Strictly Confidential</strong>
                    <span className="font-mono text-[9px] text-zinc-400 block mt-0.5 font-bold">
                      Pricing is kept completely hidden from this public site and will be transmitted directly via encrypted PDF invoice to the verified email above after engineering check-off.
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions strip for direct transmission */}
              {lastSubmittedSpec ? (
                <div className="space-y-3 pt-3 border-t border-[#E31E24]">
                  <div className="bg-emerald-950/30 text-emerald-400 border border-emerald-900 p-3 text-center space-y-1">
                    <strong className="block text-xs uppercase text-white font-extrabold">✓ SPECIFICATION TRANSMITTED SUCCESSFULLY</strong>
                    <span className="text-[9.5px] text-zinc-400 block">Spec ID: <strong className="text-white font-mono">{lastSubmittedSpec.id}</strong>. Transmitted to Owner portal storage.</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center pt-1 font-sans">
                    <button
                      onClick={() => sendWhatsAppChannel(lastSubmittedSpec)}
                      className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase text-[9.5px] py-2.5 flex items-center justify-center gap-1 transition-all"
                    >
                      <Smartphone className="w-3.5 h-3.5 fill-white stroke-none" /> Send WhatsApp
                    </button>
                    <button
                      onClick={() => sendEmailChannel(lastSubmittedSpec)}
                      className="cursor-pointer bg-[#00A8E8] hover:bg-[#0091c7] text-white font-black uppercase text-[9.5px] py-2.5 flex items-center justify-center gap-1 transition-all"
                    >
                      <Mail className="w-3.5 h-3.5" /> Send direct email
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-zinc-550 border-t border-zinc-900 border-dashed">
                  <Settings2 className="w-6 h-6 mx-auto animate-spin stroke-1 mb-2 text-[#E31E24]" />
                  <span>Configure options on the left to activate your customized B2B specifications warrant ticket.</span>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
