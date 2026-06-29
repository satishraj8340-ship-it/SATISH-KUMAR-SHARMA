/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Building2, ShoppingBag, Users, Cpu, Truck, Briefcase, 
  ChevronRight, ArrowUpRight, Check, Sparkles, ShieldCheck, HeartHandshake
} from 'lucide-react';
import { SERVICES_LIST } from '../data/websiteContent';
import { ActivePage, PartnerRole } from '../types';

interface ServicesViewProps {
  setActivePage: (page: ActivePage) => void;
  setSelectedRole: (role: PartnerRole) => void;
}

export default function ServicesView({ setActivePage, setSelectedRole }: ServicesViewProps) {
  const [selectedServiceId, setSelectedServiceId] = useState('s1');

  const handleRoleSelect = (role: PartnerRole) => {
    setSelectedRole(role);
    setActivePage('partner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Building2': return <Building2 className="w-6 h-6" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6" />;
      case 'Users': return <Users className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      case 'Truck': return <Truck className="w-6 h-6" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6" />;
      default: return <Briefcase className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-20 pb-20 bg-white dark:bg-gray-950 transition-colors">
      
      {/* Services Main Header banner */}
      <section className="relative py-16 bg-gradient-to-r from-emerald-900 to-teal-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-brand-secondary/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-3.5 text-center sm:text-left">
          <span className="text-xs font-bold text-brand-accent uppercase tracking-widest font-mono">
            OUR CAPABILITIES
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white">
            Ecosystem Solutions & Services
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
            We operate a highly resilient and integrated network spanning standard warehouse storage, bulk grain packaging, micro-ATM digital financial solutions, and optimized last-mile logistics.
          </p>
        </div>
      </section>

      {/* Interactive Core Services Grid & Detail view */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest font-mono">INTEGRATED SERVICES</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-display">Our Primary Operational Competencies</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">Select a service block below to view its corresponding corporate description and benefits.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Services Selection Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {SERVICES_LIST.map((srv) => {
              const isSelected = selectedServiceId === srv.id;
              return (
                <div
                  key={srv.id}
                  onClick={() => setSelectedServiceId(srv.id)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border flex gap-3.5 items-start ${
                    isSelected 
                      ? 'bg-brand-primary/5 dark:bg-brand-primary/10 border-brand-primary ring-2 ring-brand-primary/10' 
                      : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-gray-300'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl shrink-0 ${
                    isSelected ? 'bg-brand-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                  }`}>
                    {getIcon(srv.iconName)}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-gray-900 dark:text-white leading-snug font-display">{srv.title}</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{srv.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Service panel */}
          <div className="lg:col-span-7 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-10 shadow-2xl animate-fade-in space-y-6">
            
            {/* Header portion */}
            <div className="flex justify-between items-start border-b border-gray-50 dark:border-gray-800 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest font-mono">
                  Corporate Division details
                </span>
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white font-display">
                  {SERVICES_LIST.find(s => s.id === selectedServiceId)?.title}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                {getIcon(SERVICES_LIST.find(s => s.id === selectedServiceId)?.iconName || 'Briefcase')}
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-sans">
              {SERVICES_LIST.find(s => s.id === selectedServiceId)?.description}
            </p>

            {/* Benefits list */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Division Benefits</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES_LIST.find(s => s.id === selectedServiceId)?.benefits.map((b, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-[11px] text-gray-600 dark:text-gray-400 leading-normal">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Division action */}
            <div className="pt-6 border-t border-gray-50 dark:border-gray-800 flex justify-between items-center flex-wrap gap-4 mt-4">
              <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Regulated and audited division operations
              </span>
              <button 
                onClick={() => handleRoleSelect('merchant')}
                className="px-4.5 py-2 bg-brand-primary hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Inquire For Alliance →
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Business Opportunities Showcase */}
      <section className="bg-gray-50 dark:bg-gray-900/40 py-16 border-y border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs font-bold text-brand-secondary uppercase tracking-widest font-mono font-mono">BUSINESS INCUBATOR</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-display">Village Commerce Opportunities</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">We provide comprehensive micro-franchise opportunities to individuals looking to lead local supply chains.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Opportunity 1 */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-md space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center text-lg">
                  🏪
                </div>
                <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider font-display">Panchayat Hub Center</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
                  Assigned exclusively to one village panchayat. Collect bulk household demands, handle orders on the KamaiKart ERP, and deliver items safely. Earn high commission margins per package.
                </p>
              </div>
              <button 
                onClick={() => handleRoleSelect('ppm')}
                className="text-xs font-bold text-brand-primary hover:underline pt-4 flex items-center gap-1 cursor-pointer"
              >
                Inquire PPM Program <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Opportunity 2 */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-md space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center text-lg">
                  🏬
                </div>
                <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider font-display">Block Franchise Depot</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
                  Manage a small wholesale storage space of 300-500 sq.ft. Serve as the regional transit storage node feeding block merchants and PPMs. Enjoy stable monopolistic territorial sales margins.
                </p>
              </div>
              <button 
                onClick={() => handleRoleSelect('franchise')}
                className="text-xs font-bold text-brand-secondary hover:underline pt-4 flex items-center gap-1 cursor-pointer"
              >
                Inquire Franchise Depot <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Opportunity 3 */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-md space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-brand-accent/20 text-yellow-600 flex items-center justify-center text-lg">
                  🚛
                </div>
                <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider font-display">Super Distributorship</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
                  For large-scale business houses with 1,500+ sq.ft. space and investment capabilities. Act as the central district warehouse managing bulk supply boxes with direct national corporate contracts.
                </p>
              </div>
              <button 
                onClick={() => handleRoleSelect('distributor')}
                className="text-xs font-bold text-yellow-600 hover:underline pt-4 flex items-center gap-1 cursor-pointer"
              >
                Inquire Distributorship <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Logistics & Warehousing detail banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-gray-800 shadow-2xl">
          <div className="absolute inset-0 bg-linear-to-r from-brand-primary/20 to-transparent"></div>
          
          <div className="lg:col-span-7 space-y-4 relative z-10">
            <span className="text-[10px] font-bold text-brand-accent uppercase tracking-widest font-mono">
              GPS CONTROL ROOM
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold font-display leading-tight">
              State-of-the-Art Logistics & Cold-Chain Systems
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              We own and operate a customized fleet of specialized delivery vehicles equipped with temperature-regulated cold boxes. This lets village shops sell milk, butter, and cooling items for the first time without needing high-power commercial fridges.
            </p>
            <div className="flex gap-4 text-xs font-mono text-gray-400">
              <p>● Live Tracking Systems</p>
              <p>● Automated Fuel Routing</p>
              <p>● 98.4% On-Time Delivery</p>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            <div className="w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-gray-800">
              <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500" alt="Fleet Logistics" className="w-full h-full object-cover opacity-85" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
