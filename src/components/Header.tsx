/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from 'react';
import { Phone, Mail, Menu, X, Download, FileText, MessageSquare, Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeContext';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigations = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'quality', label: 'Quality Assurance' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleDownloadBrochure = () => {
    setBrochureModalOpen(true);
  };

  const whatsappDirectUrl = `https://wa.me/917030727770?text=${encodeURIComponent(
    'Hello MD AutoTech! I am visiting your website and would like to inquire about your suspension products & wholesale catalog.'
  )}`;

  const isTransparent = activeTab === 'home' && !isScrolled;

  return (
    <>
      {/* Always fixed so nav stays visible while scrolling */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${isTransparent
            ? 'header-transparent bg-gradient-to-b from-black/95 via-black/70 to-transparent border-b border-white/10 backdrop-blur-[3px] text-white'
            : 'header-solid theme-header-solid border-b shadow-xl backdrop-blur-md'
          }`}
        id="app-header"
      >
        <div className="bg-[var(--bg-topbar)] text-zinc-400 text-[10px] uppercase tracking-wider py-1.5 border-b border-zinc-900 w-full">
          <div className="max-w-[1410px] mx-auto px-5 sm:px-7 lg:px-10 flex flex-col xs:flex-row justify-between items-center gap-2">
            <div className="flex flex-wrap items-center justify-center xs:justify-start gap-3">
              <span className="flex items-center gap-1.5 text-zinc-300 font-mono">
                <span className="w-2 h-2 rounded-full bg-[#FFCC00] animate-pulse" />
                <span className="font-bold text-white">ISO 9001:2015 &amp; IATF 16949 CERTIFIED</span>
              </span>
              <span className="hidden sm:inline text-zinc-800">|</span>
              <span className="hidden sm:inline text-zinc-400 font-mono text-[9px]">HIGH PERFORMANCE SUSPENSIONS</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono">
              <a
                href="tel:+917030727770"
                className="hover:text-[#FFCC00] transition-colors flex items-center gap-1 font-bold text-white tracking-tight"
              >
                <Phone className="w-3 h-3 text-[#FFCC00]" /> +91 70307 27770
              </a>
              <span className="text-zinc-800">/</span>
              <a
                href="mailto:contact@mdautotech.com"
                className="hover:text-[#FFCC00] transition-colors flex items-center gap-1 text-zinc-300 hidden sm:flex"
              >
                <Mail className="w-3 h-3 text-[#FFCC00]" /> contact@mdautotech.com
              </a>
              <span className="text-zinc-800 hidden sm:inline">|</span>
              <button
                onClick={() => setActiveTab('owner-desk')}
                className={`cursor-pointer px-2 py-0.5 text-[9px] font-mono font-bold uppercase transition-colors rounded ${activeTab === 'owner-desk'
                    ? 'bg-[#FFCC00] text-black'
                    : 'text-zinc-400 hover:text-white bg-zinc-900'
                  }`}
                title="Internal Owner CRM Portal"
              >
                Owner Desk
              </button>
            </div>
          </div>
        </div>

        {/* Medium-width nav row — matches main content shell */}
        <div className="w-full max-w-[1410px] mx-auto px-5 sm:px-7 lg:px-10 py-3 flex items-center justify-between gap-4">
          <div
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
            id="brand-logo"
          >
          {/*
            >>> COMPANY LOGO (logo2.png)
            >>> Source: logo2.png in project root → copied to public/logo-md-autotech.png
          */}
          <img
            src="/logo-md-autotech.png"
            alt="MD Autotech"
            className="h-12 sm:h-14 w-auto object-contain rounded-sm group-hover:opacity-90 transition-opacity"
          />
          </div>

          <nav className="hidden md:flex items-center gap-2 lg:gap-4" id="desktop-navigation">
            {navigations.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`cursor-pointer text-[11px] lg:text-[12px] uppercase tracking-[0.14em] font-extrabold transition-all duration-150 py-1.5 px-2 ${activeTab === item.id
                    ? 'text-[#FFCC00] border-b-2 border-[#FFCC00]'
                    : isTransparent
                      ? 'text-zinc-300 hover:text-white'
                      : 'theme-muted hover:text-[var(--text)]'
                  }`}
                id={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <button
              onClick={toggleTheme}
              className={`cursor-pointer p-2 border transition-colors ${isTransparent
                  ? 'border-zinc-600 text-white hover:bg-[#FFCC00] hover:text-black hover:border-[#FFCC00]'
                  : 'border-[var(--border)] text-[var(--text)] hover:bg-[#FFCC00] hover:text-black hover:border-[#FFCC00]'
                }`}
              title={theme === 'dark' ? 'Switch to day mode' : 'Switch to night mode'}
              aria-label="Toggle day and night mode"
              id="theme-toggle"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer px-3.5 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-black text-[11px] uppercase tracking-wider font-extrabold transition-all duration-150 flex items-center gap-1.5 rounded-xs shadow-sm"
              id="header-btn-whatsapp"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-black stroke-none" /> WhatsApp
            </a>

            <button
              onClick={handleDownloadBrochure}
              className="cursor-pointer px-4 py-2 bg-[#FFCC00] hover:bg-[#e6b800] text-black text-[11px] uppercase tracking-widest font-black transition-all hover:scale-[1.02] duration-150 shadow-sm flex items-center gap-1.5 rounded-xs"
              id="header-btn-download"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" /> Catalog
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`cursor-pointer p-2 border ${isTransparent ? 'border-zinc-600 text-white' : 'border-[var(--border)] text-[var(--text)]'
                }`}
              aria-label="Toggle day and night mode"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer p-2 bg-[#25D366] text-black text-xs font-bold rounded-xs flex items-center gap-1"
            >
              <MessageSquare className="w-4 h-4 fill-black stroke-none" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`cursor-pointer p-2 border transition-colors ${isTransparent
                  ? 'text-white border-zinc-700 bg-zinc-900'
                  : 'text-[var(--text)] border-[var(--border)] bg-[var(--bg-elevated)]'
                }`}
              id="mobile-menu-toggle"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#FFCC00]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden theme-surface border-t shadow-xl py-6 px-4 absolute top-full left-0 right-0 z-50 space-y-3 animate-in fade-in slide-in-from-top-3 duration-250" id="mobile-navigation-drawer">
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#FFCC00] px-4 mb-2 font-mono">
              Navigation Menu
            </div>
            {navigations.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`cursor-pointer w-full text-left px-4 py-3 text-xs uppercase tracking-widest font-black flex items-center justify-between transition-all ${activeTab === item.id
                    ? 'bg-[#FFCC00] text-black font-extrabold'
                    : 'theme-soft hover:bg-[var(--bg-deep)]'
                  }`}
              >
                <span>{item.label}</span>
                <span>→</span>
              </button>
            ))}
            <div className="pt-4 border-t theme-border flex flex-col gap-2.5">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer w-full bg-[#25D366] text-black py-3 text-xs uppercase tracking-widest font-black transition-all text-center flex items-center justify-center gap-2 rounded-xs"
              >
                <MessageSquare className="w-4 h-4 fill-black stroke-none" /> Connect on WhatsApp
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleDownloadBrochure();
                }}
                className="cursor-pointer w-full bg-[#FFCC00] text-black py-3 text-xs uppercase tracking-widest font-black transition-all text-center flex items-center justify-center gap-2 rounded-xs"
              >
                <Download className="w-4 h-4" /> Download Tech Catalog
              </button>
            </div>
          </div>
        )}

        {brochureModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4" id="catalogue-download-modal">
            <div className="theme-surface max-w-md w-full border shadow-2xl p-6 sm:p-8 relative">
              <button
                onClick={() => setBrochureModalOpen(false)}
                className="cursor-pointer absolute top-4 right-4 theme-muted hover:text-[#FFCC00] font-mono text-sm uppercase tracking-wider font-bold"
              >
                ✕ Close
              </button>

              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-[#FFCC00]/20 text-[#FFCC00] rounded-full flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6 stroke-[2]" />
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-mono font-bold text-[#FFCC00] tracking-widest uppercase">MD AutoTech Catalog</span>
                  <h3 className="text-xl font-bold tracking-tight text-[var(--text)]">Download Product Specification Sheet</h3>
                  <p className="theme-muted text-xs leading-relaxed max-w-sm mx-auto">
                    Get full technical dimensions, damping force ratings, and fitments for shock absorbers, USD front fork pipes, and double-lip Viton seals.
                  </p>
                </div>

                <div className="p-4 theme-deep border theme-border text-left text-[11px] space-y-2 rounded theme-soft">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#FFCC00] mt-0.5">•</span>
                    <span><strong>Document:</strong> MD_Autotech_Catalog_2026.pdf</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#FFCC00] mt-0.5">•</span>
                    <span><strong>Size:</strong> 4.8 MB (High-res Spec Sheets)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#FFCC00] mt-0.5">•</span>
                    <span><strong>Direct WhatsApp:</strong> Request printable PDF instantly via WhatsApp</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href={`https://wa.me/917030727770?text=${encodeURIComponent('Hello MD AutoTech! Please send me your complete Product Catalog PDF brochure.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer w-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold py-3 text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 rounded-xs"
                  >
                    <MessageSquare className="w-4 h-4 fill-black stroke-none" /> Request Catalog on WhatsApp
                  </a>
                  <button
                    onClick={() => {
                      window.print();
                      setBrochureModalOpen(false);
                    }}
                    className="cursor-pointer w-full bg-[#FFCC00] hover:bg-[#e6b800] text-black font-extrabold py-3 text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 rounded-xs"
                  >
                    <Download className="w-4 h-4" /> Download / Print Specification Sheet
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer reserves header height in page flow (skipped on home hero overlay) */}
      <div
        aria-hidden="true"
        className={isTransparent ? 'h-0' : 'h-[6.75rem] sm:h-[7.25rem]'}
        id="header-scroll-spacer"
      />
    </>
  );
}
