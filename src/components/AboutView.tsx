/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Building2, Users, HeartHandshake, Eye, Target, Award, ShieldAlert,
  ChevronRight, ChevronLeft, ArrowUpRight, CheckCircle, Quote, Compass
} from 'lucide-react';
import { TIMELINE_JOURNEY, TEAM_MEMBERS } from '../data/websiteContent';

export default function AboutView({ language }: { language: 'EN' | 'HI' }) {
  const [activeYear, setActiveYear] = useState('2023');

  const coreValues = [
    { title: 'Absolute Integrity', icon: '⚖️', desc: 'Every invoice, delivery, and commission payment is tracked with total transparency under ISO 9001:2015 frameworks.' },
    { title: 'Grassroots Inclusivity', icon: '🤝', desc: 'We do not build technology to isolate; we build local networks that empower village kiranas and rural women self-help associations.' },
    { title: 'Quality Assurance', icon: '🏆', desc: 'We implement three levels of physical quality testing on all grains, oils, and packaged items before delivery.' },
    { title: 'Logistics Innovation', icon: '🚀', desc: 'Adapting smart, solar-powered refrigeration units and GPS routing fleets to conquer difficult village topography.' }
  ];

  const csrPrograms = [
    { title: 'Gram Swasthya Kit distribution', desc: 'Supplying free primary diagnostic hygiene items and clean energy cooking assistance to under-developed blocks.' },
    { title: 'Digital Literacy workshops', desc: 'Free regional training camps educating village shopkeepers on accounting, taxation, and smart smartphone apps.' },
    { title: 'Women SHG micro-credits', desc: 'Interest-free initial funding pools for women-led self-help grocery delivery cooperatives.' }
  ];

  return (
    <div className="space-y-20 pb-20 bg-white dark:bg-gray-950 transition-colors">
      
      {/* Page Header Banner */}
      <section className="relative py-16 bg-gradient-to-br from-slate-900 via-indigo-950 to-[#0B5ED7] text-white overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-brand-primary/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3.5 text-center sm:text-left">
            <span className="text-xs font-bold text-[#FFC107] uppercase tracking-widest font-mono">
              CORPORATE OVERVIEW
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white">
              RSPSA Retail India Private Limited
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
              Leading India's rural commerce sector under our flagship brand **KamaiKart**. We merge direct manufacturer sourcing with localized micro-warehouses to build reliable, high-quality village supply networks.
            </p>
          </div>
          <div className="flex gap-4 items-center justify-center self-center md:self-auto shrink-0 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <img 
              src="/input_file_0.png" 
              alt="RSPSA Logo" 
              className="h-12 w-12 rounded-full object-cover bg-white p-0.5" 
              referrerPolicy="no-referrer"
            />
            <div className="h-8 w-px bg-white/20"></div>
            <img 
              src="/input_file_1.png" 
              alt="Kamai Kart Logo" 
              className="h-10 w-auto object-contain bg-white px-2 py-1 rounded-lg" 
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Chairman's Message Section with formal quote layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 dark:bg-gray-900/60 rounded-3xl p-6 sm:p-12 border border-gray-100 dark:border-gray-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex flex-col items-center text-center space-y-3">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-brand-primary shadow-2xl bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300" 
                alt="Chairman Satish Raj" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-sm font-black text-gray-900 dark:text-white leading-none">Satish Raj</h4>
              <p className="text-[11px] text-brand-primary font-bold mt-1.5 uppercase font-mono tracking-wider">Managing Director & Chairman</p>
              <p className="text-[10px] text-gray-400 mt-0.5">RSPSA Retail India Pvt Ltd</p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <Quote className="w-10 h-10 text-brand-primary/20 fill-current" />
            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white font-display leading-tight">
              "We measure our success not by our corporate balance sheet, but by the financial dignity restored to India’s village entrepreneurs."
            </h3>
            <div className="text-xs text-gray-600 dark:text-gray-300 space-y-3 leading-relaxed">
              <p>
                "Rural India is not just a passive market; it is a sleeping economic powerhouse. For decades, standard commercial supply lines have treated villages as secondary afterthoughts, leading to lower-grade product quality and inflated localized prices."
              </p>
              <p>
                "At RSPSA, we engineered **KamaiKart** to reverse this equation. By combining modern enterprise ERP technology with native human relationships — our Panchayat Pratinidhi Partners (PPMs) and village Kiranas — we have built an elite distribution corridor. Together, we are creating a self-sustaining ecosystem of micro-entrepreneurs who earn and spend within their own regional blocks."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Mission Card */}
        <div className="p-6 sm:p-10 rounded-3xl bg-linear-to-tr from-brand-primary/5 to-transparent border border-brand-primary/10 space-y-4 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white font-display">Our Mission</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              To build India's most standard, transparent, and seamless rural commerce highway. We strive to empower over 100,000 village retail merchants, create solid, independent micro-entrepreneurship careers for 50,000 rural youth as Panchayat Partners, and supply healthy, original groceries to 10 million households by 2028.
            </p>
          </div>
          <div className="flex items-center gap-1.5 pt-4 text-xs font-bold text-brand-primary">
            <span>Learn about our targets</span> <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Vision Card */}
        <div className="p-6 sm:p-10 rounded-3xl bg-linear-to-tr from-emerald-500/5 to-transparent border border-emerald-500/10 space-y-4 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white font-display">Our Vision</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              To be recognized as the absolute gold-standard operating system for rural Indian commerce, logistics, and digital services. We envision a future where geographical distance is completely eliminated, and every village family can buy verified, genuine food staples and consumer goods at true town-wholesale pricing parity.
            </p>
          </div>
          <div className="flex items-center gap-1.5 pt-4 text-xs font-bold text-brand-secondary">
            <span>Explore our roadmap</span> <ChevronRight className="w-4 h-4" />
          </div>
        </div>

      </section>

      {/* Business Philosophy Message */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest font-mono">OPERATIONAL ETHOS</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-display">Our Corporate Business Philosophy</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Our business philosophy stands on three key pillars: **Consolidated Logistics, Technology Linkage, and Community Trust**. 
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              We do not seek to disrupt local village ecosystems with completely automated un-monitored courier models. Instead, we select, train, and support native village kirana retailers. By consolidating regional demands, we negotiate huge direct-manufacturer procurement volume discounts, passing the profits back into the pockets of block franchises and local PPM partners.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-secondary shrink-0" />
                <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">Zero duplicate products tolerance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-secondary shrink-0" />
                <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">Guaranteed local village capital recirculation</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative flex justify-center">
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600" 
                alt="Corporate Distribution Warehouse" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Team Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest font-mono">LEADERSHIP COMMITTEE</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-display">The Visionaries behind RSPSA</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">Experienced corporate leaders combining tech expertise with deep regional domain knowledge.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-lg flex flex-col">
              <div className="aspect-square w-full bg-slate-100">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 space-y-2 text-center md:text-left flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-black text-gray-900 dark:text-white leading-none">{member.name}</h4>
                  <p className="text-[11px] text-brand-primary font-bold mt-1 font-mono uppercase tracking-wide">{member.role}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal mt-2.5">{member.description}</p>
                </div>
                <div className="pt-4 border-t border-gray-50 dark:border-gray-800 mt-4 flex justify-between items-center text-[10px] text-gray-400 font-mono">
                  <span>RSPSA Committee Member</span>
                  <span className="text-brand-primary underline hover:text-blue-700 cursor-pointer flex items-center">Profile <ArrowUpRight className="w-3 h-3 ml-0.5" /></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive History Timeline Section */}
      <section className="bg-gray-50 dark:bg-gray-900/40 py-16 border-y border-gray-100 dark:border-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest font-mono">CHRONOLOGICAL HISTORY</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-display">Our Company Journey Timeline</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">Click on the milestone years below to review how our enterprise grew from a small seed to nationwide scaling.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Year Selector Tabs */}
            <div className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-none">
              {TIMELINE_JOURNEY.map((milestone) => (
                <button
                  key={milestone.year}
                  onClick={() => setActiveYear(milestone.year)}
                  className={`px-4 py-3 text-xs font-bold rounded-xl text-left cursor-pointer transition-all flex items-center justify-between shrink-0 lg:shrink-1 ${
                    activeYear === milestone.year 
                      ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/15' 
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700'
                  }`}
                >
                  <span>Milestone: Year {milestone.year}</span>
                  <span className="hidden lg:inline text-brand-accent">★</span>
                </button>
              ))}
            </div>

            {/* Timeline details Panel */}
            <div className="lg:col-span-8 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl animate-fade-in space-y-4">
              <div className="flex justify-between items-center border-b border-gray-50 dark:border-gray-800 pb-2.5">
                <h4 className="text-sm font-extrabold uppercase tracking-widest text-brand-primary font-mono">
                  Milestone Details
                </h4>
                <span className="text-lg font-black text-brand-secondary font-mono">
                  {activeYear}
                </span>
              </div>
              <h5 className="text-sm font-extrabold text-gray-900 dark:text-white font-display">
                {TIMELINE_JOURNEY.find((t) => t.year === activeYear)?.title}
              </h5>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans">
                {TIMELINE_JOURNEY.find((t) => t.year === activeYear)?.description}
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-[10px] text-brand-secondary font-bold">
                <Award className="w-4 h-4" />
                <span>Audited and certified by RSPSA Quality Committee</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold text-brand-secondary uppercase tracking-widest font-mono">GUIDING ANCHORS</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-display">Our Shared Core Corporate Values</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">The principles that drive every procurement decision, route plan, and partner payout.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val, idx) => (
            <div key={idx} className="p-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-md space-y-3">
              <span className="text-2xl">{val.icon}</span>
              <h4 className="text-xs font-black text-gray-900 dark:text-white font-display uppercase tracking-wider">{val.title}</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed font-sans">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate Social Responsibility (CSR) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-50/50 dark:bg-emerald-950/15 border border-emerald-100 dark:border-emerald-900/60 p-6 sm:p-10 rounded-3xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-brand-secondary uppercase tracking-widest font-mono">SOCIAL IMPACT STEWARDSHIP</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-display">Corporate Social Responsibility (CSR)</h3>
            <p className="text-xs text-gray-500 leading-relaxed max-w-3xl">
              We allocate a strict 2.5% of our net annual profits to rural development programs, primary healthcare setups, and clean environment initiatives inside our operational block zones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {csrPrograms.map((prog, idx) => (
              <div key={idx} className="p-4 bg-white dark:bg-gray-900 border border-emerald-100/50 dark:border-emerald-800/40 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5 font-display">
                  <span className="text-emerald-500 font-bold">✔</span>
                  {prog.title}
                </h4>
                <p className="text-[11px] text-gray-500 leading-relaxed font-sans">{prog.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
