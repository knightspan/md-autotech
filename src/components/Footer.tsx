/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from 'react';
import { Award, CheckCircle, ShieldCheck, Phone, Mail, MapPin, MessageSquare, Download } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const whatsappDirectUrl = `https://wa.me/917030727770?text=${encodeURIComponent(
    'Hello MD AutoTech! I am interested in your products and would like to get in touch.'
  )}`;

  return (
    <footer className="theme-page theme-muted font-sans border-t theme-border w-full" id="app-footer">
      <div className="w-full max-w-[1410px] mx-auto px-5 sm:px-7 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand Information */}
        <div className="space-y-4">
          <div className="flex items-start">
            {/*
              >>> PUT COMPANY LOGO HERE (footer)
              >>> Same file as header: public/logo-md-autotech.png
              >>> Or: public/images/brand/logo-md-autotech.png → src="/images/brand/logo-md-autotech.png"
            */}
            <img
              src="/logo-md-autotech.png"
              alt="MD Autotech"
              className="h-16 w-auto object-contain dark-logo"
            />
          </div>
          <p className="text-xs leading-relaxed text-zinc-400">
            India&apos;s leading high-end wholesale shock absorber, customized front fork pipe, and heavy-duty oil sealing components manufacturer. Formulating record-breaking product comfort and durability since 1979.
          </p>
          <div className="flex items-center gap-2 pt-2 text-zinc-200">
            <Award className="w-4 h-4 text-[#FFCC00]" />
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-zinc-300">
              ISO 9001:2015 &amp; IATF 16949 CERTIFIED
            </span>
          </div>
        </div>

        {/* Directory Links */}
        <div className="space-y-4">
          <h4 className="text-[11px] uppercase font-extrabold text-[#FFCC00] tracking-widest font-mono">
            Navigation Menu
          </h4>
          <ul className="space-y-2 text-xs text-zinc-300 font-bold">
            <li>
              <button onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="cursor-pointer hover:text-[#FFCC00] hover:underline transition-all tracking-wide">
                HOME
              </button>
            </li>
            <li>
              <button onClick={() => { setActiveTab('products'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="cursor-pointer hover:text-[#FFCC00] hover:underline transition-all tracking-wide">
                PRODUCTS CATALOG
              </button>
            </li>
            <li>
              <button onClick={() => { setActiveTab('quality'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="cursor-pointer hover:text-[#FFCC00] hover:underline transition-all tracking-wide">
                QUALITY ASSURANCE
              </button>
            </li>
            <li>
              <button onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="cursor-pointer hover:text-[#FFCC00] hover:underline transition-all tracking-wide">
                ABOUT US
              </button>
            </li>
            <li>
              <button onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="cursor-pointer hover:text-[#FFCC00] hover:underline transition-all tracking-wide">
                CONTACT US
              </button>
            </li>
            <li>
              <button onClick={() => { setActiveTab('owner-desk'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="cursor-pointer text-zinc-500 hover:text-white transition-all tracking-wide">
                OWNER DESK CRM
              </button>
            </li>
          </ul>
        </div>

        {/* Plant Details */}
        <div className="space-y-4">
          <h4 className="text-[11px] uppercase font-extrabold text-[#FFCC00] tracking-widest font-mono">
            Industrial Facilities
          </h4>
          <div className="space-y-4 text-xs font-semibold">
            <div className="space-y-1">
              <strong className="text-zinc-200 uppercase font-black text-[10px] font-mono tracking-wider block flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FFCC00]" /> NASIK CORE PLANT (HQ)
              </strong>
              <span className="text-xs text-zinc-400 block pl-5">
                E 31, MIDC Satpur, Nasik - 422007, Maharashtra, India
              </span>
            </div>
            <div className="space-y-1">
              <strong className="text-zinc-200 uppercase font-black text-[10px] font-mono tracking-wider block flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FFCC00]" /> Regional Facility (Pune)
              </strong>
              <span className="text-xs text-zinc-400 block pl-5">
                Plot 42, MIDC Automotive Zone, Bhosari, Pune - 411026, MH, India
              </span>
            </div>
          </div>
        </div>

        {/* Distributor Contacts & WhatsApp */}
        <div className="space-y-4 text-xs font-medium">
          <h4 className="text-[11px] uppercase font-extrabold text-[#FFCC00] tracking-widest font-mono">
            Direct WhatsApp &amp; Hotlines
          </h4>
          <p className="leading-relaxed text-zinc-400">
            Reach out directly via phone or WhatsApp for quick wholesale price quotes and dealership queries.
          </p>

          <div className="space-y-2.5 pt-1">
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-black px-4 py-2 rounded-xs font-mono font-extrabold text-xs uppercase tracking-wider transition-transform hover:scale-102"
            >
              <MessageSquare className="w-4 h-4 fill-black stroke-none" /> Connect on WhatsApp
            </a>

            <div className="pt-2 space-y-1">
              <a
                href="tel:+917030727770"
                className="flex items-center gap-2 font-bold text-white hover:text-[#FFCC00] transition-colors text-xs font-mono"
              >
                <Phone className="w-3.5 h-3.5 text-[#FFCC00]" /> +91 70307 27770
              </a>
              <a
                href="mailto:contact@mdautotech.com"
                className="flex items-center gap-2 font-bold text-[#FFCC00] hover:text-amber-300 transition-colors text-xs font-mono"
              >
                <Mail className="w-3.5 h-3.5" /> contact@mdautotech.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Extreme Bottom Strip */}
      <div className="bg-[#0a0a0a] text-[10px] uppercase tracking-wider text-zinc-500 border-t border-zinc-900 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center md:justify-start gap-5">
            <span className="flex items-center gap-1.5 text-zinc-300 font-mono text-[9px]">
              <CheckCircle className="w-3.5 h-3.5 text-[#FFCC00]" /> 2-YEAR WARRANTY
            </span>
            <span className="text-zinc-800">•</span>
            <span className="flex items-center gap-1.5 text-zinc-300 font-mono text-[9px]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFCC00]" /> DYNAMOMETER VALIDATED
            </span>
            <span className="text-zinc-800">•</span>
            <span className="flex items-center gap-1.5 text-zinc-300 font-mono text-[9px]">
              <Award className="w-3.5 h-3.5 text-[#FFCC00]" /> SWEDISH DAMPING FIDELITY
            </span>
          </div>
          <div className="text-zinc-500 font-mono text-[9px] text-center md:text-right uppercase tracking-[0.1em]">
            © {currentYear} MD AUTOTECH COMPONENTS. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
}

