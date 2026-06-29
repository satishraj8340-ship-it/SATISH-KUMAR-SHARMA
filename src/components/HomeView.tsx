/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowRight, Play, Check, ShieldCheck, Users, HelpCircle, 
  MapPin, ShoppingBag, ShoppingCart, UserCheck, Star, AppWindow,
  Download, Award, BookOpen, Briefcase, Mail, Send, Sparkles, Building2, TrendingUp, CheckCircle, Smartphone
} from 'lucide-react';
import { SYSTEM_STATS, TESTIMONIALS, FAQS, NEWS_ARTICLES } from '../data/websiteContent';
import { ActivePage, PartnerRole } from '../types';

interface HomeViewProps {
  setActivePage: (page: ActivePage) => void;
  setSelectedRole: (role: PartnerRole) => void;
  language: 'EN' | 'HI';
  openAuthModal: (type: 'login' | 'register') => void;
  openOnboarding?: (role: 'customer' | 'merchant' | 'ppm') => void;
}

const FEATURED_PRODUCTS = [
  {
    name: 'KamaiKart Premium Basmati Rice',
    desc: 'Hygienically packaged, long-grain basmati sourced directly from verified farmer clusters.',
    price: '₹85/Kg',
    originalPrice: '₹105/Kg',
    rating: 5,
    tag: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'
  },
  {
    name: 'Shuddha Kacchi Ghani Mustard Oil',
    desc: '100% cold-pressed organic mustard oil preserving all essential micronutrients.',
    price: '₹165/Ltr',
    originalPrice: '₹195/Ltr',
    rating: 5,
    tag: 'Pure & Organic',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400'
  },
  {
    name: 'KamaiKart Premium Toor Dal',
    desc: 'Unpolished premium quality pulses with zero chemical treatment or artificial colors.',
    price: '₹140/Kg',
    originalPrice: '₹170/Kg',
    rating: 4,
    tag: 'High Protein',
    image: 'https://images.unsplash.com/photo-1547058881-aa0edd92aab3?w=400'
  }
];

const OFFERS = [
  { title: 'Merchant Wholesale Pack', desc: 'Flat 8% extra discount on single bulk grocery orders above ₹25,000.', code: 'MERCHANT8', bg: 'from-blue-600 to-indigo-600' },
  { title: 'Panchayat Welcome Offer', desc: 'First 100 household customers in newly launched PPM blocks get 5% cashback.', code: 'PPMWELCOME', bg: 'from-emerald-600 to-teal-600' }
];

