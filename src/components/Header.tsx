/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Sun, Moon, Search, Bell, ChevronDown, User, Globe, 
  MapPin, Phone, LogIn, Key, Sparkles, Building2, ShoppingCart, Info, Briefcase, FileText, Compass, Shield, LogOut
} from 'lucide-react';
import { ActivePage, PartnerRole } from '../types';

interface HeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  selectedRole: PartnerRole;
  setSelectedRole: (role: PartnerRole) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  language: 'EN' | 'HI';
  setLanguage: (lang: 'EN' | 'HI') => void;
  openAuthModal: (type: 'login' | 'register') => void;
  openOnboarding?: (role: 'customer' | 'merchant' | 'ppm') => void;
  currentUser?: any;
  onLogout?: () => void;
}

const NOTIFICATIONS = [
  { id: '1', text: 'RSPSA Retail India Private Limited expanded into Gaya District!', time: '2h ago' },
  { id: '2', text: 'PPM registration is now 100% digital via the KamaiKart App.', time: '1d ago' },
  { id: '3', text: 'New Women Empowerment micro-grants are active this quarter.', time: '3d ago' }
];

export default function Header({
  activePage,
  setActivePage,
  setSelectedRole,
  isDarkMode,
  setIsDarkMode,
  language,
  setLanguage,
  openAuthModal,
  openOnboarding,
  currentUser,
  onLogout
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPartnerDropdownOpen, setIsPartnerDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Auto handle scrolling shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePartnerSelect = (role: PartnerRole) => {
    setSelectedRole(role);
    setActivePage('partner');
    setIsPartnerDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: language === 'EN' ? 'Home' : 'मुख्य पृष्ठ' },
    { id: 'about', label: language === 'EN' ? 'About Us' : 'हमारे बारे में' },
    { id: 'kamaikart', label: language === 'EN' ? 'KamaiKart' : 'कमाईकार्ट' },
    { id: 'services', label: language === 'EN' ? 'Services' : 'सेवाएं' },
    { id: 'partner', label: language === 'EN' ? 'Become Partner' : 'भागीदार बनें' },
    { id: 'career', label: language === 'EN' ? 'Career' : 'करियर' },
    { id: 'blog', label: language === 'EN' ? 'Blog' : 'ब्लॉग' },
    { id: 'news', label: language === 'EN' ? 'News' : 'समाचार' },
    { id: 'support', label: language === 'EN' ? 'Support' : 'सहायता' },
    { id: 'contact', label: language === 'EN' ? 'Contact' : 'संपर्क' }
  ] as { id: ActivePage; label: string }[];

  const partnerSubMenu = [
    { role: 'customer' as PartnerRole, label: language === 'EN' ? 'Customer' : 'ग्राहक' },
    { role: 'merchant' as PartnerRole, label: language === 'EN' ? 'Merchant (Kirana)' : 'व्यापारी (किराना)' },
    { role: 'ppm' as PartnerRole, label: language === 'EN' ? 'PPM (Panchayat)' : 'पीपीएम (पंचायत)' },
    { role: 'ppm-leader' as PartnerRole, label: language === 'EN' ? 'PPM Leader' : 'पीपीएम लीडर' },
    { role: 'block-manager' as PartnerRole, label: language === 'EN' ? 'Block Manager' : 'ब्लॉक प्रबंधक' },
    { role: 'district-manager' as PartnerRole, label: language === 'EN' ? 'District Manager' : 'जिला प्रबंधक' },
    { role: 'state-manager' as PartnerRole, label: language === 'EN' ? 'State Manager' : 'राज्य प्रबंधक' },
    { role: 'franchise' as PartnerRole, label: language === 'EN' ? 'Block Franchise' : 'ब्लॉक फ्रैंचाइज़ी' },
    { role: 'distributor' as PartnerRole, label: language === 'EN' ? 'Super Distributor' : 'सुपर वितरक' }
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-950/95 shadow-md backdrop-blur-md border-b border-gray-100 dark:border-gray-800' 
        : 'bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-900'
    }`}>
      {/* Top Banner with quick Corporate Details */}
      <div className="hidden md:block bg-brand-primary text-white py-1.5 px-6 text-xs transition-colors">
        <div className="max-w-7xl mx-auto flex justify-between items-center font-sans">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <img 
                src="/input_file_0.png" 
                alt="RSPSA Logo" 
                className="w-5 h-5 rounded-full object-cover bg-white p-0.5 shrink-0 border border-white/20" 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop&q=60";
                }}
              />
              <strong>RSPSA RETAIL INDIA PRIVATE LIMITED</strong>
            </span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1 text-gray-200">
              <MapPin className="w-3.5 h-3.5 text-brand-accent" />
              Corporate Identity No: U52339BR2023PTC063715
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-gray-200">
              <Phone className="w-3.5 h-3.5 text-brand-accent" />
              Toll-Free Support: 1800-889-6339
            </span>
            <span className="text-gray-300">|</span>
            <button 
              onClick={() => { setLanguage(language === 'EN' ? 'HI' : 'EN'); }} 
              className="flex items-center gap-1 font-semibold hover:text-brand-accent transition-colors bg-white/10 px-2 py-0.5 rounded cursor-pointer"
            >
              <Globe className="w-3 h-3" />
              {language === 'EN' ? 'हिंदी' : 'English'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex justify-between items-center gap-4">
          
          {/* Company Brand Logo */}
          <div 
            onClick={() => setActivePage('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <img 
              src="/input_file_1.png" 
              alt="KamaiKart Logo" 
              className="h-10 w-auto object-contain bg-white p-1 rounded-xl shadow-md border border-gray-100 dark:border-gray-800 transition-transform group-hover:scale-105" 
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop&q=60";
              }}
            />
            <div className="flex flex-col">
              <span className="text-[10px] font-extrabold tracking-tight text-gray-900 dark:text-white leading-none">
                KAMAIKART
              </span>
              <span className="text-[8px] text-gray-400 dark:text-gray-500 font-mono tracking-widest uppercase mt-0.5 leading-none">
                BY RSPSA RETAIL
              </span>
            </div>
          </div>

          {/* Search Bar - Desktop Only */}
          <div className="hidden lg:block relative flex-1 max-w-xs xl:max-w-sm">
            <div className={`relative flex items-center h-9.5 rounded-full border transition-all ${
              searchFocused 
                ? 'border-brand-primary ring-2 ring-brand-primary/10 bg-white dark:bg-gray-900' 
                : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50'
            }`}>
              <Search className="absolute left-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                placeholder={language === 'EN' ? "Search services, roles or FAQs..." : "सेवाएं, भूमिकाएं या प्रश्न खोजें..."}
                className="w-full pl-9 pr-4 text-xs bg-transparent border-0 focus:outline-hidden focus:ring-0 text-gray-800 dark:text-gray-100"
              />
            </div>
            
            {/* Search Dropdown with mock search feedback */}
            {searchFocused && searchQuery.length > 0 && (
              <div className="absolute top-11 left-0 w-full bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl shadow-2xl p-2.5 z-50 animate-fade-in text-xs text-gray-700 dark:text-gray-300">
                <p className="font-semibold text-gray-400 dark:text-gray-500 mb-1.5 uppercase tracking-wider text-[10px]">Matches for "{searchQuery}"</p>
                <div className="space-y-1">
                  <div 
                    onClick={() => { setActivePage('services'); setSearchQuery(''); }} 
                    className="p-1.5 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md cursor-pointer flex items-center justify-between"
                  >
                    <span>Retail Grocery Supply chain</span>
                    <span className="text-[10px] bg-brand-primary/10 text-brand-primary px-1.5 py-0.5 rounded">Service</span>
                  </div>
                  <div 
                    onClick={() => handlePartnerSelect('merchant')} 
                    className="p-1.5 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md cursor-pointer flex items-center justify-between"
                  >
                    <span>Merchant (Kirana) Partnership</span>
                    <span className="text-[10px] bg-brand-secondary/10 text-brand-secondary px-1.5 py-0.5 rounded">Partner</span>
                  </div>
                  <div 
                    onClick={() => handlePartnerSelect('ppm')} 
                    className="p-1.5 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md cursor-pointer flex items-center justify-between"
                  >
                    <span>PPM Panchayat Agent model</span>
                    <span className="text-[10px] bg-brand-accent/20 text-yellow-600 px-1.5 py-0.5 rounded">Partner</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              if (item.id === 'partner') {
                return (
                  <div 
                    key={item.id} 
                    className="relative"
                    onMouseEnter={() => setIsPartnerDropdownOpen(true)}
                    onMouseLeave={() => setIsPartnerDropdownOpen(false)}
                  >
                    <button className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                      activePage === 'partner' 
                        ? 'text-brand-primary bg-brand-primary/5' 
                        : 'text-gray-700 dark:text-gray-300 hover:text-brand-primary hover:bg-gray-50 dark:hover:bg-gray-900'
                    }`}>
                      {item.label}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    {isPartnerDropdownOpen && (
                      <div className="absolute top-full left-0 w-52 bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl shadow-2xl py-1.5 z-50 animate-fade-in">
                        {partnerSubMenu.map((sub) => (
                          <button
                            key={sub.role}
                            onClick={() => handlePartnerSelect(sub.role)}
                            className="w-full text-left px-4 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-brand-primary flex items-center justify-between cursor-pointer"
                          >
                            <span>{sub.label}</span>
                            <span className="text-[10px] text-gray-400 font-mono">Join →</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activePage === item.id
                      ? 'text-brand-primary bg-brand-primary/10'
                      : 'text-gray-700 dark:text-gray-300 hover:text-brand-primary hover:bg-gray-50 dark:hover:bg-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Quick Actions (Dark Mode, Notifications, Auth, Mobile Menu Trigger) */}
          <div className="flex items-center gap-2">
            
            {/* Dark Mode Switcher */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-brand-accent" /> : <Moon className="w-4 h-4 text-gray-600" />}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors relative cursor-pointer"
              >
                <Bell className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-bounce"></span>
              </button>

              {isNotificationOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl shadow-2xl p-3 z-50 animate-fade-in">
                  <div className="flex justify-between items-center mb-2 pb-1.5 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">Corporate Broadcasts</span>
                    <button 
                      onClick={() => setIsNotificationOpen(false)} 
                      className="text-xs text-brand-primary hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {NOTIFICATIONS.map((notif) => (
                      <div key={notif.id} className="p-2 bg-gray-50 dark:bg-gray-900/60 rounded-lg text-[11px] leading-normal text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
                        <p className="font-medium text-gray-800 dark:text-gray-200">{notif.text}</p>
                        <span className="text-[9px] text-gray-400 font-mono block mt-1">{notif.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Language switch on tablet & mobile */}
            <button
              onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
              className="md:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer flex items-center justify-center font-bold text-[10px]"
            >
              {language === 'EN' ? 'HI' : 'EN'}
            </button>

            {/* Onboarding Guide Trigger */}
            <button
              onClick={() => openOnboarding?.('customer')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 hover:bg-amber-100 dark:hover:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-lg transition-all cursor-pointer mr-1"
            >
              <Compass className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>{language === 'EN' ? 'Onboarding Guide' : 'ऑनबोर्डिंग गाइड'}</span>
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
              </span>
            </button>

             {/* Auth Action Buttons */}
             <div className="hidden sm:flex items-center gap-1.5 ml-1">
               {currentUser ? (
                 <>
                   <button
                     onClick={() => setActivePage('portal')}
                     className={`px-3.5 py-1.5 text-xs font-black rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                       activePage === 'portal'
                         ? 'bg-brand-primary text-white shadow-md'
                         : 'text-brand-primary bg-brand-primary/10 hover:bg-brand-primary/20'
                     }`}
                   >
                     <Shield className="w-3.5 h-3.5" />
                     {language === 'EN' ? 'My Dashboard' : 'मेरा डैशबोर्ड'}
                   </button>
                   <button
                     onClick={onLogout}
                     className="px-3.5 py-1.5 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-colors border border-gray-200 dark:border-gray-800 flex items-center gap-1 cursor-pointer"
                   >
                     <LogOut className="w-3.5 h-3.5 text-rose-500" />
                     {language === 'EN' ? 'Sign Out' : 'साइन आउट'}
                   </button>
                 </>
               ) : (
                 <>
                   <button
                     onClick={() => openAuthModal('login')}
                     className="px-3.5 py-1.5 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors border border-gray-200 dark:border-gray-800 flex items-center gap-1 cursor-pointer"
                   >
                     <LogIn className="w-3.5 h-3.5 text-brand-primary" />
                     {language === 'EN' ? 'Login' : 'लॉगिन'}
                   </button>
                   <button
                     onClick={() => openAuthModal('register')}
                     className="px-3.5 py-1.5 text-xs font-bold text-white bg-brand-primary hover:bg-blue-700 rounded-lg transition-all shadow-md shadow-brand-primary/15 flex items-center gap-1 cursor-pointer"
                   >
                     <User className="w-3.5 h-3.5 text-white" />
                     {language === 'EN' ? 'Register' : 'रजिस्टर'}
                   </button>
                 </>
               )}
             </div>

            {/* Mobile Menu Icon (Hamburger) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 w-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 top-[110px] md:top-[125px] z-40 bg-gray-900/60 backdrop-blur-xs transition-opacity">
          <div className="bg-white dark:bg-gray-950 w-4/5 max-w-sm h-full shadow-2xl p-5 overflow-y-auto animate-slide-in flex flex-col justify-between">
            <div>
              {/* Mobile Quick Search */}
              <div className="relative mb-5">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={language === 'EN' ? "Search KamaiKart..." : "कमाईकार्ट खोजें..."}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 focus:outline-hidden focus:border-brand-primary text-gray-800 dark:text-gray-100"
                />
              </div>

              <div className="space-y-1">
                {navItems.map((item) => {
                  if (item.id === 'partner') {
                    return (
                      <div key={item.id} className="space-y-1">
                        <div className="px-3 py-2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                          {item.label}
                        </div>
                        <div className="grid grid-cols-1 gap-1 pl-3">
                          {partnerSubMenu.map((sub) => (
                            <button
                              key={sub.role}
                              onClick={() => handlePartnerSelect(sub.role)}
                              className="text-left px-3 py-1.5 text-xs text-gray-700 dark:text-gray-300 hover:text-brand-primary hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md cursor-pointer"
                            >
                              • {sub.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActivePage(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer ${
                        activePage === item.id
                          ? 'text-brand-primary bg-brand-primary/10'
                          : 'text-gray-800 dark:text-gray-200 hover:text-brand-primary hover:bg-gray-50 dark:hover:bg-gray-900'
                      }`}
                    >
                      {item.label}
                      <span className="text-[10px] text-gray-300 font-mono">→</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Onboarding Guide Trigger */}
            <div className="px-1 mt-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openOnboarding?.('customer');
                }}
                className="w-full py-2.5 px-3.5 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 hover:bg-amber-100 dark:hover:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-xl flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-500 animate-pulse" />
                  <span>{language === 'EN' ? 'Onboarding Guide' : 'ऑनबोर्डिंग गाइड'}</span>
                </div>
                <span className="text-[10px] bg-amber-500 text-white px-1.5 py-0.5 rounded-md font-mono scale-90">NEW</span>
              </button>
            </div>

            {/* Mobile Auth Bottom Section */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 mt-6 space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="w-full py-2.5 text-xs font-bold text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg flex items-center justify-center gap-1 cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-brand-primary" />
                {language === 'EN' ? 'Login' : 'लॉगिन'}
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openAuthModal('register');
                }}
                className="w-full py-2.5 text-xs font-bold text-white bg-brand-primary hover:bg-blue-700 rounded-lg flex items-center justify-center gap-1 shadow-md cursor-pointer"
              >
                <User className="w-4 h-4" />
                {language === 'EN' ? 'Register' : 'रजिस्टर'}
              </button>
              <div className="text-center text-[10px] text-gray-400 pt-3">
                RSPSA Retail India Pvt. Ltd. © 2026
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
