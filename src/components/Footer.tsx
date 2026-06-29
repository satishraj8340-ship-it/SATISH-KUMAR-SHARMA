/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Building2, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, 
  Instagram, Youtube, ArrowRight, CheckCircle2, ShieldCheck, HelpCircle, Download, FileJson, Map
} from 'lucide-react';
import { ActivePage, PartnerRole } from '../types';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
  setSelectedRole: (role: PartnerRole) => void;
  language: 'EN' | 'HI';
}

const OFF_GRID_LOCATIONS = [
  { id: 'patna', name: 'Corporate HQ (Patna)', coords: 'Bihar, Patna Complex', tel: '0612-230040' },
  { id: 'gaya', name: 'Strategic Hub (Gaya)', coords: 'Bihar, Gaya Industrial', tel: '1800-889-6339' },
  { id: 'alwar', name: 'Regional Warehouse (Alwar)', coords: 'Rajasthan, MIA Alwar', tel: '1800-889-6339' },
  { id: 'deoria', name: 'District Hub (Deoria)', coords: 'Uttar Pradesh, Deoria Bypass', tel: '1800-889-6339' }
];

export default function Footer({ setActivePage, setSelectedRole, language }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubbed, setNewsletterSubbed] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('patna');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setNewsletterSubbed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  const handleRoleSelect = (role: PartnerRole) => {
    setSelectedRole(role);
    setActivePage('partner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 pt-16 pb-8 border-t border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
          
          {/* Col 1: Corporate Identity & Brand Slogan */}
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <img 
                src="/input_file_1.png" 
                alt="KamaiKart Logo" 
                className="h-11 w-auto object-contain self-start bg-white p-1 rounded-xl shrink-0" 
                referrerPolicy="no-referrer"
              />
              <div className="flex items-center gap-1.5 pt-1">
                <img 
                  src="/input_file_0.png" 
                  alt="RSPSA Logo" 
                  className="w-4.5 h-4.5 rounded-full object-cover shrink-0 bg-white p-0.5" 
                  referrerPolicy="no-referrer"
                />
                <span className="text-[9px] text-gray-400 dark:text-gray-500 font-mono tracking-wider">
                  A BRAND OF RSPSA RETAIL
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              RSPSA RETAIL INDIA PRIVATE LIMITED (KamaiKart) is India's premier rural commerce enterprise, bringing supply chains, modern groceries, and digital services directly to village panchayats.
            </p>
            <div className="text-[10px] text-gray-500 font-mono space-y-1">
              <p>CIN: U52339BR2023PTC063715</p>
              <p>PAN: AAECR8342Q</p>
              <p>GSTIN: 10AAECR8342Q1Z4</p>
            </div>
            
            {/* Social Media Link Buttons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a href="#facebook" aria-label="Facebook" className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-brand-primary text-gray-400 hover:text-white flex items-center justify-center transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#twitter" aria-label="Twitter" className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-brand-primary text-gray-400 hover:text-white flex items-center justify-center transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#linkedin" aria-label="LinkedIn" className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-brand-primary text-gray-400 hover:text-white flex items-center justify-center transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#instagram" aria-label="Instagram" className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-brand-primary text-gray-400 hover:text-white flex items-center justify-center transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#youtube" aria-label="YouTube" className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-rose-600 text-gray-400 hover:text-white flex items-center justify-center transition-all">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Services & Partner Opportunities Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              {language === 'EN' ? 'Opportunities' : 'अवसर'}
            </h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => handleRoleSelect('customer')} className="hover:text-white transition-colors cursor-pointer text-left">
                  • KamaiKart Customer Program
                </button>
              </li>
              <li>
                <button onClick={() => handleRoleSelect('merchant')} className="hover:text-white transition-colors cursor-pointer text-left">
                  • Become Kirana Merchant
                </button>
              </li>
              <li>
                <button onClick={() => handleRoleSelect('ppm')} className="hover:text-white transition-colors cursor-pointer text-left">
                  • Panchayat Pratinidhi Partner (PPM)
                </button>
              </li>
              <li>
                <button onClick={() => handleRoleSelect('franchise')} className="hover:text-white transition-colors cursor-pointer text-left">
                  • Block Franchise Opportunities
                </button>
              </li>
              <li>
                <button onClick={() => handleRoleSelect('distributor')} className="hover:text-white transition-colors cursor-pointer text-left">
                  • Super Distributor Program
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('career'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer text-left text-brand-accent">
                  • Careers at RSPSA Retail (Apply Now)
                </button>
              </li>
            </ul>

            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display pt-2">
              {language === 'EN' ? 'Downloads' : 'डाउनलोड'}
            </h3>
            <div className="flex flex-col gap-1.5">
              <a href="#playstore-customer" className="flex items-center gap-2 bg-gray-800/80 hover:bg-gray-800 text-white px-3 py-1.5 rounded-lg border border-gray-700/60 text-[10px] transition-all">
                <Download className="w-3.5 h-3.5 text-brand-accent" />
                <span>Customer App (Android APK)</span>
              </a>
              <a href="#playstore-merchant" className="flex items-center gap-2 bg-gray-800/80 hover:bg-gray-800 text-white px-3 py-1.5 rounded-lg border border-gray-700/60 text-[10px] transition-all">
                <Download className="w-3.5 h-3.5 text-brand-secondary" />
                <span>Merchant Partner App</span>
              </a>
            </div>
          </div>

          {/* Col 3: Legal, Corporate Policies & Support Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              {language === 'EN' ? 'Corporate Policies' : 'कॉर्पोरेट नीतियां'}
            </h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#privacy" className="hover:text-white transition-colors">• Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">• Terms of Service</a></li>
              <li><a href="#refund" className="hover:text-white transition-colors">• Return & Refund Policy</a></li>
              <li><a href="#shipping" className="hover:text-white transition-colors">• Logistics & Shipping Policy</a></li>
              <li><a href="#cancellation" className="hover:text-white transition-colors">• Order Cancellation Guidelines</a></li>
              <li><a href="#cookies" className="hover:text-white transition-colors">• Cookie Policy</a></li>
              <li><a href="#csr" className="hover:text-white transition-colors text-emerald-400 font-medium">• Corporate Social Responsibility (CSR)</a></li>
            </ul>

            {/* Newsletter Interactive Form */}
            <div className="pt-2">
              <p className="text-[11px] text-gray-400 mb-2 font-medium">Subscribe to Rural Commerce Broadcasts</p>
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter corporate email..."
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-1.5 pl-3 pr-8 text-xs text-white placeholder-gray-500 focus:outline-hidden focus:border-brand-primary"
                />
                <button type="submit" className="absolute right-1 p-1 bg-brand-primary hover:bg-blue-600 rounded-md text-white transition-all cursor-pointer">
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
              {newsletterSubbed && (
                <p className="text-[10px] text-brand-secondary font-medium mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Subscribed successfully!
                </p>
              )}
            </div>
          </div>

          {/* Col 4: Corporate Office & Interactive Hub Map Location */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              {language === 'EN' ? 'Contact Office' : 'कार्यालय संपर्क'}
            </h3>
            
            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Corporate Headquarters:</p>
                  <p>RSPSA RETAIL INDIA PRIVATE LIMITED,</p>
                  <p>Block B, 3rd Floor, Maurya Lok Complex, Dak Bungalow Road, Patna, Bihar - 800001</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Mail className="w-4 h-4 text-brand-primary shrink-0" />
                <p>support@kamaikart.com</p>
              </div>
              <div className="flex gap-2">
                <Phone className="w-4 h-4 text-brand-primary shrink-0" />
                <div>
                  <p>Toll Free: 1800-889-6339</p>
                  <p>Grievance: +91 612 2300405</p>
                </div>
              </div>
            </div>

            {/* Interactive Vector Office/Hub Locator map */}
            <div className="mt-3 p-2 bg-gray-800/60 border border-gray-700/50 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-[11px] border-b border-gray-700/60 pb-1">
                <span className="font-bold text-white flex items-center gap-1">
                  <Map className="w-3.5 h-3.5 text-brand-accent" />
                  Hub Locator
                </span>
                <span className="text-[9px] text-gray-400 font-mono">Select Location</span>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {OFF_GRID_LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc.id)}
                    className={`text-[9px] px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                      selectedLocation === loc.id 
                        ? 'bg-brand-primary text-white font-bold' 
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    }`}
                  >
                    {loc.id.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Vector representation of styled map box */}
              <div className="bg-gray-950 rounded-lg p-2 text-[10px] space-y-1 relative overflow-hidden border border-gray-800">
                <div className="absolute top-0 right-0 w-8 h-8 bg-brand-primary/10 rounded-full blur-xs"></div>
                <div className="flex justify-between items-start">
                  <span className="text-white font-semibold">{OFF_GRID_LOCATIONS.find(l => l.id === selectedLocation)?.name}</span>
                  <span className="text-emerald-400 font-mono font-medium tracking-wide">● ACTIVE</span>
                </div>
                <p className="text-gray-400 font-mono">{OFF_GRID_LOCATIONS.find(l => l.id === selectedLocation)?.coords}</p>
                <div className="flex justify-between items-center text-[9px] text-gray-500 pt-1 border-t border-gray-900 font-mono">
                  <span>Tel: {OFF_GRID_LOCATIONS.find(l => l.id === selectedLocation)?.tel}</span>
                  <span className="text-brand-accent underline cursor-pointer hover:text-white">Get Directions →</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Footer Bottom Credentials and Disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <div className="space-y-1 text-center md:text-left">
            <p>© 2026 RSPSA RETAIL INDIA PRIVATE LIMITED. Brand KamaiKart. All Rights Reserved.</p>
            <p className="text-[10px] text-gray-600">
              Disclaimer: KamaiKart platform is owned and managed by RSPSA Retail India Pvt Ltd. Earning projections are estimates based on active village engagement models and micro-market parameters.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-[11px] text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              ISO 9001:2015 Certified
            </span>
            <span className="flex items-center gap-1 text-[11px] text-gray-400">
              <HelpCircle className="w-4 h-4 text-brand-accent" />
              100% WCAG 2.1 Compliant
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