export default function HomeView({ setActivePage, setSelectedRole, language, openAuthModal, openOnboarding }: HomeViewProps) {
  const [activeBenefitTab, setActiveBenefitTab] = useState<'customer' | 'merchant' | 'ppm'>('customer');
  const [contactForm, setContactForm] = useState({ name: '', phone: '', subject: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [faqCategory, setFaqCategory] = useState<'general' | 'platform' | 'partner' | 'franchise'>('general');
  const [activeFaqId, setActiveFaqId] = useState<string | null>('q1');

  const handleRoleSelect = (role: PartnerRole) => {
    setSelectedRole(role);
    setActivePage('partner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.phone) {
      setContactSubmitted(true);
      setTimeout(() => {
        setContactForm({ name: '', phone: '', subject: '', message: '' });
        setContactSubmitted(false);
      }, 4000);
    }
  };

  const benefitsData = {
    customer: {
      title: language === 'EN' ? 'Value Customer Benefits' : 'मूल्यवान ग्राहक के लाभ',
      bullets: [
        { title: 'Genuine Branded Groceries', desc: 'Say goodbye to counterfeit groceries. Every bag is certified by RSPSA quality systems.' },
        { title: 'Lowest Price Guarantee', desc: 'Sourced straight from factory mills to match wholesale rates with zero middleman overhead.' },
        { title: 'Local Panchayat Delivery', desc: 'Collect goods right within your local village. No travel, zero hassle.' }
      ],
      cta: 'customer' as PartnerRole
    },
    merchant: {
      title: language === 'EN' ? 'Kirana Merchant Perks' : 'किराना व्यापारी के विशेष लाभ',
      bullets: [
        { title: 'App-Based Easy Stocking', desc: 'Check latest daily wholesale prices and buy 1,500+ items directly on our easy app.' },
        { title: 'Doorstep Next-Day Supply', desc: 'Save on heavy transport and city travel. Our logistics trucks deliver directly to your shop.' },
        { title: 'Zero Interest Line of Credit', desc: 'Secure low-interest working capital credit up to ₹1,00,000 to keep shelves full.' }
      ],
      cta: 'merchant' as PartnerRole
    },
    ppm: {
      title: language === 'EN' ? 'PPM Associate Advantages' : 'पीपीएम एसोसिएट के लाभ',
      bullets: [
        { title: 'Exclusive Territory Ownership', desc: 'Get sole rights to operate and process orders for your entire village panchayat area.' },
        { title: 'High Commission Engine', desc: 'Earn solid performance commission (2% to 6%) on all household items processed through you.' },
        { title: 'Comprehensive Branding Kit', desc: 'Receive high-quality physical storefront banners, brochures, and digital training models.' }
      ],
      cta: 'ppm' as PartnerRole
    }
  };

  return (
    <div className="space-y-20 pb-16 bg-white dark:bg-gray-950 transition-colors">
      
      {/* 1. HERO SECTION WITH ANIMATED GRADIENT BACKGROUND */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f8fafc] to-[#eef2ff] dark:from-slate-950 dark:to-indigo-950/30 pt-16 pb-20 md:py-28 border-b border-slate-100 dark:border-gray-900">
        
        {/* Animated Background Orbs */}
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-blue-400/10 dark:bg-blue-600/5 rounded-full blur-3xl animate-pulse-subtle"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-400/10 dark:bg-emerald-600/5 rounded-full blur-3xl animate-float"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Highlight Tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#198754]/10 text-[#198754] dark:text-emerald-400 text-xs font-bold font-mono tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                {language === 'EN' ? 'EMPOWERING VILLAGE COMMERCE' : 'ग्रामीण व्यापार का सशक्तिकरण'}
              </div>

              {/* Dynamic Tagline Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display leading-[1.1]">
                {language === 'EN' ? (
                  <>
                    The Future of Rural <br/> <span className="text-[#0B5ED7]">Retail & Logistics.</span>
                  </>
                ) : (
                  <>
                    ग्रामीण व्यापार का <span className="text-[#0B5ED7]">सशक्तिकरण</span>, स्थानीय समृद्धि का <span className="text-[#198754]">निर्माण</span>
                  </>
                )}
              </h1>

              {/* Brand Description */}
              <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {language === 'EN' 
                  ? 'Bridging the gap between urban quality and rural accessibility. KamaiKart brings digital retail empowerment, standard groceries, and reliable village logistics directly to every household.'
                  : 'RSPSA रिटेल इंडिया प्राइवेट लिमिटेड अपने ब्रांड कमाईकार्ट के माध्यम से शीर्ष निर्माताओं और ग्रामीण उपभोक्ताओं के बीच की दूरी को पाटता है। हमारे पंचायत भागीदारों और किराना नेटवर्क के साथ मिलकर, हम सबसे कम दामों पर शुद्ध राशन प्रदान करते हैं।'}
              </p>

              {/* Search Bar Interactive Box */}
              <div className="max-w-md mx-auto lg:mx-0 bg-white dark:bg-gray-900 rounded-2xl p-2 shadow-xl border border-slate-100 dark:border-gray-800 flex flex-col sm:flex-row gap-2">
                <input 
                  type="text" 
                  placeholder={language === 'EN' ? 'Search your block, village, or role...' : 'अपने ब्लॉक, गाँव या भागीदारी खोजें...'} 
                  className="flex-1 px-4 py-2.5 text-xs bg-slate-50 dark:bg-gray-800 rounded-xl focus:outline-hidden text-slate-800 dark:text-gray-100"
                />
                <button 
                  onClick={() => setActivePage('services')} 
                  className="px-5 py-2.5 bg-[#0B5ED7] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-200 dark:shadow-none cursor-pointer"
                >
                  {language === 'EN' ? 'Explore Network' : 'नेटवर्क खोजें'}
                </button>
              </div>

              {/* Comprehensive Grid of CTAs requested */}
              <div className="pt-2">
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-3 font-mono">
                  {language === 'EN' ? 'Take Action & Partner with Us' : 'कार्रवाई करें और हमारे साथ भागीदार बनें'}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-w-lg mx-auto lg:mx-0">
                  <button 
                    onClick={() => handleRoleSelect('customer')} 
                    className="px-3 py-2 text-[11px] font-extrabold rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-brand-secondary hover:bg-brand-secondary hover:text-white border border-brand-secondary/20 transition-all cursor-pointer flex items-center justify-center gap-1 shadow-xs"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    Customer
                  </button>
                  <button 
                    onClick={() => handleRoleSelect('merchant')} 
                    className="px-3 py-2 text-[11px] font-extrabold rounded-lg bg-blue-50 dark:bg-blue-950/40 text-brand-primary hover:bg-brand-primary hover:text-white border border-brand-primary/20 transition-all cursor-pointer flex items-center justify-center gap-1 shadow-xs"
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    Kirana Merchant
                  </button>
                  <button 
                    onClick={() => handleRoleSelect('ppm')} 
                    className="px-3 py-2 text-[11px] font-extrabold rounded-lg bg-amber-50 dark:bg-amber-950/40 text-yellow-600 dark:text-brand-accent hover:bg-brand-accent hover:text-gray-950 border border-brand-accent/30 transition-all cursor-pointer flex items-center justify-center gap-1 shadow-xs"
                  >
                    <Users className="w-3.5 h-3.5" />
                    Become PPM
                  </button>
                  <button 
                    onClick={() => handleRoleSelect('franchise')} 
                    className="px-3 py-2 text-[11px] font-extrabold rounded-lg bg-slate-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-800 hover:text-white border border-gray-300 dark:border-gray-700 transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    Franchise Link
                  </button>
                  <a 
                    href="#download" 
                    className="px-3 py-2 text-[11px] font-extrabold rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white border border-rose-300 dark:border-rose-900/60 transition-all flex items-center justify-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download App
                  </a>
                  <button 
                    onClick={() => setActivePage('kamaikart')} 
                    className="px-3 py-2 text-[11px] font-extrabold rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-950 hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    <AppWindow className="w-3.5 h-3.5" />
                    Explore Platform
                  </button>
                </div>
              </div>

              {/* Interactive Onboarding Tutorial Banner */}
              <div className="mt-6 p-4 bg-linear-to-r from-amber-500/10 to-brand-primary/10 border border-amber-500/20 rounded-2xl flex items-center justify-between gap-4 max-w-lg mx-auto lg:mx-0">
                <div className="flex gap-2.5 items-center text-left">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <Smartphone className="w-5 h-5 animate-bounce text-amber-500" />
                  </div>
                  <div>
                    <span className="text-[9px] bg-amber-500 text-white font-mono font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">NEW</span>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white mt-1">Interactive Onboarding Guide</h4>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 font-sans leading-normal">Simulate Customer, Kirana, & PPM workflows step-by-step.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => openOnboarding?.('customer')}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-[10px] flex items-center gap-1 shrink-0 cursor-pointer shadow-lg shadow-amber-500/15 transition-all hover:scale-105"
                >
                  Start Tour <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Right Brand Visual Column - Rotating Premium Sleek Cards */}
            <div className="lg:col-span-5 relative flex items-center justify-center pt-10 lg:pt-0">
              <div className="relative pr-8 pb-10">
                {/* Foreground App Mockup Card */}
                <div className="w-72 h-48 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-gray-800 p-6 -rotate-6 z-20 relative transition-transform hover:rotate-0 duration-300">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-50 dark:border-gray-800">
                    <span className="text-[10px] font-extrabold text-brand-primary">KAMAIKART MOBILE ERP</span>
                    <span className="text-[9px] text-brand-secondary font-mono bg-brand-secondary/10 px-1.5 py-0.5 rounded-full font-bold">LIVE HUB</span>
                  </div>

                  <div className="py-3 space-y-2.5 text-xs">
                    {/* Live delivery status */}
                    <div className="bg-slate-50 dark:bg-gray-950 p-2 rounded-xl border border-slate-100 dark:border-gray-800 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                        <span className="text-[9px] text-gray-500 dark:text-gray-400 font-mono">Fulfillment: Patna South</span>
                      </div>
                      <span className="text-[8px] font-extrabold text-emerald-500">READY</span>
                    </div>

                    {/* Stock level bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] text-gray-400">
                        <span>Panchayat Staples Stock</span>
                        <span className="font-bold text-gray-700 dark:text-gray-300 font-mono">94%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-gray-800 h-1 rounded-full overflow-hidden">
                        <div className="bg-brand-primary h-full rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>

                    {/* Quick reward line */}
                    <div className="bg-brand-primary/5 rounded-xl p-1.5 border border-brand-primary/10 flex justify-between items-center text-[10px]">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-3 h-3 text-brand-accent fill-brand-accent" />
                        <span className="font-bold text-gray-700 dark:text-gray-300">PPM Override Active</span>
                      </div>
                      <span className="text-[9px] text-brand-primary font-bold">+1.5%</span>
                    </div>
                  </div>
                </div>

                {/* Overlapping Sleek Stat Card */}
                <div className="absolute -top-12 -right-8 w-64 h-80 bg-[#0B5ED7] rounded-3xl shadow-xl p-8 text-white rotate-3 z-10 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] opacity-80 mb-2 uppercase tracking-widest font-bold">Live Statistics</p>
                    <h3 className="text-4xl font-black mb-4 tracking-tighter">12.5k+</h3>
                    <p className="text-xs mb-6 opacity-90 leading-relaxed">Active merchants across 8 states driving the rural digital revolution.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
                    <div>
                      <p className="text-[10px] opacity-70 uppercase">Villages</p>
                      <p className="font-bold">4,200+</p>
                    </div>
                    <div>
                      <p className="text-[10px] opacity-70 uppercase">Deliveries</p>
                      <p className="font-bold">1M+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SCROLLING CORPORATE STATISTICS MARQUEE */}
      <section className="bg-brand-primary text-white py-4 overflow-hidden relative shadow-lg">
        <div className="flex whitespace-nowrap animate-marquee">
          {/* Repeat stats 3 times to guarantee endless loop */}
          {[...SYSTEM_STATS, ...SYSTEM_STATS, ...SYSTEM_STATS].map((stat, idx) => (
            <div key={idx} className="inline-flex items-center gap-3 mx-10 text-xs font-sans">
              <span className="text-brand-accent font-black font-display text-lg">{stat.value}</span>
              <span className="font-bold tracking-tight text-white">{stat.label}</span>
              <span className="text-[10px] text-blue-200">({stat.description})</span>
              <span className="text-brand-accent ml-4 font-bold">★</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. COMPANY INTRODUCTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-gray-900 border border-slate-200 dark:border-gray-800 text-brand-secondary text-xs font-bold font-mono">
              <img 
                src="/input_file_0.png" 
                alt="RSPSA Logo" 
                className="w-4 h-4 rounded-full object-cover shrink-0" 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop&q=60";
                }}
              />
              {language === 'EN' ? 'THE RSPSA PROMISE' : 'आरएसपीएसए का वादा'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white font-display">
              India's Premier Enterprise For <span className="text-brand-secondary">Rural Commerce</span> Fulfillment
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              RSPSA Retail India Private Limited was formed with a fundamental mission: to unlock the economic power of rural India. Standard logistics chains have ignored deep village networks, leaving local consumers vulnerable to overpriced and low-grade groceries.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Our unique, integrated digital platform — **KamaiKart** — merges advanced order forecasting with hard physical logistics. By establishing localized warehouses and empowering native village residents as Panchayat Partners, we construct a standard commercial highway straight to rural kitchen shelves.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                <p className="text-xl font-bold text-brand-primary font-mono">100%</p>
                <p className="text-[11px] text-gray-500 font-medium">Quality Sealed Staples</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                <p className="text-xl font-bold text-brand-secondary font-mono">Free</p>
                <p className="text-[11px] text-gray-500 font-medium">Doorstep Store Delivery</p>
              </div>
            </div>
          </div>

          {/* 4. INTERACTIVE VIDEO SECTION */}
          <div className="lg:col-span-6">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-gray-950 group">
              {videoPlaying ? (
                <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center p-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full border-4 border-t-brand-primary border-r-transparent border-gray-700 animate-spin"></div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white">Connecting to Corporate Media Room...</p>
                    <p className="text-[11px] text-gray-400 font-mono">Streaming "KamaiKart Rural Success Story" (Gaya Block)</p>
                  </div>
                  <button 
                    onClick={() => setVideoPlaying(false)} 
                    className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                  >
                    Close Stream
                  </button>
                </div>
              ) : (
                <>
                  <img 
                    src="https://images.unsplash.com/photo-1596495578065-6e0763fa1141?w=800" 
                    alt="Corporate Video Placeholder" 
                    className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/40 to-transparent flex flex-col justify-between p-5">
                    <span className="self-start text-[9px] bg-brand-primary/95 text-white px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                      corporate film
                    </span>
                    
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setVideoPlaying(true)}
                        className="w-12 h-12 rounded-full bg-white text-brand-primary hover:scale-110 flex items-center justify-center shadow-2xl hover:text-brand-secondary transition-all cursor-pointer grow-0 shrink-0"
                      >
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </button>
                      <div>
                        <h4 className="text-sm font-extrabold text-white leading-tight">KamaiKart: The Rural Commerce Revolution</h4>
                        <p className="text-[11px] text-gray-300 line-clamp-1">Learn how RSPSA Retail drives women employment and Kirana growth.</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. LATEST OFFERS / CAMPAIGNS */}
      <section className="bg-gray-50 dark:bg-gray-900/40 py-16 border-y border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest font-mono">Hot Campaign Deals</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-display">Active Partner Promotions</h3>
            <p className="text-xs text-gray-500 max-w-lg mx-auto">Boost procurement margins using our exclusive regional commercial discount codes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OFFERS.map((off, idx) => (
              <div key={idx} className={`rounded-2xl bg-linear-to-r ${off.bg} p-6 text-white shadow-lg relative overflow-hidden flex flex-col justify-between min-h-48 group`}>
                <div className="absolute right-0 bottom-0 w-24 h-24 bg-white/5 rounded-full translate-x-8 translate-y-8 group-hover:scale-125 transition-transform"></div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full font-bold">active campaign</span>
                  <h4 className="text-lg font-black font-display mt-2.5">{off.title}</h4>
                  <p className="text-xs text-blue-50/90 mt-1 max-w-md">{off.desc}</p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/10 mt-4">
                  <div className="text-[10px] font-mono">
                    PROMO CODE: <span className="font-extrabold bg-white/25 px-2 py-1 rounded text-white">{off.code}</span>
                  </div>
                  <button 
                    onClick={() => openAuthModal('register')} 
                    className="text-xs font-bold bg-white text-gray-900 hover:bg-brand-accent px-4 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Apply Deal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEATURED PRODUCTS HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-brand-secondary uppercase tracking-widest font-mono">Premium Quality Standards</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-display">KamaiKart Branded Staples</h3>
          </div>
          <button 
            onClick={() => setActivePage('services')} 
            className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1 cursor-pointer"
          >
            Explore Full Catalog <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_PRODUCTS.map((prod, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all group flex flex-col justify-between">
              <div>
                {/* Product Image Wrapper */}
                <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 text-[9px] font-bold bg-brand-primary text-white px-2 py-0.5 rounded-full uppercase">
                    {prod.tag}
                  </span>
                </div>

                {/* Info block */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(prod.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-brand-accent fill-brand-accent" />
                    ))}
                  </div>
                  <h4 className="text-sm font-extrabold text-gray-900 dark:text-white leading-snug">{prod.name}</h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-normal line-clamp-2">{prod.desc}</p>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="p-4 pt-0 border-t border-gray-50 dark:border-gray-800 mt-2 flex justify-between items-center">
                <div>
                  <span className="text-sm font-black text-gray-900 dark:text-white font-mono">{prod.price}</span>
                  <span className="text-[10px] text-gray-400 line-through ml-1.5 font-mono">{prod.originalPrice}</span>
                </div>
                <button 
                  onClick={() => handleRoleSelect('customer')} 
                  className="px-3 py-1.5 bg-slate-100 hover:bg-brand-primary dark:bg-gray-800 dark:hover:bg-brand-primary text-gray-700 dark:text-gray-300 hover:text-white rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. WHY CHOOSE KAMAIKART */}
      <section className="bg-gray-950 text-white py-16 rounded-3xl max-w-7xl mx-auto px-6 sm:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-brand-primary/10 to-transparent"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-bold text-brand-accent uppercase tracking-widest font-mono">Core Values & Standards</span>
            <h3 className="text-3xl font-extrabold font-display leading-tight">Why RSPSA Is The Trusted Choice</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              We operate as a fully audited, corporate-backed commerce provider. We do not gamble with unstable supplies; we design standardized systems that secure quality, price, and last-mile operations.
            </p>
            
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1 bg-brand-primary/20 rounded text-brand-accent shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">ISO 9001:2015 Operations</h4>
                  <p className="text-[10px] text-gray-400">Strictly managed warehouses with regular health-safety audits.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1 bg-brand-primary/20 rounded text-brand-accent shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">100% Genuine Brands</h4>
                  <p className="text-[10px] text-gray-400">Direct global manufacturer sourcing eliminates counterfeit packets completely.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-2 hover:bg-white/10 transition-colors">
              <span className="text-2xl">🚛</span>
              <h4 className="text-xs font-black uppercase tracking-wider text-brand-accent font-display">Hub-and-Spoke Logistics</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">We own state-level fulfillment warehouses feeding localized block micro-depots via GPS commercial trucks.</p>
            </div>
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-2 hover:bg-white/10 transition-colors">
              <span className="text-2xl">📱</span>
              <h4 className="text-xs font-black uppercase tracking-wider text-brand-accent font-display">Unified Mobile Suite</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">Our customized multi-tier mobile technology simplifies order placement, commissions tracking, and billing.</p>
            </div>
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-2 hover:bg-white/10 transition-colors">
              <span className="text-2xl">👭</span>
              <h4 className="text-xs font-black uppercase tracking-wider text-brand-accent font-display">Women Empowerment focus</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">Exclusive programs allocating micro-merchant rights and delivery modules to rural self-help women groups.</p>
            </div>
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-2 hover:bg-white/10 transition-colors">
              <span className="text-2xl">🏦</span>
              <h4 className="text-xs font-black uppercase tracking-wider text-brand-accent font-display">FinTech Credit Lines</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">Partners receive low-interest working capital credit integration in alliance with premier nationalized banks.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 8. WOMEN EMPLOYMENT & VILLAGE OPPORTUNITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/60 rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 relative">
            <div className="aspect-square w-full max-w-sm rounded-2xl overflow-hidden shadow-xl bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1544025162-d76694265947?w=500" 
                alt="Women Entrepreneurs" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold text-brand-secondary uppercase tracking-widest font-mono">Empowerment Initiative</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-display">
              RSPSA Rural Women Micro-Entrepreneurship Program
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              RSPSA Retail is deeply committed to gender equality and rural financial freedom. We believe rural women are the primary drivers of family health and budgeting. Our customized initiative offers localized training, credit setups, and exclusive commission incentives.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-secondary" />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Special 1.5% commission top-ups</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-secondary" />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Zero collateral tablet financing</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-secondary" />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Bi-weekly localized training modules</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-secondary" />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Direct linkage to Self-Help Groups (SHGs)</span>
              </div>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => handleRoleSelect('ppm')} 
                className="px-5 py-2.5 bg-brand-secondary hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-brand-secondary/20 cursor-pointer"
              >
                Join Women Empowerment Program
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. THE INTERACTIVE BENEFITS MODULE (CUSTOMER, MERCHANT, PPM BENEFITS) */}
      <section className="bg-gray-50 dark:bg-gray-900/40 py-16 border-y border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest font-mono">Tailored Ecosystem Solutions</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-display">Ecosystem Benefits & Opportunities</h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto">Click through the options below to see how our model benefits different partners.</p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex justify-center border-b border-gray-200 dark:border-gray-800 max-w-md mx-auto mb-10">
            {(['customer', 'merchant', 'ppm'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveBenefitTab(tab)}
                className={`flex-1 text-center py-3 text-xs font-bold capitalize transition-colors border-b-2 cursor-pointer ${
                  activeBenefitTab === tab 
                    ? 'border-brand-primary text-brand-primary' 
                    : 'border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Active Tab Panel */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-10 border border-gray-100 dark:border-gray-800 shadow-xl max-w-3xl mx-auto animate-fade-in">
            <div className="space-y-6">
              <h4 className="text-lg font-extrabold text-gray-900 dark:text-white font-display">
                {benefitsData[activeBenefitTab].title}
              </h4>
              <div className="space-y-4">
                {benefitsData[activeBenefitTab].bullets.map((b, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-gray-800 dark:text-gray-200">{b.title}</h5>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-gray-50 dark:border-gray-800 flex justify-between items-center flex-wrap gap-4">
                <span className="text-[11px] text-brand-primary font-bold">Guaranteed RSPSA corporate backing</span>
                <button
                  onClick={() => handleRoleSelect(benefitsData[activeBenefitTab].cta)}
                  className="px-4 py-2 bg-brand-primary hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Join as {activeBenefitTab.toUpperCase()} →
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 10. TESTIMONIALS & SUCCESS STORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest font-mono">Hear From The Villages</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-display">Real Partners, Solid Success Stories</h3>
          <p className="text-xs text-gray-500 max-w-lg mx-auto">We measure our success by the direct bank balance growth of our rural micro-entrepreneurs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-lg relative flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-brand-accent fill-brand-accent" />
                  ))}
                </div>
                <p className="text-xs italic text-gray-600 dark:text-gray-300 leading-relaxed font-sans">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-50 dark:border-gray-800">
                <img 
                  src={t.avatar} 
                  alt={t.name} 
                  className="w-10 h-10 rounded-full object-cover border border-brand-primary/10"
                />
                <div>
                  <h4 className="text-xs font-black text-gray-900 dark:text-white leading-none">{t.name}</h4>
                  <p className="text-[10px] text-brand-primary mt-1">{t.role} — <span className="text-gray-500 font-normal">{t.location}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. LATEST NEWS BRIEF */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest font-mono">Press & Media Room</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-display">Latest from RSPSA Retail</h3>
          </div>
          <button 
            onClick={() => { setActivePage('news'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
            className="text-xs font-bold text-brand-primary hover:underline cursor-pointer"
          >
            Read All News Feed →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS_ARTICLES.map((art) => (
            <div key={art.id} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-lg transition-all group flex flex-col justify-between">
              <div>
                <div className="aspect-video w-full overflow-hidden bg-slate-50 relative">
                  <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform" />
                  <span className="absolute top-3 left-3 bg-gray-900/90 text-white text-[9px] px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                    {art.category}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <span className="text-[9px] text-gray-400 font-mono block">{art.date}</span>
                  <h4 className="text-xs font-extrabold text-gray-900 dark:text-white leading-snug group-hover:text-brand-primary transition-colors line-clamp-2">{art.title}</h4>
                  <p className="text-[10px] text-gray-500 leading-normal line-clamp-3">{art.summary}</p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button 
                  onClick={() => { setActivePage('news'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                  className="text-[10px] font-bold text-brand-primary hover:underline cursor-pointer"
                >
                  Read Corporate Release →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 12. FAQ COMPONENT */}
      <section className="bg-gray-50 dark:bg-gray-900/40 py-16 border-y border-gray-100 dark:border-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest font-mono">Frequently Asked Questions</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-display">Quick Corporate Answers</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">Everything you need to verify about RSPSA Retail and KamaiKart platform logistics.</p>
          </div>

          {/* FAQ Category Toggles */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {(['general', 'platform', 'partner', 'franchise'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => { setFaqCategory(cat); setActiveFaqId(null); }}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg cursor-pointer capitalize transition-all ${
                  faqCategory === cat 
                    ? 'bg-brand-primary text-white shadow-md' 
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700'
                }`}
              >
                {cat} FAQs
              </button>
            ))}
          </div>

          {/* Interactive FAQ Accordion list */}
          <div className="space-y-2.5">
            {FAQS.filter((q) => q.category === faqCategory).map((q) => {
              const isOpen = activeFaqId === q.id;
              return (
                <div key={q.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden transition-all shadow-xs">
                  <button
                    onClick={() => setActiveFaqId(isOpen ? null : q.id)}
                    className="w-full text-left p-4 flex justify-between items-center font-bold text-xs text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors cursor-pointer"
                  >
                    <span>{q.question}</span>
                    <span className="text-brand-primary font-mono text-base">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-50 dark:border-gray-800/80 animate-fade-in">
                      {q.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 13. INTERACTIVE CONTACT FORM WITH DIRECT SUCCESS STATE */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest font-mono">Send Corporate Message</span>
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white font-display">Contact Strategic Head Office</h3>
            <p className="text-xs text-gray-500">Need regional verification, franchise quotes or general answers? Our team responds within 24 hours.</p>
          </div>

          {contactSubmitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Message Logged Successfully</h4>
                <p className="text-[11px] text-gray-500 max-w-sm">
                  We have assigned ticket ID **#RSPSA-{(Math.random() * 10000).toFixed(0)}** to your inquiry. A block representative will call you shortly.
                </p>
              </div>
              <button 
                onClick={() => setContactSubmitted(false)} 
                className="px-4 py-1.5 bg-brand-primary hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="E.g. Satish Raj"
                    className="w-full bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl py-2 px-3 text-xs text-gray-800 dark:text-gray-100 focus:outline-hidden focus:border-brand-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Active Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="10-Digit Mobile"
                    className="w-full bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl py-2 px-3 text-xs text-gray-800 dark:text-gray-100 focus:outline-hidden focus:border-brand-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Subject *</label>
                <input
                  type="text"
                  required
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  placeholder="E.g. Panchayat Partner program slot inquiries"
                  className="w-full bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl py-2 px-3 text-xs text-gray-800 dark:text-gray-100 focus:outline-hidden focus:border-brand-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Message Details *</label>
                <textarea
                  rows={4}
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Describe your inquiry with block / district specifications..."
                  className="w-full bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl py-2 px-3 text-xs text-gray-800 dark:text-gray-100 focus:outline-hidden focus:border-brand-primary"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-brand-primary hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-brand-primary/25 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-white" />
                  Submit Inquiry to Corporate Desk
                </button>
              </div>
            </form>
          )}

        </div>
      </section>

    </div>
  );
}
