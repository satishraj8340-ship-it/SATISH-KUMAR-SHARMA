/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Smartphone, ShieldCheck, Cpu, AppWindow, Star, Check, 
  HelpCircle, ChevronRight, Download, BarChart3, Languages, WifiOff, Users
} from 'lucide-react';

export default function KamaiKartPlatform({ language }: { language: 'EN' | 'HI' }) {
  const [activeStep, setActiveStep] = useState(1);
  const [activeScreenTab, setActiveScreenTab] = useState<'customer' | 'merchant' | 'ppm'>('customer');

  const steps = [
    { num: 1, title: 'Consolidated Order Placement', desc: 'Villagers order groceries via the nearest PPM. Kiranas order bulk supplies directly on their Merchant App. All demands stream instantly to our server.' },
    { num: 2, title: 'AI-Based Warehousing Pack', desc: 'Our centralized state mega-warehouse processes incoming bulk demand. Products are packed under hygienic standards with 3x quality assurance checkups.' },
    { num: 3, title: 'GPS Fleet Transit Dispatch', desc: 'Packed crates are loaded onto GPS-enabled delivery trucks. The automated routing algorithm calculates the fastest transit corridor to the block depots.' },
    { num: 4, title: 'Localized Handover Delivery', desc: 'Block franchises receive deliveries. Local PPM associates transport boxes directly to the villages, distributing items safely to native consumers.' }
  ];

  const screensInfo = {
    customer: {
      title: 'Value Consumer Catalog',
      intro: 'Lightweight interface displaying transparent pricing, regional items, and flash savings.',
      elements: ['Simple click-to-order flow', 'Local product availability indicator', 'Consolidated order receipt matching local PPM details']
    },
    merchant: {
      title: 'Kirana Inventory Engine',
      intro: 'Advanced inventory orders, direct company wholesale purchasing, and credit management.',
      elements: ['1-Click Bulk restocking checks', 'Flexible digital bank credit line launcher', 'Consolidated GST-compliant invoices generator']
    },
    ppm: {
      title: 'Panchayat Commission Board',
      intro: 'PPM-specific order routing control panel with automatic micro-commission calculators.',
      elements: ['Panchayat member order verification ledger', 'Bi-weekly payout history list with direct bank transfer', 'Special bonus program indicators']
    }
  };

  const techHighlights = [
    { title: 'Lite Android Engine', desc: 'Optimized to download under 12MB. Launches in under 1 second even on older smartphones running Android 6+.', icon: <Smartphone className="w-5 h-5 text-brand-primary" /> },
    { title: 'Offline-First Caching', desc: 'Enables partners to add products to their carts or review ledgers even in areas with zero cell coverage.', icon: <WifiOff className="w-5 h-5 text-emerald-500" /> },
    { title: 'Regional Dialect Support', desc: 'Supports English, Hindi, and local state dialects with simple voice-assisted navigation features.', icon: <Languages className="w-5 h-5 text-yellow-500" /> },
    { title: 'Commission Tracking', desc: 'Real-time calculations automatically logging performance incentives, block growth status, and team bonuses.', icon: <BarChart3 className="w-5 h-5 text-rose-500" /> }
  ];

  return (
    <div className="space-y-20 pb-20 bg-white dark:bg-gray-950 transition-colors">
      
      {/* Banner portion */}
      <section className="relative py-16 bg-gradient-to-r from-blue-900 to-indigo-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-brand-primary/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-3.5 text-center sm:text-left">
          <span className="text-xs font-bold text-brand-accent uppercase tracking-widest font-mono">
            DIGITAL POWERHOUSE
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white">
            The KamaiKart Unified Platform
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
            Discover the custom micro-ERP suite designed to organize the unorganized. Engineered for speed, efficiency, and zero complexity, KamaiKart connects village demand with direct enterprise warehouses.
          </p>
        </div>
      </section>

      {/* Screen Mockup & Visual Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Panel text selector */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest font-mono">APP INTERFACE TOUR</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-display leading-tight">
              A Tailored Experience For Every Ecosystem Partner
            </h3>
            
            {/* Visual Screen selection Buttons */}
            <div className="flex gap-2 p-1.5 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
              {(['customer', 'merchant', 'ppm'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveScreenTab(tab)}
                  className={`flex-1 py-2 text-xs font-bold capitalize rounded-lg transition-all cursor-pointer ${
                    activeScreenTab === tab 
                      ? 'bg-brand-primary text-white shadow-md' 
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab} View
                </button>
              ))}
            </div>

            {/* Screen information */}
            <div className="space-y-4 animate-fade-in p-2">
              <h4 className="text-base font-extrabold text-gray-900 dark:text-white font-display">
                {screensInfo[activeScreenTab].title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {screensInfo[activeScreenTab].intro}
              </p>
              
              <div className="space-y-2.5">
                {screensInfo[activeScreenTab].elements.map((el, idx) => (
                  <div key={idx} className="flex gap-2 items-start text-xs">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">{el}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <a href="#playstore-direct" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-950 font-bold text-xs rounded-xl shadow-lg transition-all hover:opacity-90">
                <Download className="w-4 h-4" />
                Download KamaiKart APK Suite
              </a>
            </div>
          </div>

          {/* Right Panel Screen CSS Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-72 h-[480px] bg-slate-900 dark:bg-gray-950 rounded-3xl border-[6px] border-slate-800 dark:border-gray-800 shadow-2xl p-4 overflow-hidden flex flex-col justify-between select-none">
              
              {/* Speaker & camera mockup */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-800 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-slate-950"></span>
              </div>

              {/* In-app header */}
              <div className="pt-3 pb-2 border-b border-gray-100 dark:border-gray-800/80 flex justify-between items-center text-[10px] text-gray-400 font-mono">
                <span className="font-bold text-brand-primary">KamaiKart App</span>
                <span className="text-emerald-500 flex items-center gap-0.5 font-bold">● ONLINE</span>
              </div>

              {/* Dynamic screen display content matching selected Tab */}
              <div className="flex-1 py-3 overflow-y-auto space-y-3 scrollbar-none">
                
                {activeScreenTab === 'customer' && (
                  <div className="space-y-3 animate-fade-in text-xs text-left">
                    <div className="bg-brand-primary/5 p-2 rounded-xl border border-brand-primary/10">
                      <p className="text-[10px] text-gray-400">Village Panchayat Hub</p>
                      <p className="font-bold text-gray-800 dark:text-white text-xs">Panchayat: Gaya South</p>
                    </div>

                    <div className="p-1">
                      <p className="text-[10px] font-bold text-gray-400 mb-1">CATEGORIES</p>
                      <div className="grid grid-cols-2 gap-1.5 text-[9px] font-bold">
                        <div className="p-1.5 bg-gray-50 dark:bg-gray-800 border rounded-lg text-center">🍚 Grains</div>
                        <div className="p-1.5 bg-gray-50 dark:bg-gray-800 border rounded-lg text-center">🌻 Cooking Oils</div>
                        <div className="p-1.5 bg-gray-50 dark:bg-gray-800 border rounded-lg text-center">🧂 Spices</div>
                        <div className="p-1.5 bg-gray-50 dark:bg-gray-800 border rounded-lg text-center">🧴 Hygiene</div>
                      </div>
                    </div>

                    <div className="p-2 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 rounded-xl">
                      <div className="flex justify-between items-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        <span>PPM Agent: Suresh</span>
                        <span>Call</span>
                      </div>
                      <p className="text-[9px] text-gray-400 mt-0.5">Collect order at village community hall.</p>
                    </div>
                  </div>
                )}

                {activeScreenTab === 'merchant' && (
                  <div className="space-y-3 animate-fade-in text-xs text-left">
                    <div className="bg-blue-500/10 p-2 rounded-xl border border-blue-500/10 flex justify-between items-center">
                      <div>
                        <p className="text-[10px] text-gray-400">Direct Wholesale Credit</p>
                        <p className="font-extrabold text-blue-600 dark:text-blue-400">₹75,000 Available</p>
                      </div>
                      <span className="text-[9px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-bold">Apply</span>
                    </div>

                    <div className="p-2 bg-gray-50 dark:bg-gray-900 border border-gray-100 rounded-xl space-y-1.5">
                      <p className="text-[9px] font-bold text-gray-400">STOCK ORDER SHEETS</p>
                      <div className="flex justify-between text-[10px]">
                        <span>Basmati Rice (Box)</span>
                        <span className="font-bold text-gray-700 dark:text-gray-300">5 Qty</span>
                      </div>
                      <div className="flex justify-between text-[10px]">
                        <span>Mustard Oil (Crate)</span>
                        <span className="font-bold text-gray-700 dark:text-gray-300">2 Qty</span>
                      </div>
                    </div>

                    <div className="w-full bg-brand-primary text-white text-center py-2 rounded-lg text-[10px] font-bold cursor-pointer hover:bg-blue-700">
                      Place Consolidation Order
                    </div>
                  </div>
                )}

                {activeScreenTab === 'ppm' && (
                  <div className="space-y-3 animate-fade-in text-xs text-left">
                    <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/10 text-center space-y-1">
                      <p className="text-[10px] text-gray-400">Commission Earned This Month</p>
                      <p className="text-lg font-black text-emerald-500 font-mono">₹18,450.00</p>
                      <span className="text-[8px] uppercase tracking-wider bg-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded-full font-bold">
                        Next Payout: July 05
                      </span>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[9px] font-bold text-gray-400">ACTIVE PENDING DISPATCHES</p>
                      <div className="p-1.5 bg-gray-50 dark:bg-gray-900 border rounded-lg flex justify-between items-center text-[10px]">
                        <span>Sub-center: Gaya-A</span>
                        <span className="text-yellow-600 font-bold font-mono">IN TRANSIT</span>
                      </div>
                      <div className="p-1.5 bg-gray-50 dark:bg-gray-900 border rounded-lg flex justify-between items-center text-[10px]">
                        <span>Sub-center: Gaya-B</span>
                        <span className="text-emerald-500 font-bold font-mono">DELIVERED</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* App launcher brand info */}
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-[8px] text-gray-500 font-mono">
                <span>Certified Sec-256</span>
                <span>v2.4</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Dynamic flowchart step process */}
      <section className="bg-gray-50 dark:bg-gray-900/40 py-16 border-y border-gray-100 dark:border-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold text-brand-secondary uppercase tracking-widest font-mono">FLOW MECHANICS</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-display">How the KamaiKart Network Works</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">Click through steps 1-4 below to understand our supply-to-doorstep workflow.</p>
          </div>

          {/* Steps selector buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {steps.map((st) => (
              <button
                key={st.num}
                onClick={() => setActiveStep(st.num)}
                className={`p-3 rounded-xl border cursor-pointer transition-all text-left space-y-1.5 ${
                  activeStep === st.num 
                    ? 'bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/15' 
                    : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                <span className="text-xs font-black font-mono">STEP 0{st.num}</span>
                <p className="text-[10px] font-extrabold truncate font-display">{st.title}</p>
              </button>
            ))}
          </div>

          {/* Active step panel display */}
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 sm:p-10 rounded-3xl shadow-xl animate-fade-in text-center space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-primary/10 text-brand-primary font-black rounded-full text-lg font-mono">
              0{activeStep}
            </div>
            <h4 className="text-base font-extrabold text-gray-900 dark:text-white font-display">
              {steps.find(s => s.num === activeStep)?.title}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
              {steps.find(s => s.num === activeStep)?.desc}
            </p>
          </div>

        </div>
      </section>

      {/* Technology & Offline Capabilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest font-mono">ROBUST ARCHITECTURE</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-display">Engineered Specifically For Rural India</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">Our developers did not build for city high-speed fiber. We built to survive unstable village bandwidth.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techHighlights.map((tech, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-md space-y-3.5 hover:-translate-y-1 transition-all">
              <div className="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl w-fit">
                {tech.icon}
              </div>
              <h4 className="text-xs font-black text-gray-900 dark:text-white font-display uppercase tracking-wider">{tech.title}</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Unique Platform QA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 dark:bg-gray-900/40 border rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-brand-primary" />
            <h4 className="text-xs font-black uppercase tracking-widest text-brand-primary font-mono">Platform Specifications FAQs</h4>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <h5 className="text-xs font-bold text-gray-900 dark:text-white">Does the merchant app require a GSTIN to register?</h5>
              <p className="text-[11px] text-gray-500 leading-normal font-sans">
                No, a formal GSTIN registration is not mandatory for minor village Kirana stores whose annual turnover stands below government thresholds. Physical address verification and an Aadhaar link are sufficient to complete retail boarding.
              </p>
            </div>
            <div className="space-y-1.5 border-t border-gray-100 dark:border-gray-800 pt-3">
              <h5 className="text-xs font-bold text-gray-900 dark:text-white">What security standards protect the bank transactions?</h5>
              <p className="text-[11px] text-gray-500 leading-normal font-sans">
                All financial transfers, micro-ATMs, and banking APIs are audited, secured, and compliant with standard NPCI (National Payments Corporation of India) security policies, keeping your commissions completely safe.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
